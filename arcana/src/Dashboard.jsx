function Dashboard({
    abrirPerfil,
    abrirConta,
    abrirStatus,
    usuario,
    usuarios,
    removerUsuario,
    alterarTipoUsuario,
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

            <p>Total de usuários cadastrados: {usuarios.length}</p>

            {(usuario.tipo === 'admin' || usuario.tipo === 'moderador') && (
                <div className="usuarios-lista">
                    <h2>Usuários cadastrados</h2>

                    {usuarios.map((usuarioLista) => (
                        <div key={usuarioLista.id}>

                            <p>
                                {usuarioLista.nome} — {usuarioLista.email}
                            </p>

                            {usuarioLista.id !== usuario.id && (
                                <>
                                    {usuario.tipo === 'admin' && (
                                        <select
                                            value={usuarioLista.tipo}
                                            onChange={(event) => {
                                                const novoTipo = event.target.value

                                                const confirmou = window.confirm(
                                                    `Tem certeza que deseja alterar ${usuarioLista.nome} para ${novoTipo === 'moderador' ? 'Moderador' : 'Usuário'}?`
                                                )

                                                if (confirmou) {
                                                    alterarTipoUsuario(
                                                        usuarioLista.id,
                                                        novoTipo
                                                    )
                                                }
                                            }}
                                        >
                                            <option value="usuario">
                                                Usuário
                                            </option>

                                            <option value="moderador">
                                                Moderador
                                            </option>
                                        </select>
                                    )}

                                    {(usuario.tipo === 'admin' ||
                                        usuarioLista.tipo === 'usuario') && (
                                            <button
                                                className="botao-excluir"
                                                onClick={() =>
                                                    removerUsuario(usuarioLista.id)
                                                }
                                            >
                                                Excluir
                                            </button>
                                        )}
                                </>
                            )}

                        </div>
                    ))}
                </div>
            )}

            <button className="botao-sair" onClick={sair}>
                Sair
            </button>

        </main>
    )
}

export default Dashboard