require('dotenv').config();
const { inquirerMenu, pausa, leerInput, seleccionarLugar } = require('./helpers/inquirer');
const Busqueda = require('./models/busqueda');

const main = async() => {
    let optMenu = '';

    const busqueda = new Busqueda();

    do {
        optMenu = await inquirerMenu();

        switch(optMenu) {
            case 1:
                //Buscar lugares
                const stringABuscar = await leerInput('Ingrese lugar a buscar: ');
                const lugares = await busqueda.buscarLugar(stringABuscar);

                //listarlos y seleccionarlos
                const id = await seleccionarLugar(lugares);
                if(id === '0') continue; //si selecciono Cancelar

                const lugarSeleccionado = lugares.find(lugar => lugar.id === id);
                busqueda.agregarHistorial(lugarSeleccionado.nombre);

                const clima = await busqueda.buscarClima(lugarSeleccionado.latitud, lugarSeleccionado.longitud);
                
                //mostrar datos del clima
                console.clear();
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad:', lugarSeleccionado.nombre.green);
                console.log('Latitiud:', lugarSeleccionado.latitud);
                console.log('Longitud:', lugarSeleccionado.longitud);
                console.log('Temperatura:', clima.temperaturaActual);
                console.log('Temperatura mínima:', clima.temperaturaMinima);
                console.log('Temperatura máxima:', clima.temperaturaMaxima);
                console.log('Descripcion clima:', clima.descripcionClima.green);
                break;
            case 2:
                busqueda.historialCapitalizado.forEach( (lugar, i) => {
                    console.log(`${i+1}.`.green, ` ${lugar}`);
                })
                break;
        }

        await pausa(optMenu);

    } while (optMenu !== 0)
}

main();