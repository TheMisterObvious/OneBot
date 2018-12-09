const Commando = require('discord.js-commando');

class SayCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'say',
      group: 'chattools',
      memberName: 'say',
      description: 'Simon says.',
      format: 'text',
    });
  }

  async run(message, args) {
    // Delete user's comment, replace it with bot's.
    message.delete();
    message.say(args);
  }
}

module.exports = SayCommand;
