import './style.css'
import Trash from '../../assets/trash.svg';

function Home() {

  const users = [
    {
      id: 'id_52412341',
      name: 'Gabriel Dias Trindade',
      age: 17,
      email: 'teste@email.com'
    },
    {
      id: 'id_7907012358',
      name: 'Rebeca Fuschini',
      age: 18,
      email: 'teste2@email.com'
    }
];

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
                  <p>Idade: <span>{ user.age }</span></p>
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

export default Home
