// @og7oo - انزوكورد
require('dotenv').config()

module.exports = {
  token: process.env.TOKEN,
  guildId: process.env.GUILD_ID,
  language: (process.env.LANGUAGE || 'en').toLowerCase(),
  transcripts: process.env.TRANSCRIPTS !== 'false',
  status: 'discord.gg/ownr',
  color: 0x5865f2,
  cooldown: 10,
  maxTickets: 2
}
