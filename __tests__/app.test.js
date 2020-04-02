require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');

describe('Core App', () => {
  it('is alive', () => {
    return request(app)
      .get('/hello')
      .expect(200)
      .then(res => {
        expect(res.text).toBe('world');
      });
  });

  it('returns 404 on non-api bad path', () => {
    return request(app)
      .get('/bad-path')
      .expect(404);
  });

  it('returns application/json 404 on bad api path', () => {
    return request(app)
      .post('/api/bad-path')
      .expect(404);
  });
});
