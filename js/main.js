"use strict";
import skillbar from "./skillbar.js";

document.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    once: true,
  });
  skillbar();

  const nav = document.querySelector("#nav");
  const navBtn = document.querySelector("#nav-btn");
  const navBtnImg = document.querySelector("#nav-btn-img");

  //Hamburger menu
  navBtn.onclick = () => {
    if (nav.classList.toggle("open")) {
      navBtnImg.src = "img/icons/close.svg";
    } else {
      navBtnImg.src = "img/icons/open.svg";
    }
  };

  window.addEventListener("scroll", function () {
    const header = document.querySelector("#header");
    const hero = document.querySelector("#home");
    let triggerHeight = hero.offsetHeight - 170;

    if (window.scrollY > triggerHeight) {
      header.classList.add("header-sticky");
      goToTop.classList.add("reveal");
    } else {
      header.classList.remove("header-sticky");
      goToTop.classList.remove("reveal");
    }
  });

  let sections = document.querySelectorAll("section");
  let navLinks = document.querySelectorAll("header nav a");

  window.onscroll = () => {
    sections.forEach((sec) => {
      let top = window.scrollY;
      let offset = sec.offsetTop - 170;
      let height = sec.offsetHeight;
      let id = sec.getAttribute("id");

      if (top >= offset && top < offset + height) {
        navLinks.forEach((links) => {
          links.classList.remove("active");
          document
            .querySelector("header nav a[href*=" + id + "]")
            .classList.add("active");
        });
      }
    });
  };

  const projectLinks = document.querySelectorAll('.project-link');
  const sidebarOverlay = document.getElementById('project-sidebar-overlay');
  const sidebar = document.getElementById('project-sidebar');
  const sidebarCloseBtn = document.getElementById('sidebar-close-btn');

  const sidebarTitle = document.getElementById('sidebar-title');
  const sidebarVideo = document.getElementById('sidebar-video');
  const sidebarDesc = document.getElementById('sidebar-desc');
  const sidebarLearned = document.getElementById('sidebar-learned');
  const sidebarLinkContainer = document.getElementById('sidebar-link-container');
  const sidebarLink = document.getElementById('sidebar-link');

  function openSidebar(e) {
    e.preventDefault();
    const link = e.currentTarget;

    sidebarTitle.textContent = link.getAttribute('data-title');
    sidebarDesc.innerHTML = link.getAttribute('data-desc');
    sidebarLearned.innerHTML = link.getAttribute('data-learned');

    const videoSrc = link.getAttribute('data-video');
    if (videoSrc) {
      let embedUrl = videoSrc;
      // Convert standard youtube link to embed link for iframe
      const ytMatch = videoSrc.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
      if (ytMatch && ytMatch[1]) {
        embedUrl = `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&mute=1`;
      }

      sidebarVideo.src = embedUrl;
      sidebarVideo.style.display = 'block';
    } else {
      sidebarVideo.src = '';
      sidebarVideo.style.display = 'none';
    }

    const projectLink = link.getAttribute('data-link');
    const projectLinkText = link.getAttribute('data-link-text') || 'View Project';
    if (projectLink) {
      sidebarLink.href = projectLink;
      sidebarLink.textContent = projectLinkText;
      sidebarLinkContainer.style.display = 'block';
    } else {
      sidebarLinkContainer.style.display = 'none';
    }

    sidebarOverlay.classList.add('active');
    sidebar.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  function closeSidebar() {
    sidebarOverlay.classList.remove('active');
    sidebar.classList.remove('active');
    sidebarVideo.src = ''; // Clear source to stop YouTube playback
    document.body.style.overflow = '';
  }

  projectLinks.forEach(link => {
    link.addEventListener('click', openSidebar);
  });

  sidebarCloseBtn.addEventListener('click', closeSidebar);
  sidebarOverlay.addEventListener('click', closeSidebar);
});
