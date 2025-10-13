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
