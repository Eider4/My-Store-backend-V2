import {
  addOrder,
  getOrderById,
  getOrderByTranferDataId,
  getOrdersByIdUser,
  updateOrder,
} from "../../../app/tables/orderService.js";
import {
  addProductInOrder,
  getProductsInOrder,
} from "../../../app/tables/productInOrderService.js";
import {
  getProductById,
  updateProduct,
} from "../../../app/tables/productService.js";
import { getUserById } from "../../../app/tables/userService.js";
import { StripeClient } from "./paymentIntentsController.js";

export const addOrderController = async (req, res) => {
  try {
    const { paymentData, products, user } = req.body;
    if (products.length === 0) {
      return res.status(400).json({ error: "No hay productos en el carrito" });
    } else if (!user || !user.id_user) {
      return res.status(400).json({ error: "Usuario no encontrado" });
    }
    if (!paymentData)
      return res.status(400).json({ error: "El pago no existe" });
    const resp = await StripeClient.paymentIntents.retrieve(paymentData);
    const resp2 = await StripeClient.charges.retrieve(resp.latest_charge);

    const orderExistng = await getOrderByTranferDataId(resp.id);
    if (orderExistng) {
      return res.status(200).json({ data: orderExistng, products: products });
    }
    const order = {
      id_user: user.id_user,
      total_amount: resp.amount,
      statuspayment: resp.status,
      status: "pending",
      address: user.address,
      transfer_data: {
        id: resp.id,
        balance_transaction: resp.balance_transaction,
        outcome: resp2.outcome,
        payment_method_details: resp2.payment_method_details,
      },
      receipt_url: resp2.receipt_url,
    };
    const data = await addOrder(order);
    const productInOrder = await Promise.all(
      products.map(async (product) => {
        const productInOrder = {
          id_order: data.id_order,
          id_product: product.id_product,
          quantity: product.quantity,
          unit_price: product.price,
          discount: product.discount,
          envio: product.envio,
          discounted_price: product.price * (1 - product.discount / 100),
          total_price:
            product.price * (1 - product.discount / 100) * product.quantity,
        };
        await updateProduct(product.id_product, {
          ...product,
          units: product.units - product.quantity,
        });
        return await addProductInOrder(productInOrder);
      })
    );
    res.status(200).json({ data, productInOrder });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ menssage: "error al realizar peticion en addOrderController" });
  }
};

export const getOrdersByIdUserController = async (req, res) => {
  try {
    const { user_id } = req.params;
    const orders = await getOrdersByIdUser(user_id);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "error al obtener los productos" });
  }
};

export const getOrderByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await getOrderById(id);
    const user = await getUserById(order.id_user);
    const id_order = order.id_order;
    const productsInOrder = await getProductsInOrder(id_order);
    const productsState = productsInOrder.some(
      (product) => product.status === "pending" || product.status === "shipped"
    );
    if (!productsState && order.status != "succeeded") {
      const orderUpdate = await updateOrder("succeeded", id_order);
      return res.status(200).json({ order: orderUpdate, user });
    }
    res.status(200).json({ order, user });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "error al obtener el producto" });
  }
};

export const getProductsInOrderController = async (req, res) => {
  try {
    const { id_order } = req.params;
    const productsInOrder = await getProductsInOrder(id_order);
    const productsInOrderWithProduct = await Promise.all(
      productsInOrder.map(async (productInOrder) => {
        const product = await getProductById(productInOrder.id_product);
        return {
          ...productInOrder.dataValues,
          title: product.title,
          images: product.images,
        };
      })
    );
    res.status(200).json(productsInOrderWithProduct);
  } catch (error) {
    res.status(500).json({ message: "error al obtener los productos" });
  }
};
