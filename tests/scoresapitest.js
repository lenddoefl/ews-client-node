var scoresModule = require('../index.js').scoresapiclient;
var chai  = require('chai');
var expect = chai.expect;

describe('Scores CLient', function () {
    this.timeout(5000);
    var data;
    before(function(){
        data = scoresModule.init({
            URL_Scores: process.argv[5],
            urlFolder: process.argv[6]});
    });
    describe('Call login', function () {
        it('Should come success response with status 1, status message Success', function (done) {
            scoresModule.login('ScoresAPI', data.APIKey, data.URL_Scores).then(function (response) {
                expect(response.status).to.equal(1);
                expect(response.statusMessage).to.equal('Success');

                done();
            });
        });
    });

    describe('Call subject', function () {
        it('Should come success response with status 1, status message Success', function(done){
            var dataForCall = [
                {
                    "identification": [
                        {
                            "type": "nationalId",
                            "value": "DZ-015"
                        }
                    ]
                }
            ];
            scoresModule.subject(dataForCall, data.APIKey, data.URL_Scores).then(function(response) {
                expect(response.status).to.equal(1);
                expect(response.statusMessage).to.equal('Success');

                done();
            });
        });
    });

    describe('Call dataQuery', function () {
        it('Should come success response with status 1, status message Success', function(done){
            var dataForCall = "2017-08-24 00:00:00";
            scoresModule.dataQuery(dataForCall, data.APIKey, data.URL_Scores).then(function(response) {
                expect(response.status).to.equal(1);
                expect(response.statusMessage).to.equal('Success');

                done();
            });
        });
    });
});
