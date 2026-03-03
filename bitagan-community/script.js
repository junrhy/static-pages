// Mobile Menu Toggle - Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') &&
                !navMenu.contains(e.target) &&
                !menuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }

    lastScroll = currentScroll;
});


// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.activity-card, .event-card, .stat-card, .contact-item');

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Update copyright year dynamically
    const copyrightYear = document.getElementById('copyright-year');
    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }
});

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// --- Products API Integration ---
// Replace this URL with your production backend API URL when deploying
const API_BASE_URL = 'https://sakto-app-backend.onrender.com/api';
const API_KEY = '4|d5d5bsHmujUgRsu1Y3iwfZFQBQDb8croK66RkkuR69f0a8b5';
const CLIENT_IDENTIFIER = 'b6ac6642-4a05-4ede-9423-54adb9a0b9f1';

async function fetchProducts() {
    const container = document.getElementById('products-container');
    const loadingEl = document.getElementById('products-loading');
    const errorEl = document.getElementById('products-error');

    if (!container || !loadingEl || !errorEl) return;

    try {
        const response = await fetch(`${API_BASE_URL}/products?client_identifier=${CLIENT_IDENTIFIER}`, {
            method: 'GET',
            headers: {
                'x-api-key': API_KEY,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const products = await response.json();

        loadingEl.style.display = 'none';

        if (products.length === 0) {
            container.innerHTML = '<div class="no-products">No products available at the moment.</div>';
            return;
        }

        // Generate HTML for each product
        const productsHTML = products.map(product => {
            // Use thumbnail, first image, or a placeholder
            let imageUrl = 'https://via.placeholder.com/300x200?text=No+Image';
            if (product.thumbnail_url) {
                // If it's a relative path starting with /, prepend the backend URL (assuming it serves the images)
                // Otherwise if it's already a full URL or base64, use it directly
                imageUrl = product.thumbnail_url.startsWith('/')
                    ? `http://localhost:8001${product.thumbnail_url}`
                    : product.thumbnail_url;
            } else if (product.images && product.images.length > 0 && product.images[0].url) {
                imageUrl = product.images[0].url.startsWith('/')
                    ? `http://localhost:8001${product.images[0].url}`
                    : product.images[0].url;
            }

            const formattedPrice = new Intl.NumberFormat('en-PH', {
                style: 'currency',
                currency: 'PHP'
            }).format(product.price);

            const statusClass = product.stock_quantity > 0 ? 'in-stock' : 'out-of-stock';
            const statusText = product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock';

            return `
                <div class="product-card">
                    <div class="product-image">
                        <img src="${imageUrl}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x200?text=Image+Unavailable'">
                        <div class="product-status ${statusClass}">${statusText}</div>
                    </div>
                    <div class="product-content">
                        <span class="product-category">${product.category || 'General'}</span>
                        <h3 class="product-name">${product.name}</h3>
                        <p class="product-description">${product.description ? product.description.substring(0, 100) + '...' : ''}</p>
                        <div class="product-footer">
                            <span class="product-price">${formattedPrice}</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = productsHTML;

    } catch (error) {
        console.error('Error fetching products:', error);
        loadingEl.style.display = 'none';
        errorEl.style.display = 'block';
    }
}

// Call fetchProducts when DOM is loaded
document.addEventListener('DOMContentLoaded', fetchProducts);
