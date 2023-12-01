import { ActionRowBuilder, ButtonBuilder, SlashCommandBuilder, EmbedBuilder, CommandInteraction, Message } from "discord.js"
import acceptWager from "../buttons/accept-wager"
import declineWager from "../buttons/decline-wager"
import { CHALLENGE_CHANNEL_ID } from "../env"

export default {
    data: new SlashCommandBuilder()
        .setName("challenge")
        .setDescription("Challenge someone to wager.")
        .addUserOption(option =>
            option.setName("user")
                .setDescription("The user to challenge.")
                .setRequired(true))
        .addBooleanOption(option =>
            option.setName("ephemeral")
                .setDescription("Keep this challenge private.")),
    async execute(interaction: CommandInteraction) {
        const user = interaction.options.getUser("user")
        if (user?.id === interaction.user.id) {
            await interaction.reply({ content: `**You cannot challenge yourself!**`, ephemeral: true })
            return
        }

        let message: Message | undefined = undefined

        if (interaction.options.get("ephemeral")?.value)
            await interaction.reply({ content: `**${user} has been challenged!**`, ephemeral: true })
        else {
            await interaction.reply({ content: "**Challenge Declared!**", ephemeral: true })

            const channel = interaction.guild?.channels.cache.get(CHALLENGE_CHANNEL_ID)

            if (channel?.isTextBased()) {
                message = await channel.send({ 
                    embeds: [
                        new EmbedBuilder()
                            .setAuthor({
                                name: interaction.user.displayName,
                                iconURL: interaction.user.displayAvatarURL()
                            })
                            .setDescription(`**${user} has been challenged to a wager by ${interaction.user}!**`)
                            .setColor("Green")
                    ]
                })
                await message.react("✅")
            }
        }

        await user?.send({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`# WAGER CHALLENGE`)
                    .addFields(
                        { name: "Challenger", value: `${interaction.user}` },
                        ...(message ? [{ name: "Challenge Message", value: message.url }] : []),
                        { name: "Information", value: `Hello! You have been challenged to a "Fortnite" wager by ${interaction.user}! Please heed the below references before continuing consideration.` },
                        { name: "*Server* Guidelines", value: `https://discord.com/channels/1177411860685934734/1178765706955853957` },
                        { name: "*Server* Terms of Service", value: `https://discord.com/channels/1177411860685934734/1178772046201753691/1178784115361861803` },
                        { name: "*Wager* Terms of Service", value: `On behalf of the staff of the server, we are respectfully not responsible for any unforeseen misconduct. Additionally, we are not the distributors of any prized money and are unnacountable for any unforseen loss of money. The middleman is to earn 10% of the prize money. If, at any circumstance, there is an unforeseen incident in which the money is unfairly distributed and/or lost, then appropriate action will be performed to resolve the financial matter(s) and accommodate all recipients. However, we are not to be solely responsible for the unfortunate circumstance. Thank you for your understanding, and please do feel free to report any violations. Thank you.` },
                        { name: "Continuation", value: `If you wish to accept this wager, then please click on the acceptance button below. After doing so, you and your opponent may come to a consensus on which game-mode you two are to wager upon. Afterward, you two will be selected a middleman to request a specific middleman, alert us via https://discord.com/channels/1177411860685934734/1178786489488920697. You are to send your agreed-upon amount of wager currency to the middleman, and he/she is to take 10% of the prize. If you wish to decline this wager request, then please click on the declination button below. Thank you.` },
                    )
                    .setColor("Green")
            ],
            components: [new ActionRowBuilder<ButtonBuilder>().addComponents(acceptWager.data, declineWager.data)]
        })
    }
}
