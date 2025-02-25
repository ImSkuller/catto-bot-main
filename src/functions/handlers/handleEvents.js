const fs = require('fs');

module.exports = (app) => {
    app.handleEvents = async () => {
        const eventFolders = fs.readdirSync(`./src/events`);
        for (const folder of eventFolders) {
            const eventFiles = fs.readdirSync(`./src/events/${folder}`).filter(file => file.endsWith('.js'));
            switch (folder) {
                case "client":
                        for (const file of eventFiles) {
                            const event = require(`../../events/${folder}/${file}`);
                            if (event.once) app.once(event.name, (...args) => event.execute(...args, app));
                            else app.on(event.name, (...args) => event.execute(...args, app));
                        }
                    break;

                default:
                    break;
            }
        }
    }
}
