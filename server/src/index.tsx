import * as React from 'react';
import { App } from 'app';
import * as ReactDOMServer from 'react-dom/server';
import express = require('express');
import { dirname, join } from 'path';

const app = express();
const port = 3000;

const appRootDirectory = dirname(require.resolve('app/package.json'))
const appDistDirectory = join(appRootDirectory, 'dist')

app.use(express.static(appDistDirectory))
app.get('/server', (_req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Webpack App</title>
  </head>
  <body>
  <div id="SITE_MAIN" data-ssr>
    ${ReactDOMServer.renderToString(<App text="Hello World (SSR!)" />)}
  </div>
  <script type="text/javascript" src="main.js"></script></body>
</html>
`.trim())
  res.end()
})

app.listen(port, (err: Error) => {
  if (err) {
    console.log(err);
  }

  console.log(`Listening to port ${port}`)
});
