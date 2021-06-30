/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'restaurants' })
export class Restaurant extends Document {
  @Prop({required:true,unique: true})
  name: string;

  @Prop({type: Object})
  ubication: {
    long: number,
    lat: number,
  };

  @Prop()
  img: string;

  @Prop()
  phone: string;

  @Prop()
  foodTimeList:  [{
    model: { type: [Types.ObjectId],
      ref: 'FoodTime',
      required: true},
      isActive: boolean,
      showInApp: boolean
  }];

  @Prop()
  foodTypeList: [{
    model: { type: [Types.ObjectId],
      ref: 'FoodType',
      required: true},
      isActive: boolean,
      showInApp: boolean
  }];

  @Prop()
  drinkTypeList: [{
    model:  { type: [Types.ObjectId],
      ref: 'DrinkType',
      required: true},
      isActive: boolean,
      showInApp: boolean
  }];

  @Prop()
  tableList: [{
    tableNumber: number,
    selected: boolean
}]
}

export const RestautantSchema = SchemaFactory.createForClass(Restaurant);
