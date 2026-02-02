/* eslint-disable  @typescript-eslint/no-explicit-any */ 
import axios from 'axios';

export interface DeleteVehicleOptions {
  server_address: string;
  shortcode: number;
}

// Suppression d'un véhicule en envoyant une requête DELETE au serveur
export async function deleteVehicle(options: DeleteVehicleOptions) {
  const { server_address, shortcode } = options;
  try {
    await axios.delete(`http://${server_address}/vehicles/${shortcode}`);
    console.log(`Deleted vehicle with shortcode \`${shortcode}\``);
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