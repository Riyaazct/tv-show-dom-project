// LINK TO THE LEVELS IN SYLLABUS
// https://syllabus.codeyourfuture.io/js-core-3/tv-show-dom-project/level-100

//You can edit ALL of the code here
const body = document.querySelector("body");
body.style.backgroundColor = "#f2f3f3";
const rootElem = document.getElementById("root");
rootElem.style.display = "grid";
rootElem.style.gap = "10px";
rootElem.style.gridTemplateColumns = "repeat(auto-fit, minmax(320px,1fr))";
rootElem.style.justifyContent = "center";
const theFirstChild = body.firstChild;
let allEpisodes = [];

function setup() {
  allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const htmlString = episodeList
    .map((episode) => {
      return `
    <ul> 
    <div style = "border: 1px solid lightgray; border-radius: 20px; padding: 20px; text-align: center; height: 450px">
          <li class = "episode" style = "list-style-type: none">
              <h3>
                  S0${episode.season}E0${episode.number} - ${episode.name}
              </h3>
              <img src = ${episode.image.medium}></img>
              <p>${episode.summary}</p>
              
              
        </li>
    </div>
    
    </ul> `;
    })
    .join("");
  rootElem.innerHTML = htmlString;
}

// Search box div

let searchBox = document.createElement("div");
searchBox.style.margin = "10px 0";
searchBox.style.display = "flex";
searchBox.style.alignItems = "center";
searchBox.id = "searchBox";
searchBox.style.padding = "10px";
body.insertBefore(searchBox, theFirstChild);
searchBox.style.alignContent = "center";

// search input field
const input = document.createElement("input");
input.autocomplete = "off";
input.type = "search";
input.id = "search";
input.placeholder = "Search";
input.style.width = "200px";
input.style.height = "30px";
input.style.marginLeft = "30px";
searchBox.append(input);

const h3 = document.createElement("h3");
h3.style.margin = "0 0 0 10px";
searchBox.appendChild(h3);

// Event listener for search
search.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();
  const filteredEpisodes = allEpisodes.filter((episode) => {
    return (
      episode.name.toLowerCase().includes(searchString) ||
      episode.summary.toLowerCase().includes(searchString)
    );
  });
  let filteredLength = filteredEpisodes.length;
  h3.innerText = `Displaying ${filteredLength}/${allEpisodes.length}`;
  makePageForEpisodes(filteredEpisodes);
});

window.onload = setup; // LEAVE THIS LINE(my comment)
