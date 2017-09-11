var scoresModule = require('../index.js').scoresapiclient,
    chai  = require('chai'),
    expect = chai.expect,
    fs = require('fs');

describe('Scores CLient', function () {
    this.timeout(5000);
    let data,
        argv = require('optimist').demand('config').argv,
        configFilePath = argv.config;

    before(() => {
        let config = require('nconf').env().argv().file({file: configFilePath});

        data = scoresModule.init({
            hostname_Scores: config.get('hostname'),
            pathFolder: config.get('pathFolder')
        });
    });

    after(() => {
        fs.unlinkSync(configFilePath);
    });

    describe('Call login', () => {
        it('Should come success response with status 1, status message Success', done => {
            scoresModule.login('ScoresAPI', data.APIKey, data.hostname_Scores).then(response => {
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

            scoresModule.subject(dataForCall, data.APIKey, data.hostname_Scores).then(response => {
                expect(response.status).to.equal(1);
                expect(response.statusMessage).to.equal('Success');

                done();
            });
        });
    });

    describe('Call dataQuery', () => {
        it('Should come success response with status 1, status message Success', done => {
            let dataForCall = "2017-08-24 00:00:00";

            scoresModule.dataQuery(dataForCall, data.APIKey, data.hostname_Scores).then(response => {
                expect(response.status).to.equal(1);
                expect(response.statusMessage).to.equal('Success');

                done();
            });
        });
    });
});
