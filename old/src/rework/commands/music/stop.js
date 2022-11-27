exports.run = async(client, message) => {

    const guildQueue = client.player.getQueue(message.guild.id);

    if (!guildQueue) return client.sendMessage(message.channel, "La file de musique du serveur est vide !");

    if (!message.member.voice.channel) return client.sendMessage(message.channel, "Vous n'êtes pas dans un salon vocal !");
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return client.sendMessage(message.channel, "Vous n'êtes pas dans le salon vocal que moi !");

    await guildQueue.stop()
    client.sendMessage(message.channel, "File effacé ! ⏹️")

}

exports.config = {
    name: "clear",
    description: "[Musique] - Vous permet de supprimer la file du serveur et de déconnecté le bot du salon actuel.",
    template: "clear",
    permission: "SPEAK",
    aliases: ["clear"],
    options: []
}