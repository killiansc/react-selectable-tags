// In production, we need to bundle the app

if (process.env.NODE_ENV === 'production') {
    const child_process = require('child_process');
    child_process.exec("webpack -p --config webpack.production.js", function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error) console.log('exec error: ' + error);
    });
}