import {
  getCartById,
  addCart,
  updateCart,
  deleteCart,
} from "../../../app/tables/cartService.js";

export const getCartByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await getCartById(id);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "error al realizar la peticion" });
  }
};

export const addCartController = async (req, res) => {
  try {
    const { cart } = req.body;
    const id = await addCart(cart);
    res.status(200).json({ id });
  } catch (error) {
    res.status(500).json({ message: "error al realizar la peticion" });
  }
};

export const updateCartController = async (req, res) => {
  try {
    const { id } = req.params;
    const { cart } = req.body;
    const updated = await updateCart(id, cart);
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "error al realizar la peticion" });
  }
};

export const deleteCartController = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await deleteCart(id);
    res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json({ message: "error al realizar la peticion" });
  }
};
