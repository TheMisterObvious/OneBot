module.exports.run = async (client, message, args) => {

    const weather = require("weather-js");

    var location = args[0];
    
    try {
        weather.find({search: location, degreeType: unit}, function(err, data) {
            if(err) {
                console.log(err);
                message.channel.send("**Je n'ai pas trouvé d'information pour la méteo de "+ location +" !**");
            } else {
                data = data[0];
                const embed = new Discord.RichEmbed()
                .setAuthor("Météo de "+ data.location.name)
                .addField("Maintenant :", data.current.temperature +"°C")
                .addField("Skytext :", data.current.skytext +" ressentie")
                .addField("Feelslike :", data.current.feelslike)
                .addField("WindDisplay :", data.current.winddisplay + " Vent")
                message.channel.send(embed);
                //Prévisions pour demain : **\nHaut: " + data.forecast[1].high + "°, Bas: " + data.forecast[1].low + "° " + data.forecast[1].skytextday + " avec " + data.forecast[1].precip + "% de chance de precipitation.");
            }
        });
    } catch(err) {
        console.log(err);
    }

}

module.exports.config = {
    command: "meteo"
}
