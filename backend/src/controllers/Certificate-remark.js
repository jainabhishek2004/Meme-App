import axios from "axios";

const airemark = async (totalUpvotes, averageBadmashiScore) => {
    try {
        const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_KEY}`;

        const prompt = `Give a short, fun remark (5-7 words) for a user based on their total upvotes (${totalUpvotes}) and average badmashi score (${averageBadmashiScore}). Keep it playful.`;

        const data = {
            "contents": [{
                "parts": [{ "text": prompt }]
            }]
        };

        const headers = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const response = await axios.post(URL, data, headers);

        return response.data.candidates?.[0]?.content?.parts?.[0]?.text || "Keep up the fun vibes!";
    } catch (error) {
        console.error("Error fetching AI remark:", error);
        return "Stay badmash, keep shining!";  
    }
};

export { airemark };
