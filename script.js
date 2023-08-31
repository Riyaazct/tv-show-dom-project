// LINK TO THE LEVELS IN SYLLABUS
// https://syllabus.codeyourfuture.io/js-core-3/tv-show-dom-project/level-100

// Get a reference to the body element and set its background color
const body = document.querySelector("body");
body.style.backgroundColor = "#f2f3f3";

// Get a reference to the root element and the first child of the body
const rootElem = document.querySelector("#root");
const theFirstChild = body.firstChild;

let showId; // Store the current show ID
let allEpisodes = []; // Store episodes for mapping
let allShows = getAllShows(); // Store shows for mapping

// sort shows by title
allShows.sort((a, b) => {
  if (a.name.toLowerCase() < b.name.toLowerCase()) {
    return -1;
  } else {
    return 1;
  }
});

// Initial page setup
function setup() {
  makePageForAllShows(allShows);
}

// Function to create DOM elements for displaying all episodes
function makePageForEpisodes(episodeList) {
  rootElem.id = "rootForEpisodes";
  const htmlString = episodeList
    .map((episode) => {
      return `
          <div class="boxForEpisodes" >            
              <h2>
                S0${episode.season}E0${episode.number} - ${episode.name}
              </h2>
              <img src="${episode.image?.medium}" style="margin-top: 10px"></img>
              
                <p>${episode.summary}</p>            
          
      </div>`;
    })
    .join("");
  rootElem.innerHTML = htmlString;
}

// Function to create DOM elements for displaying all shows
function makePageForAllShows(showList) {
  const htmlString = showList
    .map((show) => {
      return `
      <div class="showContent">
        <div class="imageContainer">
          <img src="${show.image?.original}" alt="${show.name}" />
        </div>
        <div class="textContainer">
          <h2>${show.name}</h2>
          <div class="showSummary">
            <p>${show.summary}</p>
          </div>
          <div class="showDetails">
            <ul>
              <li><strong>Genre:</strong> ${show.genres.join(
                ", "
              )}</li>
              <li><strong>Status:</strong> ${show.status}</li>
              <li><strong>Rating:</strong> ${
                show.rating.average || "N/A"
              }</li>
              <li><strong>Runtime:</strong> ${
                show.runtime
              } minutes</li>
              <li><strong>Link:</strong><a href=${
                show.url
              } target="_blank"><span> ${show.url}</span></a></li>
              </ul>
          </div>
        </div>
      </div>
    `;
    })
    .join("");
  rootElem.innerHTML = htmlString;
}

// Search box div
let searchContainer = document.querySelector("#searchContainer");

// Create search input field
const input = document.createElement("input");
input.type = "search";
input.id = "search";
input.placeholder = "Search...";
searchContainer.append(input);
const h3 = document.createElement("h3");
h3.style.margin = "0 0 0 10px";
searchContainer.appendChild(h3);

// Event listener for search input
search.addEventListener("input", function () {
  const searchString = this.value.toLowerCase();

  // Handle empty search
  if (searchString === "") {
    if (rootElem === "rootForEpisodes") {
      makePageForEpisodes(allEpisodes);
    } else {
      setup();
    }
  }

  // Handle search in episodes or shows
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
    makePageForAllShows(filteredShows);
  }
});

// Select field for level 300
const select = document.getElementById("select");

// Populate select dropdown with list of episodes
function populateSelect(list) {
  list.map((episode) => {
    const option = document.createElement("option");
    option.value = episode.name;
    option.innerText = `S0${episode.season}E0${episode.number} - ${episode.name}`;
    select.appendChild(option);
  });
}

// Event listener for the select dropdown with episode list
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

// Select for shows
const select2 = document.querySelector("#select2");

// Populate select dropdown with list of shows
allShows.map((show) => {
  const option = document.createElement("option");
  option.value = show.id;
  option.innerText = `${show.name}`;
  select2.appendChild(option);
});

// Function to fetch episode data using API created from captured ID
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

// Event listener for select dropdown that creates new API with captured show ID
select2.addEventListener("change", (e) => {
  let storedId = e.target.value;
  showId = storedId;
  let apiStored = "https://api.tvmaze.com/shows/";
  let apiEnd = "/episodes";
  let result = apiStored + storedId + apiEnd;

  // Handle case for displaying all shows
  if (storedId === "allShows") {
    makePageForAllShows(allShows);
    select.style.display = "none";
    rootElem.id = "root";
    h3.innerText = "";
  } else {
    episodesCompiled(result);
    select.style.display = "inline";
    populateSelect(allEpisodes);
    select.innerText = "";
    h3.innerText = "";
  }
});

// Function to populate second select dropdown with episodes
function populateSelect2(shows) {
  shows.map((episode) => {
    const option = document.createElement("option");
    option.classList.add = "selectByDom";
    option.value = episode.name;
    option.innerText = `S0${episode.season}E0${episode.number} - ${episode.name}`;
    select.appendChild(option);
  });
}

// Setup the initial state when the window loads
window.onload = setup;
