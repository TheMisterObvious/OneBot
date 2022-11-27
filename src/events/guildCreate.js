exports.run = async(client, guild) => {

    const guildSettings = {
        name: guild.name,
        settings: {
            lang: "fr",
            prefix: ":",
            disabledCmds: []
        }
    }

    client.db.push("/server/" + guild.id, guildSettings)
    client.db.save()
}