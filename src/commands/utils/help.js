const { SlashCommandBuilder, EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder, StringSelectMenuOptionBuilder } = require('discord.js');
const config = require('../../data/settings/config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription(`⚙️ Displays all the bot commands. [Help Menu]`),
    async execute(interaction, app) {

        try {
            const helpEmbed = new EmbedBuilder()
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
            .setTitle(`Bot Commands`)
            .setDescription(`This menu has all the information about the bot commands.`)
            .addFields([
                {
                    name: ` `,
                    value: ` `,
                    inline: false,
                },
                {
                    name: `Community Contributed Commands`,
                    value: '`📁 Community Section`',
                    inline: true
                },
                {
                    name: `Other Commands`,
                    value: '`📁 Other Section`',
                    inline: true
                }
            ])

            const helpMenu = new StringSelectMenuBuilder()
                .setCustomId(`help-menu`)
                .setMinValues(1)
                .setMaxValues(1)
                .setOptions(new StringSelectMenuOptionBuilder({
                    label: `📂 Comnmunity Section`,
                    description: `🔧 Retruns the { Community Commands } menu.`,
                    value: `community`
                }),
                new StringSelectMenuOptionBuilder({
                    label: `📂 Other Section`,
                    description: `🔧 Retruns the { Other Commands } menu.`,
                    value: `other`
                }))



            await interaction.reply({
                embeds: [helpEmbed],
                components: [new ActionRowBuilder().addComponents(helpMenu)]
            });

        } catch (error) {
            console.log(error);
            await interaction.reply({
                content: `An error occoured while running this command`
            });
        };
    },
};
