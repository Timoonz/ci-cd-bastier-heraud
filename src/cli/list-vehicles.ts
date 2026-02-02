/* eslint-disable  @typescript-eslint/no-explicit-any */ 
import axios from 'axios';

export interface ListVehiclesOptions {
  server_address: string;
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

// Récupération de la liste des véhicules en envoyant une requête GET au serveur
export async function listVehicles(options: ListVehiclesOptions) {
  const { server_address } = options;

  try {
    const response = await axios.get(`http://${server_address}/vehicles`);
    const list_vehicles = response.data as ListResponse;

    console.log("List of vehicles:");
    for (const v of list_vehicles.vehicles) {
      console.log(`- ID: ${v.id}, Shortcode: ${v.shortcode}, Battery: ${v.battery}%, Position: (${v.position.longitude}, ${v.position.latitude})`);
    }
    return list_vehicles.vehicles;

    } catch (error: any) {
    // Erreurs serveur
    console.error("Server error :", error?.message ?? error);
    return [];
  }
}