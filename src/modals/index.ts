import { ModalBuilder, ModalSubmitInteraction } from "discord.js"
import acceptWager from "./accept-wager"
import declineWager from "./decline-wager"

export type Modal = {
    data: ModalBuilder,
    execute(interaction: ModalSubmitInteraction): void | Promise<void>
}

export const modals: Modal[] = [
    acceptWager,
    declineWager
]

export const modalMap = new Map(modals.flatMap(modal =>
    "custom_id" in modal.data.data && modal.data.data.custom_id ?
        [[modal.data.data.custom_id, modal]] : []))

export const getModal = (customId: string) => modalMap.get(customId)
