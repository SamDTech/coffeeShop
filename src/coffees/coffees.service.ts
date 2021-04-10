import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeesDto } from './dto/create-coffees-dto';
import { UpdateCoffeesDto } from './dto/update-coffees-dto';

import { Coffee } from './entities/coffees.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private coffeeRespository: Repository<Coffee>,
  ) {}

  find() {
    return this.coffeeRespository.find();
  }

  async findOne(id) {
    const coffee = await this.coffeeRespository.findOne(id);
    if (!coffee) {
      throw new NotFoundException();
    }
    return coffee;
  }

  create(createCoffeeDto: CreateCoffeesDto) {
    const coffee = this.coffeeRespository.create(createCoffeeDto);

    return this.coffeeRespository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeesDto) {
    const coffee = await this.coffeeRespository.preload({
      id: +id,
      ...updateCoffeeDto,
    });

    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }

    return this.coffeeRespository.save(coffee);
  }

  async remove(id: string) {
    const coffee = await this.coffeeRespository.findOne(id);

    return this.coffeeRespository.remove(coffee);
  }
}
