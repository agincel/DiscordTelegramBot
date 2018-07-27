/*
    Discord & Telegram Bot 
    Adam Gincel - 2018
*/

const fs = require("fs");

const tokens = JSON.parse(fs.readFileSync("./tokens.json", "utf8"));

const Telegram = require('node-telegram-bot-api'); //telegram
const TelegramBot = new Telegram(tokens.telegram, {polling: true});

const Discord = require("discord.js"); //discord
const DiscordBot = new Discord.Client();

const startDate = new Date(); //use to ignore all old messages

//imports
const commands = require("./commands");

async function handleMessage(text, args, platformObject) {
    //sends all of the information plus references to the two bots to our command handler
    //this can be further abstracted to multiple command handlers if desired
    await commands.handle(text, args, platformObject, {telegram: TelegramBot, discord: DiscordBot});
}





DiscordBot.login(tokens.discord);
DiscordBot.on('ready', () => {
    console.log(`Discord is logged in as ${DiscordBot.user.tag}!`);
});


DiscordBot.on('message', async (message) => {
    if (new Date(message.createdTimestamp) > startDate) {
        console.log("Got a discord message: " + message.content);

        //populate object with Discord information
        let platformObject = {
            platform: "discord",
            userID: message.author.id,
            message: message,
            chatID: null
        }

        //Used to determine command and parameters
        let args = message.content.toLowerCase().split(" ");

        return await handleMessage(message.content, args, platformObject);
    } else {
        console.log("Skipping discord message: " + message.content);
        return null;
    }
});

TelegramBot.on('message', async (message) => {
    if (new Date(message.date * 1000) > startDate && message.text) {
        console.log("Got a telegram message: " + message.text);

        //populate object with Telegram information
        let platformObject = {
            platform: "telegram",
            userID: message.from.id,
            message: message,
            chatID: message.chat.id
        }

        //Used to determine command and parameters
        let args = message.text.toLowerCase().split(" ");
        if (args[0].indexOf("@") > -1) {
            args[0] = args[0].split("@")[0]; //change /command@BotUserName to /command, really should check for equality with username
        }

        return await handleMessage(message.text, args, platformObject);
    } else if (message.text) {
        console.log("Skipping telegram message: " + message.text);
        return null;
    }
});