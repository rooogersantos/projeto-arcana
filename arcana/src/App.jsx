import { useState } from 'react'
import './App.css'
import Cadastro from './Cadastro'

function App() {

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [pagina, setPagina] = useState('login')

  const emailCorreto = 'teste@teste.com'
  const senhaCorreta = '123456'

  function entrar(event) {
    event.preventDefault()

    if (email === '' || senha === '') {
      alert('Preencha o e-mail e a senha.')
      return
    }

    if (!email.includes('@')) {
      alert('Digite um e-mail válido.')
      return
    }

    if (senha.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres.')
      return
    }

    if (email === emailCorreto && senha === senhaCorreta) {
      alert('Login realizado com sucesso!')
    } else {
      alert('E-mail ou senha incorretos.')
    }

  }

  if (pagina === 'cadastro') {
    return <Cadastro voltarLogin={() => setPagina('login')} />
  }

  return (
    <main className="login">

      <div className="login-header">
        <h1>ARCANA</h1>
        <p>Sistema de acesso e gerenciamento de usuários</p>
      </div>

      <form className="login-form" onSubmit={entrar}>

        <div className="form-group">
          <label htmlFor="email">E-mail</label>

          <input
            type="email"
            id="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="senha">Senha</label>

          <input
            type="password"
            id="senha"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
          />
        </div>

        <button type="submit">
          Entrar
        </button>

      </form>

      <div className="login-links">
        <a href="#">Esqueci minha senha</a>
        <a href="#" onClick={(event) => {
          event.preventDefault()
          setPagina('cadastro')
        }}>
          Criar uma conta
        </a>
      </div>

    </main>
  )
}

export default App