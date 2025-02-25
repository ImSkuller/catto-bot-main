const { EmbedBuilder, SlashCommandBuilder, StringSelectMenuBuilder, ActionRowBuilder, StringSelectMenuOptionBuilder } = require('discord.js');
const fs = require('fs');
const config = require('../../data/settings/config.json');

const animeJson = "./src/data/submissions/anime.json";
const mangaJson = "./src/data/submissions/manga.json";
const manhwaJson = "./src/data/submissions/manhwa.json";

const animeData = JSON.parse(fs.readFileSync(animeJson, 'utf8'));
const mangaData = JSON.parse(fs.readFileSync(mangaJson, 'utf8'));
const manhwaData = JSON.parse(fs.readFileSync(manhwaJson, 'utf8'));

const animeKeys = Object.keys(animeData);
const mangaKeys = Object.keys(mangaData);
const manhwaKeys = Object.keys(manhwaData);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('picks')
        .setDescription('📂 Random anime/ manga/ manhwa suggestions thats submitted by our community.'),
    async execute(interaction, app) {

        try {
            const menu = new StringSelectMenuBuilder()
            .setCustomId(`community-submissions-menu`)
            .setMinValues(1)
            .setMaxValues(1)
            .setOptions(new StringSelectMenuOptionBuilder({
                label: `📂 Anime Picks`,
                description: `🔧 This returns a random { Anime } suggestion submitted to us by a random user.`,
                value: `anime`
            }),
            new StringSelectMenuOptionBuilder({
                label: `📂 Manga Picks`,
                description: `🔧 This returns a random { Manga } suggestion submitted to us by a random user.`,
                value: `manga`
            }),
            new StringSelectMenuOptionBuilder({
                label: `📂 Manhwa Picks`,
                description: `🔧 This returns a random { Manhwa } suggestion submitted to us by a random user.`,
                value: `manhwa`
            }),
            new StringSelectMenuOptionBuilder({
                label: `🔗 Discord Link`,
                description: `🔧 Select this option to get the invite link to our discord server.`,
                value: `invite_link`
            }));

            const communityEmbed = new EmbedBuilder()
                .setTitle(`Community Picks`)
                .setDescription(`This command is used to get an **{ Anime, Manga, Manhwa }** suggestions subbmited to us by our bot users. This totally randomized. This is what the people who uses the bot likes.`)
                .addFields([
                    {
                        name: ` `,
                        value: ` `,
                        inline: false
                    },
                    {
                        name: `❓How to submit your suggestions?`,
                        value: `If you wanna submit your suggestions all you have to do is [join](${config.links.discord_invite}) our [discord server](${config.links.discord_invite}). Go to the <#${config.links.submissions_channel}> channel and use the commands mentioned below depending on what you wanna submit. Do keep in mind that it can take some time for new suggestions to get added (Approx 1 hour).`,
                        inline: false
                    },
                    {
                        name: ` `,
                        value: ` `,
                        inline: false
                    },
                    {
                        name: `📂 Anime Submissions`,
                        value: '`/submit-anime`',
                        inline: true
                    },
                    {
                        name: `📂 Manga Submissions`,
                        value: '`/submit-manga`',
                        inline: true
                    },
                    {
                        name: `📂 Manhwa Submissions`,
                        value: '`/submit-manhwa`',
                        inline: true
                    },
                    {
                        name: ` `,
                        value: ` `,
                        inline: false
                    },
                    {
                        name: `⚙️ Number of Anime Submissions`,
                        value: `**${animeKeys.length}**`,
                        inline: true
                    },
                    {
                        name: `⚙️ Number of Manga Submissions`,
                        value: `**${mangaKeys.length}**`,
                        inline: true
                    },
                    {
                        name: `⚙️ Number of Manhwa Submissions`,
                        value: `**${manhwaKeys.length}**`,
                        inline: true
                    },
                    {
                        name: ` `,
                        value: ` `,
                        inline: false
                    },
                    {
                        name: `🔗 **Join Our Discord**`,
                        value: `[**Click Here**](${config.links.discord_invite}) or select the discord link option from the menu to join our discord server.`
                    }
                ])
                .setAuthor({
                    url: config.links.discord_invite,
                    iconURL: interaction.user.displayAvatarURL(),
                    name: interaction.user.username
                })
                .setFooter({
                    text: `Bot by ${config.owner_info.username}`,
                    iconURL: config.links.pfp
                })
                .setThumbnail(app.user.displayAvatarURL())


            await interaction.reply({
                embeds: [communityEmbed],
                components: [new ActionRowBuilder().addComponents(menu)],
            });
        } catch (error) {
            console.log(error);
        }
    },
};
