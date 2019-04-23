const Discord = require("discord.js");
const client = new Discord.Client();
const db = require('quick.db');
const blacklist = new db.table('blacklist');
const moment = require("moment");
const weather = require("weather-js");

const prefix = "o!"; 
const admin = "335419820721963009";

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

//Réponses automatiques

client.on("message", message => {
  if (message.content === 'test') {
    message.reply('Test !');
  }
}); 

client.on("message", message => {
  if (message.content === 'Test') {
    message.reply('Test !');
  }
}); 

client.on("message", message => {
  if (message.content.startsWith('bonjour')) {
    message.channel.send('Salut ça va ?');
  }
});

client.on("message", message => {
  if (message.content.startsWith('Bonjour')) {
    message.channel.send('Salut ça va ?');
  }
});

//Economie

client.on("message", message => {
  if (message.content.startsWith(prefix +'testmoney')) {
      var add = message.content.substring(32);
      var user = message.mentions.users.first().id;
      db.set('ecoInfo', add);
      db.set('ecoInfo2', user);
      var info = db.get('ecoInfo');
      var info2 = db.get('ecoInfo2');
      message.channel.send('__Add:__'+ info +'\n__User:__ -> '+ info2);
  }
});

client.on("message", message => {
  if (message.content.startsWith(prefix +'money')) {
    var user = message.mentions.users.first() || message.author
    var bal = db.get(`money_${message.guild.id}_${user}`);
    if (bal === null) bal =0;
    message.channel.send('Vous avez '+ bal + ' $');
  } else if (message.content.startsWith(prefix +'balance')) {
    var user = message.mentions.users.first || message.author
    var bal = db.get(`money_${message.guild.id}_${user}`);
    if (bal === null) bal =0;
    message.channel.send('Vous avez '+ bal + '$');
  }
});

client.on("message", message => {
  if (message.content.startsWith(prefix +'addmoney')) {
      var add = message.content.substring(31);
      var user = message.mentions.users.first();
    if  (!message.member.hasPermission('ADMINISTRATOR')) {
       message.channel.send('Vous n\'avez pas la permission d\'éxécuter cette commande !');
    } 
    if (user === null) {
       message.channel.send('Merci de spécifier un utilisateur !');
    }
    if (add.lenght === 0) {
       message.channel.send('Merci de spécifier un montant à ajouter !');
    }
    if (isNaN(add)) {
       message.channel.send('Merci de spécifier un nombre valide !')
    }
    db.add(`money_${message.guild.id}_${user}`, add);
    message.channel.send('Vous avez ajouté '+ add +'$ à '+ user +' !');
  }
});

client.on("message", message => {
  if (message.content.startsWith(prefix +'removemoney')) {
      var remove = message.content.substring(34);
      var user = message.mentions.users.first();
    if  (!message.member.hasPermission('ADMINISTRATOR')) {
       message.channel.send('Vous n\'avez pas la permission d\'éxécuter cette commande !');
    } 
    if (user === null) {
       message.channel.send('Merci de spécifier un utilisateur !');
    }
    if (remove.lenght === 0) {
       message.channel.send('Merci de spécifier un montant à retirer !');
    }
    if (isNaN(remove)) {
       message.channel.send('Merci de spécifier un nombre valide !')
    }
    db.substract(`money_${message.guild.id}_${user}`, remove);
    message.channel.send('Vous avez retirer '+ remove +'$ à '+ user +' !');
  }
});

client.on("message", message => {
  if (message.content.startsWith(prefix +'setmoney')) {
      var set = message.content.substring(31);
      var user = message.mentions.users.first();
    if  (!message.member.hasPermission('ADMINISTRATOR')) {
       message.channel.send('Vous n\'avez pas la permission d\'éxécuter cette commande !');
    } 
    if (user === null) {
       message.channel.send('Merci de spécifier un utilisateur !');
    }
    if (set.lenght === 0) {
       message.channel.send('Merci de spécifier un montant à fixer !');
    }
    if (isNaN(set)) {
       message.channel.send('Merci de spécifier un nombre valide !')
    }
    db.set(`money_${message.guild.id}_${user}`, set);
    message.channel.send('Vous avez mis la balance à '+ add +'$ de '+ user +' !');
  }
});

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

