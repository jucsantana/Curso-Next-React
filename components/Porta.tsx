import style from '../styles/Porta.module.css'
import PortaModel from '../model/porta'
import Presente from '../components/Presente'

interface PortaProps{
    value: PortaModel
    onChange: (novaPorta: PortaModel) => void
}

export default function Porta(props:PortaProps){
    const porta = props.value
    
    const selecionada = porta.selecionada && !porta.aberta ? style.selecionada : ''
    
    const alternarSelecao = e => props.onChange(porta.alternarSelecao())

    const abrirPorta = e => {
        e.stopPropagation()
        props.onChange(porta.abrir())}
    
    const renderizarPorta = () =>{
        return (
                <div className={style.porta}>
                    <div className={style.numero}>{porta.numero}</div>
                    <div className={style.macaneta} onClick={abrirPorta}></div>
                </div>
        )
    }


    return (
        <div className={style.area} onClick={alternarSelecao}>
            <div className={`${style.estrutura} ${selecionada}`}>
                {porta.aberta ? 
                 porta.temPresente ? <Presente/> : false
                 : renderizarPorta()}
            </div>
            <div className={style.chao}></div>
        </div>
    )
}