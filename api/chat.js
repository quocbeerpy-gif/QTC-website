export default async function handler(req, res) {
  // CORS Headers
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
    const prompt = userMessage.toLowerCase();

    // --- KNOWLEDGE BASE & PROFESSIONAL RESPONSES ---
    let reply = "";

    if (prompt.includes('zalo') || prompt.includes('chatbot') || prompt.includes('tư vấn')) {
      reply = "Dạ chào anh/chị! Về giải pháp **Chatbot Zalo OA**, QTC chuyên triển khai các hệ thống trợ lý ảo thông minh có khả năng: \n" +
              "1. Tự động tư vấn sản phẩm & chốt đơn 24/7.\n" +
              "2. Tích hợp sâu với CRM/ERP để quản lý khách hàng.\n" +
              "3. Gửi thông báo tự động (ZNS) chăm sóc sau bán.\n\n" +
              "Anh/chị có thể liên hệ trực tiếp qua Zalo của chuyên gia **Nguyễn Hữu Bảo Quốc: 0912 223 103** để nhận demo và báo giá chi tiết ạ.";
    } 
    else if (prompt.includes('server') || prompt.includes('gpu') || prompt.includes('hạ tầng') || prompt.includes('phần cứng')) {
      reply = "Chào anh/chị! QTC cung cấp giải pháp **Hạ tầng AI Server (GPU Cluster)** chuyên biệt cho doanh nghiệp:\n" +
              "• Thiết kế hệ thống Private Cloud/On-premise bảo mật tuyệt đối.\n" +
              "• Tối ưu hiệu năng cho việc huấn luyện (Fine-tuning) và vận hành LLM.\n" +
              "• Hỗ trợ kỹ thuật & giám sát 24/7.\n\n" +
              "Để trao đổi sâu hơn về thông số kỹ thuật, anh/chị vui lòng kết nối với anh Quốc qua số **0912 223 103** nhé.";
    }
    else if (prompt.includes('giá') || prompt.includes('bao nhiêu') || prompt.includes('chi phí')) {
      reply = "Dạ, chi phí triển khai giải pháp AI tại QTC được thiết kế linh hoạt tùy theo quy mô và yêu cầu cụ thể của từng doanh nghiệp. \n\n" +
              "Thông thường, chúng tôi sẽ tiến hành **khảo sát miễn phí** quy trình hiện tại của anh/chị để đưa ra phương án tối ưu chi phí nhất. Anh/chị có thể để lại SĐT tại đây hoặc nhắn trực tiếp Zalo **0912 223 103** để QTC hỗ trợ báo giá ngay trong ngày ạ.";
    }
    else if (prompt.includes('quy trình') || prompt.includes('làm việc')) {
      reply = "Quy trình làm việc tại QTC rất rành mạch gồm 4 bước:\n" +
              "1. Khảo sát & Phân tích điểm nghẽn vận hành.\n" +
              "2. Thiết kế & Đề xuất giải pháp AI phù hợp.\n" +
              "3. Triển khai, Tích hợp & Kiểm thử hệ thống.\n" +
              "4. Bàn giao & Vận hành, tối ưu liên tục.\n\n" +
              "Anh/chị cần tư vấn bước nào cụ thể không ạ?";
    }
    else {
      // General professional greeting
      reply = "Chào mừng anh/chị đến với **QTC AI** - Chuyên gia cung cấp giải pháp trí tuệ nhân tạo doanh nghiệp tại Việt Nam.\n\n" +
              "Tôi có thể hỗ trợ anh/chị thông tin về:\n" +
              "• Triển khai Chatbot Zalo OA & CRM.\n" +
              "• Xây dựng hệ thống AI tùy chỉnh cho quy trình vận hành.\n" +
              "• Thiết lập hạ tầng máy chủ AI/GPU riêng biệt.\n\n" +
              "Anh/chị đang quan tâm đến giải pháp nào, hoặc cần gặp trực tiếp anh Quốc (0912 223 103) để tư vấn ạ?";
    }

    return res.status(200).json({
      choices: [{
        message: {
          role: "assistant",
          content: reply
        }
      }]
    });

  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
