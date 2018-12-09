const Commando = require('discord.js-commando');

const client = new Commando.Client({
  owner: "338339839617269762",
  commandPrefix: "o!"
});

client.registry
  .registerGroups([
    ['fun', 'Fun'],
    ['chattools', 'Chat Tools']
  ])
  .registerDefaults()
  .registerCommandsIn(__dirname+"/commands");

client.login(cprocess.env.TOKEN);
