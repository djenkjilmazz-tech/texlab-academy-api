const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());

// 🔥 STATIC DOSYA YOLUNU NET VER
app.use(express.static(path.join(__dirname)));

let courses = [
  { id: 1, title: "ISO 3071 pH Test", equipment: "pH Meter" }
];

app.get('/courses', (req, res) => res.json(courses));

// 🔥 ROOT ROUTE NET TANIMLA
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// TEST
app.get('/test', (req,res)=>{
  res.send("WORKING");
});

app.listen(3000, () => console.log("TexLab Full System Running"));
