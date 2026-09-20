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

    // Lấy API Key từ biến môi trường của Vercel (bảo mật tuyệt đối)
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(200).json({
        choices: [{
          message: {
            role: 'assistant',
            content: 'Hệ thống đang được cấu hình API Key. Anh/chị vui lòng liên hệ Zalo 0912 223 103 (Nguyễn Hữu Bảo Quốc) để được hỗ trợ trực tiếp nhé ạ!'
          }
        }]
      });
    }

    const systemInstruction = `Bạn là QTC AI - trợ lý ảo thông minh của anh Nguyễn Hữu Bảo Quốc (QTC AI & HRC Group).
Thông tin liên hệ: SĐT/Zalo: 0912 223 103, Địa chỉ: 220 Trần Hưng Đạo, P. Tuy Hòa, Đắk Lắk.
Về HRC Group: Tập đoàn giáo dục & y tế với 5 trụ cột (HRC Edu: Tuyển sinh Thạc sĩ, Tiến sĩ, Đại học, Cao đẳng; HRC Skills: STEM, Tiếng Anh; HRC Health: Y học cổ truyền, Du lịch sức khỏe). Hotline HRC: 0817 601 979.
Quy tắc:
1. Luôn giao tiếp bằng Tiếng Việt thân thiện, thông minh, chuyên nghiệp.
2. Trả lời trực tiếp và đầy đủ câu hỏi của người dùng, không lặp lại câu chào cố định.
3. Luôn sẵn sàng hỗ trợ và hướng dẫn người dùng kết nối Zalo khi cần tư vấn chuyên sâu hoặc nộp hồ sơ.`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemInstruction }]
        },
        contents: [
          {
            role: 'user',
            parts: [{ text: userMessage }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800
        }
      })
    });

    const data = await response.json();
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Dạ em chưa nghe rõ, anh/chị có thể nhắn lại giúp em được không ạ?';

    return res.status(200).json({
      choices: [{
        message: {
          role: 'assistant',
          content: replyText
        }
      }]
    });
  } catch (error) {
    return res.status(200).json({
      choices: [{
        message: {
          role: 'assistant',
          content: 'Cảm ơn anh/chị đã liên hệ. Hiện tại máy chủ đang bận, anh/chị vui lòng kết nối Zalo 0912 223 103 (Nguyễn Hữu Bảo Quốc) để được hỗ trợ nhanh nhất nhé ạ.'
        }
      }]
    });
  }
}
