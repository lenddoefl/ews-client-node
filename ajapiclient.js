var ews = require('./ews.js');
var auth = ews.getTokens();
var login = ews.login;
var request = ews.request;

function startSession(data, APIKey, baseURL) {
    if(!auth.AJAPI) {
        return login('AJAPI', APIKey, baseURL).then(function () {
            return request(baseURL+'startSession.json', auth.AJAPI, data).then(function (response) {
                console.log('Start Session');
                console.log('Application hash:' + response.data.applicationHash);
                console.log('Public Key' + response.data.publicKey)
            });
        });
    } else {
        return request(baseURL+'startSession.json', auth.AJAPI, data);
    }
}

function finishSession(data, APIKey, baseURL) {
    if(!auth.AJAPI) {
        return login('AJAPI', APIKey, baseURL).then(function () {
            return request(baseURL+'finishSession.json', auth.AJAPI, data);
        });
    } else {
        return request(baseURL+'finishSession.json', auth.AJAPI, data);
    }
}

function finishStep(data, APIKey, baseURL) {
    if(!auth.AJAPI) {
        return login('AJAPI', APIKey, baseURL).then(function () {
            return request(baseURL+'finishStep.json', auth.AJAPI, data);
        });
    } else {
        return request(baseURL+'finishStep.json', auth.AJAPI, data);
    }
}

function createAttachment(data, APIKey, baseURL) {
    if(!auth.AJAPI) {
        return login('AJAPI', APIKey, baseURL).then(function () {
            return request(baseURL+'createAttachment.json', auth.AJAPI, data);
        });
    } else {
        return request(baseURL+'createAttachment.json', auth.AJAPI, data);
    }
}

function getApplication(data, APIKey, baseURL) {
    if(!auth.AJAPI) {
        return login('AJAPI', APIKey, baseURL).then(function () {
            return request(baseURL+'getApplication.json', auth.AJAPI, data);
        });
    } else {
        return request(baseURL+'getApplication.json', auth.AJAPI, data);
    }
}

function prefetchApplications(data, APIKey, baseURL) {
    if(!auth.AJAPI) {
        return login('AJAPI', APIKey, baseURL).then(function () {
            return request(baseURL+'prefetchApplications.json', auth.AJAPI, data);
        });
    } else {
        return request(baseURL+'prefetchApplications.json', auth.AJAPI, data);
    }
}

function resumeSession(data, APIKey, baseURL) {
    if(!auth.AJAPI) {
        return login('AJAPI', APIKey, baseURL).then(function () {
            return request(baseURL+'resumeSession.json', auth.AJAPI, data);
        });
    } else {
        return request(baseURL+'resumeSession.json', auth.AJAPI, data);
    }
}

module.exports = {
    init: ews.init,
    startSession: startSession,
    finishSession: finishSession,
    finishStep: finishStep,
    createAttachment: createAttachment,
    getApplication: getApplication,
    prefetchApplications: prefetchApplications,
    resumeSession: resumeSession,
};
