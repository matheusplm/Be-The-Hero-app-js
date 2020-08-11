import React,{useEffect,useState} from 'react';

//importando css
import './styles.css';

//importando um botao em expecifico
import {FiPower,FiTrash2} from 'react-icons/fi';

//importando imagens
import imgLogo from '../../assets/logo.svg';

//componente de SPA do react
import{Link,useHistory} from 'react-router-dom';

//importando a api do axios
import api from '../../services/api';

export default function Profile(){
    const [incidents,setincidents]=useState([]);

    const nome = localStorage.getItem('ongNome');
    const ongID = localStorage.getItem('ongID');

    const history = useHistory();

    useEffect(()=>{
        api.get('perfil',{
            headers:{
                autenticar: ongID,
            }
        }).then(response=>{
            setincidents(response.data);
        });
    },[ongID]);

    async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`,{
                headers:{
                    autenticar: ongID
                }
            });
            setincidents(incidents.filter(incident=>incident.id!==id));
        }catch(err){
            alert('Erro ao deletar o caso.');
        };
    };

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <img src={imgLogo} alt="logo"/>
                    <span>Bem vinda, {nome}</span>
                <Link className="button" to="/casos/novo">
                        Cadastrar novo caso.
                </Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color={"#e02041"}/>
                </button>
            </header>
            <h1>Casos cadastrados</h1>

            <ul>
                
                {incidents.map(incidents=>(
                    <li key={incidents.id}>
                        <strong>CASO:</strong>
                        <p>{incidents.titulo}</p>
                        <strong>DESCRIÇÃO</strong>
                        <p>{incidents.descricao}</p>
                        <strong>VALOR</strong>
                        <p>{Intl.NumberFormat('pt-BR',{style: 'currency',currency:'BRL'}).format(incidents.valor)}</p>
                        <button type="button" onClick={()=>handleDeleteIncident(incidents.id)} >
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                ))} 
            </ul>

        </div>
    );
}