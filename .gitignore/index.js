const Commando = require('discord.js-commando');
const config = require('./config.js');

const client = new Commando.Client({
  owner: "",
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
