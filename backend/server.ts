import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors({
  origin: [process.env.FRONTEND_URL || 'http://localhost:5173'],
  methods: ['GET', 'POST'],
  credentials: true
}));// Allows your React app to talk to this server
app.use(express.json());

// 1. Setup the Email Transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 2525,
  secure: false, // Must be false for port 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false // Helps avoid connection issues on cloud hosting
  }
});





//EMAIL FOR BEING HIRED/REJECTED
app.post('/api/hired-or-rejected', async (req, res) => {
  const { email, name, status, position, id } = req.body;

  const isHired = status === 'hired';
  const isShortlisted = status === 'shortlisted';

  // Dynamic Content based on status
  const themeColor = isHired ? '#417256' : isShortlisted ? '#3b82f6' : '#a39c89';
  const headline = isHired ? 'Congratulations!' : isShortlisted ? 'Great News!' : 'Application Update';
  const subheadline = isHired ? 'Welcome to the team.' : isShortlisted ? "You've been shortlisted." : 'Regarding your application.';

  const mainMessage = isHired
    ? `We are thrilled to inform you that you have been <strong>selected</strong> for the position. Our team was impressed with your background and we believe you'll be a great fit for Lifewood.`
    : isShortlisted
    ? `We are pleased to inform you that your application has been <strong>shortlisted</strong> for the position. Our team reviewed your profile and would like to move forward with the next stage of our hiring process.`
    : `Thank you for giving us the opportunity to review your application. At this time, we have decided to move forward with other candidates who more closely match our current requirements.`;

  const footerNote = isHired
    ? `Our HR team will reach out to you shortly regarding the next steps and onboarding process.`
    : isShortlisted
    ? `Please watch your email for further instructions regarding the next steps, which may include an interview or assessment.`
    : `We will keep your profile in our database for future opportunities that match your skill set. We wish you the best in your career search.`;

  const mailOptions = {
    from: `"Lifewood HR" <${process.env.SMTP_USER}>`,
    to: email,
    subject: `Application Status - Lifewood`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&display=swap" rel="stylesheet">
        <style>
          * { font-family: 'Manrope', Arial, sans-serif !important; }
        </style>
      </head>
      <body style="background-color: #f5eedb; padding: 30px 10px; margin: 0;">
        <div style="max-width: 500px; margin: auto; background-color: #fcfaf5; border: 1px solid #e2dac5; border-radius: 32px; overflow: hidden;">
          
          <div style="padding: 45px 20px 25px 20px; text-align: center;">
            <img src="https://lknmoriyqfrhhccuikut.supabase.co/storage/v1/object/public/resumes/randomLogo/Lifewood-Logo.png" 
                 alt="Lifewood" style="height: 26px;">
          </div>

          <div style="padding: 0 40px 35px 40px; text-align: center;">
            <h1 style="color: #021a11; font-size: 28px; font-weight: 800; margin: 0; letter-spacing: -0.02em; text-transform: uppercase;">
              ${headline}
            </h1>
            <p style="color: ${themeColor}; font-size: 16px; font-weight: 600; margin-top: 8px;">
              ${subheadline}
            </p>
          </div>

          <div style="padding: 0 30px 30px 30px;">
            <div style="background-color: #ffffff; border: 1px solid #e2dac5; border-radius: 24px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.02);">
              <div style="padding: 24px;">
                <div style="font-size: 11px; font-weight: 800; color: #a39c89; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 12px;">
                  Application Summary
                </div>
                <div style="font-size: 15px; color: #021a11; line-height: 1.6; font-weight: 500;">
                  Hi <strong>${name}</strong>,<br><br>
                  ${mainMessage}
                </div>
              </div>

              <div style="padding: 16px 24px; background-color: #f8faf9; border-top: 1px dashed #e2dac5;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td style="font-size: 12px; color: #417256; font-weight: 700;">${position}</td>
                    <td align="right" style="font-family: 'Courier New', monospace; font-size: 13px; color: #021a11; font-weight: 700;">${id}</td>
                  </tr>
                </table>
              </div>
            </div>

            <div style="margin-top: 25px; text-align: center; padding: 0 10px;">
              <p style="font-size: 14px; color: #417256; line-height: 1.6; font-weight: 500;">
                ${footerNote}
              </p>
            </div>
          </div>

          <div style="padding: 35px; text-align: center; border-top: 1px solid #e2dac5; background-color: #faf7ef;">
            <p style="margin: 0; font-size: 10px; font-weight: 800; color: #b5ae9a; text-transform: uppercase; letter-spacing: 2.5px;">
              Lifewood Data Technology • 2026
            </p>
            <p style="margin: 6px 0 0 0; font-size: 10px; color: #b5ae9a; font-weight: 500;">
              IT Park • Cebu City • Philippines
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Status email sent' });
  } catch (error) {
    res.status(500).json({ error: 'Mail error' });
  }
});





