import { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';

// CORS headers
const setCorsHeaders = (res: VercelResponse) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-api-key');
};

// In-memory storage (simple implementation for Vercel)
let sessions: any[] = [];
let messages: any[] = [];
let currentSessionId = 1;
let currentMessageId = 1;

// OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { method, url } = req;
  const path = url?.split('?')[0] || '';

  try {
    if (method === 'POST' && path === '/api/chat/send') {
      const { content, sessionId } = req.body;
      const clientApiKey = req.headers['x-api-key'] as string;
      const apiKey = clientApiKey || process.env.OPENAI_API_KEY;

      if (!apiKey) {
        return res.status(500).json({ error: 'OpenAI API key not configured' });
      }

      let currentSession = sessionId;

      // Create new session if none provided
      if (!currentSession) {
        const newSession = {
          id: currentSessionId++,
          title: content.length > 50 ? content.substring(0, 50) + "..." : content,
          userId: null,
          createdAt: new Date().toISOString()
        };
        sessions.push(newSession);
        currentSession = newSession.id;
      }

      // Save user message
      const userMessage = {
        id: currentMessageId++,
        sessionId: currentSession,
        role: 'user',
        content,
        timestamp: new Date().toISOString()
      };
      messages.push(userMessage);

      // Get conversation history
      const conversationMessages = messages
        .filter(msg => msg.sessionId === currentSession)
        .map(msg => ({ role: msg.role, content: msg.content }));

      // Get AI response
      const systemMessage = {
        role: 'system' as const,
        content: `あなたは温かく思いやりのある人生相談カウンセラーです。相談者の気持ちに寄り添い、優しく丁寧にアドバイスをしてください。

以下の点を心がけてください：
- 相談者の感情を受け止め、共感を示す
- 具体的で実践的なアドバイスを提供
- 希望と前向きな気持ちを与える
- 日本語で自然に話す
- 相談者を否定せず、建設的にサポートする`
      };

      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [systemMessage, ...conversationMessages],
        temperature: 0.7,
        max_tokens: 1000,
      });

      const aiResponse = completion.choices[0]?.message?.content || "申し訳ございません。回答を生成できませんでした。";

      // Save AI message
      const aiMessage = {
        id: currentMessageId++,
        sessionId: currentSession,
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date().toISOString()
      };
      messages.push(aiMessage);

      return res.json({
        message: aiMessage,
        sessionId: currentSession
      });
    }

    if (method === 'GET' && path === '/api/chat/sessions') {
      return res.json(sessions);
    }

    if (method === 'GET' && path.startsWith('/api/chat/sessions/')) {
      const sessionId = parseInt(path.split('/').pop() || '0');
      const sessionMessages = messages.filter(msg => msg.sessionId === sessionId);
      return res.json(sessionMessages);
    }

    if (method === 'DELETE' && path.startsWith('/api/chat/sessions/')) {
      const sessionId = parseInt(path.split('/').pop() || '0');
      sessions = sessions.filter(s => s.id !== sessionId);
      messages = messages.filter(m => m.sessionId !== sessionId);
      return res.json({ success: true });
    }

    return res.status(404).json({ error: 'Not found' });
  } catch (error: any) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
}
