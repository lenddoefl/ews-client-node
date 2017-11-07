var module = require('../index.js'),
    scoresModule = new module.scoresApiClient;

scoresModule.init({hostname: process.argv[2], pathFolder: process.argv[3]});
let dataForSubject = [
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

scoresModule.login().then(response => {
    console.log('Response calling login', response);
});

scoresModule.subject(dataForSubject).then(response =>{
    console.log('Response calling subject', response);
});

scoresModule.dateQuery(dataForDateQuery).then(response => {
    console.log('Response calling dateQuery', response);
});
