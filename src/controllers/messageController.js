// controllers/messageController.js
const { Client, MessageMedia, Location } = require('whatsapp-web.js');
const msg = require('../Utils/messages');
require('dotenv').config();
const location = new Location(parseInt(process.env.LATITUDE), parseInt(process.env.LONGITUDE), process.env.DESCRIPTION);

async function handleMessage(client, message) {
  const logoFP = MessageMedia.fromFilePath(`${process.env.MEDIAFP}Info.png`);
  let answerMsj = {
    sender: message.from.substring(0, 11),
    content: message.body,
  };

  if (message.body.toUpperCase() === 'HOLA') {
    client.sendMessage(message.from, msg.welcomeMessage);
    answerMsj.answer = msg.welcomeMessage;
  } 
  else if (msg.optAMessage.includes(message.body.toUpperCase())) {
    client.sendMessage(message.from, logoFP, { caption: msg.infoImgMessage});
    setTimeout(() => {
      client.sendMessage(message.from, msg.helpConfirmationMessage);
    }, 3000);
    answerMsj.answer = `${msg.infoImgMessage} ${msg.helpConfirmationMessage}`;
  } else if (msg.optBMessage.includes(message.body.toUpperCase())) {
    client.sendMessage(message.from, location);
    client.sendMessage(message.from, msg.helpConfirmationMessage);
    answerMsj.answer = `Se ha enviado la ubicación más ${msg.helpConfirmationMessage}`;
  } else if (msg.optCMessage.includes(message.body.toUpperCase())) {
    client.sendMessage(message.from, msg.otherReasonMessage);
    answerMsj.answer = msg.otherReasonMessage;
  }
  else if (message.body.toUpperCase().trim() === 'TERMINADO'){
    client.sendMessage(message.from,msg.goodByeMessage);
    answerMsj.answer = msg.goodByeMessage;
  }
  else if (message.body.toUpperCase().trim() === 'AYUDA'){
    client.sendMessage(message.from,msg.moreHelpMessage);
    answerMsj.answer = msg.moreHelpMessage;
  }
  else if (message.hasMedia) {
    const media = await message.downloadMedia();
    let descImg =media.caption;
    client.sendMessage(message.from, 
      `${descImg === undefined ? msg.noImgDesMessage : msg.imgDescMessage + descImg }`);
    answerMsj.answer = 'Se ha recibido una imagen';
  }
  /*else{
    client.sendMessage(message.from,msg.unknownMessage);
    answerMsj.answer = msg.unknownMessage;

  }*/

  return answerMsj;
}

module.exports = {
  handleMessage
};