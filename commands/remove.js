const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "remove",
  aliases: ["rm"],
  description: "Sıradan Şarkı Çıkarırsınız.",
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("Sıra Bulunamadı.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (!args.length) return message.reply(`Usage: ${message.client.prefix}remove <Sıra Numarası>`);
    if (isNaN(args[0])) return message.reply(`Usage: ${message.client.prefix}remove <Sıra Numarası>`);

    const song = queue.songs.splice(args[0] - 1, 1);
    queue.textChannel.send(`${message.author} ❌ **${song[0].title}** Adlı Şarkı Sıradan Çıkarıldı.`);
  }
};
