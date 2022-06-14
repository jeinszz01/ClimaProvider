import useClima from "../hooks/useClima"

const Resultado = () => {
    const { resultado } = useClima()
    const { name, main } = resultado

    // La temperatura q devuelve la api es en kelvin por defecto pero lo cambiamos en el link agregando opcional: &units=metric
    //const kelvin = 273.15 / esto lo restabamos al resultado y nos ofrece en celcius

    return (
        <div className="contenedor clima">
            <h2>El clima de {name} es:</h2>

            <p>{parseInt(main.temp)} <span>&#x2103;</span></p>
            <div className="temp_min_max">
                <p>Mín: {parseInt(main.temp_min)} <span>&#x2103;</span></p>
                <p>Máx: {parseInt(main.temp_max)} <span>&#x2103;</span></p>
            </div>


        </div>
    )
}

export default Resultado