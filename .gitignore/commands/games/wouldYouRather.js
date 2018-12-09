const question = xrequire('./assets/wouldYouRather.json');

module.exports = class wouldYouRather extends Command {
	constructor(client) {
		super(client, {
			name: 'wouldyourather',
			aliases: ['wyr', 'wouldyou'],
			group: 'games',
			memberName: 'wouldyourather',
			description: 'Montre une situation que vous préférez. Voyez comment vous et vos amis répondez à cette question !',
			clientPermissions: ['EMBED_LINKS']
		});
	};

exports.exec = async (OneBot, message) => {
    await message.channel.send({
    embed: {
      color: OneBot.colors.BLUE,
      description: question[Math.floor(Math.random() * question.length)]
    }
  });
};
