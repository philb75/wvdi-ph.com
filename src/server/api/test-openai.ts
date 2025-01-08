import OpenAI from 'openai';
import express, { Request, Response } from 'express';

const router = express.Router();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
});

interface OpenAIRequest {
  message: string;
}

router.post('/test-openai', async (req: Request<{}, {}, OpenAIRequest>, res: Response) => {
  try {
    const { message } = req.body;
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
      max_tokens: 10
    });

    res.json({ 
      message: completion.choices[0].message.content 
    });
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
