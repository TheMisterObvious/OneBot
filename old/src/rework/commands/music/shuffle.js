exports.run = (client, message) => {

    const guildQueue = client.player.getQueue(message.guild.id);

    if (!guildQueue) return client.sendMessage(message.channel, "La file de musique du serveur est vide !");

    if (!message.member.voice.channel) return client.sendMessage(message.channel, "Vous n'êtes pas dans un salon vocal !");
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return client.sendMessage(message.channel, "Vous n'êtes pas dans le salon vocal que moi !");

    guildQueue.shuffle();
    client.sendMessage(message.channel, "File mélangé ! :twisted_rightwards_arrows:")

}

exports.config = {
    name: "shuffle",
    description: "[Musique] - Mélange la file de lecture du serveur.",
    template: "shuffle",
    permission: "SPEAK",
    aliases: ["melange"],
    options: []
}