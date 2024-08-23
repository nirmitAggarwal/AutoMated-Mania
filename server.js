const axios = require("axios");

const apiKey = "d7b6cfbb-5942-4104-9c59-9fd54cddfe35";
const slackId = "U07HYRFR8P3";
const word = "project main "; // Change this to your desired word

let sessionIndex = 01;

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
      sessionIndex++;``
      setTimeout(startSession, 60.2 * 60 * 1000); // Start new session after 65 minutes
    } else {
      throw new Error("Failed to start session");
    }
  } catch (error) {
    console.error(`Failed to start session: ${error.message}`);
    setTimeout(startSession, 3 * 60 * 1000); // Retry after 3 minutes
  }
};

// Start the first session
startSession();
