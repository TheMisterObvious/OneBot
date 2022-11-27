const { MessageEmbed, MessageSelectMenu, MessageActionRow } = require("discord.js");

exports.run = async(client, message, args) => {

    const guildQueue = client.player.getQueue(message.guild.id);

    if (!guildQueue) return client.sendMessage(message.channel, "La file de musique du serveur est vide !");
    if (!message.member.voice.channel) return client.sendMessage(message.channel, "Vous n'êtes pas dans un salon vocal !");
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return client.sendMessage(message.channel, "Vous n'êtes pas dans le salon vocal que moi !");

    const guildQueueSongs = guildQueue.songs

    if (!isNaN(args[0])) {
        guildQueue.setPaused(true)
        for (i = 0; i <= Math.floor(args[0]) ; i++) await guildQueue.remove(i)
        setTimeout(function() {
            guildQueue.setPaused(false)
            guildQueue.skip()
        }, 2000)
        return message.delete()
    } 

    const selectMenu = new MessageSelectMenu()
    .setCustomId("jump command")
    .setPlaceholder("Aucune musique sélectionné")

    for (i = 0 ; i < 25 ; i++) {
        const song = guildQueueSongs[i]
        selectMenu.addOptions({
            label: `${i + 1} - ${song.name}`,
            description: song.author,
            value: `noddefer;jump;${i}`
        })
    }

    const row = new MessageActionRow()
    .addComponents(selectMenu)

    const embed = new MessageEmbed()
    .setColor("#0072FF")
    .setTitle("A quelle musique voulez vous aller ?")
    .setDescription("Saut possible pour les 25 premières musiques, pour sauter plus loin faites `:jump {nombre de sauts}`")

    message.channel.send({ embeds: [embed], components: [row] });

}

exports.config = {
    name: "jump",
    description: "[Musique] - Vous permet de sauter directement à une musique dans la file.",
    template: "jump {position de la musique}",
    permission: "SPEAK",
    aliases: ["saut"],
    options: []
}