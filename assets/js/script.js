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

    // Logo hover interaction (main page only)
    const logo = document.getElementById('logo');
    if (logo) {
        const infoWindows = document.querySelectorAll('.info-window');
        let floatingWindows = [];
        let logoSection = logo.closest('.logo-section');
        let hoveringLogoOrWindow = false;
        let hideTimeout;

        function showProjects() {
            infoWindows.forEach(win => win.classList.add('logo-blur'));
            document.querySelector('.skills-window')?.classList.add('logo-blur');
            document.querySelector('.contact-window')?.classList.add('logo-blur');

            if (floatingWindows.length === 0) {
                const rect = logo.getBoundingClientRect();
                const parentRect = logoSection.getBoundingClientRect();
                const centerX = rect.left - parentRect.left + rect.width / 2;
                const centerY = rect.top - parentRect.top + rect.height / 2;
                const radius = rect.width * 1.5;

                const projects = [
                    "Project 1", "Project 2", "Project 3",
                    "Project 4", "Project 5", "Project 6"
                ];
                for (let i = 0; i < projects.length; i++) {
                    const angle = i * 2 * Math.PI / projects.length;
                    const win = document.createElement('div');
                    win.className = 'floating-window';
                    win.textContent = projects[i];
                    win.style.left = `${centerX + radius * Math.cos(angle) - 100}px`;
                    win.style.top = `${centerY + radius * Math.sin(angle) - 40}px`;
                    win.classList.add('floating-show');
                    win.onclick = () => {
                        window.location.href = `projects/project${i + 1}.html`;
                    };

                    // Add mouse enter/leave events:
                    win.addEventListener('mouseenter', () => {
                        hoveringLogoOrWindow = true;
                        clearTimeout(hideTimeout);
                    });
                    win.addEventListener('mouseleave', () => {
                        hoveringLogoOrWindow = false;
                        hideWithDelay();
                    });

                    logoSection.appendChild(win);
                    floatingWindows.push(win);
                }
            } else {
                floatingWindows.forEach(win => win.classList.add('floating-show'));
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
            }, 100); // Short delay to prevent flicker
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
