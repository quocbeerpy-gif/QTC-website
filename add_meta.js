const fs = require('fs');

const metaTag = `<meta name="google-site-verification" content="iRziuNW6zibLMWh4Z4NRtYBGNwXnVa9n_DP7Ppr6U1Q">
<meta name="description" content="QTC AI - Giải pháp AI chuyên sâu cho doanh nghiệp. Tự động hóa quy trình, trợ lý ảo và giải pháp công nghệ thông minh.">
<meta name="keywords" content="QTC AI, QTC, AI doanh nghiệp, trợ lý ảo, giải pháp AI">
<meta name="robots" content="index, follow">`;

['QTC AI.html', 'index.html'].forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    if (!content.includes('google-site-verification')) {
      content = content.replace('<head>', '<head>\n' + metaTag);
      fs.writeFileSync(file, content, 'utf8');
      console.log('Updated ' + file);
    } else {
      console.log(file + ' already contains verification tag');
    }
  }
});
