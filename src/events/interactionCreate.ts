import { Events, BaseInteraction } from "discord.js"
import { getCommand } from "../commands"
import { getButton } from "../buttons"
import { getModal } from "../modals"

const errorMessage = { content: "An error has occurred!", ephemeral: true }

export default {
    name: Events.InteractionCreate as const,
    async execute(interaction: BaseInteraction) {
		if (interaction.isChatInputCommand()) {
			const command = getCommand(interaction.commandName)
			if (!command) {
				console.error(`No command matching ${interaction.commandName} was found.`)
				return
			}
			try {
				await command.execute(interaction)
				console.log(`Command /${interaction.commandName} run by ${interaction.user.tag} at ${interaction.createdAt}`)
			} catch (error) {
				console.error(error)
				if (interaction.replied || interaction.deferred) await interaction.followUp(errorMessage)
				else await interaction.reply(errorMessage)
			}
		} else if (interaction.isButton()) {
			const button = getButton(interaction.customId)
			if (!button) {
				console.error(`No button matching ${interaction.customId} was found.`)
				return
			}
			try {
				await button.execute(interaction)
				console.log(`Button ${interaction.customId} clicked by ${interaction.user.tag} at ${interaction.createdAt}`)
			} catch (error) {
				console.error(error)
				if (interaction.replied || interaction.deferred) await interaction.followUp(errorMessage)
				else await interaction.reply(errorMessage)
			}
		} else if (interaction.isModalSubmit()) {
			const modal = getModal(interaction.customId)
			if (!modal) {
				console.error(`No modal matching ${interaction.customId} was found.`)
				return
			}
			try {
				await modal.execute(interaction)
				console.log(`Modal ${interaction.customId} submitted by ${interaction.user.tag} at ${interaction.createdAt}`)
			} catch (error) {
				console.error(error)
				if (interaction.replied || interaction.deferred) await interaction.followUp(errorMessage)
				else await interaction.reply(errorMessage)
			}
		}
	},
}
