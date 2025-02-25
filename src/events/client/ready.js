const { ActivityType } = require("discord.js");
const fs = require("fs");
const { type } = require("os");

module.exports = {
    name: 'ready',
    once: true,
    async execute(app) {
        console.log(`⚙️[System] ${app.user.tag} is now online and functional.`);

        const config = require('../../data/settings/config.json');

        try {
            if (config.bot_status.activity === "l") {
                app.user.setActivity({name: config.bot_status.text}, {type: ActivityType.Listening});
                console.log("⚙️[System] Bot Status has been updated.");
            } else if (config.bot_status.activity === "w") {
                app.user.setActivity({name: config.bot_status.text}, {type: ActivityType.Watching});
                console.log("⚙️[System] Bot Status has been updated.");
            } else if (config.bot_status.activity === "p") {
                app.user.setActivity({name: config.bot_status.text}, {type: ActivityType.Playing});
                console.log("⚙️[System] Bot Status has been updated.");
            } else {
                app.user.setActivity({name: "How to set your bot status."}, {type: ActivityType.Watching});
                console.log("⚠️[System] You did not select a valid type. Applying default bot status.");
            }
        } catch (error) {
            console.error("⚠️[Error] Failed to change bot status:", error);
        }
    }
};
