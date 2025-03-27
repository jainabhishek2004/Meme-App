import axios from "axios";
import { response } from "express";

const geminiscore =  async (req, res) => {

    const {title,story} = req.body;

    if(!title ) {
        throw new Error("Title  is required!");
        
    }
    if(!story){
        throw new Error("Story  is required!");
    }

    const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_KEY}`;

// Function to get AI-generated Badmashi score and remark
async function getBadmashiScore(title,story) {
  const requestData = {
    contents: [
      {
        parts: [
          {
            text: `Rate the following story on a scale of 1-10 based on its humor, rebelliousness, and creativity. Also, provide a fun remark on its "badmashi" level.\n\n title : ${title}\n\nStory: ${story}\n\nReturn the result in JSON format with keys: "score" and "remark".`
          }
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

    // Extract AI response
    //const aiText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    //const result = JSON.parse(aiText);

   // console.log("Badmashi Score:", result.score);
   // console.log("Remark:", result.remark);
   // return result;
   console.log(response);
   res.send(response);
   

  } catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message);
    return { score: null, remark: "Could not process the story." };
  }
}


}

export{geminiscore};