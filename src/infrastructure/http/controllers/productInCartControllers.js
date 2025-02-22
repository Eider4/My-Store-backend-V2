import {
  addProductInCart,
  deleteProductInCart,
  deleteProductsAllInCart,
  getProductInCartByUser,
  updateProductInCart,
} from "../../../app/tables/productInCartService.js";

export const getProductInCartByUserController = async (req, res) => {
  try {
    const { id_user } = req.params;
    const productInCart = await getProductInCartByUser(id_user);
    res.status(200).json(productInCart);
  } catch (error) {
    res
      .status(500)
      .json({ message: "error en getProductInCartByUserController", error });
  }
};

export const addProductInCartController = async (req, res) => {
  try {
    const id = await addProductInCart(req.body);
    res.status(200).json({ id });
  } catch (error) {
    res.status(500).json({ message: "error en addProductInCartController" });
  }
};

export const deleteProductInCartController = async (req, res) => {
  try {
    const deleted = await deleteProductInCart(req.body);
    res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json({ message: "error en deleteProductInCartController" });
  }
};

export const deleteProductsAllInCartController = async (req, res) => {
  try {
    const { id_cart } = req.params;
    const deleted = await deleteProductsAllInCart(id_cart);
    res.status(200).json(deleted);
  } catch (error) {
    res
      .status(500)
      .json({ message: "error en deleteProductsAllInCartController" });
  }
};

export const updateProductInCartController = async (req, res) => {
  try {
    if (!req.body.id_product || !req.body.quantity || !req.body.id_cart)
      return res.status(400).json({ message: "Faltan datos en el body" });
    const updated = await updateProductInCart(req.body);
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "error en updateProductInCartController" });
  }
};
