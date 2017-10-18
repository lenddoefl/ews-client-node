let ews = require('./ews.js'),
    auth = ews.getTokens(),
    login = ews.login,
    request = ews.request,
    generateURI = ews.generateURI;

let clientAPI = {
    name: 'AJAPI',
    path: 'api/v2/applicant_journey',
    data: 'data'
};

let uid, applicant;

module.exports = class AjApiClient {
    startSession(data, APIKey, hostname) {
        let url = generateURI(hostname, clientAPI.path, 'startSession');
        applicant = data.applicant;

        return generalRequest(url, data, APIKey, hostname).then((response) => {
            setUid(response.data.uid);
            return response;
        });
    }

    finishSession(data, APIKey, hostname) {
        let url = generateURI(hostname, clientAPI.path, 'finishSession');
        data.uid = getUid();

        return generalRequest(url, data, APIKey, hostname);
    }

    finishStep(data, APIKey, hostname) {
        let url = generateURI(hostname, clientAPI.path, 'finishStep');
        data.uid = getUid();

        return generalRequest(url, data, APIKey, hostname);
    }

    createAttachment(data, APIKey, hostname) {
        let url = generateURI(hostname, clientAPI.path, 'createAttachment');
        data.uid = getUid();

        return generalRequest(url, data, APIKey, hostname);
    }

    getApplication(data, APIKey, hostname) {
        let url = generateURI(hostname, clientAPI.path, 'getApplication');
        data.uid = getUid();

        return generalRequest(url, data, APIKey, hostname);
    }

    prefetchApplications(data, APIKey, hostname) {
        let url = generateURI(hostname, clientAPI.path, 'prefetchApplications');

        return loginAndHandling(url, data, APIKey, hostname);
    }

    resumeSession(data, APIKey, hostname) {
        return resumeSession(data, APIKey, hostname);
    }

    init(data) {
        return ews.init(data);
    }

    login(clientAPI, APIKey, hostname) {
        return login(clientAPI, APIKey, hostname);
    }

    generateURI(hostname, clientAPI, endpoint, params) {
        return generateURI(hostname, clientAPI, endpoint, params);
    }

    getUid() {
        return getUid();
    }
};

function generalRequest(url, data, APIKey, hostname) {
    if(!auth.AJAPI) {
        return loginAndHandling(url, data, APIKey, hostname);
    } else {
        return request(url, auth.AJAPI, data)
            .then(response => {
                return response.data;
            })
            .catch(() => {
                if(data.uid) {
                    return repeatRequestForEndpointWithUid(url, data, APIKey, hostname);
                } else {
                    return repeatRequestForEndpointWithoutUid(url, data, APIKey, hostname);
                }
            });
    }
}

function repeatRequestForEndpointWithUid(url, data, APIKey, hostname) {
    return login(clientAPI, APIKey, hostname).then(() => {
        let dataForResumeSession = {
            applicant: applicant
        };

        return resumeSession(dataForResumeSession, APIKey, hostname)
            .then(() => {
                return request(url, auth.AJAPI, data)
                    .then(response => {
                        return response.data;
                    })
                    .catch(error => {
                        return error.response;
                    });
            })
            .catch(error => {
                return error.response;
            });
    });
}

function repeatRequestForEndpointWithoutUid(url, data, APIKey, hostname) {
    return login(clientAPI, APIKey, hostname).then(() => {
        return request(url, auth.AJAPI, data)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return error.response;
            });
    });
}

function loginAndHandling(url, data, APIKey, hostname) {
    return login(clientAPI, APIKey, hostname).then(() => {
        return request(url, auth.AJAPI, data)
            .then(response => {
                return response.data;
            })
            .catch(() => {
                if(data.uid && ~url.indexOf('resumeSession')) {
                    return repeatRequestForEndpointWithUid(url, data, APIKey, hostname);
                } else {
                    return repeatRequestForEndpointWithoutUid(url, data, APIKey, hostname)
                }
            });
    });
}

function setUid(data) {
    uid = data;
}

function getUid() {
    return uid;
}

function resumeSession(data, APIKey, hostname) {
    let url = generateURI(hostname, clientAPI.path, 'resumeSession');
    data.uid = getUid();

    return loginAndHandling(url, data, APIKey, hostname);
}