// EMAIL FOR APPLYING POSITIONS
app.post('/api/send-confirmation', async (req, res) => {
  const { email, name, applications } = req.body; 

  const applicationListHtml = applications.map((app: any) => `
    <div style="background-color: #ffffff; border: 1px solid #e2dac5; border-radius: 16px; overflow: hidden; margin-bottom: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.02);">
      <div style="padding: 16px 20px;">
        <div style="font-size: 10px; font-weight: 800; color: #417256; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 6px;">Position</div>
        <div style="font-size: 14px; font-weight: 700; color: #021a11;">${app.title}</div>
      </div>
      <div style="padding: 12px 20px; background-color: #f8faf9; border-top: 1px dashed #e2dac5;">
        <div style="font-size: 10px; font-weight: 800; color: #a39c89; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 4px;">Application ID</div>
        <div style="font-family: 'Courier New', monospace; font-size: 15px; font-weight: 700; color: #034E34;">${app.id}</div>
      </div>
    </div>
  `).join('');

  const mailOptions = {
    from: `"Lifewood HR" <${process.env.SMTP_USER}>`,
    to: email,
    subject: `Application Received - Lifewood Data Technology`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&display=swap" rel="stylesheet">
        <style>* { font-family: 'Manrope', Arial, sans-serif !important; }</style>
      </head>
      <body style="background-color: #f5eedb; padding: 30px 10px; margin: 0;">
        <div style="max-width: 500px; margin: auto; background-color: #fcfaf5; border: 1px solid #e2dac5; border-radius: 32px; overflow: hidden;">

          <div style="padding: 45px 20px 25px 20px; text-align: center;">
            <img src="https://lknmoriyqfrhhccuikut.supabase.co/storage/v1/object/public/resumes/randomLogo/Lifewood-Logo.png"
                 alt="Lifewood" style="height: 26px;">
          </div>

          <div style="padding: 0 40px 20px 40px; text-align: center;">
            <h1 style="color: #021a11; font-size: 26px; font-weight: 800; margin: 0; letter-spacing: -0.02em; text-transform: uppercase;">
              Application Received
            </h1>
            <p style="color: #417256; font-size: 15px; font-weight: 600; margin-top: 8px;">
              We've got your submission.
            </p>
          </div>

          <div style="padding: 0 30px 30px 30px;">
            <div style="background-color: #ffffff; border: 1px solid #e2dac5; border-radius: 24px; padding: 24px; margin-bottom: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.02);">
              <div style="font-size: 11px; font-weight: 800; color: #a39c89; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 12px;">Message</div>
              <div style="font-size: 15px; color: #021a11; line-height: 1.6; font-weight: 500;">
                Hi <strong>${name}</strong>,<br><br>
                Thank you for applying to Lifewood Data Technology. Your application has been successfully received. Below are your tracking details — keep them safe so you can monitor your status on our careers portal.
              </div>
            </div>

            <div style="font-size: 11px; font-weight: 800; color: #a39c89; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 12px; padding-left: 4px;">Your Applications</div>
            ${applicationListHtml}

            <div style="margin-top: 20px; padding: 16px 20px; background-color: #faf7ef; border: 1px solid #f0e9d6; border-radius: 16px; border-left: 4px solid #FFC370;">
              <p style="margin: 0; font-size: 13px; color: #417256; font-weight: 600; line-height: 1.6;">
                You can use these IDs on our careers portal to check your application status at any time.
              </p>
            </div>
          </div>

          <div style="padding: 35px; text-align: center; border-top: 1px solid #e2dac5; background-color: #faf7ef;">
            <p style="margin: 0; font-size: 10px; font-weight: 800; color: #b5ae9a; text-transform: uppercase; letter-spacing: 2.5px;">
              Lifewood Data Technology • ${new Date().getFullYear()}
            </p>
            <p style="margin: 6px 0 0 0; font-size: 10px; color: #b5ae9a; font-weight: 500;">
              IT Park • Cebu City • Philippines
            </p>
          </div>

        </div>
      </body>
      </html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send email.' });
  }
});




