import app from "../app.js";
import supertest from "supertest";

const request = supertest(app);


describe("POST /", () => {
    it("Quick test", () => {
        expect(1).toBe(1);
    });
});

describe("POST /weather", () => {
    it("should return weather data for a valid city name", async () => {
        const response = await request.post("/weather").send({ cityName: "Amsterdam" });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("weatherText");
        expect(response.body.weatherText).toContain("Amsterdam");
    });

    it("should return an error if cityName is missing", async () => {
        const response = await request.post("/weather").send({});
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: "City name is required" });
    });

    it("should return an error if the request body is empty", async () => {
        const response = await request.post("/weather").send();
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: "City name is required" });
    });

    it("should return an error if cityName is too long", async () => {
        const longCityName = "a".repeat(101); // Assuming the max length is 100
        const response = await request.post("/weather").send({ cityName: longCityName });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: "City name is too long" });
    });

    it("should return an error if cityName is not a string", async () => {
        const response = await request.post("/weather").send({ cityName: 111111 });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: "City name must be a string" });
    });
});