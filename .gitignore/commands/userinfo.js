module.exports.run = async (client, message, args) => {

    var memberavatar = message.author.avatarURL
    var membername = message.author.username
    var mentionned = message.mentions.users.first();
    var getvalueof;

    if (mentionned) {
        var getvalueof = mentionned;
    } else {
        var getvalueof = message.author;
    }
        
    if (getvalueof.presence.status == 'online') {
        var status = "En ligne"; 
    } else {
        var status = "Hors ligne";
    }
      
    message.channel.sendMessage({
        embed: {
            type: 'rich',
            description: '',
            fields: [{
                name: 'Pseudo',
                value: getvalueof.username,
                inline: true
            }, {
                name: 'User id',
                value: getvalueof.id,
                inline: true
            },{
                name: 'Status',
                value: status,
                inline: true
            }],
            color: 0x666666,
            footer: {
                text: 'by TheMisterObvious',
                proxy_icon_url: ' '
            },
            thumbnail: {
                url: getvalueof.avatarURL 
            },
            author: {
                name: getvalueof.username +"#"+ getvalueof.discrimator,
                icon_url: getvalueof.avatarURL,
                proxy_icon_url: ' '
            }
        }
    });

}
    
module.exports.config = {
        command: "userinfo"
}