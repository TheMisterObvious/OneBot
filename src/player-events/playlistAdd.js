const { MessageEmbed } = require("discord.js");

exports.run = async(client, queue, playlist) => {

    const pl = playlist.songs[0]
    
    const lang = client.db.getData(`/user/${pl.requestedBy.id}/lang`)
    
    totalSeconds = 0
    for (const song of playlist.songs) {
        const timeSplit = song.duration.split(":")
        for (const split of timeSplit) totalSeconds += Number(split)*(60**((timeSplit.length-1)-timeSplit.indexOf(split)))
    }

    hours = Math.floor(totalSeconds/3600)
    totalSeconds -= hours*3600
    if (hours.toString().length === 1) hours = `0${hours}`
    minutes = Math.floor(totalSeconds/60)
    totalSeconds -= minutes*60
    if (minutes.toString().length === 1) minutes = `0${minutes}`
    seconds = totalSeconds
    if (seconds.toString().length === 1) seconds = `0${seconds}`

    playlistDuration = `${hours}:${minutes}:${seconds}`

    queue.data.channel.send({embeds:
        [
            new MessageEmbed()
            .setColor("#0072FF")
            .setThumbnail(pl.thumbnail)
            .setTitle(client.getLangText(lang, "playlistAdd.title"))
            .setDescription(playlist.name)
            .addFields(
                {name: client.getLangText(lang, "playlistAdd.desc.1"), value: playlist.author, inline: false},
                {name: client.getLangText(lang, "playlistAdd.desc.2"), value: playlistDuration, inline: true},
                {name: client.getLangText(lang, "playlistAdd.desc.3"), value: playlist.songs.length.toString(), inline: true},
                {name: client.getLangText(lang, "playlistAdd.desc.4"), value: playlist.url, inline: false}
            )
            .setFooter(`${client.getLangText(lang, "playlistAdd.footer")} ${pl.requestedBy.username}#${pl.requestedBy.discriminator}`, pl.requestedBy.avatarURL)
        ]
    })
}