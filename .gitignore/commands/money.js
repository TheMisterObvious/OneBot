module.exports.run = async (client, message, args) => {
    
    const Discord = require("discord.js");
    const db = require("quick.db");
    var mentionned = message.mentions.users.first();

    if (mentionned) {
        var user = message.mentions.users.first();
    } else {
        var user = message.author;
    }
    var bal = db.get(`money_${message.guild.id}_${user.id}`);
    if (bal === null) bal = 0;
    if (mentionned) {
        let embed = new Discord.RichEmbed
        .setAuthor("Money")
        .setDescription(mentionned +" a "+ bal +" $")
        .setColor("#5599ff")
        message.channel.send(embed);
    } else {
        let embed = new Discord.RichEmbed
        .setAuthor("Money")
        .setDescription("Vous avez "+ bal +" $")
        .setColor("#5599ff")
        message.channel.send(embed);
    }

}
    
module.exports.config = {
        command: "money"
}
