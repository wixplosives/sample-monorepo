import path from 'path';
import express from 'express';
import compression from 'compression';
import ReactDOMServer from 'react-dom/server';
import { App } from '@sample/app';

const appRootDirectory = path.dirname(require.resolve('@sample/app/package.json'));
const appBundleDirectory = path.join(appRootDirectory, 'umd');

export function createHttpServer(): express.Express {
  const app = express();

  app.use(compression());
  app.use(express.static(appBundleDirectory));
  app.get('/server', ssrHandler);

  return app;
}

function ssrHandler(_req: express.Request, res: express.Response) {
  res.end(
    `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="Description" content="Monorepo example server-side renderer app">
    <title>Monorepo Example</title>
    <link href="main.css" rel="stylesheet">
</head>
<body>
    <div id="SITE_MAIN" data-ssr>
        ${ReactDOMServer.renderToString(<App text="Hello World (SSR!)" />)}
    </div>
    <script type="text/javascript" src="main.js"></script>
</body>
</html>`
  );
}
