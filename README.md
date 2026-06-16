# Cat Bot

A Nerimity bot that sends random cat images and facts on demand.

## Features

- Fetch random cat images from [CATAAS](https://cataas.com)
- Get cat facts from [Cat Fact Ninja](https://catfact.ninja)
- Rate limiting: 1 cat per 10 seconds per user
- Interactive "Another?" button for quick requests

## Commands

- `!cat` or `/cat` - Get a random cat image with a cat fact

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file:
```env
NERIMITY_TOKEN=your_bot_token_here
```

3. Run the bot:
```bash
node index.js
```

## Rate Limiting

The bot enforces a rate limit of **1 cat per 10 seconds per user** to prevent API abuse on CATAAS. Users who exceed this limit will see a friendly reminder message.

## Dependencies

- `@nerimity/nerimity.js` - Nerimity bot SDK
- `axios` - HTTP requests
- `dotenv` - Environment variable management
