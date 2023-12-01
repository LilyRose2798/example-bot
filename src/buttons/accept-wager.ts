import { ButtonBuilder, ButtonInteraction, ButtonStyle } from "discord.js"
import acceptWager from "../modals/accept-wager"

export default {
    data: new ButtonBuilder()
        .setCustomId("accept-wager")
        .setLabel("Accept")
        .setStyle(ButtonStyle.Success),
    async execute(interaction: ButtonInteraction) {
        await interaction.showModal(acceptWager.data)
    }
}
