const { EmbedBuilder, PermissionsBitField, ChannelType } = require('discord.js');

module.exports = {
    data: {
        name: `guilds-button`
    },
    async execute(interaction, app){
        const config = require('../../data/settings/config.json');

        if (interaction.user.id === config.owner_info.user_id) {
            try {
                const guilds = await app.guilds.fetch();
                for (const [guildId, guild] of guilds) {
                    try {
                        const fetchedGuild = await guild.fetch();
                        const channels = await fetchedGuild.channels.fetch();
                        const channel = channels.find(ch =>
                            ch.type === ChannelType.GuildText && ch.permissionsFor(app.user).has(PermissionsBitField.Flags.CreateInstantInvite)
                        );
                        if (!channel) {
                            interaction.channel.send(`No valid channel found for invites in ${guild.name}`);
                            continue;
                        }
                        const invite = await channel.createInvite({ maxAge: 0, maxUses: 0 });

                        const embed = new EmbedBuilder()
                            .setTitle(`${guild.name}`)
                            .setDescription(`**${guild.name}** is a guild i am in, You can join using the invite link below.`)
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
                            .setFields({name: `${guild.name}`, value: `[Click here to join.](${invite.url})`, inline: false})

                            interaction.channel.send({embeds: [embed]});
                    } catch(error) {
                        console.log(error);
                    }
                }

            } catch (error) {
                console.error("⚠️ [Error] Error fetching ping:", error);
                await interaction.followUp({ content: "An error occurred while fetching the ping, Check the console for more info." });
            }
        } else {
            interaction.reply({
                content: `You do not have permission to use this command.`,
                ephemeral: true
            });
            console.log(`🔒[Auth] Command: "Guilds", Ran by: ${interaction.user.username}`);
        };
    }
}
