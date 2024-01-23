// For Scrolling the cards with the help of icons
let left_btn = document.querySelector('.bx-chevron-left');
let right_btn = document.querySelector('.bx-chevron-right');
let cards = document.querySelector('.cards');
let search = document.querySelector('.search');
let search_input = document.getElementById('search_input');

left_btn.addEventListener('click', () => {
    cards.scrollLeft -= 60;
});

right_btn.addEventListener('click', () => {
    cards.scrollLeft += 60;
});

// Fetching the cards data
let json_url = "project2.json";
fetch(json_url).then(Response => Response.json())
.then(data =>{
    data.forEach((ele,index) => {
        let{name,imdb,date,sposter,bposter,genre,url}=ele;
        let card = document.createElement('a');
        card.classList.add("multiple-cards");
        card.href = url;
        card.innerHTML = `
        <img src="${sposter}" alt="${name}" class="poster">
                    <div class="rest-card">
                        <img src="${bposter}" alt="${name}">
                        <div class="cont">
                            <h4>${name}</h4>
                            <div class="sub-cont">
                                <p>${genre}, ${date}</p>
                                <h3><span>IMDB</span> <i class='bx bxs-star'></i>${imdb}</h3>
                            </div>
                        </div>
                    </div>
        `
        cards.appendChild(card);
    });

    // Fetching the title data displayed in the centre
    document.getElementById('title').innerText = data[0].name;
    document.getElementById('gen').innerText = data[0].genre;
    document.getElementById('year').innerText = data[0].date;
    document.getElementById('rate').innerHTML = `<span>IMDB</span> <i class='bx bxs-star'></i> ${data[0].imdb}`

    // Fetching all the search data options 
    data.forEach(ele =>{
        let{name,imdb,date,sposter,genre,url}=ele;
        let searchMovie = document.createElement('a');
        searchMovie.classList.add('card');
        searchMovie.href = url;
        searchMovie.innerHTML = `
        <img src="${sposter}" alt="${name}">
                        <div class="cont">
                            <h3>${name}</h3>
                            <p>${genre}, ${date}, <span>IMDB</span><i class='bx bxs-star'></i>${imdb}</p>
                        </div>
        `
        search.appendChild(searchMovie);

    }) 

    //Fetching only the data based on search input

    search_input.addEventListener('keyup',()=>{
        let fil = search_input.value.toUpperCase();
        let a = search.getElementsByTagName('a');
        for (let index = 0; index < a.length; index++) {
            let b = a[index].getElementsByClassName('cont')[0];
            // console.log(b.textContent); This gives the content coming in all cards
            let textValue = b.textContent || b.innerText;
            if(textValue.toUpperCase().indexOf(fil) > -1){
                a[index].style.display = 'flex';
                search.style.visibility = 'visible';
                search.style.opacity = 1;
            }
            else{
                a[index].style.display = 'none';
            }
            if(search_input.value == 0){
                search.style.visibility = 'hidden';
                search.style.opacity = 0;
            }
        }
    })


});
