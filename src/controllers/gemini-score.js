import axios from "axios";

const geminiscore = async (req, res) => {
  try {
    const { title, story } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required!" });
    }
    if (!story) {
      return res.status(400).json({ error: "Story is required!" });
    }

    const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_KEY}`;

    // Function to get AI-generated Badmashi score and remark
    async function getBadmashiScore(title, story) {
      const requestData = {
        contents: [
          {
            parts: [
              {
                text: `Rate the following story on a scale of 1-10 based on its humor, rebelliousness, and creativity. Also, provide a fun remark on its "badmashi" level.\n\n title : ${title}\n\nStory: ${story}\n\nReturn the result in JSON format with keys: "score" and "remark".`,
              },
            ],
          },
        ],
      };

      try {
        const response = await axios.post(URL, requestData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        // Extract AI response correctly
        const aiText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
        const result = JSON.parse(aiText);

        return result;
      } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
        return { score: null, remark: "Could not process the story." };
      }
    }

    // Call AI function and send response
    const result = await getBadmashiScore(title, story);
    res.json(result);

  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { geminiscore };
