module.exports.run = async (client, message, args) => {
    
    const Discord = require("discord.js");
    const db = require("quick.db");
    var mentionned = message.mentions.users.first();
    var user = message.author;
    
    if (!user.hasPermission("ADMINISTRATOR")) {
        message.channel.send("**Vous n'avez pas la permission de faire ça (permission manquante: ADMINISTRATEUR) !**").then(msg => {
            setTimeout(() => {
                msg.delete()
            }, 2500);
        })
    }
    
    if (args[0] === undefined) {
        message.channel.send("**Merci de saisir une valeur à ajouter !**");
    }
    

}
    
module.exports.config = {
        command: "addmoney"
}
