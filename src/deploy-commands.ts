import { REST, Routes } from "discord.js"
import { commands } from "./commands"
import { CLIENT_ID, GUILD_ID, TOKEN } from "./env"

const rest = new REST().setToken(TOKEN)

export const deployCommands = async (global = false) => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`)
        const data = await rest.put(
            global ? Routes.applicationCommands(CLIENT_ID) : Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            { body: commands.map(command => command.data.toJSON()) },
        ) as any[]
        console.log(`Successfully reloaded ${data.length} application (/) commands.`)
    } catch (error) {
        console.error(error)
    }
}
