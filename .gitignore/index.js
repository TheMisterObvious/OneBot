const Discord = require("discord.js");
const client = new Discord.Client();
const db = require('quick.db');
const blacklist = new db.table('blacklist');

const prefix = "o!"; 
const time = "1000"; 
const admin = "338339839617269762, 414878235382513674";

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

//Fun

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


client.login(process.env.TOKEN);
