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
      let isSearch = setSearch()
      if (!isSearch) return ;
      window.location.href = isSearch;
    }
  });

  // -----------------------便签----------------------
  // 点击右键创建便签------
  document.addEventListener("DOMContentLoaded", function () {
    var container = document.getElementById("container");

    container.addEventListener("contextmenu", function (e) {
      e.preventDefault(); // 阻止默认右键菜单

      var newDiv = document.createElement("div");
      newDiv.className = "note";
      newDiv.style.left = e.pageX - 100 + "px"; // 中心位置
      newDiv.style.top = e.pageY - 75 + "px"; // 中心位置
      container.appendChild(newDiv);

      // 添加标题栏作为拖拽区域
      var titleBar = document.createElement("div");
      titleBar.className = "title-bar";
      titleBar.textContent = "便签(按我拖拽，双击关闭)";
      newDiv.appendChild(titleBar);
      
      // 添加内容输入区域
      var content = document.createElement("textarea");
      content.className = "note-content";
      newDiv.appendChild(content);

      // 添加右下角缩放控制点
      var resizeHandleBR = document.createElement("div");
      resizeHandleBR.className = "resize-handle br";
      newDiv.appendChild(resizeHandleBR);

      // 拖拽功能实现
      titleBar.addEventListener("mousedown", function (e) {
        var offsetX = e.clientX - newDiv.getBoundingClientRect().left;
        var offsetY = e.clientY - newDiv.getBoundingClientRect().top;

        function moveDiv(event) {
          newDiv.style.left = event.clientX - offsetX + "px";
          newDiv.style.top = event.clientY - offsetY + "px";
        }

        document.addEventListener("mousemove", moveDiv);

        document.addEventListener(
          "mouseup",
          function () {
            document.removeEventListener("mousemove", moveDiv);
          },
          { once: true }
        );
      });

      // 缩放功能实现
      resizeHandleBR.addEventListener("mousedown", function (e) {
        e.stopPropagation(); // 防止与拖拽冲突
        var startX = e.clientX;
        var startY = e.clientY;
        var startWidth = parseInt(
          document.defaultView.getComputedStyle(newDiv).width,
          10
        );
        var startHeight = parseInt(
          document.defaultView.getComputedStyle(newDiv).height,
          10
        );

        function resizeDiv(event) {
          var newWidth = startWidth + (event.clientX - startX);
          var newHeight = startHeight + (event.clientY - startY);
          newDiv.style.width = newWidth + "px";
          newDiv.style.height = newHeight + "px";
        }

        document.addEventListener("mousemove", resizeDiv);

        document.addEventListener(
          "mouseup",
          function () {
            document.removeEventListener("mousemove", resizeDiv);
          },
          { once: true }
        );
      });

      // 双击移除功能
      newDiv.addEventListener("dblclick", function () {
        container.removeChild(newDiv);
      });
    });
  });

  function setupDashboard() {
    setDay();
    setTime();
    setInterval(setTime, 1000);
  }

  setupDashboard();
})();
