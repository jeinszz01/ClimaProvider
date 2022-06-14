import { useState, createContext } from "react";
import axios from "axios";

const ClimaContext = createContext()

const ClimaProvider = ({children}) => {

    //console.log(import.meta.env.VITE_API_KEY)   // Variable de entorno. .env

    const [busqueda, setBusqueda] = useState({
        ciudad: '',
        pais: ''
    })

    const [ resultado, setResultado ] = useState({})
    const [ cargando, setCargando ] = useState(false) //*** */
    const [ cityInvalida, setCityInvalida ] = useState(false)

    const datosBusqueda = e => {
        setBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        })
    }

    // consultamos nuestro clima con los datos enviados en el formulario.
    const consultarClima = async datos => {
        
        setCargando(true)/**** */
        setCityInvalida(false)
        try {
            const { ciudad, pais } = datos

            const appId = import.meta.env.VITE_API_KEY
            //consultamos la api y obtenemos la latitud y longitud. entre otros datos
            const url = `http://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${appId}`
            const { data } = await axios(url)
            
            const { lat, lon } = data[0]
            
            const urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}&units=metric`
            const { data : clima } = await axios(urlClima) // como existe data se renombra con : para no tener error.
            setResultado(clima)
            

        } catch (error) {
            setCityInvalida('No hay Resultados')
        } finally {
            // Esto se ejecuta al final del try y catch
            setCargando(false) /*** */
        }
    }

    return (
        <ClimaContext.Provider
            value={{
                busqueda,
                datosBusqueda,
                consultarClima,
                resultado,
                cargando,
                cityInvalida
            }}
        >
            {children}
        </ClimaContext.Provider>
    )
}

export {
    ClimaProvider
}

export default ClimaContext
