import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001');

export default function Chat() {
  const [msg, setMsg] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on('chatMessage', m => setChat(prev=>[...prev,m]));
    return ()=>socket.off('chatMessage');
  }, []);

  const send = () => {
    if (!msg.trim()) return;
    socket.emit('chatMessage', msg);
    setMsg('');
  };

  return (
    <section className="section chat">
      <h2>Chat</h2>
      <div className="chat-window">
        {chat.map((m,i)=><div key={i} className="chat-msg">{m}</div>)}
      </div>
      <div className="footer">
        <input
          value={msg}
          onChange={e=>setMsg(e.target.value)}
          placeholder="Escribe un mensaje"
        />
        <button onClick={send} disabled={!msg.trim()}>Enviar</button>
      </div>
    </section>
  );
}
