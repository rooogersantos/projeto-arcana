function Perfil({ voltarInicio, nome, email }) {
    return (
        <main className="login">

            <div className="login-header">
                <h1>ARCANA</h1>
                <p>Meu perfil</p>
            </div>

            <div className="info-card">
                <p><strong>Nome:</strong> {nome}</p>
                <p><strong>E-mail:</strong> {email}</p>
            </div>

            <button onClick={voltarInicio}>
                Voltar
            </button>

        </main>
    )
}

export default Perfil