document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       MOBILE MENU
    ========================================= */

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", function () {
            navMenu.classList.toggle("active");
            menuToggle.classList.toggle("active");
        });

        // Tutup menu setelah klik link
        const navLinks = navMenu.querySelectorAll("a");

        navLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                navMenu.classList.remove("active");
                menuToggle.classList.remove("active");
            });
        });
    }


    /* =========================================
       SMOOTH SCROLL
    ========================================= */

    const scrollLinks = document.querySelectorAll('a[href^="#"]');

    scrollLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    /* =========================================
       ACTIVE NAVIGATION
    ========================================= */

    const sections = document.querySelectorAll("section[id]");
    const navigationLinks = document.querySelectorAll(
        ".nav-menu a[href^='#'], .floating-nav a[href^='#']"
    );

    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach(function (section) {

            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop - 250) {
                currentSection = section.getAttribute("id");
            }
        });

        navigationLinks.forEach(function (link) {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === "#" + currentSection) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", updateActiveNavigation);

    updateActiveNavigation();


    /* =========================================
       FLOATING NAVIGATION
    ========================================= */

    const floatingNav = document.querySelector(".floating-nav");

    function handleFloatingNav() {

        if (!floatingNav) {
            return;
        }

        if (window.scrollY > 250) {
            floatingNav.classList.add("show");
        } else {
            floatingNav.classList.remove("show");
        }
    }

    window.addEventListener("scroll", handleFloatingNav);

    handleFloatingNav();


    /* =========================================
       SCROLL TOP BUTTON
    ========================================= */

    const scrollTop = document.querySelector(".scroll-top");

    if (scrollTop) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 500) {
                scrollTop.classList.add("show");
            } else {
                scrollTop.classList.remove("show");
            }

        });

        scrollTop.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });
    }


    /* =========================================
       NAVBAR BACKGROUND
    ========================================= */

    const navbar = document.querySelector(".navbar");

    if (navbar) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 30) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }

        });
    }


    /* =========================================
       REVEAL ANIMATION
    ========================================= */

    const revealElements = document.querySelectorAll(
        ".reveal, .project-card, .skill-card, .experience-card, .certificate-card"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(function (element) {
            observer.observe(element);
        });
    } else {

        revealElements.forEach(function (element) {
            element.classList.add("visible");
        });

    }


    /* =========================================
       CONTACT FORM
    ========================================= */

    const contactForm = document.querySelector(".contact-form");

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const nameInput = contactForm.querySelector(
                'input[name="name"]'
            );

            const emailInput = contactForm.querySelector(
                'input[name="email"]'
            );

            const messageInput = contactForm.querySelector(
                'textarea[name="message"]'
            );

            const name = nameInput ? nameInput.value.trim() : "";
            const email = emailInput ? emailInput.value.trim() : "";
            const message = messageInput ? messageInput.value.trim() : "";

            if (!name || !email || !message) {
                alert("Silakan lengkapi semua kolom terlebih dahulu.");
                return;
            }

            const subject = encodeURIComponent(
                "Pesan dari Portfolio Intan Setia Asih"
            );

            const body = encodeURIComponent(
                "Halo Intan,\n\n" +
                "Nama: " + name + "\n" +
                "Email: " + email + "\n\n" +
                "Pesan:\n" +
                message
            );

            window.location.href =
                "mailto:emailkamu@gmail.com" +
                "?subject=" + subject +
                "&body=" + body;

            contactForm.reset();
        });
    }


    /* =========================================
       CURRENT YEAR
    ========================================= */

    const currentYear = document.querySelector(".current-year");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* =========================================
       CERTIFICATE FILTER
    ========================================= */

    const certificateButtons = document.querySelectorAll(
        ".certificate-filter button"
    );

    const certificateItems = document.querySelectorAll(
        ".certificate-item"
    );

    certificateButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            certificateButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            this.classList.add("active");

            const filter = this.getAttribute("data-filter");

            certificateItems.forEach(function (item) {

                const category = item.getAttribute("data-category");

                if (filter === "all" || category === filter) {
                    item.style.display = "";
                } else {
                    item.style.display = "none";
                }

            });

        });

    });


    /* =========================================
       PROJECT HOVER / IMAGE
    ========================================= */

    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach(function (card) {

        card.addEventListener("mouseenter", function () {
            this.classList.add("hovered");
        });

        card.addEventListener("mouseleave", function () {
            this.classList.remove("hovered");
        });

    });


    /* =========================================
       IMAGE FALLBACK
    ========================================= */

    const images = document.querySelectorAll("img");

    images.forEach(function (image) {

        image.addEventListener("error", function () {

            this.classList.add("image-error");

        });

    });

});