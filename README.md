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
    song_src: 'path_to_folder', //Could be [path_to_file1, path_to_file2, ..., path_to_fileN]
    shuffle: true, // true or false
    song_types: ['mp3'] // array of file valid extensions
});

var flp_songs = flp.getSongs();
console.log(flp_songs);

var flp_playlist = flp.getPlayList();
console.log(flp_playlist);

flp.shuffleOn() //Modifies Playlist

flp_playlist = flp.getPlayList();
console.log(flp_playlist);

var next_song = flp.getNextSong();
// open_your_player_using(next_song);
console.log(next_song);

```
