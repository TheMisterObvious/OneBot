const { MessageEmbed } = require("discord.js");

exports.run = async(client, message) => {

    const guildQueue = client.player.getQueue(message.guild.id);

    if (!guildQueue) return client.sendMessage(message.channel, "La file de musique du serveur est vide !");

    const channelPlaying = message.guild.me.voice.channel.name;
    const currentSong = guildQueue.nowPlaying;

    message.channel.send({embeds:
        [
            new MessageEmbed()
            .setColor("#0072FF")
            .setThumbnail(currentSong.thumbnail)
            .setTitle(`Musique joué en ce moment dans ${channelPlaying}`)
            .setDescription(currentSong.name)
            .addFields(
                {name: "Auteur", value: currentSong.author, inline: true},
                {name: "Durée", value: currentSong.duration, inline: true},
                {name: "Url", value: currentSong.url, inline: false}
            )
            .setFooter(`Demandé par ${message.author.username}#${message.author.discriminator}`, message.author.avatarURL())
        ]
    });
    

}

exports.config = {
    name: "nowplaying",
    description: "[Musique] - Vous donne toutes les infos de la musique en cours de lecture.",
    template: "nowplaying",
    permission: "@everyone",
    aliases: ["shazam", "nowp", "np"],
    options: []
}