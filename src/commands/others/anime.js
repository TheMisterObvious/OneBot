const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js")
const api = require('anime-vostfr')

exports.run = async (client, message, args) => {
    
        const lang = client.db.getData(`/user/${message.author.id}/lang`)

        const ids = ["0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"]
    
        const baseUrl = "https://neko-sama.fr"

        const data = await api.loadAnime()
        const dataVF = await api.loadAnimeVF()

        const user = client.db.getData(`/user/${message.author.id}`)
        if (!user.animes) client.db.push(`/user/${message.author.id}`, { "animes": {} })
        const userAnimes = client.db.getData(`/user/${message.author.id}/animes`)

        const animeEmbed = new MessageEmbed()
        .setColor("#0072FF")

        switch(args[0]) {
            case "search":
                const search = args.slice(1)

                if (search.length === 0 || search[0] === "-popular") return api.popularAnime(data)
                if (search[0] === "-best") return api.bestScoreAnime(data)
                if (search[0] === "-movie") return api.movieAnime(data)
                
                const results = api.searchAnime(data, search.join(" ")).slice(0, 10)
                for (const result of results) animeEmbed.addField(`${result.title}`, `${result.status === "2" ? "Terminé" : "En cours"} **|** ${result.start_date_year} **|** ${result.nb_eps}`)
                
                animeEmbed.setTitle("Résultats de la recherche")
                animeEmbed.setThumbnail(results[0].url_image)

                const selectMenu = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                    .setCustomId(`defer;anime;get,${search.join(" ").replaceAll(",", "")}`)
                    .setPlaceholder("Sélectionnez un anime pour plus d'informations")
                    .addOptions(
                        results.map((result, id) => {
                            return {
                                label: result.title,
                                value: `${id},${result.url}`,
                                description: `${result.status === "2" ? "Terminé" : "En cours"} | ${result.start_date_year} | ${result.nb_eps}`,
                                emoji: ids[id]
                            }
                        })
                    )
                )

                message.channel.send({ embeds: [animeEmbed], components: [selectMenu] })
                break;

            case "get": 
                if (!message.fromInteraction) return

                const mainInfo = api.searchAnime(data, args[1])[args[2]]
                const addInfos = await api.getMoreInformation(args[3]).catch(() => { message.channel.send({embeds: [new MessageEmbed().setDescription("Error !").setColor("#ff0000")]})})

                const infos = Object.assign({}, mainInfo, addInfos)

                const utf8 = [["<br/>", ""],["&quot;","\""],["&#039;","'"],["&amp;","&"],["&lt;","<"],["&gt;",">"],["&eacute;","é"],["&egrave;","è"],["&ecirc;","ê"],["&ccedil;","ç"],["&agrave;","à"],["&acirc;","â"],["&icirc;","î"],["&ocirc;","ô"],["&ucirc;","û"],["&ugrave;","ù"],["&iuml;","ï"],["&ouml;","ö"],["&uuml;","ü"],["&yuml;","ÿ"],["&aelig;","æ"],["&AElig;","Æ"],["&oslash;","ø"],["&Oslash;","Ø"],["&aring;","å"],["&Aring;","Å"],["&aelig;","æ"],["&AElig;","Æ"],["&oslash;","ø"],["&Oslash;","Ø"],["&aring;","å"],["&Aring;","Å"],["&nbsp;"," "],["&iexcl;","¡"],["&cent;","¢"],["&pound;","£"],["&curren;","¤"],["&yen;","¥"],["&brvbar;","¦"],["&sect;","§"],["&uml;","¨"],["&copy;","©"],["&ordf;","ª"],["&laquo;","«"],["&not;","¬"],["&shy;","­"],["&reg;","®"],["&macr;","¯"],["&deg;","°"],["&plusmn;","±"],["&sup2;","²"],["&sup3;","³"],["&acute;","´"],["&micro;","µ"],["&para;","¶"],["&middot;","·"],["&cedil;","¸"],["&sup1;","¹"],["&ordm;","º"],["&raquo;","»"],["&frac14;","¼"],["&frac12;","½"],["&frac34;","¾"],["&iquest;","¿"],["&times;","×"],["&divide;","÷"],["&fnof;","ƒ"],["&circ;","ˆ"],["&tilde;","˜"],["&Alpha;","Α"],["&Beta;","Β"],["&Gamma;","Γ"],["&Delta;","Δ"],["&Epsilon;","Ε"],["&Zeta;","Ζ"],["&Eta;","Η"],["&Theta;","Θ"],["&Iota;","Ι"],["&Kappa;","Κ"],["&Lambda;","Λ"],["&Mu;","Μ"],["&Nu;","Ν"],["&Xi;","Ξ"],["&Omicron;","Ο"],["&Pi;","Π"],["&Rho;","Ρ"],["&Sigma;","Σ"],["&Tau;","Τ"],["&Upsilon;","Υ"],["&Phi;","Φ"],["&Chi;","Χ"],["&Psi;","Ψ"],["&Omega;","Ω"],["&alpha;","α"],["&beta;","β"],["&gamma;","γ"],["&delta;","δ"],["&epsilon;","ε"],["&zeta;","ζ"],["&eta;","η"],["&theta;","θ"],["&iota;","ι"],["&kappa;","κ"],["&lambda;","λ"],["&mu;","μ"],["&nu;","ν"],["&xi;","ξ"],["&omicron;","ο"],["&pi;","π"],["&rho;","ρ"],["&sigmaf;","ς"],["&sigma;","σ"],["&tau;","τ"],["&upsilon;","υ"],["&phi;","φ"],["&chi;","χ"],["&psi;","ψ"],["&omega;","ω"]]
                for (const utf of utf8) infos.synop = infos.synop.replaceAll(utf[0], utf[1])

                animeEmbed.setTitle(infos.title)
                animeEmbed.setThumbnail(infos.url_image)
                animeEmbed.setDescription(`${infos.synop}⁣`)
                animeEmbed.addField("Statut", infos.status === "2" ? "✅ Terminé" : "🔁 En cours", true)
                animeEmbed.addField("Date de début", infos.start_date_year, true)
                animeEmbed.addField("Nombre d'épisodes", infos.nb_eps, true)

                var eps = ""
                for (const [id, ep] of Object.entries(infos.eps.slice(0, 10))) {
                    const url = await api.getEmbed(ep.url)
                    eps += `[Ep${Number(id)+1}](${url}) | `
                }
                if (infos.eps.length > 10) eps += `[More...](${baseUrl + infos.url})`
                else eps = eps.slice(0, eps.length-3)

                animeEmbed.addField("Episodes", eps)

                message.edit({ embeds: [animeEmbed], components: [] })
                break;

            default:
                client.commands.get("help").run(client, message, ["anime"])
                break;
        }
    
}

