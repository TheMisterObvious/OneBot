module.exports.run = async (client, message, args) => {

    const Discord = require("discord.js");
    const db = require("quick.db");
    const user = message.author
    const power = db.get(`power_${user.id}`);
    
    if (!power === 0) {
        return message.channel.send("Vous n'avez pas les permissions !");
    }
    
    if (isNaN(args[0])) {
        return message.channel.send("Cette id n'est pas valide !");
    }
    
    if (!args[0].lenght === 18) {
        return message.channel.send("Cette id n'est pas valide !");
    }
    
    var reason = message.content.substring(26);
    if (reason.lenght === 0) {
        return message.channel.send("Merci de saisir une raison !");
    }
    
    const embed = new Discord.RichEmbed()
    .setColor("0xff0000")
    .setAuthor("Gban")
    .setDescription("Vous avez été banni de tous les serveur où est présent OneBot pour "+ reason +" !")
    .setFooter("Pour faire une demande de ungban, contacter TheMisterObvious#7430 en message privé !")
    var banMember = message.guild.members.get(args[0]);
    banMember.send(embed);
    message.guild.member(args[0]).ban({reason: "Gban OneBot"});
    db.push(`power_${user.id}`, reason)
    var username = message.guild.members.get(args[0]).username;
    var usertag = message.guild.members.get(args[0]).tag;
    var owner = message.guild.members.get("335419820721963009");
    owner.send(username +"#"+ usertag +" (id: "+ args[0] +") à été gban pour "+ reason);

}
    
module.exports.config = {
        command: "gban"
}
