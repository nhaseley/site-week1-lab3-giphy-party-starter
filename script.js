// Global Constants
const apiKey = "RXqwRIzTKNCuE32A6fSJFG4kiYoob3hv"
const limit = 9
const rating = "g"
const searchForm = document.getElementById("search-form")
const searchInput = document.getElementById("search-input")
const showMoreBtn = document.getElementById("show-more-button")
const resultsEl = document.getElementById("results")

const GIPHY_API_BASE_URL = `http://api.giphy.com/v1/gifs/search`

const state = {
  apiPage: 0,
  searchTerm: "",
}


/** Render div element for a single GIF. */
function generateGifHTML(url) {
  return `
    <div class="gif">
        <img src="${url}" />
    </div>
`
}


/**
 * Update the DOM to display results from the Giphy API query.
 *
 * @param {Object} results - An array of results containing each item
 *                           returned by the response from the Giphy API.
 *
 */
function displayResults(results) {
  // YOUR CODE HERE
  let gifsHTMLString = ""
  for (let gif of results) {
    gifsHTMLString += generateGifHTML(gif?.images?.original?.url ?? "")
  }

  resultsEl.innerHTML += gifsHTMLString
}

const createGiphyEndpointUrl = (searchTerm, numResults, offset = 0) =>
  `${GIPHY_API_BASE_URL}?q=${searchTerm}&limit=${numResults}&offset=${offset}&api_key=${apiKey}`

/**
 * Make the actual `fetch` request to the Giphy API
 * and appropriately handle the response.
 *
 * @param {String} searchTerm - The user input text used as the search query
 *
 */
async function getGiphyApiResults(searchTerm) {
  // YOUR CODE HERE
  const offset = state.apiPage * limit
  const response = await fetch(createGiphyEndpointUrl(searchTerm, limit, offset)) // await bc async function
  const jsonResponse = await response.json() // await bc async function
  console.log(jsonResponse.data)
  return jsonResponse.data // async function
}

/**
 * The function responsible for handling all form submission events.
 *
 * @param {SubmitEvent} event - The SubmitEvent triggered when submitting the form
 *
 */
async function handleFormSubmit(event) {
  // YOUR CODE HERE
  event.preventDefault()
  // disables the default handling of the form submission event, which will cause the page to reload
  
  // reset results display section
  resultsEl.innerHTML = ""
  // handle state changes
  state.apiPage = 0
  state.searchTerm = searchInput.value
  console.log(searchInput.value)
  const results = await getGiphyApiResults(state.searchTerm) // await bc async function
  displayResults(results)
  searchInput.value = ""
  state.apiPage += 1
  showMoreBtn?.classList?.remove?.("hidden")


}

// searchForm.addEventListener("submit", handleFormSubmit)

/**
 * Handle fetching the next set of results from the Giphy API
 * using the same search term from the previous query.
 *
 * @param {MouseEvent} event - The 'click' MouseEvent triggered by clicking the 'Show more' button
 *
 */
async function handleShowMore(event) {
  // YOUR CODE HERE
  const results = await getGiphyApiResults(state.searchTerm) // await bc async function
  displayResults(results)
  // currentApiPage++
  state.apiPage += 1
}

window.onload = function () {
  // YOUR CODE HERE
  // fetch("http://api.giphy.com/v1/gifs/search?api_key=${apiKey}" + "&q=puppy" + "&rating=${g}" + "&limit=${limit}").then((response) => response.json()).then((data) => {
  //   // dont think variables are being picked up
	//   console.log(data)
  // });
  searchForm.addEventListener("submit", handleFormSubmit)
  // console.log(searchForm)
  // Add any event handlers here
  showMoreBtn.addEventListener("click", handleShowMore)
  console.log("hi")
}