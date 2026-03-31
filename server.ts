
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

    if (!email || !orderDetails) {
      return res.status(400).json({ error: "Missing email or orderDetails" });
    }

    try {
      const resendClient = getResend();
      const { data, error } = await resendClient.emails.send({
        from: "Hemzal <onboarding@resend.dev>",
        to: email,
        subject: "Order Confirmation - Hemzal Crispy Chicken & Beverages",
        html: `
          <h1>Thank you for your order!</h1>
          <p>Your refreshing beverages are being prepared.</p>
          <h2>Order Summary</h2>
          <ul>
            ${orderDetails.items.map((item: any) => `
              <li>${item.quantity}x ${item.beverage.name} - $${(parseFloat(item.beverage.price.replace('$', '')) * item.quantity).toFixed(2)}</li>
            `).join('')}
          </ul>
          <p><strong>Total Paid: $${orderDetails.total.toFixed(2)}</strong></p>
          <p>We hope you enjoy your drinks!</p>
        `,
      });

      if (error) {
        console.error("Resend error:", error);
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
