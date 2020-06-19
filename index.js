require('dotenv/config');

const express = require('express');
const pagarme = require('pagarme');

const api = require('./services/api');

const app = express();

app.use(express.json());

app.get('/', (_, response) => {
  return response.json({ hello: 'World' });
});

app.post('/payment', async (request, response) => {
  const {
    card_number,
    card_holder_name,
    card_expiration_date,
    card_cvv,
  } = request.body;

  
  const cardValidations = pagarme.validate({ card: request.body });
  
  for(let prop in cardValidations.card) {
    if (!cardValidations.card[prop]) {
      return response.json(cardValidations.card);
    }
  }

  const client = await pagarme.client.connect({ 
    encryption_key: process.env.PAGARME_ENCRYPT_KEY,
  });

  const card_hash = await client.security.encrypt(request.body);

  try {
    const responseFrom = await api.post('/transactions', {
      api_key: process.env.PAGARME_API_KEY,
      amount: 2100,
      card_hash,
      card_number,
      card_holder_name,
      card_expiration_date,
      card_number,
      card_cvv,
      payment_method: 'credit_card',
      credit_card: "false",
      installments: 1,
      soft_descriptor: 'transaction',
      billing: {
        name: "John Doe",
        address: {
          country: "br",
          state: "ST",
          city: "CITY",
          neighborhood: "NEIGHBORHOOD",
          street: "STREET",
          street_number: "123",
          zipcode: "12345678"
        }
      },
      items: [
        {
          id: '12345678',
          title: "test_product",
          unit_price: 10000,
          quantity: 1,
          tangible: true,
        }
      ],
      customer: {
        external_id: "#123456789",
        name: "John Doe",
        type: "individual",
        country: "br",
        email: "johndoe@test.com",
        documents: [
          {
            type: "cpf",
            number: "12345678900"
          }
        ],
        phone_numbers: ["+5511999999999", "+5511888888888"],
        birthday: "1985-01-01"
      }
    });

    return response.json(responseFrom.data);
  } catch (error) {
    console.log(error.response.data);
  }
});

app.listen(3333, () => {
  console.log('Server is running');
})