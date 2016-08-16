# folder-playlist
Create and manage a simple play list from files in a folder or an array

## Instalation
```shell
npm install folder-playlist [--save]
```
## Usage
Short example

```js
var fpl = require('folder-playlist')({
    song_src: 'path_to_folder',
    //Could be [{src:path_to_file1,attr:'GOOD SONG'}, {src:path_to_file2, attr:'GREAT SONG'}]
    shuffle: true, // true or false
    song_types: ['mp3'] // array of file valid extensions
});

var fpl_songs = fpl.getSongs();
console.log(flp_songs);

var fpl_playlist = fpl.getPlayList();
console.log(flp_playlist);

fpl.shuffleOn() //Modifies Playlist

fpl_playlist = fpl.getPlayList();
console.log(flp_playlist);

var next_song = fpl.getNextSong();
// open_your_player_using(next_song);
console.log(next_song);

```
