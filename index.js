const { JsonDB } = require("node-json-db")
const { Config } = require("node-json-db/dist/lib/JsonDBConfig")
const { Collection, Client, Intents, MessageEmbed } = require("discord.js")
const client = new Client({ 
    intents: [
        Intents.FLAGS.GUILDS, 
        Intents.FLAGS.GUILD_MESSAGES, 
        Intents.FLAGS.GUILD_VOICE_STATES, 
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS, 
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS
    ] 
})

require('dotenv').config()

// Outdated database package but it's my favorite because i love the way it works and i know the developer of the package.
// const Data = require("kf-database");
// client.db = new Data({ name: "Database" });

client.db = new JsonDB(new Config("database", true, true, "/"))

try { client.db.getData("/server") } 
catch { client.db.push("/", { "server" : {}, "user": {}}) }

const fs = require("fs")
const { Player } = require("discord-music-player")

client.player = new Player(client, {
    leaveOnEnd: false,
    leaveOnStop: false,
    leaveOnEmpty: false,
    timeout: 10000,
    deafenOnJoin: true
})

client.getLangText = function(lang, id) {
    const path = id.split(".")

    var current = client.lang[lang].content
    var backup = client.lang["en"].content

    for (const part of path) {
        current = current[part]
        backup = backup[part]
    }

    if (current) return current
    return backup
}

client.sendMessage = function(channel, message, temp = false) {
    return channel.send({embeds: [new MessageEmbed().setDescription(message).setColor("#0072FF")], ephemeral: temp})
}

client.lang = require("./data/lang.json")
client.perm = require("./classes/perm.js")

client.commands = new Collection()
client.aliases = new Collection()
client.events = new Collection()

const express = require("express")
const rateLimit = require("express-rate-limit");
const http = require("http");

const app = express();

const limiter = rateLimit({
    windowMs: 3 * 1000,
    max: 5,
    message: "Too many requests come from this ip, try again after a moment."
});
app.use(limiter);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Atmosphere-tracking-id, X-Atmosphere-Framework, X-Cache-Date, Content-Type, X-Atmosphere-Transport, *")
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET") 
        return res.status(200).json({})
    }
    next()
})

const directories = {
    "api": "\x1b[35m",
    "commands": "\x1b[34m",
    "events": "\x1b[33m",
    "player-events": "\x1b[32m"
}

function loadDir(dir, color) {
    return new Promise((resolve, reject) => {
        fs.readdir(`./src/${dir}/`, async (err, files) => {
            if (err) return console.log(err)
            
            console.log(`${color}Loading ${dir}...\x1b[37m`)

            if (files.length === 0) return resolve()
            
            for (const file of files) {
                if (file.split(".").length === 1) await loadDir(dir + "/" + file, color)
                
                if (file.endsWith(".js")) {
                    const dirName = dir.split("/")[0]
                    console.log(`${color}• ${file}\x1b[37m ${dirName.substring(0, dirName.endsWith("s") ? dirName.length-1 : dirName.length)} successfully loaded !`)
                    
                    const properties = require(`./src/${dir}/${file}`);
                    const name = file.split(".")[0];
                    
                    if (dir.startsWith("commands")) {
                        client.commands.set(name, properties)
                        const aliases = properties.config.aliases
                        for (const aliase of aliases) client.aliases.set(aliase, name)
                    } else if (dir.startsWith("events")) client.on(name, (...args) => properties.run(client, ...args))
                    else if (dir.startsWith("player-events")) client.player.on(name, (...args) => properties.run(client, ...args))
                    else if (dir.startsWith("api")) {
                        const router = properties.router(client, express)
                        app.use(properties.path, router)
                    }
                }
                
                if (file === files[files.length-1]) return resolve()
            }
        })
    })
}

(async () => { 
    for (const [dir, color] of Object.entries(directories)) await loadDir(dir, color) 
    console.log("\x1b[31mPrêt !\x1b[37m")

    app.use((req, res, next) => {
        const error = new Error("Not Found");
        error.status = 404;
        next(error)
    })
    
    app.use((error, req, res, next) => {
        res.status(error.status || 500)
        res.json({
            code: error.status || 500,
            message: error.message
        })
    })
})()

const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);

client.login(process.env.TEST_TOKEN)