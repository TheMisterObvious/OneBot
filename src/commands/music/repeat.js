exports.run = async (client, message) => {

    const lang = client.db.getData(`/user/${message.author.id}/lang`)

    const queue = client.player.getQueue(message.guild.id)

    if (!queue) return client.sendMessage(message.channel, client.getLangText(lang, "repeat.queueEmpty"))

    if (!message.member.voice.channel) return client.sendMessage(message.channel, client.getLangText(lang, "repeat.notInVoice"))
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return client.sendMessage(message.channel, client.getLangText(lang, "repeat.notInSameVoice"))

    if (queue.repeatMode === 2) queue.setRepeatMode(0)
    queue.setRepeatMode(Math.abs(queue.repeatMode-1))

    if (queue.repeatMode === 1) client.sendMessage(message.channel, `${client.getLangText(lang, "repeat.repeatOn.1")} **${queue.nowPlaying}** ${client.getLangText(lang, "repeat.repeatOn.2")} 🔂`)
    else client.sendMessage(message.channel, `${client.getLangText(lang, "repeat.repeatOn.1")} ▶️`)

}

exports.config = {
    name: "repeat",
    group: "music",
    aliases: ["rp"],
    options: [],
    subcommands: []
}

exports.permission = (client) => { return client.perm.EVERYONE }