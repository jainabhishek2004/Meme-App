import { YoutubeTranscript } from 'youtube-transcript';

const yt =  async (req,res) => {
    try{
        const transcript = await YoutubeTranscript.fetchTranscript('https://www.youtube.com/watch?v=d56mG7DezGs');
        
        
       

        const transcriptText =  transcript.reduce((acc, curr) => {
            return acc + " " + curr.text;
        }, '');
        console.log(transcriptText);

        res.json({transcriptText});
        
        
        
    }
    catch(err){
        console.log(err);
    }
}

export {yt}