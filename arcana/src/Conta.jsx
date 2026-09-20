import { useState } from 'react'

function Conta({ voltarInicio, tipo, alterarSenhaUsuario }) {

    const [alterarSenha, setAlterarSenha] = useState(false)
    const [senhaAtual, setSenhaAtual] = useState('')
    const [novaSenha, setNovaSenha] = useState('')
    const [confirmarSenha, setConfirmarSenha] = useState('')

    function salvarSenha() {

        if (senhaAtual === '' || novaSenha === '' || confirmarSenha === '') {
            alert('Preencha todos os campos.')
            return
        }

        if (novaSenha.length < 6) {
            alert('A nova senha deve ter pelo menos 6 caracteres.')
            return
        }

        if (novaSenha !== confirmarSenha) {
            alert('A nova senha e a confirmação não coincidem.')
            return
        }

        const resultado = alterarSenhaUsuario(senhaAtual, novaSenha)

        if (!resultado.sucesso) {
            alert(resultado.mensagem)
            return
        }

        alert(resultado.mensagem)

        setSenhaAtual('')
        setNovaSenha('')
        setConfirmarSenha('')
        setAlterarSenha(false)
    }

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

            <button
                className="botao-alterar-senha"
                onClick={() => setAlterarSenha(true)}
            >
                Alterar senha
            </button>

            {alterarSenha && (
                <div className="info-card">

                    <div className="form-group">
                        <label htmlFor="senhaAtual">Senha atual</label>
                        <input
                            type="password"
                            id="senhaAtual"
                            placeholder="Digite sua senha atual"
                            value={senhaAtual}
                            onChange={(event) => setSenhaAtual(event.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="novaSenha">Nova senha</label>
                        <input
                            type="password"
                            id="novaSenha"
                            placeholder="Digite a nova senha"
                            value={novaSenha}
                            onChange={(event) => setNovaSenha(event.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmarSenha">Confirmar nova senha</label>
                        <input
                            type="password"
                            id="confirmarSenha"
                            placeholder="Confirme a nova senha"
                            value={confirmarSenha}
                            onChange={(event) => setConfirmarSenha(event.target.value)}
                        />
                    </div>

                    <button
                        className="botao-salvar-senha"
                        onClick={salvarSenha}
                    >
                        Salvar nova senha
                    </button>

                </div>
            )}

            <button
                className="botao-voltar"
                onClick={() => {
                    if (alterarSenha) {
                        setAlterarSenha(false)
                        setSenhaAtual('')
                        setNovaSenha('')
                        setConfirmarSenha('')
                    } else {
                        voltarInicio()
                    }
                }}
            >
                Voltar
            </button>

        </main>
    )
}

export default Conta