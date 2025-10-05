const container = require('markdown-it-container');

module.exports = function(md) {
  const containerTypes = ['success', 'tip', 'warning', 'error', 'comment', 'info', 'danger'];
  
  containerTypes.forEach(type => {
    md.use(container, type, {
      validate: function(params) {
        // 更健壮的验证，处理前后空格
        return params.trim().split(/\s+/)[0] === type;
      },
      render: function (tokens, idx) {
        const token = tokens[idx];
        if (token.nesting === 1) {
          // 添加调试信息
          console.log(`Rendering ${type} container`);
          return `<div class="custom-container ${type}">\n`;
        } else {
          return '</div>\n';
        }
      }
    });
  });
};