const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const config = require('../../data/settings/config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('debug')
        .setDescription('⚠️ This is a private command so no info available'),

    async execute(interaction, app) {

        if (interaction.user.id === config.owner_info.user_id) {

            const pingButton = new ButtonBuilder()
                .setCustomId('ping-toggle')
                .setLabel(`⚙️ Ping`)
                .setStyle(ButtonStyle.Secondary)
            const infoFetchButton = new ButtonBuilder()
                .setCustomId('info-button')
                .setLabel(`⚙️ Info Fetch`)
                .setStyle(ButtonStyle.Secondary)
            const picksButton = new ButtonBuilder()
                .setCustomId('picks-toggle')
                .setLabel(`⚙️ Picks`)
                .setStyle(ButtonStyle.Secondary)
            const guildsButton = new ButtonBuilder()
                .setCustomId(`guilds-button`)
                .setLabel(`⚙️ Guilds Fetch`)
                .setStyle(ButtonStyle.Secondary)
            const animeButton = new ButtonBuilder()
                .setCustomId(`submit-anime-toggle`)
                .setLabel(`⚙️ Anime`)
                .setStyle(ButtonStyle.Secondary)
            const mangaButton = new ButtonBuilder()
                .setCustomId(`submit-manga-toggle`)
                .setLabel(`⚙️ Manga`)
                .setStyle(ButtonStyle.Secondary)
            const manhwaButton = new ButtonBuilder()
                .setCustomId(`submit-manhwa-toggle`)
                .setLabel(`⚙️ Manhwa`)
                .setStyle(ButtonStyle.Secondary)
            const restartButton = new ButtonBuilder()
                .setCustomId(`restart-button`)
                .setLabel(`⚠️ Restart Bot`)
                .setStyle(ButtonStyle.Danger)

            const embed = new EmbedBuilder()
                .setTitle(`Debugger`)
                .setDescription(`This command lets you check some important **config values** and **Toggle** each command in the bot manually if, this is used for debugging.`)
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
                .addFields([
                    {
                        name: `⚙️ Guilds Fetch`,
                        value: `Displays all the guilds the bot is in with their invite links.`,
                        inline: false
                    },
                    {
                        name: `⚙️ Info Fetch`,
                        value: `Displays config some important info.`,
                        inline: false
                    },
                    {
                        name: `⚙️ Ping`,
                        value: `Toggle Ping Command`,
                        inline: false
                    },
                    {
                        name: `⚙️ Picks`,
                        value: `Toggle Picks Command`,
                        inline: false
                    },
                    {
                        name: `⚙️ Anime`,
                        value: `Toggle Anime-Submit Command`,
                        inline: false
                    },
                    {
                        name: `⚙️ Manga`,
                        value: `Toggle Manga-Submit Command`,
                        inline: false
                    },
                    {
                        name: `⚙️ Mnahwa`,
                        value: `Toggle Manhwa-Submit Command`,
                        inline: false
                    },
                    {
                        name: `⚠️ Restart Bot`,
                        value: `Restarts the bot.`,
                        inline: false
                    }
                ])

            await interaction.deferReply();
            await interaction.editReply({
                embeds: [embed],
                components: [new ActionRowBuilder().addComponents(guildsButton, infoFetchButton, pingButton, picksButton, animeButton), new ActionRowBuilder().addComponents(mangaButton, manhwaButton, restartButton)]
            });

        } else {
            interaction.reply({
                content: `You do not have permission to use this command.`,
                ephemeral: true
            });
            console.log(`🔒[Auth] Command: "Toggle", Ran by: ${interaction.user.username}`);
        }
    }
};
