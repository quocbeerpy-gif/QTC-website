export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  res.status(200).json({
    choices: [
      {
        message: {
          role: 'assistant',
          content: 'Dạ chào anh Quốc! Hệ thống chat hiện đã hoạt động ổn định. Anh có thể nhắn Zalo 0912 223 103 để được hỗ trợ trực tiếp nhanh nhất ạ!'
        }
      }
    ]
  });
}
