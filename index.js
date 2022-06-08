const TelegramApi = require('node-telegram-bot-api')
const{gameOptions, againOption} = require('./options')
const{MusicOption} = require('./Music')
const{ScorpionsOption, CrueOption, CdOption, Back} = require('./MUSICPLAY')
const sequelize = require('./db')
const token = '5437839039:AAF8BsFlgsYkDGdrX5HYKuIpyCRMSHn8Cuk'
const UserModel = require('./models')
const bot = new TelegramApi(token, {polling: true})

const chats = {}

const MusicVibor = async (chatId) => {
    return bot.sendMessage(chatId, 'Выбирай группу', MusicOption)
}
const Scorp = async (chatId) => {
    await bot.sendPhoto(chatId, './Scorpions.jpg')
    await bot.sendMessage(chatId, 'Rock Believer — девятнадцатый студийный альбом немецкой рок-группы Scorpions, вышедший 25 февраля 2022 года', ScorpionsOption)
    await bot.sendMessage(chatId,"Перейти обратно к списку", Back)
}
const Scorpions = async (chatId) => {
    await bot.sendMessage(chatId, 'Loading...')
    await bot.sendAudio(chatId, './Rock Believer.mp3')
}
const Crue = async (chatId) => {
    await bot.sendPhoto(chatId, './Too_Fast.jpg')
    await bot.sendMessage(chatId, 'Too Fast for Love — дебютный студийный альбом американской глем-метал-группы Mötley Crüe. 10 ноября 1981 г.', CrueOption )
    await bot.sendMessage(chatId,"Перейти обратно к списку", Back)
}

const Motley = async (chatId) => {
    await bot.sendMessage(chatId, 'Loading...')
    await bot.sendAudio(chatId, './motley-crue-live-wire.mp3')
}

const DCAC = async (chatId) => {
    await bot.sendPhoto(chatId, './The_Razor_Edge.jpg')
    await bot.sendMessage(chatId, 'The Razor’s Edge — двенадцатый студийный альбом австралийской хард-рок-группы AC/DC, выпущенный 21 сентября 1990 года. ', CdOption )
    await bot.sendMessage(chatId,"Перейти обратно к списку", Back)
}
const ACDC = async (chatId) => {
    await bot.sendMessage(chatId, 'Loading...')
    await bot.sendAudio(chatId, './AC DC - Thunderstruck.mp3')
}

const NetGame = async (chatId) => {
    await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/67f/830/67f8300b-14e6-4bdb-803f-601ade34e95e/8.webp')
    await bot.sendMessage(chatId, 'Ну ладно')
}
const startGame = async (chatId) => {
    await bot.sendMessage(chatId, `Угадай сколько гранат при мне!`)
    await bot.sendSticker(chatId, 'https://cdn.tlgrm.app/stickers/67f/830/67f8300b-14e6-4bdb-803f-601ade34e95e/256/1.webp')
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Гадай', gameOptions)
}

const start = async () => {

    try {
        await sequelize.authenticate()
        await sequelize.sync()
    } catch (e) {
        console.log('бд НЕ ПОДКЛЮЧИЛОСЬ', e)
    }


    bot.setMyCommands([
        {command: '/start', description: 'Приветствие'},
        {command: '/info', description: 'Инфо о пользователе'},
        {command: '/game', description: 'гранаты'},
        {command: '/music', description: 'Музыка'},
        {command: '/boosty', description: 'Подпишись'},
        {command: '/patreon', description: 'Подпишись'},
    ])

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        try {
            if (text === '/start') {

                await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/67f/830/67f8300b-14e6-4bdb-803f-601ade34e95e/7.webp')
                return bot.sendMessage(chatId, `Привет от Джинск`);
            }
            if (text === '/help') {
                return bot.sendMessage(
                    chatId, ` Список доступных команд:      
                Начало - /start 
                Информация о тебе - /info 
                Мини-игра - /game 
                Музыка - /music 
                Патрон - /patreon 
                Бусти - /boosty`)
            }
            if (text === '/music') {
                return MusicVibor(chatId)
            }
            if (text === '/info') {

                return bot.sendMessage(chatId, `Тебя дружок зовут ${msg.from.first_name} ${msg.from.last_name}, `);
            }
            if (text === '/game') {
                const user = await UserModel.findOne({chatId})
                await bot.sendMessage(chatId, `Правильных ответов ${user.right}, неправильных ${user.wrong}`)
                return startGame(chatId)
            }
            if (text === '/boosty') {
                return bot.sendMessage(chatId, `boosty.to/Koffman`)
            }
            if (text === '/patreon') {
                return bot.sendMessage(chatId, `patreon.com/Koffman`)
            }

            return bot.sendMessage(chatId, 'Ты шо несешь!? Обратись к /help или используй "меню" ниже.')
        } catch (e) {
            return bot.sendMessage(chatId, 'Произошла ошибка');
        }


    })

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === '/again') {
            return startGame(chatId)
        }
        if (data === '/net') {
            return NetGame(chatId)
        }
        if (data === '/scorpions') {
            return Scorp(chatId)
        }
        if (data === '/scorp') {
            return Scorpions(chatId)
        }
        if (data === '/motley') {
            return Crue(chatId)
        }
        if (data === '/crue') {
            return Motley(chatId)
        }
        if (data === '/acdc') {
            return DCAC(chatId)
        }
        if (data === '/cd') {
            return ACDC(chatId)
        }
        if (data === '/back') {
            return MusicVibor(chatId)
        }
        const user = await UserModel.findOne({chatId})

        if (data == chats[chatId]) {
            user.right += 1;
            await bot.sendSticker(chatId, 'https://cdn.tlgrm.app/stickers/67f/830/67f8300b-14e6-4bdb-803f-601ade34e95e/256/2.webp')
            await bot.sendMessage(chatId, `Йоу, ты угадал сколько гранат дружок, их и правда ${chats[chatId]}`, againOption)
        } else {
            user.wrong += 1;
            await bot.sendSticker(chatId, 'https://cdn.tlgrm.app/stickers/67f/830/67f8300b-14e6-4bdb-803f-601ade34e95e/256/3.webp')
            await bot.sendMessage(chatId, `Не дружок, не угадал, их ${chats[chatId]}`, againOption)
        }
        await user.save();
    })


}
// hbh
start()