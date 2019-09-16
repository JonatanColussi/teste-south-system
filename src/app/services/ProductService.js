import Product from '../models/Product';

class ProductService {
  async all() {
    const products = Product.find();

    return products;
  }

  async paginated(options) {
    const {
      title,
      available,
      page = 1,
      per_page = 5,
      sort = '-createdAt',
      price_min: priceMin,
      price_max: priceMax,
    } = options;

    const filters = {};

    const params = {
      sort,
      limit: Number(per_page),
      page: page < 1 ? 1 : page,
    };

    if (title) {
      filters.title = new RegExp(title, 'i');
    }

    if (available) {
      filters.available = available;
    }

    if (priceMin || priceMax) {
      filters.price = {};

      if (priceMin) {
        filters.price.$gte = priceMin;
      }

      if (priceMax) {
        filters.price.$lte = priceMax;
      }
    }

    const products = await Product.paginate(filters, params);
    return products;
  }

  async create(data) {
    const { sku } = data;
    const verifyDuplicate = await Product.findOne({ sku });

    if (verifyDuplicate) {
      return {
        error: true,
        message: 'Product duplicated',
      };
    }
    const product = await Product.create(data);

    return product;
  }

  async find(id) {
    const product = await Product.findById(id);

    return product;
  }

  async update(id, data) {
    const { sku } = data;
    const find = await Product.findOne({ sku });

    if (find && find.id !== id) {
      return {
        error: true,
        message: 'Product duplicated',
      };
    }

    const product = await Product.findByIdAndUpdate(id, data, { new: true });

    return product;
  }

  async destroy(id) {
    const deleted = await Product.findByIdAndDelete(id);

    return !!deleted;
  }
}

export default new ProductService();
