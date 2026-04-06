const express = require('express');
const app = express();
app.use(express.json());

let courses = [{id:1,title:"ISO 3071 pH Test",equipment:"pH Meter"}];

app.get('/courses',(req,res)=>res.json(courses));

app.get('/',(req,res)=>res.sendFile(__dirname + '/index.html'));

app.listen(3000,()=>console.log("TexLab Full System Running"));
