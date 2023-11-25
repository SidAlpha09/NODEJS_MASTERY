const express =require('express');
const http =require('http');
const socketIO =require('socket.io');

const app=express()
const server =http.createServer(app)

//attaching the socket io to http server
const io =socketIO(server)

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})

io.on('connectiom',(socket)=>{
    console.log('New user connected')

    socket.on("chat message",msg=>{
        io.emit("chat message",msg)
    })

    socket.on('disconnect',()=>{
        console.log('User disconnected')
    })
});

server.listen(3000,()=>{
    console.log('Server is listening to port 3000')
})
