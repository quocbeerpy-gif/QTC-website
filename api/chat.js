module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;
    const userMessage = messages?.[messages.length - 1]?.content || '';

    // Lấy API Key từ Vercel env
    const apiKey = ***;

    if (!apiKey) {
      return res.status(200).json({
        choices: [{
          message: {
            role: 'assistant',
            content: '[DEBUG LOG] BIẾN GEMINI_API_KEY TRÊN VERCEL ĐANG BỊ TRỐNG (UNDEFINED). Vui lòng vào Vercel Settings -> Environment Variables để Add Key.'
          }
        }]
      });
    }

    const geminiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=***}`;

    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: userMessage }] }]
      })
    });

    if (response.ok) {
      const data = await response.json();
      const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Dạ em nghe đây ạ.';
      return res.status(200).json({
        choices: [{ message: { role: 'assistant', content: replyText } }]
      });
    } else {
      const errText = await response.text();
      return res.status(200).json({
        choices: [{
          message: {
            role: 'assistant',
            content: `[DEBUG LOG] GOOGLE GEMINI TRẢ VỀ LỖI: ${errText}`
          }
        }]
      });
    }
  } catch (error) {
    return res.status(200).json({
      choices: [{
        message: {
          role: 'assistant',
          content: `[DEBUG LOG] EXCEPTION ERROR: ${error.message}`
        }
      }]
    });
  }
};
