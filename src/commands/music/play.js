exports.run = async (client, message, args) => {

    const guildId = message.guild.id
    const lang = client.db.getData(`/user/${message.author.id}/lang`)

    if (!message.member.voice.channel) return client.sendMessage(message.channel, client.getLangText(lang, "play.notInVoice"))
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return client.sendMessage(message.channel, client.getLangText(lang, "play.notInSameVoice"))
    if (!args[0]) return client.sendMessage(message.channel, client.getLangText(lang, "play.noArgs0"))

    const query = args.join(" ")
    const queue = client.player.getQueue(guildId) ? client.player.getQueue(guildId) : client.player.createQueue(guildId)
    queue.setData({
        channel: message.channel
    })
        
    if (!queue.isPlaying) await queue.join(message.member.voice.channel).catch(queue => {
        queue.stop()
        return client.sendMessage(message.channel, client.getLangText(lang, "play.noPermissionToJoin"), true)
    })

    await message.channel.sendTyping()

    if (query.includes("https://") && query.includes("playlist")) await queue.playlist(query, {
        requestedBy: {
            id: message.author.id,
            username: message.author.username,
            discriminator: message.author.discriminator,
            avatarURL: message.author.avatarURL()
        }
    }).catch(_ => {
        client.sendMessage(message.channel, `${client.getLangText(lang, "play.playlistNotFound.1")} "**${query}**" ${client.getLangText(lang, "play.playlistNotFound.2")}`)
        if (!queue) queue.stop()
    })
    else await queue.play(query, {
        requestedBy: {
            id: message.author.id,
            username: message.author.username,
            discriminator: message.author.discriminator,
            avatarURL: message.author.avatarURL()
        }
    }).catch(_ => {
        client.sendMessage(message.channel, `${client.getLangText(lang, "play.musicNotFound.1")} "**${query}**" ${client.getLangText(lang, "play.musicNotFound.2")}`)
        if (!queue) queue.stop()
    })
}

exports.config = {
    name: "play",
    group: "music",
    aliases: ["p"],
    options: [
        {
            name: "query",
            type: "string",
            required: true
        }
    ],
    subcommands: []
}

exports.permission = (client) => { return client.perm.EVERYONE }