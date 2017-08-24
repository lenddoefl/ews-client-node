var module = require('./index.js');
var data = module.init({URL_Scores:process.argv[2], urlFolder: process.argv[3]});
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

module.subject(dataForSubject, data.APIKey, data.URL_Scores);
