import { useState, useEffect, useRef } from 'react';
import './style.css'
import Trash from '../../assets/trash.svg';
import api from '../../services/api';

function Home() {

  const [users, setUsers] = useState([]);

  const inputName = useRef();
  const inputDate = useRef();
  const inputEmail = useRef();

  async function getUsers() {
    const response = await api.get("/api/users");
    setUsers(response.data);
  }

  useEffect(() => {
    getUsers();
  }, []);

  async function createUsers() {
    await api.post('/api/users', {
      name: inputName.current.value,
      date_of_birth: inputDate.current.value,
      email: inputEmail.current.value
    });

    getUsers();
  }

  async function deleteUsers(id) {
    await api.delete(`/api/users/${id}`);
    getUsers();
  }

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
            <input type="text" name='nome' id='nome' placeholder='Digite aqui seu nome' required ref={inputName}/>
            <input type="date" name='dataNasc' id='dataNasc' required ref={inputDate}/>
            <input type="email" name='email' id='email' placeholder='Digite aqui seu email' required ref={inputEmail}/>
            <button onClick={createUsers} type='button'>Cadastrar</button>
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
                  <button onClick={() => deleteUsers(user.id)}>
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