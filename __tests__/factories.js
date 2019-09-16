import faker from 'faker';
import { factory } from 'factory-girl';

import Product from '../src/app/models/Product';

faker.locale = 'pt_BR';

factory.define('Product', Product, {
  title: faker.commerce.productName(),
  description: faker.lorem.paragraphs(),
  price: faker.commerce.price(),
  available: faker.random.boolean(),
  sku: faker.random.uuid(),
});

export default factory;
