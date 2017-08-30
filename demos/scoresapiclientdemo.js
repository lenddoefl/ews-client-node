var module = require('../index.js'),
    scoresModule = module.scoresapiclient;

var data = scoresModule.init({hostname_Scores:process.argv[2], urlFolder: process.argv[3]});
var dataForSubject = [
    {
        "identification": [
            {
                "type": "nationalId",
                "value": "DZ-015"
            }
        ]
    }
];

scoresModule.subject(dataForSubject, data.APIKey, data.hostname_Scores).then(function(response){
    console.log('Response', response);
});
