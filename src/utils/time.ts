export const createDiscordTimestamp = (timestamp: number, style: "d" | "D" | "t" | "T" | "f" | "F" | "R" = "F") =>
    `<t:${Math.trunc(timestamp / 1e3)}:${style}>`
