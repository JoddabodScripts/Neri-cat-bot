# Cat Bot

A Nerimity bot that posts random cat images and cat facts on demand.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)](https://nodejs.org/)
[![Nerimity](https://img.shields.io/badge/Nerimity-Bot-blue)](https://nerimity.com/)

## Table of contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Commands](#commands)
- [Rate limiting](#rate-limiting)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

## Features

- Random cat images from [CATAAS](https://cataas.com)
- Cat facts from [Cat Fact Ninja](https://catfact.ninja)
- Rate limiting at 1 request per 10 seconds per user
- An "Another?" button for follow-up requests without retyping the command
- Errors are caught in the message handler so a bad API response doesn't crash the bot

## Prerequisites

- Node.js v14.0.0 or higher
- npm (comes with Node.js)
- A Nerimity account and bot token

## Installation

1. Clone the repository
 ```bash
 git clone https://github.com/JoddabodScripts/Neri-cat-bot.git
 cd Neri-cat-bot
 ```

2. Install dependencies
 ```bash
 npm install
 ```

3. Set up environment variables
 ```bash
 cp .env.example .env
 ```

4. Add your bot token (see [Configuration](#configuration))

## Configuration

Open `.env` and add your Nerimity bot token:

```env
NERIMITY_TOKEN=your_bot_token_here
```

### Getting your bot token

1. Visit [Nerimity](https://nerimity.com/)
2. Open the developer portal or bot settings
3. Create a new bot or select an existing one
4. Copy the bot token into `.env`

Don't commit `.env` or share the token. Anyone with it can control the bot.

## Usage

### Starting the bot

Production:
```bash
npm start
```
or
```bash
node index.js
```

Development:
```bash
npm run dev
```

The console prints a confirmation message once the bot connects to Nerimity.

### Example interaction

```
User: !cat
Bot: [Displays a random cat image with a cat fact]
 [Shows "Another?" button]

User: [Clicks "Another?" button]
Bot: [Displays another random cat image with a new cat fact]
```

## Commands

| Command | Alias | Description |
|---------|-------|-------------|
| `!cat` | `/cat` | Fetches a random cat image along with a cat fact |

Commands trigger on either `!` or `/`, are case-sensitive (lowercase only), and share the 10-second cooldown below.

## Rate limiting

Each user is limited to 1 cat request per 10 seconds. The limit is per-user, so it doesn't affect other people in the server. Requesting too fast gets you a reminder message instead of a response. This exists to keep CATAAS from getting hammered by repeat requests.

## Dependencies

- [@nerimity/nerimity.js](https://www.npmjs.com/package/@nerimity/nerimity.js) (^1.0.0) - Nerimity bot SDK
- [axios](https://www.npmjs.com/package/axios) (^1.6.0) - HTTP client for API requests
- [dotenv](https://www.npmjs.com/package/dotenv) (^16.0.0) - Environment variable management
- [form-data](https://www.npmjs.com/package/form-data) (^4.0.0) - Multipart form data handling

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for the code of conduct, issue and PR process, coding style, and dev setup.

## License

MIT. See [LICENSE](LICENSE).

## Support

- Issues: [GitHub Issues](https://github.com/JoddabodScripts/Neri-cat-bot/issues)
- Discussions: [GitHub Discussions](https://github.com/JoddabodScripts/Neri-cat-bot/discussions)

## Acknowledgments

- [CATAAS](https://cataas.com) for the cat images API
- [Cat Fact Ninja](https://catfact.ninja) for the cat facts API
- [Nerimity](https://nerimity.com/) for the bot platform
