var module = require('./ajapiclient.js');
var data = module.init({URL_AJ:process.argv[2], urlFolder: process.argv[3]});
var dataForStartSession = {
    applicant: {},
    application: "sdkExample"
};

module.startSession(dataForStartSession, data.APIKey, data.URL_AJ);

