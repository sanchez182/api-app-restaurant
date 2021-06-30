import {
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Res,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';

@Controller('api/restaurant')
export class RestaurantController {
  constructor(private restaurantService: RestaurantService) {}

  @Get('/:id')
  public async getRestaurant(@Res() res, @Param('id') restaurantId: string) {
    const restaurant = await this.restaurantService.findOne(restaurantId);
    if (!restaurant) {
      throw new NotFoundException('restaurant does not exist!');
    }
    console.log('si llega al api res');
    return res.status(HttpStatus.OK).json(restaurant);
  }
}
