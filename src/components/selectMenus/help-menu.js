const { EmbedBuilder } = require('discord.js');
const config = require('../../data/settings/config.json');

module.exports = {
    data: {
        name: `help-menu`
    },
    async execute(interaction, app) {

        try {

            const communityEmbed = new EmbedBuilder()
                .setTitle(`Community Commands Help`)
                .setAuthor({
                    url: config.links.discord_invite,
                    iconURL: interaction.user.displayAvatarURL(),
                    name: interaction.user.username
                })
                .setFooter({
                    text: `Bot By ${config.owner_info.username}`,
                    iconURL: config.links.pfp
                })
                .setThumbnail(app.user.displayAvatarURL())
                .setDescription(`⚠️ All the commands you see here are what makes the bot unique it is managed by the community. The anime suggestions are submitted by the bot users.`)
                .addFields([
                    {
                        name: ` `,
                        value: ` `,
                        inline: false
                    },
                    {
                        name: ` `,
                        value: `**Commands:**`,
                        inline: false
                    },
                    {
                        name: '/submit-anime `(Slash Command Only)`',
                        value: 'This command is used to submit your anime suggestion to the bot and it will be added in the database and can be viewed by using `/picks` command',
                        inline: false
                    },
                    {
                        name: '/submit-manga (Slash Command Only)`',
                        value: 'This command is used to submit your manga suggestion to the bot and it will be added in the database and can be viewed by using `/picks` command',
                        inline: false
                    },
                    {
                        name: '/submit-manhwa `(Slash Command Only)`',
                        value: 'This command is used to submit your manhwa suggestion to the bot and it will be added in the database and can be viewed by using `/picks` command',
                        inline: false
                    },
                    {
                        name: '/picks `(Slash Command Only)`',
                        value: 'This command randomly picks a suggestion given by the people who uses the bot, all the information about the `anime/ manga/ manhwa` is gonna be printed as an embed and the `watch/ read link` will also be attched with the information',
                        inline: false
                    },
                ])


            const otherEmbed = new EmbedBuilder()
                .setTitle(`Other Commands Help`)
                .setAuthor({
                    url: config.links.discord_invite,
                    iconURL: interaction.user.displayAvatarURL(),
                    name: interaction.user.username
                })
                .setFooter({
                    text: `Bot By ${config.owner_info.username}`,
                    iconURL: config.links.pfp
                })
                .setThumbnail(app.user.displayAvatarURL())
                .setDescription(`Other Bot Commands`)
                .addFields([
                    {
                        name: `/invite (Slash Command Only)`,
                        value: `This command gives you the link to add the bot.`,
                        inline: false
                    }
                ])


            if (interaction.values[0] === 'community'){
                await interaction.reply({
                    embeds: [communityEmbed]
                });
            } else if (interaction.values[0] === 'other') {
                await interaction.reply({
                    embeds: [otherEmbed]
                });
            }
        } catch (error) {
            console.log(error);
            await interaction.reply({
                content: `An error occoured while fetching that menu.`,
                ephemeral: true
            })
        };
    },
}
