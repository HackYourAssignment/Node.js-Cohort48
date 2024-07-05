// __tests__/app.test.js
import request from 'supertest';
import app from '../app.js';

describe('POST /weather', () => {
    it('should return the current temperature for a valid city', async () => {
        const response = await request(app)
            .post('/weather')
            .send({ cityName: 'London' });

        expect(response.status).toBe(200);
        expect(response.body.weatherText).toMatch(/Current temperature in London is/);
    });

    it('should return a city not found message for an invalid city', async () => {
        const response = await request(app)
            .post('/weather')
            .send({ cityName: 'InvalidCityName' });

        expect(response.status).toBe(404);
        expect(response.body.weatherText).toBe('City is not found!');
    });

    it('should return a bad request message when no city name is provided', async () => {
        const response = await request(app)
            .post('/weather')
            .send({});

        expect(response.status).toBe(400);
        expect(response.body.weatherText).toBe('City name is required');
    });
});
