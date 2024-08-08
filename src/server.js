const hapi = require('@hapi/hapi');
const routes = require('./router');

const init = async () => {
  const server = hapi.server({
    port: 9000,
    host: 'localhost',
  });

  server.route(routes);

  // CORS configuration
  server.ext('onPreResponse', (request, h) => {
    const response = request.response;
    if (response.isBoom) {
      return h.continue;
    }
    response.headers['access-control-allow-origin'] = '*';
    return h.continue;
  });

  await server.start();
  console.log(`Server running at ${server.info.uri}\n`);
};

init().catch(err => {
  console.error(err);
  process.exit(1);
});
