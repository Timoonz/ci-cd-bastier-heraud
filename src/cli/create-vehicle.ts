

export interface CreateVehicleOptions {
  server_address:   string;
  shortcode: string;
  battery:   number;
  longitude: number;
  latitude:  number;
}

//Pour l'instant pas d'implémentation de la fonction
export async function createVehicle(options: CreateVehicleOptions) {

    // const {server_address, shortcode, battery, longitude, latitude} = options;
    
    return options

}