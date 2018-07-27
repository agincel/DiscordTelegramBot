# Discord & Telegram Bot
This is a Node.js application framework designed to create a hybrid Discord and Telegram bot. The sending and recieving logic from each platform is abstracted, allowing you to write your logic a single time, in response to sending/recieving from either platform.

## Setup
Running `npm install` will install both the `discord.js` and `node-telegram-bot-api` libraries. It will also install `fs`, which is used to read token info in from `tokens.json`.

Create a Discord Bot User, and a Telegram Bot, and populate both of their tokens into `tokens.json`, and then run the program with `node index.js`. The program will sign into both instances and start listening for messages on both platforms.

## Prefixes
Command prefixes can differ by platform. By default, Telegram wants all bot commands to be prefixed with a `/`. Discord, however, reserves `/` commands for built in client commands. By default, the framework will listen for `/` prefixed commands on Telegram, and `=` prefixed commands on Discord. This can be changed by modifying `prefix.json`.
