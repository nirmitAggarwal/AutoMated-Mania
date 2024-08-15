const axios = require("axios");

const apiKey = "7043ac10-9ef2-43b1-94eb-758b384b7d71";
const slackId = "U07D6EE31AB";
const word = "PrJS"; // Change this to your desired word

let sessionIndex = 1;

const startSession = async () => {
  const sessionName = `${word} ${sessionIndex}`;
  try {
    const response = await axios.post(
      `https://hackhour.hackclub.com/api/start/${slackId}`,
      { work: sessionName },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.data.ok) {
      console.log(`Session started: ${sessionName}`);
      sessionIndex++;
      setTimeout(startSession, 65 * 60 * 1000); // Start new session after 65 minutes
    } else {
      throw new Error("Failed to start session");
    }
  } catch (error) {
    console.error(`Failed to start session: ${error.message}`);
    setTimeout(startSession, 10 * 60 * 1000); // Retry after 10 minutes
  }
};

// Start the first session
startSession();
