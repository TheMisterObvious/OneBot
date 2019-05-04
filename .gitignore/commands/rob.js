module.exports.run = async (client, message, args) => {

    const Discord = require("discord.js");
    const db = require("quick.db");
    const ms = require("parse-ms");
    
    let user = message.author;
    let robuser = message.mentions.users.first();
    let targetuser = await db.get(`money_${message.guild.id}_${robuser.id}`);
    let author = await db.get(`money_${message.guild.id}_${user.id}`);
  
    if (auhtor < 250) {
        message.channel.send("**Désolé mais vous avez besoin de plus de 250$ pour voler qulqu'un !**")
    }

}
    
module.exports.config = {
        command: "rob"
}
