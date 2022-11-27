const { MessageButton, MessageEmbed, MessageActionRow } = require("discord.js");

exports.run = (client, message, args) => {

    const guildId = message.guild.id
    const lang = client.db.getData(`/user/${message.author.id}/lang`)

    const queue = client.player.getQueue(message.guild.id)

    if (!queue || (queue.songs.length === 0 && !queue.isPlaying)) return client.sendMessage(message.channel, client.getLangText(lang, "queue.emptyQueue"))

    const queueSongs = queue.songs

    const queueEmbed = new MessageEmbed()
    .setColor("#0072FF")
    .setTitle(client.getLangText(lang, "queue.embed.title"))

    const pageAsked = Math.floor(args[0])

    const musicPerPage = 8
    const lastPage = Math.ceil(queueSongs.length/musicPerPage)

    if (!pageAsked || isNaN(pageAsked) || pageAsked <= 1 || pageAsked > lastPage) var page = 1
    else var page = pageAsked

    var queuedesc = ""
    const pageQueue = queueSongs.slice((page-1)*musicPerPage, page*musicPerPage)
    for (const music of pageQueue) {
        const index = Object.keys(queueSongs).find(key => queueSongs[key] === music)

        if (pageQueue[index] === queueSongs[0]) var musicIndex = queue.paused ? "⏸️" : "▶️"
        else musicIndex = `[ ${index} ]`

        queuedesc += `\n${musicIndex} • [${music.name}](${music.url}) | \`${music.duration}\` - <@${music.requestedBy.id}>\n`
    }

    var totalTime = queueSongs.totalTime
    const dUnits = [1, 60, 3600, 86400]
    for (const song of queueSongs) {
        const durations = song.duration.split(":")
        const len = durations.length

        if (len > dUnits.length) return totalTime = client.getLangText(lang, "queue.tooLong")

        for (const [i, duration] of Object.entries(durations)) totalTime += duration*dUnits[len-i-1]
    }

    const days = Math.floor(totalTime/86400)
    const hours = Math.floor(totalTime/3600) - days*24
    const minutes = Math.floor(totalTime/60) - hours*60 - days*1440
    const seconds = totalTime - minutes*60 - hours*3600 - days*86400

    const formatedTime = `${days ? `${days}:` : ""}${hours ? `${hours}:` : ""}:${minutes}:${seconds}`

    queueEmbed.setDescription(queuedesc)
    queueEmbed.setFooter(`${client.getLangText(lang, "queue.embed.footer.1")} ${page}/${lastPage} | ${client.getLangText(lang, "queue.embed.footer.2")}: ${formatedTime}`, message.author.avatarURL())

    const firstRow = new MessageActionRow()
    .addComponents([

        new MessageButton()
        .setEmoji("◀")
        .setStyle("SECONDARY")
        .setCustomId(`nodefer;queue;${page-1}`)
        .setDisabled(page-1 > 0 ? false : true),

        new MessageButton()
        .setEmoji("▶")
        .setStyle("SECONDARY")
        .setCustomId(`nodefer;queue;${page+1}`)
        .setDisabled(page+1 <= lastPage ? false : true),

        new MessageButton()
        .setEmoji("⏯")
        .setStyle("SECONDARY")
        .setCustomId("nodefer;pause;")
        .setDisabled(false),

        new MessageButton()
        .setEmoji("⏹")
        .setStyle("SECONDARY")
        .setCustomId("nodefer;stop;")
        .setDisabled(false),

        new MessageButton()
        .setEmoji("📜")
        .setStyle("SECONDARY")
        .setCustomId("defer;lyrics;")
        .setDisabled(false)

    ])

    const secondRow = new MessageActionRow()
    .addComponents([

        new MessageButton()
        .setEmoji("⏮")
        .setStyle("SECONDARY")
        .setCustomId("nodefer;back;")
        .setDisabled(false),

        new MessageButton()
        .setEmoji("⏭")
        .setStyle("SECONDARY")
        .setCustomId("nodefer;skip;")
        .setDisabled(false),

        new MessageButton()
        .setEmoji("🔁")
        .setStyle("SECONDARY")
        .setCustomId("nodefer;loop;")
        .setDisabled(false),

        new MessageButton()
        .setEmoji("🔂")
        .setStyle("SECONDARY")
        .setCustomId("nodefer;repeat;")
        .setDisabled(false),
        
        new MessageButton()
        .setEmoji("🔀")
        .setStyle("SECONDARY")
        .setCustomId("nodefer;shuffle;")
        .setDisabled(false),

    ])

    if (message.fromInteraction) message.edit({
        embeds: [queueEmbed],
        components: [
            firstRow,
            secondRow
        ]
    })
    else message.channel.send({
        embeds: [queueEmbed],
        components: [
            firstRow,
            secondRow
        ]
    });
}

exports.config = {
    name: "queue",
    group: "music",
    aliases: ["songs", "q"],
    options: [
        {
            name: "page-number",
            type: "integer",
            minValue: 1,
            required: false
        }
    ],
    subcommands: []
}

exports.permission = (client) => { return client.perm.EVERYONE }