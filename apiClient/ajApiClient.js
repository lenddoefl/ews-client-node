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
        const self = this;
        let endpoint = 'startSession';
        let url = generateURI(hostname, clientAPI.path, endpoint);
        self.applicant = data.applicant;

        return self.checkExistenceUid(!self.uid, endpoint)
            .then(() => {
                return self.generalRequest(url, data, APIKey, hostname).then(response => {
                    if(response.data.uid) {
                        self.setUid(response.data.uid);
                    }
                    return response;
                });
            })
            .catch(error => {
                console.error(error.message);
            });
    }

    finishSession(data, APIKey, hostname) {
        let endpoint = 'finishSession';
        let url = generateURI(hostname, clientAPI.path, endpoint);
        data.uid = this.getUid();

        return this.generalRequestWithCheckUid(url, data, APIKey, hostname, endpoint);
    }

    finishStep(data, APIKey, hostname) {
        let endpoint = 'finishStep';
        let url = generateURI(hostname, clientAPI.path, endpoint);
        data.uid = this.getUid();

        return this.generalRequestWithCheckUid(url, data, APIKey, hostname, endpoint);
    }

    createAttachment(data, APIKey, hostname) {
        let endpoint = 'createAttachment';
        let url = generateURI(hostname, clientAPI.path, endpoint);
        data.uid = this.getUid();

        return this.generalRequestWithCheckUid(url, data, APIKey, hostname, endpoint);
    }

    getApplication(data, APIKey, hostname) {
        let endpoint = 'getApplication';
        let url = generateURI(hostname, clientAPI.path, endpoint);
        data.uid = this.getUid();

        return this.generalRequestWithCheckUid(url, data, APIKey, hostname, endpoint);
    }

    prefetchApplications(data, APIKey, hostname) {
        const self = this;
        let endpoint = 'prefetchApplications';
        let url = generateURI(hostname, clientAPI.path, endpoint);

        return self.checkExistenceUid(!self.uid, endpoint)
            .then(() => {
                return self.generalRequest(url, data, APIKey, hostname);
            })
            .catch(error => {
                console.error(error.message);
            });
    }

    resumeSession(data, APIKey, hostname) {
        const self = this;
        let endpoint = 'resumeSession';
        let url = generateURI(hostname, clientAPI.path, endpoint);
        data.uid = self.getUid();

        return self.checkExistenceUid(self.uid, endpoint)
            .then(() => {
                return self.loginAndHandling(url, data, APIKey, hostname).then(response => {
                    if(response.data.uid) {
                        self.setUid(response.data.uid);
                    }
                    return response;
                });
            })
            .catch(error => {
                console.error(error.message);
            });
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
                    if(data.hasOwnProperty('uid')) {
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
                    if(data.hasOwnProperty('uid') && !~url.indexOf('resumeSession')) {
                        return this.repeatRequestForEndpointWithUid(url, data, APIKey, hostname);
                    } else {
                        return this.repeatRequestForEndpointWithoutUid(url, data, APIKey, hostname)
                    }
                });
        });
    }

    generalRequestWithCheckUid(url, data, APIKey, hostname, endpoint) {
        const self = this;

        return self.checkExistenceUid(self.uid, endpoint)
            .then(() => {
                return self.generalRequest(url, data, APIKey, hostname);
            })
            .catch(error => {
                console.error(error.message);
            });
    }

    checkExistenceUid(condition, endpoint) {
        const self = this;
        return new Promise(function (resolve, reject) {
            if(condition) {
                resolve();
            } else {
                reject(new Error(`Error. The value of the uid ${!self.uid?'does not exist':'exists'}. You can not send a request for ${endpoint}.`));
            }
        });
    }
};
