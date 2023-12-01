import { ButtonBuilder, ButtonInteraction, ButtonStyle } from "discord.js"
import declineWager from "../modals/decline-wager"

export default {
    data: new ButtonBuilder()
        .setCustomId("decline-wager")
        .setLabel("Decline")
        .setStyle(ButtonStyle.Danger),
    async execute(interaction: ButtonInteraction) {
        await interaction.showModal(declineWager.data)
    }
}
