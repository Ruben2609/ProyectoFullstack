import { useState, useEffect } from 'react';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [name, setName] = useState('');
  useEffect(() => {
    fetch('http://localhost:4000/api/teams')
      .then(r=>r.json()).then(setTeams);
  }, []);
  const add = async () => {
    await fetch('http://localhost:4000/api/teams',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ name })
    });
    setTeams(await (await fetch('http://localhost:4000/api/teams')).json());
    setName('');
  };
  return (
    <section className="section">
      <h2>Equipos</h2>
      <div className="list">
        {teams.map(t=>(
          <div key={t.id} className="item">{t.name}</div>
        ))}
      </div>
      <div className="footer">
        <input
          value={name}
          onChange={e=>setName(e.target.value)}
          placeholder="Nuevo equipo"
        />
        <button onClick={add} disabled={!name.trim()}>Añadir</button>
      </div>
    </section>
  );
}
