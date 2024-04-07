document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("github-form")
  const searchInput = document.getElementById("search")
  const userList = document.getElementById("user-list")
  const repos = document.getElementById("repos-list")

  form.addEventListener("submit", (e) => {
      e.preventDefault();
      userList.innerHTML = ""
      repos.innerHTML = ""

      fetch(`https://api.github.com/search/users?q=${e.target.search.value}`)
      .then(response => response.json()) 
      .then(usersData => usersData.items.forEach(renderUser))
  })
  function renderUser(userData){
      const name = document.createElement("li")
      name.textContent = userData.login;

      const avatar = document.createElement("img")
      avatar.src = userData.avatar_url;
      avatar.alt = `${userData.login} avatar image`

      avatar.addEventListener("click", (e) => handleClick(userData))
       
      const profileLink = document.createElement("a")
       profileLink.href = userData.html_url;
       profileLink.textContent = "GitHub Profile"

       userList.append(name, avatar, profileLink)
  }
  function handleClick(userData){
      fetch(`https://api.github.com/users/${userData.login}/repos`)
      .then (response = response.json())
      .then(userRepos => {
          userList.innerHTML =""
          renderUser(userData)
          userRepos.forEach(renderRepos)
      })
  }
  function renderRepos(user){
      const li = document.createElement("li")
      li.textContent = user.full_name
      repos.append(li)
  }
})