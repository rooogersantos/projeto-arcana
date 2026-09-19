function Status({ voltarInicio }) {
    return (
        <main className="login">

            <div className="login-header">
                <h1>ARCANA</h1>
                <p>Status da conta</p>
            </div>

            <div className="info-card">
                <p><strong>Status:</strong> Conectado</p>
                <p><strong>Sistema:</strong> Operacional</p>
            </div>

            <button className="botao-voltar" onClick={voltarInicio}>
                Voltar
            </button>

        </main>
    )
}

export default Status