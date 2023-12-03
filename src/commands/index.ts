import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"
import challenge from "./challenge"

export type Command = {
    data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">,
    execute(interaction: ChatInputCommandInteraction): void | Promise<void>
}

export const commands: Command[] = [challenge]

export const commandMap = new Map(commands.map(command => [command.data.name, command]))

export const getCommand = (commandName: string) => commandMap.get(commandName)
