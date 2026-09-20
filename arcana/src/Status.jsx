import { useEffect, useState } from 'react'

function Status({ voltarInicio, usuario }) {
    const [ultimoAcesso, setUltimoAcesso] = useState('')

    useEffect(() => {
        const agora = new Date()

        const dataHora = agora.toLocaleString('pt-BR')

        setUltimoAcesso(dataHora)
    }, [])

    return (
        <main className="login">

            <div className="login-header">
                <h1>ARCANA</h1>
                <p>Status da conta</p>
            </div>

            <div className="info-card">
                <p><strong>Status:</strong> Conectado</p>
                <p><strong>Sistema:</strong> Operacional</p>
                <p><strong>Usuário conectado:</strong> {usuario.nome}</p>
                <p><strong>Último acesso:</strong> {ultimoAcesso}</p>
            </div>

            <button className="botao-voltar" onClick={voltarInicio}>
                Voltar
            </button>

        </main>
    )
}

export default Status