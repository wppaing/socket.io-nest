import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({
  namespace: 'event',
})
export class EventGateway implements OnGatewayConnection {
  handleConnection(client: Socket) {
    console.log('Event Gateway: A new user connected');
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any) {
    client.emit('ack', true);
  }
}
