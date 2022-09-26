// LINK TO THE LEVELS IN SYLLABUS
// https://syllabus.codeyourfuture.io/js-core-3/tv-show-dom-project/level-100

const body = document.querySelector("body");
body.style.backgroundColor = "#f2f3f3";
const rootElem = document.getElementById("root");
rootElem.style.display = "grid";
rootElem.style.gap = "10px";
rootElem.style.gridTemplateColumns =
  "repeat(auto-fit, minmax(320px,1fr))";
rootElem.style.justifyContent = "center";
const theFirstChild = body.firstChild;
// let allEpisodes = [];
allEpisodes = getAllEpisodes();

function setup() {
  fetch("https://api.tvmaze.com/shows/82/episodes")
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        throw new Error(
          `Encountered something unexpected: ${response.status} ${response.statusText}`
        );
      }
    })
    .then((data) => {
      makePageForEpisodes(data);
      allEpisodes = data;
    });
}

// function to make the page for all episodes
function makePageForEpisodes(episodeList) {
  const htmlString = episodeList
    .map((episode) => {
      return `
    <ul> 
    <div style = "background-color: white; border: 1px solid lightGray; border-radius: 20px; padding: 20px 30px 0 30px; text-align: center; height: 550px">
          <li class = "episode" style = "list-style-type: none">
              <h3>
                  S0${episode.season}E0${episode.number} - ${episode.name}
              </h3>
              <img src = ${episode.image.medium} style = "margin-top: 10px"></img> 
              <div>
                <p >${episode.summary}</p>
              </div>
        </li>
    </div>
    </ul> `;
    })
    .join("");
  rootElem.innerHTML = htmlString;
}

// Search box div
let searchContainer = document.querySelector("#searchContainer");
searchContainer.style.width = "100%";

// search input field
const input = document.createElement("input");
input.autocomplete = "off";
input.type = "text";
input.id = "search";
input.style.marginLeft = "auto";
input.placeholder = "Search";
searchContainer.append(input);
const h3 = document.createElement("h3");
h3.style.margin = "0 0 0 10px";
searchContainer.appendChild(h3);

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

// Select field for level 300
// let listOfEpisodes = getAllEpisodes(); //this needs to be changed when done
const select = document.getElementById("select");

// // Loop for episodes to appear in the select dropdown
allEpisodes.map((episode) => {
  const option = document.createElement("option");
  option.value = episode.name;
  option.innerText = `S0${episode.season}E0${episode.number} - ${episode.name}`;
  select.appendChild(option);
});

select.addEventListener("change", (e) => {
  let selected = e.target.value;
  let filtered = allEpisodes.filter((episode) => {
    if (selected === "all") {
      return allEpisodes;
    } else if (episode.name == selected) {
      return `S0${episode.season}E0${episode.number} - ${episode.name}`;
    }
  });
  h3.innerText = `Displaying ${filtered.length}/${allEpisodes.length}`;
  makePageForEpisodes(filtered);
});

// Section for all shows and requirements for level 400
const allShows = getAllShows();

// select for shows
const select2 = document.querySelector("#select2");

allShows.map((show) => {
  const option = document.createElement("option");
  option.value = show.id;
  option.innerText = `${show.name}`;
  select2.appendChild(option);
});

function episodesCompiled(api) {
  fetch(api)
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        throw new Error(
          `Encountered something unexpected: ${response.status} ${response.statusText}`
        );
      }
    })
    .then((data) => {
      makePageForEpisodes(data);
      allEpisodes = data;
    });
}

// Event listener for select dropdown
select2.addEventListener("change", (e) => {
  let storedId = e.target.value;
  let apiStored = "https://api.tvmaze.com/shows/";
  let apiEnd = "/episodes";
  let result = apiStored + storedId + apiEnd;
  episodesCompiled(result);
});

//

window.onload = setup;
