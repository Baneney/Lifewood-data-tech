import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Resend } from "npm:resend"

// 1. Define CORS headers to allow your React app to talk to this function
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const resend = new Resend(Deno.env.get('RESEND_API_KEY'))

serve(async (req) => {
  // 2. Handle the browser's "Preflight" request
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { name, email } = await req.json()

    // 3. Send the email using your Resend configuration and HTML template
    const { data, error } = await resend.emails.send({
      from: 'Lifewood Careers <onboarding@resend.dev>',
      to: [email],
      subject: 'Application Received: Lifewood Data Technology',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Application Received</title>
        </head>
        <body style="background-color: #f5eedb; padding: 20px; margin: 0; -webkit-font-smoothing: antialiased;">

            <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: auto; background-color: #ffffff; border: 1px solid #e2dac5; border-radius: 24px; overflow: hidden; box-shadow: 0 15px 30px rgba(71, 54, 23, 0.05);">

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
                    <div style="background-color: #034E34; border-radius: 14px; padding: 18px 20px; margin: 24px 0; box-shadow: 0 8px 16px rgba(3, 78, 52, 0.12);">

                        <p style="margin: 0; font-size: 10px; font-weight: 900; color: #FFC76A; text-transform: uppercase; letter-spacing: 2px;">
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
                        In the meantime, feel free to learn more about our culture and our commitment to digitizing services
                        across the Visayas.
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
                    <p style="margin: 0; font-size: 11px; font-weight: 700; color: #a39c89; text-transform: uppercase; letter-spacing: 1px;">
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
    })

    if (error) throw error

    // 4. Return success response with CORS headers
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (err) {
    // 5. Return error response with CORS headers
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})