export const prerender = false;

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, redirect }) => {
  try {
    // Log request details for debugging
    const contentType = request.headers.get('content-type');
    const origin = request.headers.get('origin');
    const referer = request.headers.get('referer');
    
    console.log('Contact form submission:', { contentType, origin, referer });
    
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
You have received a new contact form submission from your website:

<strong>Name:</strong> ${name}
<strong>Email:</strong> ${email}
<strong>Phone:</strong> ${phone || 'Not provided'}
<strong>Subject:</strong> ${subject}

<strong>Message:</strong>
${message}

---
<small>This message was sent from your website contact form at ${new Date().toLocaleString()}.</small>
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

// Email sending function with Resend integration
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
  try {
    // Check if we have a Resend API key configured
    const resendApiKey = import.meta.env.RESEND_API_KEY;
    
    if (resendApiKey) {
      // Production: Use Resend API
      const { Resend } = await import('resend');
      const resend = new Resend(resendApiKey);
      
      const { data, error } = await resend.emails.send({
        from: 'Contact Form <noreply@sylviegrf.com>',
        to: [to],
        replyTo: [replyTo],
        subject: subject,
        html: body.replace(/\n/g, '<br>'),
      });
      
      if (error) {
        console.error('Resend error:', error);
        return false;
      }
      
      console.log('Email sent successfully via Resend:', data?.id);
      return true;
    } else {
      // Development: Log to console
      console.log('\n📧 Contact Form Email Notification');
      console.log('═'.repeat(60));
      console.log(`To: ${to}`);
      console.log(`Reply-To: ${replyTo}`);
      console.log(`Subject: ${subject}`);
      console.log('═'.repeat(60));
      console.log(body.replace(/\n/g, '\n'));
      console.log('═'.repeat(60));
      console.log('💡 To send real emails, configure RESEND_API_KEY environment variable');
      console.log('   Visit https://resend.com to get your API key\n');
      
      // Return true to simulate successful sending in development
      return true;
    }
    
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
}