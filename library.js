//IMPORTS
import { thumbnails } from './data/thumbnails.js'


//SELECTS RANDOM IMAGE ARRAY
const imgRandom = (array) => {
  for (let i = 0; i < 18; i++) {
    const randomImg = array[Math.floor(Math.random() * array.length)];
    return randomImg
  }
  return randomImg
}


//GENERATATE HTML FOR THUMBNAIL
const thumbnailHTML = (imageArray = thumbnails) => {
  const image = imgRandom(imageArray);
  return `
    <a class="poster">
      <img class="poster-img" src=${image} alt="Star Trek The Original Series"/>
      <span>
      <!-- Play Button Overlay -->
      <img class="play-btn" src="./assets/images/play-button-overlay.png">
      </span>
    </a>
    `
};


//GENERATE IFRAME THAT HOLDS VIDEO/AUDIO CONTENT

const audioGenerator = (link) => {
  let audio = `
    <audio controls>
      <source src="${link}" type="audio/mpeg">
      Your browser does not support the audio element.
    </audio>
  `;
  return audio;
}



//GENERATE HTML FOR MODAL (VIDEO/AUDIO FOR EACH SONG IS CONTAINED IN MODAL)
const audioPlayer = (data) => {
  return ` 
  <!--MODAL TRIGGER BUTTON-->
  <div class="poster-holder" data-toggle="modal" data-target="#Modal-${data.number}">
       <!--THUMBNAIL FOR SONG -->
      ${thumbnailHTML()}
   </div>
  
  <!--MODAL -->
  <div class="modal" id="Modal-${data.number}" tabindex="-1" role="dialog" aria-labelledby="Model=${data.number}" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
      <h3 style="color: white">${data.name}</h3>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
          ${audioGenerator(data.audio)}       
      </div>
    </div>
  </div>
</div>
  `
}

//PARSES THROUGH COMPOSER ARRAY TO BUILD HTML
const composerBuilder = (array) => {
  let composers = ``;
   array.forEach((element) => {
    composers += `<p>${element}</p>`
  })
  return composers;
}

//USES HELPER FUNCTIONS TO GENERATE HTML FOR EACH ROW
const objectToHTML = (data) => {
  return `
  <div class="row mb-2">
    <div class="col-6">
      <!--MODAL VIDEO PLAYER-->
      ${audioPlayer(data)}
    </div>
    <div class="col-6 song-info">
      <p class='mb-0 song-name'> ${data.name}</p>
      <p class='song-album'>Album: ${data.album}</p>
      <div class='song-artists lead'> ${composerBuilder(data.composer)}</div>
    </div>
  </div>
`
}


//FUNCTION USED TO RENDER PLAYLIST
const renderPlaylist = (playlist) => {

  let htmlToRender = '';

  for (let i = 0; i < playlist.length; i++) {
    htmlToRender += objectToHTML(playlist[i]);
  }

  return htmlToRender;
}

//FUNCTION USED TO SEARCH PLAYLIST

const search = (value, data) => {
  const searchedMatches = [];


  //MUST FIND A MORE EFFICIENT METHOD OF SEARCH
  for (let i = 0; i < data.length; i++) {
    let songName = data[i].name.toLowerCase();
    let songComposer = data[i].composer.toString().toLowerCase();
    let albumName = data[i].album.toString().toLowerCase();
    let inputValue = value.toLowerCase();

    if (songName.includes(inputValue) || songComposer.includes(inputValue) || albumName.includes(inputValue) || albumName.includes(inputValue)) {
      searchedMatches.push(data[i]);
    }

  }

  return renderPlaylist(searchedMatches);
}




export { search, renderPlaylist }
