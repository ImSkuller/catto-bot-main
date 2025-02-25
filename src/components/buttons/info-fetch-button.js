const { EmbedBuilder } = require('discord.js');
const config = require('../../data/settings/config.json');

module.exports = {
    data: {
        name: `info-button`
    },
    async execute(interaction, app){

        if (interaction.user.id === config.owner_info.user_id){
            const debuggerEmbed = new EmbedBuilder()
                    .setAuthor({
                        name: interaction.user.username,
                        iconURL: interaction.user.displayAvatarURL()
                    })
                    .setFooter({
                        text: `Bot by ${config.owner_info.username}`,
                        iconURL: config.links.pfp
                    })
                    .setTitle(`Bot Config Information`)
                    .setDescription(`This displays some config information. Helps with the maintainence of the bot and check who are admins and who are not.`)
                    .addFields([
                        {
                            name: `Bot Owner Information`,
                            value: `Username: "**${config.owner_info.username}**" ID: "**${config.owner_info.user_id}**"`,
                            inline: false,
                        },
                        {
                            name: `Bot Admin IDS`,
                            value: JSON.stringify(config.admin_ids),
                            inline: false,
                        },
                        {
                            name: `Bot Moderator IDS`,
                            value: JSON.stringify(config.mod_ids),
                            inline: false,
                        },
                        {
                            name: `Comming Soon.`,
                            value: `This feature will be comming soon`,
                            inline: false
                        }
                    ])
                    .setThumbnail(app.user.displayAvatarURL())

            try {
                await interaction.reply({
                    embeds: [debuggerEmbed]
                });

            } catch (error) {
                await interaction.reply({
                    content: `An error occoured while reloading the bot files. Check console for more information.`
                });
                console.log(`⚠️[Error] An error occoured while running "debug.js" ${error}`);
            };
        } else {
            interaction.reply({
                content: `Only the bot owner can run the debug button command / button.`,
                ephemeral: true
            });
        };
    }
}
