import { GoogleGenAI } from '@google/genai';

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

    // Lấy API Key bảo mật từ biến môi trường Vercel (an toàn tuyệt đối, không bị GitHub chặn)
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(200).json({
        choices: [{
          message: {
            role: 'assistant',
            content: 'Dạ, hệ thống đang cấu hình biến môi trường GEMINI_API_KEY trên Vercel. Anh vui lòng kiểm tra lại phần Environment Variables trên Vercel giúp em nhé!'
          }
        }]
      });
    }

    // Khởi tạo Gemini SDK chính thức
    const ai = new GoogleGenAI({ apiKey });
    
    // Gọi model gemini-2.5-flash hoặc gemini-1.5-flash chuẩn API v1
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            { text: 'Bạn là QTC AI & HRC AI - trợ lý ảo thông minh của anh Nguyễn Hữu Bảo Quốc (SĐT/Zalo: 0912223103, Địa chỉ: 220 Trần Hưng Đạo, Tuy Hòa). Hãy trả lời khách hàng trên website một cách chuyên nghiệp, ngắn gọn và lịch sự.' },
            { text: userMessage }
          ]
        }
      ]
    });

    const replyText = response.text || 'Cảm ơn anh/chị đã liên hệ. Vui lòng kết nối Zalo 0912 223 103 để nhận tư vấn chi tiết.';

    return res.status(200).json({
      choices: [{
        message: {
          role: 'assistant',
          content: replyText
        }
      }]
    });

  } catch (error) {
    console.error('Gemini API Error:', error);
    return res.status(200).json({
      choices: [{
        message: {
          role: 'assistant',
          content: 'Dạ chào anh/chị, QTC AI hiện đang sẵn sàng tư vấn. Anh/chị vui lòng nhắn Zalo 0912 223 103 giúp em nhé!'
        }
      }]
    });
  }
}
