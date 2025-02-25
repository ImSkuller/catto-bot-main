const config = require('../../data/settings/config.json');

module.exports = {
    data: {
        name: `restart-button`
    },
    async execute(interaction, app){


        if (interaction.user.id === config.owner_info.user_id) {
            try {
                await interaction.reply({
                    content: `Restarting the bot please wait.`
                });
                process.exit(1);

            } catch (error) {
                interaction.reply({
                    content: `An error occoured while perfoming the task, check the console for more info.`,
                    ephemeral: true
                });
                console.log(error);
            };
        } else {
            interaction.reply({
                content: `You do not have permission to use this button.`
            });
            console.log(`⚠️[Auth] ${interaction.user.username} Tried to restart the bot.`);
        };
    }
}
