import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host : "localhost",
  user : "root",
  password : "",
  database : "swiftlab"
})

app.get('/', (req,res) => {
  const sql = "select * from dlt";
  db.query(sql, (err,result) => {
    if(err) return res.json({Message: "Something went wrong"});
    else res.json(result);
  })
})

app.post('/dlt', (req,res) => {
  const sql = "INSERT INTO dlt (`principal_entity_id`,`sender_id`, `template_id`,`template_content`,`created_at`,`updated_at`) VALUES(?)";
  const values = [
    req.body.principal_entity_id,
    req.body.sender_id,
    req.body.template_id,
    req.body.template_content,
    req.body.created_at,
    req.body.updated_at,
  ]
  db.query(sql, [values], (err,result) => {
    if(err) return res.json(err);
    return res.json(result);
  })
})

app.get('/read/:id', (req,res) => {
  const sql = "SELECT * FROM dlt WHERE id = ?";
  const id = req.params.id;

  db.query(sql, [id], (err,result) => {
    if(err) return res.json({Message: "Something went wrong"});
    else res.json(result);
  })
})

app.put('/edit/:id', (req,res) => {
  const sql = "UPDATE dlt SET `principal_entity_id`=?,`sender_id`=?, `template_id`=?,`template_content`=?,`created_at`=?,`updated_at`=? WHERE id=?";
  const id = req.params.id;
  db.query(sql, [req.body.principal_entity_id,req.body.sender_id,req.body.template_id,req.body.template_content,req.body.created_at,req.body.updated_at,id], (err,result) => {
    if(err) return res.json({Message:"Internal Server Error"});
    else res.json(result)
  })
})

app.delete('/delete/:id', (req,res) => {
  const sql = "DELETE FROM dlt WHERE id=?";
  const id = req.params.id;
  db.query(sql, [id], (err,result) => {
    if(err) return res.json({Message:"Internal Server Error"});
    else res.json(result)
  })
})

app.listen(5001, ()=>{
  console.log("listening");
})