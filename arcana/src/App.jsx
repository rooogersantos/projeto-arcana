import { useEffect, useState } from 'react'
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
  useNavigationType
} from 'react-router-dom'

import './App.css'
import Cadastro from './Cadastro'
import Recuperacao from './Recuperacao'
import Perfil from './Perfil'
import Dashboard from './Dashboard'
import Conta from './Conta'
import Status from './Status'

function Login({
  email,
  setEmail,
  senha,
  setSenha,
  mostrarSenha,
  setMostrarSenha,
  entrar
}) {
  const navigate = useNavigate()

  useEffect(() => {
    setEmail('')
    setSenha('')
    setMostrarSenha(false)
  }, [setEmail, setSenha, setMostrarSenha])

  return (
    <main className="login">
      <div className="login-header">
        <h1>ARCANA</h1>
        <p>Sistema de acesso e gerenciamento de usuários</p>
      </div>

      <form className="login-form" onSubmit={entrar}>
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

        <div className="form-group">
          <label htmlFor="senha">Senha</label>

          <div className="campo-senha">
            <input
              type={mostrarSenha ? 'text' : 'password'}
              id="senha"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
            />

            <button
              type="button"
              className="botao-olho-login"
              onClick={() => setMostrarSenha(!mostrarSenha)}
              aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
            >
              <svg viewBox="0 0 24 24">
                <path d="M2 12s3.5-5 10-5 10 5 10 5-3.5 5-10 5S2 12 2 12z" />
                <circle cx="12" cy="12" r="2.5" />
              </svg>
            </button>
          </div>
        </div>

        <button type="submit">Entrar</button>

        <div className="login-links">
          <a
            href="#"
            onClick={(event) => {
              event.preventDefault()
              setEmail('')
              setSenha('')
              setMostrarSenha(false)
              navigate('/recuperacao')
            }}
          >
            Esqueci minha senha
          </a>

          <a
            href="#"
            onClick={(event) => {
              event.preventDefault()
              setEmail('')
              setSenha('')
              setMostrarSenha(false)
              navigate('/cadastro')
            }}
          >
            Criar uma conta
          </a>
        </div>
      </form>
    </main>
  )
}

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const navigationType = useNavigationType()

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [mostrarSenha, setMostrarSenha] = useState(false)

  const [logado, setLogado] = useState(() => {
    return localStorage.getItem('usuarioLogado') !== null
  })

  const [usuarioLogado, setUsuarioLogado] = useState(() => {
    const usuarioSalvo = localStorage.getItem('usuarioLogado')

    if (usuarioSalvo) {
      return JSON.parse(usuarioSalvo)
    }

    return null
  })

  const [usuarios, setUsuarios] = useState(() => {
    const usuariosSalvos = localStorage.getItem('usuarios_novo')

    if (usuariosSalvos) {
      const usuarios = JSON.parse(usuariosSalvos)

      const usuariosAtualizados = usuarios.map((usuario) => ({
        ...usuario,
        tipo: usuario.email === 'admin@teste.com'
          ? 'admin'
          : (usuario.tipo || 'usuario'),
        foto: usuario.foto || ''
      }))

      localStorage.setItem(
        'usuarios_novo',
        JSON.stringify(usuariosAtualizados)
      )

      return usuariosAtualizados
    }

    return [
      {
        id: 1,
        nome: 'Roger Santos',
        email: 'admin@teste.com',
        senha: '123456',
        tipo: 'admin'
      }
    ]
  })

  useEffect(() => {
    if (
      location.pathname === '/login' &&
      navigationType === 'POP' &&
      logado &&
      usuarioLogado
    ) {
      setLogado(false)
      setUsuarioLogado(null)
      localStorage.removeItem('usuarioLogado')
    }
  }, [location.pathname, navigationType, logado, usuarioLogado])

  function entrar(event) {
    event.preventDefault()

    if (email === '' || senha === '') {
      alert('Preencha o e-mail e a senha.')
      return
    }

    if (!email.includes('@')) {
      alert('Digite um e-mail válido.')
      return
    }

    if (senha.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres.')
      return
    }

    const usuarioEncontrado = usuarios.find(
      (usuario) =>
        usuario.email === email &&
        usuario.senha === senha
    )

    if (usuarioEncontrado) {
      setUsuarioLogado(usuarioEncontrado)

      localStorage.setItem(
        'usuarioLogado',
        JSON.stringify(usuarioEncontrado)
      )

      setLogado(true)
      setMostrarSenha(false)

      navigate('/dashboard')
    } else {
      alert('E-mail ou senha incorretos.')
    }
  }

  function sair() {
    setLogado(false)
    setUsuarioLogado(null)
    setEmail('')
    setSenha('')
    setMostrarSenha(false)

    localStorage.removeItem('usuarioLogado')

    navigate('/login', { replace: true })
  }

  function alterarFoto(novaFoto) {
    const usuariosAtualizados = usuarios.map((usuario) =>
      usuario.id === usuarioLogado.id
        ? { ...usuario, foto: novaFoto }
        : usuario
    )

    setUsuarios(usuariosAtualizados)

    const usuarioAtualizado = {
      ...usuarioLogado,
      foto: novaFoto
    }

    setUsuarioLogado(usuarioAtualizado)

    localStorage.setItem(
      'usuarios_novo',
      JSON.stringify(usuariosAtualizados)
    )

    localStorage.setItem(
      'usuarioLogado',
      JSON.stringify(usuarioAtualizado)
    )
  }

  function alterarSenhaUsuario(senhaAtual, novaSenha) {
    if (usuarioLogado.senha !== senhaAtual) {
      return {
        sucesso: false,
        mensagem: 'A senha atual está incorreta.'
      }
    }

    const usuariosAtualizados = usuarios.map((usuario) =>
      usuario.id === usuarioLogado.id
        ? { ...usuario, senha: novaSenha }
        : usuario
    )

    const usuarioAtualizado = {
      ...usuarioLogado,
      senha: novaSenha
    }

    setUsuarios(usuariosAtualizados)
    setUsuarioLogado(usuarioAtualizado)

    localStorage.setItem(
      'usuarios_novo',
      JSON.stringify(usuariosAtualizados)
    )

    localStorage.setItem(
      'usuarioLogado',
      JSON.stringify(usuarioAtualizado)
    )

    return {
      sucesso: true,
      mensagem: 'Senha alterada com sucesso!'
    }
  }

  function removerUsuario(id) {
    if (!usuarioLogado || usuarioLogado.tipo !== 'admin') {
      return
    }

    const novosUsuarios = usuarios.filter(
      (usuario) => usuario.id !== id
    )

    setUsuarios(novosUsuarios)

    localStorage.setItem(
      'usuarios_novo',
      JSON.stringify(novosUsuarios)
    )
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          logado && usuarioLogado
            ? <Navigate to="/dashboard" replace />
            : <Navigate to="/login" replace />
        }
      />

      <Route
        path="/login"
        element={
          <Login
            email={email}
            setEmail={setEmail}
            senha={senha}
            setSenha={setSenha}
            mostrarSenha={mostrarSenha}
            setMostrarSenha={setMostrarSenha}
            entrar={entrar}
          />
        }
      />

      <Route
        path="/cadastro"
        element={
          logado && usuarioLogado ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Cadastro
              voltarLogin={() => navigate('/login')}
              adicionarUsuario={(novoUsuario) => {
                const novosUsuarios = [...usuarios, novoUsuario]
                setUsuarios(novosUsuarios)

                localStorage.setItem(
                  'usuarios_novo',
                  JSON.stringify(novosUsuarios)
                )
              }}
              usuarios={usuarios}
            />
          )
        }
      />

      <Route
        path="/recuperacao"
        element={
          logado && usuarioLogado ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Recuperacao
              voltarLogin={() => navigate('/login')}
            />
          )
        }
      />

      <Route
        path="/dashboard"
        element={
          logado && usuarioLogado ? (
            <Dashboard
              abrirPerfil={() => navigate('/perfil')}
              abrirConta={() => navigate('/conta')}
              abrirStatus={() => navigate('/status')}
              usuario={usuarioLogado}
              usuarios={usuarios}
              removerUsuario={removerUsuario}
              sair={sair}
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route
        path="/perfil"
        element={
          logado && usuarioLogado ? (
            <Perfil
              voltarInicio={() => navigate('/dashboard')}
              nome={usuarioLogado.nome}
              email={usuarioLogado.email}
              foto={usuarioLogado.foto}
              alterarFoto={alterarFoto}
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route
        path="/conta"
        element={
          logado && usuarioLogado ? (
            <Conta
              voltarInicio={() => navigate('/dashboard')}
              tipo={usuarioLogado.tipo}
              alterarSenhaUsuario={alterarSenhaUsuario}
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route
        path="/status"
        element={
          logado && usuarioLogado ? (
            <Status
              voltarInicio={() => navigate('/dashboard')}
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />
    </Routes>
  )
}

export default App