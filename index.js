require('dotenv').config();
const { Client, Events } = require('@nerimity/nerimity.js');
const axios = require('axios');

const client = new Client();

// Rate limit: 1 cat per 10 seconds per user
const userRateLimits = new Map(); // userId -> timestamp of last request

function checkRateLimit(userId) {
  const now = Date.now();
  const lastRequest = userRateLimits.get(userId);
  
  if (lastRequest && now - lastRequest < 10000) {
    // Still within cooldown period
    return { allowed: false };
  }
  
  // Record timestamp for this request
  userRateLimits.set(userId, now);
  return { allowed: true };
}

async function getCatFact() {
  const res = await axios.get("https://catfact.ninja/fact", { timeout: 10000 });
  return res.data?.fact || "Cats are cool.";
}

process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err.message);
});

let activityIndex = 0;
function updatePresence(client) {
  try {
    const serverCount = client.servers?.cache?.size ?? 0;
    const serverLabel = `${serverCount} server${serverCount !== 1 ? "s" : ""}`;
    const activities = [
      {
        action: "Playing",
        name: "Cat Bot",
        startedAt: Date.now(),
        title: serverLabel,
        subtitle: "Type !cat",
      },
      {
        action: "Watching",
        name: "Cat Distribution System",
        startedAt: Date.now(),
        title: "🐱",
        subtitle: "meow",
      },
    ];
    const activity = activities[activityIndex % activities.length];
    activityIndex += 1;
    client.user?.setActivity(activity);
  } catch (e) {
    console.error("[bot] Failed to update presence:", e.message);
  }
}

client.on(Events.Ready, () => {
  console.log(`${client.user?.username} Has entered the litterbox!`);
  updatePresence(client);
  setInterval(() => updatePresence(client), 15000);
});

client.on(Events.MessageCreate, async (message) => {
  try {
    if (message.user.id === client.user.id) return;

    const content = message.content || "";
    console.log(`[${message.user.username}]: ${content}`);

    if (content.startsWith('!cat') || content.startsWith('/cat')) {
      console.log("Cat command detected!");

      // Check rate limit before sending
      const rateCheck = checkRateLimit(message.user.id);
      if (!rateCheck.allowed) {
        await message.reply("Slow down! You can only request 1 cat per 10 seconds. 🐱");
        return;
      }

      const fact = await getCatFact();

      console.log("Fetching cat image from CATAAS...");

      // Get the JSON with image URL
      const jsonRes = await axios.get("https://cataas.com/cat", {
        headers: { 'Accept': 'application/json' },
        timeout: 10000
      });

      if (!jsonRes.data?.url) {
        throw new Error('CATAAS did not return image URL');
      }

      const imageUrl = jsonRes.data.url;
      console.log("Got image URL:", imageUrl);

      // Send the fact + image URL with "Another?" button
      const msg = `${fact}\n${imageUrl}`;
      console.log("Sending:", msg);
      await message.reply(msg, {
        buttons: [{ id: "another", label: "Another?" }]
      });
      console.log("Sent!");
    }
  } catch (err) {
    console.error("Error in message handler:", err.message);
  }
});

client.on(Events.MessageButtonClick, async (button) => {
  try {
    if (button.id !== "another") return;

    console.log(`[${button.user.username}] clicked Another button`);

    // Check rate limit
    const rateCheck = checkRateLimit(button.user.id);
    if (!rateCheck.allowed) {
      await button.respond({
        content: "Slow down! You can only request 1 cat per 10 seconds. 🐱"
      });
      return;
    }

    // Fetch new cat fact and image
    const fact = await getCatFact();
    
    const jsonRes = await axios.get("https://cataas.com/cat", {
      headers: { 'Accept': 'application/json' },
      timeout: 10000
    });

    if (!jsonRes.data?.url) {
      throw new Error('CATAAS did not return image URL');
    }

    const imageUrl = jsonRes.data.url;
    const msg = `${fact}\n${imageUrl}`;

    // Send as a new message in the channel
    await button.channel.send(msg, {
      buttons: [{ id: "another", label: "Another?" }]
    });

    console.log("Sent another cat!");
  } catch (err) {
    console.error("Error in button handler:", err.message);
    await button.respond({ content: "Oops! Something went wrong fetching a cat. 😿" });
  }
});

client.login(process.env.NERIMITY_TOKEN);
