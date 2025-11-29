import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/start", (req, res) => {
  const { userId, minutes, botToken, botName } = req.body;

  res.json({ status: "Timer started" });

  // Timer in milliseconds
  setTimeout(async () => {
    try {
      await fetch(`https://cliq.zoho.com/api/v2/bots/${botName}/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bot ${botToken}`
        },
        body: JSON.stringify({
          text: "⏰ Time’s up! Take a break!",
          receiver: { type: "user", id: userId }
        })
      });
    } catch (err) {
      console.error("Error sending message:", err);
    }
  }, minutes * 60 * 1000);
});

app.listen(3000, () => console.log("Server running on port 3000"));
