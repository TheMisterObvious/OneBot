const Discord = require("discord.js");
const client = new Discord.Client();
const quickdb = require('quick.db');
const blacklist = new quickdb.table('blacklist');
const eco = require("discord-economy");

const prefix = "o!"; 
const time = "1000"; 
const admin = "338339839617269762, 414878235382513674";

client.on("ready", () => {
var memberCount = client.users.size;
var servercount = client.guilds.size;
    client.user.setActivity('o!help | '+ servercount +' serveurs')
    client.user.setAvatar('./avatar.jpg')
    var servers = client.guilds.array().map(g => g.name).join(',');
    console.log("--------------------------------------");
console.log("[!]Connexion en cours... \n[!]Veuillez Patienté! \n[!]Les évenement sont après ! :)  \n[!]Les préfix actuelle: o! \n[!]Mentions = <@521330981144100864> \n[!]Nombre de membres: " + memberCount + "\n[!]Nombre de serveurs: " + servercount);
});

//Economy

client.on("message", message => {
    if (message.content.startsWith(prefix +'setmoney')) {
        if (message.author.id !== admin) {
            var setuser = message.mentions.members.first();
            var etape1 = message.content.substring(11);
            var moneyset = etape1.substring(22);
            console.log(setuser.id);
            console.log(moneyset);
        }
    }
});
        

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
