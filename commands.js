/*
    commands.js

    Includes event handlers and message sending methods for both Discord and Telegram.
    (C) Adam Gincel 2018
*/


async function genericSendMessage(text, platformObject, bots) {
    if (platformObject.platform == "telegram") {
        return await bots.telegram.sendMessage(platformObject.chatID, text, {parse_mode: "Markdown"});
    } else {
        return await platformObject.message.channel.send(text);
    }
}

async function genericEditMessage(text, platformObject, messageToEdit, bots) {
    if (platform == "telegram") {
        return await bots.telegram.editMessageText(text, {chat_id: parameters.chatId, message_id: platformObject.message.message_id, parse_mode: "Markdown"});
    } else {
        return await platformObject.message.edit(text);
    }
}

async function handle(text, args, platformObject, bots) {
    //passthrough functions so you don't have to send platformObject and bots each and every time
    async function sendMessage (messageText) {
        return await genericSendMessage(messageText, platformObject, bots);
    }
    async function editMessage(newText, messageToEdit) {
        return await genericEditMessage(newText, platformObject, messageToEdit, bots);
    }


    //command replies
    if (args[0] == "/ping") {
        return await sendMessage("Hello, I am online.");
    } else if (args[0] == "/edittest") {
        let messageToEdit = await sendMessage("Hi, you shouldn't see this text for long.");
        return await editMessage("You should see this message!", messageToEdit);
    }
}

module.exports.handle = handle;