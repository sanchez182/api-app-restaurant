/* eslint-disable @typescript-eslint/ban-types */
import { Document } from 'mongoose';

export interface IRestaurant extends Document {
  readonly name: string;
  readonly ubication: any;
  readonly img: string;
  readonly phone: string;
  readonly foodTimeList: [{}];
  readonly foodTypeList: [{}];
  readonly drinkTypeList: [{}];
  readonly tableList: [{}];
}
