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

client.on('message', async message => {
 
    const settings = {
      prefix: '!',
    }
 
    var command = message.content.toLowerCase().slice(settings.prefix.length).split(' ')[0];
    var args = message.content.split(' ').slice(1);
 
    if (!message.content.startsWith(settings.prefix) || message.author.bot) return;
    if (command === 'balance') {
      var output = await eco.FetchBalance(message.author.id)
      message.channel.send(`Hey ${message.author.tag}! You own ${output.balance} coins.`);
    }
    if (command === 'daily') {
      var output = await eco.Daily(message.author.id) 
      if (output.updated) {
        var profile = await eco.AddToBalance(message.author.id, 100)
        message.reply(`You claimed your daily coins succesfully! You now own ${profile.newbalance} coins.`);
      } else {
        message.channel.send(`Sorry, you already claimed your daily coins!\nBut no worries, over ${output.timetowait} you can daily again!`)
      }
    }
    if (command === 'resetdaily') {
      var output = await eco.ResetDaily(message.author.id)
      message.reply(output)
    }
    if (command === 'leaderboard') {
      if (message.mentions.users.first()) {
        var output = await eco.Leaderboard({
          search: message.mentions.users.first().id
        })
        message.channel.send(`The user ${message.mentions.users.first().tag} is number ${output} on my leaderboard!`);
  } else {
    eco.Leaderboard({
      limit: 3
    }).then(async users => { //make sure it is async
      var firstplace = await client.fetchUser(users[0].userid) //Searches for the user object in discord for first place
      var secondplace = await client.fetchUser(users[1].userid) //Searches for the user object in discord for second place
      var thirdplace = await client.fetchUser(users[2].userid) //Searches for the user object in discord for third place
      message.channel.send(`My leaderboard:
 
1 - ${firstplace.tag} : ${users[0].balance}
2 - ${secondplace.tag} : ${users[1].balance}
3 - ${thirdplace.tag} : ${users[2].balance}`)
 
    })
  }
}
if (command === 'transfer') {
  var user = message.mentions.users.first()
  var amount = args[1]
  if (!user) return message.reply('Reply the user you want to send money to!')
  if (!amount) return message.reply('Specify the amount you want to pay!')
  var output = await eco.FetchBalance(message.author.id)
  if (output.balance < amount) return message.reply('You have less coins than the amount you want to transfer!')
  var transfer = await eco.Transfer(message.author.id, user.id, amount)
  message.reply(`Transfering coins succesfully done!\nBalance from ${message.author.tag}: ${transfer.FromUser}\nBalance from ${user.tag}: ${transfer.ToUser}`);
}
if (command === 'coinflip') {
  var flip = args[0]
  var amount = args[1]
  if (!flip || !['heads', 'tails'].includes(flip)) return message.reply('Pls specify the flip, either heads or tails!')
  if (!amount) return message.reply('Specify the amount you want to gamble!')
  var output = await eco.FetchBalance(message.author.id)
  if (output.balance < amount) return message.reply('You have less coins than the amount you want to gamble!')
  var gamble = await eco.Coinflip(message.author.id, flip, amount).catch(console.error)
  message.reply(`You ${gamble.output}! New balance: ${gamble.newbalance}`)
}
if (command === 'dice') {
  var roll = args[0]
  var amount = args[1]
  if (!roll || ![1, 2, 3, 4, 5, 6].includes(parseInt(roll))) return message.reply('Specify the roll, it should be a number between 1-6')
  if (!amount) return message.reply('Specify the amount you want to gamble!')
  var output = eco.FetchBalance(message.author.id)
  if (output.balance < amount) return message.reply('You have less coins than the amount you want to gamble!')
  var gamble = await eco.Dice(message.author.id, roll, amount).catch(console.error)
  message.reply(`The dice rolled ${gamble.dice}. So you ${gamble.output}! New balance: ${gamble.newbalance}`)
}
if (command == 'delete') {
  var user = message.mentions.users.first()
  if (!user) return message.reply('Pls, Specify a user I have to delete in my database!')
  if (!message.guild.me.hasPermission(`ADMINISTRATION`)) return message.reply('You need to be admin to execute this command!')
  var output = await eco.Delete(user.id)
  if (output.deleted == true) return message.reply('Succesfully deleted the user out of the database!')
  message.reply('Error: Could not find the user in database.')
}
if (command === 'work') {
  var output = await eco.Work(message.author.id)
if (output.earned == 0) return message.reply('Aww, you did not do your job well so you earned nothing!')
  message.channel.send(`${message.author.username}
You worked as a \` ${output.job} \` and earned :money_with_wings: ${output.earned}
You now own :money_with_wings: ${output.balance}`)
 var output = await eco.Work(message.author.id, {
      failurerate: 10,
      money: Math.floor(Math.random() * 500),
      jobs: ['cashier', 'shopkeeper']
    })
    if (output.earned == 0) return message.reply('Aww, you did not do your job well so you earned nothing!')
  message.channel.send(`${message.author.username}
You worked as a \` ${output.job} \` and earned :money_with_wings: ${output.earned}
You now own :money_with_wings: ${output.balance}`)
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
