import OrderRepository from "../../infrastructure/db/repositories/orderRepository.js";

const orderRepository = new OrderRepository();

export const getOrders = async () => {
  const orders = await orderRepository.getOrders();
  return orders;
};

export const getOrderById = async (id) => {
  const order = await orderRepository.getOrderById(id);
  return order;
};
export const getOrdersByIdUser = async (user_id) => {
  const order = await orderRepository.getOrdersByIdUser(user_id);
  return order;
};
export const updateOrder = async (status, id_order) => {
  const products = await orderRepository.updateOrder(status, id_order);
  return products;
};
export const getOrderByTranferDataId = async (transferDataId) => {
  const order = await orderRepository.getOrderByTranferDataId(transferDataId);
  return order;
};
export const getOrdersFiltered = async (filter) => {
  const orders = await orderRepository.getOrdersFiltered(filter);
  return orders;
};

export const getOrdersFilteredByStatus = async (filter) => {
  const orders = await orderRepository.getOrdersFilteredByStatus(filter);
  return orders;
};

export const addOrder = async (order) => {
  const id = await orderRepository.addOrder(order);
  return id;
};
