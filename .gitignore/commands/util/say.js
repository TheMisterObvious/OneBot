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
    message.delete();
    message.say("*"+ args +"*");
  }
}

module.exports = SayCommand;
