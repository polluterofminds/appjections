require("dotenv");
const axios = require("axios");

exports.handler = async (event, context) => {
  try {
    const totalEmailsToFetch = Math.floor(Math.random() * 3) + 1
    const data = JSON.stringify({
      model: "text-davinci-002",
      prompt: "Write a funny email rejection from a mobile App Marketplace that gives a silly reason for the app's rejection.",
      temperature: 0.7,
      max_tokens: 256,
      n: totalEmailsToFetch
    });

    const config = {
      method: "post",
      url: "https://api.openai.com/v1/completions",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPEN_AI_KEY}`,
      },
      data: data,
    };

    const res = await axios(config);

    if(!res.data.choices) {
      throw new Error("No text completion choices available");
    }

    return {
      statusCode: 200,
      body: JSON.stringify(res.data.choices),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      },
    }
  } catch (err) {
    console.log(err.response.data);
    return { statusCode: 500, body: err.toString() };
  }
};
