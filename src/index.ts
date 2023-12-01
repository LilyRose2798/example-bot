import { Client, GatewayIntentBits} from "discord.js"
import { TOKEN } from "./env"
import { registerEvents } from "./events"
import { deployCommands } from "./deploy-commands"

const client = new Client({ intents: [GatewayIntentBits.Guilds] })
registerEvents(client)
deployCommands()
client.login(TOKEN)
