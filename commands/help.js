const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "müzik",
  aliases: ["m"],
  description: "Müzik Komutlarını Gösterir",
  execute(message) {
    let commands = message.client.commands.array();

    let helpEmbed = new MessageEmbed()
      .setTitle(`Eyo Müzik Yardım Menüsü`)
      .setDescription("Müzik Komtuları")
      .setColor("#ff7b00");

    commands.forEach((cmd) => {
      helpEmbed.addField(
        `**${message.client.prefix}${cmd.name} ${cmd.aliases ? `(${cmd.aliases})` : ""}**`,
        `${cmd.description}`,
        true
      );
    });

    helpEmbed.setTimestamp();

    return message.channel.send(helpEmbed).catch(console.error);
  }
};
