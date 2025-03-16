exports.handler = async (event) => {
  // Manejar preflight CORS
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: "",
    };
  }

  // Solo permitir POST para procesar la preferencia
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Access-Control-Allow-Origin": "*" },
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

    // Llama a la API de Mercado Pago usando tu token (variable de entorno)
    const response = await fetch(
      `https://api.mercadopago.com/checkout/preferences?access_token=${process.env.MP_ACCESS_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(preference),
      }
    );

    const data = await response.json();
    console.log("Respuesta de Mercado Pago:", data);

    return {
      statusCode: response.ok ? 200 : response.status,
      headers: {
        "Access-Control-Allow-Origin": "*", // Permitir el acceso desde cualquier origen
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Error en la función:", error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ error: error.toString() }),
    };
  }
};
