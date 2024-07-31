"use strict";

import getCurrentTime from "./clock";
import getDay from "./day";
import getSearchURL from "./search";
import "./app.css";

(function () {
  function setTime() {
    const time = getCurrentTime();
    console.log(time);

    document.getElementById("clock").innerHTML = time;
  }

  function setDay() {
    const day = getDay();

    document.getElementById("day").innerHTML = day;
  }

  // 添加搜索
  const searchUrl = getSearchURL();
  function setSearch() {
    const content = document.getElementById("search").value;
    if (!content) return;
    return searchUrl + content;
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      window.location.href = setSearch();
    }
  });

  function setupDashboard() {
    setDay();
    setTime();
    setInterval(setTime, 1000);
  }

  setupDashboard();
})();
