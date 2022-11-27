exports.run = async(client, message) => {

    const guildQueue = client.player.getQueue(message.guild.id);

    if (!guildQueue) return client.sendMessage(message.channel, "La file de musique du serveur est vide !");

    if (!message.member.voice.channel) return client.sendMessage(message.channel, "Vous n'êtes pas dans un salon vocal !");
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return client.sendMessage(message.channel, "Vous n'êtes pas dans le salon vocal que moi !");

    if (guildQueue.repeatMode === 1) guildQueue.setRepeatMode(0)
    guildQueue.setRepeatMode(Math.abs(guildQueue.repeatMode-2))

    if (guildQueue.repeatMode === 2) client.sendMessage(message.channel, `La file se joue maintenant en boucle ! 🔁`)
    else client.sendMessage(message.channel, "La file n'est plus en boucle ! ▶️")

}

exports.config = {
    name: "loop",
    description: "[Musique] - Joue la file de musiques en boucle.",
    template: "loop",
    permission: "SPEAK",
    aliases: ["lp"],
    options: []
}