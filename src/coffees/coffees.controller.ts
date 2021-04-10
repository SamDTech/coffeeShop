import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeesDto } from './dto/create-coffees-dto';
import { UpdateCoffeesDto } from './dto/update-coffees-dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}
  @Get()
  findAll(@Query() paginationQuery) {
    // const {limit, offset } = paginationQuery;
    return this.coffeesService.find();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coffeesService.findOne(id);
  }

  @Post()
  createOne(@Body() createCoffeeDto: CreateCoffeesDto) {
    return this.coffeesService.create(createCoffeeDto);
  }

  @Patch(':id')
  updateOne(
    @Param('id') id: string,
    @Body() updateCoffeeDto: UpdateCoffeesDto,
  ) {
    return this.coffeesService.update(id, updateCoffeeDto);
  }
  @Delete(':id')
  remove(@Param('id') id) {
    return this.coffeesService.remove(id);
  }
}
