const { MessageEmbed } = require("discord.js")

exports.run = (client, message, args) => {

    const member = message.guild.members.cache.get(message.mentions.users.first()?.id) || message.guild.members.cache.get(args[0]) || message.member
    
    const pass = "🟢"
    const fail = "🔴"

    const passCheck = client.perm.testAllPerms(member)

    var desc = ""
    for (const [perm, value] of Object.entries(passCheck)) desc += `\n${value ? pass : fail} ${perm}`

    const embed = new MessageEmbed()
    .setTitle(`${member.user.tag} - ${member.id}`)
    .setColor("#5153c7")
    .setDescription(desc)
    .setFooter(`Passcheck of ${member.user.tag}`, member.user.displayAvatarURL())

    message.channel.send({ embeds: [embed] })

}

exports.config = {
    name: "passcheck",
    group: "dev",
    aliases: ["pc"],
    options: [],
    subcommands: []
}

exports.permission = (client) => { return client.perm.DEV }