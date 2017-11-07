var module = require('../../index.js'),
    scoresModule = new module.scoresApiClient,
    optimist = require('optimist'),
    chai  = require('chai'),
    expect = chai.expect;

describe('Scores CLient', function () {
    this.timeout(5000);
    let argvHostname = optimist.demand('hostname').argv,
        argvPathToApiKey = optimist.demand('pathToApiKey').argv;

    before(() => {
        scoresModule.init({
            hostname: argvHostname.hostname,
            pathFolder: argvPathToApiKey.pathToApiKey
        });
    });

    describe('Call login', () => {
        it('Should come success response with status 1, status message Success', done => {
            scoresModule.login().then(response => {
                expect(response.status).to.equal(1);
                expect(response.statusMessage).to.equal('Success');

                done();
            });
        });
    });

    describe('Call subject', () => {
        it('Should come success response with status 1, status message Success', done => {
            let dataForCall = [
                {
                    "identification": [
                        {
                            "type": "nationalId",
                            "value": "DZ-015"
                        }
                    ]
                }
            ];

            scoresModule.subject(dataForCall).then(response => {
                expect(response.status).to.equal(1);
                expect(response.statusMessage).to.equal('Success');

                done();
            });
        });
    });

    describe('Call dateQuery', () => {
        it('Should come success response with status 1, status message Success', done => {
            let dataForCall = "2017-11-02 00:00:00";

            scoresModule.dateQuery(dataForCall).then(response => {
                expect(response.status).to.equal(1);
                expect(response.statusMessage).to.equal('Success');

                done();
            });
        });
    });
});
