const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// ===== DATA =====
let courses = [
  { id: 1, title: "ISO 3071 pH Test", equipment: "pH Meter" }
];

let exams = {
  1: [
    { q: "What does ISO 3071 measure?", a: "pH" }
  ]
};

// ===== ROUTES =====

// Courses
app.get('/courses', (req, res) => {
  res.json(courses);
});

// Get exam
app.get('/exam/:courseId', (req, res) => {
  const exam = exams[req.params.courseId];
  if (!exam) return res.status(404).send("No exam found");
  res.json(exam);
});

// Submit exam
app.post('/exam/:courseId/submit', (req, res) => {
  const certificateId = Math.floor(Math.random() * 100000);

  res.json({
    passed: true,
    certificateId
  });
});

// Certificate page
app.get('/certificate/:id', (req, res) => {
  res.send(`
    <h1>🎓 TexLab Certificate</h1>
    <p>Certificate ID: ${req.params.id}</p>
    <p>Successfully completed ISO 3071 pH Test</p>
  `);
});

// Root (frontend)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Test
app.get('/test', (req, res) => {
  res.send("WORKING");
});

// Server
app.listen(3000, () => {
  console.log("🚀 TexLab Full System Running");
});
