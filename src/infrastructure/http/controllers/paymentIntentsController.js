import Stripe from "stripe";
import dotenv from "dotenv";
import puppeteer from "puppeteer";
import fs from "fs";
dotenv.config();

export const StripeClient = new Stripe(process.env.STRIPE_SECRET_KEY);
export const createPaymentIntent = async (req, res) => {
  try {
    const { currency, amount } = req.body;
    if (amount <= 0)
      return res.status(400).json({ error: "El monto no puede ser 0" });
    const { id, client_secret } = await StripeClient.paymentIntents.create({
      amount: Math.round(amount),
      currency,
    });
    res.status(200).json({
      clientSecret: client_secret,
      paymentIntentsId: id,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Error al crear el pago" });
  }
};

export const updatePaymentIntent = async (req, res) => {
  try {
    const { paymentIntentId } = req.params;
    const { currency, amount } = req.body;
    if (amount <= 0)
      return res.status(400).json({ error: "El monto no puede ser 0" });
    if (!paymentIntentId)
      return res.status(400).json({ error: "El pago no existe" });
    const { client_secret } = await StripeClient.paymentIntents.update(
      paymentIntentId,
      {
        amount: Math.round(amount),
        currency,
      }
    );
    if (amount <= 0)
      return res.status(400).json({ error: "El monto no puede ser 0" });
    if (client_secret) {
      res.status(200).json({
        clientSecret: client_secret,
      });
    } else {
      res.status(400).json({ error: "Error porque no se ha actualizado" });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Error al actualizar el pago" });
  }
};
export const getPaymentIntent = async (req, res) => {
  try {
    const { paymentIntentId } = req.params;
    const data = req.body;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const resp = await StripeClient.paymentIntents.retrieve(paymentIntentId);
    const resp2 = await StripeClient.charges.retrieve(resp.latest_charge);
    const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Información de Transacción</title>
    <style>
        body {
            background-color: #f7fafc;
            color: #1a202c;
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 1rem;
            background-color: white;
            border-radius: 0.5rem;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            font-size: 1.5rem;
            font-weight: bold;
            text-align: center;
            margin-bottom: 1rem;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 1rem;
        }
        th, td {
            border: 1px solid #e2e8f0;
            padding: 0.5rem;
            text-align: left;
        }
        th {
            background-color: #edf2f7;
        }
        .title {
            font-weight: bold;
            background-color: #f1f5f9;
        }
        .product-card {
            display: flex;
            align-items: center;
            gap: 1rem;
            border: 1px solid #e2e8f0;
            border-radius: 0.5rem;
            padding: 0.5rem;
            margin-bottom: 1rem;
            background-color: #fff;
            page-break-inside: avoid;
        }
        .product-card img {
            width: 60px;
            height: 60px;
            object-fit: cover;
            border-radius: 0.5rem;
            border: 1px solid #e2e8f0;
        }
        .product-details p {
            margin: 0.25rem 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Detalles de la Transacción</h1>

        <table>
            <tr class="title"><th colspan="2">Payment Intent</th></tr>
            <tr><td>ID:</td><td>${resp.id}</td></tr>
            <tr><td>Monto:</td><td>${resp.amount}</td></tr>
            <tr><td>Estado:</td><td>${resp.status}</td></tr>
            <tr><td>Método de Pago:</td><td>${resp.payment_method}</td></tr>
        </table>

        <table>
            <tr class="title"><th colspan="2">Detalles del Método de Pago</th></tr>
            ${
              resp2.payment_method_details?.type === "card"
                ? `
            <tr><td>Marca:</td><td>${resp2.payment_method_details?.card?.brand}</td></tr>
            <tr><td>País:</td><td>${resp2.payment_method_details?.card?.country}</td></tr>
            <tr><td>Últimos 4 dígitos:</td><td>${resp2.payment_method_details?.card?.last4}</td></tr>
            <tr><td>Expira:</td><td>${resp2.payment_method_details?.card?.exp_month}/${resp2.payment_method_details?.card?.exp_year}</td></tr>
            <tr><td>Tipo:</td><td>${resp2.payment_method_details?.card?.funding}</td></tr>
            `
                : resp2.payment_method_details?.type === "amazon_pay"
                ? `
            <tr><td>Tipo:</td><td>${resp2.payment_method_details?.type
              .split("_")
              .join(" ")}</td></tr>
            `
                : '<tr><td colspan="2">Método de pago no reconocido</td></tr>'
            }
        </table>

        <table>
            <tr class="title"><th colspan="2">Datos del Usuario</th></tr>
            <tr><td>Nombre:</td><td>${data.user.name}</td></tr>
            <tr><td>Email:</td><td>${data.user.email}</td></tr>
            <tr><td>Teléfono:</td><td>${data.user.phone}</td></tr>
            <tr><td>Dirección:</td><td>${data.user.address.address}, ${
      data.user.address.city
    }, ${data.user.address.state}, ${data.user.address.zip}</td></tr>
        </table>

        <h2>Productos en la Compra</h2>
        ${data.products
          .map(
            (product) => `
        <div class="product-card">
            <img src="${product.images[0]}" alt="${product.title}" />
            <div class="product-details">
                <p><strong>Producto:</strong> ${product.title}</p>
                <p><strong>Cantidad:</strong> ${product.quantity}</p>
                <p><strong>Precio:</strong> $${(product.price / 100)
                  .toFixed(2)
                  .toLocaleString()}</p>
                <p><strong>Precio con Descuento:</strong> $${(
                  (product.price - (product.price * product.discount) / 100) /
                  100
                )
                  .toFixed(2)
                  .toLocaleString()}</p>
                <p><strong>Fecha Estimada de Llegada:</strong> ${new Date(
                  new Date().setDate(
                    new Date().getDate() +
                      parseInt(product.envio.tiempo_estimado.split(" ")[0])
                  )
                ).toLocaleDateString()}</p>
            </div>
        </div>
        `
          )
          .join("")}

        <table>
            <tr class="title"><th colspan="2">Recibo</th></tr>
            <tr><td>Número de Recibo:</td><td>${resp2.id}</td></tr>
            <tr><td>Balance Transaction:</td><td>${
              resp2.balance_transaction
            }</td></tr>
            <tr><td>Estado de la Red:</td><td>${
              resp2.outcome.network_status
            }</td></tr>
            <tr><td>Estado del Pago:</td><td>${resp2.status}</td></tr>
            <tr><td>Ver Recibo:</td><td><a href="${
              resp2.receipt_url
            }" target="_blank">Ver Recibo</a></td></tr>
        </table>
    </div>
</body>
</html>
`;

    await page.setContent(htmlContent);
    const pdfBuffer = await page.pdf({
      format: "A4",
      margin: { top: "10mm", bottom: "10mm" },
    });

    await browser.close();
    fs.writeFileSync("prueba.pdf", pdfBuffer);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=detalles-de-pago-${data.user.name}.pdf`
    );
    res.setHeader("Content-Type", "application/pdf");
    res.end(pdfBuffer);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Error al actualizar el pago" });
  }
};
