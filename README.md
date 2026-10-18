# Ticket Bot Lite

A small, fast Discord ticket bot built for **one server**. No database to install: everything is saved in a single JSON file next to the bot.

[العربية](README.ar.md)

## What it does

- Ticket panel with a section menu (up to 25 sections, each with its own staff role)
- Claim, close, reopen and delete buttons inside every ticket
- HTML transcript saved to a log channel and sent to the ticket owner when a ticket is deleted
- Limit of open tickets per member, a short cooldown, and a blacklist
- `/add` and `/remove` to manage who can see a ticket
- English and Arabic interface
- Runs on almost nothing: two dependencies, no native modules

## Requirements

- Node.js 18 or newer
- A Discord bot token

## Setup

1. Create an application at the [Discord Developer Portal](https://discord.com/developers/applications), add a bot and copy its token.
2. On the **Bot** page, turn on **Message Content Intent** if you want transcripts to include message text. The bot still starts without it, the transcripts just won't have the text.
3. Invite the bot with this link (replace `YOUR_CLIENT_ID`):

   ```
   https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&scope=bot%20applications.commands&permissions=268553232
   ```

   The permissions in the link are Manage Channels, Manage Roles, View Channels, Send Messages, Embed Links, Attach Files and Read Message History.
4. Clone the project and install:

   ```
   git clone <your repo url>
   cd ticket-bot-lite
   npm install
   ```

5. Copy `.env.example` to `.env` and fill it in:

   ```
   TOKEN=your bot token
   GUILD_ID=id of your server
   LANGUAGE=en
   TRANSCRIPTS=true
   ```

   Turn on Developer Mode in Discord, right click your server and choose Copy Server ID to get the `GUILD_ID`. Use `LANGUAGE=ar` for Arabic.
6. Start it:

   ```
   npm start
   ```

The slash commands are registered in your server automatically every time the bot starts.

## First steps in Discord

1. `/section add` - create a section and choose its staff role. Add as many as you need.
2. `/config` - pick the category for tickets and a channel for logs. Running it with no options shows the current values.
3. `/setup` - run it in the channel where the panel should live.

## Commands

| Command | Who | What it does |
| --- | --- | --- |
| `/setup` | Manage Server | Sends the ticket panel in the current channel |
| `/section add / remove / list` | Manage Server | Manage the sections |
| `/config` | Manage Server | Category, log channel and max tickets per member |
| `/blacklist add / remove / list` | Manage Server | Block members from opening tickets |
| `/add` `/remove` | Staff | Add or remove a member in the current ticket |
| `/help` | Everyone | Short setup guide |

## Where the data lives

Everything is stored in `data/data.json`. To back the bot up or move it to another machine, copy that file. If the file ever gets corrupted the bot renames it to `data.json.broken-<time>` and starts clean instead of crashing.

## Notes

- The bot's status is set to "Playing discord.gg/ownr". You can change it in `config.js`.
- Cooldown and the default ticket limit are also in `config.js`.
- This bot is made for a single server. Commands and buttons are ignored anywhere else.

## License

MIT, see [LICENSE](LICENSE).

Made by og7oo - Enzocord. Support: discord.gg/ownr
