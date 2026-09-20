export default async function handler(req, res) {
  // Cho phép CORS từ mọi nguồn (hoặc cụ thể domain của anh)
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

    // Phản hồi chuyên nghiệp từ QTC AI
    let reply = "Cảm ơn anh/chị đã quan tâm đến dịch vụ của QTC. Đội ngũ chuyên gia của chúng tôi chuyên tư vấn giải pháp AI doanh nghiệp, xây dựng hệ thống Chatbot Zalo OA tự động hóa chăm sóc khách hàng và cung cấp hạ tầng GPU/Server AI riêng biệt. Anh/chị vui lòng liên hệ trực tiếp qua SĐT/Zalo 0912 223 103 (Nguyễn Hữu Bảo Quốc) để được khảo sát và tư vấn chi tiết.";

    const lower = userMessage.toLowerCase();
    if (lower.includes('zalo') || lower.includes('chăm sóc') || lower.includes('tin nhắn')) {
      reply = "Giải pháp Chatbot Zalo OA và ZNS của QTC giúp doanh nghiệp tự động hóa 100% quy trình chăm sóc khách hàng, tư vấn sản phẩm và chốt đơn 24/7, tích hợp trực tiếp vào hệ thống CRM sẵn có. Để nhận báo giá chi tiết theo mô hình doanh nghiệp, anh/chị vui lòng liên hệ trực tiếp Zalo: 0912 223 103.";
    } else if (lower.includes('server') || lower.includes('gpu') || lower.includes('hạ tầng') || lower.includes('phần cứng')) {
      reply = "QTC chuyên thiết kế, lắp đặt và vận hành hạ tầng máy chủ AI (GPU Cluster/Private Cloud) riêng biệt cho doanh nghiệp (on-premise), đảm bảo tuyệt đối về bảo mật dữ liệu và hiệu năng tối ưu. Xin mời anh/chị liên hệ SĐT/Zalo 0912 223 103 để trao đổi yêu cầu kỹ thuật.";
    } else if (lower.includes('giá') || lower.includes('chi phí') || lower.includes('báo giá')) {
      reply = "Chi phí triển khai giải pháp AI tại QTC phụ thuộc vào quy mô, tính năng và mức độ tích hợp thực tế của doanh nghiệp. Chúng tôi luôn có chính sách khảo sát và tư vấn giải pháp tối ưu chi phí nhất. Anh/chị vui lòng liên hệ trực tiếp qua Zalo 0912 223 103 để nhận báo giá cụ thể.";
    }

    return res.status(200).json({
      choices: [
        {
          message: {
            content: reply
          }
        }
      ]
    });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
