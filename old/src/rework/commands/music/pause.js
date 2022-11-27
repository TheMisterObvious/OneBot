exports.run = async(client, message) => {

    const guildQueue = client.player.getQueue(message.guild.id);

    if (!guildQueue) return client.sendMessage(message.channel, "La file de musique du serveur est vide !");

    if (!message.member.voice.channel) return client.sendMessage(message.channel, "Vous n'êtes pas dans un salon vocal !");
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return client.sendMessage(message.channel, "Vous n'êtes pas dans le salon vocal que moi !");

    guildQueue.setPaused(!guildQueue.paused)

    if (guildQueue.paused) client.sendMessage(message.channel, "File mis en pause ! ⏸️")
    else client.sendMessage(message.channel, "Lecture de la file reprise ! ▶️")

}

exports.config = {
    name: "pause",
    description: "[Musique] - Met en pause ou relance la lecture de la musique.",
    template: "pause",
    permission: "SPEAK",
    aliases: ["resume"],
    options: []
}