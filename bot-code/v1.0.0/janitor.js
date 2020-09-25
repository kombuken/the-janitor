const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json")

client.on("ready", () => {
    console.log(`Bot ready, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} servers.`)
    client.user.setActivity(`Cleaning ${client.guilds.size} servers`);
});

client.on("guildCreate", guild => {
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    client.user.setActivity(`Cleaning ${client.guilds.size} servers`);
    client.channels.get('756904718965538997').send(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});

client.on("guildDelete", guild => {
    console.log(`Removed from guild: ${guild.name} (id: ${guild.id})`);
    client.user.setActivity(`Cleaning ${client.guilds.size} servers`);
    client.channels.get('756904718965538997').send(`Removed from guild: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});

client.on("message", async message => {
    if (message.author.bot) return;

    if(!message.content.startsWith(config.prefix)) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === "ping") {
        const m = await message.channel.send("Ping?");
        m.edit(`Pong!\n Round-trip latency: ${m.createdTimestamp - message.createdTimestamp}ms.\n API Latency: ${Math.round(client.ws.ping)}ms.`)
    }

    if (command === "say") {
        const sayMessage = args.join(" ");
        message.delete().catch(error => {
            if (error.code !== 10008) {
                console.error('Failed to delete the message', error);
            }
        })
        message.channel.send(sayMessage);
    }

    if (command === "kick") {

        const nopermEmbed = new Discord.MessageEmbed()
            .setColor('RED')
            .setDescription('You don\'t have permisson to use this!')

        if (!message.member.roles.cache.some(r=>["Administrator", "Moderator"].includes(r.name)))
            message.channel.send(nopermEmbed)

        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!member)
            return message.reply("Please mention a valid member of this server!")
            console.log("Failed to delete the message")
            .then(msg => {
                msg.delete({timeout: 2000});
            })
            .catch(console.error);
        if (!member.kickable)
            return message.reply("I cannot kick this user!")
            .then(msg => {
                msg.delete({timeout: 2000});
            })
            .catch(console.error)
    }
})

// more code needs to be added here
// ban, utility, fun commands could be used
// client.login(token)
