exports.run = async (client, message) => {

    const lang = client.db.getData(`/user/${message.author.id}/lang`)

    const queue = client.player.getQueue(message.guild.id)

    if (!queue) return client.sendMessage(message.channel, client.getLangText(lang, "pause.queueEmpty"))

    if (!message.member.voice.channel) return client.sendMessage(message.channel, client.getLangText(lang, "pause.notInVoice"))
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return client.sendMessage(message.channel, client.getLangText(lang, "pause.notInSameVoice"))

    queue.setPaused(!queue.paused)

    if (queue.paused) client.sendMessage(message.channel, `${client.getLangText(lang, "pause.queuePaused")} ⏸️`)
    else client.sendMessage(message.channel, `${client.getLangText(lang, "pause.queuePlaying")} ▶️`)

}

exports.config = {
    name: "pause",
    group: "music",
    aliases: ["resume"],
    options: [],
    subcommands: []
}

exports.permission = (client) => { return client.perm.EVERYONE }