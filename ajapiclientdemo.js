var module = require('./ajapiclient.js');
var data = module.init({URL_AJ:process.argv[2], urlFolder: process.argv[3]});
var dataForStartSession = {
    applicant: {},
    application: "sdkExample"
};

module.startSession(dataForStartSession, data.APIKey, data.URL_AJ).then(function (response) {
    console.log('Application hash: ' + response.data.applicationHash);
    console.log('Public Key: ' + response.data.publicKey);
    console.log('UID: ' + response.data.uid);
});
