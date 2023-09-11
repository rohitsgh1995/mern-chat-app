const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');

app.use(cors());

const server = http.createServer(app);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

server.listen(4000, () => 'Server is runnig on port 4000');