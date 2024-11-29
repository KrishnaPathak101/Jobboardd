import { Server } from 'socket.io';


let io = null;

export async function GET(req) {
    if (!io) {
        const server = require('http').createServer();
        io = new Server(server);

        io.on('connection', (socket) => {
            console.log('New client connected:', socket.id);

            socket.on('message', (data) => {
                console.log('Message received:', data);
                socket.broadcast.emit('message', data);
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected:', socket.id);
            });
        });

        server.listen(3001);
        console.log('Socket.IO server running on port 3001');
    }

    return NextResponse.json({ message: 'Socket.IO server running' });
};

