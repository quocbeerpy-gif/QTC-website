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

    // Gọi thẳng về Gateway OpenClaw tại máy của anh
    const gatewayRes = await fetch('https://desktop-b8m2j50.tail6a1288.ts.net/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ***'
      },
      body: JSON.stringify({
        model: 'nguyen_quoc',
        messages: [
          { role: 'system', content: 'Bạn là QTC AI & HRC AI - trợ lý ảo thông minh của anh Nguyễn Hữu Bảo Quốc (SĐT/Zalo: 0912223103, Địa chỉ: 220 Trần Hưng Đạo, Tuy Hòa).' },
          { role: 'user', content: userMessage }
        ]
      })
    });

    if (gatewayRes.ok) {
      const data = await gatewayRes.json();
      return res.status(200).json(data);
    } else {
      const errDetail = await gatewayRes.text();
      return res.status(200).json({
        choices: [{
          message: {
            role: 'assistant',
            content: 'Dạ chào anh/chị! QTC AI đang hoạt động. Vui lòng liên hệ trực tiếp Zalo 0912 223 103 (Nguyễn Hữu Bảo Quốc) để được hỗ trợ nhanh nhất.'
          }
        }]
      });
    }
  } catch (error) {
    return res.status(200).json({
      choices: [{
        message: {
          role: 'assistant',
          content: 'Cảm ơn anh/chị đã liên hệ QTC. Vui lòng kết nối Zalo 0912 223 103 để nhận tư vấn chi tiết.'
        }
      }]
    });
  }
}
