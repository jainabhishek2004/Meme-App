import axios from "axios";

const getBadmashiScore = async (title, story) => {
  if (!title || !story) {
    return { error: "Title and Story are required!" };
  }

  const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_KEY}`;

  const requestData = {
    contents: [
      {
        parts: [
          {
            text: `Suna hai tu asli badmash hai? Chal dekhte hain! Iss kahani ko padh aur iska badmashi level 1 se 10 tak rate kar.
                   Score dete waqt yeh dekhna:Kitni mast aur bindass likhi gayi hai (Creativity & Style), Kitna dhasu attitude hai (Rebelliousness), 
                   aur kitna hasi-mazaak ya swag hai (Humor & Fun factor). Saath mein ek desi andaaz ka remark bhi de jo mast aur ekdum chatpata lage! 
                   Remark ekdum swagy ho, jaise kisi gully ke don ya apne mohalla ke bade bhai ka reaction.
                   \n\nTitle: ${title}\n\nStory: ${story}\n\nReturn the result in JSON format with keys: "score" and "remark".`,
          },
        ],
      },
    ],
  };

  try {
    const response = await axios.post(URL, requestData, {
      headers: { "Content-Type": "application/json" },
    });

    let aiText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

    // Clean JSON format
    aiText = aiText.replace(/```json|```/g, "").trim();

    return JSON.parse(aiText);
  } catch (error) {
    console.error("Error fetching AI response:", error.response ? error.response.data : error.message);
    return { score: null, remark: "Could not process the story." };
  }
};

const geminiscore = async (req, res) => {
  try {
    const { title, story } = req.body;

    if (!title || !story) {
      return res.status(400).json({ error: "Title and Story are required!" });
    }

    const result = await getBadmashiScore(title, story);

    res.status(200).json(result);
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { geminiscore };
