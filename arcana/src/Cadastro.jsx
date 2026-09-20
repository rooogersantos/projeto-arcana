import { useState } from 'react'

function Cadastro({ voltarLogin, adicionarUsuario, usuarios }) {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [mostrarSenha, setMostrarSenha] = useState(false)

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

    const emailExiste = usuarios.some(
      (usuario) => usuario.email === email
    )

    if (emailExiste) {
      alert('Este e-mail já está cadastrado.')
      return
    }

    adicionarUsuario({
      id: Date.now(),
      nome: nome,
      email: email,
      senha: senha,
      tipo: 'usuario'
    })

    alert('Conta criada com sucesso!')

    voltarLogin()
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

          <div className="campo-senha">
            <input
              type={mostrarSenha ? 'text' : 'password'}
              id="senha"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
            />

            <button
              type="button"
              className="botao-olho-login"
              onClick={() => setMostrarSenha(!mostrarSenha)}
              aria-label={
                mostrarSenha
                  ? 'Ocultar senha'
                  : 'Mostrar senha'
              }
            >
              <svg viewBox="0 0 24 24">
                <path d="M2 12s3.5-5 10-5 10 5 10 5-3.5 5-10 5S2 12 2 12z" />
                <circle cx="12" cy="12" r="2.5" />
              </svg>
            </button>
          </div>
        </div>

        <button type="submit">
          Criar conta
        </button>

        <div className="login-links">
          <a
            href="#"
            onClick={(event) => {
              event.preventDefault()
              voltarLogin()
            }}
          >
            Voltar para o login
          </a>
        </div>

      </form>

    </main>
  )
}

export default Cadastro