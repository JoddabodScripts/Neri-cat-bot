# Cat Bot - AI Agent Reference

*Generated on 2026-06-15 by init skill*

## Quick Overview
A Nerimity chat bot that responds to `!cat` or `/cat` commands with random cat facts and images from the CATAAS API. Built with Node.js using the @nerimity/nerimity.js SDK.

## Project Type & Stack
- **Language:** JavaScript (Node.js)
- **Framework:** @nerimity/nerimity.js (Nerimity bot SDK)
- **Package Manager:** npm
- **Runtime:** Node.js (no build step required)

## Directory Structure
```
.
├── index.js              # Main bot entry point
├── index.js.bak          # Backup with local cat facts array
├── package.json          # Dependencies and scripts
├── package-lock.json     # Locked dependency versions
├── .env                  # Bot token (DO NOT COMMIT)
├── .env.example          # Template for .env
├── bot.log               # Runtime logs
└── cats/                 # Directory with sample cat images
    ├── cat surprised.webp
    └── funny cat.webp
```

## Entry Points
- **Main:** `index.js` - Bot initialization and message handler

## Key Files & Directories
- `index.js` - Current bot implementation using CATAAS API for facts and images
- `index.js.bak` - Previous version with hardcoded cat facts array (50+ facts) and local image support
- `package.json` - npm configuration with start scripts
- `.env` - Contains `NERIMITY_TOKEN` for bot authentication (gitignored)
- `.env.example` - Template showing required environment variables
- `cats/` - Sample cat images in webp format (not currently used by active bot)

## Architecture
Simple event-driven chatbot with a single-file architecture:
1. Bot authenticates with Nerimity token
2. Listens for `MessageCreate` events
3. Detects `!cat` or `/cat` commands
4. Fetches cat fact from catfact.ninja API
5. Fetches cat image URL from CATAAS API (JSON endpoint)
6. Replies with fact + image URL

### Bot Flow
```
User sends !cat/cat
  → Event: MessageCreate
    → getCatFact() → catfact.ninja/fact
    → axios.get(cataas.com/cat) → JSON with image URL
    → message.reply(fact + imageUrl)
```

### API Integration
- **Cat Facts:** `https://catfact.ninja/fact` (GET, returns `{fact: string}`)
- **Cat Images:** `https://cataas.com/cat` with `Accept: application/json` header (returns `{url: string}`)

## Dependencies

### Production
- `@nerimity/nerimity.js` ^1.0.0 - Nerimity platform SDK for bot client
- `dotenv` ^16.0.0 - Environment variable loader
- `axios` ^1.6.0 - HTTP client for API requests
- `form-data` ^4.0.0 - Multipart form data (unused in current version)

### Development
None - simple runtime project with no build step

## Code Conventions
- **Naming:** camelCase for functions and variables
- **Style:** 2-space indentation, no semicolons on some lines
- **Imports:** CommonJS (`require`)
- **Error Handling:** try/catch in message handler, unhandledRejection process listener
- **Logging:** console.log for debugging, console.error for errors

## Environment Configuration
Required environment variables in `.env`:
```
NERIMITY_TOKEN=your_bot_token_here
```

## Testing
- **Framework:** None configured
- **Location:** No tests present
- **Run Command:** N/A

## Build & Deploy
- **Build Command:** N/A (no build step)
- **Start Command:** `npm start` or `node index.js`
- **Dev Command:** `npm run dev` (runs `bash start.sh` - script not present in repo)
- **Deploy:** Not documented

## Common Tasks
- Run bot: `npm start` or `node index.js`
- Install dependencies: `npm install`
- Set up environment: Copy `.env.example` to `.env` and add bot token

## Important Notes

### Bot Behavior
- Ignores its own messages (checks `message.user.id === client.user.id`)
- Commands are case-sensitive: `!cat` or `/cat` (lowercase)
- 10-second timeout on API requests
- Replies directly to the triggering message

### Error Handling
- Catches errors in message handler to prevent crashes
- Global unhandledRejection handler for promise errors
- API failures are logged but don't crash the bot

### Backup Version (index.js.bak)
Contains 50+ hardcoded cat facts and local image directory support. Differs from current version:
- Uses local `catFacts` array instead of catfact.ninja API
- Has `randomCat()` function for local image selection (incomplete, references missing `fs` and `path`)
- Has `randomFact()` function for local fact selection
- Otherwise identical event handling

## Areas of Interest

### API Reliability
Both external APIs (catfact.ninja and cataas.com) have 10s timeouts. Consider:
- Fallback to local facts if API fails
- Retry logic for failed requests
- Caching cat facts for offline operation

### Missing Features
- No command help text
- No admin commands
- No per-server configuration
- No rate limiting on commands
- start.sh script referenced but not present

### Code Quality
- No input validation beyond command prefix check
- No TypeScript types
- No linting configuration
- No tests
- Magic strings for command prefixes (`!cat`, `/cat`)

### Potential Improvements
1. Combine current version with backup's local facts as fallback
2. Add command aliases and help text
3. Add rate limiting to prevent spam
4. Implement proper logging (not just console)
5. Add TypeScript for type safety
6. Create tests for command parsing and API interactions
7. Document the start.sh script or remove reference
8. Use local cats/ directory images as fallback when API fails
