const server = require('./server');
test('json', async () => {
  const res = await server.get('/json');
  expect(res.body).toEqual({
    title: 'koa2 json',
  });
  expect(res.body.title).toBe('koa2 json');
});
