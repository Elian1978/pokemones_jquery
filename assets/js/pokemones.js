//Llamado con javascript
document.addEventListener('DOMContentLoaded', function(){
  const state = {
    pokemons: [],
    offset: 0
  }
  const pokemons = document.querySelector('ul.pokemons')

  document.addEventListener('click', function(e){
    if (e.target.matches('[href = "#"]')){
      e.preventDefault()
    }

    if (e.target.matches('.more-pokemons')){
      fetchPokemons()
    }

    if (e.target.matches('.pokemon-detail')){
      e.preventDefault()
      return fetchPokemon(e.target.href)
    
    }

    if (e.target.closest('.pokemon-detail')){
      e.preventDefault()
      fetchPokemon(e.target.parentNode.href)
    }
  })
  function fetchPokemons(){
    fetch('https://pokeapi.co/api/v2/pokemon/' + `?offset=${state.offset}`, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json'
      }

      //data es el contenido de la promesa que trae el fetch
      // siempres debemos hacer el then data y then pokemons
      // dentro del objeto pokemons hay un array llamado results
    }).then(function(data){ return data.json() })
      .then(function(pokemons){ addPokemons(pokemons.results) })
      .then(function(){ state.offset += 20 })
  }
  function fetchPokemon(url){ 
    fetch(url)
    .then(function(data){ return data.json() })
    .then(function(pokemon){ renderModal(pokemons) })
  }

  function addPokemons(pokemons){
    state.pokemons = [...state.pokemons,...pokemons]
    renderPokemons()
  }

  function renderModal(poke){
    const poke_modal = document.createElement('div')
    poke_modal.className = 'modal fade'
    const html = `<div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header border-0">
                <h5 class="modal-title" id="pokemon-data-name"></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body px-0">
                <table class="table">
                    <tr>
                        <th>Tipos</th>
                        <td>
                            <ol id="pokemon-types"></ol>
                        </td>
                    </tr>
                    <tr>
                        <th>Habilidades</th>
                        <td>
                            <ol id="pokemon-abilities"></ol>
                        </td>
                    </tr>
                    <tr>
                        <th>5 primeros movimientos</th>
                        <td>
                            <ol id="pokemon-moves"></ol>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
</div>`
    poke_modal.innerHTML = html
    document.body.appendChild(poke_modal)

  $('.modal').modal('show')
  $('.modal').on('hidden.bs.modal', function(e){
    $(this).remove()
  })
  }



  function renderPokemons(){
   state.pokemons.slice(state.offset).map(function(poke){
     const li = document.createElement('li')
     li.className = 'list-group-item'
     const link = document.createElement('a')
     link.className = 'pokemon-detail d-flex justify-content-between align-items-center'
     link.href = poke.url
     const text = document.createTextNode(poke.name)
     const span = document.createElement('span')
     span.className = 'badge badge-primary badge-pill'
     span.innerText = '›'

     //innerText = document.createTextNode
     
     link.appendChild(text)
     link.appendChild(span)
     li.appendChild(link)
     pokemons.appendChild(li)
   })
  }
  fetchPokemons()
})