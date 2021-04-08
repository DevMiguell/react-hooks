import { useState, useEffect } from 'react'

export default function App() {
  const [respositories, setRepositories] = useState([])

  useEffect(() => { //É bom sempre ter mais de um useEffect na pagina
    async function fetchApi() {
      const response = await fetch('https://api.github.com/users/DevMiguell/repos')
      const data = await response.json()

      setRepositories(data)
    }

    fetchApi()
  }, []) //[] passar a variavel aqui dentro quando eu quiser que o useEffect ocorra

  useEffect(() => {
    const filtered = respositories.filter(repo => repo.favorite)

    document.title = `Você tem ${filtered.length} favoritos`
  }, [respositories]) // Agora estamos vendo se a uma auteração em repositorios(apartir de favoitos) se ouver adicionaremos mais um 

  function handleFavorites(id) {
    const newRepository = respositories.map(repo => {
      return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo
    })

    setRepositories(newRepository)
  }

  return (
    <>
      <ul>
        {respositories.map(repo => ( // Percorrendo o objeto repositoris e colocando-o dentro do repo com o map
          <>
            <div key={repo.id}>
              <li>{repo.name}{repo.favorite && <span> ⭐</span>}</li>
              <button onClick={() => handleFavorites(repo.id)}>Favoritar</button>
            </div>
            <p></p>
          </>
        ))}
      </ul>
    </>
  )
}
