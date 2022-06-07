module.exports = {
    CdOption: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'Thunderstruck', callback_data: '/cd'}],


            ]
        })
    },

    CrueOption: {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: 'Live Wire', callback_data: '/crue'}],


                ]
            })
        },

        ScorpionsOption: {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: 'Rock Believer', callback_data: '/scorp'}],


                ]
            })
        },
        Back: {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: 'Назад', callback_data: '/back'}],
                ]
            })
        }
}