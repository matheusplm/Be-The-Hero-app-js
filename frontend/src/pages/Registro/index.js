import React,{useState} from 'react';
import "./styles.css";

//componente de SPA do react
import{Link,useHistory} from 'react-router-dom';

//importar unicamente o icone de login
import {FiArrowLeft} from 'react-icons/fi';

//importando logo
import imgLogo from '../../assets/logo.svg';

//importando a api do axios
import api from '../../services/api';

export default function Registro(){
    const [nome,setname]=useState('');
    const [email,setemail]=useState('');
    const [whatsapp,setwhatsapp]=useState('');
    const [cidade,setcidade]=useState('');
    const [UF,setuf]=useState('');

    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();

        const data = {
            nome,
            email,
            whatsapp,
            cidade,
            UF,
        };
        
        try{
            const response = await api.post('ongs',data);
            alert(`Seu ID de acesso ${response.data.id}`);
            history.push('/');
        }catch(err){
            alert("Erro no cadastro, tente novamente.");
        }  
    }

    return(
        <div className="register-conteiner">
            <div className="content">
                <section>
                    <img src={imgLogo} alt="Logo"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro e entre para a plataforma.</p>
                    <Link className="iconLink" to="/">
                        <FiArrowLeft size={16} color="e02041"/>
                        Retorne a página inicial
                    </Link>
                </section>
                
                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome da ONG"
                        value={nome}
                        onChange={e=>setname(e.target.value)}
                    />

                    <input 
                        type="email" 
                        placeholder="E-mail"
                        value={email}
                        onChange={e=>setemail(e.target.value)}
                    />

                    <input 
                        placeholder="Whatsapp"
                        value={whatsapp}
                        onChange={e=>setwhatsapp(e.target.value)}
                    />

                    <div className="cid-uf">
                        <input 
                            placeholder="Cidade"
                            value={cidade}
                            onChange={e=>setcidade(e.target.value)}
                        />

                        <input 
                            placeholder="UF"
                            maxLength="2"
                            style={{width:80}}
                            value={UF}
                            onChange={e=>setuf(e.target.value)}
                        />
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}