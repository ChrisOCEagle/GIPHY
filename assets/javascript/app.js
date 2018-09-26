// create an array of strings that is related to a topic that interests me
// save it in a variable called topics
var criticalRole = {
    name: "Critical Role",
    campaign1: ["Vax'ildan", "Vex'ahlia", "Pike", "Grog",
            "Scanlan", "Percy", "Tiberius", "Keyleth"],
    campaign2: ["Fjord", "Beauregard", "Caleb",
                "Nott", "Jester", "Mollymauk", "Yasha"]
},
    topics = ["Dungeons and Dragons", "DnD", criticalRole.name,
            criticalRole.campaign1, criticalRole.campaign2,
            "Dungeon Master", "Videogames", "Creativity", "Learning",
            "Painting", "Writing", "Reading", "Math", "Physics", "Drawing", "Puzzles"];

// take the topics above and create a button on the page for every individual topic
// empty the text that will contain the buttons
renderButtons();
function renderButtons() {
    $(".btns").text("");
    // loop through the array that contains my topics of interest and create buttons for each topic
    for ( let i = 0; i < topics.length; i++) {
        // if the index of topics sends me to another array then I also need to loop through that array too
        if ( Array.isArray(topics[i]) ) {
            for ( let j = 0; j < topics[i].length; j++ ) {
                var newBtn = $("<button class='btn' id='btn btn-choice'>");
                newBtn.attr("data-name", topics[i][j].trim().replace(/\s/g, "")).text(topics[i][j]);
                $(".btns").append(newBtn);
            }
        } else {
            var newBtn = $("<button class='btn' id='btn btn-choice'>");
            newBtn.attr("data-name", topics[i].trim().replace(/\s/g, "")).text(topics[i]);
            $(".btns").append(newBtn);
        }
    }
}

// define what the URL is going to be in the global scope
var apiKey = "n6GlJS8VjUlOhT54g6nZoGhUNpNrCa1d",
    queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&&limit=10&&q=";
// once a button is clicked the page grabs some GIPHY API images and places them on the page
$(document).on("click", ".btns > button", function() {
    var searchTerm = $(this).attr("data-name").trim();
    searchGiphy(searchTerm);
})
// define the function searchGiphy
function searchGiphy(searchTerm) {
    queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&&limit=10&&q=";
    queryURL =  queryURL + searchTerm;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        // store each image url and rating from the api data in a variable
        for ( let i = 0; i < response.data.length; i++) {
            var imageURL = response.data[i].images.fixed_width_still.url,
                imageGIF = response.data[i].images.fixed_width.url,
                ratings = response.data[i].rating;
            // create a new image tag and a new paragraph tag
            var img = $("<img class='gif'>"),
                p = $("<p>").text(ratings);
            // give the new image tag some content
            img.attr("src", imageURL).attr("data-still", imageURL);
            img.attr("data-animate", imageGIF).attr("data-state", "still");
            // add the img to the page
            $("#images").prepend(img, p);
        }
    })
}
// when an image is clicked I want it to start animating
$(document).on("click", "#images > .gif", function() {
    // store the state of the image in a variable
    var state = $(this).attr("data-state").trim();
    // if the state of the image is still switch the image to animating
    if ( state === "still" ) {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate")
    } else if ( state === "animate" ) {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still")
    }
})
// when the user clicks the submit button
$("#add-topic").on("click", function(event) {
    // event.preventDefault() prevents the submit button from trying to send a form.
    // using a submit button instead of a normal button allows the user to hit "Enter"
    // instead of clicking the button if desired.
    event.preventDefault();

    // grab text from the input form
    var newTopic = $("#topic-input").val().trim();
    // push the text from the input form into the array
    topics.push(newTopic);
    // execute the function that renders the buttons
    renderButtons();
})