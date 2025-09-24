# Email Setup Guide for Luxury Housing

## Current Issue

Emails are being sent successfully from the application but not being received in cPanel webmail (info@luxuryhousing.sa).

## Root Causes

1. **Domain not verified in Resend**: The domain `luxuryhousing.sa` needs to be verified
2. **Missing environment variables**: RESEND_API_KEY needs to be properly configured
3. **Email routing issues**: Emails might be going to spam or being blocked

## Step-by-Step Solution

### 1. Environment Configuration

Create a `.env.local` file in your project root with:

```
RESEND_API_KEY=your_actual_resend_api_key_here
```

### 2. Domain Verification in Resend

1. Go to [Resend Dashboard](https://resend.com/domains)
2. Add your domain: `luxuryhousing.sa`
3. Add the required DNS records to your domain:
   - TXT record for domain verification
   - MX record for email routing
   - SPF record for authentication
   - DKIM record for email signing

### 3. Check Resend Dashboard

1. Go to [Resend Logs](https://resend.com/logs)
2. Check for any failed deliveries or bounces
3. Look for error messages related to your domain

### 4. Test Email Configuration

Use the test endpoint to verify email delivery.

### 5. Check Email Client Settings

- Check spam/junk folder
- Verify email client settings
- Check if emails are being filtered

## Current Email Configuration

- **From**: `Luxury Housing <info@luxuryhousing.sa>`
- **To**: `info@luxuryhousing.sa`
- **Service**: Resend API

## Next Steps

1. Verify domain in Resend
2. Check Resend logs for delivery status
3. Test with a simple email
4. Check spam filters
