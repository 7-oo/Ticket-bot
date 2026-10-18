// @og7oo - انزوكورد
const { Client, GatewayIntentBits, ActivityType, Events } = require('discord.js')
const config = require('./config')
const store = require('./src/store')
const commands = require('./src/commands')
const onInteraction = require('./src/handler')

if (!config.token || !config.guildId) {
  console.error('TOKEN or GUILD_ID is missing. Copy .env.example to .env and fill it in.')
  process.exit(1)
}

function build(withContent) {
  const intents = [GatewayIntentBits.Guilds]
  if (withContent) intents.push(GatewayIntentBits.MessageContent)

  const client = new Client({
    intents,
    presence: {
      status: 'online',
      activities: [{ name: config.status, type: ActivityType.Playing }]
    }
  })

  client.once(Events.ClientReady, async () => {
    console.log(`Logged in as ${client.user.tag}`)

    const guild = await client.guilds.fetch(config.guildId).catch(() => null)
    if (!guild) {
      console.error('I am not in the server that GUILD_ID points to. Invite me there first.')
      process.exit(1)
    }

    await guild.commands.set(commands.payload())
    await guild.channels.fetch()

    for (const ticket of store.allTickets()) {
      if (!guild.channels.cache.has(ticket.channelId)) store.deleteTicket(ticket.channelId)
    }

    console.log('Ready')
  })

  client.on(Events.InteractionCreate, onInteraction)

  client.on(Events.ChannelDelete, channel => {
    if (store.ticket(channel.id)) store.deleteTicket(channel.id)
  })

  client.on(Events.Error, err => console.error(err))

  return client
}

async function start(withContent) {
  const client = build(withContent)
  try {
    await client.login(config.token)
  } catch (err) {
    client.destroy()
    if (withContent && err.code === 'DisallowedIntents') {
      console.warn('The Message Content intent is off in the developer portal, starting without it. Transcripts will not include message text.')
      return start(false)
    }
    console.error(`Login failed: ${err.message}`)
    process.exit(1)
  }
}

process.on('unhandledRejection', err => console.error(err))
process.on('SIGINT', () => process.exit(0))
process.on('SIGTERM', () => process.exit(0))

start(config.transcripts)
