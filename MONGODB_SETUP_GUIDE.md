# MongoDB Integration Setup Guide

This guide will help you set up MongoDB integration for your Luxury Housing CMS system.

## Prerequisites

- MongoDB Atlas account (free tier available)
- Node.js and pnpm installed
- Your existing Luxury Housing project

## Step 1: Set up MongoDB Atlas

1. **Create a MongoDB Atlas Account**

   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Sign up for a free account
   - Create a new cluster (choose the free M0 tier)

2. **Configure Database Access**

   - Go to "Database Access" in your Atlas dashboard
   - Create a new database user with read/write permissions
   - Note down the username and password

3. **Configure Network Access**

   - Go to "Network Access" in your Atlas dashboard
   - Add your IP address or use `0.0.0.0/0` for development (not recommended for production)

4. **Get Connection String**
   - Go to "Clusters" and click "Connect"
   - Choose "Connect your application"
   - Copy the connection string (it will look like: `mongodb+srv://username:password@cluster.mongodb.net/`)

## Step 2: Configure Environment Variables

1. **Create/Update .env.local**

   ```bash
   # Add these lines to your .env.local file
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
   MONGODB_DATABASE=luxury_housing
   ```

2. **Replace the placeholders:**
   - `username`: Your MongoDB Atlas username
   - `password`: Your MongoDB Atlas password
   - `cluster`: Your cluster name from Atlas

## Step 3: Install Dependencies

The MongoDB driver has already been installed. If you need to reinstall:

```bash
pnpm add mongodb
```

## Step 4: Run the Migration

1. **Run the migration script:**

   ```bash
   node scripts/run-migration.js
   ```

2. **Or run the migration directly:**
   ```bash
   node scripts/migrate-to-mongodb.js
   ```

## Step 5: Verify the Integration

1. **Start your development server:**

   ```bash
   pnpm dev
   ```

2. **Test the CMS Dashboard:**

   - Go to `/cms/dashboard`
   - Verify that products and services are loading
   - Try adding a new product or service

3. **Test the Frontend:**
   - Go to `/products`
   - Verify that products are displaying correctly
   - Check that all categories are working

## Step 6: Deploy to Vercel

1. **Add Environment Variables to Vercel:**

   - Go to your Vercel project dashboard
   - Navigate to Settings > Environment Variables
   - Add:
     - `MONGODB_URI`: Your MongoDB connection string
     - `MONGODB_DATABASE`: `luxury_housing`

2. **Deploy:**
   ```bash
   git add .
   git commit -m "Add MongoDB integration"
   git push
   ```

## Database Structure

The migration creates the following collections:

### Products Collection

```javascript
{
  _id: ObjectId,
  id: String,
  slug: String,
  title: String,
  description: String,
  category: String,
  icon: String,
  features: [String],
  badge: String,
  gradient: String,
  detailedDescription: String,
  benefits: [String],
  requirements: [String],
  process: [Object],
  faq: [Object],
  minAmount: String,
  maxAmount: String,
  duration: String,
  interestRate: String,
  processingTime: String,
  eligibility: [String],
  image: String,
  featured: Boolean
}
```

### Services Collection

```javascript
{
  _id: ObjectId,
  id: String,
  slug: String,
  title: String,
  description: String,
  icon: String,
  features: [String],
  gradient: String,
  iconBg: String,
  accentColor: String,
  detailedDescription: String,
  benefits: [String],
  requirements: [String],
  process: [String],
  faq: [Object],
  featured: Boolean
}
```

### Gallery Collection

```javascript
{
  _id: ObjectId,
  id: String,
  title: String,
  description: String,
  category: String, // "business" | "offers" | "branch"
  image: String,
  alt: String,
  uploadDate: String,
  featured: Boolean
}
```

## API Endpoints

The following API endpoints are now available:

- `GET /api/cms/products` - Get all products
- `POST /api/cms/products` - Create a new product
- `GET /api/cms/services` - Get all services
- `POST /api/cms/services` - Create a new service
- `GET /api/cms/gallery` - Get all gallery images
- `POST /api/cms/gallery` - Add a new gallery image
- `PUT /api/cms/gallery` - Update a gallery image
- `DELETE /api/cms/gallery?id=...` - Delete a gallery image

## Troubleshooting

### Common Issues

1. **Connection Error**

   - Check your MongoDB URI in `.env.local`
   - Verify your IP is whitelisted in Atlas
   - Ensure your database user has proper permissions

2. **Migration Fails**

   - Check that your JSON files exist in `lib/`
   - Verify the JSON files are valid
   - Check your network connection

3. **Data Not Loading**
   - Check the browser console for errors
   - Verify the API endpoints are working
   - Check your MongoDB connection

### Useful Commands

```bash
# Check if migration was successful
node scripts/check-data.js

# Verify data integrity
node scripts/verify-data.js

# Test MongoDB connection
node scripts/test-mongodb.js
```

## Performance Considerations

1. **Caching**: The CMS data service includes built-in caching (5-minute cache)
2. **Indexes**: The migration creates indexes for better performance
3. **Connection Pooling**: MongoDB driver handles connection pooling automatically

## Security Notes

1. **Environment Variables**: Never commit `.env.local` to version control
2. **Database Access**: Use least-privilege principle for database users
3. **Network Access**: Restrict IP access in production
4. **Connection String**: Use environment variables, not hardcoded strings

## Support

If you encounter any issues:

1. Check the console logs for error messages
2. Verify your MongoDB Atlas configuration
3. Test the connection string independently
4. Check the migration logs for specific errors

## Next Steps

After successful integration:

1. **Backup Strategy**: Set up regular backups of your MongoDB data
2. **Monitoring**: Consider adding MongoDB monitoring
3. **Scaling**: Plan for scaling as your data grows
4. **Security**: Implement proper security measures for production

---

🎉 **Congratulations!** Your CMS is now powered by MongoDB with full CRUD capabilities and improved performance.
