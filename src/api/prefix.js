exports.router = (client, express) => {
    const router = express.Router()

    router.get("/", (req, res) => {
        res.send("hello")
    })

    return router
}

exports.path = "/prefix"