import { useState, useEffect } from 'react';
import './style.css'
import Trash from '../../assets/trash.svg';
import api from '../../services/api';

function Home() {

  const [users, setUsers] = useState([]);

  async function getUsers() {
    const response = await api.get("/api/users");
    setUsers(response.data);
  }

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    console.log(users);
  }, [users]);

  function calculateAge(dateOfBirth) {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();

  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

  return (
    <>
      <div className='container'>
          <form>
            <h1>Cadastro de Usuários</h1>
            <input type="text" name='nome' id='nome' placeholder='Digite aqui seu nome'/>
            <input type="number" name='idade' id='idade' placeholder='Digite aqui sua idade'/>
            <input type="email" name='email' id='email' placeholder='Digite aqui seu email'/>
            <button type='button'>Cadastrar</button>
          </form>

          {

            users.map(user => (
              <div key={user.id} className='card'>
                <div>
                  <p>Nome: <span>{ user.name }</span></p>
                  <p>
                    Idade: 
                    <span> {calculateAge(user.date_of_birth)} anos</span>
                  </p>
                  <p>Email: <span>{ user.email }</span></p>
                  <button>
                      <img src={Trash} alt="Logo da Lixeira" />
                  </button>
                </div>
              </div>
            ))

          }
      </div>
    </>
  )
}

export default Home;