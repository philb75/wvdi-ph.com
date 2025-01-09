import OpenAI from 'openai';
import express, { Request, Response } from 'express';

const router = express.Router();
const openai = new OpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY
});

interface OpenAIRequest {
  messages: { role: 'user' | 'assistant'; content: string }[];
}

router.post('/test-openai', async (req: Request<{}, {}, OpenAIRequest>, res: Response) => {
  try {
    const { messages } = req.body;
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: 150
    });

    res.json({ 
      reply: completion.choices[0].message.content 
    });
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
