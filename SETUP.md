# Quick Setup Guide

## Installation Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## First Time Setup

### Access Admin Panel

1. Go to `/admin` in your browser
2. Default password: `admin123`
3. Click "Add Product" to start adding products

### Adding Your First Product

1. Log into the admin panel
2. Fill in:
   - **Name**: Your product name
   - **Description**: Product description
   - **Price**: Product price (e.g., 29.99)
   - **Image URL**: URL to product image (optional)

### Image URLs

You can use any publicly accessible image URL. Some options:
- Upload to [Imgur](https://imgur.com) and use the direct link
- Use [Cloudinary](https://cloudinary.com) for image hosting
- Use any CDN or image hosting service

## Project Structure

- `/app` - Next.js pages and routes
- `/components` - Reusable React components
- `/lib` - Utility functions and data management
- `/data` - JSON file storage (auto-created when you add products)

## Notes

- Products are stored in `data/products.json`
- Admin password is hardcoded as `admin123` (change this for production)
- All images are loaded via URL (no file upload yet)

## Next Steps

- Customize the design to match your brand
- Add more features (cart, checkout, etc.)
- Set up proper authentication
- Deploy to production

