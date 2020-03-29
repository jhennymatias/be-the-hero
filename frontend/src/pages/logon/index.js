import React, {useState} from 'react';
import {Link,useHistory} from 'react-router-dom';
import './styles.css';
import {FiLogIn} from "react-icons/fi";
import api from '../../services/api'

//img --------------------------------------
import heroesImg from '../../img/heroes.png';
import logo from '../../img/logo.svg';

function Logon() {
  const [id, setId] = useState('');
  const histoty = useHistory();
  
  async function handleLogin(e){
    e.preventDefault();
    
    try{
      const response = await api.post('sessions', {id});
      localStorage.setItem('ongId', id);
      localStorage.setItem('name', response.data.name);
      histoty.push('/profile');
    } catch (err) {
      alert('Erro no login, tente novamente');
    }
  }
  return ( 
    <div className = "logon-container">
        <section className = "form">
            <img src= {logo} alt="logo"/>

            <form onSubmit = {handleLogin}>
                <h1>Faça seu Logon</h1>
                <input 
                value = {id}
                onChange = {e => setId(e.target.value)} 
                placeholder="Sua ID"/>
                <button type="submit" className= "btn">Entrar</button>
                <Link className="back-link" to = "/register">
                <FiLogIn size = {16} color = "#E02041"/>
                Não tenho cadastro</Link>
            </form>
        </section>
        <img src = {heroesImg} alt= "be the hero"/>
    </div>
  );
}

export default Logon;
