const Commando = require('discord.js-commando');

class SayCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'say',
      group: 'fun',
      memberName: 'say',
      description: 'Faire parle le bot.',
      format: 'text',
    });
  }

  async run(message, args) {
    message.delete();
    message.say("*"+ args +"*");
  }
}

module.exports = SayCommand;
