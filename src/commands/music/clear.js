exports.run = async (client, message, args) => {

    const lang = client.db.getData(`/user/${message.author.id}/lang`)

    const queue = client.player.getQueue(message.guild.id)

    if (!queue) return client.sendMessage(message.channel, client.getLangText(lang, "queue.queueEmpty"))

    if (!message.member.voice.channel) return client.sendMessage(message.channel, client.getLangText(lang, "queue.notInVoice"))
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return client.sendMessage(message.channel, client.getLangText(lang, "queue.notInSameVoice"))

    queue.stop()

    client.sendMessage(message.channel, `${client.getLangText(lang, "clear.queueClear")} ⏭️`)

}

exports.config = {
    name: "clear",
    group: "music",
    aliases: ["stop"],
    options: [],
    subcommands: []
}

exports.permission = (client) => { return client.perm.EVERYONE }