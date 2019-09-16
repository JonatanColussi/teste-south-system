import request from 'supertest';
import faker from 'faker';

import server from '../src/app';
import factory from './factories';
import dbConnection from './utils/dbConnection';
import truncate from './utils/truncate';

const auth = async () => {
  const authToken = await request(server).get('/jwt');

  return authToken.body.token;
};

const genericProduct = () => {
  return {
    title: faker.commerce.productName(),
    description: faker.lorem.paragraphs(),
    price: faker.commerce.price(),
    available: faker.random.boolean(),
    sku: faker.random.uuid(),
  };
};

describe('Product', () => {
  beforeAll(async () => {
    dbConnection();
    await truncate();
  });

  it("shouldn't create a product without authorization", async () => {
    const product = genericProduct();

    const response = await request(server)
      .post('/')
      .send(product);

    expect(response.status).toBe(401);
  });

  it('should be able to create product with authenticated', async () => {
    const product = genericProduct();
    const token = await auth();

    const response = await request(server)
      .post('/')
      .send(product)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(201);
  });

  it("shouldn't edit a product without authorization", async () => {
    const productCreated = await factory.create('Product');
    const productUpdate = genericProduct();

    const response = await request(server)
      .put(`/${productCreated.id}`)
      .send(productUpdate);

    expect(response.status).toBe(401);
  });

  it('should be able to edit product with authenticated', async () => {
    const productCreated = await factory.create('Product');
    const productUpdate = genericProduct();
    const token = await auth();

    const response = await request(server)
      .put(`/${productCreated.id}`)
      .send(productUpdate)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('should be able to edit product with authenticated', async () => {
    const productCreated = await factory.create('Product');
    const productUpdate = genericProduct();
    const token = await auth();

    const response = await request(server)
      .put(`/${productCreated.id}`)
      .send(productUpdate)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('not be able to insert a product with an existing sku', async () => {
    const productCreated = await factory.create('Product');
    const productInsert = genericProduct();
    productInsert.sku = productCreated.sku;

    const token = await auth();

    const response = await request(server)
      .post('/')
      .send(productInsert)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(409);
  });

  it('unable to edit a product for an existing sku', async () => {
    const productExisting = await factory.create('Product');
    const productCreated = await factory.create('Product');
    const productUpdate = genericProduct();
    productUpdate.sku = productCreated.sku;

    const token = await auth();

    const response = await request(server)
      .put(`/${productExisting.id}`)
      .send(productUpdate)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(409);
  });

  it("shouldn't edit a product when any required fields are empty", async () => {
    const productCreated = await factory.create('Product');
    const productUpdate = genericProduct();
    productUpdate.sku = null;

    const token = await auth();

    const response = await request(server)
      .put(`/${productCreated.id}`)
      .send(productUpdate)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it("shouldn't create a product when any required fields are empty", async () => {
    const product = genericProduct();
    product.title = null;

    const token = await auth();

    const response = await request(server)
      .post('/')
      .send(product)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it('retrieve data for a product', async () => {
    const product = await factory.create('Product');

    const token = await auth();

    const response = await request(server)
      .get(`/${product.id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('cannot retrieve data for a non-existent product', async () => {
    const product = await factory.create('Product');

    const token = await auth();

    const response = await request(server)
      .delete(`/${product.id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ success: true });

    const get = await request(server)
      .get(`/${product.id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(get.status).toBe(404);
  });

  it('delete product', async () => {
    const product = await factory.create('Product');

    const token = await auth();

    const response = await request(server)
      .delete(`/${product.id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ success: true });
  });

  it('cannot delete non-existent product', async () => {
    const product = await factory.create('Product');

    const token = await auth();

    const response = await request(server)
      .delete(`/${product.id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ success: true });

    const newTry = await request(server)
      .delete(`/${product.id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(newTry.status).toBe(404);
  });

  it('cannot delete non-existent product', async () => {
    const token = await auth();

    const response = await request(server)
      .get('/')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('retrieve data for a product with unauthenticated user', async () => {
    const product = await factory.create('Product');

    const response = await request(server).get(`/${product.id}`);
    expect(response.status).toBe(200);
  });
});
