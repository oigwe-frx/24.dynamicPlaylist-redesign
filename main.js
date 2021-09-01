//IMPORTS
import {renderPlaylist, search} from './library.js';


//RETRIEVE SONG DATA FROM JSON
async function fetchSongData() {
    let response = await fetch('./data/songs.json');

    if (!response.ok) {
      document.getElementById('js-song-list').innerHTML = `<h2>${response.status}</h2>`;
    }

    return await response.json();
  }


  fetchSongData()
  .then((data) => {
    const title = document.querySelector('h1');
    title.innerText = data.name;
  
    const description = document.querySelector('.js-lead');
    description.innerText = data.description;
  
    const songList = document.querySelector('.js-song-list');
    songList.innerHTML = renderPlaylist(data.songs);

    const input = document.querySelector('.js-input');
    input.addEventListener('input', () => {
        songList.innerHTML = search(input.value, data.songs)
    });
  })