//Changement de préfix



//Autres

client.on('message', message => {
  if (message.content.startsWith(prefix +'say')) {
    message.delete(1);
    var say = message.content.substring(6);
    message.channel.send("*"+ say +"*");
  }
});

client.on("message", message => {
  if (message.content === prefix +'channel') {
    message.delete(1);
    const data = client.channels.get(message.channel.id);
    moment.locale("fr");
    var temps = moment(data.createdTimestamp).format("LLLL");
    console.log(temps)
    message.channel.send("\n" + "```javascript"+ "\n" + "Nom du channel: " + data.name + "\n" + "Type de channel: " + data.type + "\n" +
    "Channel id: " + data.id + "\n" + "Topic: " + data.topic + "\n" + "Créer le: " + temps + "```" );
    console.log("\n" + "**" + "Channel id: " + data.id + "**" );
    console.log(data);
  }
}); 

client.on("message", message => {
  if (message.content.startsWith(prefix +'botname')) {
    if (message.author.id === admin) {
      client.user.setUsername(message.content.substring(10));
      message.delete(1);
    }
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

//Economie

//Gban

/*
setInterval(function(){
       var nombreMembresBannis = 0;
       var membresBannis = [];
       var blacklisted = blacklist.get('blacklist.users');
        
client.guilds.forEach(serveur => {
       serveur.members.forEach(membre => {
            blacklisted.forEach(user =>{
                    if(membre.id === user){
                        membre.send('Vous avez été banni de **'+serveur+'** car vous faites parti de la blacklist !');
                        membre.ban('utilisateur dans la blacklist !');
                        banni++;
                        membresBannis.push(membre);
                    }
                });
            });
        });
    }, time);

client.on("message", async message => {
       if(message.content.indexOf(prefix !== 0)) return;
  
       const args = message.content.slice(prefix.length).trim().split(/ +/g);
       const command = args.shift().toLowerCase();
       
       if(command === 'gban'){
            if(message.author.id !== admin) return message.reply('permissions insuffisantes');
            var to_add = args[0];
            if(!to_add) return message.reply('entre une ID à blacklist !');
            if(isNaN(to_add)) return message.reply('entre une ID valide !');
            var validUser = false;
            client.fetchUser(to_add).then(the_user =>{
                 validUser = the_user;
            }).catch(err => {
            return message.reply('aucun utilisateur avec une telle ID trouvé !');
        });
        if(validUser){
            var blacklisted = blacklist.get('blacklist.users');
            if(blacklisted.includes(validUser.id)) return message.reply('ID déjà enregistrée !');
            else blacklist.push('blacklist.users', validUser.id);
            return message.reply('utilisateur **'+validUser.username+'#'+validUser.discriminator+'** blacklisté !');
        }
    }
    if(command === 'rgban'){
        if(message.author.id !== admin) return message.reply('permissions insuffisantes');
        var to_remove = args[0];
        if(!to_remove) return message.reply('entre une ID à unblacklist !');
        if(isNaN(to_remove)) return message.reply('entre une ID valide !');
        var validUser = false;
        client.fetchUser(to_remove).then(the_user =>{
            validUser = the_user;
        }).catch(err => {
            return message.reply('aucun utilisateur avec une telle ID trouvé !');
        });
        if(validUser){
            var blacklisted = blacklist.get('blacklist.users');
            if(!blacklisted.includes(validUser.id)) return message.reply('l\'ID n\'est pas blacklist !');
            else var all_members = [];
            blacklisted.forEach(element => {
                if(element !== validUser.id){
                    all_members.push(element);
                }
            });
            blacklist.set('blacklist.users', all_members);
            return message.reply('utilisateur **'+validUser.username+'#'+validUser.discriminator+'** unblacklist ! !');
        }
    }
});
*/

client.login(process.env.TOKEN);
