module.exports.run = async (client, message, args) => {
    
    const Discord = require("discord.js");
    const db = require("quick.db");
    var mentionned = message.mentions.users.first();
    
    if (!message.member.hasPermission("ADMINISTRATOR")) {
        return message.channel.send("**Vous n'avez pas la permission de faire ça (permission manquante: ADMINISTRATEUR) !**")
    }
    
    if (args[0] === undefined) {
        return message.channel.send("**Merci de saisir une valeur à ajouter !**");
    }
    
    if (isNaN(args[0])) {
        return message.channel.send("**Merci de saisir une valeur numérique valide ("+ args[0] +" <- ceci n'est pas une valeur numérique valide) !**");
    }
    
    if (args[1] === undefined) {
        return message.channel.send("**Merci de mentionner un utilisateur à qui ajouter de l'argent !**");
    }
    
    if (mentionned === undefined) {
        return message.channel.send("**Merci de mentionner un utilisateur valide !");
    }
    
    let embed = new Discord.RichEmbed()
    .setColor("#5599ff")
    .setAuthor("Addmoney")
    .setDescription("Vous venez d'ajouter "+ args[0] +"$ à "+ mentionned)
    message.channel.send(embed);
    db.add(`money_${message.guild.id}_${mentionned.id}`, args[0])

}
    
module.exports.config = {
        command: "addmoney"
}
