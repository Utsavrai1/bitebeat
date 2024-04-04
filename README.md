# BiteBeat - Food Ordering Application

BiteBeat is a food ordering application designed to provide users with a seamless experience in ordering food from their favorite restaurants. With BiteBeat, users can explore various restaurants, browse menus, place orders, and track deliveries conveniently.

## Hosted Website Url: [BiteBeat](https://bitebeat.onrender.com)

## Features

- **User Authentication:** Users can sign up, sign in, and manage their profiles securely.
- **Restaurant Listings:** Browse through a wide range of restaurants available for ordering.
- **Menu Exploration:** View detailed menus with item descriptions, prices, and images.
- **Order Placement:** Place orders effortlessly with just a few clicks.
- **Order Tracking:** Track the status of your orders in real-time.
- **Secure Payments:** Ensure secure transactions through integrated payment gateways.
- **Order History:** Access your order history for easy reordering or tracking past transactions.

## Setup Instructions

To set up and run BiteBeat locally, follow these steps:

1. **Clone the Repository:**


   ```bash
   git clone https://github.com/Utsavrai1/bitebeat.git
   cd BiteBeat

2. **Install Dependencies:**


   ```bash
   npm install

3. **Set Environment Variables:**  Create a `.env` file in the root directory and set the following variables:


   ```bash
   VITE_API_BASE_URL=http://localhost:3001

4. **Run the Application:**


    ```bash
    npm run dev

5. **Access BiteBeat:** Open your web browser and go to `http://localhost:3000`

## Backend Repository

The backend of BiteBeat is hosted in a separate repository. You can find the backend code and setup instructions at the following URL:

[Backend Repository](https://github.com/Utsavrai1/bitebeat-backend.git)

## Technologies Used

**Frontend:**
- React
- Tailwind
- shadcn
  
**Backend:**
- Node.js (Express.js)
- MongoDB (for database)
- JWT (for authentication)

**Others:**
- Stripe API (for payments)
- Axios (for HTTP requests)
- bcrypt (for password hashing)
