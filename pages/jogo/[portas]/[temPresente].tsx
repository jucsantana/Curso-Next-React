
import style from '../../../styles/Jogo.module.css'
import React, { useEffect, useState } from "react";
import Porta from "../../../components/Porta";
import { criarPortas, atualizarPortas } from "../../../functions/portas";
import Link from "next/link"
import { useRouter } from 'next/router';

export default function Jogo(){
 const router = useRouter();   

 const [portas, setPortas] = useState([])
 const [valido, setValido] = useState(false)

 
useEffect(() =>{
    setPortas(criarPortas(+router.query.portas, +router.query.temPresente))
},[router?.query])

useEffect(() =>{
    const portas = +router.query.portas
    const temPresente = +router.query.temPresente
    const qtdePortasValidas = portas>=3 && portas<=100
    const temPresenteValido = temPresente>=1 && temPresente<=portas
    setValido(qtdePortasValidas && temPresenteValido)
},[portas])

 const renderizarPortas = ()=>{
   return portas.map( porta =>{
     return <Porta 
              key={porta.numero}
              value={porta} 
              onChange = {novaPorta => setPortas(atualizarPortas(portas, novaPorta))}/>
   })
 }

 return (
    <div id={style.jogo}>
        <div className={style.portas}>
            {valido ? renderizarPortas() : <h2>Valores Inválidos</h2>}
        </div>
        <div className={style.botoes}>
            <Link href="/">
                <button>Reiniciar Jogo</button>
            </Link>
        </div>
    </div>

);


}