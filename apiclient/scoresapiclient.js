var ews = require('./ews.js'),
    auth = ews.getTokens(),
    login = ews.login,
    request = ews.request,
    generateURI = ews.generateURI;

var clientAPI = 'ScoresAPI';

function subject(data, APIKey, hostname) {
    let endpoint = 'subjects';
    let url = generateURI(hostname, clientAPI, 'subject');

    if(!auth.ScoresAPI) {
        return login(clientAPI, APIKey, hostname).then(() => {
            return request(url, auth.ScoresAPI, data, endpoint).then(response => {
                return response;
            });
        });
    } else {
        return request(url, auth.ScoresAPI, data, endpoint).then(response => {
            return response;
        });
    }
}

function dataQuery(data, APIKey, hostname) {
    let endpoint = 'dateQuery';
    let url = generateURI(hostname, clientAPI, endpoint);

    if(!auth.ScoresAPI) {
        return login(clientAPI, APIKey, hostname).then(() => {
            return request(url, auth.ScoresAPI, data, endpoint).then(response => {
                return response;
            });
        });
    } else {
        return request(url, auth.ScoresAPI, data, endpoint).then(response => {
            return response;
        });
    }
}

module.exports = {
    init: ews.init,
    login: ews.login,
    subject: subject,
    dataQuery: dataQuery,
    generateURI: generateURI
};
