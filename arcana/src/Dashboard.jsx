function Dashboard({ voltarInicio }) {

  return (
    <main className="login">

      <div className="login-header">
        <h1>ARCANA</h1>
        <p>Dashboard</p>
      </div>

      <p>Bem-vindo à área principal do sistema!</p>

      <button onClick={voltarInicio}>
        Voltar
      </button>

    </main>
  )
}

export default Dashboard