var fs = require('fs'),
    crypto = require('crypto'),
    axios = require('axios'),
    admZip = require('adm-zip');

var auth = {};

function login(clientAPI, APIKey, hostname){
    const url = generateURI(hostname, clientAPI, 'login');

    return axios.post(url, {identifier: APIKey.identifier})
        .then(function (response) {
            if(response.data.statusCode===200&&response.data.statusMessage==='OK'
                ||response.data.status===1&&response.data.statusMessage==='Success') {

                let authToken, reqToken;
                const errorGettingTokens = 'Error getting tokens. These values are null.';

                if(clientAPI==='ScoresAPI') {
                    authToken = response.data.authToken;
                    reqToken = response.data.reqToken;

                    if(authToken!=null&&reqToken!=null) {
                        auth[clientAPI] = {
                            authToken: response.data.authToken,
                            reqToken: response.data.reqToken
                        };
                    } else {
                        console.log(errorGettingTokens);
                    }
                } else {
                    authToken = response.data.data.authToken;
                    reqToken = response.data.data.reqToken;

                    if(authToken!=null&&reqToken!=null) {
                        auth[clientAPI] = Object.assign({},response.data.data);
                    }
                    else {
                        console.log(errorGettingTokens);
                    }
                }

                if(!!auth[clientAPI]) auth[clientAPI].reqToken = processReqToken(APIKey, auth[clientAPI]);
            }
            return response.data;
        })
        .catch(function (error) {
            console.log('Error:', error);
        });
}

function init(data) {
    let hostname_AJ = data.hostname_AJ;
    let hostname_Scores = data.hostname_Scores;
    let urlFolder = data.urlFolder;
    let APIKey = getDataFromFiles(urlFolder);

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
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log('Error:',error);
        });
}

function getDataFromFiles(urlFolder) {
    let APIKey = {};

    const nameFileIdentifier = 'identifier.txt';
    const nameFileEncryption = 'encryption.key';
    const nameFileDecryption = 'decryption.key';

    if (fs.statSync(urlFolder).isDirectory()) {
        APIKey.identifier = readFile(`${urlFolder}/${nameFileIdentifier}`);
        APIKey.encryptionKey = readFile(`${urlFolder}/${nameFileEncryption}`);
        APIKey.decryptionKey = readFile(`${urlFolder}/${nameFileDecryption}`);
    } else {
        let zip = new admZip(urlFolder);
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

function generateURI(hostname, clientAPI, endpoint) {
    let url;
    if(clientAPI==='AJAPI') {
        url = `https://${hostname}/api/v2/applicant_journey/${endpoint}.json`;
    } else {
        url = `https://${hostname}/api/v1/scores/${endpoint}.json?auth_type=1`;
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
