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
                               Score dete waqt yeh dekhna:
                               - Kitni mast aur bindass likhi gayi hai (Creativity & Style)
                               - Kitna dhasu attitude hai (Rebelliousness)
                               - Kitna hasi-mazaak ya swag hai (Humor & Fun factor)
                               Saath mein ek desi andaaz ka remark bhi de jo mast aur ekdum chatpata lage! 
                               \n\nTitle: ${title}\n\nStory: ${story}\n\nReturn JSON with keys "score" and "remark".`,
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

        // Clean up response (remove markdown if any)
        aiText = aiText.replace(/```json|```/g, "").trim();

        // Parse JSON result
        return JSON.parse(aiText);
    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
        return { score: null, remark: "Could not process the story." };
    }
};

export { getBadmashiScore };
