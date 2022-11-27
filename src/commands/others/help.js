const { MessageButton, MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");

exports.run = (client, message, args) => {

    /* Big WIP
        • Do a interaction to select a option or a subcommand and get help on it
        • With the last one make help for subcommands and options accessible with the help command like ";help {command} {subcommand / option}"
        • Make a clear plan on how to register options and subcommands in the commands files
        • Don't forget to adapt the lang.json with this new system
    */

    const author = message.author
    const member = message.member

    const groups = {
        "dev": client.perm.DEV, 
        "music": client.perm.EVERYONE, 
        "others": client.perm.EVERYONE
    }

    const lang = client.db.getData(`/user/${author.id}/lang`)
    const prefix = client.db.getData(`/server/${message.guild.id}/settings/prefix`) || ";"

    const basicPath = "help.commands."

    const helpEmbed = new MessageEmbed()
    .setColor("#0072FF")

    const firstArg = args[0]?.toLowerCase()

    // If the user want the group list
    if (firstArg === "groups") {
        helpEmbed.setTitle(client.getLangText(lang, "help.titleGroup"))
        for (const [group, perm] of Object.entries(groups)) if (client.perm.checkPerm(member, perm)) helpEmbed.addField(`• ${group}`, client.getLangText(lang, `help.groups.${group}`))
        helpEmbed.setFooter(`${client.getLangText(lang, "help.helpEmbed.footer")} ${author.username}#${author.discriminator}`, author.avatarURL())
        
        return message.channel.send({ embeds: [helpEmbed] })
    }

    // If the user typed a group name
    if (groups[firstArg] && client.perm.checkPerm(member, groups[firstArg])) {
        helpEmbed.setTitle(`${client.getLangText(lang, "help.titleGroup")} - ${firstArg.charAt(0).toUpperCase() + firstArg.slice(1)}`)

        const commands = []
        for (const command of client.commands) if (command[1].config.group === firstArg) commands.push(command[0])

        helpEmbed.setDescription(`__${client.getLangText(lang, "help.helpEmbed.desc.6")}__ ${client.getLangText(lang, `help.helpEmbed.commandTypes.1`)}\n\n__${client.getLangText(lang, "help.helpEmbed.desc.1")}__ ${client.getLangText(lang, `help.groups.${firstArg}`)}\n\n__${client.getLangText(lang, "help.helpEmbed.desc.7")}__ \`${commands.join("\` | \`")}\``)
        helpEmbed.setFooter(`${client.getLangText(lang, "help.helpEmbed.footer")} ${author.username}#${author.discriminator}`, author.avatarURL())

        return message.channel.send({ embeds: [helpEmbed] })
    }

    // If the user typed a command (and some subcommands / options)
    /*
        To rework for options and subcommands modularity
    */
    const command = client.commands.get(firstArg) || client.commands.get(client.aliases.get(firstArg))
    if (args.length > 0 && command && client.perm.checkPerm(member, command.permission(client))) {
        const path = [command.config]
        const optargs = args.slice(1)
        for (const i in optargs) {
            const option = path[i].options.find(opt => opt.name === optargs[i])
            if (option) path.push(option)
            
            const subcmd = path[i].subcommands.find(sub => sub.name === optargs[i])
            if (subcmd) path.push(subcmd)
        }

        console.log(path)
        const commandConfig = command.config

        var options = `__${client.getLangText(lang, "help.helpEmbed.desc.2")}__`
        if (commandConfig.options.length > 0) for (const option of commandConfig.options) options += `\n• ${option.name}${option.required ? "" : " `optionnal`"}`

        helpEmbed.setTitle(commandConfig.name.charAt(0).toUpperCase() + commandConfig.name.slice(1));
        helpEmbed.setDescription(`__${client.getLangText(lang, "help.helpEmbed.desc.6")}__ ${client.getLangText(lang, `help.helpEmbed.commandTypes.2`)}\n\n__${client.getLangText(lang, "help.helpEmbed.desc.1")}__ ${client.getLangText(lang, `${basicPath}${commandConfig.name}.description`)}\n\n${options}\n\n__${client.getLangText(lang, "help.helpEmbed.desc.4")}__ ${commandConfig.aliases.join(" / ")}\n\n__${client.getLangText(lang, "help.helpEmbed.desc.5")}__ ${command.permission(client)}`)
        helpEmbed.setFooter(`${client.getLangText(lang, "help.helpEmbed.footer")} ${author.username}#${author.discriminator}`, author.avatarURL())

        const select = []
        for (const opt of commandConfig.options) {
            select.push({
                label: opt.name.charAt(0).toUpperCase() + opt.name.slice(1),
                description: client.getLangText(lang, `${basicPath}${commandConfig.name}.options.${opt.name}`),
                value: opt.name
            })
        }
        for (const subcmd of commandConfig.subcommands) {
            select.push({
                label: subcmd.name.charAt(0).toUpperCase() + subcmd.name.slice(1),
                description: client.getLangText(lang, `${basicPath}${commandConfig.name}.subcommands.${subcmd.name}.description`),
                value: subcmd.name
            })
        }

        const selectMenu = commandConfig.subcommands.concat(commandConfig.options).length > 0
        ? [new MessageActionRow()
            .addComponents(new MessageSelectMenu()
            .setCustomId("helpSelectMenu")
            .setPlaceholder(client.getLangText(lang, "help.selectmenu"))
            .addOptions(select)
        )]
        : []

        return message.channel.send({ embeds: [helpEmbed], components: selectMenu })
    }

    // If nothing has been asked or if the command doesn't exist / the user don't have access to it
    var helpTab = {}
    for (const [cmd, cmdProperty] of [...client.commands.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
        if (client.perm.checkPerm(member, cmdProperty.permission(client))) helpTab[cmd] = cmdProperty.config
    }
    
    const pageAsked = Math.floor(args[0]);

    const cmdPerPage = 6;
    const lastPage = Math.ceil(Object.keys(helpTab).length/cmdPerPage);

    if (!pageAsked || isNaN(pageAsked) || pageAsked <= 1 || pageAsked > lastPage) var page = 1;
    else var page = pageAsked;

    const cmdDisplay = Object.keys(helpTab).slice((page-1)*cmdPerPage, (page-1)*cmdPerPage+cmdPerPage);
    cmdDisplay.forEach(cmd => { helpEmbed.addField(`• ${cmd}`, client.getLangText(lang, basicPath + cmd + ".description")) })

    if (!Object.keys(helpTab)[0]) helpEmbed.setDescription(client.getLangText(lang, "help.noCmds"))
    helpEmbed.setTitle(client.getLangText(lang, "help.title"))
    helpEmbed.setFooter(`${client.getLangText(lang, "help.footer.1")} ${page}/${lastPage} | ${client.getLangText(lang, "help.footer.2")} ${author.username}${author.discriminator}`, author.avatarURL());

    const firstRow = new MessageActionRow()
    .addComponents([
        new MessageButton()
        .setEmoji("◀")
        .setStyle("SECONDARY")
        .setCustomId(`nodefer;help;${page-1}`)
        .setDisabled(page-1 > 0 ? false : true),

        new MessageButton()
        .setEmoji("▶")
        .setStyle("SECONDARY")
        .setCustomId(`nodefer;help;${page+1}`)
        .setDisabled(page+1 <= lastPage ? false : true)
    ])

    if (message.fromInteraction) message.edit({
        embeds: [helpEmbed],
        components: [firstRow]
    })
    else if (message.fromSlash) return {
        embeds: [helpEmbed],
        components: [firstRow]
    }
    else message.channel.send({
        embeds: [helpEmbed],
        components: [firstRow]
    })

}


exports.config = {
    name: "help",
    group: "others",
    aliases: ["aide"],
    options: [
        {
            name: "page-number",
            type: "integer",
            minValue: 1,
            required: false
        },
        {
            name: "command-name",
            type: "string",
            required: false
        },
        {
            name: "command-aliase",
            type: "string",
            required: false
        },
        {
            name: "command-group",
            type: "string",
            choices: [
                { name: "Development", value: "dev" },
                { name: "Others", value: "others" }
            ]
        }
    ],
    subcommands: [
        {
            name: "groups",
            options: [],
            subcommands: []
        }
    ]
}

exports.permission = (client) => { return client.perm.EVERYONE }