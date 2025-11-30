// Add this function to your emailTemplates.js file

export const contactMessageConfirmation = (contactData) => {
  const subject = `Thank you for contacting feriBazar, ${contactData.name}!`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #67B96E 0%, #58a760 100%); padding: 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px;">📧 Message Received!</h1>
              <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 14px;">We'll get back to you soon</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 30px;">
              <p style="margin: 0 0 20px 0; color: #1f2937; font-size: 16px; line-height: 1.6;">
                Hi <strong>${contactData.name}</strong>,
              </p>
              
              <p style="margin: 0 0 20px 0; color: #1f2937; font-size: 16px; line-height: 1.6;">
                Thank you for reaching out to <strong>feriBazar</strong>! We've received your message and our team will review it shortly.
              </p>

              <!-- Message Summary -->
              <div style="background-color: #f9fafb; padding: 20px; border-radius: 6px; border-left: 4px solid #67B96E; margin-bottom: 24px;">
                <h3 style="margin: 0 0 12px 0; color: #1f2937; font-size: 16px;">Your Message:</h3>
                <p style="margin: 0; color: #4b5563; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${
                  contactData.message
                }</p>
              </div>

              <div style="background-color: #f0fdf4; padding: 16px; border-radius: 6px; margin-bottom: 24px;">
                <p style="margin: 0; color: #15803d; font-size: 14px;">
                  ✅ <strong>What happens next?</strong><br>
                  Our support team typically responds within 24-48 hours during business days. We'll reply to your email at <strong>${
                    contactData.email
                  }</strong>.
                </p>
              </div>

              <p style="margin: 0 0 20px 0; color: #1f2937; font-size: 16px; line-height: 1.6;">
                In the meantime, feel free to browse our products or check out our FAQ section.
              </p>

              <!-- Call to Action -->
              <div style="text-align: center; margin-top: 30px;">
                <a href="${process.env.FRONTEND_URL}" 
                   style="display: inline-block; background-color: #67B96E; color: #ffffff; padding: 14px 32px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px; margin-right: 10px;">
                  Visit Our Store
                </a>
                <a href="${process.env.FRONTEND_URL}/faq" 
                   style="display: inline-block; background-color: #ffffff; color: #67B96E; border: 2px solid #67B96E; padding: 12px 32px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px;">
                  View FAQ
                </a>
              </div>

              <p style="margin: 30px 0 0 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                Best regards,<br>
                <strong style="color: #1f2937;">The feriBazar Team</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 12px;">
                Need urgent help? Contact us at <a href="mailto:support@feribazar.com" style="color: #67B96E; text-decoration: none;">support@feribazar.com</a>
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 11px;">
                © ${new Date().getFullYear()} feriBazar. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  const text = `
Hi ${contactData.name},

Thank you for reaching out to feriBazar! We've received your message and our team will review it shortly.

Your Message:
${contactData.message}

What happens next?
Our support team typically responds within 24-48 hours during business days. We'll reply to your email at ${
    contactData.email
  }.

In the meantime, feel free to browse our products or check out our FAQ section at ${
    process.env.FRONTEND_URL
  }.

Best regards,
The feriBazar Team

---
Need urgent help? Contact us at support@feribazar.com
© ${new Date().getFullYear()} feriBazar. All rights reserved.
  `;

  return { subject, html, text };
};
