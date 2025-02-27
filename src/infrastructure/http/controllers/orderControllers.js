import {
  addOrder,
  getOrderByTranferDataId,
} from "../../../app/tables/orderService.js";
import { addProductInOrder } from "../../../app/tables/productInOrderService.js";
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
          discounted_price: product.price * (1 - product.discount / 100),
          total_price:
            product.price * (1 - product.discount / 100) * product.quantity,
        };
        return await addProductInOrder(productInOrder);
      })
    );
    res.status(200).json({ id: "jejeje bien", data, productInOrder });
  } catch (error) {
    console.log("error", error.message);
    res
      .status(500)
      .json({ menssage: "error al realizar peticion en addOrderController" });
  }
};
