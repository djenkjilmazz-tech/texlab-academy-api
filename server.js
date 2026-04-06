const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

let courses = [
  { id: 1, title: "ISO 3071 pH Test", equipment: "pH Meter" }
];

// API
app.get('/courses', (req, res) => res.json(courses));

// Ana sayfa
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Server
app.listen(3000, () => console.log("TexLab Full System Running"));
