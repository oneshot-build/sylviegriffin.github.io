export const prerender = false;

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, redirect }) => {
  try {
    const formData = await request.formData();
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string || '';
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ 
          error: 'Missing required fields' 
        }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ 
          error: 'Invalid email address' 
        }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Prepare email content
    const subjectLine = `New Contact Form Submission - ${subject}`;
    const emailBody = `
You have received a new contact form submission:

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Subject: ${subject}

Message:
${message}

---
This message was sent from your website contact form.
    `.trim();

    // For now, we'll use a simple email service approach
    // In a real implementation, you would use a service like:
    // - Nodemailer with SMTP
    // - SendGrid
    // - Mailgun
    // - Resend
    // - AWS SES

    // Simulate email sending for development
    console.log('=== CONTACT FORM SUBMISSION ===');
    console.log('To: sylviegriffin@gmail.com');
    console.log('Subject:', subjectLine);
    console.log('Body:', emailBody);
    console.log('============================');

    // In production, replace this with actual email sending logic
    const emailSent = await sendEmail({
      to: 'sylviegriffin@gmail.com',
      subject: subjectLine,
      body: emailBody,
      replyTo: email
    });

    if (!emailSent) {
      return new Response(
        JSON.stringify({ 
          error: 'Failed to send email' 
        }), 
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Return success response
    return redirect('/?success=true');

  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error' 
      }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};

// Email sending function - implement with your preferred email service
async function sendEmail({ 
  to, 
  subject, 
  body, 
  replyTo 
}: { 
  to: string;
  subject: string;
  body: string;
  replyTo: string;
}): Promise<boolean> {
  // This is a placeholder implementation
  // Replace with your actual email service integration
  
  try {
    // For development/testing, we'll just log the email
    // In production, integrate with your email service
    
    // Example with fetch to a webhook service (like Formspree, Netlify Forms, etc.)
    /*
    const response = await fetch('YOUR_EMAIL_SERVICE_ENDPOINT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to,
        subject,
        html: body.replace(/\n/g, '<br>'),
        replyTo
      })
    });
    
    return response.ok;
    */
    
    // For now, return true to simulate successful sending
    return true;
    
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
}