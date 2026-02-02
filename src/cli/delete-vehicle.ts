/* eslint-disable  @typescript-eslint/no-explicit-any */ 
import axios from 'axios';

export interface DeleteVehicleOptions {
  server_address: string;
  shortcode: string;
}

interface Vehicle {
  id: number;
  shortcode: string;
  battery: number;
  position: { longitude: number; latitude: number };
}

interface ListResponse {
  vehicles: Vehicle[];
}

// Suppression d'un véhicule en envoyant une requête DELETE au serveur
export async function deleteVehicle(options: DeleteVehicleOptions) {
  const { server_address, shortcode } = options;
  try {
    // Récupération de la liste des véhicules, pour obtenir l'ID du véhicule à supprimer
    const response = await axios.get(`http://${server_address}/vehicles`);
    const list_vehicles = response.data as ListResponse;

    // Recherche du véhicule par son shortcode. On prend le premier match
    const target = list_vehicles.vehicles.find((v: any) => v.shortcode === shortcode);

    if (!target) {
      console.error(`Vehicle with shortcode \`${shortcode}\` not found.`);
      return false;
    }

    // Suppression du véhicule par son ID
    await axios.delete(`http://${server_address}/vehicles/${target.id}`);
    console.log(`Deleted vehicle \`${shortcode}\` (ID: ${target.id})`);
    return true;
    
  } catch (error: any) {
    // Gestion des erreurs de validation renvoyées par le serveur (400)
    if (error.response?.status === 400 && error.response?.data?.errors?.length > 0) {
      console.error("Could not delete the vehicle");
      for (const errMsg of error.response.data.errors) {
        console.error(errMsg);
      }
      return false;
    }

    // Erreurs serveur
    console.error("Server error :", error?.message ?? error);
    return false;
  }
}