const TelegramApi = require('node-telegram-bot-api')
const{gameOptions, againOption} = require('./options')
const token = '5437839039:AAF8BsFlgsYkDGdrX5HYKuIpyCRMSHn8Cuk'

const bot = new TelegramApi(token, {polling: true})

const chats = {}


const startGame = async (chatId) => {
    await bot.sendMessage(chatId, `Угадай сколько гранат при мне!`)
    await bot.sendSticker(chatId, 'https://cdn.tlgrm.app/stickers/67f/830/67f8300b-14e6-4bdb-803f-601ade34e95e/256/1.webp')
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Гадай', gameOptions)
}

const start = () => {
    bot.setMyCommands( [
        {command: '/start', description: 'Приветствие'},
        {command: '/info', description: 'Инфо о пользователе'},
        {command: '/game', description: 'гранаты'},
    ])

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        if (text === '/start') {
            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/67f/830/67f8300b-14e6-4bdb-803f-601ade34e95e/7.webp')
            return bot.sendMessage(chatId, `Привет от Джинск`);
        }
        if (text === '/info'){
            return bot.sendMessage(chatId, `Тебя дружок зовут ${msg.from.first_name} ${msg.from.last_name}`);
        }
        if (text === '/game'){
            return startGame(chatId)
        }
        return bot.sendMessage(chatId, 'Ты шо несешь!?')
    })

    bot.on('callback_query',  async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === '/again') {
            return startGame(chatId)
        }
        if (data === chats[chatId]) {
            await bot.sendSticker(chatId, 'https://cdn.tlgrm.app/stickers/67f/830/67f8300b-14e6-4bdb-803f-601ade34e95e/256/2.webp')
            return  bot.sendMessage(chatId, `Йоу, ты угадал сколько гранат дружок, их и правда ${chats[chatId]}`, againOption)
        } else {
            await bot.sendSticker(chatId, 'https://cdn.tlgrm.app/stickers/67f/830/67f8300b-14e6-4bdb-803f-601ade34e95e/256/3.webp')
            return bot.sendMessage(chatId, `Не дружок, не угадал, их ${chats[chatId]}`, againOption)
        }
    })
}

start()