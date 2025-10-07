import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export { cloudinary };

// Helper function to upload image to Cloudinary
export async function uploadToCloudinary(
  file: File,
  folder: string = 'luxury-housing'
): Promise<{
  success: boolean;
  data?: {
    fileUrl: string;
    publicId: string;
    width: number;
    height: number;
    format: string;
    bytes: number;
  };
  error?: string;
}> {
  try {
    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: `luxury-housing/${folder}`,
          resource_type: 'auto',
          quality: 'auto',
          fetch_format: 'auto',
          transformation: [
            { width: 1920, height: 1080, crop: 'limit' }, // Max size limit
            { quality: 'auto' },
            { fetch_format: 'auto' }
          ]
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    const uploadResult = result as any;

    return {
      success: true,
      data: {
        fileUrl: uploadResult.secure_url,
        publicId: uploadResult.public_id,
        width: uploadResult.width,
        height: uploadResult.height,
        format: uploadResult.format,
        bytes: uploadResult.bytes,
      },
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed',
    };
  }
}

// Helper function to delete image from Cloudinary
export async function deleteFromCloudinary(publicId: string): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    
    if (result.result === 'ok') {
      return { success: true };
    } else {
      return { success: false, error: 'Failed to delete image' };
    }
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Delete failed',
    };
  }
}
