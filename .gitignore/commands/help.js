module.exports.run = async (client, message, args) => {

    const fs = require("fs");
    const commandsList = fs.readFileSync("Storage/commands.txt", "utf8");

    message.channel.send(commandsList);

}

module.exports.config = {
    command: "help"
}