const fs = require('fs');
capitalize = require('capitalize')

const axios = require('axios');


class Busqueda {

    historial = [];
    dbPath = './db/database.json';

    constructor(){
        this.leerDB();
    }

    get historialCapitalizado() {
        return this.historial.map( lugar => capitalize.words(lugar) );
    }

    get mapboxParams() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    get openweathermapParms() {
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric',
            'lang': 'es'
        }
    }

    async buscarLugar(lugar = ''){
        //peticion http
        
        try{
            const instance = axios.create({
                baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+lugar+'.json',
                timeout: 3000,
                params: this.mapboxParams
            });

            const resp = await instance.get();

            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                longitud: lugar.center[0],
                latitud: lugar.center[1]
            }))
        } catch (error) {
            return [];
        }

    }

    async buscarClima(lat, lon) {
        try{
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                timeout: 3000,
                params: { ...this.openweathermapParms, lat, lon } //desestructuracion y agregado de otros params
            });

            const resp = await instance.get();

            return { 
                temperaturaActual: (resp.data.main.temp), 
                temperaturaMinima: (resp.data.main.temp_min), 
                temperaturaMaxima: (resp.data.main.temp_max), 
                descripcionClima: (resp.data.weather[0].description)
            };
        } catch (error) {
            console.log(error);
        }
    }

    async agregarHistorial(lugar = '') {

        if(this.historial.includes(lugar.toLocaleLowerCase())){
            return;  //si el lugar ya existe en el historial no agrego nada
        }
        this.historial = this.historial.splice(0, 5); //limito el historial a 6 lugares
        this.historial.unshift(lugar.toLocaleLowerCase());
        this.guardarDB();
    }

    guardarDB() {

        const payload = {
            historial: this.historial
        }
        fs.writeFileSync(this.dbPath, JSON.stringify(payload));

    }

    leerDB() {
        if (fs.existsSync(this.dbPath)) {
            const db = fs.readFileSync(this.dbPath, {encoding: 'utf-8'});
            const data = JSON.parse(db);
            this.historial = data.historial;
        }
    }

}

module.exports = Busqueda;