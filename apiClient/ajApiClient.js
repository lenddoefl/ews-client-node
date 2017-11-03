let ews = require('./ews.js'),
    login = ews.login,
    request = ews.request,
    generateURI = ews.generateURI;

let clientAPI = {
    path: 'api/v2/applicant_journey',
    data: 'data'
};

module.exports = class AjApiClient {
    constructor() {
        this.uid = '';
        this.applicant = {};
        this.auth = {};
    }

    startSession(data, APIKey, hostname) {
        let url = generateURI(hostname, clientAPI.path, 'startSession');
        this.applicant = data.applicant;

        return this.generalRequest(url, data, APIKey, hostname).then((response) => {
            this.setUid(response.data.uid);
            return response;
        });
    }

    finishSession(data, APIKey, hostname) {
        let url = generateURI(hostname, clientAPI.path, 'finishSession');
        data.uid = this.getUid();

        return this.generalRequest(url, data, APIKey, hostname);
    }

    finishStep(data, APIKey, hostname) {
        let url = generateURI(hostname, clientAPI.path, 'finishStep');
        data.uid = this.getUid();

        return this.generalRequest(url, data, APIKey, hostname);
    }

    createAttachment(data, APIKey, hostname) {
        let url = generateURI(hostname, clientAPI.path, 'createAttachment');
        data.uid = this.getUid();

        return this.generalRequest(url, data, APIKey, hostname);
    }

    getApplication(data, APIKey, hostname) {
        let url = generateURI(hostname, clientAPI.path, 'getApplication');
        data.uid = this.getUid();

        return this.generalRequest(url, data, APIKey, hostname);
    }

    prefetchApplications(data, APIKey, hostname) {
        let url = generateURI(hostname, clientAPI.path, 'prefetchApplications');

        return this.generalRequest(url, data, APIKey, hostname);
    }

    resumeSession(data, APIKey, hostname) {
        let url = generateURI(hostname, clientAPI.path, 'resumeSession');
        data.uid = this.getUid();

        return this.loginAndHandling(url, data, APIKey, hostname);
    }

    init(data) {
        data.clientAPI = 'AJ';
        return ews.init(data);
    }

    login(APIKey, hostname) {
        return login(clientAPI, APIKey, hostname).then(response => {
            this.auth = {
                authToken: response.data.authToken,
                reqToken: response.data.reqToken
            };

            return response;
        });
    }

    generateURI(hostname, clientAPI, endpoint, params) {
        return generateURI(hostname, clientAPI, endpoint, params);
    }

    getUid() {
        return this.uid;
    }

    setUid(data) {
        this.uid = data;
    }

    generalRequest(url, data, APIKey, hostname) {
        if(!this.auth.authToken && !this.auth.reqToken) {
            return this.loginAndHandling(url, data, APIKey, hostname);
        } else {
            return request(url, this.auth, data)
                .then(response => {
                    return response.data;
                })
                .catch(() => {
                    if(data.uid) {
                        return this.repeatRequestForEndpointWithUid(url, data, APIKey, hostname);
                    } else {
                        return this.repeatRequestForEndpointWithoutUid(url, data, APIKey, hostname);
                    }
                });
        }
    }

    repeatRequestForEndpointWithUid(url, data, APIKey, hostname) {
        return this.login(APIKey, hostname).then(() => {
            let dataForResumeSession = {
                applicant: this.applicant
            };

            return this.resumeSession(dataForResumeSession, APIKey, hostname)
                .then(() => {
                    return request(url, this.auth, data)
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

    repeatRequestForEndpointWithoutUid(url, data, APIKey, hostname) {
        return this.login(APIKey, hostname).then(() => {
            return request(url, this.auth, data)
                .then(response => {
                    return response.data;
                })
                .catch(error => {
                    return error.response;
                });
        });
    }

    loginAndHandling(url, data, APIKey, hostname) {
        return this.login(APIKey, hostname).then(() => {
            return request(url, this.auth, data)
                .then(response => {
                    return response.data;
                })
                .catch(() => {
                    if(data.uid && !~url.indexOf('resumeSession')) {
                        return this.repeatRequestForEndpointWithUid(url, data, APIKey, hostname);
                    } else {
                        return this.repeatRequestForEndpointWithoutUid(url, data, APIKey, hostname)
                    }
                });
        });
    }
};
