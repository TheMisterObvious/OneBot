module.exports.run = async (client, message, args) => {

    const db = require("quick.db");

    var money = db.startsWith(`money_${message.guild.id}`, {sort: '.data'});
    var content = "";
    for (var i = 0; i < money.lenght; i++) {
      var user = client.users.get(money[i].ID.split('_')[2]).username
      content += `${i+1}. ${user} ~ ${money[i].data}$\n`;
    }
    const embed = new Discord.RichEmbed
    .setAuthor(`$(message.guild.name} - Leaderboard`, message.guild.iconURL)
    .setDescription(content)
    .setColor(0x51267) 
    message.channel.send(embed);

}
    
module.exports.config = {
        command: "leaderboard"
}