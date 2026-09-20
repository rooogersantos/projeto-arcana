import { useState } from 'react'
import './App.css'
import Cadastro from './Cadastro'
import Recuperacao from './Recuperacao'
import Perfil from './Perfil'
import Dashboard from './Dashboard'
import Conta from './Conta'
import Status from './Status'

function App() {

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [pagina, setPagina] = useState(() => {
    return localStorage.getItem('usuarioLogado') !== null
      ? 'dashboard'
      : 'login'
  })
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
      (usuario) => usuario.email === email && usuario.senha === senha
    )

    if (usuarioEncontrado) {
      setUsuarioLogado(usuarioEncontrado)
      localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado))
      setLogado(true)
      setPagina('dashboard')
    } else {
      alert('E-mail ou senha incorretos.')
    }

  }

  function sair() {
    setLogado(false)
    setUsuarioLogado(null)
    setEmail('')
    setSenha('')
    localStorage.removeItem('usuarioLogado')
  }

  function alterarFoto(novaFoto) {

    const usuariosAtualizados = usuarios.map((usuario) =>
      usuario.id === usuarioLogado.id
        ? { ...usuario, foto: novaFoto }
        : usuario
    )

    setUsuarios(usuariosAtualizados)

    setUsuarioLogado({
      ...usuarioLogado,
      foto: novaFoto
    })

    localStorage.setItem(
      'usuarios_novo',
      JSON.stringify(usuariosAtualizados)
    )

    localStorage.setItem(
      'usuarioLogado',
      JSON.stringify({
        ...usuarioLogado,
        foto: novaFoto
      })
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

    if (usuarioLogado.tipo !== 'admin') {
      return
    }

    const novosUsuarios = usuarios.filter(
      (usuario) => usuario.id !== id
    )

    setUsuarios(novosUsuarios)

    localStorage.setItem('usuarios_novo', JSON.stringify(novosUsuarios))
  }

  if (logado) {

    if (pagina === 'perfil') {
      return (
        <Perfil
          voltarInicio={() => setPagina('dashboard')}
          nome={usuarioLogado.nome}
          email={usuarioLogado.email}
          foto={usuarioLogado.foto}
          alterarFoto={alterarFoto}
        />
      )
    }

    if (pagina === 'conta') {
      return (
        <Conta
          voltarInicio={() => setPagina('dashboard')}
          tipo={usuarioLogado.tipo}
          alterarSenhaUsuario={alterarSenhaUsuario}
        />
      )
    }

    if (pagina === 'status') {
      return (
        <Status
          voltarInicio={() => setPagina('dashboard')}
        />
      )
    }

    if (pagina === 'dashboard') {
      return (
        <Dashboard
          abrirPerfil={() => setPagina('perfil')}
          abrirConta={() => setPagina('conta')}
          abrirStatus={() => setPagina('status')}
          usuario={usuarioLogado}
          usuarios={usuarios}
          removerUsuario={removerUsuario}
          sair={sair}
        />
      )
    }

  }

  if (pagina === 'cadastro') {
    return (
      <Cadastro
        voltarLogin={() => setPagina('login')}
        adicionarUsuario={(novoUsuario) => {
          const novosUsuarios = [...usuarios, novoUsuario]

          setUsuarios(novosUsuarios)

          localStorage.setItem('usuarios_novo', JSON.stringify(novosUsuarios))
        }}
        usuarios={usuarios}
      />
    )
  }

  if (pagina === 'recuperacao') {
    return <Recuperacao voltarLogin={() => setPagina('login')} />
  }

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

          <input
            type="password"
            id="senha"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
          />
        </div>

        <button type="submit">
          Entrar
        </button>

        <div className="login-links">
          <a href="#" onClick={(event) => {
            event.preventDefault()
            setEmail('')
            setSenha('')
            setPagina('recuperacao')
          }}>
            Esqueci minha senha
          </a>
          <a href="#" onClick={(event) => {
            event.preventDefault()
            setEmail('')
            setSenha('')
            setPagina('cadastro')
          }}>
            Criar uma conta
          </a>
        </div>

      </form>

    </main>
  )
}

export default App