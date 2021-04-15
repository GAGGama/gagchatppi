const path=require('path');
const express = require('express');
const app = express();

//setings
app.set('port', process.env.PORT || 3000);

//static file
app.use(express.static(path.join(__dirname,'public')));

//start the server
const server = app.listen(app.get('port'),()=>{
    console.log('server on port ',app.get('port'));
});

//websockets
const SockeIO=require('socket.io');
const io =SockeIO(server);

io.on('connection',(socket)=>{
    console.log('new connection', socket.id);

    socket.on('chat:message',(data)=>{
        io.sockets.emit('chat:message',data);
    });
});