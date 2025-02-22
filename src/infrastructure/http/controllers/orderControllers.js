import {
  getOrders,
  getOrderById,
  getOrdersFiltered,
  getOrdersFilteredByStatus,
  addOrder,
} from "../../../app/tables/orderService.js";

export const getOrdersController = async (req, res) => {
  try {
    const orders = await getOrders();
    res.status(200).json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ menssage: "error al realizar peticion en getOrdersController" });
  }
};

export const getOrderByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await getOrderById(id);
    res.status(200).json(order);
  } catch (error) {
    res
      .status(500)
      .json({
        menssage: "error al realizar peticion en getOrderByIdController",
      });
  }
};

export const getOrdersFilteredController = async (req, res) => {
  try {
    const { filter } = req.params;
    const orders = await getOrdersFiltered(filter);
    res.status(200).json(orders);
  } catch (error) {
    res
      .status(500)
      .json({
        menssage: "error al realizar peticion en getOrdersFilteredController",
      });
  }
};

export const getOrdersFilteredByStatusController = async (req, res) => {
  try {
    const { filter } = req.params;
    const orders = await getOrdersFilteredByStatus(filter);
    res.status(200).json(orders);
  } catch (error) {
    res
      .status(500)
      .json({
        menssage:
          "error al realizar peticion en getOrdersFilteredByStatusController",
      });
  }
};

export const addOrderController = async (req, res) => {
  try {
    const { order } = req.body;
    const id = await addOrder(order);
    res.status(200).json({ id });
  } catch (error) {
    res
      .status(500)
      .json({ menssage: "error al realizar peticion en addOrderController" });
  }
};
