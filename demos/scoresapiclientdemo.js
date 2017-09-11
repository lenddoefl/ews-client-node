var module = require('../index.js'),
    scoresModule = module.scoresapiclient;

let data = scoresModule.init({hostname_Scores:process.argv[2], pathFolder: process.argv[3]}),
    dataForSubject = [
    {
        "identification": [
            {
                "type": "nationalId",
                "value": "DZ-015"
            }
        ]
    }
    ],
    dataForDataQuery = "2017-08-24 00:00:00";

scoresModule.login('ScoresAPI', data.APIKey, data.hostname_Scores).then(response => {
    console.log('Response calling login', response);
});

scoresModule.subject(dataForSubject, data.APIKey, data.hostname_Scores).then(response =>{
    console.log('Response calling subject', response);
});

scoresModule.dataQuery(dataForDataQuery, data.APIKey, data.hostname_Scores).then(response => {
    console.log('Response calling dataQuery', response);
});
