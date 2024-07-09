import supertest from 'supertest';
import app from '../app.js';

const request = supertest(app);

describe('POST /', () => {
  it('Quick test', () => {
    expect(1).toBe(1);
  });
});


describe('GET /', () => {
  it('should return a welcome message', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('hello homy from backend to frontend!');
  });
});

describe('POST /weather', () => {
  it('should return weather for a valid city', async () => {
    const response = await request.post('/weather').send({ cityName: 'Amsterdam' });
    expect(response.status).toBe(200);
    expect(response.body.weatherText).toContain('The current temperature in Amsterdam is');
  });
});

it('should return error if city name is not a string', async () => {
  const response = await request.post('/weather').send({ cityName: 12345 });
  expect(response.status).toBe(400);
  expect(response.body.error).toBe('City name must be a string');
});