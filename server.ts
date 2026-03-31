
import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { Resend } from "resend";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Initialize Resend client lazily
  let resend: Resend | null = null;
  const getResend = () => {
    if (!resend) {
      const apiKey = process.env.RESEND_API_KEY;
      if (!apiKey) {
        throw new Error("RESEND_API_KEY is not set");
      }
      resend = new Resend(apiKey);
    }
    return resend;
  };

  app.use(express.json());

  // API routes
  app.post("/api/send-email", async (req, res) => {
    const { email, orderDetails } = req.body;

    console.log("Attempting to send email via Resend to:", email);
    
    if (!email || !orderDetails) {
      return res.status(400).json({ error: "Missing email or orderDetails" });
    }

    try {
      const resendClient = getResend();
      const { data, error } = await resendClient.emails.send({
        from: "Hemzal <onboarding@resend.dev>",
        to: email,
        subject: "Order Confirmed - Hemzal Crispy Chicken",
        html: `
          <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #1a1a1a; color: #f5f5f5; border-radius: 24px; overflow: hidden; border: 1px solid #333;">
            <div style="background-color: #FF4500; padding: 40px 20px; text-align: center;">
              <h1 style="margin: 0; font-size: 32px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; color: white;">Order Confirmed</h1>
              <p style="margin: 10px 0 0; font-size: 16px; opacity: 0.9; color: white;">Order ID: ${orderDetails.id}</p>
            </div>
            
            <div style="padding: 40px; background-color: #1a1a1a;">
              <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 24px; color: #FF4500; border-bottom: 1px solid #333; padding-bottom: 12px;">Order Summary</h2>
              
              <table style="width: 100%; border-collapse: collapse;">
                <thead>
                  <tr style="text-align: left; border-bottom: 1px solid #333;">
                    <th style="padding: 12px 0; font-size: 12px; text-transform: uppercase; color: #888;">Item</th>
                    <th style="padding: 12px 0; font-size: 12px; text-transform: uppercase; color: #888; text-align: center;">Qty</th>
                    <th style="padding: 12px 0; font-size: 12px; text-transform: uppercase; color: #888; text-align: right;">Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${orderDetails.items.map((item: any) => {
                    const chicken = item.chicken || item.beverage || {};
                    const name = chicken.name || 'Unknown Item';
                    const price = chicken.price || '$0';
                    return `
                    <tr style="border-bottom: 1px solid #222;">
                      <td style="padding: 16px 0; font-weight: 600;">${name}</td>
                      <td style="padding: 16px 0; text-align: center; color: #FF4500; font-weight: 700;">${item.quantity}x</td>
                      <td style="padding: 16px 0; text-align: right; color: #888;">$${(parseFloat(price.replace('$', '')) * item.quantity).toFixed(2)}</td>
                    </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
              
              <div style="margin-top: 32px; padding-top: 24px; border-top: 2px solid #333; display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 18px; font-weight: 700; color: #f5f5f5;">Total Paid</span>
                <span style="font-size: 24px; font-weight: 800; color: #FF4500;">$${orderDetails.total.toFixed(2)}</span>
              </div>
              
              <div style="margin-top: 48px; text-align: center;">
                <p style="font-size: 14px; color: #888; line-height: 1.6;">
                  Thank you for choosing Hemzal. We take pride in crafting every bite to perfection.
                </p>
                <div style="margin-top: 24px;">
                  <a href="${process.env.APP_URL || '#'}" style="background-color: #FF4500; color: white; padding: 14px 28px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 14px; display: inline-block;">Explore More Chickens</a>
                </div>
              </div>
            </div>
            
            <div style="background-color: #111; padding: 24px; text-align: center; border-top: 1px solid #333;">
              <p style="margin: 0; font-size: 12px; color: #555;">&copy; 2026 Hemzal Crispy Chicken. All rights reserved.</p>
              <p style="margin: 8px 0 0; font-size: 10px; color: #444;">You received this email because you placed an order on our website.</p>
            </div>
          </div>
        `,
      });

      if (error) {
        console.error("Resend API Error:", JSON.stringify(error, null, 2));
        return res.status(400).json({ error });
      }

      res.status(200).json({ data });
    } catch (error: any) {
      console.error("Resend error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
