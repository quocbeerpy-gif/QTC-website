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

    // Chuyển tiếp yêu cầu thẳng về Gateway OpenClaw tại máy của anh qua Tailscale Funnel
    const gatewayRes = await fetch('https://desktop-b8m2j50.tail6a1288.ts.net/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer de4ea709afc7983fdc9aa9808fb3a05b19f1f7eb1a1fb297'
      },
      body: JSON.stringify({
        model: 'nguyen_quoc',
        messages: [
          { role: 'system', content: 'Bạn là QTC AI - trợ lý ảo chuyên nghiệp của anh Nguyễn Hữu Bảo Quốc (SĐT/Zalo: 0912223103, Địa chỉ: 220 Trần Hưng Đạo, Tuy Hòa). Hãy trả lời khách hàng trên website một cách chuyên nghiệp, ngắn gọn và lịch sự.' },
          { role: 'user', content: userMessage }
        ]
      })
    });

    if (gatewayRes.ok) {
      const data = await gatewayRes.json();
      return res.status(200).json(data);
    } else {
      const errText = await gatewayRes.text();
      // Fallback nếu Gateway ở nhà đang gặp lỗi hoặc phản hồi khác
      return res.status(200).json({
        choices: [{
          message: {
            role: 'assistant',
            content: 'Dạ chào anh/chị! QTC AI hiện đang sẵn sàng hỗ trợ. Vui lòng liên hệ trực tiếp qua Zalo chuyên gia Nguyễn Hữu Bảo Quốc: 0912 223 103 để được tư vấn chi tiết và nhanh chóng nhất ạ.'
          }
        }]
      });
    }
  } catch (error) {
    return res.status(200).json({
      choices: [{
        message: {
          role: 'assistant',
          content: 'Cảm ơn anh/chị đã liên hệ QTC. Vui lòng kết nối trực tiếp Zalo 0912 223 103 (Nguyễn Hữu Bảo Quốc) để nhận tư vấn chi tiết nhanh nhất.'
        }
      }]
    });
  }
}
