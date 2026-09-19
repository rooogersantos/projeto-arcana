function Dashboard({ voltarInicio, abrirPerfil }) {

    return (
        <main className="login">

            <div className="login-header">
                <h1>ARCANA</h1>
                <p>Dashboard</p>
            </div>

            <p>Bem-vindo à área principal do sistema!</p>

            <div className="dashboard-cards">

                <button
                    className="dashboard-card"
                    onClick={abrirPerfil}
                >
                    <h2>Perfil</h2>
                    <p>Roger Santos</p>
                </button>

                <div className="dashboard-card">
                    <h2>Conta</h2>
                    <p>Ativa</p>
                </div>

                <div className="dashboard-card">
                    <h2>Status</h2>
                    <p>Conectado</p>
                </div>

            </div>

            <button onClick={voltarInicio}>
                Voltar
            </button>

        </main>
    )
}

export default Dashboard