# Techsouq 
Multilingual E-commerce Website (MERN STACK)
<a> https://techsouq.vercel.app </a>

![screenshot](screenshot.png)

in [Section `Features`](#feature)
in [Section `Usage`](#usage)
in [Section `Technologies`](#Technologies)
  

## Feature
ALL ROLES CAN: 
  - Switch dark/light mode, and Arabic/English languages
  - Reset Password, if they forgot password
1) USER ROLE:
  - Functional shopping cart
  - Adding to favorites
  - Product pagination, searching and filtering features
  - Payment integration using PayPal
  - Latest products carousel
  - Product reviews and ratings
2) SELLER ROLE:
  - Product post untill the ADMIN approves or reject
  - Monitoring the SELLER's products in stock and the SELLER's profits from paid orders
  - Monitoring how many paid/unpaid orders
3) ADMIN ROLE:
  - Dashboard which tells you all products in stock, paid/unpaid orders, total users and weekly profits
  - (Product, Brands, Category, Users) post/delete/update
  - Accept or reject the posted product from the SELLER
  - Mark the order, which was made from user, as delivered
  - Monitor all orders

## Usage
  1) ENV Variable:
    We have 2 .env files in both client and server
    .env (client):
     To configure the project, create a `.env` file in the root directory and add the following environment variables:
```dotenv
VITE_CLIENT_ID=***********
VITE_COUNTRY_USERNAME=***********
VITE_BASE_URL=https://BACKEND_IP:PORT
```
  - "VITE_CLIENT_ID" is the paypal client id.
  - "VITE_COUNTRY_USERNAME" is the username registerd in api.geonames.org (NOTE: geonames is where you can fetch countires and its corresponding citites)
  - "VITE_BASE_URL" is BASE_URL or localhost of the server whether it's locally or deployed

  .env (server):
   To configure the project, create a `.env` file in the root directory and add the following environment variables:
```dotenv
NODE_ENV=production
MONGO_URL=***********
PORT=3001
JWT_SECRET_KEY=***********
PAYPAL_CLIENT_ID=***********
PAYPAL_CLIENT_SECRET=***********
APP_EMAIL_ADDRESS=***********
APP_EMAIL_PASSWORD=***********
BASE_URL=https://backend.railway.app
FRONTEND_BASE_URL=https://frontend.vercel.app
```
  - "NODE_ENV" is NODE environment production/development
  - "MONGO_URL" is the Mongo cluster
  - "PORT" is the server port 
  - "JWT_SECRET_KEY" is JWT secret key that you choose
  - "PAYPAL_CLIENT_ID" is the same client id the we've defined in .env (client)
  - "PAYPAL_CLIENT_SECRET" is the secret key of the paypal
  - "APP_EMAIL_ADDRESS" is the email registered in "nodemailer", so you can reset password
  - "APP_EMAIL_PASSWORD" is the password of the email registered in "nodemailer"
  - "BASE_URL" is the deployed backend URL on Railway
  - "FRONTEND_BASE_URL" is the deployed frontend URL on Vercel

2) Install Dependencies (client & server)
    - Clone the repository:
```bash
git clone https://github.com/hamdyyemad/Techsouq.git
```
   - Navigate through the "server" folder and install all dependencies:
```bash
cd server
npm install
npm run start
```
  - Navigate through the "client" folder and install all dependencies:
```bash
cd client
npm install
npm run dev
```
## Technologies
- Node.js
- Express.js
- MongoDB
- React.js

