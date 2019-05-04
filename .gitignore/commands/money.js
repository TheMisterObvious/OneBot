module.exports.run = async (client, message, args) => {

    const db = require("quick.db");

    var user = message.mentions.users.first() || message.author
    var bal = db.get(`money_${message.guild.id}_${user}`);
    if (bal === null) bal =0;
    message.channel.send({embed:{description:"Vous avez "+ bal + " $"}});

}
    
module.exports.config = {
        command: "money"
}