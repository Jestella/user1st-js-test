document.addEventListener("DOMContentLoaded", () => {
  const routes = {
    // main nav
    "/": "home.html",
    "/about": "about.html",
    "/contact": "contact.html",
    // sub nav
    "/home/page1": "home_page1.html",
    "/home/page2": "home_page2.html",
    "/404": "404.html",
  };

  function navigateToPage(url, pushState = true) {
    const pagePath = routes[url] || routes["/404"];

    //fetch
    fetch(`/pages/${pagePath}`)
      .then((response) => response.text())
      .then((content) => {
        console.log("Fetched content for:", url);

        document.getElementById("content").innerHTML = content;
        if (pushState) {
          history.pushState({ url }, null, url);
        }
      })
      .catch((error) => {
        console.error("Error loading page:", error);
        document.getElementById("content").innerHTML = "Error loading page.";
      });

    // XMLHttpRequest

    // const xhr = new XMLHttpRequest();
    // xhr.open("GET", `/pages/${pagePath}`, true);
    // xhr.onreadystatechange = function () {
    //   if (xhr.readyState === 4) {
    //     if (xhr.status === 200) {
    //       document.getElementById("content").innerHTML = xhr.responseText;
    //       history.pushState(null, null, url);
    //     } else {
    //       console.error("Error loading page:", xhr.statusText);
    //       document.getElementById("content").innerHTML = "Error loading page.";
    //     }
    //   }
    // };
    // xhr.send();
  }

  document.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      e.preventDefault();
      navigateToPage(e.target.getAttribute("href"));
    }
  });

  window.addEventListener("popstate", (event) => {
    if (event.state && event.state.url) {
      navigateToPage(event.state.url, false);
    }
  });

  const SCOPE = "";

  function removeScope() {
    return window.location.pathname.substring(SCOPE.length);
  }

  navigateToPage(removeScope, false);
});
