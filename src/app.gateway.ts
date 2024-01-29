import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { instrument } from '@socket.io/admin-ui';
import { Server } from 'socket.io';
import * as bcrypt from 'bcrypt';

@WebSocketGateway({
  cors: {
    origin: ['https://admin.socket.io', 'http://localhost:3000'],
    credentials: true,
  },
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  io: Server;

  afterInit() {
    instrument(this.io, {
      auth: {
        type: 'basic',
        username: 'admin',
        password: bcrypt.hashSync('admin', 10),
      },
    });
  }

  handleConnection(client: Server) {
    console.log('App Gateway: A new user connected');
    // client.emit('ack', true);
  }

  handleDisconnect(client: Server) {
    console.log('App Gateway: A user disconnected');
  }

  @SubscribeMessage('ping')
  handleMessage(client: Server, payload: any) {
    console.log('Ping', payload);
    client.emit('pong', payload);
  }
}
