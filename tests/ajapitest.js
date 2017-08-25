var ajModule = require('../ajapiclient.js');
var chai  = require('chai');
var expect = chai.expect;

describe('Applicant Journey CLient', function () {
    this.timeout(5000);
    var data;
    var uid;
    before(function () {
        data = ajModule.init({
            URL_AJ: 'https://uat-external.eflglobal.com/api/v2/applicant_journey/',
            urlFolder: process.argv[5]
        });
    });
    describe('Call login', function () {
        it('Should come success response', function (done) {
            ajModule.login('AJAPI', data.APIKey, data.URL_AJ).then(function (response) {
                expect(response.statusCode).to.equal(200);
                expect(response.statusMessage).to.equal('OK');
                expect(response.data.authToken).not.to.be.null;
                expect(response.data.reqToken).not.to.be.null;
                expect(response.data.authToken).to.not.be.empty;
                expect(response.data.reqToken).to.not.be.empty;

                done();
            });
        });
    });

    describe('Call startSession', function () {
        var dataForCall = {
            applicant: {},
            application: "sdkExample"
        };
        it('Should come success response', function (done) {
            ajModule.startSession(dataForCall, data.APIKey, data.URL_AJ).then(function (response) {
                expect(response.statusCode).to.equal(200);
                expect(response.statusMessage).to.equal('OK');
                expect(response.data.applicationHash).not.to.be.null;
                expect(response.data.publicKey).not.to.be.null;
                expect(response.data.uid).not.to.be.null;
                expect(response.data.applicationHash).to.not.be.empty;
                expect(response.data.publicKey).to.not.be.empty;
                expect(response.data.uid).to.not.be.empty;

                done();
            });
        });
    });
});

