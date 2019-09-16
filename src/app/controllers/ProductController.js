import ProductService from '../services/ProductService';

class UserController {
  async store(req, res) {
    try {
      const product = await ProductService.create(req.body);

      return res.status(201).json(product);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async show(req, res) {
    try {
      const products = await ProductService.paginated(req.query);

      return res.json(products);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async find(req, res) {
    try {
      const product = await ProductService.find(req.params.id);

      return res.json(product);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async update(req, res) {
    try {
      const product = await ProductService.update(req.params.id, req.body);

      return res.json(product);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async destroy(req, res) {
    try {
      const deleted = await ProductService.destroy(req.params.id);

      return res.json({ success: deleted });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default new UserController();