// sending email from (contact page)
app.post('/api/contact-inquiry', async (req, res) => {
  const { name, email, subject, message } = req.body;

  const mailOptions = {
    from: `"${name}" <${process.env.SMTP_USER}>`, 
    to: process.env.SMTP_USER, 
    replyTo: email, 
    subject: `[NEW INQUIRY] ${subject}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="background-color: #f5eedb; padding: 20px; margin: 0; -webkit-font-smoothing: antialiased; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; border: 1px solid #e2dac5; border-radius: 24px; overflow: hidden; box-shadow: 0 15px 30px rgba(71, 54, 23, 0.05);">
          
          <div style="background-color: #034E34; height: 6px; width: 100%;"></div>

          <div style="padding: 40px 40px 30px 40px;">
            <h2 style="color: #021a11; font-size: 22px; font-weight: 700; margin: 0 0 24px 0; letter-spacing: -0.5px;">
              New message from the Contact Page
            </h2>

            <div style="background-color: #faf7ef; border: 1px solid #f0e9d6; border-radius: 16px; padding: 20px; margin-bottom: 30px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                <tr>
                  <td style="padding-bottom: 15px;">
                    <div style="font-size: 10px; font-weight: 800; color: #417256; text-transform: uppercase; letter-spacing: 1px;">Sender Name</div>
                    <div style="font-size: 14px; color: #021a11; font-weight: 600;">${name}</div>
                  </td>
                  <td style="padding-bottom: 15px;">
                    <div style="font-size: 10px; font-weight: 800; color: #417256; text-transform: uppercase; letter-spacing: 1px;">Email Address</div>
                    <div style="font-size: 14px; color: #417256; font-weight: 600;">${email}</div>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding-top: 15px; border-top: 1px solid #f0e9d6;">
                    <div style="font-size: 10px; font-weight: 800; color: #417256; text-transform: uppercase; letter-spacing: 1px;">Subject Line</div>
                    <div style="font-size: 14px; color: #021a11; font-weight: 600;">${subject}</div>
                  </td>
                </tr>
              </table>
            </div>

            <div style="padding-left: 20px; border-left: 4px solid #FFC370;">
              <div style="font-size: 10px; font-weight: 800; color: #417256; text-transform: uppercase; margin-bottom: 8px; letter-spacing: 1px;">Message Content</div>
              <p style="font-size: 15px; color: #1a2e24; line-height: 1.6; margin: 0;">
                ${message}
              </p>
            </div>
          </div>

          <div style="padding: 30px 40px; background-color: #faf7ef; border-top: 1px solid #f0e9d6;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
              <tr>
                <td style="vertical-align: middle;">
                   <img src="https://lknmoriyqfrhhccuikut.supabase.co/storage/v1/object/public/resumes/randomLogo/Lifewood-Logo.png"
                        alt="Lifewood Logo" style="height: 20px; width: auto; opacity: 0.8;">
                </td>
                <td style="text-align: right; vertical-align: middle;">
                  <p style="margin: 0; font-size: 11px; color: #a39c89; font-weight: 600; line-height: 1.4;">
                    Sent via Lifewood Admin Portal<br>
                    <span style="color: #417256;">${new Date().toLocaleDateString()}</span>
                  </p>
                </td>
              </tr>
            </table>
            
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #f0e9d6; text-align: center;">
              <p style="margin: 0; font-size: 11px; color: #a39c89; font-weight: 500;">
                To reply to this inquiry, simply hit <strong style="color: #034E34;">Reply</strong> in your mail client.
              </p>
            </div>
          </div>

        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Mail Error:', error);
    res.status(500).json({ error: 'Mail error' });
  }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));