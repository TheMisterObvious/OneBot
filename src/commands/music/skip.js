exports.run = async (client, message, args) => {

    const lang = client.db.getData(`/user/${message.author.id}/lang`)

    const queue = client.player.getQueue(message.guild.id)

    if (!queue) return client.sendMessage(message.channel, client.getLangText(lang, "skip.queueEmpty"))

    if (!message.member.voice.channel) return client.sendMessage(message.channel, client.getLangText(lang, "skip.notInVoice"))
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return client.sendMessage(message.channel, client.getLangText(lang, "skip.notInSameVoice"))

    var toSkip = 1
    if (args[0] && !isNaN(args[0])) toSkip = Number(args[0])
    if (toSkip > queue.tracks.length) toSkip = queue.tracks.length
    if (toSkip < 1) toSkip = 1

    queue.skip(toSkip)

    client.sendMessage(message.channel, `${client.getLangText(lang, "skip.skip")} ⏭️`)

}

exports.config = {
    name: "skip",
    group: "music",
    aliases: [],
    options: [
        {
            name: "number-to-skip",
            type: "number",
            minValue: 1,
            required: false
        }
    ],
    subcommands: []
}

exports.permission = (client) => { return client.perm.EVERYONE }