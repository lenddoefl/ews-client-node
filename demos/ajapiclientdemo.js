var module = require('../index.js'),
    ajModule = module.ajapiclient;

var data = ajModule.init({hostname_AJ:process.argv[2], urlFolder: process.argv[3]});
var dataForStartSession = {
    applicant: {},
    application: "sdkExample"
};

ajModule.startSession(dataForStartSession, data.APIKey, data.hostname_AJ).then(function (response) {
    console.log('Application hash: ' + response.data.applicationHash);
    console.log('Public Key: ' + response.data.publicKey);
    console.log('UID: ' + response.data.uid);
});
