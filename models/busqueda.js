const axios = require('axios');


class Busqueda {

    historial = ['Ciudad 1', 'Ciudad 2'];

    constuctor(){
        //TODO_: leer db
    }

    get mapboxParams() {
        return {
            'access_token': 'pk.eyJ1IjoibXBhcmlzaSIsImEiOiJjbDB5d3BtZGYwbDV2M2RvMGZzOTZqMW9lIn0.rvaWf1wCXWcVDTBbjHqAJA',
            'limit': 5,
            'language': 'es'
        }
    }

    async buscarLugar(lugar = ''){
        //peticion http
        
        const instance = axios.create({
            baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+lugar+'.json',
            timeout: 3000,
            params: this.mapboxParams
          });

        const resp = await instance.get();
        console.log(resp.data);

        return []; // retornar lugares q coincidan con la busqueda
    }

}

module.exports = Busqueda;