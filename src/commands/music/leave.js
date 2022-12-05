exports.run = async (client, message, args) => {

    const lang = client.db.getData(`/user/${message.author.id}/lang`)

    const queue = client.player.getQueue(message.guild.id)

    if (!message.member.voice.channel) return client.sendMessage(message.channel, client.getLangText(lang, "leave.notInVoice"))
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return client.sendMessage(message.channel, client.getLangText(lang, "leave.notInSameVoice"))

    queue.stop()
    queue.leave()

    client.sendMessage(message.channel, `${client.getLangText(lang, "leave.leave")} ⏭️`)

}

exports.config = {
    name: "leave",
    group: "music",
    aliases: ["disconnect"],
    options: [],
    subcommands: []
}

exports.permission = (client) => { return client.perm.EVERYONE }