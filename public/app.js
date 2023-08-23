document.addEventListener("DOMContentLoaded", () => {
  const routes = {
    "/": "home.html",
    "/about": "about.html",
    "/contact": "contact.html",
    404: "404.html",
  };

  function loadPage(url) {
    const templatePath = routes[url] || "404.html";
    fetch(`/templates/${templatePath}`)
      .then((response) => response.text())
      .then((content) => {
        document.getElementById("content").innerHTML = content;
        history.pushState(null, null, url);
        animatePage(); // Call the function to trigger animations
      })
      .catch((error) => {
        console.error("Error loading page:", error);
        document.getElementById("content").innerHTML = "Error loading page.";
      });
  }

  document.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      event.preventDefault();
      loadPage(event.target.getAttribute("href"));
    }
  });

  window.addEventListener("popstate", () => {
    loadPage(location.pathname);
  });

  // Function to trigger animations when content changes
  function animatePage() {
    // Your animation code here
  }
});
