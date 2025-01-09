
const TelegramBot = require('node-telegram-bot-api')
const cron = require('node-cron')
const env = require('dotenv')
const express = require('express')

const app = express()
const PORT = process.env.PORT || 3000


env.config()
const messages = require('./series.json')

const TOKEN = process.env.BOT_TOKEN
const bot = new TelegramBot(TOKEN, {
    polling : true
})


app.get('/', (req, res) => {
    res.send('ABTech Bot is running')
})


let chatId = null
let clientName = null


// GENERATE THE RANDOM MESSAGE
const generateRandom = () => {
    const randomIndex = Math.floor(Math.random() * messages.length)
    return messages[randomIndex].message
}



// STARTING THE BOT
bot.onText(/\/start/, msg => {
    chatId = msg.chat.id
    clientName = msg.from.first_name
    const message = `
        ABTech welcomes You ${clientName}! 
        You'll Start Receiving a Message Every 7AM!
        Stay Connected!
    `
    bot.sendMessage(chatId, message)
})

// STARTING THE SCHEDULED MESSAGES
cron.schedule('0 7 * * *', () => {
    if(chatId){
        const randomText = generateRandom()
        bot.sendMessage(chatId, randomText)
        .then(() => {
            bot.sendMessage(chatId, `Have a Great Day Today ${clientName}`)
        })
        .catch(error => {
            console.error('Encountered an error of the type ' + error)
        })
    }else{
        console.log('No user has started the BOT')
    }
})

console.log('Bot has started and it is currently Running');




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    
})

































// bot.onText(/\/start/, msg => {
//     const chatId = msg.chat.id
//     const message = `
//         ABTech welcomes You! Here are the commands available for you:
//         /help - Get help with interacting with the bot
//         /info - Get info about the bot
//         /games - Play fun games
//         /options - See available options for you    
//     `
//     bot.sendMessage(chatId, message)
// })



// STARTING THE HELP
// bot.onText(/\/help/, msg => {
//     const chatId = msg.chat.id
//     let message = `
//         ABTech welcomes You! Please read through the help available for you:
//         This bot allows you to lorem and ipsum. 
//         You're welcome to question my existence
//     `
//     bot.sendMessage(chatId, message)
// })

// STARTING THE HELP
// bot.onText(/\/info/, msg => {
//     const chatId = msg.chat.id
//     let message = `
//        This Telegram Bot is created by ABTech
//     `
//     bot.sendMessage(chatId, message)
// })

// STARTING THE HELP
// bot.onText(/\/games/, msg => {
//     const chatId = msg.chat.id
//     let message = `
//        ABTech says, let's play a game together, how do you want it played
//     `
//     bot.sendMessage(chatId, message)
// })