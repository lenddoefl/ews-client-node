var ews = require('./ews.js'),
    auth = ews.getTokens(),
    login = ews.login,
    request = ews.request;

function startSession(data, APIKey, baseURL) {
    if(!auth.AJAPI) {
        return login('AJAPI', APIKey, baseURL).then(function () {
            return request(baseURL+'startSession.json', auth.AJAPI, data).then(function (response) {
                return response;
            });
        });
    } else {
        return request(baseURL+'startSession.json', auth.AJAPI, data).then(function (response) {
            return response;
        });
    }
}

function finishSession(data, APIKey, baseURL) {
    if(!auth.AJAPI) {
        return login('AJAPI', APIKey, baseURL).then(function () {
            return request(baseURL+'finishSession.json', auth.AJAPI, data).then(function (response) {
                return response;
            });
        });
    } else {
        return request(baseURL+'finishSession.json', auth.AJAPI, data).then(function (response) {
            return response;
        });
    }
}

function finishStep(data, APIKey, baseURL) {
    if(!auth.AJAPI) {
        return login('AJAPI', APIKey, baseURL).then(function () {
            return request(baseURL+'finishStep.json', auth.AJAPI, data).then(function (response) {
                return response;
            });
        });
    } else {
        return request(baseURL+'finishStep.json', auth.AJAPI, data).then(function (response) {
            return response;
        });
    }
}

function createAttachment(data, APIKey, baseURL) {
    if(!auth.AJAPI) {
        return login('AJAPI', APIKey, baseURL).then(function () {
            return request(baseURL+'createAttachment.json', auth.AJAPI, data).then(function (response) {
                return response;
            });
        });
    } else {
        return request(baseURL+'createAttachment.json', auth.AJAPI, data).then(function (response) {
            return response;
        });
    }
}

function getApplication(data, APIKey, baseURL) {
    if(!auth.AJAPI) {
        return login('AJAPI', APIKey, baseURL).then(function () {
            return request(baseURL+'getApplication.json', auth.AJAPI, data).then(function (response) {
                return response;
            });
        });
    } else {
        return request(baseURL+'getApplication.json', auth.AJAPI, data).then(function (response) {
            return response;
        });
    }
}

function prefetchApplications(data, APIKey, baseURL) {
    return login('AJAPI', APIKey, baseURL).then(function () {
        return request(baseURL+'prefetchApplications.json', auth.AJAPI, data).then(function (response) {
            return response;
        });
    });
}

function resumeSession(data, APIKey, baseURL) {
    return login('AJAPI', APIKey, baseURL).then(function () {
        return request(baseURL+'resumeSession.json', auth.AJAPI, data).then(function (response) {
            return response;
        });
    });
}

module.exports = {
    init: ews.init,
    login: ews.login,
    startSession: startSession,
    finishSession: finishSession,
    finishStep: finishStep,
    createAttachment: createAttachment,
    getApplication: getApplication,
    prefetchApplications: prefetchApplications,
    resumeSession: resumeSession,
};
