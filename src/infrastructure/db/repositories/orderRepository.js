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
  async getOrdersByIdUser(user_id) {
    const order = await Order.findAll({
      where: {
        id_user: user_id,
      },
    });
    return order;
  }
  async getOrderByTranferDataId(transferDataId) {
    const order = await Order.findOne({
      where: {
        transfer_data: {
          id: transferDataId,
        },
      },
    });
    return order;
  }
  async updateOrder(status, id_order) {
    const [updatedOrders] = await Order.update(
      { status },
      {
        where: { id_order: id_order },
        fields: ["status"],
        returning: true,
      }
    );
    if (!updatedOrders === 0) return null;
    const order = await Order.findOne({
      where: {
        id_order: id_order,
      },
    });
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
    const id = await Order.create(order);
    return id;
  }
}

export default OrderRepository;
