# SMTP Email Setup Guide for Luxury Housing

## Configuration Complete ✅

Your application has been configured to use SMTP email sending via your cPanel email instead of Resend.

## SMTP Configuration

- **SMTP Host**: `premium195.web-hosting.com`
- **Port**: `465` (SSL)
- **Encryption**: SSL
- **Authentication**: Yes
- **Username**: `info@luxuryhousing.sa`
- **Password**: Set via environment variable `SMTP_PASSWORD`

## Environment Variables Required

Create a `.env.local` file in your project root with:

```
SMTP_PASSWORD=your_no_reply_email_password_here
```

Replace `your_no_reply_email_password_here` with the actual password for `info@luxuryhousing.sa`

## Files Created/Modified

1. **`lib/smtp-email.ts`** - New SMTP email service
2. **`app/api/test-smtp/route.ts`** - SMTP test endpoint
3. **`app/api/send-email/route.ts`** - Updated to use SMTP
4. **`SMTP_SETUP_GUIDE.md`** - This guide

## Testing Your SMTP Configuration

### 1. Set Environment Variable

First, make sure you have the `SMTP_PASSWORD` environment variable set.

### 2. Test SMTP Connection

Send a POST request to `/api/test-smtp` to test your SMTP configuration:

```bash
# PowerShell
Invoke-WebRequest -Uri "http://localhost:3000/api/test-smtp" -Method POST -ContentType "application/json"
```

### 3. Test Regular Email Flow

Test your existing hero form to make sure it works with SMTP:

```bash
# PowerShell
$body = @{ name = "Test User"; email = "test@example.com"; phone = "1234567890"; message = "Test message"; formType = "hero" } | ConvertTo-Json
Invoke-WebRequest -Uri "http://localhost:3000/api/send-email" -Method POST -Body $body -ContentType "application/json"
```

## Benefits of SMTP vs Resend

1. **✅ Direct email delivery** - Emails sent directly from your server
2. **✅ No domain verification needed** - Uses your existing cPanel email
3. **✅ Better deliverability** - Emails come from your own domain
4. **✅ No third-party dependencies** - Uses your hosting provider's email service

## Troubleshooting

### If SMTP test fails:

1. **Check password** - Make sure `SMTP_PASSWORD` is correct
2. **Check cPanel email** - Verify `info@luxuryhousing.sa` exists and is active
3. **Check hosting provider** - Some hosts block SMTP on certain ports
4. **Try port 587** - If 465 doesn't work, try port 587 with TLS

### If emails still not received:

1. **Check spam folder** - Most common issue
2. **Check email client settings** - Look for filtering rules
3. **Check cPanel email logs** - Look for delivery issues
4. **Test with different email address** - Try sending to a different email

## Next Steps

1. Set the `SMTP_PASSWORD` environment variable
2. Test the SMTP configuration
3. Test your regular email forms
4. Check your cPanel webmail for received emails

Your email system is now configured to use your cPanel SMTP service!
