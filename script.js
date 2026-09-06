/* ============================================================
   Vedha Varshini Wellness — Main Script
   Handles: Mobile Nav, Newsletter Form
   WhatsApp: All buttons use direct wa.me href links (no JS needed)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navbar    = document.querySelector('.navbar');

    if (mobileBtn && navbar) {
        mobileBtn.addEventListener('click', () => {
            navbar.classList.toggle('nav-mobile-active');
        });

        // Close mobile menu when any nav link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('nav-mobile-active');
            });
        });
    }

    // --- Navbar shadow on scroll ---
    window.addEventListener('scroll', () => {
        if (!navbar) return;
        navbar.style.boxShadow = window.scrollY > 50
            ? '0 2px 20px rgba(0,0,0,0.1)'
            : '';
    });

    // --- Newsletter Form ---
    const form   = document.getElementById('newsletterForm');
    const thanks = document.getElementById('newsletterThanks');

    if (form && thanks) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            form.style.display = 'none';
            thanks.style.display = 'block';
        });
    }

});

    // --- Scroll Animations ---
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    document.querySelectorAll(".animate-on-scroll").forEach(el => observer.observe(el));

    // --- Lead Capture Modal ---
    const modal = document.getElementById("leadModal");
    if (modal) {
        // Show after 5 seconds
        setTimeout(() => {
            if (!sessionStorage.getItem("modalShown")) {
                modal.classList.add("active");
                sessionStorage.setItem("modalShown", "true");
            }
        }, 5000);

        document.getElementById("closeModal").addEventListener("click", () => {
            modal.classList.remove("active");
        });

        // Lead Capture Form Submission
        const leadForm = document.getElementById("leadCaptureForm");
        if (leadForm) {
            leadForm.addEventListener("submit", async (e) => {
                e.preventDefault();
                const btn = document.getElementById("leadSubmitBtn");
                const mobile = document.getElementById("leadMobile").value;
                const successMsg = document.getElementById("leadSuccessMsg");
                const errorMsg = document.getElementById("leadErrorMsg");
                const desc = document.getElementById("leadDesc");

                btn.disabled = true;
                btn.innerText = "Sending...";
                errorMsg.style.display = "none";

                try {
                    const response = await fetch("send_lead.php", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ mobile: mobile })
                    });

                    if (response.ok) {
                        leadForm.style.display = "none";
                        desc.style.display = "none";
                        successMsg.style.display = "block";
                        setTimeout(() => {
                            modal.classList.remove("active");
                        }, 3000);
                    } else {
                        throw new Error("Failed to send");
                    }
                } catch (err) {
                    errorMsg.style.display = "block";
                    btn.disabled = false;
                    btn.innerText = "Send it to me";
                }
            });
        }
    }

    // --- Quiz Logic ---
    window.nextQuizStep = function(stepId) {
        document.querySelectorAll(".quiz-step").forEach(step => step.classList.remove("active"));
        document.getElementById(stepId).classList.add("active");
    };

