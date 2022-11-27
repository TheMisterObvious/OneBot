const fs = require("fs");
const api = require("anime-vostfr");

// function getAnimeByTitle(e, name){
//     name = name.toLowerCase().trim();

//     let title = e.title ? e.title.toLowerCase().trim().includes(name) : false;
//     let title_english = e.title_english ? e.title_english.toLowerCase().trim().includes(name) : false;
//     let title_romanji = e.title_romanji ? e.title_romanji.toLowerCase().trim().includes(name) : false;
//     let others = e.others ? e.others.toLowerCase().trim().includes(name) : false;

//     return title || title_english || title_romanji || others;
// }

// function filterAnimesBySearch(animes, name) {
//     return animes.filter(e => getAnimeByTitle(e, name));
// }

(async () => {

    const baseUrl = "https://neko-sama.fr"

    const dataVO = await api.loadAnime()
    const dataVF = await api.loadAnimeVF()

    const data = {
        vf: {},
        vostfr: {}
    }

    for (const vo of dataVO) {
        const id = vo.title.replaceAll(" ", "_").toLowerCase()
        // const infos = await api.getMoreInformation(vo.url)

        data.vostfr[id] = {
            id: vo.id,
            titles: {
                main: vo.title,
                english: vo.title_english,
                romanji: vo.title_romanji,
                french: vo.title_french,
                others: vo.others
            },
            // synopsis: infos.synop,
            type: vo.type ? vo.type.replace("m0v1e", "film") : "undefined",
            status: vo.status === "2" ? "Terminé" : "En cours",
            nb_eps: vo.nb_eps === "Film" ? "1" : vo.nb_eps.replace(" Eps", ""),
            start_date_year: vo.start_date_year,
            genres: vo.genres,
            score: vo.score,
            popularity: vo.popularity,
            url: baseUrl + vo.url,
            url_image: vo.url_image,
            // url_banner: infos.banner,
            // url_trailer: infos.trailer,
            // episodes: infos.eps
        }
    }

    for (const vf of dataVF) {
        const id = vf.title.replaceAll(" ", "_").toLowerCase()
        // const infos = await api.getMoreInformation(vf.url)

        data.vf[id] = {
            id: vf.id,
            titles: {
                main: vf.title,
                english: vf.title_english,
                romanji: vf.title_romanji,
                french: vf.title_french,
                others: vf.others
            },
            // synopsis: infos.synop,
            type: vf.type ? vf.type.replace("m0v1e", "film") : "undefined",
            status: vf.status === "2" ? "Terminé" : "En cours",
            nb_eps: vf.nb_eps === "Film" ? "1" : vf.nb_eps.replace(" Eps", ""),
            start_date_year: vf.start_date_year,
            genres: vf.genres,
            score: vf.score,
            popularity: vf.popularity,
            url: baseUrl + vf.url,
            url_image: vf.url_image,
            // url_banner: infos.banner,
            // url_trailer: infos.trailer,
            // episodes: infos.eps
        }
    }

    fs.writeFileSync("./data/animes.json", JSON.stringify(data))
})()