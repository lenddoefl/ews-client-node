var ews = require('./ews.js');
var auth = ews.getTokens();
var login = ews.login;
var request = ews.request;

function subject(data, APIKey, baseURL) {
    var endpoint = 'subjects';
    if(!auth.ScoresAPI) {
        return login('ScoresAPI', APIKey, baseURL).then(function () {
            return  request(baseURL+'subject.json?auth_type=1', auth.ScoresAPI, data, endpoint);
        });
    } else {
        return  request(baseURL+'subject.json?auth_type=1', auth.ScoresAPI, data, endpoint);
    }
}

function dataQuery(data, APIKey, baseURL) {
    var endpoint = 'dateQuery';
    if(!auth.ScoresAPI) {
        return login('ScoresAPI', APIKey, baseURL).then(function () {
            return request(baseURL+'dateQuery.json?auth_type=1', auth.ScoresAPI, data, endpoint);
        });
    } else {
        return request(baseURL+'dateQuery.json?auth_type=1', auth.ScoresAPI, data, endpoint);
    }
}

module.exports = {
    init: ews.init,
    login: ews.login,
    subject: subject,
    dataQuery: dataQuery
};
