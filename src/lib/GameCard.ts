import { EmbedBuilder } from 'discord.js';
import Publisher from './Publishers/Publisher';

export default class {
    gameTitle: string;
    description: string;
    mainImage: string;
    publisher: Publisher;

    constructor(gameTitle: string, description: string, mainImage:string, publisher: Publisher ){
        this.gameTitle = gameTitle;
        this.description = description;
        this.mainImage = mainImage;
        this.publisher = publisher;
    }

    getEmbed() : EmbedBuilder{
        return new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(this.gameTitle)
        .setURL(this.publisher.url)
        .setAuthor({ name: this.publisher.name, iconURL: this.publisher.logo, url: this.publisher.url })
        .setDescription(this.description)
        .setThumbnail(this.publisher.logo)
        .setImage(this.mainImage)
        .setTimestamp()
    }
}