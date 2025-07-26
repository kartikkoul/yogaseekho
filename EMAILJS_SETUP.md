# EmailJS & reCAPTCHA Setup Instructions

## 1. Create EmailJS Account
1. Go to [EmailJS](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## 2. Add Email Service
1. Go to Email Services in your EmailJS dashboard
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down your **Service ID**

## 3. Create Email Template
1. Go to Email Templates in your dashboard
2. Click "Create New Template"
3. Use this template content:

```
Subject: New Contact Form Submission from {{from_name}}

Hello,

You have received a new message through your yoga website contact form:

From: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}

Message:
{{message}}

---
This message was sent from your YogaSeekho website contact form.
Reply to: {{reply_to}}
CAPTCHA Token: {{captcha_token}}
```

4. Save the template and note down your **Template ID**

## 4. Get Your Public Key
1. Go to Account Settings
2. Find your **Public Key** (also called User ID)

## 5. Set up Google reCAPTCHA
1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Click "+" to create a new site
3. Choose **reCAPTCHA v2** > "I'm not a robot" Checkbox
4. Add your domain (e.g., `localhost` for development, your actual domain for production)
5. Accept the terms and submit
6. Copy your **Site Key** (you'll need this for the frontend)

## 6. Update Environment Variables
Update your `.env.local` file with your actual values:

```env
VITE_EMAILJS_SERVICE_ID=your_actual_service_id
VITE_EMAILJS_TEMPLATE_ID=your_actual_template_id
VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key
VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
```

## 7. Test the Form
1. Restart your development server: `npm run dev`
2. Fill out the contact form on your website
3. Complete the reCAPTCHA verification
4. Submit the form and check your email

## Template Variables Available:
- `{{from_name}}` - User's name
- `{{from_email}}` - User's email
- `{{phone}}` - User's phone number
- `{{message}}` - User's message
- `{{captcha_token}}` - reCAPTCHA verification token
- `{{reply_to}}` - User's email for replies

## Security Features:
- **reCAPTCHA Protection**: Prevents spam and bot submissions
- **Form Validation**: Client-side validation with react-hook-form and Zod
- **CAPTCHA Required**: Form cannot be submitted without completing CAPTCHA
- **Token Verification**: CAPTCHA token is included in the email for verification

## Troubleshooting:
- Make sure environment variables start with `VITE_` for Vite projects
- Restart your dev server after updating .env.local
- Check browser console for any error messages
- Verify your EmailJS service and template IDs are correct
- Ensure your reCAPTCHA site key is for the correct domain
- For localhost development, make sure localhost is added to your reCAPTCHA domains
