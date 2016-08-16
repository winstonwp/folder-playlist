var fs = require('fs');
var _ = require('lodash');
module.exports = function(poptions) {
    var module = {};
    var that = this;
    that.options = {};
    that.songs = [];
    that.pl_index = -1;
    that.pl = [];
    /**
     * Sets the necessary options for this module
     * @param {object} options {folder:'path_to_folder', 'shuffle':bool, song_types:['mp4', 'mp3', 'etc']}
     */
    function setOptions(options) {
        if (typeof options === 'object') {
            that.options.song_src = options.song_src || '';
            that.options.shuffle = options.shuffle || false;
            that.options.song_types = options.song_types || ['mp3', 'mp4', 'ogg', 'oggv'];
            setSongs(that.options.song_src);
        }
    }
    /**
     * Sets the folder to be used, and gets the songs according to
     * options.song_types
     * @param {string || array} string: pfolder_path the path of the folder to be used || array: array of file_paths
     */


    /**
     * Sets the songs to be used and gets the songs according to options.song_types
     * @param {string || array} song_src string: pfolder_path the path of the folder to be used || array: array of file_paths
     */
    function setSongs(song_src) {
        that.options.song_src = song_src;
        var files;
        if (Array.isArray(that.options.song_src)) {
            files = song_src;
        } else if (existsSync(that.options.song_src)) {
            files = fs.readdirSync(that.options.song_src);
            files = _.map(files, function(f) {
                return song_src + '/' + f;
            });
        } else {
            throw new Error('Song source should be an array or a valid folder path');
        }
        that.songs = [];
        for (var i = 0; i < files.length; i++) {
            if (that.options.song_types.indexOf(files[i].src.split('.').pop()) > -1) {
                that.songs.push({
                    'path': files[i].src,
                    'attr': files[i].attr,
                    'last_played': '',
                    'played': false
                });
            }
        }
        that.options.shuffle ? shuffleOn() : shuffleOff();
    }
    /**
     * Turns shuffle on and returns the options.shuffle status;
     * @return {bool} options.shuffle value
     */
    function shuffleOn() {
        that.pl = _.shuffle(that.songs);
        that.options.shuffle = true;
        return that.options.shuffle;
    }
    /**
     * Turns shuffle off and returns the options.shuffle status;
     * @return {bool} options.shuffle value
     */
    function shuffleOff() {
        that.pl = that.songs;
        that.options.shuffle = false;
    }
    /**
     * Gets the next song to play according to the options
     * @return {object} {'path':'song_path',last_played:'date', played:'bool'}
     */
    function getNextSong() {
        var selected_song;
        if (that.pl.length < 1)
            return {};
        if (that.pl_index + 1 >= that.pl.length) {
            that.pl_index = 0;
            that.songs = _.map(that.songs, function setPlayedFalse(s) {
                s.played = false;
                return s;
            });
            if (that.options.shuffle)
                shuffleOn();
        } else {
            that.pl_index++;
        }
        selected_song = that.pl[that.pl_index];
        if (selected_song.played) {
            getNextSong();
        } else {
            that.pl[that.pl_index].last_played = new Date();
            that.pl[that.pl_index].played = true;
            _.chain(that.songs)
                .find({
                    path: selected_song.path
                })
                .merge({
                    last_played: that.pl[that.pl_index].last_played,
                    played: true
                });
            return selected_song;
        }
    }
    /**
     * Returns the array of songs ordered as read
     * @return {array} Songs
     */
    function getSongs() {
        return that.songs;
    }
    /**
     * Returns the playlist being used
     * @return {object} {playlist[array], index[integer]}
     */
    function getPlayList() {
        return {
            playlist: that.pl,
            index: that.pl_index
        };
    }
    setOptions(poptions);

    module.setOptions = setOptions;
    module.shuffleOn = shuffleOn;
    module.shuffleOff = shuffleOff;
    module.getNextSong = getNextSong;
    module.getSongs = getSongs;
    module.getPlayList = getPlayList;

    return module;
};
 /**
  * Determines if a folder exists synchronously
  * @param  {string} directory
  * @return {bool}           if folder exists
  */
function existsSync(directory) {
    try {
        fs.statSync(directory);
        return true;
    } catch (e) {
        return false;
    }
}
