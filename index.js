const { inquirerMenu, pausa, leerInput } = require('./helpers/inquirer');
const Busqueda = require('./models/busqueda');

const main = async() => {
    let optMenu = '';

    const busqueda = new Busqueda();

    do {
        optMenu = await inquirerMenu();

        switch(optMenu) {
            case 1:
                //Buscar lugares
                const lugar = await leerInput('Ingrese lugar a buscar: ');

                busqueda.buscarLugar(lugar);
                
                //listarlos
                //seleecionar lugar
                //obtener datos del clima
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad:');
                console.log('Latitiud:');
                console.log('Longitud:');
                console.log('Temperatura:');
                console.log('Temperatura mínima:');
                console.log('Temperatura máxima:');
                break;
        }

        await pausa(optMenu);

    } while (optMenu !== 0)
}

main();