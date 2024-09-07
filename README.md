# camping-backend

This is a backend application for a camping website. It is built with Node.js, Express, TypeScript, and MongoDB.

## Features

- **Product Management:** Create, read, update, and delete products.
- **Category Management:** Create, read, and get categories.
- **Order Management:** Create and read orders.

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/camping-backend.git
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the root directory.
   - Add the following environment variables:
     ```
     NODE_ENV=development
     PORT=3000
     DATABASE_URL=mongodb://localhost:27017/camping-backend
     CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
     CLOUDINARY_API_KEY=your-cloudinary-api-key
     CLOUDINARY_API_SECRET=your-cloudinary-api-secret
     FRONTEND_URL=http://localhost:3001
     ```

4. **Start the development server:**
   ```bash
   npm run start:dev
   ```

## Running Tests

This project does not have any tests yet.

## Deployment

This project can be deployed to Vercel.

1. **Create a Vercel account:** [https://vercel.com/](https://vercel.com/)
2. **Deploy the project:**
   ```bash
   npm run build
   vercel
   ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.