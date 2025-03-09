# 🐈 catto-bot
 ❤️ Community managed anime, manga, manhwa suggestions and rating discord bot.
 
 📂 The bot uses `.json` files to store the community recomendations so the owner has to restart / reload the bot every once in a while for the bot to actually load new suggestions. I've added a command in the bot so that you can do it from within discord instead of actually going to the host panel. (It is an npm package so yeah.)
 
 ⚙️ You don't have to change many things as everything that you might wanna change is in the config file `src/data/settings/config.json`.
 
 🔗 Join our [discord](https://discord.gg/Mxvz53gdka) if you want any help with setting up or using the bot.
 
 > ⚠️ If you like the concept or wanna use the project for your own free use please give the repo a star.
 
 > ⚠️ I might make an updated version to fix the reload issue with an sql database so look out for it.

# ❓How to install
> Please follow the guide if you don't know how to run bot yourself.

## Step 1:
Download or clone the repository to your own system.

## Step 2:
create a `.env` file in the main directory.

inside the `.env` file enter in your `bot token` and `client id`.

```TOKEN = <your_bot_token>```

```CLIENT_ID = <client_id>```

## Step 3:
open a new cmd / terminal on the bot's main directory and run the command: `npm install`.

This install's all the necessary and required modules.

## Step 4:
now run the command: `npm run test`.

and your bot should be online.


# Usage Guide
> Follow the guide if you don't know how to use the bot.

## Config.json
This file contains all the configuration files for the bot.

Location: `src/data/settings/config.json`

You can edit anything in here without damaging the bot, you wont have to edit anything other than `owner id` and `bot status`.

Most of the things in here are for enabling and disabling commands and other things.

This file is essential for the bot to run properly so please do not delete this file.


# 📂 Commands
> Information about the onwer only commands.

- Ping
This is a test command so it just returns the bot latency and the api latency.
- Debug
This is where you can enable/ disable many commands or fetch guilds that your bot is in or reload the bot files and stuff.
- Say
This is just a fun utility command that I added so you can say stuff using the bot.

# 🌲Structure
I would say the file structure is easy to understand and navigate.

If you wanna add a new command just copy the `ping.js` file from the `src/commands/owner` section and then just delete whatever is not necessay and start coding.

If you wanna add components there are gonna be `test-<component_type>.js` file in the `src/components/<component_type>` folder so just copy it over and start adding whatever you wanna add.

**❤️ Hope you like the bot and if you do please star the repo and support me on youtube.**
