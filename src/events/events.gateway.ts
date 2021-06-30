import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { EventstService } from './events.service';

@WebSocketGateway(4002, { transports: ['websocket'] })
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private eventService: EventstService) {}
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('EventsGateway');

  @SubscribeMessage('selected-table')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: any,
  ): Promise<void> {
    console.log(payload);
    const theUid = client.handshake.query['uidClient'];
    const response = await this.eventService.selectRestaurantTable(payload);
    this.server.sockets.to(theUid).emit('table', response);
  }

  @SubscribeMessage('setOrderFood')
  async ordersRestaurant(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: any,
  ): Promise<void> {
    console.log(payload); 
    const response = await this.eventService.setOrderState(payload);
    this.server.sockets.to(payload.idRestaurant).emit('newOrder', response);
  }

  /*   @SubscribeMessage('orders')
  async ordersRestaurant(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: any,
  ): Promise<void> {
    console.log(payload);
    const theUid = client.handshake.query['uidClient'];
    const response = await this.eventService.setOrderState(payload);
    this.server.sockets.to(theUid).emit('orderChange', response);
  } */

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    let theUid = null;
    if (client.handshake.query['isClient']) {
      theUid = client.handshake.query['uidClient'];
    } /*  else {
      const [valido, uid] = comprobarJWT(socket.handshake.query['x-token']);
      theUid = uid
      if (!valido) {
        console.log('socket no identificado');
        return socket.disconnect();
      } */
    client.join(theUid);
    this.logger.log(`Client connected: ${client.id}`);
  }
}
