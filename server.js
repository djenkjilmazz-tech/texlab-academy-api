const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// ================= DATA =================

// Courses
let courses = [
  { id: 1, title: "ISO 3071 pH Test", equipment: "pH Meter" },
  { id: 2, title: "ISO 17025 Awareness Training", equipment: "Lab System" }
];

// Exams
let exams = {
  1: [
    { q: "What does ISO 3071 measure?", a: "pH" }
  ],
  2: [
    { q: "What is ISO/IEC 17025?", a: "Laboratory standard" }
  ]
};

// ISO 17025 clauses
let iso17025 = [
  { clause: "4.1", title: "Impartiality", status: false },
  { clause: "4.2", title: "Confidentiality", status: false },
  { clause: "5.4", title: "Personnel Competence", status: false },
  { clause: "6.4", title: "Equipment", status: false },
  { clause: "7.2", title: "Method Validation", status: false }
];

// ================= ROUTES =================

// Courses
app.get('/courses', (req, res) => res.json(courses));

// Exam get
app.get('/exam/:courseId', (req, res) => {
  const exam = exams[req.params.courseId];
  if (!exam) return res.status(404).send("No exam");
  res.json(exam);
});

// Exam submit
app.post('/exam/:courseId/submit', (req, res) => {
  res.json({
    passed: true,
    certificateId: Math.floor(Math.random() * 100000)
  });
});

// Certificate
app.get('/certificate/:id', (req, res) => {
  res.send(`
    <h1>🎓 TexLab Certificate</h1>
    <p>ID: ${req.params.id}</p>
    <p>ISO Training Completed</p>
  `);
});

// ISO 17025 checklist
app.get('/iso17025', (req, res) => {
  res.json(iso17025);
});

// Update checklist (simulate audit)
app.post('/iso17025/update', (req, res) => {
  const { clause } = req.body;

  iso17025 = iso17025.map(c =>
    c.clause === clause ? { ...c, status: true } : c
  );

  res.json({ success: true });
});

// Score system
app.get('/iso17025/score', (req, res) => {
  const total = iso17025.length;
  const done = iso17025.filter(c => c.status).length;
  const score = Math.round((done / total) * 100);

  res.json({ score });
});

// Root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Test
app.get('/test', (req,res)=> res.send("WORKING"));

// Server
app.listen(3000, () => {
  console.log("🚀 TexLab 17025 System Running");
});
