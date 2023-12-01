import { Client, ClientEvents } from "discord.js"
import interactionCreate from "./interactionCreate"

export type Event<T extends keyof ClientEvents> = {
    name: T,
    once?: boolean,
    execute(...args: ClientEvents[T]): void | Promise<void>
}

export type AnyEvent = { [K in keyof ClientEvents]: Event<K> }[keyof ClientEvents]

export const events: AnyEvent[] = [interactionCreate]

export const registerEvents = (client: Client) =>
    events.forEach(<T extends keyof ClientEvents>(event: Event<T>) => 
        event?.once ? client.once(event.name, event.execute) : client.on(event.name, event.execute))
