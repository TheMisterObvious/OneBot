const question = xrequire('./assets/wouldYouRather.json');

exports.exec = async (OneBot, message) => {
  await message.channel.send({
    embed: {
      color: OneBot.colors.BLUE,
      description: question[Math.floor(Math.random() * question.length)]
    }
  });
};

exports.config = {
  aliases: [ 'wouldyou' ],
  enabled: true
};

exports.help = {
  name: 'wouldYouRather',
  description: 'Shows a would you rather situation. See how you and your friends answer that!',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'wouldYouRather',
  example: []
};
