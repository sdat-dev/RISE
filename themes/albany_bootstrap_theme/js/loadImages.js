document.addEventListener("DOMContentLoaded", function() {
  let speakerImages = document.getElementsByClassName("speakers-img");
  let speakerLinks = document.getElementsByClassName("speakers-link");
  for (
    let speakerCount = 0;
    speakerCount < speakerImages.length;
    speakerCount++
  ) {
    let speakerLink = speakerLinks[speakerCount].href;
    let speakerImage = speakerImages[speakerCount].src;
    speakerLink = speakerLink.substring(
      speakerLink.lastIndexOf("/") + 1,
      speakerLink.length - 5
    );
    speakerImage = speakerImage.substring(
      speakerImage.lastIndexOf("/") + 1,
      speakerImage.length - 4
    );
    if (speakerLink != speakerImage) {
      let imageURL =
        "https://rise2019.org/img/Speakers/" + speakerLink + ".png";
      fetch(imageURL).then(response => {
        if (response.status == 200) {
          speakerImages[speakerCount].src = imageURL;
        }
      });
    }
  }
});
