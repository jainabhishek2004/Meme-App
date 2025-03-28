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

    async function getBadmashiScore(title, story) {
      const requestData = {
        contents: [
          {
            parts: [
              {
                text: `Suna hai tu asli badmash hai? Chal dekhte hain! Iss kahani ko padh aur iska badmashi level 1 se 10 tak rate kar.
                       Score dete waqt yeh dekhna:Kitni mast aur bindass likhi gayi hai (Creativity & Style)Kitna dhasu attitude hai (RebelliousnessAur 
                       kitna hasi-mazaak ya swag hai (Humor & Fun factor)Saath mein ek desi andaaz ka remark bhi de jo mast aur ekdum chatpata lage! Remark ekdum swagy ho,
                       jaise kisi gully ke don ya apne mohalla ke bade bhai ka reaction \n\nTitle: ${title}\n\nStory: ${story}\n\nReturn the result in JSON format with keys:
                       "score" and "remark give remark in  desi bhasha and cool slangs and meme refrences".`,
                       
              },
            ],
          },
        ],
      };
    
      try {
        const response = await axios.post(URL, requestData, {
          headers: { "Content-Type": "application/json" },
        });
    
        // Extract text content from the response
        let aiText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
        
        
    
        // Remove markdown backticks (```json ... ```)
        aiText = aiText.replace(/```json|```/g, "").trim();
        console.log(aiText);

    
        // Convert string to JSON
        const parsedData = JSON.parse(aiText);
    
        return parsedData;
      } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
        return { score: null, remark: "Could not process the story." };
      }
    }
    
    const result = await getBadmashiScore(title, story);
    
    
    res.json(result); 
    
    // Sends the full Axios response object

  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { geminiscore };

