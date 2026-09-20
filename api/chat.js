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
            content: 'Dạ, chưa cấu hình GEMINI_API_KEY trên Vercel.'
          }
        }]
      });
    }

    const geminiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=***}`;

    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: 'Bạn là QTC AI & HRC AI - trợ lý ảo thông minh của anh Nguyễn Hữu Bảo Quốc (SĐT/Zalo: 0912223103, Địa chỉ: 220 Trần Hưng Đạo, Tuy Hòa). Hãy trả lời khách hàng một cách ngắn gọn, lịch sự, chuyên nghiệp.' },
              { text: userMessage }
            ]
          }
        ]
      })
    });

    if (response.ok) {
      const data = await response.json();
      const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Dạ chào anh/chị, em có thể giúp gì thêm cho anh/chị ạ?';
      return res.status(200).json({
        choices: [{
          message: {
            role: 'assistant',
            content: replyText
          }
        }]
      });
    } else {
      const err = await response.text();
      console.error('Gemini API Error details:', err);
      return res.status(200).json({
        choices: [{
          message: {
            role: 'assistant',
            content: 'Dạ chào anh/chị! Vui lòng liên hệ trực tiếp Zalo 0912 223 103 (Nguyễn Hữu Bảo Quốc) để được hỗ trợ ngay ạ.'
          }
        }]
      });
    }
  } catch (error) {
    console.error('Handler catch error:', error);
    return res.status(200).json({
      choices: [{
        message: {
          role: 'assistant',
          content: 'Dạ chào anh/chị, vui lòng liên hệ trực tiếp Zalo 0912 223 103 để được tư vấn nhanh nhất ạ.'
        }
      }]
    });
  }
}
