var module = require('../../index.js'),
    ajModule = new module.ajApiClient,
    optimist = require('optimist'),
    chai  = require('chai'),
    expect = chai.expect,
    moxios = require('moxios');

describe('Applicant Journey CLient', function () {
    this.timeout(5000);
    let urlLogin,
        argvHostname = optimist.demand('hostname').argv,
        argvPathToApiKey = optimist.demand('pathToApiKey').argv;

    before(() => {
        ajModule.init({
            hostname: argvHostname.hostname,
            pathFolder: argvPathToApiKey.pathToApiKey
        });
        urlLogin = ajModule.generateURI('login');
    });

    beforeEach(() => {
        moxios.install();
    });

    afterEach(()=>{
        moxios.uninstall();
    });

    describe('Call login', () => {

        it('Should come success response with status code 200, status message OK', done => {
            moxios.stubRequest(urlLogin, {
                status: 200,
                statusText: 'OK',
                response: {
                    data: {
                        authToken: 'iQsyemeGaI3ThwETOlwFbg==\n',
                        reqToken: 'ElA9MqO2eAAIASM2uWU4pxn7iLlTWOlB3VzrdTzzWCSpA33ruX4Nsu5gGZtl5aay+TCoGDPD/agc\n3OHme+eETIvQYGB8HepmiYNuvXN35pA=\n'
                    },
                    statusCode: 200,
                    statusMessage: 'OK'
                }
            });

            moxios.wait(function () {
                ajModule.login().then(response => {
                    expect(response.statusCode).to.equal(200);
                    expect(response.statusMessage).to.equal('OK');
                    expect(response.data.authToken).to.equal('iQsyemeGaI3ThwETOlwFbg==\n');
                    expect(response.data.reqToken).to.equal('0CZC7AyEoW3JlgGBMnz4d5vGoyMGFkD1Vx+PFf/m9nnLLpdx8/YR8d/J8e+vgtzmCU5x/i/U2NwrdIVxKL1G84ty1l6IrHKOn43hAIsNIgI=');

                    done();
                });
            });
        });

        it('Should come response with status 401, statusText UNAUTHORIZED', done => {
            moxios.stubRequest(urlLogin, {
                status: 401,
                statusText: 'UNAUTHORIZED',
                response: {
                    data: {
                        errors: {}
                    },
                    statusCode: 401,
                    statusMessage: 'Unauthorized'
                }
            });

            moxios.wait(function () {
                ajModule.login().then(response => {
                    expect(response.status).to.equal(401);
                    expect(response.statusText).to.equal('UNAUTHORIZED');
                    expect(response.data.statusCode).to.equal(401);
                    expect(response.data.statusMessage).to.equal('Unauthorized');
                    expect(response.data.data.errors).to.be.an('object').that.is.empty;

                    done();
                });
            });
        });
    });

    describe('Call startSession', () => {

        it('Should come success response with status code 200, status message OK, correct data', done => {
            let urlStartSession = ajModule.generateURI('startSession'),
                dataResponse = {
                        applicationHash: '64a9354b-1014-1698-330e-721b75a109bb#1.20.0.0',
                        publicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzlc2BS063TWMy4O/tMRaePswCE8mBZO+zv4p3xpGYARPAgCQ/djIiNo9IvKF+aI91yKDoNiNCQaD61fuiOEtpwglq08+Kijraa5TtWDdTu29bYQI+AMQosskXOsnj5GprHTnpyjthTmM3xNVgncVKKbJEV6657mtdl5zh0brchVd66wSNsQXtkpbW0yw15Ek2H4orqcJoFtOLz63OTPwlf24VpkHnrquY7MDlFaTkpnHaUtEDfgVUhA5w90DdSbxICWWlDu49tMHhUnJ+ziD/h3QNG4NU5nJUIlRL/IXByC9vTzyCXEEoFVrlBQLz8o9xyYiLHv+fE6+Onx771wRKQIDAQAB',
                        uid: 'e6d5f70352d2447e82b24a87e350e32a'
                },
                dataForCall = {
                    applicant: {},
                    application: "sdkExample"
                };

            moxios.stubRequest(urlLogin, {
                status: 200,
                statusText: 'OK',
                response: {
                    data: {
                        authToken: 'iQsyemeGaI3ThwETOlwFbg==\n',
                        reqToken: 'ElA9MqO2eAAIASM2uWU4pxn7iLlTWOlB3VzrdTzzWCSpA33ruX4Nsu5gGZtl5aay+TCoGDPD/agc\n3OHme+eETIvQYGB8HepmiYNuvXN35pA=\n'
                    },
                    statusCode: 200,
                    statusMessage: 'OK'
                }
            });

            moxios.stubRequest(urlStartSession, {
                response: {
                    data: dataResponse,
                    statusCode: 200,
                    statusMessage: 'OK'
                }
            });

            moxios.wait(function () {
                ajModule.startSession(dataForCall).then(response => {
                    expect(response.statusCode).to.equal(200);
                    expect(response.statusMessage).to.equal('OK');
                    expect(response.data).to.be.an('object');
                    expect(response.data).to.equal(dataResponse);

                    done();
                });
            });
        });
    });

    describe('Call finishSession', () => {

        it('Should come success response with status code 200, status message OK, correct data', done => {
            let urlFinishSession = ajModule.generateURI('finishSession'),
                dataForCall = {
                    sequence: 0
                };

            moxios.stubRequest(urlLogin, {
                status: 200,
                statusText: 'OK',
                response: {
                    data: {
                        authToken: 'iQsyemeGaI3ThwETOlwFbg==\n',
                        reqToken: 'ElA9MqO2eAAIASM2uWU4pxn7iLlTWOlB3VzrdTzzWCSpA33ruX4Nsu5gGZtl5aay+TCoGDPD/agc\n3OHme+eETIvQYGB8HepmiYNuvXN35pA=\n'
                    },
                    statusCode: 200,
                    statusMessage: 'OK'
                }
            });

            moxios.stubRequest(urlFinishSession, {
                response: {
                    data: {},
                    statusCode: 200,
                    statusMessage: 'OK'
                }
            });

            moxios.wait(function () {
                ajModule.finishSession(dataForCall).then(response => {
                    expect(response.statusCode).to.equal(200);
                    expect(response.statusMessage).to.equal('OK');
                    expect(response.data).to.be.an('object');
                    expect(response.data).to.be.empty;

                    done();
                });
            });
        });
    });

    describe('Call finishStep', () => {

        it('Should come success response with status code 200, status message OK, correct data', done => {
            let urlFinishStep = ajModule.generateURI('finishStep'),
                dataForCall = {
                    applicant: {},
                    device: {
                        browser: null,
                        deviceId: null,
                        ipAddress: null,
                        os: {
                            type: null,
                            version: null
                        },
                        referrer: null,
                        viewport: {
                            height: null,
                            width: null
                        }
                    },
                    metas: {},
                    observations: {},
                    sequence: 0,
                    state: {},
                    step: 'abGlobal'
                };

            moxios.stubRequest(urlLogin, {
                status: 200,
                statusText: 'OK',
                response: {
                    data: {
                        authToken: 'iQsyemeGaI3ThwETOlwFbg==\n',
                        reqToken: 'ElA9MqO2eAAIASM2uWU4pxn7iLlTWOlB3VzrdTzzWCSpA33ruX4Nsu5gGZtl5aay+TCoGDPD/agc\n3OHme+eETIvQYGB8HepmiYNuvXN35pA=\n'
                    },
                    statusCode: 200,
                    statusMessage: 'OK'
                }
            });

            moxios.stubRequest(urlFinishStep, {
                response: {
                    data: {},
                    statusCode: 200,
                    statusMessage: 'OK'
                }
            });

            moxios.wait(function () {
                ajModule.finishStep(dataForCall).then(response => {
                    expect(response.statusCode).to.equal(200);
                    expect(response.statusMessage).to.equal('OK');
                    expect(response.data).to.be.an('object');
                    expect(response.data).to.be.empty;

                    done();
                });
            });
        });
    });

    describe('Call createAttachment', () => {

        it('Should come success response with status code 200, status message OK, correct data', done => {
            let urlCreateAttachment = ajModule.generateURI('createAttachment'),
                dataResponse = {
                    attachmentUid: '5c4e3282412e4548bd3194e8eac52099'
                },
                dataForCall = {
                    attachmentType: 'photo',
                    attachmentTypeVersion: '1.0',
                    contentType: 'image/jpeg',
                    inlineData: `/9j/4AAQSkZJRgABAQEASABIAAD/2wCEAAICAgICAQICAgIDAgIDAwYEAwMDAwcFBQQGCAcJCAgH
                            CAgJCg0LCQoMCggICw8LDA0ODg8OCQsQERAOEQ0ODg4BAgMDAwMDBwQEBw4JCAkODg4ODg4ODg4O
                            Dg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODv/CABEIAMgAyAMBIgACEQED
                            EQH/xAAYAAEBAQEBAAAAAAAAAAAAAAAACAkBB//aAAgBAQAAAADfwAAABCc+AAAHqejjEqBAAACw
                            t7mJUCAAAFhb3MSoEAAALC3uYlQIAAAWFvcxKgQAAAsLe5iVAgAABYW9zEqBAAACwt7mJUCAAAFh
                            b3MSoEAAALC3uYlQIAAAWFvcxKgQAAAsLe5iVAgAABYW9zEqBAAACwt7mJUCAAAFhb3MSoEAAALC
                            3uYlQIAAAWFvcxKgQAAAsLe5iVAgAABYW9zEqBAAACwt7mJUCAAAFhb3MSoEAAALC3uZgycAAHeF
                            G6xAAAAP/8QAGQEBAQEBAQEAAAAAAAAAAAAAAAcFBgME/9oACAECEAAAAPjxQB69DyMdAGre+Rjo
                            A1b3yMdAGre+RjoA1b3yMdAGre+RjoA1b3yMdAGre+RjoA1b3yMdAGre+RjoA1b3zErAGlaQAH//
                            xAAaAQEBAQEAAwAAAAAAAAAAAAAABwUEAQIG/9oACAEDEAAAAOfOAHvrYE+APPdUcCfADvqOBPgB
                            31HAnwA76jgT4Ad9RwJ8AO+o4E+AHfUcCfADvqOBPgB31HAnwA76ji/EADsooAD/xAA1EAAAAQYO
                            AgIBAwUAAAAAAAAEAAEDBQhWAgYJEBgZODlAdXaUlrPR0wcRIRITkRUxMlFh/9oACAEBAAE/AMU0
                            g1os/hD56RRRDqZANQQ1OHHGTQ0J4cL7SJEsE5v8zf2/bN/JVjK4dwNtD+wqxlcu4H2h/aVYyuXc
                            DbQ/sKsZXLuBtof2FWMrl3A+0P7SrGVy7gfaH9pVjK5dwNtD+wqxlcu4G2h/YVYyuXcD7Q/tKsZX
                            LuBtof2FWMrl3A20P7CrGVy7gbaH9hVjK5dwNtD+wqxlcu4G2h/YVYyuXcDbQ/sKsZXLuBtof2lW
                            Mrl3Q2zP7SrGVy7obZn9pVjK4dwPtD+0qxlcu4H2h/aVYyuXcDbQ/sL4GbKjV8xtmRbiD/RleBUA
                            pWDRIxKcNCgpzw0SM0KAaAf9w5jG/wB/Zj/f/J5RC24C0oC7xOGYOvL4rZKsuk08ohbcBaUBd4nD
                            MHXl8VslWXSaeUQtuAtKAu8ThmDry+K2SrLpNPKIW3AWlAXeJwzB15fFbJVl0mnlELbgLSgLvE4Z
                            g68vitkqy6TTyiFtwFpQF3icMwdeXxWyVZdJp5RC24C0oC7xOGYOvL4rZKsuk08ohbcBaUBd4nDM
                            HXl8VslWXSaeUQtuAtKAu8ThmDry+K2SrLpNPKIW3AWlAXeJwzB15fFbJVl0mnlELbgLSgLvE4Zg
                            68vitkqy6TTyiFtwFpQF3icMwdeXxWyVZdJp5RC24C0oC7xOGYOvL4rZKsuk08ohbcBaUBd4nDMH
                            Xl8VslWXSaeUQtuAtKAu8ThmDry+K2SrLpNPKIW3AWlAXeJwzB15fFbJVl0mnlELbgLSgLvE4Zg6
                            8vitkqy6TTyiFtwFpQF3icMwdeXxWyVZdJp5RC24C0oC7xOGYOvL4rZKsuk08ohbcBaUBd4nDMHX
                            l8VslWXSaeUQtuAtKAu8ThmDry+K2SrLpNO2IzP8yfL7UwOM0QlIrViooEXwwRIlFrdGGhmTQEqa
                            FCN+mF+fr6SQfyVA9ph1lLyVD4Kge0w6yl5Kh8FQPaYdZS8lQ+CoHtMOspeSIfBUD2mHWUvJUPgq
                            B7TDrKXkqHwVA9ph1lLyRD4Kge0w6yl5Kh8FQPaYdZS8lQ+CoHtMOspeSofBUD2mHWUvJUPgqB7T
                            DrKXkqHwVA9ph1lLyVD4Kge0w6yl5Kh8FQPaYdZS8kQ+CoHtMOspeSofBUD2mHWUvJEPgqBzS7rK
                            XkiHwVA9ph1lLyVD4Kge0w6yl5Kh8FQPaYdZS8lQ+CZSZS+bPittdRx1jqolYAi+FVg1AlShl0iE
                            QzQ0qI0GAb9EH8n/AD/GL//EACsRAAACBgoCAwEAAAAAAAAAAAEFAAIDEBU1BjBSU3FykaGxwQQR
                            EiFRE//aAAgBAgEBPwDyfKY+Gy/o1H0CR8st7JHyy3skfLLeyR8st7JHyy3skfLLeyR8st7JHyy3
                            skfLLeyR8st7IzOy9q0VZqLexWEAD6/XUklo4h3VlkxY5g5dSSWjiHdWWTFjmDl1JJaOId1ZZMWO
                            YOXUklo4h3VlkxY5g5dSSWjiHdWWTFjmDl1JJaOId1ZZMWOYOXUklo4h3VlkxY5g5dSSWjiHdWWT
                            FjmDl1JJaOId1ZZMWOYOXUklo4h3VlkxY5g5cfMWrfwPgyVFYfYfQfaQwxuVtBSGGNytoKQwxuVt
                            BSGGNytoKQwxuVtBSGGNytoKQwxuVtBSGGNytoKQwxuVtBSGGNytoKF5f5zPzmSyzJYABYPY+h/a
                            /wD/xAApEQABAQQLAAMBAQAAAAAAAAABBAADBTQCEBQVMFJTcYGRsRESITFB/9oACAEDAQE/AHz9
                            2nofd4fgNeiLM16IszXoizNeiLM16IszXoizNeiLM16IszXoizNeiPM1CJJHlMUKJ/T+VRiT5GGi
                            m3e49qjEnyMNFNu9x7VGJPkYaKbd7j2qMSfIw0U273HtUYk+Rhopt3uPaoxJ8jDRTbvce1RiT5GG
                            im3e49qjEnyMNFNu9x7VGJPkYaKbd7j2qMSfIw0U273HtUUdvHqX60B8n5H8axK9M9FrEr0z01iV
                            6Z6LWJXpnprEr0z0WsSvTPTWJXpnotYlememsSvTPTWJXpnoskSKqCmhSpUCACP8x//Z`,
                    name: 'test',
                    sha1Hash: 'a658db8045c171c85e42a257654bad0ebfec1ce1',
                    size: 2217
                };

            moxios.stubRequest(urlLogin, {
                status: 200,
                statusText: 'OK',
                response: {
                    data: {
                        authToken: 'iQsyemeGaI3ThwETOlwFbg==\n',
                        reqToken: 'ElA9MqO2eAAIASM2uWU4pxn7iLlTWOlB3VzrdTzzWCSpA33ruX4Nsu5gGZtl5aay+TCoGDPD/agc\n3OHme+eETIvQYGB8HepmiYNuvXN35pA=\n'
                    },
                    statusCode: 200,
                    statusMessage: 'OK'
                }
            });

            moxios.stubRequest(urlCreateAttachment, {
                response: {
                    data: dataResponse,
                    statusCode: 200,
                    statusMessage: 'OK'
                }
            });

            moxios.wait(function () {
                ajModule.createAttachment(dataForCall).then(response => {
                    expect(response.statusCode).to.equal(200);
                    expect(response.statusMessage).to.equal('OK');
                    expect(response.data).to.be.an('object');
                    expect(response.data.attachmentUid).to.be.a('string');
                    expect(response.data.attachmentUid).to.equal(dataResponse.attachmentUid);

                    done();
                });
            });
        });
    });

    describe('Call getApplication', () => {

        it('Should come success response with status code 200, status message OK, correct data', done => {
            let urlGetApplication = ajModule.generateURI('getApplication'),
                completedSteps=['completedSteps'],
                dataResponse = {
                    applicant: {},
                    applicationHash: '64a9354b-1014-1698-330e-721b75a109bb#1.20.0.0',
                    playerConfiguration: {},
                    state: {
                        completedSteps: completedSteps
                    },
                    useCached: true
                },
                dataForCall = {
                    device: {
                        browser: null,
                        deviceId: null,
                        ipAddress: null,
                        os: {
                            type: null,
                            version: null
                        },
                        referrer: null,
                        viewport: {
                            height: null,
                            width: null
                        }
                    },
                    player: {
                        type: 'web-embedded',
                        version: '1.20'
                    }
                };

            moxios.stubRequest(urlLogin, {
                status: 200,
                statusText: 'OK',
                response: {
                    data: {
                        authToken: 'iQsyemeGaI3ThwETOlwFbg==\n',
                        reqToken: 'ElA9MqO2eAAIASM2uWU4pxn7iLlTWOlB3VzrdTzzWCSpA33ruX4Nsu5gGZtl5aay+TCoGDPD/agc\n3OHme+eETIvQYGB8HepmiYNuvXN35pA=\n'
                    },
                    statusCode: 200,
                    statusMessage: 'OK'
                }
            });

            moxios.stubRequest(urlGetApplication, {
                response: {
                    data: dataResponse,
                    statusCode: 200,
                    statusMessage: 'OK'
                }
            });

            moxios.wait(function () {
                ajModule.getApplication(dataForCall).then(response => {
                    expect(response.statusCode).to.equal(200);
                    expect(response.statusMessage).to.equal('OK');
                    expect(response.data).to.be.an('object');
                    expect(response.data.applicant).to.be.an('object').that.is.empty;
                    expect(response.data.applicationHash).to.equal('64a9354b-1014-1698-330e-721b75a109bb#1.20.0.0');
                    expect(response.data.playerConfiguration).to.be.an('object').that.is.empty;
                    expect(response.data.state).to.be.an('object');
                    expect(response.data.state.completedSteps).to.equal(completedSteps);
                    expect(response.data.useCached).to.be.true;

                    done();
                });
            });
        });
    });


    describe('Call resumeSession', () => {

        it('Should come success response with status code 200, status message OK, correct data', done => {
            let urlResumeSession = ajModule.generateURI('resumeSession'),
                dataResponse = {
                    uid: ajModule.getUid(),
                    publicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAw9wCxActD6cQtwPuKTgGrxQ+tAqv2FQQaMy+99FPLLn2JnApxcWCavoaPRCmWJU50aHjXxtK4HG0/oN6xKjPwtm7TU0O/y4iL0M3bs4a9TpL/vErf68m/LA+Qd0knP8fCwjOQTucCyuOLzat1rW08feee0o1VOvJqY6U7ewonWJEzOsK4KewKhzHEY+QWJrkI1H5GZIC2oCH5+LdxkeU/w5lL/MYVfWclUpsdH0KiWadEHTw3hzXQKaTeDZb6OPUC+2CFWUjaIS2CS3/KSonzbXtbTCWcmCjb6dLKkQAMYkXLw3/WHGfDwiqzsYOznhtRPNP49Bq12bRMOr6Nch8rwIDAQAB'
                },
                dataForCall = {
                    applicant: {}
                };

            moxios.stubRequest(urlLogin, {
                status: 200,
                statusText: 'OK',
                response: {
                    data: {
                        authToken: 'iQsyemeGaI3ThwETOlwFbg==\n',
                        reqToken: 'ElA9MqO2eAAIASM2uWU4pxn7iLlTWOlB3VzrdTzzWCSpA33ruX4Nsu5gGZtl5aay+TCoGDPD/agc\n3OHme+eETIvQYGB8HepmiYNuvXN35pA=\n'
                    },
                    statusCode: 200,
                    statusMessage: 'OK'
                }
            });

            moxios.stubRequest(urlResumeSession, {
                response: {
                    data: dataResponse,
                    statusCode: 200,
                    statusMessage: 'OK'
                }
            });

            moxios.wait(function () {
                ajModule.resumeSession(dataForCall).then(response => {
                    expect(response.statusCode).to.equal(200);
                    expect(response.statusMessage).to.equal('OK');
                    expect(response.data).to.be.an('object');
                    expect(response.data).to.equal(dataResponse);

                    done();
                });
            });
        });
    });

    describe('Call prefetchApplications', () => {

        it('Should come success response with status code 200, status message OK, correct data', done => {
            let urlPrefetchApplications = ajModule.generateURI('prefetchApplications'),
                dataResponse = {
                    sdkExample: {
                        applicationHash: '64a9354b-1014-1698-330e-721b75a109bb#1.20.0.0',
                        playerConfiguration: {},
                        useCached: true,
                    }
                },
                dataForCall = {
                    applications: {
                        sdkExample: "64a9354b-1014-1698-330e-721b75a109bb#1.20.0.0"
                    }
                };

            ajModule.setUid('');

            moxios.stubRequest(urlLogin, {
                status: 200,
                statusText: 'OK',
                response: {
                    data: {
                        authToken: 'iQsyemeGaI3ThwETOlwFbg==\n',
                        reqToken: 'ElA9MqO2eAAIASM2uWU4pxn7iLlTWOlB3VzrdTzzWCSpA33ruX4Nsu5gGZtl5aay+TCoGDPD/agc\n3OHme+eETIvQYGB8HepmiYNuvXN35pA=\n'
                    },
                    statusCode: 200,
                    statusMessage: 'OK'
                }
            });

            moxios.stubRequest(urlPrefetchApplications, {
                response: {
                    data: dataResponse,
                    statusCode: 200,
                    statusMessage: 'OK'
                }
            });

            moxios.wait(function () {
                ajModule.prefetchApplications(dataForCall).then(response => {
                    expect(response.statusCode).to.equal(200);
                    expect(response.statusMessage).to.equal('OK');
                    expect(response.data).to.be.an('object');
                    expect(response.data).to.equal(dataResponse);

                    done();
                });
            });
        });
    });
});

