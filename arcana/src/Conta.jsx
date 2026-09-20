function Conta({ voltarInicio, tipo }) {
    return (
        <main className="login">

            <div className="login-header">
                <h1>ARCANA</h1>
                <p>Minha conta</p>
            </div>

            <div className="info-card">
                <p><strong>Status:</strong> Ativa</p>
                <p><strong>Tipo:</strong> {tipo === 'admin' ? 'Administrador' : 'Usuário'}</p>
            </div>

            <button className="botao-voltar" onClick={voltarInicio}>
                Voltar
            </button>

        </main>
    )
}

export default Conta