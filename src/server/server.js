const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static(path.resolve(__dirname, '../../dist')));

app.get('/api', (req, res) => res.status(200).send('Hi there! Also, woot!'));

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
