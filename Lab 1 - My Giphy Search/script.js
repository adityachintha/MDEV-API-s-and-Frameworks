const searchButton = document.getElementById("searchButton");

function getData() {
  clearData();
  const searchInput = document.getElementById("searchInput").value;

  fetch(
    `https://api.giphy.com/v1/stickers/search?api_key=Jr6lbehv6neANdE81IUyOwBciEwhcsQ3&q=${searchInput}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`
  )
    .then(function (response) {
      return response.json();
    })

    .then(function (jsonData) {
      console.log(jsonData);

      jsonData.data.forEach((item) => {
        let gifURL = item.images.original.url;
        console.log("Url Fetching", gifURL);

        let gitTitle = item.title;
        console.log("Title Fetching", gitTitle);

        // create gif in a web page
        const gifContainer = document.getElementById("gifContainer");

        let gif = document.createElement("img");
        gif.setAttribute("src", gifURL);
        gifContainer.appendChild(gif);

        let title = document.createElement("h3");
        title.innerHTML = gitTitle;
        gifContainer.appendChild(title);
      });
    })

    .catch(function (error) {
      console.log(error);
    });
}

function clearData() {
  let gifContainer = document.getElementById("gifContainer");
  gifContainer.innerHTML = "";
}
