const { MessageEmbed } = require("discord.js")
const { join } = require("lodash")

exports.run = async(client, message, args) => {

    const joinDate = new Date(message.guild.joinedTimestamp)
    const createDate = new Date("2020-01-18T19:43:21.049Z") //De mémoire puisque le client.user.createdAt ne fonctionne pas chez moi

    message.channel.send({embeds: [
        new MessageEmbed()
        .setTitle("Informations sur OneBot")
        .setThumbnail(client.user.avatarURL())
        .addFields(
            {name: "Créé par", value: "TheMisterObvious#3831", inline: false},
            {name: "Créé le", value: createDate.toDateString(), inline: true},
            {name: "A rejoint le", value: joinDate.toDateString(), inline: true},
            {name: "Serveur d'aide", value: "Aucun", inline: false},
            {name: "Vote", value: "https://top.gg/bot/891706489016819712", inline: false},
        )
    ]})

}

exports.config = {
    name: "botinfo",
    description: "Coming Soon",
    template: "botinfo",
    permission: "BOT_ACCESS",
    aliases: ["botprofile", "binfo", "bprofile"],
    options: []
}