const Discord = require("discord.js");

exports.run = async(client, queue, song) => {

    const lang = client.db.getData(`/user/${song.requestedBy.id}/lang`)

    queue.data.channel.send({embeds:
        [
            new Discord.MessageEmbed()
            .setColor("#0072FF")
            .setThumbnail(song.thumbnail)
            .setTitle(client.getLangText(lang, "songAdd.title"))
            .setDescription(song.name)
            .setFooter(`${client.getLangText(lang, "songAdd.footer")} ${song.requestedBy.username}#${song.requestedBy.discriminator}`, song.requestedBy.avatarURL)
        ]
    });

}