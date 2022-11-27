exports.run = (client, message) => {

    if (!message.guild.me.voice.channel) return client.sendMessage(message.channel, "Je ne suis pas dans un salon vocal !");

    message.guild.me.voice.channel.leave();
    client.sendMessage(message.channel, "Deconnection éffectué ! :eject_button:")

}

exports.config = {
    name: "disconnect",
    description: "[Musique] - Permet de déconnecter le bot de force pour si un problème se passe.",
    template: "disconnect",
    permission: "ADMINISTRATOR",
    aliases: ["disconnection"],
    options: []
}