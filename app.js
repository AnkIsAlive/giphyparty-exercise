/* This is a jQuery selector. It is selecting the elements with the id of gif-area and search. */
const $gifArea = $("#gif-area");
const $searchInput = $("#search");

/* use ajax result to add a gif */

/**
 * It takes in a response from the Giphy API, and then adds a new column to the page with a random gif
 * from the response
 * @param res - the response object from the API call
 */
function addGif(res) {
	let numResults = res.data.length;
	if (numResults) {
		let randomIdx = Math.floor(Math.random() * numResults); // random generator
		let $newCol = $("<div>", { class: "col-md-4 col-12 mb-4" }); //div with css properties
		let $newGif = $("<img>", {
			src: res.data[randomIdx].images.original.url,
			class: "w-100",
		}); // img with css properties
		$newCol.append($newGif);
		$gifArea.append($newCol); //appending newCol & gifArea
	}
}

/* handle form submission: clear search box & make ajax call */

/* This is a jQuery event listener. It is listening for a submit event on the form element. When the
event is triggered, it will run the function. */
$("form").on("submit", async function (evt) {
	evt.preventDefault();

	let searchTerm = $searchInput.val();
	$searchInput.val("");

	const response = await axios.get("http://api.giphy.com/v1/gifs/search", {
		//get request in the search bar
		params: {
			q: searchTerm,
			api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym",
		},
	});
	addGif(response.data); //response from request
});

/* remove gif */
$("#remove").on("click", function () {
	// click then execute function
	$gifArea.empty(); // clears gifArea
});
