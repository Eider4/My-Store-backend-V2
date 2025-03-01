import {
  getProductInOrderById,
  addProductInOrder,
  updateProductInOrder,
  deleteProductInOrder,
} from "../../../app/tables/productInOrderService.js";

export const getProductInOrderByIdController = async (req, res) => {
  const { id } = req.params;
  const productInOrder = await getProductInOrderById(id);
  res.status(200).json(productInOrder);
};

export const addProductInOrderController = async (req, res) => {
  const { productInOrder } = req.body;
  const id = await addProductInOrder(productInOrder);
  res.status(200).json({ id });
};

export const updateProductInOrderController = async (req, res) => {
  try {
    const productInOrder = req.body;
    // console.log("productInOrder", productInOrder);
    const updated = await updateProductInOrder(productInOrder);
    console.log("update ", updated);
    res.status(200).json(updated);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
};

export const deleteProductInOrderController = async (req, res) => {
  const { id } = req.params;
  const deleted = await deleteProductInOrder(id);
  res.status(200).json(deleted);
};
