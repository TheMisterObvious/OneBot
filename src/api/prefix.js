exports.router = (client, express) => {
    const router = express.Router()

    router.get("/:guildId/:newPrefix", (req, res) => {
        const { guildId, prefix } = req.params

        console.log(guildId, prefix)
        //Abracadabra
    })

    return router
}

exports.path = "/prefix"