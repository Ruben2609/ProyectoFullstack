import React, { useState } from 'react';
import Projects from './Projects';
import Tasks from './Tasks';
import Teams from './Teams';
import Chat from './Chat';

export default function Dashboard() {
  const [tab, setTab] = useState('projects');
  return (
    <div className="dashboard">
      <nav className="tabs">
        {['projects','tasks','teams','chat'].map(t => (
          <button
            key={t}
            className={tab===t ? 'active' : ''}
            onClick={()=>setTab(t)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </nav>

      <div className="content">
        {tab==='projects' && <Projects />}
        {tab==='tasks'    && <Tasks />}
        {tab==='teams'    && <Teams />}
        {tab==='chat'     && <Chat />}
      </div>
    </div>
  );
}
