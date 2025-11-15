// Tema yönetimi
(function () {
    const root = document.documentElement;
    const toggleBtn = document.getElementById("theme-toggle");

    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "light" || storedTheme === "dark") {
        root.setAttribute("data-theme", storedTheme);
    } else {
        // Sistem temasına göre varsayılan
        const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
        root.setAttribute("data-theme", prefersLight ? "light" : "dark");
    }

    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            const current = root.getAttribute("data-theme") || "dark";
            const next = current === "dark" ? "light" : "dark";
            root.setAttribute("data-theme", next);
            localStorage.setItem("theme", next);
        });
    }
})();

// Mobil menü
(function () {
    const toggle = document.getElementById("mobile-menu-toggle");
    const mobileNav = document.getElementById("mobile-nav");

    if (!toggle || !mobileNav) return;

    toggle.addEventListener("click", () => {
        const isOpen = mobileNav.style.display === "flex";
        mobileNav.style.display = isOpen ? "none" : "flex";
    });

    mobileNav.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", () => {
            mobileNav.style.display = "none";
        });
    });
})();

// Scroll reveal
(function () {
    const reveals = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
        reveals.forEach((el) => el.classList.add("visible"));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    reveals.forEach((el) => observer.observe(el));
})();

// Proje filtreleme
(function () {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    if (!filterButtons.length || !projectCards.length) return;

    filterButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const filter = btn.getAttribute("data-filter");

            filterButtons.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            projectCards.forEach((card) => {
                const category = card.getAttribute("data-category");
                const shouldShow = filter === "all" || category === filter;
                card.style.display = shouldShow ? "block" : "none";
            });
        });
    });
})();

// İletişim formu (dummy)
(function () {
    const form = document.getElementById("contact-form");
    const statusEl = document.getElementById("form-status");

    if (!form || !statusEl) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const name = formData.get("name");
        const subject = formData.get("subject");

        // Buraya gerçek backend entegrasyonu (fetch) ekleyebilirsin.
        statusEl.textContent = `Teşekkürler ${name}, mesajın (“${subject}”) alındı. En kısa sürede dönüş yapacağım.`;

        form.reset();
    });
})();

// Yıl
(function () {
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
})();
