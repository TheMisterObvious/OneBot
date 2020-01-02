const Discord = require("discord.js");
const client = new Discord.Client();
const db = require('quick.db');
const blacklist = new db.table('blacklist');
const moment = require("moment");
const weather = require("weather-js");
const fs = require("fs");
const ms = require("parse-ms");

//Upgrade Code (WIP)

client.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err);

    var jsfiles = files.filter(f => f.split('.').pop() === 'js');
    if (jsfiles.length <= 0) { 
        return console.log('Aucune commande trouvé...');
    } else { 
        console.log(jsfiles.length +' commandes trouvés.')
    }

    jsfiles.forEach((f, i) => {
        var cmds = require(`./commands/${f}`);
        console.log(`Commande ${f} en chargement...`);
        client.commands.set(cmds.config.command, cmds);
    })
});

client.on("message", message => {
  var prefix = "o!";
  var user = message.author;
  var msg = message.content.toUpperCase();
  var cont = message.content.slice(prefix.length).split(" ");
  var args = cont.slice(1);
  const power = db.get(`power_${user.id}`);
    
  if (power === undefined) {
      db.set(`power_${user.id}`, 0);
  }

if (message.content.startsWith("o!say")) {
    message.channel.send(message.content.substring(6);
}

  if (!message.content.startsWith(prefix)) return;

  var cmd = client.commands.get(cont[0]);
  if (cmd) cmd.run(client, message, args);
   
});

/*
//Console log
client.on("ready", () => {
var memberCount = client.users.size;
var servercount = client.guilds.size;
    client.user.setActivity('o!help | '+ servercount +' serveurs')
    //client.user.setAvatar('./avatar.jpg')
    var servers = client.guilds.array().map(g => g.name).join(',');
    console.log("--------------------------------------");
console.log("[!]Connexion en cours... \n[!]Veuillez Patienté! \n[!]Les évenement sont après ! :)  \n[!]Les préfix actuelle: o! \n[!]Mentions = <@521330981144100864> \n[!]Nombre de membres: " + memberCount + "\n[!]Nombre de serveurs: " + servercount);
});
//Economie
client.on("message", message => {
  if (message.content === prefix +'leaderboard') {
    var money = db.startsWith(`money_${message.guild.id}`, {sort: '.data'});
    var content = "";
    for (var i = 0; i < money.lenght; i++) {
      var user = client.users.get(money[i].ID.split('_')[2]).username
      content += `${i+1}. ${user} ~ ${money[i].data}$\n`;
    }
    const embed = new Discord.RichEmbed
    .setAuthor(`$(message.guild.name} - Leaderboard`, message.guild.iconURL)
    .setDescription(content)
    .setColor(0x51267) 
    message.channel.send(embed);
  }
});

client.on("message", message => {
  if (message.content.startsWith(prefix +'info')) {
    var memberavatar = message.author.avatarURL
    var membername = message.author.username
      var mentionned = message.mentions.users.first();
      var getvalueof;
      if(mentionned){
          var getvalueof = mentionned;
      } else {
          var getvalueof = message.author;
      }
      
      if(getvalueof.presence.status == 'online'){
        var status = "En ligne"; 
      }else {
        var status = "Hors ligne";
      }
      
      message.channel.sendMessage({
              embed: {
          type: 'rich',
          description: '',
          fields: [{
            name: 'Pseudo',
            value: getvalueof.username,
            inline: true
          }, {
            name: 'User id',
            value: getvalueof.id,
            inline: true
          },{
            name: 'Status',
            value: status,
            inline: true
          }],
          color: 0x666666,
          footer: {
            text: 'by TheMisterObvious',
            proxy_icon_url: ' '
          },
          thumbnail: {
            url: getvalueof.avatarURL 
          },
          author: {
            name: getvalueof.username +"#"+ getvalueof.discrimator,
            icon_url: getvalueof.avatarURL,
            proxy_icon_url: ' '
          }
        }
     });
   }
});
client.on("message", message => {
  if (message.content === prefix +'serverinfo') {
    message.delete(1);
    moment.locale("fr");
    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Serveur Information")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Nom du serveur", message.guild.name)
    .addField("Créé le", message.guild.createdAt)
    .addField("Vous l'avez rejoint le", message.member.joinedAt)
    .addField("Membres total", message.guild.memberCount);
    message.channel.send(serverembed);
  }
});
client.on("message", message => {
  if (message.content === prefix +'botinfo') {
      message.delete(1);
      moment.locale("fr");
      let bicon = client.user.displayAvatarURL;
      let embed = new Discord.RichEmbed()
      .setDescription("Bot Information")
      .setColor("#15f153")
      .setThumbnail(bicon)
      .addField("Nom du bot", client.user.username)
      .addField("Créé le", client.user.createdAt);
      message.channel.send(embed);
  }
});
client.on("message", message => {
  if (message.content.startsWith(prefix +'meteo')) {
    var location = message.content.substring(8);
    var unit = "C";
    
    try {
        weather.find({search: location, degreeType: unit}, function(err, data) {
            if(err) {
                console.log(Date.now(), "DANGER", "Je ne peut pas trouvé d'information pour la méteo de " + location);
                message.reply("\n" + "Je ne peut pas trouvé d'information pour la méteo de " + location);
            } else {
                data = data[0];
               console.log("**" + data.location.name + " Maintenant : **\n" + data.current.temperature + "°" + unit + " " + data.current.skytext + ", ressentie " + data.current.feelslike + "°, " + data.current.winddisplay + " Vent\n\n**Prévisions pour demain :**\nHaut: " + data.forecast[1].high + "°, Bas: " + data.forecast[1].low + "° " + data.forecast[1].skytextday + " avec " + data.forecast[1].precip + "% de chance de precipitation.");
               message.reply("\n" + "**" + data.location.name + " Maintenant : **\n" + data.current.temperature + "°" + unit + " " + data.current.skytext + ", ressentie " + data.current.feelslike + "°, " + data.current.winddisplay + " Vent\n\n**Prévisions pour demain :**\nHaut: " + data.forecast[1].high + "°, Bas: " + data.forecast[1].low + "° " + data.forecast[1].skytextday + " avec " + data.forecast[1].precip + "% de chance de precipitation.");
            }
        });
    } catch(err) {
        console.log(Date.now(), "ERREUR", "Weather.JS a rencontré une erreur");
        message.reply("Idk pourquoi c'est cassé tbh :(");
    }
}
});
//Level
//Ticket
client.on("message", message => {
    if (message.content === prefix +'ticket') {
        const reason = message.content.split(" ").slice(1).join(" ");
        if (!message.guild.roles.exists("name", "Support Staff")) return message.channel.send(`Le rôle \`Support Staff\` n'éxiste pas, merci de le crée.`);
        if (message.guild.channels.exists("name", "ticket-" + message.author.id)) return message.channel.send(`Vous avez déjà un ticket d'ouvert.`);
        message.guild.createChannel(`ticket-${message.author.id}`, "text").then(c => {
            let role = message.guild.roles.find("name", "Support Staff");
            let role2 = message.guild.roles.find("name", "@everyone");
            c.overwritePermissions(role, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });
            c.overwritePermissions(role2, {
                SEND_MESSAGES: false,
                READ_MESSAGES: false
            });
            c.overwritePermissions(message.author, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });
            message.channel.send(`:white_check_mark: Votre ticket à bien été crée, #${c.name}.`);
            const embed = new Discord.RichEmbed()
                .setColor(0xCF40FA)
                .addField(`Hey ${message.author.username}!`, `essayez d’expliquer pourquoi vous avez ouvert ce ticket avec le plus de détails possible. Notre personnel de soutien sera bientôt là pour vous aider.`)
                .setTimestamp();
            c.send({
                embed: embed
            });
        }).catch(console.error); 
    }
});
client.on("message", message => {
    if (message.content === prefix +'close') {
        if (!message.channel.name.startsWith("ticket-")) return message.channel.send("Vous ne pouvez utilisez la commande `/close` seulement dans le salon de votre ticket.");
        message.channel.send("Êtes-vous sûr ? Une fois confirmée, vous ne pouvez plus annuler cette action! \nPour confirmer, tapez `/confirm `. Cette action expirera dans 10 secondes et sera annulé.")
            .then((m) => {
                message.channel.awaitMessages(response => response.content === "/confirm", {
                        max: 1,
                        time: 10000,
                        errors: ['time'],
                    })
                    .then((collected) => {
                        message.channel.delete();
                    })
                    .catch(() => {
                        m.edit("La fermeture du ticket a expiré, le ticket n\'a pas été fermé.").then(m2 => {
                            m2.delete();
                        }, 3000);
                    });
            });
       }
});
//Strawpoll
client.on("message", message => {
  if (message.content.startsWith(prefix +'poll')) {
  const poll = message.content.substring(7);
      if (poll.lenght === 0) {
         message.reply("Vous n'avez pas mis de question");
      }
  message.delete(1);
  const pollembed = new Discord.RichEmbed()
  .setTitle("StrawPoll")
  .setColor("#5599ff")
  .setDescription(`${poll}`)
  .setFooter(`StrawPoll de ${message.author.username}`, `${message.author.avatarURL}`)
  message.channel.send(pollembed)
  .then(async function (message) {
    await message.react("✅")
    await message.react("❌")
    await message.react("🤷")
    });
  }
});
*/

client.login(process.env.TOKEN);
