module.exports.run = async (client, message, args) => {

    const Discord = require("discord.js");
    const db = require("quick.db");
    const ms = require("parse-ms");
    
    let user = message.author;
    let robeduser = message.mentions.users.first();
    let targetuser = await db.get(`money_${message.guild.id}_${robeduser.id}`);
    let author = await db.get(`money_${message.guild.id}_${user.id}`);
  
    if (robeduser === undefined) {
        message.channel.send("**Merci de mentionner un utilisateur à qui voler de l'argent !**")
    }    
    if (author < 250) {
        message.channel.send("**Désolé mais vous avez besoin de plus de 250$ pour voler qulqu'un !**");
    }
    
    if (targetuser < 0) {
        message.channel.send("**Désolé mais la personne que vous éssayé de voler n'a pas un sou en poche !**");
    }
    
    let timeout = 1800000;
    let rob = await db.get(`robtime_${message.guild.id}_${user.id}`);
  
    if (rob !== null && timeout - (Date.now() - rob) > 0) {
        let time = ms(timeout - (Date.now() - rob));
        message.channel.send(`**Vous ne pouvez pas voler quelqu'un tout de suite, vous pourrez voler quelqu'un dans ${time.minutes}m ${time.seconds}s !**`);
    }
    
    let robamount = Math.floor(Math.random() * 200);
    
    let embed = new Discord.RichEmbed()
    .setColor("#5599ff")
    .setAuthor("Rob")
    .setDescription("Vous avez volé "+ robamount +"$ à "+ robeduser)
    message.channel.send(embed)
    db.add(`money_${message.guild.id}_${user.id}`, robamount)
    db.subtract(`money_${message.guild.id}_${robeduser.id}`, robamount);

}
   
module.exports.config = {
        command: "rob"
}
