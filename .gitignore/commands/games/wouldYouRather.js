const question = xrequire('./assets/wouldYouRather.json');

module.exports = class AkinatorCommand extends Command {
	     constructor(client) {
		           super(client, {
			                 name: 'akinator',
			                 aliases: ['aki'],
			                 group: 'games',
			                 memberName: 'akinator',
			                 description: 'Think about a real or fictional character, I will try to guess who it is.',
			                 clientPermissions: ['EMBED_LINKS']
		           });
       }

       async run(message) {
               await message.channel.send({
                 embed: {
                   color: client.colors.BLUE,
                   description: question[Math.floor(Math.random() * question.length)]
                 }
               });
       }
}
