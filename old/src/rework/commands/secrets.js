exports.run = async(client, message) => {
    client.sendMessage(message.channel, "[Toutes les infos actuelles sur les den den mushi et les achievements](https://docs.google.com/document/d/1F7Yvfvw1g8yCtZooXe7g6aeuj4sdQhjw9pYtHDXbd78/edit?usp=sharing)");
}

exports.config = {
    name: "secrets",
    description: "Dévoile les plus grands (enfin on va dire ça) secrets de l'aventure du Koya Bot.",
    template: "secrets",
    permission: "TEAMPERSO",
    aliases: ["secret"],
    options: []
}