exports.config = {
    name: "anime",
    group: "others",
    aliases: ["manga"],
    options: [],
    subcommands: [
        {
            name: "search",
            options: [
                {
                    name: "anime-name",
                    type: "string",
                    required: true
                },
                {
                    name: "type-search",
                    type: "string",
                    choices: [
                        {
                            name: "Popular",
                            value: "-popular"
                        },
                        {
                            name: "Best Score",
                            value: "-best"
                        },
                        {
                            name: "Movie",
                            value: "-movie"
                        }
                    ],
                    required: false,
                }
            ]
        },
        {
            name: "mylist",
            options: [
                {
                    name: "mylist-page",
                    type: "integer",
                    required: false
                }
            ],
            subcommands: []
        },
        {
            name: "settings",
            options: [],
            subcommands: [
                {
                    name: "dub",
                    options: [
                        {
                            name: "dub",
                            type: "string",
                            choices: [
                                {
                                    name: "vostfr",
                                    value: "vostfr"
                                },
                                {
                                    name: "vf",
                                    value: "vf"
                                }
                            ],
                            required: true
                        }
                    ],
                    subcommands: []
                },
                {
                    name: "ping",
                    options: [
                        {
                            name: "ping",
                            type: "boolean",
                            required: true
                        }
                    ],
                    subcommands: []
                }
            ]
        }
    ]
}

exports.permission = (client) => { return client.perm.FRENCH }