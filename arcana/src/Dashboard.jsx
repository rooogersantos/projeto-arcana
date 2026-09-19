function Dashboard({
    abrirPerfil,
    abrirConta,
    abrirStatus,
    usuario,
    usuarios,
    removerUsuario,
    sair
}) {

    return (
        <main className="login">

            <div className="login-header">
                <h1>ARCANA</h1>
                <p>Dashboard</p>
            </div>

            <p>Bem-vindo(a), {usuario.nome}!</p>

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

            {usuario.tipo === 'admin' && (
                <>
                    <p>Total de usuários cadastrados: {usuarios.length}</p>

                    <div className="usuarios-lista">
                        <h2>Usuários cadastrados</h2>

                        {usuarios.map((usuarioLista) => (
                            <div key={usuarioLista.id}>
                                <p>
                                    {usuarioLista.nome} — {usuarioLista.email}
                                </p>

                                {usuarioLista.id !== usuario.id && (
                                    <button
                                        className="botao-excluir"
                                        onClick={() => removerUsuario(usuarioLista.id)}
                                    >
                                        Excluir
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </>
            )}

            <button className="botao-sair" onClick={sair}>
                Sair
            </button>

        </main>
    )
}

export default Dashboard