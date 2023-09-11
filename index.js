const { Socket } = require('socket.io')

const io =  require('socket.io')(8800, {
    cors: {
        origin: "http://localhost:5173"
    }
})

let activeUsers = []

io.on("connection", (socket) => {

    socket.on('new-user-add', (newUserId) => {
        
        if(!activeUsers.some((user) => user.userId === newUserId)){
            activeUsers.push({
                userId: newUserId,
                socketId: socket.id
            })
        }

        console.log('Connected Users: ', activeUsers)
        io.emit('get-users', activeUsers)
    })

    socket.on('disconnect', ()=>{
        activeUsers = activeUsers.filter((user) => user.socketId !== socket.id)
        console.log('User disconnected: ', activeUsers)
    })
})