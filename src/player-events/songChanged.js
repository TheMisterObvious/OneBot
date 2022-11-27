const { MessageEmbed } = require("discord.js");

exports.run = async(client, queue, song) => {

    const lang = client.db.getData(`/user/${song.requestedBy.id}/lang`)

    const channel = queue.guild.channels.cache.get(queue.data.channel.id)
    const message = channel.messages.cache.get(queue.data.message.id)

    message.delete()
    channel.send({embeds: 
        [
            new MessageEmbed()
            .setColor("#0072FF")
            .setThumbnail(song.thumbnail)
            .setTitle(client.getLangText(lang, "songChanged.title"))
            .setDescription(song.name)
            .addFields(
                {name: client.getLangText(lang, "songChanged.desc.1"), value: song.author, inline: true},
                {name: client.getLangText(lang, "songChanged.desc.2"), value: song.duration, inline: true},
                {name: client.getLangText(lang, "songChanged.desc.3"), value: song.url, inline: false}
            )
            .setFooter(`${client.getLangText(lang, "songChanged.footer")} ${song.requestedBy.username}#${song.requestedBy.discriminator}`, song.requestedBy.avatarURL)
        ]
    }).then((message) => {
        queue.setData({
            ...queue.data,
            message: message,
        })
    })
}