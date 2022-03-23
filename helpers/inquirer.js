const inquirer = require('inquirer');
require('colors');

const opcionesMenu = [
    {
        type: 'list',
        name: 'opcionSeleccionada',
        message: 'Selecciones una opción'.green,
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Buscar Ciudad`, 
            },
            {
                value: 2,
                name: `${'2.'.green} Historial`, 
            },
            {
                value: 0,
                name: `${'0.'.green} Salir`, 
            }
        ]

    }
]

const opcionPausa = [
    {
        type: 'input',
        name: 'optPausa',
        message: `Presione ${'ENTER'.green} para continuar`
    }
]
const inquirerMenu = async() => {

    console.clear();
    const opt = await inquirer.prompt(opcionesMenu);

    return opt.opcionSeleccionada;

}

const pausa = async (opcionMenuSeleccionada) => {
    if(opcionMenuSeleccionada !== 0){
        console.log('\n');
        const inputPausa = await inquirer.prompt(opcionPausa);
        return inputPausa;
    }
}

const leerInput = async(message) => {

    const question = [
        {   
            type: 'input',
            name: 'desc',
            message,
            validate (value) {
                if(value.length === 0) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }

    ]

    const {desc} = await inquirer.prompt(question);
    return desc;

}



const seleccionarLugar = async(lugares = []) => {

    const choices = lugares.map( (lugar, indice) => {

        const idx = `${indice+1}.`.green;
        return {
            value: lugar.id,
            name: `${idx} ${lugar.nombre}`
        }
    });

    choices.unshift({
            value: '0',
            name: '0.'.green + ' Cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione lugar:',
            choices
        }
    ]

    const {id} = await inquirer.prompt(preguntas);
    return id;
}

const confirmar = async(message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const { ok } = await inquirer.prompt(question);
    return ok;
}

module.exports = {inquirerMenu, pausa, leerInput, seleccionarLugar, confirmar}