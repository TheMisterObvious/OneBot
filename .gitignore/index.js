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

var prefix = "o!"

client.on("ready", () => {
var memberCount = client.users.size;
var servercount = client.guilds.size;
    client.user.setGame('/help')
    client.user.setAvatar('./avatar.jpg')
    var servers = client.guilds.array().map(g => g.name).join(',');
    console.log("--------------------------------------");
console.log('[!]Connexion en cours... \n[!]Veuillez Patienté! \n[!]Les évenement sont après ! :)  \n[!]Les préfix actuelle:  ' + prefix + "\n[!]Mentions = " + mention + "\n[!]Nombre de membres: " + memberCount + "\n[!]Nombre de serveurs: " + servercount);
});

client.login(process.env.TOKEN);
