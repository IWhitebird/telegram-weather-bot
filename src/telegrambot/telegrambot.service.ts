import { Injectable } from '@nestjs/common';
const TelegramBot = require('node-telegram-bot-api');


@Injectable()
export class TelegrambotService {
    private bot : any;
    
    constructor() {

        this.bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });
        
        this.bot.onText(/\/start/, (msg : any) => {
            const keyboard = {
                inline_keyboard: [
                    [{ text: 'Subscribe', callback_data: 'yes' }],
                    [{ text: 'No', callback_data: 'no' }]
                ]
            };

            const chatId = msg.chat.id;
            this.bot.sendMessage(chatId, "Hi! I'm your Weather bot. Would you like to daily subscribe to weather updates?" ,
            {
                reply_markup: JSON.stringify(keyboard)
            });

        });

        this.bot.on('callback_query', (query) => {
            console.log(query)
            const chatId = query.message.chat.id;
            const data = query.data;
 
            if (data === 'yes') {
                this.subscribeToWeatherUpdates(chatId);  
            } else if (data === 'no') {
                this.bot.sendMessage(chatId, 'Oh, thats sad. You can always subscribe to our daily weather updates by typing /start');
            }
        });

        

    }


    askForLocation(chatId: string) {
        const locationRequest = {
            text: 'Please share your location with us so we can provide accurate weather updates.',
            chat_id: chatId,
            reply_markup: {
                keyboard: [[{ text: 'Share Location', request_location: true }]],
                one_time_keyboard: true,
            },
        };

        this.bot.sendMessage(chatId, locationRequest.text, {
            reply_markup: JSON.stringify(locationRequest.reply_markup)
        });

        this.bot.once('location', (msg : any) => {
            console.log(msg);
            const chatId = msg.chat.id;
            const lat = msg.location.latitude;
            const lon = msg.location.longitude;
    
            this.bot.sendMessage(chatId, `Thanks, we will provide weather updates for ${lat} ${lon}`);
        });
        
    }


    subscribeToWeatherUpdates(chatId: string) {
        this.askForLocation(chatId);

        this.bot.sendMessage(chatId, 'Great! Thanks for subscribing to our daily weather updates.');
    }
    
    sendMessage(chatId: string, message: string) {
        this.bot.sendMessage(chatId, message);
    }
}
