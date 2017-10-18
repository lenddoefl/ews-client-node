var fs = require('fs'),
    crypto = require('crypto'),
    axios = require('axios'),
    admZip = require('adm-zip');

var auth = {};

function login(clientAPI, APIKey, hostname) {
    let url;

    if(clientAPI.pathParams) {
        url = generateURI(hostname, clientAPI.path, 'login', clientAPI.pathParams);
    } else {
        url = generateURI(hostname, clientAPI.path, 'login');
    }

    return axios.post(url, {identifier: APIKey.identifier})
        .then(response => {
            let authToken, reqToken, responseData, processedReqToken;

            responseData = response.data;

            if(clientAPI.data) {
                authToken = responseData[clientAPI.data].authToken;
                reqToken = responseData[clientAPI.data].reqToken;
            } else {
                authToken = responseData.authToken;
                reqToken = responseData.reqToken;
            }

            if(authToken&&reqToken) {
                auth[clientAPI.name] = {
                    authToken: authToken,
                    reqToken: reqToken
                };

                processedReqToken = processReqToken(APIKey, auth[clientAPI.name]);

                if(!!auth[clientAPI.name]) auth[clientAPI.name].reqToken = processedReqToken;

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
    let hostname_AJ = data.hostname_AJ;
    let hostname_Scores = data.hostname_Scores;
    let pathFolder = data.pathFolder;
    let APIKey = getDataFromFiles(pathFolder);

    return {hostname_AJ: hostname_AJ, hostname_Scores: hostname_Scores, APIKey: APIKey};
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

function getTokens() {
    return auth;
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
    getTokens: getTokens,
    generateURI: generateURI
};
