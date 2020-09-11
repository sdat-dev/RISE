Rise.state = Rise.state || {};
Rise.state.posterLimit = 5;
Rise.state.selectedPosters = Rise.state.selectedPosters || [];

const loadPosters = function loadPosters() {
  Rise.getData(
    "https://2oo6657gwl.execute-api.us-east-2.amazonaws.com/Dev/getposters",
    Rise.errorHandler,
    renderAllPosters
  );
};

const saveVoteData = function saveVoteData() {
  //prepare data
  const data = {
    EmailID: this["EmailID"].value,
    Name: this["Name"].value,
    VotedPosters: Rise.state.selectedPosters.slice(0, 5)
  };
  //submit
  Rise.postData(
    "https://ax7fe0xbh7.execute-api.us-east-2.amazonaws.com/Dev/postcustomerdetails",
    Rise.errorHandler,
    voteSuccessHandler,
    data
  );

  event.preventDefault();
};

const voteSuccessHandler = function() {
  console.log("Your Vote has been submitted successfully.");
  location.href = "https://www.albany.edu/rise2019/thank-you.html";
};

const createElement = function createElement(name) {
  return document.createElement(name);
};

const getPosterTemplate = function(posterData) {
  const $poster = createElement("div");
  $poster.id = posterData.PosterID;
  $poster.classList.add("poster-container");
  $poster.classList.add("col-lg-3");
  $poster.classList.add("col-md-5");
  $poster.classList.add("col-sm-5");
  $poster.classList.add("col-xs-12");

  const $posterImg = createElement("img");
  $posterImg.src = posterData.PosterIconLink;
  $posterImg.classList.add("poster-icon");

  const $posterLink = createElement("a");
  $posterLink.href = posterData.PosterLink;
  $posterLink.target = "_blank";
  $posterLink.innerText = "View Poster";
  $posterLink.classList.add("poster-link");

  const $thumbsUp = createElement("i");
  $thumbsUp.classList.add("fa");
  $thumbsUp.classList.add("fa-thumbs-o-up");

  const $likedPoster = createElement("i");
  $likedPoster.classList.add("fa");
  $likedPoster.classList.add("fa-thumbs-up");
  $likedPoster.classList.add("liked");

  $poster.appendChild($posterImg);
  $poster.appendChild(document.createElement("br"));
  $poster.appendChild($posterLink);
  //$poster.appendChild($thumbsUp);
  //$poster.appendChild($likedPoster);

  return $poster;
};

const getRankDropdownTemplate = function() {
  const $rankContainer = createElement("div");
  $rankContainer.classList.add("rank-container");

  const $rankText = createElement("span");
  $rankText.innerText = "Rank this poster:";

  const $rankDropdown = createElement("select");
  $rankDropdown.classList.add("select-poster");

  ["Select", "1", "2", "3", "4", "5"].forEach(function(value) {
    let $option = createElement("option");
    $option.value = value;
    $option.innerHTML = value;
    $rankDropdown.add($option);
  });

  $rankContainer.appendChild($rankText);
  $rankContainer.appendChild($rankDropdown);

  return $rankContainer;
};

function renderAllPosters(data) {
  const $parentElement = document.querySelector("#all-posters-container");
  $parentElement.querySelector(".loader").style.display = "none";
  const allPosters = shuffle(data.Items);

  allPosters.forEach(function(posterData) {
    let $poster = getPosterTemplate(posterData);
    //let $rankDropdown = getRankDropdownTemplate();
    //$poster.appendChild($rankDropdown);
    $parentElement.appendChild($poster);
  });
  //addEvents();
}

function submitPosterData(event) {
  let $form = event.currentTarget;
  let lengthOfInputs = $form.length;
  let data = {};

  for (let i = 0; i < lengthOfInputs; i++) {
    if ($form[i].value) {
      data["" + $form[i].name + ""] = $form[i].value;
    }
  }
  savePosterDataInTable(data);
  //empty the previous data
  document.querySelector(".all-posters table tbody").innerHTML = "";
  //reload the table with new Data
  loadDoc();
  event.preventDefault();
}

const savePosterData = function savePosterData(data) {
  let dataInString = JSON.stringify(data);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    let $message = document.querySelector(".message");
    if (this.readyState == 4 && this.status == 200) {
      $message.innerHTML = this.responseText;
      $message.classList.remove("error");
      $message.classList.add("success");
    } else {
      $message.innerHTML = this.status;
      $message.classList.remove("success");
      $message.classList.add("error");
    }
  };
  xhttp.open(
    "POST",
    "https://cw6d1uduy2.execute-api.us-east-2.amazonaws.com/Dev/postposterdata",
    true
  );
  xhttp.send(dataInString);
};

const addEvents = function() {
  debugger;
  const $posters = document.querySelectorAll(".poster-container");

  Array.prototype.slice.call($posters).forEach(function($poster) {
    $poster.addEventListener("click", toggleSelectedPoster);
    console.log("added Event");
  });

  document
    .querySelector("#poster-voting-form")
    .addEventListener("submit", saveVoteData);
};

const toggleSelectedPoster = function(event) {
  const $curPoster = event.currentTarget;
  if (
    event.target.classList.contains("select-poster") ||
    event.target.classList.contains("poster-link")
  )
    return;

  if ($curPoster.classList.contains("poster-selected")) {
    const curId = $curPoster.id;
    Rise.state.selectedPosters = Rise.state.selectedPosters.filter(function(
      id
    ) {
      return id !== curId;
    });
    $curPoster.classList.remove("poster-selected");
  } else {
    if (Rise.state.selectedPosters.length === Rise.state.posterLimit) {
      document.querySelector("#closeSubmitDataModal").click();
      document.querySelector("#submitDataModalLabel").innerText =
        MESSAGES.postMaxPosterMessage;
      return;
    }
    Rise.state.selectedPosters.push($curPoster.id);
    $curPoster.classList.add("poster-selected");
    if (Rise.state.selectedPosters.length === Rise.state.posterLimit) {
      document.querySelector("#closeSubmitDataModal").click();
      document.querySelector("#submitDataModalLabel").innerText =
        MESSAGES.postMaxPosterMessage;
      return;
    }
  }
};

const alertMessage = function(message) {
  alert(message);
};

const init = function init() {
  let $message = document.querySelector(".message");
  $message.classList.remove("success");
  $message.classList.remove("error");
};

const shuffle = function shuffle(array) {
  return array.sort(function() {
    return Math.random() - 0.5;
  });
};

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const MESSAGES = {
  postMaxPosterMessage:
    "Awesome!! You have selected 5 posters. Please submit your response."
};
