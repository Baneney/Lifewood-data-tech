import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors()); // Allows your React app to talk to this server
app.use(express.json());

// 1. Setup the Email Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // or use host: 'smtp.gmail.com', port: 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});





//EMAIL FOR BEING HIRED/REJECTED
app.post('/api/hired-or-rejected', async (req, res) => {
  const { email, name, status, position, id } = req.body;

  const isHired = status === 'hired';
  
  // Dynamic Content based on status
  const themeColor = isHired ? '#417256' : '#a39c89'; // Emerald for hired, Muted Grey for rejected
  const headline = isHired ? 'Congratulations!' : 'Application Update';
  const subheadline = isHired ? 'Welcome to the team.' : 'Regarding your application.';
  
  const mainMessage = isHired 
    ? `We are thrilled to inform you that you have been <strong>selected</strong> for the position. Our team was impressed with your background and we believe you'll be a great fit for Lifewood.`
    : `Thank you for giving us the opportunity to review your application. At this time, we have decided to move forward with other candidates who more closely match our current requirements.`;

  const footerNote = isHired
    ? `Our HR team will reach out to you shortly regarding the next steps and onboarding process.`
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
app.post('/api/hired-or-rejected', async (req, res) => {
  const { email, name  } = req.body;

  const mailOptions = {
    from: `"Lifewood HR" <${process.env.SMTP_USER}>`,
    to: email,
    subject: `Application Update - Lifewood`,
    html: `
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Application Received</title>
        </head>

        <body style="background-color: #f5eedb; padding: 20px; margin: 0; -webkit-font-smoothing: antialiased;">

            <div
                style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: auto; background-color: #ffffff; border: 1px solid #e2dac5; border-radius: 24px; overflow: hidden; box-shadow: 0 15px 30px rgba(71, 54, 23, 0.05);">

                <!-- Header -->
                <div style="text-align: center; padding-top: 50px;">
                    <img src="https://lknmoriyqfrhhccuikut.supabase.co/storage/v1/object/public/resumes/randomLogo/Lifewood-Logo.png"
                        alt="Lifewood Logo" style="height: 30px; width: auto; display: inline-block;">
                </div>

                <!-- Hero -->
                <div style="padding: 10px 40px 20px 40px; text-align: center;">
                    <h1 style="color: #021a11; font-size: 28px; font-weight: 700; margin: 5px 0 8px 0; letter-spacing: -0.5px;">
                        Application Received
                    </h1>
                    <p style="color: #417256; font-size: 15px; margin: 0;">
                        We're excited to review your profile.
                    </p>
                </div>

                <div style="padding: 0 40px 40px 40px;">
                    <p style="color: #1a2e24; font-size: 16px; line-height: 1.6; margin-top: 30px;">
                        Hello <strong>${name}</strong>,
                    </p>

                    <p style="color: #417256; font-size: 15px; line-height: 1.6;">
                        Thank you for your interest in joining <strong>Lifewood Data Technology</strong>. We have successfully
                        received your credentials, and our hiring team is now reviewing your application for a potential match
                        with our current needs.
                    </p>

                    <!-- Compact Status Card -->
                    <div
                        style="background-color: #034E34; border-radius: 14px; padding: 18px 20px; margin: 24px 0; box-shadow: 0 8px 16px rgba(3, 78, 52, 0.12);">

                        <p
                            style="margin: 0; font-size: 10px; font-weight: 900; color: #FFC76A; text-transform: uppercase; letter-spacing: 2px;">
                            Current Status
                        </p>

                        <p style="margin: 6px 0 0 0; font-size: 16px; font-weight: 600; color: #ffffff;">
                            Under Review
                        </p>

                        <p style="margin: 8px 0 0 0; font-size: 12.5px; color: rgba(255,255,255,0.75); line-height: 1.4;">
                            We’ll contact you via email if your profile matches our requirements.
                        </p>

                    </div>

                    <p style="color: #417256; font-size: 14px; line-height: 1.6;">
                        In the meantime, feel free to learn more about our culture and our commitment to digitizing services.
                    </p>

                    <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #f0e9d6;">
                        <p style="color: #417256; font-size: 13px; line-height: 1.6; margin: 0;">
                            Best regards,<br>
                            <strong style="color: #021a11; font-size: 15px;">The Lifewood Hiring Team</strong>
                        </p>
                    </div>
                </div>

                <!-- Footer -->
                <div style="background-color: #faf7ef; padding: 30px; text-align: center; border-top: 1px solid #f0e9d6;">
                    <p
                        style="margin: 0; font-size: 11px; font-weight: 700; color: #a39c89; text-transform: uppercase; letter-spacing: 1px;">
                        © 2026 Lifewood Data Technology
                    </p>
                    <p style="margin: 8px 0 0 0; font-size: 11px; color: #b5ae9a;">
                        Cebu City • IT Park, Philippines
                    </p>
                </div>
            </div>

        </body>

        </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Interview email sent!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send interview email.' });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));