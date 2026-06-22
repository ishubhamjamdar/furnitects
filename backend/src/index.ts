import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { quotesRouter } from './routes/quotes';
import { getGeneralWhatsAppUrl } from './services/whatsapp';

const app = express();
const PORT = Number(process.env.PORT) || 4000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/config', (_req, res) => {
  res.json({
    whatsappPhone: process.env.WHATSAPP_PHONE || '919881984488',
    whatsappGeneralUrl: getGeneralWhatsAppUrl(),
    brand: {
      tagline: "Dream it, we'll design it.",
      director: 'Yash Bagmar',
      email: 'support@furnitects.com',
      website: 'furnitects.com',
      office: 'Office No 910, Apex Business Court, Pune – 411037',
    },
  });
});

app.use('/api/quotes', quotesRouter);

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`Furnitects API running on http://localhost:${PORT}`);
});
