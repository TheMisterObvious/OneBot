// const db = require('quick.db')
const lang = require("../../data/lang.json")
const https = require("https")

exports.run = async(client, message, args) => {

    console.log(client.guilds.cache.get("844264685364445195").commands.cache)

}

exports.config = {
    name: "testing",
    description: "Nothing usefull for you.",
    template: "testing",
    permission: "BOT_ACCESS",
    aliases: ["test"],
    options: []
}