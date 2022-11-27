exports.run = async(client, message) => {

    const guildQueue = client.player.getQueue(message.guild.id);

    if (!guildQueue) return client.sendMessage(message.channel, "La file de musique du serveur est vide !");
    if (!message.member.voice.channel) return client.sendMessage(message.channel, "Vous n'êtes pas dans un salon vocal !");
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return client.sendMessage(message.channel, "Vous n'êtes pas dans le salon vocal que moi !");

    await guildQueue.skip();
    client.sendMessage(message.channel, "Saut jusqu'à la prochaine musique ! :track_next:")

}

exports.config = {
    name: "skip",
    description: "[Musique] Vous permet de sauter une musique que vous n'avez pas envie d'ecouter.",
    template: "skip",
    permission: "SPEAK",
    aliases: ["passe"],
    options: []
}