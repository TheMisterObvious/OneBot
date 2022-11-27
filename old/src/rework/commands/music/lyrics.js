const { MessageEmbed } = require("discord.js");
const lyricsFinder = require("lyrics-finder");

exports.run = async(client, message) => {

    const guildQueue = client.player.getQueue(message.guild.id);

    if (!guildQueue) return client.sendMessage(message.channel, "La file de musique du serveur est vide !");

    const song = guildQueue.nowPlaying;

    var toSearch = `${song.name} + ${song.author}`
    if (toSearch.includes("(") && toSearch.includes(")")) toSearch = toSearch.replace(`(${toSearch.split("(")[1].split(")")[0]})`, "")
    if (toSearch.includes("[") && toSearch.includes("]")) toSearch = toSearch.replace(`[${toSearch.split("[")[1].split("]")[0]}]`, "")
    toSearch = toSearch.toLowerCase().replace(/&|\||\/|official music video|official video|official audio|valorant champions 2021/g, "").replace(/  |   /g, " ")
    
    const lyrics = await lyricsFinder("", toSearch) || "Not Found"

    const lyricsSplit = lyrics.split("\n\n");

    var desc = "";

    const lyricsEmbed = new MessageEmbed()
    .setTitle(song.name)
    .setAuthor("Paroles")
    .setColor("#0072FF")

    if (lyrics.length >= 2000) {
        for (const lyricsPart of lyricsSplit) {
            if (desc.length <= 1700) desc += `${lyricsPart}\n\n`;
            else {
                lyricsEmbed.setDescription(desc);
                message.channel.send({embeds: [lyricsEmbed]});
                lyricsEmbed.setTitle("").setAuthor("");
                    
                desc = `${lyricsPart}\n\n`;
            }
        }
    } else desc = lyrics;

    lyricsEmbed.setDescription(desc);
    message.channel.send({embeds: [lyricsEmbed]});
}

exports.config = {
    name: "lyrics",
    description: "[Musique] - Ayez les paroles de la musique en cours de lecture pour un fantastique karaoké.",
    template: "lyrics",
    permission: "@everyone",
    aliases: ["paroles"],
    options: []
}