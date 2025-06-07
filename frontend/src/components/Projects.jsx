import { useState, useEffect } from 'react';

export default function Projects() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState('');
  useEffect(() => {
    fetch('http://localhost:4000/api/projects')
      .then(r=>r.json()).then(setItems);
  }, []);
  const save = async (id) => {
    const method = id ? 'PUT':'POST';
    const url = id
      ? `http://localhost:4000/api/projects/${id}`
      : 'http://localhost:4000/api/projects';
    await fetch(url, {
      method,
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ name:text })
    });
    setText('');
    setItems(await (await fetch('http://localhost:4000/api/projects')).json());
  };
  const remove = async id => {
    await fetch(`http://localhost:4000/api/projects/${id}`, { method:'DELETE' });
    setItems(items.filter(p=>p.id!==id));
  };
  return (
    <section className="section">
      <h2>Proyectos</h2>
      <div className="list">
        {items.map(p=>(
          <div key={p.id} className="item">
            <span>{p.name}</span>
            <button onClick={()=>remove(p.id)} className="del">×</button>
          </div>
        ))}
      </div>
      <div className="footer">
        <input
          value={text}
          onChange={e=>setText(e.target.value)}
          placeholder="Nuevo proyecto"
        />
        <button onClick={()=>save()} disabled={!text.trim()}>
          Añadir
        </button>
      </div>
    </section>
  );
}
