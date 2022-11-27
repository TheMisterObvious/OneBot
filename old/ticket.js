const Discord = require("discord.js");
const client = new Discord.Client()

const prefix = ";"

client.on("message", async (message) => {

    if (!message.content.startsWith(prefix)) return;

    const splitMessage = message.content.slice(prefix.length).split(" ")
    const command = splitMessage[0]
    const args = splitMessage.slice(1)

    if (command === "ticket") {

        if (!message.member.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send("Je n'ai pas la permissions de gérer les salons, désolé...")

        const userId = message.author.id
        const textChannelsNames = message.guild.channels.cache.map(channel => { if (channel.type === "text") return channel.name }).filter(Boolean)
        const staffRole = message.guild.roles.cache.get("844302504975138886");

        if (!args[0]) {

            console.log((textChannelsNames.map(channel => channel.split("-")[1] === userId)))
            if (textChannelsNames.map(channel => channel.split("-")[1] === userId).includes(true)) return message.channel.send("Vous avez déjà un ticket !")

            message.guild.channels.create(`ticket-${userId}`, {
                type: "text",
                permissionOverwrites: [
                    {
                        id: message.guild.roles.everyone,
                        deny: ["VIEW_CHANNEL"],
                    },
                    {
                        id: staffRole,
                        allow: ["VIEW_CHANNEL"]
                    },
                    {
                        id: userId,
                        allow: ["VIEW_CHANNEL"]
                    },
                    {
                        id: client.user.id,
                        allow: ["VIEW_CHANNEL"]
                    }
                ]
            }).then(channel => {
                channel.send(`Voici ton ticket <@${userId}>, explique ton problème le plus précisément possible pour que le staff puissent t'aider du mieux possible`)
            })

            message.channel.send("Votre ticket a bien été créé !")
            message.delete()

        }

        if (args[0] === "close") {

            if (!textChannelsNames.map(channel => channel.split("-")[1] === userId).includes(true)) return message.channel.send("Vous n'avez pas de ticket !")

            message.channel.send("Voulez vous vraiment fermer votre ticket ?")
            await message.channel.awaitMessages(response => response.author.id === userId, {
                max: 1,
                time: 10000,
                errors: ["time"]
            }).then(collect => {
                const collected = collect.first().content
                if (["oui", "yes", "yup", "ouais", "ouaip", "oué"].includes(collected.toLowerCase())) return message.guild.channels.cache.find(channel => channel.name === `ticket-${userId}`).delete()
                else return message.channel.send("Votre ticket n'a pas été supprimé !") 
            })

        }

    }

})

client.login(process.env.TOKEN)