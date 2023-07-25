const { Telegraf } = require('telegraf');
const axios = require('axios'); // Import the axios module

const bot = new Telegraf('6513993484:AAFH2uH3NDNCVb59dDvwnskDUTlbtqB6rAM');

const giphyApiKey = 'n4maxbUjsrsuTCYdWmHDyvfzsPch4osY';

bot.start((ctx) => ctx.reply('Welcome to this bot from prince varshney'));

// Command to fetch and reply with a GIF based on the provided keyword
bot.command('gif', async (ctx) => {
  const keyword = ctx.message.text.split(' ').slice(1).join(' ');
  console.log(keyword);  
  if (!keyword) {
    ctx.reply("Please provide a keyword to search for a GIF.");
    return;
  }

  try {
    const response = await axios.get(`https://api.giphy.com/v1/gifs/random`, {
      params: {
        api_key: giphyApiKey,
        tag: encodeURIComponent(keyword)
      }
    });

    const data = response.data;
    if (data.data && data.data.images && data.data.images.original && data.data.images.original.url) {
      ctx.replyWithDocument(data.data.images.original.url);
    } else {
      ctx.reply("Sorry, I couldn't find a GIF for that keyword.");
    }
  } catch (error) {
    console.error(error);
    ctx.reply("An error occurred while fetching the GIF. Please try again later.");
  }
});

bot.launch();
