const { EmbedBuilder } = require('discord.js');
const config = require('../../data/settings/config.json');
const fs = require("fs");
const manhwaJson = "./src/data/submissions/manhwa.json"

function addEntry(user_id, manhwa_id, manhwaData) {
    const key = `${user_id}_${manhwa_id}`;

    let data = {};
    if (fs.existsSync(manhwaJson)) {
        const fileContent = fs.readFileSync(manhwaJson, "utf8");
        if (fileContent) {
            data = JSON.parse(fileContent);
        }
    }

    data[key] = manhwaData;

    fs.writeFileSync(manhwaJson, JSON.stringify(data, null, 2), "utf8");
}

module.exports = {
    data: {
        name: `manhwa-submit`
    },
    async execute(interaction, app) {

        const manhwaEmbed = new EmbedBuilder()
            .setTitle(`Your suggestion was added to the database`)
            .setDescription(`The manhwa you submitted was: [**${interaction.fields.getTextInputValue("manhwaName")}**](${interaction.fields.getTextInputValue("readLink")}). You gave the manhwa a rating of **${interaction.fields.getTextInputValue("rating")}/10**. If you wanna change anything please contact an admin, once you recorded a response you cant change it.`)
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
                    name: `Manhwa Name`,
                    value: interaction.fields.getTextInputValue("manhwaName"),
                    inline: false
                },
                {
                    name: `Manhwa Description`,
                    value: interaction.fields.getTextInputValue("manhwaDescription"),
                    inline: false,
                },
                {
                    name: `Direct Link`,
                    value: `You can [**Read it here**](${interaction.fields.getTextInputValue("readLink")})`,
                    inline: false,
                },
                {
                    name: `Rating`,
                    value: `You rated the manhwa: **${interaction.fields.getTextInputValue("rating")}/10**`,
                    inline: false,
                },
                {
                    name: `Genre`,
                    value: `The genre of the manhwa is: ${interaction.fields.getTextInputValue("manhwaGenre")}`,
                    inline: false
                }

            ]);
        const user_id = interaction.user.id;
        const user_name = interaction.user.username;
        const manhwaName = interaction.fields.getTextInputValue("manhwaName");
        const manhwaDescription = interaction.fields.getTextInputValue("manhwaDescription");
        var manhwaRating = interaction.fields.getTextInputValue("rating");
        var manhwaLink = interaction.fields.getTextInputValue("readLink");
        var manhwaGenre = interaction.fields.getTextInputValue("manhwaGenre");

        const manhwa_id = manhwaName.replace(/\s+/g, "_");

        if (!manhwaGenre) {
            manhwaGenre = `random`;
        };

        const oneGenre = manhwaGenre.split(/[\s,]+/).filter(Boolean)[0] || manhwaGenre;

        if (!manhwaLink.startsWith("https://")) {
            manhwaLink = `https://${manhwaLink}`;
        };

        if (manhwaRating > 10) {
            manhwaRating = "10";
        };

        try {
            addEntry(user_id, manhwa_id, { submitted_by: user_name, name: manhwaName, description: manhwaDescription, rating: manhwaRating, watch_link: manhwaLink, genre: oneGenre })
            await interaction.reply({
                embeds: [manhwaEmbed]
            });
        } catch (error) {
            console.log(error);
            await interaction.reply({
                content: `An error occoured while writing the data file.`
            });
        }
    }

}
