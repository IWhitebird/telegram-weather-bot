import { Injectable } from '@nestjs/common';
const TelegramBot = require('node-telegram-bot-api');
const request = require('request')

@Injectable()
export class TelegrambotService {
    private bot : any;
    constructor() {

        this.bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });


        this.bot.onText(/\/help/, (msg : any) => {
            const chatId = msg.chat.id;
            this.bot.sendMessage(chatId, 
`I'm your Weather bot. I can provide you with daily weather updates. 
/start - to start the subscription process
/unsubscribe - to unsubscribe from weather updates
/update - to update your location
/help - to see this message again
`);
          });


        this.bot.onText(/\/start/, (msg : any) => {
            const keyboard = {
                inline_keyboard: [
                    [{ text: 'Subscribe', callback_data: 'yes'}],
                    [{ text: 'No', callback_data: 'no' }]
                ]
            };

            const chatId = msg.chat.id;
            this.bot.sendMessage(chatId, "Hi! I'm your Weather bot. Would you like to daily subscribe to weather updates?" ,
            {
                reply_markup: JSON.stringify(keyboard)
            });

        });

        this.bot.on('callback_query', (query : any) => {
            const chatId = query.message.chat.id;
            const data = query.data;
 
            if (data === 'yes') {
                
                this.subscribeToWeatherUpdates(query);
                
            } else if (data === 'no') {
                this.bot.sendMessage(chatId, 'Oh, thats sad. You can always subscribe to our daily weather updates by typing /subscribe and /start for more commands');
            }
        });


    }
    
    subscribeToWeatherUpdates(query : any) {
        
        const chatId = query.message.chat.id;
        this.askForLocation(chatId)
    }
    
    askForLocation(chatId : string) : any {
        const locationRequest = {
            text: 'Please share your location with me',
            reply_markup: {
                resize_keyboard: true,
                one_time_keyboard: true,
                keyboard: [
                    [
                        {
                            text: 'Share Location',
                            request_location: true
                        }
                    ],
                ],
            }
        };
    
        this.bot.sendMessage(chatId, locationRequest.text, {
            reply_markup: JSON.stringify(locationRequest.reply_markup)
        }).then(() => {
            this.bot.once('location', (msg : any) => {
                const userChatId = msg.chat.id;

                const hideKeyboard = {
                    remove_keyboard: true,
                };
                this.bot.sendMessage(userChatId,`Thanks for sharing your location...`, {
                    reply_markup: JSON.stringify(hideKeyboard)
                });

                console.log(msg)

                const lat = msg.location.latitude;
                const lon = msg.location.longitude;

                const query = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEAPTHER_AP_KEY}`;
                console.log(query)

                request(query, (error, response, body) => {
                    if (!error && response.statusCode == 200) {
                        const res = JSON.parse(body);
                        const temp = Math.round(res.main.temp - 273.15);
                        const pressure = Math.round(res.main.pressure - 1013.15);
                        const rise = new Date(res.sys.sunrise * 1000);
                        const set = new Date(res.sys.sunset * 1000);

                        const weatherInfo = `
@@@@ ${res.name} @@@@ \n
Temperature: ${temp}°C
Humidity: ${res.main.humidity}%
Weather: ${res.weather[0].description}
Pressure: ${pressure} atm
Sunrise: ${rise.toLocaleTimeString()}
Sunset: ${set.toLocaleTimeString()}
Country: ${res.sys.country}
`;

                        this.bot.sendMessage(chatId, weatherInfo, { parse_mode: "Markdown" });
                        
                    } else {
                        console.error('Error fetching weather data:', error);
                    }
                });
            });

        }).catch((error , reject) => {
            console.error('Error sending location request:', error);
            reject(error);
        });
    }

}


//`https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=${process.env.WEATHER_API_KEY}`