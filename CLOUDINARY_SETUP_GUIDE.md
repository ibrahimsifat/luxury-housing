# 🚀 Cloudinary Setup Guide for Vercel Production

## ❌ **Why Your Current Upload System Doesn't Work on Vercel**

Your current upload system tries to save files to the local file system (`public/uploads/`), which **doesn't work on Vercel** because:

- Vercel's file system is **read-only** in production
- Files are **deleted** after each serverless function execution
- No **persistent storage** on the server

## ✅ **Solution: Cloudinary Integration**

I've updated your upload system to use **Cloudinary** for reliable, cloud-based image storage.

## 📋 **Setup Steps**

### 1. **Create Cloudinary Account**

1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up for a **free account**
3. You get **25GB storage** and **25GB bandwidth** for free

### 2. **Get Your Credentials**

1. Go to your [Cloudinary Dashboard](https://cloudinary.com/console)
2. Copy these values:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

### 3. **Set Environment Variables**

#### **Local Development (.env.local)**

Create a `.env.local` file in your project root:

```bash
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here

# SMTP Email Configuration (if not already set)
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
SMTP_FROM=your_from_email
```

#### **Vercel Production**

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add these variables:
   - `CLOUDINARY_CLOUD_NAME` = your cloud name
   - `CLOUDINARY_API_KEY` = your API key
   - `CLOUDINARY_API_SECRET` = your API secret

### 4. **Deploy to Vercel**

```bash
# Deploy your changes
git add .
git commit -m "Add Cloudinary integration for image uploads"
git push origin main
```

## ✨ **What's New**

### **Enhanced Upload API**

- ✅ **Cloudinary integration** for reliable file storage
- ✅ **Automatic image optimization** (quality, format, size)
- ✅ **Organized folders** by category (products, services, gallery)
- ✅ **Secure HTTPS URLs** for all uploaded images
- ✅ **File deletion support** via public ID

### **Image Optimization Features**

- **Auto quality** adjustment
- **Auto format** selection (WebP, AVIF when supported)
- **Size limits** (max 1920x1080)
- **Organized storage** in folders

### **Response Format**

```json
{
  "success": true,
  "url": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/luxury-housing/products/image.jpg",
  "fileName": "image.jpg",
  "publicId": "luxury-housing/products/image",
  "width": 1920,
  "height": 1080,
  "format": "jpg",
  "bytes": 245760
}
```

## 🔧 **Testing**

### **Local Testing**

1. Add your Cloudinary credentials to `.env.local`
2. Run `pnpm dev`
3. Test uploads in your CMS

### **Production Testing**

1. Deploy to Vercel with environment variables
2. Test uploads on your live site
3. Check Cloudinary dashboard for uploaded files

## 📁 **File Organization**

Images are organized in Cloudinary folders:

- `luxury-housing/products/` - Product images
- `luxury-housing/services/` - Service images
- `luxury-housing/gallery/` - Gallery images
- `luxury-housing/general/` - General uploads

## 🗑️ **Deleting Images**

The system now supports deleting images via the public ID:

```typescript
// DELETE /api/cms/upload
{
  "publicId": "luxury-housing/products/image"
}
```

## 🚨 **Important Notes**

1. **Environment Variables**: Make sure to set all Cloudinary environment variables in both local and production
2. **File Size**: Maximum file size is 10MB
3. **Supported Formats**: JPEG, PNG, WebP, GIF
4. **Automatic Optimization**: Images are automatically optimized for web delivery
5. **HTTPS URLs**: All image URLs are secure HTTPS

## 🆘 **Troubleshooting**

### **Upload Fails**
- Check if Cloudinary environment variables are set correctly
- Verify your Cloudinary account is active
- Check file size (max 10MB)

### **Images Not Displaying**
- Ensure HTTPS URLs are being used
- Check if the image exists in your Cloudinary dashboard
- Verify the public ID is correct

### **Environment Variables Not Working**
- Restart your development server after adding `.env.local`
- Check Vercel environment variables are set correctly
- Redeploy after adding environment variables

## 📞 **Support**

If you encounter any issues:

1. Check the browser console for error messages
2. Check Vercel function logs
3. Verify Cloudinary dashboard for uploaded files
4. Ensure all environment variables are set correctly

Your image upload system is now production-ready and will work perfectly on Vercel! 🎉
