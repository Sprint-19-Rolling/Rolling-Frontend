import DOMPurify from 'dompurify';

export const SANITIZE_CONFIG = {
  ALLOWED_TAGS: [
    'p',
    'br',
    'strong',
    'b',
    'em',
    'i',
    'u',
    's',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'ul',
    'ol',
    'li',
    'a',
    'img',
    'span',
    'div',
    'blockquote',
    'code',
    'pre',
  ],
  ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'style'],
};

export const SANITIZE_CONFIG_MESSAGECARD = {
  ALLOWED_TAGS: ['p', 'br', 'ol', 'ul', 'li', 'span', 'img'],
  ALLOWED_ATTR: ['src', 'alt', 'class', 'style'],
};

// DOMPurify의 전역 훅을 설정합니다.
DOMPurify.addHook('uponSanitizeAttribute', (node, data) => {
  if (data.attrName === 'style') {
    const allowedStyles = [
      'color',
      'background-color',
      'text-align',
      'font-weight',
      'font-style',
      'text-decoration',
    ];
    const styleObj = {};
    data.attrValue.split(';').forEach((item) => {
      const [key, value] = item.split(':').map((s) => s?.trim());
      if (key && value && allowedStyles.includes(key.toLowerCase())) {
        styleObj[key] = value;
      }
    });
    data.attrValue = Object.entries(styleObj)
      .map(([k, v]) => `${k}: ${v}`)
      .join('; ');
    if (!data.attrValue) {
      delete node.style;
    }
  }
});
