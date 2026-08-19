# Cat Bot - AI agent reference

## Overview
A Nerimity chat bot that responds to `!cat` or `/cat` with a random cat fact and image from the CATAAS API. Built with Node.js using the @nerimity/nerimity.js SDK.

## Project type and stack
- Language: JavaScript (Node.js)
- Framework: @nerimity/nerimity.js (Nerimity bot SDK)
- Package manager: npm
- Runtime: Node.js, no build step

## Directory structure
```
.
├── index.js              # Main bot entry point
├── index.js.bak          # Backup with local cat facts array
├── package.json          # Dependencies and scripts
├── package-lock.json     # Locked dependency versions
├── .env                  # Bot token (DO NOT COMMIT)
├── .env.example          # Template for .env
├── bot.log               # Runtime logs
└── cats/                 # Sample cat images
    ├── cat surprised.webp
    └── funny cat.webp
```

## Entry points
- `index.js` - bot initialization and message handler

## Key files
- `index.js` - current bot implementation, uses CATAAS for facts and images
- `index.js.bak` - previous version with a hardcoded cat facts array (50+ facts) and local image support
- `package.json` - npm configuration and start scripts
- `.env` - contains `NERIMITY_TOKEN` for bot authentication, gitignored
- `.env.example` - template showing required environment variables
- `cats/` - sample cat images in webp format, not used by the active bot

## Architecture
Single-file, event-driven:
1. Bot authenticates with the Nerimity token
2. Listens for `MessageCreate` events
3. Detects `!cat` or `/cat`
4. Fetches a cat fact from catfact.ninja
5. Fetches a cat image URL from CATAAS (JSON endpoint)
6. Replies with the fact and image URL

### Bot flow
```
User sends !cat/cat
  → Event: MessageCreate
    → getCatFact() → catfact.ninja/fact
    → axios.get(cataas.com/cat) → JSON with image URL
    → message.reply(fact + imageUrl)
```

### API integration
- Cat facts: `https://catfact.ninja/fact` (GET, returns `{fact: string}`)
- Cat images: `https://cataas.com/cat` with `Accept: application/json` header (returns `{url: string}`)

## Dependencies

### Production
- `@nerimity/nerimity.js` ^1.0.0 - Nerimity platform SDK for the bot client
- `dotenv` ^16.0.0 - environment variable loader
- `axios` ^1.6.0 - HTTP client for API requests
- `form-data` ^4.0.0 - multipart form data, unused in the current version

### Development
None. Simple runtime project, no build step.

## Code conventions
- Naming: camelCase for functions and variables
- Style: 2-space indentation, no semicolons on some lines
- Imports: CommonJS (`require`)
- Error handling: try/catch in the message handler, plus an `unhandledRejection` process listener
- Logging: `console.log` for debugging, `console.error` for errors

## Environment configuration
Required in `.env`:
```
NERIMITY_TOKEN=your_bot_token_here
```

## Testing
None configured. No tests present.

## Build and deploy
- Build: N/A, no build step
- Start: `npm start` or `node index.js`
- Dev: `npm run dev` (runs `bash start.sh`, but that script isn't in the repo)
- Deploy: not documented

## Common tasks
- Run bot: `npm start` or `node index.js`
- Install dependencies: `npm install`
- Set up environment: copy `.env.example` to `.env` and add the bot token

## Notes

### Bot behavior
- Ignores its own messages (checks `message.user.id === client.user.id`)
- Commands are case-sensitive: `!cat` or `/cat`, lowercase only
- 10-second timeout on API requests
- Replies directly to the triggering message

### Error handling
- Message handler errors are caught so they don't crash the bot
- Global `unhandledRejection` handler catches promise errors
- API failures are logged, not fatal

### Backup version (index.js.bak)
Has 50+ hardcoded cat facts and local image directory support. Differs from the current version:
- Uses a local `catFacts` array instead of the catfact.ninja API
- Has a `randomCat()` function for local image selection, incomplete, references missing `fs` and `path`
- Has a `randomFact()` function for local fact selection
- Otherwise the same event handling

## Areas of interest

### API reliability
Both external APIs (catfact.ninja and cataas.com) have 10s timeouts. Worth considering:
- Fallback to local facts if the API fails
- Retry logic for failed requests
- Caching cat facts for offline operation

### Missing features
- No command help text
- No admin commands
- No per-server configuration
- No rate limiting on commands
- `start.sh` is referenced by `npm run dev` but not present in the repo

### Code quality
- No input validation beyond the command prefix check
- No TypeScript types
- No linting configuration
- No tests
- Magic strings for command prefixes (`!cat`, `/cat`)

### Potential improvements
1. Combine the current version with the backup's local facts as a fallback
2. Add command aliases and help text
3. Add rate limiting to prevent spam
4. Replace console logging with a real logger
5. Add TypeScript for type safety
6. Add tests for command parsing and API interactions
7. Document `start.sh` or remove the reference
8. Use the `cats/` directory images as a fallback when the API fails
