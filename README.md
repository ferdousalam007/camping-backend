# Camping Backend

This is the backend for a camping website. It is built with Node.js, Express, TypeScript, and MongoDB.

## Features

* **Product Management:**
    * Create, read, update, and delete products.
    * Upload product images using Cloudinary.
    * Filter products by category.
* **Category Management:**
    * Create, read, update, and delete categories.
    * Upload category images using Cloudinary.
* **Order Management:**
    * Create orders.
    * View order history.

## Live link

[live link](https://camping-backend-jet.vercel.app/)
## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ferdousalam007/camping-backend.git
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following environment variables:

   ```
   NODE_ENV=development
   PORT=3000
   DATABASE_URL=mongodb://localhost:27017/camping-backend
   CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret
   FRONTEND_URL=http://localhost:3001
   ```

4. **Start the server:**
   ```bash
   npm run start:dev
   ```



## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.