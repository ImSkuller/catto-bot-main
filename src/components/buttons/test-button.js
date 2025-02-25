module.exports = {
    data: {
        name: `test-button`
    },
    async execute(interaction, app){
        await interaction.reply({
            content: `https://discord.com/app`
        });
    }
}
