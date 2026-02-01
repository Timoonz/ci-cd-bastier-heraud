import { createVehicle, CreateVehicleOptions } from './create-vehicle';
import { Command } from 'commander';

const program = new Command()

program
    .name('vehicle-cli')
    .description('CLI for interacting with the HTPP passed on by the user')
    .requiredOption('--address <url>', 'Server URL', 'localhost:8080')

program.command('create-vehicle')
    .description('Create a vehicle on the designated server address')
    .requiredOption('--shortcode <shortcode>', 'Shortcode of the vehicle (4 chars long)')
    .requiredOption('--battery <level>', 'Battery level (0 to 100)')
    .requiredOption('--longitude <long>', 'Longitude of the vehicle')
    .requiredOption('--latitude <lat>', 'Latitude of the vehicle')
    .action(async (cmdOptions: CreateVehicleOptions) => {
        await createVehicle({
            ...cmdOptions,
            server_address: program.opts().address
    })
    });

program.parse();

    