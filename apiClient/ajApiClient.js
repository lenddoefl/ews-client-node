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
        this.APIKey = '';
        this.hostname = '';

        this.uid = '';
        this.auth = {};

        this.applicant = {};
    }

    startSession(data) {
        let endpoint = 'startSession';
        let url = this.generateURI(endpoint);

        this.applicant = data.applicant;

        return this.checkExistenceUid(!this.uid, endpoint)
            .then(() => {
                return this.generalRequest(url, data).then(response => {
                    if(response.data.uid) {
                        this.setUid(response.data.uid);
                    }
                    return response;
                });
            })
            .catch(error => {
                return {data: {errors: error.message}};
            });
    }

    finishSession(data) {
        let endpoint = 'finishSession';
        let url = this.generateURI(endpoint);

        data.uid = this.getUid();

        return this.generalRequestWithCheckUid(url, data, endpoint);
    }

    finishStep(data) {
        let endpoint = 'finishStep';
        let url = this.generateURI(endpoint);

        data.uid = this.getUid();

        return this.generalRequestWithCheckUid(url, data, endpoint);
    }

    createAttachment(data) {
        let endpoint = 'createAttachment';
        let url = this.generateURI(endpoint);

        data.uid = this.getUid();

        return this.generalRequestWithCheckUid(url, data, endpoint);
    }

    getApplication(data) {
        let endpoint = 'getApplication';
        let url = this.generateURI(endpoint);

        data.uid = this.getUid();

        return this.generalRequestWithCheckUid(url, data, endpoint);
    }

    prefetchApplications(data) {
        let endpoint = 'prefetchApplications';
        let url = this.generateURI(endpoint);

        return this.checkExistenceUid(!this.uid, endpoint)
            .then(() => {
                return this.generalRequest(url, data);
            })
            .catch(error => {
                return {data: {errors: error.message}};
            });
    }

    resumeSession(data) {
        let endpoint = 'resumeSession';
        let url = this.generateURI(endpoint);

        data.uid = this.getUid();

        return this.checkExistenceUid(this.uid, endpoint)
            .then(() => {
                return this.loginAndHandling(url, data).then(response => {
                    if(response.data.uid) {
                        this.setUid(response.data.uid);
                    }
                    return response;
                });
            })
            .catch(error => {
                return {data: {errors: error.message}};
            });
    }

    init(data) {
        let enterData = ews.init(data);
        this.APIKey = enterData.APIKey;
        this.hostname = enterData.hostname;
    }

    login() {
        return login(clientAPI, this.APIKey, this.hostname).then(response => {
            this.auth = {
                authToken: response.data.authToken,
                reqToken: response.data.reqToken
            };

            return response;
        });
    }

    generateURI(endpoint) {
        return generateURI(this.hostname, clientAPI.path, endpoint);
    }

    getUid() {
        return this.uid;
    }

    setUid(data) {
        this.uid = data;
    }

    generalRequest(url, data) {
        if(!this.auth.authToken && !this.auth.reqToken) {
            return this.loginAndHandling(url, data);
        } else {
            return request(url, this.auth, data)
                .then(response => {
                    return response.data;
                })
                .catch(() => {
                    if(data.hasOwnProperty('uid')) {
                        return this.repeatRequestForEndpointWithUid(url, data);
                    } else {
                        return this.repeatRequestForEndpointWithoutUid(url, data);
                    }
                });
        }
    }

    repeatRequestForEndpointWithUid(url, data) {
        return this.login().then(() => {
            let dataForResumeSession = {
                applicant: this.applicant
            };

            return this.resumeSession(dataForResumeSession)
                .then(() => {
                    return request(url, this.auth, data)
                        .then(response => {
                            return response.data;
                        })
                        .catch(error => {
                            return error.response.data;
                        });
                })
                .catch(error => {
                    return error.response.data;
                });
        });
    }

    repeatRequestForEndpointWithoutUid(url, data) {
        return this.login().then(() => {
            return request(url, this.auth, data)
                .then(response => {
                    return response.data;
                })
                .catch(error => {
                    return error.response.data;
                });
        });
    }

    loginAndHandling(url, data) {
        return this.login().then(() => {
            return request(url, this.auth, data)
                .then(response => {
                    return response.data;
                })
                .catch(() => {
                    if(data.hasOwnProperty('uid') && !~url.indexOf('resumeSession')) {
                        return this.repeatRequestForEndpointWithUid(url, data);
                    } else {
                        return this.repeatRequestForEndpointWithoutUid(url, data)
                    }
                });
        });
    }

    generalRequestWithCheckUid(url, data, endpoint) {
        return this.checkExistenceUid(this.uid, endpoint)
            .then(() => {
                return this.generalRequest(url, data);
            })
            .catch(error => {
                return {data: {errors: error.message}};
            });
    }

    checkExistenceUid(condition, endpoint) {
        let self = this;
        return new Promise(function (resolve, reject) {
            if(condition) {
                resolve();
            } else {
                reject(new Error(`Error. The value of the uid ${!self.uid?'does not exist':'exists'}. You can not send a request for ${endpoint}.`));
            }
        });
    }
};
