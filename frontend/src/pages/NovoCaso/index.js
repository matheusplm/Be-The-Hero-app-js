import React,{useState} from 'react';

//importando css
import './styles.css';

//importando um botao em expecifico
import {FiArrowLeft} from 'react-icons/fi';

//importando imagens
import imgLogo from '../../assets/logo.svg';

//componente de SPA do react
import{Link,useHistory} from 'react-router-dom';

//importando a api do axios
import api from '../../services/api';

//funcao padrao
export default function NovoCaso(){
    const [titulo,settitulo]=useState('');
    const [descricao,setdescricao]=useState('');
    const [valor,setvalor]=useState('');

    const history=useHistory();

    const ongID = localStorage.getItem('ongID');

    async function handleNovoCaso(e){
        e.preventDefault();
        const data={
            titulo,
            descricao,
            valor
        };

        try{
            await api.post('incidents',data,{
                headers:{
                    autenticar: ongID
                }
            });

            history.push('/profile');
        }catch(err){
            alert('Não foi possivel criar caso :c.')
        };
    }
    return(
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={imgLogo} alt="Logo"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente.</p>
                    <Link className="iconLink" to="/profile">
                        <FiArrowLeft size={16} color="e02041"/>
                        Voltar para home
                    </Link>
                </section>
                
                <form onSubmit={handleNovoCaso}>
                    <input 
                        placeholder="Titulo do caso"
                        value={titulo}
                        onChange={e=>settitulo(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descrição"
                        value={descricao}
                        onChange={e=>setdescricao(e.target.value)}
                    />
                    <input 
                        placeholder="Valor em reais"
                        value={valor}
                        onChange={e=>setvalor(e.target.value)}
                    />
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}