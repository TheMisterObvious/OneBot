const { Permissions } = require("discord.js")

exports.run = (client, message, args) => {

    for (const guild of client.guilds.cache.map(m => m)) {
        const channel = guild.channels.cache.filter(m => m.type === "GUILD_TEXT").first()
        if (guild.members.cache.get("891706489016819712").permissions.has(Permissions.FLAGS.CREATE_INSTANT_INVITE)) channel.createInvite().then(invite => message.channel.send(invite.code))
    }

}

exports.config = {
    name: "servers",
    description: "Nothing usefull for you.",
    template: "testing",
    permission: "BOT_ACCESS",
    aliases: ["server"],
    options: []
}