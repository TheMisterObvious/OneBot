module.exports.run = async (client, message, args) => {

    if (args[0] === undefined) {
        message.channel.send("Merci de lettre une valeur après le `o!test` !");
    } else if (args[1] === undefined) {
        message.channel.send("Merci de choisir un 2eme arguments !");
    } else {
        message.channel.send("args = "+ args[0] +"\nargs2 = "+ args[1]);
    }

}
    
module.exports.config = {
        command: "test"
}