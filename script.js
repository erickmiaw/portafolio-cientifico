document.addEventListener("DOMContentLoaded", () => {
    // 1. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Intersection Observer for Fade-In Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => observer.observe(el));

    // 3. Interactive Article Modal Logic
    const modal = document.getElementById('articleModal');
    const closeModalBtn = document.querySelector('.close-modal');
    
    // Modal elements to populate
    const modalCategory = document.getElementById('modalCategory');
    const modalTitle = document.getElementById('modalTitle');
    const modalJournal = document.getElementById('modalJournal');
    const modalBody = document.getElementById('modalBody');
    const modalLink = document.getElementById('modalLink');

    const cards = document.querySelectorAll('.interactive-card');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            // Extract data from the card HTML
            const category = card.querySelector('.card-category').innerText;
            const title = card.querySelector('.card-title').innerText;
            const journal = card.querySelector('.card-journal').innerText;
            const bodyHtml = card.querySelector('.card-body').innerHTML;
            const pdfFile = card.getAttribute('data-file');

            // Populate modal
            modalCategory.innerText = category;
            modalTitle.innerText = title;
            modalJournal.innerText = journal;
            modalBody.innerHTML = bodyHtml;
            modalLink.href = pdfFile;

            // Show modal
            modal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    const closeModal = () => {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto'; // Restore scrolling
        // Delay clearing content so it doesn't blink before fading out
        setTimeout(() => {
            modalTitle.innerText = '';
            modalBody.innerHTML = '';
        }, 400);
    };

    closeModalBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeModal();
    });

    // Close on outside click
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

});
