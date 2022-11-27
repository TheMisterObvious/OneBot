exports.run = (client, message) => {

    client.sendMessage(message.channel, `:ping_pong: Pong ! **${Math.abs(Date.now() - message.createdTimestamp)}ms**`);

}

exports.config = {
    name: "ping",
    group: "others",
    aliases: ["pong", "pingpong"],
    options: [],
    subcommands: []
}

exports.permission = (client) => { return client.perm.EVERYONE }