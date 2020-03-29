import React, {useState} from 'react';
import './style.css'
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from "react-icons/fi";
import api from '../../services/api'
//img --------------------------------------
import logo from '../../img/logo.svg';

export default function NewIncident() {
    const[name, setName] = useState('')
    const[descricao, setDescricao] = useState('')
    const[value, setValue] = useState('')
    const ongId = localStorage.getItem('ongId');
    const histoty = useHistory();

    async function handleNewIncident(e){
        e.preventDefault();
    
        const data  = {
          name,
          descricao,
          value
        };

        try{
            await api.post('incidents',data,{
                headers :{
                    Authorization: ongId,
                }
            });
            histoty.push('/profile');
        }catch(err){
            alert("Erro ao cadastrar caso")
        }
    }
    return (
        <div className = "new-container">
            <div className="content">
                <section className = "form">
                    <img src= {logo} alt="logo"/>
                    s<h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um héroi para resolver isso.</p>
                    <Link className="back-link" to = "/profile">
                    <FiArrowLeft size ={16} color= "#e02041"/>
                    Voltar para home
                    </Link>
                </section>
                    
                <form  onSubmit = {handleNewIncident} >
                        <input 
                            placeholder="Titulo do caso"
                            value = {name}
                            onChange = {e => setName(e.target.value)}
                        />
                        <textarea 
                            placeholder="Descricao"
                            value = {descricao}
                            onChange = {e => setDescricao(e.target.value)}
                        ></textarea>
                        <input  
                            placeholder="Valor em reais"
                            value = {value}
                            onChange = {e => setValue(e.target.value)}
                        />
                        
                        <button type="submit" className= "btn">Register</button>
                </form>
            </div>
        </div>
    );
} 