const axios = require('axios');


class Busqueda {

    historial = ['Ciudad 1', 'Ciudad 2'];

    constuctor(){
        //TODO_: leer db
    }

    async buscarLugar(lugar = ''){
        //peticion http
        const resp = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/'+lugar+'.json?limit=5&language=es&access_token=pk.eyJ1IjoibXBhcmlzaSIsImEiOiJjbDB5d3BtZGYwbDV2M2RvMGZzOTZqMW9lIn0.rvaWf1wCXWcVDTBbjHqAJA')
        console.log(resp.data);

        return []; // retornar lugares q coincidan con la busqueda
    }

}

module.exports = Busqueda;