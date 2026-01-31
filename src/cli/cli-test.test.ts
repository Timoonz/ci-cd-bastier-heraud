import { describe, beforeEach, afterEach, test } from '@jest/globals';
import axios from 'axios';
import { createVehicle, CreateVehicleOptions } from './create-vehicle';


// On veut créer un faux serveur HTPP vers lequel tester la fonction createVehicle
// Nous allons utiliser la librairie axios pour faire des appels au serveur, 
// et donc nous devons mocker le module axios
jest.mock('axios');



//Options valides pour les test de la fonction createVehicle
const testOptions: CreateVehicleOptions = {
  server_address:   'localhost:8080',
  shortcode: 'abcd',
  battery:   12,
  longitude: 20.0,
  latitude:  30.0,
};

// On réinitialise l'état du mock avant chaque test
beforeEach(() => {
    jest.resetAllMocks();
    jest.spyOn(console, 'log').mockImplementation();   // on capture console.log
    jest.spyOn(console, 'error').mockImplementation(); // et console.error
});

// Après chaque test, on reset les mocks à leurs états originaux
afterEach(() => {
    jest.restoreAllMocks();
});



describe("create-vehicle", () => {

    test('Requête POST correctement envoyée, et renvoie bien la confirmation', async () => {

        (axios.post as jest.Mock).mockResolvedValueOnce({data: { id: 34 }});

        await createVehicle(testOptions);

        // On vérifie que l'on a bien fait une unique demande au serveur
        expect(axios.post).toHaveBeenCalledTimes(1);
        // On vérifie qu'elle a été appelée avec les bonnes valeurs
        expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:8080/vehicles',
        { shortcode: 'abcd', battery: 12, longitude: 20.0, latitude: 30.0 }
        );

        // On vérifie que le bon message a été renvoyé à l'utilisateur
        expect(console.log).toHaveBeenCalledWith(
        expect.stringMatching(/Created vehicle `abcd`, with ID `34`/i)
        );

    });

    // Si le serveur renvoie un 400 (Bad Request), la fonction doit renvoyer 
    test('Affiche une erreur de validation quand la réponse serveur est 400' , async () => {

        (axios.post as jest.Mock).mockRejectedValueOnce({
            response: {
                status: 400,
                data: {
                errors: [
                    'Shortcode must be only 4 characters long']
                },
            },
        });

        await createVehicle({ ...testOptions, shortcode: 'abcdef' });

        expect(console.error).toHaveBeenCalledWith(
        expect.stringMatching(/Could not create the vehicle/i)
        );
        expect(console.error).toHaveBeenCalledWith(
        expect.stringMatching(/Shortcode must be only 4 characters long/i)
        );
    });

    test('Plusieurs erreurs de validation', async () => {

                (axios.post as jest.Mock).mockRejectedValueOnce({
            response: {
                status: 400,
                data: {
                errors: [
                    'Shortcode must be only 4 characters long',
                    'Battery level must be between 0 and 100']
                },
            },
        });

        await createVehicle({ ...testOptions, shortcode: 'veryBigLargeAndBeautifulVehicle', battery: 1048 });

    });

})