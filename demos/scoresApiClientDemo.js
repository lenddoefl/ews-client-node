var module = require('../index.js'),
    scoresModule = new module.scoresApiClient;

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
    dataForDateQuery = "2017-11-02 00:00:00";

scoresModule.login(data.APIKey, data.hostname_Scores).then(response => {
    console.log('Response calling login', response);
});

scoresModule.subject(dataForSubject, data.APIKey, data.hostname_Scores).then(response =>{
    console.log('Response calling subject', response);
});

scoresModule.dateQuery(dataForDateQuery, data.APIKey, data.hostname_Scores).then(response => {
    console.log('Response calling dateQuery', response);
});
