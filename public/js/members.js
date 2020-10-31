const e = require("express");
const { Store } = require("express-session");

$(document).ready(function() {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(function(data) {
      $(".member-name").text(data.email);
    });
  });
  

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