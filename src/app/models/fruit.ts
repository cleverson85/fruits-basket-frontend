import { Base } from './base';

export interface Fruit extends Base {
  name:	string;
  description:	string;
  availableQuantity:	number;
  picture:	any;
  price: any;
}
