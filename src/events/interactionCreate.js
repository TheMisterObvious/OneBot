const Discord = require("discord.js");

exports.run = async(client, interaction) => {

    if (interaction.isButton()) {

        const toExecute = interaction.customId.split(";")

        if (toExecute[0] === "defer") interaction.deferReply()

        const args = toExecute[2].split(",")

        interaction.message.guild = interaction.guild
        interaction.message.fromInteraction = true

        await client.commands.get(toExecute[1]).run(client, interaction.message, args)

        if (toExecute[0] === "defer") interaction.deleteReply()
        else interaction.deferUpdate()

    }

    if (interaction.isCommand()) {

        const commandName = interaction.commandName
        let args = []
        for (const arg of interaction.options._hoistedOptions) args.push(arg.value)


        interaction.reply(client.commands.get(commandName).run(client, {
            member: interaction.member,
            author: interaction.user,
            channel: interaction.member.guild.channels.cache.get(interaction.channelId),
            guild: interaction.member.guild,
            fromSlash: true
        }, args))

        interaction.fetchReply()

    }

    if (interaction.isSelectMenu()) {

        const toExecute = interaction.customId.split(";")

        if (toExecute[0] === "defer") interaction.deferReply()

        const args = toExecute[2].split(",")

        interaction.message.guild = interaction.guild
        interaction.message.fromInteraction = true

        await client.commands.get(toExecute[1]).run(client, interaction.message, args.concat(interaction.values[0].split(",")))

        if (toExecute[0] === "defer") interaction.deleteReply()
        else interaction.deferUpdate()

    }

}