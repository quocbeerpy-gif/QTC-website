const https = require('https');

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }

  try {
    const { messages } = req.body;
    const userMessage = messages?.[messages.length - 1]?.content || 'Xin chào';

    // Key nhúng thẳng - giải pháp cuối cùng để chạy được trên Vercel
    const apiKey = 'Yfq4piddy93NNAlKjKyTjL8Am3kmQ'; 

    const payload = JSON.stringify({
      contents: [{ parts: [{ text: 'Bạn là trợ lý AI thông minh của Nguyễn Hữu Bảo Quốc. ' + userMessage }] }]
    });

    const options = {
      hostname: 'generativelanguage.googleapis.com',
      path: `/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': payload.length }
    };

    const apiReq = https.request(options, (apiRes) => {
      let data = '';
      apiRes.on('data', (c) => data += c);
      apiRes.on('end', () => {
        const json = JSON.parse(data);
        const replyText = json.candidates?.[0]?.content?.parts?.[0]?.text || 'Dạ chào anh/chị.';
        res.status(200).json({ choices: [{ message: { role: 'assistant', content: replyText } }] });
      });
    });

    apiReq.on('error', (e) => res.status(500).json({ error: e.message }));
    apiReq.write(payload);
    apiReq.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
