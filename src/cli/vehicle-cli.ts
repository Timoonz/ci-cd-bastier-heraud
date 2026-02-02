#!/usr/bin/env node
import { createVehicle, CreateVehicleOptions } from './create-vehicle';
import { ListVehiclesOptions, listVehicles } from './list-vehicles';
import { DeleteVehicleOptions, deleteVehicle} from './delete-vehicle';
import { Command } from 'commander';

const program = new Command()

program
    .name('vehicle-cli')
    .description('CLI for interacting with the HTPP passed on by the user')
    .requiredOption('--address <url>', 'Server URL', 'localhost:8080')

// cli create-vehicle
program.command('create-vehicle')
    .description('Create a vehicle on the designated server address')
    .requiredOption('--shortcode <shortcode>', 'Shortcode of the vehicle (4 chars long)')
    .requiredOption('--battery <level>', 'Battery level (0 to 100)')
    .requiredOption('--longitude <long>', 'Longitude of the vehicle (between -90 and 90)')
    .requiredOption('--latitude <lat>', 'Latitude of the vehicle (between -90 and 90)')
    .action(async (cmdOptions: CreateVehicleOptions) => {
        await createVehicle({
            ...cmdOptions,
            server_address: program.opts().address
            })
        });

// cli list-vehicles
program.command('list-vehicles')
    .description('List all vehicles on the designated server')
    .action(async (cmdOptions: ListVehiclesOptions) => {
        await listVehicles({
            ...cmdOptions,
            server_address: program.opts().address})
        });


// cli delete-vehicle
program.command('delete-vehicle')
    .description('Delete the designated vehicle on the designated server')
    .requiredOption('--shortcode <shortcode>', 'Shortcode of the vehicle (4 chars long)')
    .action(async (cmdOptions: DeleteVehicleOptions) => {
        await deleteVehicle({
            ...cmdOptions,
            server_address: program.opts().address})
    });

program.parse();

    