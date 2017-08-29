var ews = require('./ews.js'),
    auth = ews.getTokens(),
    login = ews.login,
    request = ews.request;

function subject(data, APIKey, baseURL) {
    var endpoint = 'subjects';
    if(!auth.ScoresAPI) {
        return login('ScoresAPI', APIKey, baseURL).then(function () {
            return request(baseURL+'subject.json?auth_type=1', auth.ScoresAPI, data, endpoint).then(function (response) {
                return response;
            });
        });
    } else {
        return request(baseURL+'subject.json?auth_type=1', auth.ScoresAPI, data, endpoint).then(function (response) {
            return response;
        });
    }
}

function dataQuery(data, APIKey, baseURL) {
    var endpoint = 'dateQuery';
    if(!auth.ScoresAPI) {
        return login('ScoresAPI', APIKey, baseURL).then(function () {
            return request(baseURL+'dateQuery.json?auth_type=1', auth.ScoresAPI, data, endpoint).then(function (response) {
                return response;
            });
        });
    } else {
        return request(baseURL+'dateQuery.json?auth_type=1', auth.ScoresAPI, data, endpoint).then(function (response) {
            return response;
        });
    }
}

module.exports = {
    init: ews.init,
    login: ews.login,
    subject: subject,
    dataQuery: dataQuery
};
