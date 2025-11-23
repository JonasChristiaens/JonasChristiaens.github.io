document.addEventListener('DOMContentLoaded', function () {
    // Phase in on scroll
    function revealOnScroll() {
        document.querySelectorAll('.info-grid, .skills-window, .contact-window').forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                section.classList.add('show');
            } else {
                section.classList.remove('show');
            }
        });
    }
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // Logo hover interaction
    const logo = document.getElementById('logo');
    if (logo) {
        const infoWindows = document.querySelectorAll('.info-window');
        let floatingWindows = [];
        const logoSection = logo.closest('.logo-section');
        let hoveringLogoOrWindow = false;
        let hideTimeout;

        function showProjects() {
            infoWindows.forEach(win => win.classList.add('logo-blur'));
            document.querySelector('.skills-window')?.classList.add('logo-blur');
            document.querySelector('.contact-window')?.classList.add('logo-blur');

            const rect = logo.getBoundingClientRect();
            const parentRect = logoSection.getBoundingClientRect();
            const centerX = rect.left - parentRect.left + rect.width / 2;
            const centerY = rect.top - parentRect.top + rect.height / 2;

            const panelWidth = 220;
            const panelHeight = 90;
            const gap = 20;
            const projects = [
                {title: "Vulkan Scene Renderer", url: "projects/VulkanSceneRenderer.html", gif: "assets/VideosAndGifs/VulkanSceneRenderer.gif", snippet: "Lorem Ipsum"},
                {title: "Project 2", url: "#", gif: "", snippet: "Lorem Ipsum"},
                {title: "Project 3", url: "#", gif: "", snippet: "Lorem Ipsum"},
                {title: "Project 4", url: "#", gif: "", snippet: "Lorem Ipsum"},
                {title: "Project 5", url: "#", gif: "", snippet: "Lorem Ipsum"},
                {title: "Project 6", url: "#", gif: "", snippet: "Lorem Ipsum"}
            ];

            const isNarrow = window.innerWidth < 900;

            // Remove any old floating panels
            floatingWindows.forEach(win => win.remove());
            floatingWindows = [];

            if (!isNarrow) {
                // Desktop: left and right columns
                for (let i = 0; i < 6; i++) {
                    const win = document.createElement("div");
                    win.className = "floating-window";
                    win.innerHTML = `
                        <div class="floating-window-content">
                            <img class="floating-window-thumb" src="${projects[i].gif}" alt="${projects[i].title}">
                            <div class="floating-window-text">
                                <div class="floating-window-title">${projects[i].title}</div>
                                <div class="floating-window-snippet">${projects[i].snippet}</div>
                            </div>
                        </div>
                    `;
                    let left, top;
                    if (i < 3) {
                        // Right column
                        left = centerX + rect.width * 0.8;
                        top = centerY + (i - 1) * (panelHeight + gap);
                    } else {
                        // Left column
                        left = centerX - rect.width * 0.8 - panelWidth;
                        top = centerY + (i - 4) * (panelHeight + gap);
                    }
                    win.style.left = left + "px";
                    win.style.top = top + "px";
                    win.classList.add("floating-show");
                    win.onclick = () => { window.location.href = projects[i].url; };
                    win.addEventListener("mouseenter", () => {
                        hoveringLogoOrWindow = true; clearTimeout(hideTimeout);
                    });
                    win.addEventListener("mouseleave", () => {
                        hoveringLogoOrWindow = false; hideWithDelay();
                    });
                    logoSection.appendChild(win);
                    floatingWindows.push(win);
                }
            } else {
                // Mobile: three above, three below
                for (let i = 0; i < 6; i++) {
                    const win = document.createElement("div");
                    win.className = "floating-window";
                    win.innerHTML = `
                        <div class="floating-window-content">
                            <div class="floating-window-text">
                                <div class="floating-window-title">${projects[i].title}</div>
                                <div class="floating-window-snippet">${projects[i].snippet}</div>
                            </div>
                        </div>
                    `;
                    let left, top;
                    if (i < 3) {
                        // Top row
                        left = centerX - panelWidth * 1.5 + i * (panelWidth + gap);
                        top = centerY - rect.height * 0.8 - panelHeight;
                    } else {
                        // Bottom row
                        left = centerX - panelWidth * 1.5 + (i - 3) * (panelWidth + gap);
                        top = centerY + rect.height * 0.8;
                    }
                    win.style.left = left + "px";
                    win.style.top = top + "px";
                    win.classList.add("floating-show");
                    win.onclick = () => { window.location.href = projects[i].url; };
                    win.addEventListener("mouseenter", () => {
                        hoveringLogoOrWindow = true; clearTimeout(hideTimeout);
                    });
                    win.addEventListener("mouseleave", () => {
                        hoveringLogoOrWindow = false; hideWithDelay();
                    });
                    logoSection.appendChild(win);
                    floatingWindows.push(win);
                }
            }
        }



        function hideProjects() {
            infoWindows.forEach(win => win.classList.remove('logo-blur'));
            document.querySelector('.skills-window')?.classList.remove('logo-blur');
            document.querySelector('.contact-window')?.classList.remove('logo-blur');
            floatingWindows.forEach(win => win.classList.remove('floating-show'));
        }

        function hideWithDelay() {
            hideTimeout = setTimeout(() => {
                if (!hoveringLogoOrWindow) hideProjects();
            }, 120);
        }

        logo.addEventListener('mouseenter', () => {
            hoveringLogoOrWindow = true;
            clearTimeout(hideTimeout);
            showProjects();
        });
        logo.addEventListener('mouseleave', () => {
            hoveringLogoOrWindow = false;
            hideWithDelay();
        });
    }
});
