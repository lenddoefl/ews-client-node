var module = require('./index.js');
var data = module.init({EWSAJ_prod:process.argv[2], urlFolder: process.argv[3]});
var dataForStartSession = {
    applicant: {},
    application: "sdkExample"
};

module.startSession(dataForStartSession, data.APIKey, data.URL_AJ)
// module.startSession(dataForStartSession, data.APIKey, data.URL_AJ).then(function (response) {
//
//     console.log('Application hash:' + response.data.applicationHash);
//     console.log('Public Key' + response.data.publicKey)
// });

