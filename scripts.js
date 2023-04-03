/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"umBhliLBjUvZgVyM","label":"🌀","bookmarks":[{"id":"fUWnRxydXGXldQoa","label":"reddit","url":"https://www.reddit.com/"},{"id":"XO6a0LZZI9lHlr8J","label":"Chat gpt","url":"https://openai.com/blog/chatgpt"},{"id":"3hZwKb1l0ygK84mT","label":"pexels","url":"https://www.pexels.com/fr-fr/"},{"id":"6OzgbS22tuYg1MfY","label":"translator","url":"https://www.deepl.com/fr/translator"}]},{"id":"3BUQaoQXhGbVxVTg","label":"🌸","bookmarks":[{"id":"OR5jwY2uzlKOrzKA","label":"youtube","url":"https://www.youtube.com/"},{"id":"ocNfTHZT1uUvMedu","label":"twitch","url":"https://www.twitch.tv"},{"id":"DC8AO09Xll7pzfap","label":"soundcloud :/","url":"https://soundcloud.com/"}]},{"id":"HbJviraDwZXaRrGY","label":"☘️","bookmarks":[{"id":"qPgpChzaiy47f9Od","label":"twitter","url":"https://twitter.com/home"},{"id":"9GjEln9TbIam0v7L","label":"instagram","url":"https://www.instagram.com/"},{"id":"FlbkjMSnfzpT5itQ","label":"tiktok","url":"https://www.tiktok.com/fr/"},{"id":"J1QmQnCwiQDDVZIH","label":"discord","url":"https://discord.com/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
