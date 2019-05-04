module.exports.run = async (client, message, args) => {

    message.delete(1);
    var say = message.content.substring(6);
    message.channel.send("*"+ say +"*");

}

module.exports.config = {
    command: "say"
}