import {
  RestaurantOrderSchema,
  RestaurantOrders,
} from './../schemas/restaurantOrders';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Restaurant, RestautantSchema } from './../schemas/restaurant';
import { EventsGateway } from './events.gateway';
import { EventstService } from './events.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Restaurant.name, schema: RestautantSchema },
      { name: RestaurantOrders.name, schema: RestaurantOrderSchema },
    ]),
  ],
  providers: [EventsGateway, EventstService],
})
export class EventsModule {}
