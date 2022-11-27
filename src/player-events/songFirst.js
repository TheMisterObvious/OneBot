const { MessageEmbed } = require("discord.js");

exports.run = async(client, queue, song) => {

    const lang = client.db.getData(`/user/${song.requestedBy.id}/lang`)

    queue.data.channel.send({embeds: 
        [
            new MessageEmbed()
            .setColor("#0072FF")
            .setThumbnail(song.thumbnail)
            .setTitle(client.getLangText(lang, "songFirst.title"))
            .setDescription(song.name)
            .addFields(
                {name: client.getLangText(lang, "songFirst.desc.1"), value: song.author, inline: true},
                {name: client.getLangText(lang, "songFirst.desc.2"), value: song.duration, inline: true},
                {name: client.getLangText(lang, "songFirst.desc.3"), value: song.url, inline: false}
            )
            .setFooter(`${client.getLangText(lang, "songFirst.footer")} ${song.requestedBy.username}#${song.requestedBy.discriminator}`, song.requestedBy.avatarURL)
        ]
    }).then((message) => {
        queue.setData({
            ...queue.data,
            message: message,
        })
    })
}