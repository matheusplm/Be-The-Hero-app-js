import React,{useState} from 'react';
//importar unicamente o icone de login
import {FiLogIn} from 'react-icons/fi';

//componente de SPA do react
import{Link,useHistory} from 'react-router-dom';

//stylo
import './styles.css';

//importando imagens
import imgHeroes from '../../assets/heroes.png';
import imgLogo from '../../assets/logo.svg';

//importando a api do axios
import api from '../../services/api';

export default function Logon(){
    const[id,setid]=useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try{
            const response =await api.post('login',{id});
            //salvar isso no armazenamento do navegador
            localStorage.setItem('ongID',id);
            localStorage.setItem('ongNome',response.data.nome);

            history.push('/profile');
        }catch(err){
            alert("Falha ao conectar, tente novamente");
        }
    }

    return(
        <div className="logon-container">
            <section className="form">
                <img src={imgLogo} alt="logo"/>
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon.</h1>
                    <input 
                        placeholder="Sua ID"
                        value={id}
                        onChange={e=>setid(e.target.value)}
                    />
                    <button className="button" type="submit">Logar</button>
                    <Link className="iconLink" to="/registro">
                        <FiLogIn size={16} color="e02041"/>
                        Não tenho uma ID.
                    </Link>
                </form>
            </section>
            
            <img src={imgHeroes} alt="heroes"/>
        </div>
    );
}