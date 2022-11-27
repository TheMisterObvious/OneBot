const { table } = require("console");
const { MessageEmbed } = require("discord.js");

const langs = require("../../data/lang.json")

exports.run = async(client, message, args) => {

    const serverData = client.db.get(message.guild.id)
    const serverSettings = serverData.settings

    if (!serverData) {
        const setGuildSettings = require("../events/guildCreate.js")
        setGuildSettings.run(client, message.guild)
        return message.channel.send({embeds: [new MessageEmbed().setDescription("Pour une raison inconnue, les paramètres de votre serveur n'ont pas été initialisés, attendez quelques secondes que je règle ça et retentez après...").setColor("#ff0000")]})
    }

    if (!args[0]) {

        if (!serverSettings.disabledCmds[0]) var dCmds = "Aucune"
        else var dCmds = serverSettings.disabledCmds.join(", ")

        const settingsEmbed = new MessageEmbed()
        .setColor("#0072FF")
        .setTitle(`Paramètres du serveur ${message.guild.name}`)
        .setThumbnail(message.guild.iconURL())
        .setDescription(
            "Pour modifier un des paramètres, faites la commande:" +
            "\n`;settings {id du paramètre} {nouvelle valeur du paramètre}`" +
            "\n*(l'id du paramètre est entre parenthèses à coté du nom)*\n"
        )
        .addFields(
            {name: "**Langue par défault (lang):**", value: `${client.config.Lang2Emoji[serverSettings.lang]} - ${serverSettings.lang}`, inline: true},
            {name: "**Préfix (prefix):**", value: serverSettings.prefix, inline: true},
            {name: "**Commandes Désactivés (disabledCmds):**", value: dCmds, inline: false}
        )
        .setFooter(`Demandé par ${message.author.username}#${message.author.discriminator}`, message.author.avatarURL())

        return message.channel.send({embeds:[settingsEmbed]});

    }

    if (!Object.keys(serverSettings).includes(args[0])) return message.channel.send({embeds: [new MessageEmbed().setDescription(`Le paramètre \`${args[0]}\` n'extiste pas.`).setColor("#ff0000")]})

    if (!args[1]) return message.channel.send({embeds: [new MessageEmbed().setDescription("Désolé mais il me faut une nouvelle valeur à assigner à ce paramètre").setColor("#ff0000")]})

    switch(args[0]) {
        case "lang":

            if (!Object.keys(langs).includes(args[1].toLowerCase())) return message.channel.send({embeds: [new MessageEmbed().setDescription("Désolé, cette langue n'est pas disponible.").setColor("#ff0000")]})
            if (langs[args[1].toLowerCase()].percentage !== "100%") return message.channel.send({embeds: [new MessageEmbed().setDescription(`Désolé, cette langue n'est pas completement traduite (traduction faite à ${langs[args[1].toLowerCase()].percentage}).`).setColor("#ff0000")]})
            client.db.set(`${message.guild.id}.settings.lang`, args[1].toLowerCase())
            message.channel.send({embeds: [new MessageEmbed().setDescription(`La langue du serveur a bien été changé en ${client.config.Lang2Emoji[args[1].toLowerCase()]} - ${args[1].toLowerCase()}`).setColor("#00ff00")]})
            break;

        case "prefix":

            client.db.set(`${message.guild.is}.settings.prefix`, args[1])
            message.channel.send({embeds: [new MessageEmbed().setDescription(`Le préfix du serveur a bien été changé en ${args[1]}`).setColor("#00ff00")]})
            break;

        case "disabledCmds":

            if (!client.db.get(`${message.guild.id}.settings.disabledCmds`).includes(args[1].toLowerCase())) {
                if (args[1].toLowerCase() === "settings") return message.channel.send({embeds: [new MessageEmbed().setDescription("Vous ne pouvez pas déscativé cette commande !").setColor("#ff0000")]})
                client.db.push(`${message.guild.id}.settings.disabledCmds`, args[1].toLowerCase())
                message.channel.send({embeds: [new MessageEmbed().setDescription(`${args[1]}`).setColor("#00ff00")]})
            } else if (client.db.get(`${message.guild.id}.settings.disabledCmds`).length === 1) {
                client.db.set(`${message.guild.id}.settings.disabledCmds`, [])
                message.channel.send({embeds: [new MessageEmbed().setDescription(`${args[1]}`).setColor("#00ff00")]})
            }else {
                var tab = []
                for (const cmd of client.db.get(`${message.guild.id}.settings.disabledCmds`)) {
                    if (cmd !== args[1].toLowerCase()) tab.push(cmd)
                }
                client.db.set(`${message.guild.id}.settings.disabledCmds`, tab)
                message.channel.send({embeds: [new MessageEmbed().setDescription(`${args[1]}`).setColor("#00ff00")]})
            }
            break;
    }

}

exports.config = {
    name: "settings",
    description: "Paramètrez OneBot pour qu'il s'adapte à votre serveur.",
    template: "settings {id du paramètre} {nouvelle valeur du paramètre}",
    permission: "ADMINISTRATOR",
    aliases: ["setting", "set"],
    options: []
}