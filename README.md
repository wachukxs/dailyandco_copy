# DAilY & Co. E-Commerce Website

A modern, beautiful, and easy-to-use e-commerce website built with Next.js, TypeScript, and Tailwind CSS.

## Features

### Customer-Facing
- **Landing Page**: Beautiful homepage with featured products
- **Product Listing**: Grid view of all available products
- **Product Details**: Individual product pages with full information
- **Shopping Cart**: Add items to cart, manage quantities, and checkout
- **Buy Now**: Direct Instagram DM integration for instant purchases
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

### Admin Section
- **Product Management**: Add, edit, and delete products
- **Simple Authentication**: Password-protected admin panel
- **Cloudinary Image Upload**: Direct file upload support via Cloudinary
- **Image URL Support**: Alternative option to use image URLs
- **Easy Interface**: Clean, intuitive admin dashboard

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Cloudinary account (for image uploads) - [Sign up here](https://cloudinary.com/)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Get your Cloudinary credentials from [Cloudinary Console](https://cloudinary.com/console)
   - Add them to your `.env` file:
     ```
     NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
     CLOUDINARY_API_KEY=your_api_key
     CLOUDINARY_API_SECRET=your_api_secret
     ```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Accessing the Admin Panel

1. Navigate to `/admin` in your browser
2. Default password: `admin123`
3. You can add, edit, and delete products from the admin dashboard

### Adding Products

1. Log into the admin panel
2. Click "Add Product"
3. Fill in the product details:
   - Name (required)
   - Description (required)
   - Price (required)
   - Product Image: Choose between:
     - **Upload File**: Direct upload to Cloudinary (recommended)
     - **Image URL**: Use an existing image URL
4. Click "Add Product" to save

### Product Images

You have two options for product images:
1. **Cloudinary Upload** (Recommended): Direct file upload that automatically stores images in your Cloudinary account
2. **Image URL**: Use any publicly accessible image URL from other hosting services

### Shopping Cart & Checkout

- **Add to Cart**: Click "Add to Cart" on any product page to add items to your cart
- **View Cart**: Click the shopping bag icon in the header to view your cart
- **Buy Now**: 
  - Single product: Opens Instagram DM with product details
  - Cart checkout: Opens Instagram DM with full order summary
  - Instagram handle: [@dailyandco._](https://www.instagram.com/dailyandco._/)

## Project Structure

```
dailyandco/
├── app/
│   ├── admin/          # Admin panel pages
│   ├── api/            # API routes
│   ├── products/       # Product pages
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Landing page
├── components/         # React components
├── lib/               # Utility functions
├── data/              # JSON data storage (auto-created)
└── public/            # Static assets
```

## Tech Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Modern, utility-first CSS
- **Lucide React**: Beautiful icon library

## Data Storage

Products are currently stored in a JSON file (`data/products.json`). This is perfect for development and small-scale deployments. For production, consider upgrading to:
- PostgreSQL
- MongoDB
- Supabase
- Any other database solution

## Security Notes

- The admin authentication is simplified for development. For production, implement:
  - Proper password hashing
  - Session management
  - Environment variables for credentials
  - Rate limiting
  - CSRF protection

## Deployment

This project can be deployed to:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS**
- Any Node.js hosting platform

## Features Implemented

✅ Shopping cart functionality
✅ Cloudinary image upload
✅ Instagram DM integration for checkout
✅ Product quantity management
✅ Responsive cart page

## Future Enhancements

- Payment integration
- User accounts
- Order management system
- Product categories
- Search and filtering
- Email notifications
- Analytics dashboard
- Order tracking

## License

© 2024 DAilY & Co. All rights reserved.

