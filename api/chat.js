const https = require('https');

export default async function handler(req, res) {
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

    const apiKey = ***;
    if (!apiKey) {
      return res.status(200).json({
        choices: [{
          message: {
            role: 'assistant',
            content: '[LỖI CẤU HÌNH] Chưa tìm thấy GEMINI_API_KEY trên Vercel Environment Variables. Anh Quốc vui lòng kiểm tra lại phần Settings trên Vercel nhé!'
          }
        }]
      });
    }

    const payload = JSON.stringify({
      contents: [{ parts: [{ text: userMessage }] }]
    });

    const options = {
      hostname: 'generativelanguage.googleapis.com',
      path: `/v1/models/gemini-1.5-flash:generateContent?key=***}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': payload.length
      }
    };

    const apiReq = https.request(options, (apiRes) => {
      let data = '';
      apiRes.on('data', (chunk) => { data += chunk; });
      apiRes.on('end', () => {
        try {
          const json = JSON.parse(data);
          const replyText = json.candidates?.[0]?.content?.parts?.[0]?.text || 'Dạ em nghe đây ạ.';
          res.status(200).json({
            choices: [{ message: { role: 'assistant', content: replyText } }]
          });
        } catch (e) {
          res.status(200).json({
            choices: [{ message: { role: 'assistant', content: `[LỖI PHÂN TÍCH] Dữ liệu từ Google lỗi: ${data.substring(0, 100)}` } }]
          });
        }
      });
    });

    apiReq.on('error', (e) => {
      res.status(200).json({
        choices: [{ message: { role: 'assistant', content: `[LỖI KẾT NỐI] Không thể gọi tới Google: ${e.message}` } }]
      });
    });

    apiReq.write(payload);
    apiReq.end();

  } catch (error) {
    res.status(200).json({
      choices: [{ message: { role: 'assistant', content: `[LỖI HỆ THỐNG] Crash: ${error.message}` } }]
    });
  }
}
