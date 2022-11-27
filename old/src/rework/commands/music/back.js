// const db = require("quick.db")

const lang = require("../../../data/lang.json")

exports.run = async(client, message) => {

    // const userLang = db.get(`${message.author.id}.lang`) || db.get(`${message.guild.id}.settings.lang`) || "en"

    const guildQueue = client.player.getQueue(message.guild.id);

    if (!guildQueue) return client.sendMessage(message.channel, "File vide !" /*lang[userLang].content.back.queueEmpty*/);

    if (!message.member.voice.channel) return client.sendMessage(message.channel, "Not in voice !"/*lang[userLang].content.back.notInVoice*/);
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return client.sendMessage(message.channel, lang[userLang].content.back.notInSameVoice);

    await guildQueue.back();
    client.sendMessage(message.channel, "Musique mise en arrière !" /*lang[userLang].content.back.trackBack*/ + " :track_previous:");

}

exports.config = {
    name: "back",
    description: "[Musique] - Vous permet de revenir en arrière dans la file du serveur.",
    template: "back",
    permission: "SPEAK",
    aliases: ["return"],
    options: []
}