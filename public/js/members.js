$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
  });
});


// const api = `your api here`
// axios.get(api, { headers: { "Authorization": `Bearer ${token}` } })
//   .then(res => {
//     console.log(res.data);
//     this.setState({
//       items: res.data,  /*set response data in items array*/
//       isLoaded: true,
//       redirectToReferrer: false
//     })

// handlePlaylistsubmit(e) {
//   e.preventDefault();
//   const likesNeeded = e.target.playlistLikesNeeded.value

//   let jsonData = {
//     name: e.target.playlistName.value,
//     public: false,
//     description: e.target.playlistDescription.value
//   };

//   axios({
//     method: 'POST',
//     url: `https://api.spotify.com/v1/users/${this.state.userReducer.SpotifyId}/playlists`,
//     data: jsonData,
//     dataType: 'json',
//     headers: {
//       'Authorization': 'Bearer ' + this.state.userReducer.accessToken,
//       'Content-Type': 'application/json'
//     }})
//     .then(res => {
//       const data = {
//         name: res.data.name,
//         externalUrl: res.data.external_urls.spotify,
//         playlistId: res.data.id,
//         userId: this.state.userReducer.id,
//         likesNeeded: likesNeeded
//       }
//       const postChatThunk = postChat(data)
//       store.dispatch(postChatThunk)
//     })
// };

// handleSongSubmit(e) {
//   e.preventDefault();
//   axios({
//     method: 'GET',
//     url: `https://api.spotify.com/v1/search?q=track:${e.target.songName.value}%20artist:${e.target.songArtist.value}&type=track`,
//     headers: {
//       'Authorization': 'Bearer' + this.state.userReducer.accessToken,
//     }
//   })
//   .then(res => {
//     const song = res.data.tracks.items[0];
//     console.log(song);
//     const postThunk = postSong(song, this.props.currentChat);
//     store.dispatch(postThunk)
//   })
// }

const APIController = (function () {
  const clientId = '';
  const clientSecret = '';

  const _getToken = async () => {

    const result = await fetch('https://accounts.spotify.com/api/token', {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-url',
        'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
      },
      body: 'great_type=client_credentials'
    });

    const data = await result.json();
    return data.access_token;
  }

  const _getGenres = async (token) => {

    const result = await fetch('https://api.spotify.com/vi/browse/categories?locale=sv_US', {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + token }
    });

    const data = await result.json();
    return data.categories.items;
  }

  const _getPlaylistByGenre = async (token, genreId) => {
    const limit = 10;

    const result = await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`, {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + token }
    });

    const data = await result.json();
    return data.playlists.itemsl
  }

  const _getTracks = async (token, tracksEndPoint) => {

    const limit = 10;
    const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + token }
    });

    const data = result.json();
    return data.items;
  }

  const _getTrack = async (token, trackEndPoint) => {

    const result = await fetch(`${trackEndPoint}`, {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + token }
    });

    const data = await result.json();
    return data;
  }

  return {
    getToken() {
      return _getToken();
    },
    getGenres(token) {
      return _getGenres(token);
    },
    getPlaylistByGenre(token, genreId) {
      return _getPlaylistByGenre(token, genreId);
    },
    getTracks(token, tracksEndPoint) {
      return _getTracks(token, tracksEndPoint);
    },
    getTrack(token, trackEndPoint) {
      return _getTrack(token, trackEndPoint);
    }
  }


})();

const UIController = (function () {

  const DOMElements = {
    selectGenre: '#select_genre',
    selectPlaylist: '#select_playlist',
    buttonSubmit: '#btn_submit',
    divSongDetail: '#song-detail',
    hfToken: '#hidden_token',
    divSonglist: '.song-list'
  }

  return {

    inputField() {
      return {
        genre: document.querySelector(DOMElements.selectGenre),
        playlist: document.querySelector(DOMElements.selectPlaylist),
        songs: document.querySelector(DOMElements.divSonglist),
        submit: document.querySelector(DOMElements.buttonSubmit),
        songDetail: document.querySelector(DOMElements.divSongDetail)
      }
    },

    createGenre(text, value) {
      const html = `<option value="${value}">${text}</option>`;
      document.querySelector(DOMElements.selectGenre).insertAdjacentHTML('beforeend', html);

    },

    createPlaylist(text, value) {
      const html = `<option value="${value}">${text}</option>`;
      document.querySelector(DOMElements.selectPlaylist).insertAdjacentHTML('beforeend', html);
    },

    createTrack(id, name) {
      const html = `<a href="#" class="list-group-item list-group-action list-group-item-light" id="${id}">${name}</a>`;
      document.querySelector(DOMElements.divSonglist).insertAdjacentElement('beforeend', html);
    },

    createSongDetail(img, title, artist) {
      const detailDiv = document.querySelector(DOMElements.divSongDetail);
      detailDiv.innerHTML = '';

      const html =
        `
        <div class="row col-sm-12 px-0>
          <img src="${img}" alt="">
          </div>
        <div class="row col-sm-12 px-0>
          <label for="Genre" class="form-label col-sm-12">${title}:</label>
          </div>
          <div class="row col-sm-12 px-0>
            <label for="artist" class="form-label col-sm-12">By ${artist}:</label>
            </div>
        `;
      detailDiv.insertAdjacentHTML('beforeend', html)
    },

    resetTrackDetail() {
      this.inputField().songDetail.innerHTML = '';

    },

    resetTracks() {
      this.inputField().songs.innerHTML = '';
      this.resetTrackDetail();
    },

    resetPlaylist() {
      this.inputField().playlist.innerHTML = '';
      this.resetTracks();
    }
  }
})();

const APPController = (function (UICtrl, APICtrl) {

  const DOMInputs = UICtrl.inputField();

  constloadGenres = async () => {
    const token = await APICtrl.getToken();
    UICtrl.storeToken(token);
    const genres = await APICtrl.getGenres(token);
    genres.forEach(element => UICtrl.createGenre(element.name, element.id));
  }

  DOMInputs.genre.addEventListener('change', async () => {
    UICtrl.resetPlaylist();

    const token = UICtrl.getStoredToken().token;
    const genreSelect = UICtrl.inputField().genre;
    const genreId = genreSelect.options[genreSelect.selectedIndex].value;
    const playlist = await APICtrl.getPlaylistByGenre(token, genreId);
    console.log(playlist)
  });

  DOMInputs.submit.addEventListener('click', async (e) => {
    e.preventDefault();
  })
})();