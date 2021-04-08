const fs = require("fs");

module.exports = {
  name: "clips",
  description: "Clipleri Listeler",
  execute(message) {
    fs.readdir("./sounds", function(err, files) {
      if (err) return console.log("Dizin okunamıyor: " + err);

      let clips = [];

      files.forEach(function(file) {
        clips.push(file.substring(0, file.length - 4));
      });

      message.reply(`${clips.join(" ")}`).catch(console.error);
    });
  }
};
