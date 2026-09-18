import './App.css'

function App() {

  return (
    <main className="login">

      <div className="login-header">
        <h1>ARCANA</h1>
        <p>Sistema de acesso e gerenciamento de usuários</p>
      </div>

      <form className="login-form">

        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            placeholder="Digite seu e-mail"
          />
        </div>

        <div className="form-group">
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            placeholder="Digite sua senha"
          />
        </div>

        <button type="submit">
          Entrar
        </button>

      </form>

      <div className="login-links">
        <a href="#">Esqueci minha senha</a>
        <a href="#">Criar uma conta</a>
      </div>

    </main>
  )
}

export default App