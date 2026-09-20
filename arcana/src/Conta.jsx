import { useState } from 'react'

function Conta({
    voltarInicio,
    tipo,
    nome,
    email,
    alterarDadosUsuario,
    alterarSenhaUsuario
}) {
    const [alterarDados, setAlterarDados] = useState(false)
    const [novoNome, setNovoNome] = useState(nome)
    const [novoEmail, setNovoEmail] = useState(email)

    const [alterarSenha, setAlterarSenha] = useState(false)
    const [senhaAtual, setSenhaAtual] = useState('')
    const [novaSenha, setNovaSenha] = useState('')
    const [confirmarSenha, setConfirmarSenha] = useState('')

    const [mostrarSenhaAtual, setMostrarSenhaAtual] = useState(false)
    const [mostrarNovaSenha, setMostrarNovaSenha] = useState(false)
    const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false)

    function salvarDados() {
        if (novoNome.trim() === '' || novoEmail.trim() === '') {
            alert('Preencha todos os campos.')
            return
        }

        if (!novoEmail.includes('@')) {
            alert('Digite um e-mail válido.')
            return
        }

        const resultado = alterarDadosUsuario(
            novoNome.trim(),
            novoEmail.trim()
        )

        if (!resultado.sucesso) {
            alert(resultado.mensagem)
            return
        }

        alert(resultado.mensagem)
        setAlterarDados(false)
    }

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

            {!alterarDados && (
                <div className="info-card">
                    <p><strong>Nome:</strong> {nome}</p>
                    <p><strong>E-mail:</strong> {email}</p>
                    <p><strong>Status:</strong> Ativa</p>
                    <p>
                        <strong>Tipo:</strong>{' '}
                        {tipo === 'admin'
                            ? 'Administrador'
                            : tipo === 'moderador'
                                ? 'Moderador'
                                : 'Usuário'}
                    </p>
                </div>
            )}

            {alterarDados && (
                <div className="info-card">

                    <div className="form-group">
                        <label htmlFor="novoNome">Nome</label>
                        <input
                            type="text"
                            id="novoNome"
                            placeholder="Digite seu nome"
                            value={novoNome}
                            onChange={(event) => setNovoNome(event.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="novoEmail">E-mail</label>
                        <input
                            type="email"
                            id="novoEmail"
                            placeholder="Digite seu e-mail"
                            value={novoEmail}
                            onChange={(event) => setNovoEmail(event.target.value)}
                        />
                    </div>

                    <button
                        className="botao-salvar-senha"
                        onClick={salvarDados}
                    >
                        Salvar dados
                    </button>

                </div>
            )}

            {!alterarDados && !alterarSenha && (
                <>
                    <button
                        className="botao-alterar-senha"
                        onClick={() => setAlterarDados(true)}
                    >
                        Alterar dados
                    </button>

                    <button
                        className="botao-alterar-senha"
                        onClick={() => setAlterarSenha(true)}
                    >
                        Alterar senha
                    </button>
                </>
            )}

            {alterarSenha && (
                <div className="info-card">

                    <div className="form-group">
                        <label htmlFor="senhaAtual">Senha atual</label>

                        <div className="campo-senha">
                            <input
                                type={mostrarSenhaAtual ? 'text' : 'password'}
                                id="senhaAtual"
                                placeholder="Digite sua senha atual"
                                value={senhaAtual}
                                onChange={(event) => setSenhaAtual(event.target.value)}
                            />

                            <button
                                type="button"
                                className="botao-olho"
                                onClick={() => setMostrarSenhaAtual(!mostrarSenhaAtual)}
                                aria-label={mostrarSenhaAtual ? 'Ocultar senha' : 'Mostrar senha'}
                            >
                                <svg viewBox="0 0 24 24">
                                    <path d="M2 12s3.5-5 10-5 10 5 10 5-3.5 5-10 5S2 12 2 12z" />
                                    <circle cx="12" cy="12" r="2.5" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="novaSenha">Nova senha</label>

                        <div className="campo-senha">
                            <input
                                type={mostrarNovaSenha ? 'text' : 'password'}
                                id="novaSenha"
                                placeholder="Digite a nova senha"
                                value={novaSenha}
                                onChange={(event) => setNovaSenha(event.target.value)}
                            />

                            <button
                                type="button"
                                className="botao-olho"
                                onClick={() => setMostrarNovaSenha(!mostrarNovaSenha)}
                                aria-label={mostrarNovaSenha ? 'Ocultar senha' : 'Mostrar senha'}
                            >
                                <svg viewBox="0 0 24 24">
                                    <path d="M2 12s3.5-5 10-5 10 5 10 5-3.5 5-10 5S2 12 2 12z" />
                                    <circle cx="12" cy="12" r="2.5" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmarSenha">Confirmar nova senha</label>

                        <div className="campo-senha">
                            <input
                                type={mostrarConfirmarSenha ? 'text' : 'password'}
                                id="confirmarSenha"
                                placeholder="Confirme a nova senha"
                                value={confirmarSenha}
                                onChange={(event) => setConfirmarSenha(event.target.value)}
                            />

                            <button
                                type="button"
                                className="botao-olho"
                                onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                                aria-label={mostrarConfirmarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                            >
                                <svg viewBox="0 0 24 24">
                                    <path d="M2 12s3.5-5 10-5 10 5 10 5-3.5 5-10 5S2 12 2 12z" />
                                    <circle cx="12" cy="12" r="2.5" />
                                </svg>
                            </button>
                        </div>
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
                    if (alterarDados) {
                        setAlterarDados(false)
                        setNovoNome(nome)
                        setNovoEmail(email)
                    } else if (alterarSenha) {
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