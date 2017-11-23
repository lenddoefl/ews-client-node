var module = require('../../index.js'),
    scoresModule = new module.scoresApiClient,
    optimist = require('optimist'),
    chai  = require('chai'),
    expect = chai.expect,
    moxios = require('moxios');

describe('Scores CLient', function () {
    this.timeout(5000);
    let urlLogin,
        tokens = {
            authToken: 'cnHgUZ/M0x5JG9T7KqDQSQ==\n',
            reqToken: 'TiD0lNdt0H6hhhsy75R8wXA3MNYH6wDBXvcKRCU5SG8a3Wb7zQQZWmoLaALApEnAvmfI1TftI1zJ\nU1SCTEC9vK843mCcvSrN/iMNGMBai0Q=\n'
        },
        clientAPI = {
            pathParams: 'auth_type=1'
        };

    before(() => {
        scoresModule.hostname = "uat-external.eflglobal.com";
        scoresModule.APIKey = {
            identifier: 'a809714fd73513891e6b3aa18a631cd8c4a7446437397536387487e8ed8eaee2',
            encryptionKey: '70f665f626b19d50',
            decryptionKey: 'e8fdd1c66db7f1c0'
        };
        urlLogin = scoresModule.generateURI('login', clientAPI.pathParams);
    });

    beforeEach(() => {
        moxios.install();
    });

    afterEach(()=>{
        moxios.uninstall();
    });

    describe('Call login', () => {
        it('Should come success response with status 1, status message Success, correct tokens', done => {
            moxios.stubRequest(urlLogin, {
                status: 200,
                statusText: 'OK',
                response: {
                    authToken: tokens.authToken,
                    status: 1,
                    statusMessage: 'Success',
                    reqToken: tokens.reqToken
                }
            });

            moxios.wait(function () {
                scoresModule.login().then(response => {
                    expect(response.status).to.equal(1);
                    expect(response.statusMessage).to.equal('Success');
                    expect(response.authToken).to.equal(tokens.authToken);
                    expect(response.reqToken).to.equal('BfzYwopfG7ji4vk4B4NIkgfnbZjUENe7wzl7I9qqFYHCHYt2ZmV9VADeQJ1IkcTrsVyUKI4+jgReecAgXscqMGIvSPRBDwyrpeTxnY2TN40=');

                    done();
                });
            });
        });
        it('Should come response with status 403, statusText FORBIDDEN', done => {
            moxios.stubRequest(urlLogin, {
                status: 403,
                statusText: 'FORBIDDEN',
                response: {
                    status: 0,
                    statusMessage: 'Login error'
                }
            });

            moxios.wait(function () {
                scoresModule.login().then(response => {
                    expect(response.status).to.equal(403);
                    expect(response.statusText).to.equal('FORBIDDEN');
                    expect(response.data.status).to.equal(0);
                    expect(response.data.statusMessage).to.equal('Login error');

                    done();
                });
            });
        });
    });

    describe('Call subject', () => {
        it('Should come success response with status 1, status message Success, correct subjects', done => {
            let urlSubject = scoresModule.generateURI('subject', clientAPI.pathParams),
                subjects = [
                    {
                        answerReliabilityFlag: "Green",
                        birthday: "1909-03-23T00:00:00",
                        eflId: "5fc252b3-e1b6-479a-903b-b375dc91a61f",
                        fullname: "Marion Ravenwood",
                        identification: [
                            {
                                "type": "nationalId",
                                "value": "DZ-015"
                            }
                        ],
                        scores: [
                            {
                                "category": null,
                                "createdDate": "2016-01-25T16:17:22",
                                "decision": null,
                                "lastModifiedDate": "2016-08-06T18:35:20",
                                "score": 223,
                                "status": 1,
                                "statusMessage": "Success",
                                "version": "Fox 20"
                            }
                        ]
                    }
                ],
                dataForCall = [
                {
                    "identification": [
                        {
                            "type": "nationalId",
                            "value": "DZ-015"
                        }
                    ]
                }
            ];

            moxios.stubRequest(urlLogin, {
                status: 200,
                statusText: 'OK',
                response: {
                    authToken: tokens.authToken,
                    status: 1,
                    statusMessage: 'Success',
                    reqToken: tokens.reqToken
                }
            });

            moxios.stubRequest(urlSubject, {
                response: {
                    status: 1,
                    subjects: subjects,
                    statusMessage: 'Success'
                }
            });

            moxios.wait(function () {
                scoresModule.subject(dataForCall).then(response => {
                    expect(response.status).to.equal(1);
                    expect(response.statusMessage).to.equal('Success');
                    expect(response.subjects).to.be.an('array');
                    expect(response.subjects).to.equal(subjects);

                    done();
                });
            });
        });
    });

    describe('Call dateQuery', () => {
        it('Should come success response with status 1, status message Success, correct subjects', done => {
            let urlDateQuery = scoresModule.generateURI('dateQuery', clientAPI.pathParams),
                subjects = [
                    {
                        answerReliabilityFlag: "Green",
                        birthday: "1909-03-23T00:00:00",
                        eflId: "5fc252b3-e1b6-479a-903b-b375dc91a61f",
                        fullname: "Marion Ravenwood",
                        identification: [
                            {
                                "type": "nationalId",
                                "value": "DZ-015"
                            }
                        ],
                        scores: [
                            {
                                "category": null,
                                "createdDate": "2016-01-25T16:17:22",
                                "decision": null,
                                "lastModifiedDate": "2016-08-06T18:35:20",
                                "score": 223,
                                "status": 1,
                                "statusMessage": "Success",
                                "version": "Fox 20"
                            }
                        ]
                    }
                ],
                dataForCall = "2017-08-24 00:00:00";

            moxios.stubRequest(urlDateQuery, {
                response: {
                    status: 1,
                    subjects: subjects,
                    statusMessage: 'Success'
                }
            });

            moxios.wait(function () {
                scoresModule.dateQuery(dataForCall).then(response => {
                    expect(response.status).to.equal(1);
                    expect(response.statusMessage).to.equal('Success');
                    expect(response.subjects).to.be.an('array');
                    expect(response.subjects).to.equal(subjects);

                    done();
                });
            });
        });
    });
});
