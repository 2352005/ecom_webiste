/**
 * VORTEX | Premium Gen-Z Fashion Interaction Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
    initScrollEffects();
    initNavbarEffect();
    initRevealAnimations();
    initShopLogic();
    initCollectionsLogic();
    initPageSpecifics();
    initCartLogic();
});

/**
 * Custom Cursor Implementation
 */
function initCustomCursor() {
    const cursor = document.getElementById('custom-cursor');
    const cursorGlow = document.getElementById('cursor-glow');
    
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        
        cursor.style.left = `${x}px`;
        cursor.style.top = `${y}px`;
        
        // Smoothly follow for glow
        cursorGlow.animate({
            left: `${x}px`,
            top: `${y}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Cursor scale on interactive elements
    const interactables = document.querySelectorAll('a, button, .product-card, .vibe-item');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(5)';
            cursor.style.mixBlendMode = 'difference';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.mixBlendMode = 'normal';
        });
    });
}

/**
 * Navbar scroll effect
 */
function initNavbarEffect() {
    const nav = document.getElementById('main-nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

/**
 * Intersection Observer for scroll reveals
 */
function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal-up');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // observer.unobserve(entry.target); // Optional: only animate once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => observer.observe(el));
}

/**
 * General scroll interactions
 */
function initScrollEffects() {
    const heroImg = document.querySelector('.hero-bg-img');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        // Parallax for hero image
        if (heroImg) {
            heroImg.style.transform = `scale(${1.05 + scrolled * 0.0002}) translateY(${scrolled * 0.1}px)`;
        }
    });
}

/**
 * Add to Cart Mock Interaction
 */
const cartBtns = document.querySelectorAll('.btn-quick-add');
const cartCount = document.querySelector('.cart-count');
let count = 0;

cartBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        count++;
        cartCount.textContent = count;
        
        // Simple feedback
        const originalText = btn.textContent;
        btn.textContent = 'Added +1';
        btn.style.background = '#39ff14';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '#fff';
        }, 1500);
    });
});

/**
 * Shop Page Specific Logic
 */
function initShopLogic() {
    const filterPills = document.querySelectorAll('.filter-pill');
    const searchInput = document.getElementById('shop-search');
    
    // Category selection
    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            
            // Mock filter effect
            const products = document.querySelectorAll('.product-card');
            products.forEach(p => {
                p.style.opacity = '0';
                p.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    p.style.opacity = '1';
                    p.style.transform = 'translateY(0)';
                }, 300);
            });
        });
    });

    // Search bar micro-interactions
    if (searchInput) {
        const placeholders = ["Search for oversized...", "Search for techwear...", "Search for sneakers...", "Search for vibes..."];
        let pIndex = 0;
        
        setInterval(() => {
            if (document.activeElement !== searchInput) {
                searchInput.setAttribute('placeholder', placeholders[pIndex]);
                pIndex = (pIndex + 1) % placeholders.length;
            }
        }, 3000);
    }
}

/**
 * Collections Page Specific Logic
 */
function initCollectionsLogic() {
    const sections = document.querySelectorAll('.section-reveal');
    
    // Section reveal observer
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.2 });
    
    sections.forEach(s => sectionObserver.observe(s));
    
    // Parallax effect for collection hero
    const campaignHero = document.querySelector('.campaign-hero');
    if (campaignHero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            campaignHero.style.backgroundPositionY = `${scrolled * 0.5}px`;
        });
    }

    // Horizontal scroll mouse wheel support (optional but premium)
    const scrollContainers = document.querySelectorAll('.horizontal-scroll-container');
    scrollContainers.forEach(container => {
        container.addEventListener('wheel', (e) => {
            if (e.deltaY !== 0) {
                e.preventDefault();
                container.scrollLeft += e.deltaY * 2;
            }
        }, { passive: false });
    });
}

/**
 * Page Specific Interactions (About/Community)
 */
function initPageSpecifics() {
    // Parallax for About Hero
    const aboutHero = document.querySelector('.about-hero');
    if (aboutHero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            aboutHero.style.backgroundPositionY = `${scrolled * 0.4}px`;
        });
    }

    // Community Card Hover Effects (magnetic feeling)
    const commCards = document.querySelectorAll('.community-card');
    commCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
        });
    });
}

/**
 * Cart Logic
 */
function initCartLogic() {
    const cartItems = document.querySelectorAll('.cart-item');
    if (cartItems.length === 0) return;

    cartItems.forEach(item => {
        const minusBtn = item.querySelector('.qty-minus');
        const plusBtn = item.querySelector('.qty-plus');
        const qtyDisplay = item.querySelector('.qty-value');
        const removeBtn = item.querySelector('.remove-item');

        if (plusBtn) {
            plusBtn.addEventListener('click', () => {
                let qty = parseInt(qtyDisplay.textContent);
                qtyDisplay.textContent = ++qty;
                updateTotals();
            });
        }

        if (minusBtn) {
            minusBtn.addEventListener('click', () => {
                let qty = parseInt(qtyDisplay.textContent);
                if (qty > 1) {
                    qtyDisplay.textContent = --qty;
                    updateTotals();
                }
            });
        }

        if (removeBtn) {
            removeBtn.addEventListener('click', () => {
                item.classList.add('removing');
                setTimeout(() => {
                    item.remove();
                    updateTotals();
                    checkEmptyCart();
                }, 500);
            });
        }
    });

    function updateTotals() {
        let subtotal = 0;
        const items = document.querySelectorAll('.cart-item');
        items.forEach(item => {
            const price = parseFloat(item.querySelector('.cart-item-price').textContent.replace('₹', ''));
            const qty = parseInt(item.querySelector('.qty-value').textContent);
            subtotal += price * qty;
        });

        const subtotalDisplay = document.querySelector('.subtotal-val');
        const totalDisplay = document.querySelector('.total-val');
        
        if (subtotalDisplay) subtotalDisplay.textContent = `₹${subtotal.toFixed(2)}`;
        if (totalDisplay) {
            const shipping = 10;
            totalDisplay.textContent = `₹${(subtotal + shipping).toFixed(2)}`;
        }
    }

    function checkEmptyCart() {
        const items = document.querySelectorAll('.cart-item');
        if (items.length === 0) {
            const cartContainer = document.querySelector('.cart-layout');
            if (cartContainer) {
                cartContainer.innerHTML = `
                    <div class="empty-cart-state reveal-up">
                        <div class="empty-icon">🛒</div>
                        <h2>Your cart is empty.</h2>
                        <p>Explore our latest drops to find your vibe.</p>
                        <a href="shop.html" class="btn btn-primary" style="margin-top: 30px;">Shop Now</a>
                    </div>
                `;
            }
        }
    }
}
