module.exports.run = async (client, message, args) => {

    const Discord = require("discord.js");
    const db = require("quick.db");
    const ms = require("parse-ms");
    
    let timeout = 86400000;
    let amount = Math.floor(Math.random() * 1000);
    let user = message.author;
    let daily = await db.get(`daily_${message.guild.id}_${user}`);
  
    if (daily !== null && timeout - (Date.now() - daily) > 0) {
        let time = ms(timeout - (Date.now() - daily));
        message.channel.send(`**Vous avez déjà récupéré votre récompense du jour, vous pourrez de nouveau la récupéré dans ${time.hours}h ${time.minutes}m ${time.seconds}s !**`);
    } else {
        let embed = new Discord.RichEmbed()
        .setColor("#5599ff")
        .setAuthor("Daily")
        .setDescription("Vous avez reçu "+ amount+ " $")
        message.channel.send(embed);
        db.add(`money_${message.guild.id}_${user}`, amount);
        db.set(`daily_${message.guild.id}_${user}`, Date.now())
    }

}
    
module.exports.config = {
        command: "daily"
}
