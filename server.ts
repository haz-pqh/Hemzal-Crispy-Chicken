
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

    console.log("Attempting to send email to:", email);
    console.log("Order Details:", JSON.stringify(orderDetails, null, 2));

    if (!email || !orderDetails) {
      return res.status(400).json({ error: "Missing email or orderDetails" });
    }

    try {
      const resendClient = getResend();
      const { data, error } = await resendClient.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Order Confirmation - Hemzal Crispy Chicken & Beverages",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #FF4500;">Thank you for your order!</h1>
            <p>Your refreshing beverages are being prepared.</p>
            <div style="background: #f9f9f9; padding: 20px; border-radius: 10px;">
              <h2 style="margin-top: 0;">Order Summary</h2>
              <ul style="list-style: none; padding: 0;">
                ${orderDetails.items.map((item: any) => `
                  <li style="padding: 10px 0; border-bottom: 1px solid #eee;">
                    <strong>${item.quantity}x</strong> ${item.beverage.name} - 
                    <span style="color: #666;">$${(parseFloat(item.beverage.price.replace('$', '')) * item.quantity).toFixed(2)}</span>
                  </li>
                `).join('')}
              </ul>
              <p style="font-size: 1.2em; font-weight: bold; margin-top: 20px;">
                Total Paid: <span style="color: #FF4500;">$${orderDetails.total.toFixed(2)}</span>
              </p>
            </div>
            <p style="color: #888; font-size: 0.8em; margin-top: 30px; text-align: center;">
              We hope you enjoy your drinks!
            </p>
          </div>
        `,
      });

      if (error) {
        console.error("Resend API Error:", JSON.stringify(error, null, 2));
        return res.status(400).json({ error });
      }

      res.status(200).json({ data });
    } catch (error: any) {
      console.error("Server error:", error);
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
