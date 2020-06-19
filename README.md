## 📝 About

This project is a simple integration with Pagar.me API

## 👨‍💻 Used Technologies

The following technologies has been used:

* [NodeJS](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [Pagarme](https://pagarme.github.io/pagarme-js/)

## Installing dependencies
With your terminal run `yarn`.

Yes, just it. This will install all needed dependencies. Take a break and drink a coffee while waiting ☕😋.

## Initializing the Project
To this you can run `node ./index.js`.

Your server will be started.

## API reference

Route: GET `/`

Description: This just will return an object: `{ hello: 'World' }` 

Route: POST `/payment`

Description: Make a payment (remember to use only test API keys on this application).

Body params: 

```json
{
  "card_number": "123412341234", 
  "card_holder_name": "NAME LIKE ON CARD", 
  "card_expiration_date": "04/27",
  "card_cvv": "123"
}
```
