module.exports.run = async (client, message, args) => {

var admin = "335419820721963009";

    if (message.author.id === admin) {
        client.user.setUsername(message.content.substring(10));
        message.delete(1);
    }

}

module.exports.config = {
    command: "botname"
}