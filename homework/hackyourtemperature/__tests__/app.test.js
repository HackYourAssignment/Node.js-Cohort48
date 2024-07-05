import supertest from 'supertest';
import app from '../app.js';

const request = supertest.agent(app);

describe("POST /", () => {
  it("Quick test", () => {
      expect(1).toBe(1);
  });
});

describe("GET /", () => {
  it("Should return welcome text and status 200", async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe("hello from backend to frontend!");
  });
});

describe('POST /weather', () => {
  it('should return a 400 status code if city is not provided', async () => {
    const response = await request
      .post('/weather')
      .send({});

    expect(response.status).toBe(400);
  });
});

describe('POST /weather', () => {
  it('should return a 200 status code if city is provided', async () => {
    const response = await request
      .post('/weather')
      .send({ "cityName": 'Khartoum' });

    expect(response.status).toBe(200);
  });
});

describe('POST /weather', () => {
  it('should return a 200 status code if city is provided and weather text', async () => {
    const response = await request
      .post('/weather')
      .send({ "cityName": 'Khartoum' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('weatherText');
    expect(response.body.weatherText).toContain("Khartoum");
  });
});

describe('POST /weather', () => {
  it('should return a 500 status code if city is not found', async () => {
    const response = await request
      .post('/weather')
      .send({ "cityName": 'Khartoum!' });

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('weatherText');
    expect(response.body.weatherText).toContain("City not found: Khartoum!");
  });
});
describe('GET /nonexistent', () => {
  it('should return a 404 status code for non-existent routes', async () => {
    const response = await request.get('/nonexistent');
    expect(response.status).toBe(404);
  });
});
