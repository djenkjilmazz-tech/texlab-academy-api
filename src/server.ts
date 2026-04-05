import express from 'express';

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', system: 'TexLab 17025 API' });
});

app.get('/api/checklists/iso17025', (req, res) => {
  res.json([
    { clause: '4.1', title: 'Impartiality' },
    { clause: '4.2', title: 'Confidentiality' },
    { clause: '5', title: 'Structural requirements' },
    { clause: '6', title: 'Resource requirements' },
    { clause: '7', title: 'Process requirements' },
    { clause: '8', title: 'Management system requirements' }
  ]);
});

app.get('/api/methods/textile', (req, res) => {
  res.json([
    { name: 'Color Fastness to Washing', standard: 'ISO 105-C06' },
    { name: 'pH of Aqueous Extract', standard: 'ISO 3071' },
    { name: 'Tensile Strength', standard: 'ISO 13934' },
    { name: 'Tear Strength', standard: 'ISO 13937' }
  ]);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});