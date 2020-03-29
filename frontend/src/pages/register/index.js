import React, {useState} from 'react';
import './style.css'
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from "react-icons/fi";
import api from '../../services/api'

//img --------------------------------------
import logo from '../../img/logo.svg';


export default function Register() {
  const[name, setName] = useState('')
  const[email, setEmail] = useState('')
  const[whatsapp, setWhatsapp] = useState('')
  const[city, setCity] = useState('')
  const[uf, setUF] = useState('')

  const histoty = useHistory();
  async function handleRegister(e){
    e.preventDefault();
    
    const data  = {
      name,
      email, 
      whatsapp,
      city,
      uf
    };
    try{
      const response = await api.post('ongs', data);
      alert(`Seu ID de acesso:  ${response.data.id}`);
      histoty.push('/');
    } catch (err) {
      alert('Erro no seu cadastro');
    }
  }
  return ( 
    <div className = "register-container">
        <div className="content">
            <section className = "form">
                <img src= {logo} alt="logo"/>
                <h1>Cadastro</h1>
                <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
                <Link className="back-link" to = "/">
                <FiArrowLeft  size = {16} color = "#E02041"/>
                Volte ao logon
                </Link>
            </section>
                
            <form onSubmit ={handleRegister}>
                    <input
                      placeholder="Nome da ONG"
                      value = {name}
                      onChange = {e => setName(e.target.value)}
                      />
                    <input 
                      type = "email"
                      placeholder="E-mail"
                      value = {email}
                      onChange = {e => setEmail(e.target.value)}
                    />
                    <input 
                      placeholder="Whatsapp"
                      value = {whatsapp}
                      onChange = {e => setWhatsapp(e.target.value)}
                    />
                    <div className="input-group">
                      <input 
                        placeholder="Cidade"
                        value = {city}
                        onChange = {e => setCity(e.target.value)}
                      />
                      
                      <input 
                        placeholder="UF"
                        value = {uf}
                        onChange = {e => setUF(e.target.value)} 
                        style={{width: 80}}
                      />
                    </div>
                    
                    <button type="submit" className= "btn">Register</button>
            </form>
        </div>
        
    </div>
  );
}

