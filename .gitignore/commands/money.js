module.exports.run = async (client, message, args) => {

    const db = require("quick.db");

    if (args[1] === undefined) {
        var user = message.author
    } else if (args[1] === message.mentions.users.first()) {
        var user = message.mentions.users.first();
    }
    var bal = db.get(`money_${message.guild.id}_${user}`);
    if (bal === null) bal =0;
    if (user === message.author) {
        message.channel.send({embed:{description:"Vous avez "+ bal +" $"}});
    } else if (user === message.mentions.users.first()) {
        message.channel.send({embed:{description:`${user} a `+ bal +" $"}});
    }

}
    
module.exports.config = {
        command: "money"
}
