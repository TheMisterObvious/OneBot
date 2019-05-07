module.exports.run = async (client, message, args) => {

    const Discord = require("discord.js");
    const weather = require("weather-js");

    var location = args[0];
    var unit = "C";
    
    try {
        weather.find({search: location, degreeType: unit}, function(err, data) {
            if(err) {
                console.log(err);
                message.channel.send("**Je n'ai pas trouvé d'information pour la méteo de "+ location +" !**");
            } else {
                data = data[0];
                if (data.current.skytext === "Sunny") {
                    var skytext = "☀️";
                } else if (data.current.skytext === "Mostly Cloudy") {
                    var skytext = "";
                } else if (data.current.skytext === "Light Rain") {
                    var skytext = "☀️";
                }
                const embed = new Discord.RichEmbed()
                .setAuthor("Météo de "+ data.location.name)
                .addField("Maintenant :", data.current.temperature +"°"+ unit)
                .addField("Ressentie :", data.current.feelslike)
                .addField("Ciel :", skytext)
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
