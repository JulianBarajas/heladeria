const fetch = require("node-fetch");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Método no permitido" }),
    };
  }

  try {
    const { title, quantity, unit_price } = JSON.parse(event.body);

    const preference = {
      items: [
        {
          title,
          quantity,
          currency_id: "ARS", // Ajusta a tu moneda
          unit_price,
        },
      ],
    };

    // Usa la variable de entorno con tu token de Mercado Pago
    const response = await fetch(
      `https://api.mercadopago.com/checkout/preferences?access_token=${process.env.MP_ACCESS_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(preference),
      }
    );

    const data = await response.json();

    return {
      statusCode: response.ok ? 200 : response.status,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.toString() }),
    };
  }
};
