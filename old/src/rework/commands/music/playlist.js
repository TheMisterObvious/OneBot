exports.run = async(client, message, args) => {

    if (!message.member.voice.channel) return client.sendMessage("Vous n'êtes pas dans un salon vocal !");
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return client.sendMessage("Vous n'êtes pas dans le salon vocal que moi !");
    if (!args[0]) return client.sendMessage("Dites moi quelle musique vous voulez que je joue !");

    const guildQueue = client.player.getQueue(message.guild.id);

    const query = args.join(" ");
    const queue = client.player.createQueue(message.guild.id);
    queue.setData({
        channel: message.channel
    })

    client.sendMessage(message.channel, `🎶🔍 Je cherche un résultat pour \`${query}\``)
        
    await queue.join(message.member.voice.channel).catch(queue => {
        queue.destroy();
        return client.sendMessage({ content: "Je n'ai pas les permissions de rejoindre votre salon !", ephemeral: true });
    });

    await queue.playlist(query, {
        requestedBy: {
            id: message.author.id,
            username: message.author.username,
            discriminator: message.author.discriminator,
            avatarURL: message.author.avatarURL()
        }
    }).catch(_ => {
        client.sendMessage(message.channel, `❌ | La Musique "**${query}**" n'a pas pu être trouvé !`);
        if (!guildQueue) queue.stop()
    });
}

exports.config = {
    name: "playlist",
    description: "[Musique] - Vous permet de créé une véritable discothèque dans un salon vocal.",
    template: "playlist {nom ou lien d'une playlist}",
    permission: "@everyone",
    aliases: ["pl"],
    options: []
}

