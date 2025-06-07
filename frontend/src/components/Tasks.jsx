import { useState, useEffect } from 'react';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  useEffect(() => {
    fetch('http://localhost:4000/api/tasks')
      .then(r=>r.json()).then(setTasks);
  }, []);
  const add = async () => {
    await fetch('http://localhost:4000/api/tasks',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ title:text })
    });
    setTasks(await (await fetch('http://localhost:4000/api/tasks')).json());
    setText('');
  };
  const toggle = async task => {
    await fetch(`http://localhost:4000/api/tasks/${task.id}`,{
      method:'PUT',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ done: !task.done })
    });
    setTasks(tasks.map(t=>t.id===task.id?{...t,done:!t.done}:t));
  };
  return (
    <section className="section">
      <h2>Tareas</h2>
      <div className="list">
        {tasks.map(t=>(
          <div key={t.id} className="item">
            <label>
              <input
                type="checkbox"
                checked={t.done}
                onChange={()=>toggle(t)}
              />
              <span className={t.done?'done':''}>{t.title}</span>
            </label>
          </div>
        ))}
      </div>
      <div className="footer">
        <input
          value={text}
          onChange={e=>setText(e.target.value)}
          placeholder="Nueva tarea"
        />
        <button onClick={add} disabled={!text.trim()}>Añadir</button>
      </div>
    </section>
  );
}
