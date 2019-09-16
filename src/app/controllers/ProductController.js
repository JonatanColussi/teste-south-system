import ProductService from '../services/ProductService';

class UserController {
  async store(req, res, next) {
    const product = await ProductService.create(req.body);

    if (product.error) {
      const { message } = product;
      return next({
        status: 409,
        message,
      });
    }

    return res.status(201).json(product);
  }

  async show(req, res) {
    const products = await ProductService.paginated(req.query);

    return res.json(products);
  }

  async find(req, res, next) {
    const product = await ProductService.find(req.params.id);

    if (!product) {
      return next({
        status: 404,
        message: 'Product not found',
      });
    }

    return res.json(product);
  }

  async update(req, res, next) {
    const product = await ProductService.update(req.params.id, req.body);

    if (product.error) {
      const { message } = product;
      return next({
        status: 409,
        message,
      });
    }

    if (!product) {
      return next({
        status: 404,
        message: 'Product not found',
      });
    }

    return res.json(product);
  }

  async destroy(req, res, next) {
    const deleted = await ProductService.destroy(req.params.id);

    if (!deleted) {
      return next({
        status: 404,
        message: 'Product not found',
      });
    }

    return res.json({ success: deleted });
  }
}

export default new UserController();
