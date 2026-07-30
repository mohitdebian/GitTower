import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

const result = ReactDOMServer.renderToString(
  React.createElement(Markdown, {
    rehypePlugins: [rehypeRaw],
    children: '<div align="center"><img src="test.png" width="80" /></div>'
  })
);

console.log("RESULT:", result);
