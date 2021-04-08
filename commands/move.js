const move = require("array-move");
const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "move",
  aliases: ["mv"],
  description: "Sıradaki Başka Şarkıya Geçersiniz",
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("Sırada Şarkı Yok").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (!args.length) return message.reply(`Usage: ${message.client.prefix}move <Sıra Numarası>`);
    if (isNaN(args[0]) || args[0] <= 1) return message.reply(`Usage: ${message.client.prefix}move <Sıra Numarası>`);

    let song = queue.songs[args[0] - 1];

    queue.songs = move(queue.songs, args[0] - 1, args[1] == 1 ? 1 : args[1] - 1);
    queue.textChannel.send(
      `${message.author} 🚚 moved **${song.title}** to ${args[1] == 1 ? 1 : args[1] - 1} in the queue.`
    );
  }
};
