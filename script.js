// LINK TO THE LEVELS IN SYLLABUS
// https://syllabus.codeyourfuture.io/js-core-3/tv-show-dom-project/level-100

//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}
/*
{
      id: 4952,
      url:
        "http://www.tvmaze.com/episodes/4952/game-of-thrones-1x01-winter-is-coming",
      name: "Winter is Coming",
      season: 1,
      number: 1,
      airdate: "2011-04-17",
      airtime: "21:00",
      airstamp: "2011-04-18T01:00:00+00:00",
      runtime: 60,
      image: {
        medium:
          "http://static.tvmaze.com/uploads/images/medium_landscape/1/2668.jpg",
        original:
          "http://static.tvmaze.com/uploads/images/original_untouched/1/2668.jpg",
      },
      summary:
        "<p>Lord Eddard Stark, ruler of the North, is summoned to court by his old friend, King Robert Baratheon, to serve as the King's Hand. Eddard reluctantly agrees after learning of a possible threat to the King's life. Eddard's bastard son Jon Snow must make a painful decision about his own future, while in the distant east Viserys Targaryen plots to reclaim his father's throne, usurped by Robert, by selling his sister in marriage.</p>",
      _links: {
        self: {
          href: "http://api.tvmaze.com/episodes/4952",
        },
      },
    },
*/

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");

  // create the card for the content
  episodeList.forEach((episode) => {
    rootElem.style.display = "grid";
    rootElem.style.gap = "5px";
    rootElem.style.gridTemplateColumns = "33% 33% 33%";
    rootElem.style.border = "1px solid";
    rootElem.style.justifyContent = "center";
    rootElem.style.backgroundColor = "#f2f3f3";

    //card div
    const innerDiv = document.createElement("div");
    innerDiv.className = "card";
    innerDiv.style.margin = "5px";
    // innerDiv.style.padding = "5px";
    innerDiv.style.height = "450px";
    innerDiv.style.backgroundColor = "white";
    innerDiv.style.borderRadius = "10px";
    innerDiv.style.textAlign = "center";
    rootElem.appendChild(innerDiv);

    // div for title
    const titleDiv = document.createElement("div");
    titleDiv.className = "title";
    titleDiv.style.height = "auto";
    titleDiv.style.width = "100%";
    titleDiv.style.border = "1px solid gray";
    innerDiv.appendChild(titleDiv);

    // Title
    const h3 = document.createElement("h3");
    h3.textContent = `S0${episode.season}E0${episode.number} - ${episode.name}`;
    titleDiv.style.borderRadius = "10px";
    titleDiv.appendChild(h3);

    // Insert Image
    const img = document.createElement("img");
    img.src = episode.image.medium;
    img.style.margin = "25px 5px 0px 5px";
    innerDiv.appendChild(img);

    // Paragraph
    const p = document.createElement("p");
    p.innerHTML = episode.summary;
    innerDiv.appendChild(p);
    p.style.margin = "10px";
  });
}

window.onload = setup; // LEAVE THIS LINE(my comment)

/* Level 100
Minimal features

All episodes must be shown
For each episode, AT LEAST following must be displayed:
the episode's name
the season number
the episode number
the episode's medium-sized image
the episode's summary text
You should combine season number and episode number into an episode code:
Each part should be zero-padded to two digits.
Example: S02E07 would be the code for the 7th episode of the 2nd season. S2E7 would be incorrect.
Your page should state somewhere that the data has (originally) come from TVMaze.com, and link back to that site (or the specific episode on that site). See tvmaze.com/api#licensing.*/
