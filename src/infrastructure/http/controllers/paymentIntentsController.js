import Stripe from "stripe";
import dotenv from "dotenv";
import puppeteer from "puppeteer";
import fs from "fs";
dotenv.config();

const StripeClient = new Stripe(process.env.STRIPE_SECRET_KEY);
export const createPaymentIntent = async (req, res) => {
  try {
    const { currency } = req.body;
    const { id, client_secret } = await StripeClient.paymentIntents.create({
      amount: 100,
      currency,
    });
    res.status(200).json({
      clientSecret: client_secret,
      paymentIntentsId: id,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al crear el pago" });
  }
};

export const updatePaymentIntent = async (req, res) => {
  try {
    const { paymentIntentId } = req.params;
    const { currency } = req.body;
    console.log("paymentIntentId", paymentIntentId);
    console.log("currency", currency);
    const { client_secret } = await StripeClient.paymentIntents.update(
      paymentIntentId,
      {
        amount: 100,
        currency,
      }
    );
    if (client_secret) {
      res.status(200).json({
        clientSecret: client_secret,
      });
    } else {
      res.status(400).json({ error: "Error porque no se ha actualizado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el pago" });
  }
};
export const getPaymentIntent = async (req, res) => {
  try {
    const { paymentIntentId } = req.params;
    const data = req.body;
    // console.log("data", data);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const resp = await StripeClient.paymentIntents.retrieve(paymentIntentId);
    const resp2 = await StripeClient.charges.retrieve(resp.latest_charge);
    // Contenido HTML del PDF
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
        page-break-inside: avoid; /* Evita que se divida en varias páginas en el PDF */
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
            <tr><td>Número de Recibo:</td><td>1499-5273</td></tr>
            <tr><td colspan="2"><a href="https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xUXZqUnBROGMyYU5jSUpwKLrJ7r0GMgaNIPyoI6k6LBbN-jjmZoJnBtUORMMzw8aIONNblDO_ROCgICGcqlOKgfK__MVKlFaiGJlA" target="_blank">Ver Recibo</a></td></tr>
        </table>
    </div>
</body>
</html>
`;

    await page.setContent(htmlContent);

    // Generar el PDF
    const pdfBuffer = await page.pdf({
      format: "A4",
      margin: { top: "10mm", bottom: "10mm" },
    });

    console.log("Tamaño del PDF: en mb", pdfBuffer.length / 1024 / 1024);

    await browser.close();

    // Guardar el PDF en el servidor para pruebas (opcional)
    fs.writeFileSync("prueba.pdf", pdfBuffer);

    // Configurar y enviar la respuesta con el PDF
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=detalles-de-pago-${data.user.name}.pdf`
    );
    res.setHeader("Content-Type", "application/pdf");
    res.end(pdfBuffer);

    // res.status(200).json({
    //   resp,
    //   resp2,
    // });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Error al actualizar el pago" });
  }
};

const functionTest = async () => {
  try {
  } catch (error) {
    console.log("error", error);
  }
};
