import { config } from "dotenv"

config()

const env = process.env

if (!env.TOKEN) throw new Error("Bot token not provided")
if (!env.CLIENT_ID) throw new Error("Bot client ID not provided")
if (!env.GUILD_ID) throw new Error("Bot guild ID not provided")
if (!env.CHALLENGE_CHANNEL_ID) throw new Error("Challenge channel ID not provided")

export const {
    TOKEN,
    CLIENT_ID,
    GUILD_ID,
    CHALLENGE_CHANNEL_ID,
} = env
