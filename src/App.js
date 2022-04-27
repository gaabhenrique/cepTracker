import { FiSearch } from 'react-icons/fi'
import './styles.css'
import { useState } from 'react'
import api from './services/api'

function App() {

  const [input, setInput] = useState('')

  const [cep, setCep] = useState({})

  async function handleSearch() {
    if (input === '') {
      alert('Digite algum CEP!')
      return;
    }

    try {
      const response = await api.get(`${input}/json`)
      console.log(response.data)
      setCep(response.data)
      setInput("")
    }
    catch {
      alert("Ocorreu um erro ao buscar o CEP")
      setInput('')
    }
  }

  return (
    <div className="container">

      <h1 className="title">Buscador de CEP</h1>

      <div className="containerInput">

        <input className="cepInput" placeholder="Digite o CEP..." type="text" value={input} onChange={(e) => setInput(e.target.value)} />

        <button className="searchBtn" onClick={handleSearch}>
          <FiSearch size={25} color="FFF" />
        </button>
      </div>

      {Object.keys(cep).length > 1 && (
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>
          <span>Logradouro: {cep.logradouro}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>Cidade: {cep.localidade}</span>
          <span>Distrito: {cep.uf}</span>
          <span>DDD: {cep.ddd}</span>
        </main>
      )}

    </div>
  );
}

export default App;
