module.exports.run = async (client, message, args) => {

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
        message.channel.send({embed:{description:`${user.id} a `+ bal +" $"}});
    } else {
        message.channel.send({embed:{description:"Vous avez "+ bal +" $"}});
    }

}
    
module.exports.config = {
        command: "money"
}
