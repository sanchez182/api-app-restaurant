import { MaxLength, IsNotEmpty, IsString, IsArray } from 'class-validator';

export class CreateRestaurantDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  readonly ubication: {
    long: number;
    lat: number;
  };

  @IsString()
  /*   @IsEmail()
  @IsNotEmpty() */
  readonly img: string;

  @IsString()
  /*   @MaxLength(30)
  @IsNotEmpty() */
  readonly phone: string;

  @IsArray()
  /*   @MaxLength(40)
  @IsNotEmpty() */
  readonly foodTimeList: [];

  @IsArray()
  readonly foodTypeList: [];

  @IsArray()
  readonly drinkTypeList: [];

  @IsArray()
  readonly tableList: [];
}
