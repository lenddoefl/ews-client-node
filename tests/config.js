var fs = require('fs');

(function () {
    let data = {
        hostname: process.argv[2],
        pathFolder: process.argv[3]
    };

    fs.writeFileSync('config.json', JSON.stringify(data));
}());
