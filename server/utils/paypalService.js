// paypalService.js
const fetch = require("node-fetch");

const getPayPalAccountBalance = async (clientId, clientSecret) => {
  const accessToken = await getAccessToken(clientId, clientSecret);
  const response = await fetch(
    "https://api.sandbox.paypal.com/v1/reporting/balances",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        // authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `Error fetching PayPal account balance: ${response.statusText}`
    );
  }

  const data = await response.json();
  return data;
};

const getAccessToken = async (clientId, clientSecret) => {
  const authString = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64"
  );
  const response = await fetch(
    "https://api.sandbox.paypal.com/v1/oauth2/token",
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${authString}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    }
  );

  if (!response.ok) {
    throw new Error(
      `Error fetching PayPal access token: ${response.statusText}`
    );
  }

  const data = await response.json();
  return data.access_token;
};

module.exports = { getPayPalAccountBalance };
