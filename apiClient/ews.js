var fs = require('fs'),
    crypto = require('crypto'),
    axios = require('axios'),
    admZip = require('adm-zip');

function login(clientAPI, APIKey, hostname) {
    let url;

    if(clientAPI.pathParams) {
        url = generateURI(hostname, clientAPI.path, 'login', clientAPI.pathParams);
    } else {
        url = generateURI(hostname, clientAPI.path, 'login');
    }

    return axios.post(url, {identifier: APIKey.identifier})
        .then(response => {
            let auth, responseData, processedReqToken;

            responseData = response.data;

            if(clientAPI.data) {
                auth = {
                    authToken: responseData[clientAPI.data].authToken,
                    reqToken: responseData[clientAPI.data].reqToken
                };
            } else {
                auth = {
                    authToken: responseData.authToken,
                    reqToken: responseData.reqToken
                };
            }

            if(auth.authToken && auth.reqToken) {
                processedReqToken = processReqToken(APIKey, auth);

                clientAPI.data?responseData[clientAPI.data].reqToken = processedReqToken:responseData.reqToken = processedReqToken;

                return responseData;
            } else {
                throw new Error('Error getting tokens. These values do not exist');
            }
        })
        .catch(error => {
            return error.response;
        });
}

function init(data) {
    let nameHostnameClient = `hostname_${data.clientAPI}`;
    let hostname = data[nameHostnameClient];
    let pathFolder = data.pathFolder;
    let APIKey = getDataFromFiles(pathFolder);

    return {[nameHostnameClient]: hostname, APIKey: APIKey};
}

function processReqToken(keys, tokens) {
    let apiKeys = {
        encryptionKey: keys.encryptionKey,
        decryptionKey: keys.decryptionKey
    };

    let decrypted = decryptText("aes-128-cbc", apiKeys.decryptionKey, new Buffer(tokens.authToken,'base64'), tokens.reqToken, "base64");
    let reEncrypted = encryptText("aes-128-cbc", apiKeys.encryptionKey,  new Buffer(tokens.authToken,'base64'), decrypted, "base64");

    return reEncrypted;
}

function encryptText(cipher_alg, key, iv, text, encoding) {

    let cipher = crypto.createCipheriv(cipher_alg, key, iv);

    encoding = encoding || "binary";

    let result = cipher.update(text, "utf8", encoding);
    result += cipher.final(encoding);

    return result;
}

function decryptText(cipher_alg, key, iv, text, encoding) {
    let decipher = crypto.createDecipheriv(cipher_alg, key, iv);

    encoding = encoding || "binary";

    let result = decipher.update(text, encoding);
    result += decipher.final();

    return result;
}

function request(baseURL, tokens, data, endpoint) {
    let postData;
    if(endpoint) {
        postData = {authToken: tokens.authToken, reqToken: tokens.reqToken, [endpoint]: data};
    } else {
        postData = {authToken: tokens.authToken, reqToken: tokens.reqToken, data: data};
    }

    return axios.post(baseURL, postData)
        .then(response => {
            return response;
        });
}

function getDataFromFiles(pathFolder) {
    let APIKey = {};

    const nameFileIdentifier = 'identifier.txt';
    const nameFileEncryption = 'encryption.key';
    const nameFileDecryption = 'decryption.key';

    if (fs.statSync(pathFolder).isDirectory()) {
        APIKey.identifier = readFile(`${pathFolder}/${nameFileIdentifier}`);
        APIKey.encryptionKey = readFile(`${pathFolder}/${nameFileEncryption}`);
        APIKey.decryptionKey = readFile(`${pathFolder}/${nameFileDecryption}`);
    } else {
        let zip = new admZip(pathFolder);
        APIKey.identifier = zip.readAsText(nameFileIdentifier);
        APIKey.encryptionKey = zip.readAsText(nameFileEncryption);
        APIKey.decryptionKey = zip.readAsText(nameFileDecryption);
    }

    return APIKey;
}

function readFile(URLfile) {
    let contentFile = fs.readFileSync(URLfile, 'utf8');
    return contentFile;
}

function generateURI(hostname, clientAPI, endpoint, params) {
    let url;

    if(params) {
        url = `https://${hostname}/${clientAPI}/${endpoint}.json?${params}`;
    } else {
        url = `https://${hostname}/${clientAPI}/${endpoint}.json`;
    }

    return url;
}

module.exports = {
    login: login,
    init: init,
    request: request,
    generateURI: generateURI
};
