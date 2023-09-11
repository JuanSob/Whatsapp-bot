const { Client, RemoteAuth } = require('whatsapp-web.js');
const { MongoStore } = require('wwebjs-mongo');
const mongoose = require('mongoose');
const qrcode = require('qrcode-terminal');
require('dotenv').config();

const messageController = require('./src/controllers/messageController');

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('DB connected successfully');
});

mongoose.connect(process.env.MONGODB_URI).then(() => {
  const store = new MongoStore({ mongoose: mongoose });
  const client = new Client({
    authStrategy: new RemoteAuth({
      store: store,
      backupSyncIntervalMs: 60000
    })
  });

  client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
  });

  client.on('ready', () => {
    console.log('Client is ready!');
  });

  client.on('remote_session_saved', () => {
    console.log('Client saved session');
  });

  client.on('message', async (message) => {
    try {
      const respuesta = await messageController.handleMessage(client, message);
      console.log(respuesta);
    } catch (error) {
      console.error('Error en el manejo del mensaje:', error);
    }
  });

  client.initialize();
})
  .catch((error) => {
    console.error('Error al conectar a la base de datos MongoDB:', error);
  });