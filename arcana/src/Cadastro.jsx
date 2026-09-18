import { useState } from 'react'

function Cadastro({ voltarLogin }) {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    function cadastrar(event) {
        event.preventDefault()

        if (nome === '' || email === '' || senha === '') {
            alert('Preencha todos os campos.')
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

        alert(`Nome: ${nome}\nE-mail: ${email}\nSenha: ${senha}`)
    }

  return (
    <main className="login">

      <div className="login-header">
        <h1>ARCANA</h1>
        <p>Crie sua conta</p>
      </div>

      <form className="login-form" onSubmit={cadastrar}>

        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            placeholder="Digite seu nome"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
          />
        </div>

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
          Criar conta
        </button>

      </form>

      <div className="login-links">
        <a href="#" onClick={(event) => {
          event.preventDefault()
          voltarLogin()
        }}>
          Voltar para o login
        </a>
      </div>

    </main>
  )
}

export default Cadastro