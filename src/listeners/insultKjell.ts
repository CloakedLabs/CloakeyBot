import { Client } from "discord.js";

export default (client: Client): void => {
    client.on('messageCreate', message => {
        if (message.content.includes("kjell?")) {
            message.reply('die jonge is niet normaal mogool');
        }
    });
}; 