import Order from "../../../domain/Order.js";

class OrderRepository {
  async getOrders() {
    const orders = await Order.findAll();
    return orders;
  }
  async getOrderById(id) {
    const order = await Order.findByPk(id);
    return order;
  }
  //este metodo sirve para filtrar por fecha
  async getOrdersFiltered(filter) {
    const orders = await Order.findAll({
      where: {
        order_date: {
          [Op.iLike]: `%${filter}%`,
        },
      },
    });
    return orders;
  }
  //   este metodo sirve para filtrar por estado
  async getOrdersFilteredByStatus(filter) {
    const orders = await Order.findAll({
      where: {
        status: {
          [Op.iLike]: `%${filter}%`,
        },
      },
    });
    return orders;
  }
  async addOrder(order) {
    const [id] = await Order.create(order);
    return id;
  }
}

export default OrderRepository;
