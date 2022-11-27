const api = require('anime-vostfr')

exports.run = async (client, message) => {

    // const baseUrl = "https://neko-sama.fr"

    // const data = await api.loadAnime()
    // const dataVF = await api.loadAnimeVF()

    // const search = api.searchAnime(data, "one piece")
    // const searchVF = api.searchAnime(dataVF, "one piece")

    console.log(client.perm.testAllPerms(message.member))

}

exports.config = {
    name: "test",
    group: "dev",
    aliases: [],
    options: [],
    subcommands: []
}

exports.permission = (client) => { return client.perm.DEV }