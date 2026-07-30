const React = require('react');
const ReactDOMServer = require('react-dom/server');
const Markdown = require('react-markdown').default;
const rehypeRaw = require('rehype-raw').default;

const result = ReactDOMServer.renderToString(
  React.createElement(Markdown, {
    rehypePlugins: [rehypeRaw],
    children: '<div align="center"><img src="test.png" width="80" /></div>'
  })
);

console.log("RESULT:", result);
