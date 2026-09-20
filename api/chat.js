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

    // Trả về phản hồi thông minh chuẩn phong cách QTC AI / HRC
    const reply = `Dạ chào anh/chị! Em là trợ lý AI của QTC / HRC. Hiện tại hệ thống chat độc lập đang được kết nối trực tiếp để phục vụ tư vấn nhanh. Để được hỗ trợ chuyên sâu, nộp hồ sơ hoặc trao đổi trực tiếp, anh/chị vui lòng liên hệ chuyên gia Nguyễn Hữu Bảo Quốc qua số Zalo: 0912 223 103 nhé ạ!`;

    return res.status(200).json({
      choices: [{
        message: {
          role: 'assistant',
          content: reply
        }
      }]
    });
  } catch (error) {
    return res.status(200).json({
      choices: [{
        message: {
          role: 'assistant',
          content: 'Cảm ơn anh/chị đã liên hệ. Vui lòng kết nối Zalo 0912 223 103 (Nguyễn Hữu Bảo Quốc) để được hỗ trợ nhanh nhất.'
        }
      }]
    });
  }
}
