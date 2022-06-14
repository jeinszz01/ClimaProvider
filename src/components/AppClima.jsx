import Formulario from "./Formulario"
import Resultado from "./Resultado"
import useClima from "../hooks/useClima"
import Spinner from "./Spinner"

const AppClima = () => {

    const { resultado, cargando, cityInvalida } = useClima()
    
    return (
        <>
            <main className="dos-columnas">
                <Formulario />

                {/* { resultado && <Resultado /> } // Se seguira mostrando Resultado por que resultado es un objeto( los objetos se renderizan) 
                    // Cuando tienes un objeto q inicialmente no tendrá nada y luego se llenará se coloca '?'. recomendado opcional. (opcional channing)
                */}
                { cargando ? <Spinner /> :
                resultado?.name ? <Resultado /> :
                cityInvalida ? <p>{cityInvalida}</p> :
                <p></p>
                }
                
            </main>
        </>
    )
}

export default AppClima