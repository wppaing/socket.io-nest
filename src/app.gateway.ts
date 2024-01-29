import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { instrument } from '@socket.io/admin-ui';
import * as bcrypt from 'bcrypt';
import { Server, Socket } from 'socket.io';

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

  handleConnection(client: Socket) {
    const authorization = client.handshake.headers.authorization;
    const token = authorization?.split(' ')[1];

    if (token !== 'test') {
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    console.log('App Gateway: A user disconnected');
  }

  @SubscribeMessage('ping')
  handleMessage(client: Socket, payload: any) {
    console.log('Ping', payload);
    client.emit('pong', payload);
  }
}
