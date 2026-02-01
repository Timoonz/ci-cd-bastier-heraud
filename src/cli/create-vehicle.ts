const axios = require('axios').default;

export interface CreateVehicleOptions {
  server_address:   string;
  shortcode: string;
  battery:   number;
  longitude: number;
  latitude:  number;
}

// Création d'un véhicule en envoyant une requête POST au serveur
export async function createVehicle(options: CreateVehicleOptions) {
  const { server_address, shortcode, battery, longitude, latitude } = options;

  try {
    const response = await axios.post(`http://${server_address}/vehicles`, {
      shortcode,
      battery,
      longitude,
      latitude,
    });

    const created = response.data;
    console.log(`Created vehicle \`${shortcode}\`, with ID \`${created.id}\``);
    return created;
    
  } catch (error: any) {
    // Gestion des erreurs de validation renvoyées par le serveur (400)
    if (error.response?.status === 400 && error.response?.data?.errors?.length > 0) {
      console.error("Could not create the vehicle");
      for (const errMsg of error.response.data.errors) {
        console.error(errMsg);
      }
      return null;
    }

    // Erreurs serveur
    console.error("Server error :", error?.message ?? error);
    return null;
  }
}