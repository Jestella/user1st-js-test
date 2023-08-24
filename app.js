document.addEventListener("DOMContentLoaded", () => {
  const routes = {
    // main nav
    "/": "public/pages/home.html",
    "/about": "public/pages/about.html",
    "/contact": "public/pages/contact.html",
    // sub nav
    "/home/page1": "public/pages/home_page1.html",
    "/home/page2": "public/pages/home_page2.html",
    404: "public/pages/404.html",
  };

  function navigateToPage(url) {
    const pagePath = routes[url] || 404;

    //fetch
    fetch(`/pages/${pagePath}`)
      .then((response) => response.text())
      .then((content) => {
        document.getElementById("content").innerHTML = content;
        history.pushState(null, null, url);
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

  window.addEventListener("popstate", () => {
    navigateToPage(location.pathname);
  });
});
