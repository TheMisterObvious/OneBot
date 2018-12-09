const Commando = require('discord.js-commando');

const client = new Commando.Client({
  owner: "338339839617269762",
  commandPrefix: "o!"
});

client.registry
  .registerGroups([
    ['games', 'Les jeux du bot'],
    ['util', 'Les commandes utiles du bot'],
    ['search', 'Les commandes de recherche du bot'],
    ['mod', 'Les commandes du modération du bot'],
    ['admin', 'Les commandes d\'aministration du bot'],
    ['adminbot', 'Les commandes pour les admin du bot']
  ])
  .registerDefaults()
  .registerCommandsIn(__dirname+"/commands");

client.on("ready", () => {
var memberCount = client.users.size;
var servercount = client.guilds.size;
    client.user.setActivity('/help')
    client.user.setAvatar('./avatar.jpg')
    var servers = client.guilds.array().map(g => g.name).join(',');
    console.log("--------------------------------------");
console.log("[!]Connexion en cours... \n[!]Veuillez Patienté! \n[!]Les évenement sont après ! :)  \n[!]Les préfix actuelle: o! \n[!]Mentions = <@521330981144100864> \n[!]Nombre de membres: " + memberCount + "\n[!]Nombre de serveurs: " + servercount);
});

client.login(process.env.TOKEN);
