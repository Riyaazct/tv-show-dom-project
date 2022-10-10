// LINK TO THE LEVELS IN SYLLABUS
// https://syllabus.codeyourfuture.io/js-core-3/tv-show-dom-project/level-100

const body = document.querySelector("body");
body.style.backgroundColor = "#f2f3f3";
const rootElem = document.querySelector("#root");
const theFirstChild = body.firstChild;
let showId;
let allEpisodes = []; //variable to store episodes for mapping
let allShows = getAllShows(); //variable to store shows for mapping

// initial page setup
function setup() {
  makePageForAllShows(allShows);
}

// function to make the page for all episodes in DOM
function makePageForEpisodes(episodeList) {
  rootElem.id = "rootForEpisodes";
  const htmlString = episodeList
    .map((episode) => {
      return `
     <div class="rootClass">
         <ul> 
    <div class="boxForEpisodes" style = "background-color: white; border: 1px solid lightGray; border-radius: 20px; padding: 20px 30px 0 30px; text-align: center; height: 550px">
          <li class = "episode2" style = "list-style-type: none">
              <h3>
                  S0${episode.season}E0${episode.number} - ${episode.name}
              </h3>
              <img src = ${episode.image?.medium} style = "margin-top: 10px"></img> 
              <div>
                <p >${episode.summary}</p>
              </div>
        </li>
    </div>
    </ul>
     </div>`;
    })
    .join("");
  rootElem.innerHTML = htmlString;
}

//function to create the elements in the DOM displaying all the shows
function makePageForAllShows(showList) {
  const htmlString = showList
    .map((show) => {
      return `
    <ul>
          <div class="boxTitle">
          <h1>${show.name}</h1></div>
          <div class="showContainer">
          <li class = "episode" style = "list-style-type: none">
              <div class = "showBox-1">
              <img src = ${show.image?.medium} style = "margin-top: 10px"/>
                <p>${show.summary}</p>
              </div>
              <div class = "showBox-2">
                    <p><strong>Genre:</strong>  ${show.genres}</p>
                    <p><strong>Status:</strong>  ${show.status}</p>
                    <p><strong>Rating:</strong>  ${show.rating.average}</p>
                    <p><strong>Runtime:</strong>  ${show.runtime}</p>
              </div>
        </li>
    </div>
    </ul> `;
    })
    .join("");
  rootElem.innerHTML = htmlString;
}
// genres, status, rating, and runtime

// Search box div
let searchContainer = document.querySelector("#searchContainer");

// search input field
const input = document.createElement("input");
input.autocomplete = "off";
input.type = "text";
input.id = "search";
input.placeholder = "Search";
searchContainer.append(input);
const h3 = document.createElement("h3");
h3.style.margin = "0 0 0 10px";
searchContainer.appendChild(h3);

// Event listener for search
search.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();
  if (rootElem.id === "rootForEpisodes") {
    const filteredEpisodes = allEpisodes.filter((show) => {
      return (
        show.name.toLowerCase().includes(searchString) ||
        show.summary.toLowerCase().includes(searchString)
      );
    });
    let filteredLength = filteredEpisodes.length;
    h3.innerText = `Displaying ${filteredLength}/${allEpisodes.length}`;
    makePageForEpisodes(filteredEpisodes);
  } else if (rootElem.id === "root") {
    const filteredShows = allShows.filter((show) => {
      return (
        show.name.toLowerCase().includes(searchString) ||
        show.summary.toLowerCase().includes(searchString)
      );
    });
    let filteredLength = filteredShows.length;
    makePageForAllShows(filteredShows);
  }
});

// Select field for level 300
// let listOfEpisodes = getAllEpisodes(); //this needs to be changed when done
const select = document.getElementById("select");

//  populate select dropdown with list of episodes
function populateSelect(list) {
  list.map((episode) => {
    const option = document.createElement("option");
    option.value = episode.name;
    option.innerText = `S0${episode.season}E0${episode.number} - ${episode.name}`;
    select.appendChild(option);
  });
}
// event listener for the select dropdown with episode list
select.addEventListener("change", (e) => {
  let selected = e.target.value;
  let filtered = allEpisodes.filter((episode) => {
    if (selected === "all") {
      return allEpisodes;
    } else if (episode.name == selected) {
      return `S0${episode.season}E0${episode.number} - ${episode.name}`;
    }
  });

  makePageForEpisodes(filtered);
});

// Section for all shows and requirements for level 400

// select for shows
const select2 = document.querySelector("#select2");

allShows.map((show) => {
  const option = document.createElement("option");
  option.value = show.id;
  option.innerText = `${show.name}`;
  select2.appendChild(option);
});

// Function to fetch episode data using api created from captured ID
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
      populateSelect2(data);
      allEpisodes = data;
    });
}
// Event listener for select dropdown that creates new api with captured show ID
select2.addEventListener("change", (e) => {
  let storedId = e.target.value;
  showId = storedId;
  let apiStored = "https://api.tvmaze.com/shows/";
  let apiEnd = "/episodes";
  let result = apiStored + storedId + apiEnd; // concat the data to a variable to create the URL
  if (storedId === "allShows") {
    makePageForAllShows(allShows);
    select.style.display = "none";
    rootElem.id = "root";
    h3.innerText = "";
  } else {
    episodesCompiled(result); // call the function with new data to display selected show's episodes.
    select.style.display = "inline";
    populateSelect(allEpisodes);
    select.innerText = "";
    h3.innerText = "";
  }
});

function populateSelect2(shows) {
  shows.map((episode) => {
    const option = document.createElement("option");
    option.classList.add = "selectByDom";
    option.value = episode.name;
    option.innerText = `S0${episode.season}E0${episode.number} - ${episode.name}`;
    select.appendChild(option);
  });
}

window.onload = setup;
// makePageForEpisodes(allEpisodes);

// dropdown (select) for episodes not resetting to reflect selects show.
// search bar needs to work for both episodes and for the shows
