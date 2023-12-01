import { ActionRowBuilder, EmbedBuilder, ModalBuilder, ModalSubmitInteraction, TextInputBuilder, TextInputStyle } from "discord.js"

export default {
    data: new ModalBuilder()
        .setCustomId("accept-wager")
        .setTitle("Accept Wager?")
        .setComponents(new ActionRowBuilder<TextInputBuilder>()
            .addComponents(new TextInputBuilder()
                .setCustomId("wager-message")
                .setLabel("An optional message to send to the challenger")
                .setRequired(false)
                .setStyle(TextInputStyle.Short))),
    async execute(interaction: ModalSubmitInteraction) {
        const wagerMessage = interaction.fields.getTextInputValue("wager-message")
        await interaction.message?.edit({ components: [] }) // remove buttons so user can't double-accept
        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription("**You have accepted the wager!**")
                    .setColor("Green")
            ]
        })
        const embedFields = interaction.message?.embeds?.[0]?.fields
        const challenger = embedFields?.find(x => x.name === "Challenger")?.value
        if (challenger) {
            const user = interaction.client.users.cache.get(challenger.substring(2, challenger.length - 1))
            if (user) {
                await user.send({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(`**Your wager with ${interaction.user} was accepted!**`)
                            .addFields(...(wagerMessage ? [{ name: "Message", value: `*${wagerMessage}*` }] : []))
                            .setColor("Green")
                    ]
                })
                const messageUrl = embedFields?.find(x => x.name === "Challenge Message")?.value
                if (messageUrl) {
                    const [guildId, channelId, messageId] = messageUrl.split("/").slice(-3)
                    const channel = interaction.client.guilds.cache.get(guildId)?.channels.cache.get(channelId)
                    if (channel?.isTextBased()) {
                        const message = channel.messages.cache.get(messageId)
                        if (message) {
                            message.reply({
                                embeds: [
                                    new EmbedBuilder()
                                        .setDescription(`**${interaction.user} has accepted the wager with ${user}!**`)
                                        .addFields(...(wagerMessage ? [{ name: "Message", value: `*${wagerMessage}*` }] : []))
                                        .setColor("Green")
                                ]
                            })
                        }
                    }
                }
            }
        }
    }
}
