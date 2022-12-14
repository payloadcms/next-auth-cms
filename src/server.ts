import express from 'express';
import payload from 'payload';

require('dotenv').config();

const app = express();

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin');
});

const init = async () => {
  await payload.initAsync({
    email: {
      logMockCredentials: true,
      fromAddress: 'dev@payloadcms.com',
      fromName: 'Payload Auth + NextJS Example',
    },
    secret: process.env.PAYLOAD_SECRET,
    mongoURL: process.env.MONGODB_URI,
    express: app,
    onInit: () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });

  app.listen(process.env.PORT || 8000);
};

init();
