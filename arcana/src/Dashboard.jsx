function Dashboard({ voltarInicio, abrirPerfil, abrirConta, abrirStatus, usuario }) {

    return (
        <main className="login">

            <div className="login-header">
                <h1>ARCANA</h1>
                <p>Dashboard</p>
            </div>

            

            <div className="dashboard-cards">

                <button
                    className="dashboard-card"
                    onClick={abrirPerfil}
                >
                    <h2>Perfil</h2>
                    <p>{usuario.nome}</p>
                </button>

                <button
                    className="dashboard-card"
                    onClick={() => abrirConta()}
                >
                    <h2>Conta</h2>
                    <p>{usuario.email}</p>
                </button>

                <button
                    className="dashboard-card"
                    onClick={() => abrirStatus()}
                >
                    <h2>Status</h2>
                    <p>Conectado</p>
                </button>

            </div>

            <button onClick={voltarInicio}>
                Voltar
            </button>

        </main>
    )
}

export default Dashboard