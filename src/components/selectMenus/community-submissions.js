const { EmbedBuilder } = require('discord.js');
const fs = require("fs");

const config = require('../../data/settings/config.json');

const animeJson = "./src/data/submissions/anime.json";
const mangaJson = "./src/data/submissions/manga.json";
const manhwaJson = "./src/data/submissions/manhwa.json";

module.exports = {
    data: {
        name: `community-submissions-menu`
    },
    async execute(interaction, app) {
        const animeData = JSON.parse(fs.readFileSync(animeJson, 'utf8'));
        const mangaData = JSON.parse(fs.readFileSync(mangaJson, 'utf8'));
        const manhwaData = JSON.parse(fs.readFileSync(manhwaJson, 'utf8'));

        const animeKeys = Object.keys(animeData);
        const mangaKeys = Object.keys(mangaData);
        const manhwaKeys = Object.keys(manhwaData);

        if (animeKeys.length === 0) {
            return interaction.reply("⚠️Error: No anime submissions found.");
        }
        if (mangaKeys.length === 0) {
            return interaction.reply("⚠️Error: No manga submissions found.");
        }
        if (manhwaKeys.length === 0) {
            return interaction.reply("⚠️Error: No manhwa submissions found.");
        }


        // Select a random key from animeKeys
        const randomAnimeKey = animeKeys[Math.floor(Math.random() * animeKeys.length)];
        const randomAnime = animeData[randomAnimeKey];

        const randomMangaKey = mangaKeys[Math.floor(Math.random() * mangaKeys.length)];
        const randomManga = mangaData[randomMangaKey];

        const randomManhwaKey = manhwaKeys[Math.floor(Math.random() * manhwaKeys.length)];
        const randomManhwa = manhwaData[randomManhwaKey];



        const animeEmbed = new EmbedBuilder()
            .setTitle(randomAnime.name)
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
            .setDescription(`This anime was submitted by: **${randomAnime.submitted_by}**. They rated the anime a solid **${randomAnime.rating}/10**. If you wanna submit your anime join our [**discord**](${config.links.discord_invite})!`)
            .addFields([
                {
                    name: `Note`,
                    value: "The **rating** value is the rating that the user who submited the anime gave it.",
                    inline: false
                },
                {
                    name: ` `,
                    value: ` `,
                    inline: false
                },
                {
                    name: `Submitted By`,
                    value: `Username: **${randomAnime.submitted_by}**`,
                    inline: false
                },
                {
                    name: `Anime Name`,
                    value: randomAnime.name,
                    inline: false
                },
                {
                    name: `Anime Description`,
                    value: randomAnime.description,
                    inline: false
                },
                {
                    name: `Anime Genre`,
                    value: randomAnime.genre,
                    inline: true
                },
                {
                    name: `Anime Rating`,
                    value: `${randomAnime.rating}/10`,
                    inline: true
                },
                {
                    name: `Direct Link`,
                    value: `[**Click Here**](${randomAnime.watch_link}) to watch the anime.`,
                    inline: true
                },
                {
                    name: ` `,
                    value: ` `,
                    inline: false
                }
            ])


        const mangaEmbed = new EmbedBuilder()
            .setTitle(randomManga.name)
            .setDescription(`This manga was submitted by: **${randomManga.submitted_by}**. They rated the manga a solid **${randomManga.rating}/10**. If you wanna submit your manga join our [**discord**](${config.links.discord_invite})!`)
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
            .addFields([
                {
                    name: `Note`,
                    value: "The **rating** value is the rating that the user who submited the manga gave it.",
                    inline: false
                },
                {
                    name: ` `,
                    value: ` `,
                    inline: false
                },
                {
                    name: `Submitted By`,
                    value: `Username: **${randomManga.submitted_by}**`,
                    inline: false
                },
                {
                    name: `Manga Name`,
                    value: randomManga.name,
                    inline: false
                },
                {
                    name: `Manga Description`,
                    value: randomManga.description,
                    inline: false
                },
                {
                    name: `Manga Genre`,
                    value: randomManga.genre,
                    inline: true
                },
                {
                    name: `Manga Rating`,
                    value: `${randomManga.rating}/10`,
                    inline: true
                },
                {
                    name: `Direct Link`,
                    value: `[**Click Here**](${randomManga.watch_link}) to read the manga.`,
                    inline: true
                },
                {
                    name: ` `,
                    value: ` `,
                    inline: false
                }
            ])


        const manhwaEmbed = new EmbedBuilder()
            .setTitle(randomManhwa.name)
            .setDescription(`This manhwa was submitted by: **${randomManhwa.submitted_by}**. They rated the manhwa a solid **${randomManhwa.rating}/10**. If you wanna submit your manhwa join our [**discord**](${config.links.discord_invite})!`)
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
            .addFields([
                {
                    name: `Note`,
                    value: "The **rating** value is the rating that the user who submited the manhwa gave the it.",
                    inline: false
                },
                {
                    name: ` `,
                    value: ` `,
                    inline: false
                },
                {
                    name: `Submitted By`,
                    value: `Username: **${randomManhwa.submitted_by}**`,
                    inline: false
                },
                {
                    name: `Manhwa Name`,
                    value: randomManhwa.name,
                    inline: false
                },
                {
                    name: `Manhwa Description`,
                    value: randomManhwa.description,
                    inline: false
                },
                {
                    name: `Manhwa Genre`,
                    value: randomManhwa.genre,
                    inline: true
                },
                {
                    name: `Manhwa Rating`,
                    value: `${randomManhwa.rating}/10`,
                    inline: true
                },
                {
                    name: `Direct Link`,
                    value: `[**Click Here**](${randomManhwa.watch_link}) to read the manga.`,
                    inline: true
                },
                {
                    name: ` `,
                    value: ` `,
                    inline: false
                }
            ])


        const discordInviteEmbed = new EmbedBuilder()
            .setTitle(`🔗 Discord Server Invite`)
            .setDescription(`⚠️ If you wanna submit your own suggestions you have to join our discord server. Use the below to join us!`)
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

        if (interaction.values[0] === 'anime') {
            await interaction.reply({
                content: `🎲 Randomly selected anime: **${randomAnime.name}**`,
                embeds: [animeEmbed]
            });
        } else if (interaction.values[0] === 'manga') {
            await interaction.reply({
                content: `🎲 Randomly selected manga: **${randomManga.name}**`,
                embeds: [mangaEmbed]
            })
        } else if (interaction.values[0] === 'manhwa') {
            await interaction.reply({
                content: `🎲 Randomly selected manhwa: **${randomManhwa.name}**`,
                embeds: [manhwaEmbed]
            })
        } else if (interaction.values[0] === 'invite_link') {
            await interaction.reply({
                embeds: [discordInviteEmbed],
                content: config.links.discord_invite
            })
        }
    },
};
