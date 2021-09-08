const Region = {
    getAll:'all',
    region:'region',
    name: 'name'
}

const RegionData = [
    {
        title: 'All countries',
        route: 'all'
    },
    {
        title: 'Africa',
        route: 'africa'
    },
    {
        title: 'Americas',
        route: 'americas'
    },
    {
        title: 'Oceania',
        route: 'oceania'
    },
    {
        title: 'Asia',
        route: 'asia'
    },
    {
        title: 'Europe',
        route: 'europe'
    }   
]

const navContainer = document.querySelector('.list')
const container = document.querySelector('.card-block')
const card = document.querySelector('.card')
const searchName = document.querySelector('.searchName')
const searchCapital = document.querySelector('.searchCapital')

window.addEventListener('load' , () =>{
    const nav = RegionData.map(({title, route}) =>{
        return NavList(title, route)
    }).join('')

    navContainer.innerHTML = nav

    FetchData(Region.getAll , res =>{
        const card = res.map((item) =>{
            return Card(item)
        }).join('')
        container.innerHTML = card
    })

    
})

function NavList(title, route){
    return `
    <li>
        <a href="" onclick="chooseRegion('${route}')">${title}</a>
    </li>`
}

function chooseRegion(route){
    FetchData(`${Region.region}/${route}` , res =>{
        const card = res.map(item =>{
            return Card(item)
        }).join('')
        container.innerHTML = card
    })
}




function Card(res){
    return `
    <div class="card" onclick="this.classList.toggle('expanded')">
            <div class="text">
                <div class="text-content">
                    <div class="titlem">
                        <h4 class="title">${res.name}</h5>
                    </div>
                    <div class="image">
                        <img src=${res.flag}>
                    </div>
                </div>
                <div class="text-down">
                    <p>Capital: ${res.capital}</p>
                    <p>Region: ${res.region}</p>
                    <p>SubRegion: ${res.subregion}</p>
                    <p>Population: ${res.population}</p>
                </div>
                
            </div>
            <svg class="chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 35" width="30"><path d="M5 30L50 5l45 25" fill="none" stroke="#000" stroke-width="5"/></svg>
            
            
        </div>
            
        `
}






function FetchData(endPoint , cb){
    fetch(`https://restcountries.eu/rest/v2/${endPoint}`)
    .then(res => res.json())
    .then(r => cb(r))
}







searchName.addEventListener('input' , e =>{
    var value = e.target.value.toUpperCase();

    FetchData(Region.getAll , res =>{
        const card = res.map(item => {
            if(item.name.toUpperCase().includes(value)){
                return Card(item)
            }
        }).join('')
        container.innerHTML = card
    })
    
})

searchCapital.addEventListener('input' , e =>{
    var value = e.target.value.toUpperCase();

    FetchData(Region.getAll , res =>{
        const card = res.map(item => {
            if(item.capital.toUpperCase().includes(value)){
                return Card(item)
            }
        }).join('')
        container.innerHTML = card
    })
})

