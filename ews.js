var fs = require('fs');
var crypto = require('crypto');
var axios = require('axios');
var admZip = require('adm-zip');

var auth = {};

function login(clientAPI, APIKey, baseURL){
    var url = clientAPI==='AJAPI'?baseURL+'login.json':baseURL+'login.json?auth_type=1';

    return axios.post(url, {identifier: APIKey.identifier})
        .then(function (response) {
            if(response.data.statusCode===200&&response.data.statusMessage==='OK'
                ||response.data.status===1&&response.data.statusMessage==='Success') {

                var authToken, reqToken;
                var errorGettingTokens = 'Error getting tokens. These values are null.';

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
    var URL_AJ = data.URL_AJ;
    var URL_Scores = data.URL_Scores;
    var urlFolder = data.urlFolder;
    var APIKey = getDataFromFiles(urlFolder);

    return {URL_AJ: URL_AJ, URL_Scores: URL_Scores, APIKey: APIKey};
}

function processReqToken(keys, tokens) {
    var apiKeys = {
        encryptionKey: keys.encryptionKey,
        decryptionKey: keys.decryptionKey
    };

    var decrypted = decryptText("aes-128-cbc", apiKeys.decryptionKey, new Buffer(tokens.authToken,'base64'), tokens.reqToken, "base64");
    var reEncrypted = encryptText("aes-128-cbc", apiKeys.encryptionKey,  new Buffer(tokens.authToken,'base64'), decrypted, "base64");

    return reEncrypted;
}

function encryptText(cipher_alg, key, iv, text, encoding) {

    var cipher = crypto.createCipheriv(cipher_alg, key, iv);

    encoding = encoding || "binary";

    var result = cipher.update(text, "utf8", encoding);
    result += cipher.final(encoding);

    return result;
}

function decryptText(cipher_alg, key, iv, text, encoding) {
    var decipher = crypto.createDecipheriv(cipher_alg, key, iv);

    encoding = encoding || "binary";

    var result = decipher.update(text, encoding);
    result += decipher.final();

    return result;
}

function request(baseURL, tokens, data, endpoint) {
    var postData;
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
    var APIKey = {};

    var nameFileIdentifier = 'identifier.txt';
    var nameFileEncryption = 'encryption.key';
    var nameFileDecryption = 'decryption.key';
    if (fs.statSync(urlFolder).isDirectory()) {
        APIKey.identifier = readFile(urlFolder +'/'+nameFileIdentifier);
        APIKey.encryptionKey = readFile(urlFolder +'/'+nameFileEncryption);
        APIKey.decryptionKey = readFile(urlFolder +'/'+nameFileDecryption);
    } else {
        var zip = new admZip(urlFolder);
        APIKey.identifier = zip.readAsText(nameFileIdentifier);
        APIKey.encryptionKey = zip.readAsText(nameFileEncryption);
        APIKey.decryptionKey = zip.readAsText(nameFileDecryption);
    }

    return APIKey;
}

function readFile(URLfile) {
    var contentFile = fs.readFileSync(URLfile, 'utf8');
    return contentFile;
}

function getTokens() {
    return auth;
}

module.exports = {
    login: login,
    init: init,
    request: request,
    getTokens: getTokens,
};
