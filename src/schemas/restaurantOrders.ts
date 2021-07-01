/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'restaurantOrders' })
export class RestaurantOrders extends Document {
  @Prop({required:true})
  state: string;

  @Prop({required:true, type:Object})
  restaurant: { type:Types.ObjectId, ref: 'Restaurant'};

  @Prop({required:true})
  tableNumber: number

  @Prop({type: Object})
  itemsOrder:{
    itemsFood: [{ type: Types.ObjectId, ref: 'FoodType'}],
    itemsDrink: [{ type: Types.ObjectId,ref: 'DrinkType'}]
  } 

}

export const RestaurantOrderSchema = SchemaFactory.createForClass(RestaurantOrders);
