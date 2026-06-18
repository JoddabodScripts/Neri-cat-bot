# Cat Bot

A delightful Nerimity bot that brings joy to your server with random cat images and fascinating cat facts on demand.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)](https://nodejs.org/)
[![Nerimity](https://img.shields.io/badge/Nerimity-Bot-blue)](https://nerimity.com/)

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Commands](#commands)
- [Rate Limiting](#rate-limiting)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

## Features

- **Random Cat Images** - Fetches adorable cat images from [CATAAS](https://cataas.com)
- **Cat Facts** - Delivers interesting cat facts from [Cat Fact Ninja](https://catfact.ninja)
- **Smart Rate Limiting** - Prevents API abuse with 1 cat per 10 seconds per user
- **Interactive Buttons** - Quick "Another?" button for seamless cat requests
- **Error Handling** - Robust error management for reliable operation

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.0.0 or higher)
- **npm** (comes with Node.js)
- A **Nerimity account** and bot token

## Installation

1. **Clone the repository**
 ```bash
 git clone https://github.com/JoddabodScripts/Neri-cat-bot.git
 cd Neri-cat-bot
 ```

2. **Install dependencies**
 ```bash
 npm install
 ```

3. **Set up environment variables**
 ```bash
 cp .env.example .env
 ```

4. **Configure your bot token** (see [Configuration](#configuration) section)

## Configuration

1. Open the `.env` file in your favorite text editor
2. Add your Nerimity bot token:
 ```env
 NERIMITY_TOKEN=your_bot_token_here
 ```

### Getting Your Bot Token

1. Visit [Nerimity](https://nerimity.com/)
2. Navigate to the developer portal or bot settings
3. Create a new bot or select an existing one
4. Copy the bot token
5. Paste it into your `.env` file

** Security Warning**: Never commit your `.env` file or share your bot token publicly!

## Usage

### Starting the Bot

**Production mode:**
```bash
npm start
```
or
```bash
node index.js
```

**Development mode:**
```bash
npm run dev
```

The bot will connect to Nerimity and start listening for commands. You should see a confirmation message in the console when the bot is ready.

### Example Interaction

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
| `!cat` | `/cat` | Fetches a random cat image along with an interesting cat fact |

### Command Details

- **Prefix**: Commands can be triggered with `!` or `/`
- **Case Sensitive**: Commands are case-sensitive (use lowercase)
- **Cooldown**: 10 seconds per user between requests

## ⏱ Rate Limiting

The bot implements user-specific rate limiting to ensure fair usage and prevent API abuse:

- **Limit**: 1 cat request per 10 seconds per user
- **Scope**: Per-user (doesn't affect other users)
- **Feedback**: Users who exceed the limit receive a friendly reminder message
- **Purpose**: Protects external APIs (CATAAS) from excessive requests

## Dependencies

This project uses the following packages:

- **[@nerimity/nerimity.js](https://www.npmjs.com/package/@nerimity/nerimity.js)** (^1.0.0) - Official Nerimity bot SDK
- **[axios](https://www.npmjs.com/package/axios)** (^1.6.0) - Promise-based HTTP client for API requests
- **[dotenv](https://www.npmjs.com/package/dotenv)** (^16.0.0) - Environment variable management
- **[form-data](https://www.npmjs.com/package/form-data)** (^4.0.0) - Multipart form data handling

## Contributing

We welcome contributions from the community! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) file for detailed guidelines on:

- Code of conduct
- How to submit issues
- How to create pull requests
- Coding standards and style guide
- Development setup

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions:

- **Issues**: Open an issue on [GitHub Issues](https://github.com/JoddabodScripts/Neri-cat-bot/issues)
- **Discussions**: Join the conversation in [GitHub Discussions](https://github.com/JoddabodScripts/Neri-cat-bot/discussions)

## Acknowledgments

- [CATAAS](https://cataas.com) - For providing the cat images API
- [Cat Fact Ninja](https://catfact.ninja) - For the cat facts API
- [Nerimity](https://nerimity.com/) - For the excellent bot platform

## Project Status

This project is actively maintained. Last updated: June 2026

---

Made with for cat lovers everywhere 