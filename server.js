const express = require('express');
const QRCode = require('qrcode');
const { exec } = require('child_process');
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/generateQR', (req, res) => {
    const { text } = req.body;
    QRCode.toDataURL(text, (err, url) => {
        if (err) return console.error(err);
        res.send({ url });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);

    // Open the default web browser
    switch (process.platform) { 
        case 'darwin':
            exec(`open http://localhost:${PORT}`);
            break;
        case 'win32':
            exec(`start http://localhost:${PORT}`);
            break;
        default:
            exec(`xdg-open http://localhost:${PORT}`);
    }
});
