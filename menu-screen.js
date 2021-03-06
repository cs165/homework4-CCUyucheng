// This class will represent the menu screen that you see when you first load
// the music visualizer.
//
// See HW4 writeup for more hints and details.
class MenuScreen {
  constructor(menuElement) {
    // TODO(you): Implement the constructor and add fields as necessary.
    this.selectElem = document.querySelector('select');
    this.menuElement = menuElement;
    this.songs = [];
    this.songUrl;
    this.title;
    this.artist;
    this.theme = ['candy', 'charlie brown', 'computers', 'dance', 'donuts', 'hello kitty', 'flowers', 'nature', 'turtles', 'space'];

    this.myJsonReady = this.myJsonReady.bind(this);
    this.fetchsongs = this.fetchsongs.bind(this);
    this.fetchsongs();
    this.getRandomTheme = this.getRandomTheme.bind(this);
    this.getRandomTheme();
    this.submitting  = this.submitting.bind(this);
    document.querySelector('input[type=submit]').addEventListener('click',this.submitting);
  }
  // TODO(you): Add methods as necessary.

  fetchsongs() {
  fetch("https://fullstackccu.github.io/homeworks/hw4/songs.json")
  .then(function(response) {
    return response.json();
  })
  .then(this.myJsonReady);
}
myJsonReady(myJson) {
  this.songs = myJson;
  for (const song in this.songs) {
    let list = document.getElementById('song-selector');
    const option = document.createElement("option");
      option.value = this.songs[song].songUrl;
      option.text = this.songs[song].title;
      list.add(option);
  }
}

getRandomTheme() {
  let random = Math.floor(Math.random() * 10);
  document.getElementById("query-input").defaultValue = this.theme[random];
}

submitting(event) {
  let songvalue = document.getElementById("song-selector");
  this.songUrl = songvalue.options[songvalue.selectedIndex].value;
  let themevalue = document.getElementById("query-input").value;
  document.dispatchEvent(new CustomEvent('toMusic'));
  event.preventDefault();
}
}
