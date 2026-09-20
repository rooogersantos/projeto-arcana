import { useState } from 'react'

function Recuperacao({ voltarLogin }) {

    const [email, setEmail] = useState('')

    function recuperar(event) {
        event.preventDefault()

        if (email === '') {
            alert('Digite seu e-mail.')
            return
        }

        if (!email.includes('@')) {
            alert('Digite um e-mail válido.')
            return
        }

        alert('Se o e-mail estiver cadastrado, você receberá instruções para redefinir sua senha.')
    }

    return (
        <main className="login">

            <div className="login-header">
                <h1>ARCANA</h1>
                <p>Recuperação de senha</p>
            </div>

            <form className="login-form" onSubmit={recuperar}>

                <div className="form-group">
                    <label htmlFor="email">E-mail</label>

                    <input
                        type="email"
                        id="email"
                        placeholder="Digite seu e-mail"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>

                <button type="submit">
                    Recuperar senha
                </button>

                <div className="login-links">
                    <a
                        href="#"
                        onClick={(event) => {
                            event.preventDefault()
                            voltarLogin()
                        }}
                    >
                        Voltar para o login
                    </a>
                </div>

            </form>

        </main>
    )
}

export default Recuperacao