import { describe, beforeEach, afterEach, test } from '@jest/globals';
import { createVehicle, CreateVehicleOptions } from './create-vehicle';


// On veut créer un faux serveur HTPP vers lequel tester la fonction createVehicle
// Comme les fonctions ne sont pas implémentées, on suppose que l'on va utiliser des fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;



//Options valides pour les test de la fonction createVehicle
const testOptions: CreateVehicleOptions = {
  server_address:   'localhost:8080',
  shortcode: 'abcd',
  battery:   12,
  longitude: 20.0,
  latitude:  30.0,
};

function fakeResponse(status: number, body: unknown) {
  return {
    status,
    ok: status >= 200 && status < 300,
    json: jest.fn().mockResolvedValue(body),
  };
}

// On réinitialise l'état du mock avant chaque test
beforeEach(() => {
  mockFetch.mockReset();
  jest.spyOn(console, 'log').mockImplementation();   // on capture console.log
  jest.spyOn(console, 'error').mockImplementation(); // et console.error
});

// Après chaque test, on reset les mocks à leurs états originaux
afterEach(() => {
  jest.restoreAllMocks();
});



describe("create-vehicle", () => {

    test('Requête POST correctement envoyée, et renvoie bien la confirmation', async () => {

        mockFetch.mockResolvedValueOnce(fakeResponse(201, { id: 34 }));

        await createVehicle(testOptions);

        // On vérifie que l'on a bien 
        expect(mockFetch).toHaveBeenCalledTimes(1);
        // On vérifie ce que la fonction a envoyé au serveur
        expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:8080/vehicles',
        expect.objectContaining({
            method: 'POST',
            headers: expect.objectContaining({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({
            shortcode: 'abcd',
            battery:   12,
            longitude: 20.0,
            latitude:  30.0,
            }),
        })
        );

        expect(console.log).toHaveBeenCalledWith(
        expect.stringMatching(/Created vehicle `abcd`, with ID `34`/i)
        );

    })

})