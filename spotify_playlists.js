var request = require("request");
var user_id = "shimazu85";
var token = "Bearer "
var playlists_url = "https://api.spotify.com/v1/users/"+user_id+"/playlists";

request({url:playlists_url, headers:{"Authorization":token}}, function (err, res){
    if (res){
        var playlists=JSON.parse(res.body);
        var playlist_url = playlists.items[0].href;
        request({url:playlist_url, headers:{"Authorization":token}}, function(err, res){
            if (res){
                var playlist = JSON.parse(res.body);
                console.log("playlist: " + playlist.name);
                playlist.tracks.forEach(function(track){
                    console.log(track.track.name);

                })
            };
        })

    }
});

// client_id	Required.

// When you register your application, Spotify provides you a Client ID.

// response_type	Required.
// Set to code.

// redirect_uri	Required.

// The URI to redirect to after the user grants or denies permission. This URI needs to have been entered in the Redirect URI whitelist that you specified when you registered your application. The value of redirect_uri here must exactly match one of the values you entered when you registered your application, including upper or lowercase, terminating slashes, and such.

// https://accounts.spotify.com/authorize?client_id=e4d66ae376534f54b84289b286defe4a&response_type=code&redirect_uri=https%3A%2F%2Fteamyeetbookstore.herokuapp.com%2F%0A

// curl -H "Authorization: Basic ZTRkNjZhZTM3NjUzNGY1NGI4NDI4OWIyODZkZWZlNGE6ZTRhYTA1YzI5OWUyNGMxNzkyN2ViZjlkY2FmNjBiZWU=" -d grant_type=authorization_code -d code=NgAagA...NUm_SHo -d redirect_uri= https%3A%2F%2Fteamyeetbookstore.herokuapp.com%2F%0A https://accounts.spotify.com/api/token

// client ID - e4d66ae376534f54b84289b286defe4a
// client secret - e4aa05c299e24c17927ebf9dcaf60bee

// e4d66ae376534f54b84289b286defe4a:e4aa05c299e24c17927ebf9dcaf60bee

// base 64 encode
// ZTRkNjZhZTM3NjUzNGY1NGI4NDI4OWIyODZkZWZlNGE6ZTRhYTA1YzI5OWUyNGMxNzkyN2ViZjlkY2FmNjBiZWU=