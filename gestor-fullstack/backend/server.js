require('dotenv').config();
const mongoose       = require('mongoose');
const express        = require('express');
const cors           = require('cors');
const http           = require('http');
const { Server }     = require('socket.io');

// Routers
const projectsRouter = require('./routes/projects');
const tasksRouter    = require('./routes/tasks');
const teamsRouter    = require('./routes/teams');

// 1. Inicializa Express
const app = express();

// 2. Conecta a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser:    true,
  useUnifiedTopology: true
})
.then(() => console.log(" Conectado a MongoDB"))
.catch(err => console.error(" Error conectando a MongoDB:", err));

// 3. Middleware
app.use(cors());
app.use(express.json());

// 4. Monta las rutas CRUD
app.use('/api/projects', projectsRouter);
app.use('/api/tasks',    tasksRouter);
app.use('/api/teams',    teamsRouter);

// 5. HTTP server + Socket.IO
const server = http.createServer(app);
const io     = new Server(server, { cors: { origin: "*" } });

// 6. Socket.IO: escucha eventos
io.on('connection', socket => {
  console.log('Cliente conectado:', socket.id);

  socket.on('newProject', project => {
    io.emit('newProject', project);
  });
  socket.on('newTask', task => {
    io.emit('newTask', task);
  });
  socket.on('newTeam', team => {
    io.emit('newTeam', team);
  });
  socket.on('chatMessage', msg => {
    io.emit('chatMessage', msg);
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

// 7. Inicia el servidor
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Backend escuchando en http://localhost:${PORT}`);
});
