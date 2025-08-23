import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';

const db = new Database('db.sqlite');
db.exec(`
  create table if not exists projects (
    id integer primary key autoincrement,
    title text not null,
    owner text,
    status text check (status in ('Backlog','In Progress','Blocked','Completed')) default 'Backlog',
    due_date text,
    notes text,
    created_at text default (datetime('now'))
  );
`);

const app = express();
app.use(cors());                 // CORS abierto en dev
app.use(express.json());

// Listar
app.get('/projects', (req,res)=>{
  const rows = db.prepare('select * from projects order by created_at desc').all();
  res.json(rows);
});

// Crear
app.post('/projects', (req,res)=>{
  const { title, owner, status='Backlog', due_date=null } = req.body;
  const stmt = db.prepare('insert into projects (title,owner,status,due_date) values (?,?,?,?)');
  const info = stmt.run(title, owner, status, due_date);
  res.json({ id: info.lastInsertRowid });
});

// Actualizar
app.put('/projects/:id', (req,res)=>{
  const { id } = req.params;
  const { title, owner, status, due_date } = req.body;
  const stmt = db.prepare('update projects set title=?, owner=?, status=?, due_date=? where id=?');
  stmt.run(title, owner, status, due_date, id);
  res.json({ ok: true });
});

// Eliminar
app.delete('/projects/:id', (req,res)=>{
  db.prepare('delete from projects where id=?').run(req.params.id);
  res.json({ ok: true });
});

app.listen(4000, ()=> console.log('API on http://localhost:4000'));
