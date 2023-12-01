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
        if (!interaction.isFromMessage()) throw new Error()

        const wagerMessage = interaction.fields.getTextInputValue("wager-message")
        
        await interaction.update({ components: [] }) // remove buttons so user can't double-accept

        await interaction.followUp({
            embeds: [
                new EmbedBuilder()
                    .setDescription("**You have accepted the wager!**")
                    .setColor("Green")
            ]
        })
        const embedFields = interaction.message?.embeds?.[0]?.fields
        const messageUrl = embedFields?.find(x => x.name === "Challenge Message")?.value
        if (messageUrl) {
            const [guildId, channelId, messageId] = messageUrl.split("/").slice(-3)
            const guild = await interaction.client.guilds.fetch(guildId).catch(_ => undefined)
            const challenger = embedFields?.find(x => x.name === "Challenger")?.value
            if (challenger) {
                const userId = challenger.substring(2, challenger.length - 1)
                const user = await guild?.members.fetch(userId).catch(_ => undefined)
                if (user) {
                    await user.send({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`**Your wager with ${interaction.user} was accepted!**`)
                                .addFields(...(wagerMessage ? [{ name: "Message", value: `*${wagerMessage}*` }] : []))
                                .setColor("Green")
                        ]
                    })
                    const channel = await guild?.channels.fetch(channelId).catch(_ => undefined)
                    if (channel?.isTextBased()) {
                        const message = await channel.messages.fetch(messageId).catch(_ => undefined)
                        if (message) {
                            await message.reply({
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
