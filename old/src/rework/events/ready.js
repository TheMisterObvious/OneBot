exports.run = async (client) => {
    
    client.user.setActivity(":help", {type: "LISTENING"})

    const enumOptType = {
        "subcommand": 1,
        "subcommandgroup": 2,
        "string": 3,
        "integer": 4,
        "boolean": 5,
        "user": 6,
        "channel": 7,
        "role": 8,
        "mentionable": 9,
        "number": 10,
        "attachment": 11
    }

    const guild = client.guilds.cache.get("844264685364445195")
    let commands

    if (guild) commands = guild.commands
    else commands = client.application?.commands

    for (const cmd of client.commands) {

        const command = cmd[1].config

        if (!command.permission !== "BOT_ACCESS") {
        
            var args = {
                name: command.name,
                description: command.description
            }

            let options = []
            if (command.options.length > 0) {
                for (const option of command.options) options.push(option)
                args["options"] = options
            }

            commands.create(args)

        }
    }

    console.log("Prêt !")

}