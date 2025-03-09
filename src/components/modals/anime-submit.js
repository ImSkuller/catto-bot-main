const { EmbedBuilder } = require('discord.js');
const config = require('../../data/settings/config.json');
const fs = require("fs");
const animeJson = "./src/data/submissions/anime.json"


function addEntry(user_id, anime_id, animeData) {
    const key = `${user_id}_${anime_id}`;

    let data = {};
    if (fs.existsSync(animeJson)) {
        const fileContent = fs.readFileSync(animeJson, "utf8");
        if (fileContent) {
            data = JSON.parse(fileContent);
        }
    }

    data[key] = animeData;

    fs.writeFileSync(animeJson, JSON.stringify(data, null, 2), "utf8");
}

module.exports = {
    data: {
        name: `anime-submit`
    },
    async execute(interaction, app) {

        const animeEmbed = new EmbedBuilder()
            .setTitle(`Your suggestion was added to the database`)
            .setDescription(`The anime you submitted was: [**${interaction.fields.getTextInputValue("animeName")}**](${interaction.fields.getTextInputValue("watchLink")}). You gave the anime a rating of **${interaction.fields.getTextInputValue("rating")}/10**. If you wanna change anything please contact an admin, once you recorded a response you cant change it.`)
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
                    name: `Anime Name`,
                    value: interaction.fields.getTextInputValue("animeName"),
                    inline: false
                },
                {
                    name: `Anime Description`,
                    value: interaction.fields.getTextInputValue("animeDescription"),
                    inline: false,
                },
                {
                    name: `Direct Link`,
                    value: `You can [**Watch it here**](${interaction.fields.getTextInputValue("watchLink")})`,
                    inline: false,
                },
                {
                    name: `Rating`,
                    value: `You rated the anime: **${interaction.fields.getTextInputValue("rating")}/10**`,
                    inline: false,
                },
                {
                    name: `Genre`,
                    value: `The genre of the anime is: ${interaction.fields.getTextInputValue("animeGenre")}`,
                    inline: false
                }

            ]);


        const user_id = interaction.user.id;
        const user_name = interaction.user.username;
        const animeName = interaction.fields.getTextInputValue("animeName");
        const animeDescription = interaction.fields.getTextInputValue("animeDescription");
        var animeRating = interaction.fields.getTextInputValue("rating");
        var animeLink = interaction.fields.getTextInputValue("watchLink");
        let animeGenre = interaction.fields.getTextInputValue("animeGenre")

        const anime_id = animeName.replace(/\s+/g, "-");

        if (!animeLink.startsWith("https://animekun.top" || "https://hianime.to/")){
            animeLink = `https://animekun.top/search?q=${anime_id}`
        };

        if (!animeGenre) {
            animeGenre = "random";
        };

        const oneGenre = animeGenre.split(/[\s,]+/).filter(Boolean)[0] || animeGenre;

        if (animeRating > 10) {
            animeRating = "10";
        };

        try {
            addEntry(user_id, anime_id, { submitted_by: user_name, name: animeName, description: animeDescription, rating: animeRating, watch_link: animeLink, genre: oneGenre })
            await interaction.reply({
                embeds: [animeEmbed]
            });
        } catch (error) {
            console.log(error);
            await interaction.reply({
                content: `An error occoured while writing the data file.`
            });
        }
    }

}
