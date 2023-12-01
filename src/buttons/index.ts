import { ButtonBuilder, ButtonInteraction } from "discord.js"
import acceptWager from "./accept-wager"
import declineWager from "./decline-wager"

export type Button = {
    data: ButtonBuilder,
    execute(interaction: ButtonInteraction): void | Promise<void>
}

export const buttons: Button[] = [
    acceptWager,
    declineWager,
]

export const buttonMap = new Map(buttons.flatMap(button =>
    "custom_id" in button.data.data && button.data.data.custom_id ?
        [[button.data.data.custom_id, button]] : []))

export const getButton = (customId: string) => buttonMap.get(customId)
