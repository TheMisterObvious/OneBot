module.exports.run = async (client, message, args) => {
    
    const Discord = require("discord.js");
    const db = require("quick.db");
    var mentionned = message.mentions.users.first();
    var user = message.author;
    
    if (!user.hasPermission("ADMINISTRATOR")) {
        message.channel.send("**Vous n'avez pas la permission de faire ça (permission manquante: ADMINISTRATEUR) !**")
    }
    
    if (args[0] === undefined) {
        message.channel.send("**Merci de saisir une valeur à ajouter !**");
    }
    
    if (isNaN(args[0])) {
        message.channel.send("**Merci de saisir une valeur numérique valide ("+ args[0] +" <- ceci n'est pas une valeur numérique valide) !**");
    }
    
    if (args[1] === undefined) {
        message.channel.send("**Merci de saisir un utilisateur à qui ajouter de l'argent !**");
    }
    
    if (!args[1] === mentionned) {
        message.channel.send("**Merci de saisir un utilisateur valide !");
    }
    
    let embed = new Discord.RichEmbed
    .setColor("#5599ff")
    .setAuthor("Addmoney")
    .setDescription("Vous venez d'ajouter "+ args[0] +"$ à "+ mentionned)
    message.channel.send(embed);
    db.add(`money_${message.guild.id}_${mentionned.id}`, args[0])

}
    
module.exports.config = {
        command: "addmoney"
}
