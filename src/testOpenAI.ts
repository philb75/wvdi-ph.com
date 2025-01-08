import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
  dangerouslyAllowBrowser: true
});

async function testConnection() {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'Say this is a test' }],
      max_tokens: 10
    });
    console.log('API connection successful:', completion.choices[0].message.content);
  } catch (error) {
    console.error('API connection failed:', error);
  }
}

testConnection();
