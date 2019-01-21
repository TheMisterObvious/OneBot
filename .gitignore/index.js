const Discord = require("discord.js");
const client = new Discord.Client();
const db = require('quick.db');
const blacklist = new db.table('blacklist');
const fs = require("fs");
const moment = require("moment");
const weather = require("weather-js");

const prefix = "o!"; 
const admin = "335419820721963009, 414878235382513674";

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

//Autres

client.on('message', message => {
  if (message.content.startsWith(prefix +'say')) {
    message.delete(1);
    var say = message.content.substring(5);
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
      client.user.setUsername(message.content.substring(9));
      message.delete(1);
    }
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
    var location = message.content.substring(6);
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

let ldb = JSON.parse(fs.readFileSync("./levels.json", "utf8"));

client.on("message", message => {
    if (message.author.bot) return;
    if (!ldb[message.author.id]) ldb[message.author.id] = {
        xp: 0,
        level: 0
      };
    ldb[message.author.id].xp++;
    let userInfo = ldb[message.author.id];
    if(userInfo.xp > 100) {
        userInfo.level++
        userInfo.xp = 0
        message.reply("Bravo, vous avez passer un niveau !")
    }
    const largs = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const cmd = largs.shift().toLowerCase();
    if(cmd === "level") {
        let userInfo = ldb[message.author.id];
        let member = message.mentions.members.first();
        let embed = new Discord.RichEmbed()
        .setColor(0x4286f4)
        .addField("__Level :__ ", userInfo.level)
        .addField("__XP :__ ", userInfo.xp+"/100");
        if(!member) return message.channel.sendEmbed(embed)
        let memberInfo = ldb[member.id]
        let embed2 = new Discord.RichEmbed()
        .setColor(0x4286f4)
        .addField("__Level :__ ", memberInfo.level)
        .addField("__XP :__ ", memberInfo.xp+"/100")
        message.channel.sendEmbed(embed2)
    }
    fs.writeFile("./json/database.json", JSON.stringify(ldb), (x) => {
        if (x) console.error(x)
      });
});

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
  const poll = message.content.substring(5);
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
