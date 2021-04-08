const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "volume",
  aliases: ["v"],
  description: "Ses Seviyesini Ayarlarsınız.",
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);

    if (!queue) return message.reply("Çalan Bir Şarkı Yok.").catch(console.error);
    if (!canModifyQueue(message.member))
      return message.reply("Önce Bir Sesli Kanala Katılman Gerekiyor.").catch(console.error);

    if (!args[0]) return message.reply(`🔊 Şarkı Sesi: **${queue.volume}%**`).catch(console.error);
    if (isNaN(args[0])) return message.reply("Lütfen ses seviyesini ayarlamak için bir sayı kullanın.").catch(console.error);
    if (Number(args[0]) > 100 || Number(args[0]) < 0 )
      return message.reply("Lütfen 0-100 arasında bir sayı kullanın.").catch(console.error);

    queue.volume = args[0];
    queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);

    return queue.textChannel.send(`Ses şu şekilde ayarlandı:: **${args[0]}%**`).catch(console.error);
  }
};
