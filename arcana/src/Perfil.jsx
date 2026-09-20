import { useState } from 'react'

function Perfil({ voltarInicio, nome, email, foto, alterarFoto }) {

    const [novaFoto, setNovaFoto] = useState(foto)
    
    function selecionarFoto(event) {

        const arquivo = event.target.files[0]

        if (!arquivo) {
            return
        }

        if (!arquivo.type.startsWith('image/')) {
            alert('Selecione uma imagem válida.')
            return
        }

        const leitor = new FileReader()

        leitor.onload = () => {
            setNovaFoto(leitor.result)
        }

        leitor.readAsDataURL(arquivo)
    }

    return (
        <main className="login">

            <div className="login-header">
                <h1>ARCANA</h1>
                <p>Meu perfil</p>
            </div>

            <div className="info-card">

                {novaFoto && (
                    <img
                        className="foto-perfil"
                        src={novaFoto}
                        alt="Foto de perfil"
                    />
                )}

                <label className="botao-foto">
                    Alterar foto
                    <input
                        type="file"
                        accept="image/*"
                        onChange={selecionarFoto}
                    />
                </label>

                {novaFoto !== foto && (
                    <button
                        className="botao-salvar-foto"
                        onClick={() => alterarFoto(novaFoto)}
                    >
                        Salvar foto
                    </button>
                )}

                <p><strong>Nome:</strong> {nome}</p>
                <p><strong>E-mail:</strong> {email}</p>

            </div>

            <button className="botao-voltar" onClick={voltarInicio}>
                Voltar
            </button>

        </main>
    )
}

export default Perfil