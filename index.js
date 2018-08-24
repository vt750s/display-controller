"use strict";

const KEY_PATH = './server_key.pem';
const CERT_PATH = './server_crt.pem';

var execSync = require('child_process').execSync,
    app = require('express')(),
    https = require('https'),
    fs = require('fs');
const conf = JSON.parse(fs.readFileSync('config.json', 'utf8'));

if (fs.existsSync(KEY_PATH) && fs.existsSync(CERT_PATH)) {
    var options = {
        key: fs.readFileSync(KEY_PATH),
        cert: fs.readFileSync(CERT_PATH)
    };
    var server = https.createServer(options, app).listen(conf.port, function () {
        console.log("Server is listening to https://localhost:" + server.address().port);
    });
} else {
    var server = app.listen(conf.port, function () {
        console.log("Server is listening to http://localhost:" + server.address().port);
    });
}

app.post('/api/display/power', function (req, res) {
    if (req.header('pincode') !== conf.pincode) {
        res.sendStatus(400);
    } else {
        switch (req.header('mode')) {
            default:
            case 'on':
                execSync('mshta vbscript:execute("CreateObject(""Excel.Application"").ExecuteExcel4Macro ""CALL(""""user32"""",""""SendMessageA"""",""""JJJJJ"""",-1,274,61808,-1)"":close")');
                execSync('mshta vbscript:execute("CreateObject(""WScript.Shell"").SendKeys(""{Esc}""):close")');
                break;
            case 'off':
                execSync('mshta vbscript:execute("CreateObject(""Excel.Application"").ExecuteExcel4Macro ""CALL(""""user32"""",""""SendMessageA"""",""""JJJJJ"""",-1,274,61808,2)"":close")');
                break;
        }
        res.sendStatus(200);
    }
});
