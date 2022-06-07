module.exports = {
    MusicOption: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'Scorpions', callback_data: '/scorpions'}],
                [{text: 'Motley Crue', callback_data: '/motley'}],
                [{text: 'AC/DC', callback_data: '/acdc'}],

            ]
        })
    }
}