const nodemailer = require('nodemailer');

let transporter = null;

if (process.env.SMTP_HOST && process.env.SMTP_USER) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

/**
 * Dispatches an email using Nodemailer/SMTP or logs to console as fallback
 */
async function sendEmail({ to, subject, html, text }) {
  const from = process.env.EMAIL_FROM || '"Aiyan Limited" <no-reply@aiyanlimited.com>';

  if (transporter) {
    try {
      const info = await transporter.sendMail({ from, to, subject, html, text });
      console.log(`📧 Email dispatched to ${to}: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } catch (err) {
      console.error(`❌ Email dispatch error to ${to}:`, err.message);
      return { success: false, error: err.message };
    }
  } else {
    console.log(`\n================== [MAILER SIMULATION] ==================`);
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Content:\n${text || html}`);
    console.log(`=========================================================\n`);
    return { success: true, simulated: true };
  }
}

/**
 * 1. Admin Alert on New Lead / Inquiry
 */
async function sendAdminLeadAlert(inquiry) {
  const adminEmail = process.env.ADMIN_ALERT_EMAIL || 'admin@aiyanlimited.com';
  const typeLabels = {
    FLEET_FUEL_CARD: '🚗 B2B Fleet Fuel Card Application',
    COMMERCIAL_SUPPLY: '⛽ Commercial Fuel / Bulk Supply Inquiry',
    VALET_SERVICE: '✨ Valet / Jet Wash Inquiry',
    GENERAL: '💬 General Forecourt Inquiry',
    COMPLAINT: '⚠️ Customer Feedback / Inquiry',
  };

  const subject = `[New Lead] ${typeLabels[inquiry.inquiryType] || 'Inquiry'} from ${inquiry.name}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <h2 style="color: #0f766e;">⛽ New Forecourt Lead Received</h2>
      <p><strong>Type:</strong> ${typeLabels[inquiry.inquiryType] || inquiry.inquiryType}</p>
      <p><strong>Name:</strong> ${inquiry.name}</p>
      <p><strong>Email:</strong> <a href="mailto:${inquiry.email}">${inquiry.email}</a></p>
      <p><strong>Phone:</strong> ${inquiry.phone || 'N/A'}</p>
      ${inquiry.companyName ? `<p><strong>Company:</strong> ${inquiry.companyName}</p>` : ''}
      ${inquiry.fleetSize ? `<p><strong>Fleet Size:</strong> ${inquiry.fleetSize}</p>` : ''}
      <p><strong>Message / Requirements:</strong></p>
      <blockquote style="background: #f8fafc; padding: 12px; border-left: 4px solid #0f766e; margin: 10px 0;">
        ${inquiry.message}
      </blockquote>
      <p style="font-size: 12px; color: #64748b;">Submitted at ${new Date().toLocaleString('en-GB')}</p>
    </div>
  `;

  return sendEmail({ to: adminEmail, subject, html, text: inquiry.message });
}

/**
 * 2. Branded Auto-Responder to Prospect
 */
async function sendCustomerAutoResponder(inquiry) {
  const subject = `Thank you for contacting S&B Conoco Forecourt & C-Store`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h2 style="color: #e4002b; margin: 0;">S&B Conoco Forecourt & C-Store</h2>
        <p style="color: #64748b; font-size: 14px;">Houston, TX, USA • Open 24/7</p>
      </div>
      <p>Dear ${inquiry.name},</p>
      <p>Thank you for reaching out to S&B Conoco Forecourt. We have successfully received your inquiry regarding <strong>${inquiry.inquiryType.replace(/_/g, ' ')}</strong>.</p>
      <p>Our forecourt management team is reviewing your details and will get back to you promptly.</p>
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
      <p style="font-size: 13px; color: #475569;">
        <strong>Forecourt Address:</strong> 14205 Katy Freeway, Houston, TX 77079<br />
        <strong>24/7 Telephone:</strong> (281) 555-0199 | <strong>Email:</strong> contact@sb-conoco.com
      </p>
    </div>
  `;

  return sendEmail({ to: inquiry.email, subject, html });
}

/**
 * 3. Valet Booking Confirmation
 */
async function sendValetConfirmation(booking) {
  const subject = `Confirmed: Car Care & Wash Slot at S&B Conoco (${booking.vehicleReg})`;
  const dateStr = new Date(booking.bookingDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <h2 style="color: #e4002b;">🚗 Car Wash & Auto Spa Booking Confirmed</h2>
      <p>Dear ${booking.customerName},</p>
      <p>Your vehicle wash and detailing appointment has been registered. Here are your booking details:</p>
      <div style="background: #f1f5f9; padding: 15px; border-radius: 6px; margin: 15px 0;">
        <p style="margin: 4px 0;"><strong>License Plate:</strong> ${booking.vehicleReg}</p>
        <p style="margin: 4px 0;"><strong>Vehicle Type:</strong> ${booking.vehicleType}</p>
        <p style="margin: 4px 0;"><strong>Service:</strong> ${booking.serviceTier}</p>
        <p style="margin: 4px 0;"><strong>Date:</strong> ${dateStr}</p>
        <p style="margin: 4px 0;"><strong>Time Slot:</strong> ${booking.timeSlot}</p>
      </div>
      <p>Please arrive 5 minutes prior to your allocated slot at our Houston Forecourt Auto Spa Bay.</p>
      <p style="font-size: 13px; color: #64748b;">If you need to reschedule or cancel, please call (281) 555-0199.</p>
    </div>
  `;

  return sendEmail({ to: booking.email, subject, html });
}

module.exports = {
  sendEmail,
  sendAdminLeadAlert,
  sendCustomerAutoResponder,
  sendValetConfirmation,
};
