const { EmbedBuilder } = require('discord.js');
const config = require('../../data/settings/config.json');
const fs = require("fs");
const mangaJson = "./src/data/submissions/manga.json"

function addEntry(user_id, manga_id, mangaData) {
    const key = `${user_id}_${manga_id}`;

    let data = {};
    if (fs.existsSync(mangaJson)) {
        const fileContent = fs.readFileSync(mangaJson, "utf8");
        if (fileContent) {
            data = JSON.parse(fileContent);
        }
    }

    data[key] = mangaData;

    fs.writeFileSync(mangaJson, JSON.stringify(data, null, 2), "utf8");
}

module.exports = {
    data: {
        name: `manga-submit`
    },
    async execute(interaction, app) {

        const mangaEmbed = new EmbedBuilder()
            .setTitle(`Your suggestion was added to the database`)
            .setDescription(`The manga you submitted was: [**${interaction.fields.getTextInputValue("mangaName")}**](${interaction.fields.getTextInputValue("readLink")}). You gave the manga a rating of **${interaction.fields.getTextInputValue("rating")}/10**. If you wanna change anything please contact an admin, once you recorded a response you cant change it.`)
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
                    name: `**INFORMATION**`,
                    value: ` `,
                    inline: false,
                },
                {
                    name: `Submitted By`,
                    value: `<@${interaction.user.id}>`,
                    inline: false
                },
                {
                    name: `Manga Name`,
                    value: interaction.fields.getTextInputValue("mangaName"),
                    inline: false
                },
                {
                    name: `Manga Description`,
                    value: interaction.fields.getTextInputValue("mangaDescription"),
                    inline: false,
                },
                {
                    name: `Direct Link`,
                    value: `You can [**Read it here**](${interaction.fields.getTextInputValue("readLink")})`,
                    inline: false,
                },
                {
                    name: `Rating`,
                    value: `You rated the manga: **${interaction.fields.getTextInputValue("rating")}/10**`,
                    inline: false,
                },
                {
                    name: `Genre`,
                    value: `The genre of the manga is: ${interaction.fields.getTextInputValue("mangaGenre")}`,
                    inline: false
                }

            ]);
        const user_id = interaction.user.id;
        const user_name = interaction.user.username;
        const mangaName = interaction.fields.getTextInputValue("mangaName");
        const mangaDescription = interaction.fields.getTextInputValue("mangaDescription");
        var mangaRating = interaction.fields.getTextInputValue("rating");
        var mangaLink = interaction.fields.getTextInputValue("readLink");
        var animeGenre = interaction.fields.getTextInputValue("mangaGenre")

        const manga_id = mangaName.replace(/\s+/g, "_");

        if (!mangaGenre) {
            animeGenre = "random";
        };

        const oneGenre = mangaGenre.split(/[\s,]+/).filter(Boolean)[0] || mangaGenre;

        if (!mangaLink.startsWith("https://")) {
            mangaLink = `https://${mangaLink}`
        };

        if (mangaRating > 10) {
            mangaRating = "10";
        };

        try {
            addEntry(user_id, manga_id, { submitted_by: user_name, name: mangaName, description: mangaDescription, rating: mangaRating, watch_link: mangaLink, genre: oneGenre })
            await interaction.reply({
                embeds: [mangaEmbed]
            });
        } catch (error) {
            console.log(error);
            await interaction.reply({
                content: `An error occoured while writing the data file.`
            });
        }
    }

}
