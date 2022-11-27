const { MessageEmbed } = require("discord.js")

exports.run = async(client, oldMessage, newMessage) => {
    const baseUserDB = require("../../data/baseUserDB.json")

    try { client.db.getData("/server/" + newMessage.guild.id) } 
    catch { require("./guildCreate.js").run(client, newMessage.guild) }

    try { client.db.getData("/user/" + newMessage.author.id) }
    catch { 
        client.db.push(`/user/${newMessage.author.id}`, baseUserDB)
    }

    const lang = client.db.getData(`/user/${newMessage.author.id}/lang`)

    const serverSettings = client.db.getData("/server/" + newMessage.guild.id).settings

    if (newMessage.author.bot || !newMessage.content.startsWith(serverSettings?.prefix)) return;
    
    const messageArray = newMessage.content.split(" ")
    const cmd = messageArray[0]
    const args = messageArray.slice(1)
    const commandfile = client.commands.get(cmd.slice(serverSettings?.prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(serverSettings?.prefix.length)))
  
    if (!commandfile) return
    if (message.embeds.length > 0) await message.suppressEmbeds()
    if (serverSettings?.disabledCmds.includes(commandfile.config.name)) return newMessage.channel.send({embeds: [new MessageEmbed().setDescription(`${client.getLangText(lang, "messageCreate.disableCmd.1")} \`${commandfile.config.name}\` ${client.getLangText(lang, "messageCreate.disableCmd.2")}`).setColor("#ff0000")]})

    if (!client.perm.checkPerm(newMessage.member, commandfile.permission(client))) {
        if (commandfile.permission(client) === "DEV") newMessage.channel.send({embeds: [new MessageEmbed().setDescription(client.getLangText(lang, "messageCreate.devCmd")).setColor("#ff0000")]})
        else newMessage.channel.send({embeds: [new MessageEmbed().setDescription(client.getLangText(lang, "messageCreate.noPermission")).setColor("#ff0000")]})
        return
    }

    commandfile.run(client, newMessage, args)
}