export function urlify(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, function (url) {
    return `<a href="${url}">${url}</a>`;
  });
}

// Usage example
// const text = 'Find me at http://www.example.com and also at http://stackoverflow.com';
// const html = urlify(text);
//
// console.log(html)
// 'Find me at <a href="http//www.example.com">http//www.example.com</a> and also at ...'
