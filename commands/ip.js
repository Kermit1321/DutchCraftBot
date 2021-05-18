module.exports = {
    name: 'ip',
    description: "this is a meme command!",
    async execute(message, args){
        message.channel.send("Het ip voor de server is: `DutchCraft.aternos.me`")
    }
}