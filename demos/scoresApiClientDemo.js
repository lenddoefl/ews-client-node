var module = require('../index.js'),
    scoresModule = new module.scoresApiClient;

let data = scoresModule.init({hostname_Scores:process.argv[2], pathFolder: process.argv[3]}),
    clientAPI = {
        name: 'ScoresAPI',
        path: 'api/v1/scores',
        pathParams: 'auth_type=1'
    },
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
    dataForDateQuery = "2017-08-24 00:00:00";

scoresModule.login(clientAPI, data.APIKey, data.hostname_Scores).then(response => {
    console.log('Response calling login', response);
});

scoresModule.subject(dataForSubject, data.APIKey, data.hostname_Scores).then(response =>{
    console.log('Response calling subject', response);
});

scoresModule.dateQuery(dataForDateQuery, data.APIKey, data.hostname_Scores).then(response => {
    console.log('Response calling dateQuery', response);
});
