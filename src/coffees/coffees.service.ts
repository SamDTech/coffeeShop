import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Coffee } from './entities/coffees.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Opeyemi Samuel',
      brand: 'brew',
      flavors: ['chocolate', 'vanilla'],
    },
  ];

  find() {
    return this.coffees;
  }

  findOne(id) {
    const coffee = this.coffees.find((cof) => cof.id === +id);
    if (!coffee) {
      throw new NotFoundException();
    }
    return coffee;
  }

  create(createCoffeeDto: any) {
    this.coffees.push(createCoffeeDto);
  }
}
