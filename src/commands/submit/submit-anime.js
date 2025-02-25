const { SlashCommandBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('submit-anime')
        .setDescription(`📁 This command is used to add anime to the database.`),
    async execute(interaction, app) {

        try {
            const config = require('../../data/settings/config.json');

            const modal = new ModalBuilder()
                .setCustomId(`anime-submit`)
                .setTitle(`Enter the Anime Info.`);

            const textInput = new TextInputBuilder()
                .setCustomId(`animeName`)
                .setLabel(`Whats the name of the anime`)
                .setRequired(true)
                .setStyle(TextInputStyle.Short);

            const textInput2 = new TextInputBuilder()
                .setCustomId(`animeDescription`)
                .setLabel(`Enter a beried description about the anime`)
                .setRequired(true)
                .setStyle(TextInputStyle.Paragraph);

            const link = new TextInputBuilder()
                .setCustomId(`watchLink`)
                .setLabel(`Watch Link. (use "https://animekun.top" link)`)
                .setRequired(true)
                .setStyle(TextInputStyle.Short);

            const genre = new TextInputBuilder()
                .setCustomId(`animeGenre`)
                .setLabel(`Whats the genre of the anime you entered?`)
                .setMaxLength(10)
                .setRequired(false)
                .setStyle(TextInputStyle.Short)

            const rating = new TextInputBuilder()
                .setCustomId(`rating`)
                .setLabel(`Please rate the anime (Out of 10)`)
                .setRequired(true)
                .setStyle(TextInputStyle.Short);


            modal.addComponents(new ActionRowBuilder().addComponents(textInput));
            modal.addComponents(new ActionRowBuilder().addComponents(textInput2));
            modal.addComponents(new ActionRowBuilder().addComponents(genre));
            modal.addComponents(new ActionRowBuilder().addComponents(rating));
            modal.addComponents(new ActionRowBuilder().addComponents(link));


            await interaction.showModal(modal);
        } catch (error) {
            console.log(error);
        }
    }
};
