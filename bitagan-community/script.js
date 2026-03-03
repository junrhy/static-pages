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
            let imageUrl = 'https://placehold.co/300x200?text=No+Image';
            if (product.thumbnail_url) {
                // If it's a relative path starting with /, prepend the backend URL (assuming it serves the images)
                // Otherwise if it's already a full URL or base64, use it directly
                imageUrl = product.thumbnail_url.startsWith('/')
                    ? `http://localhost:8001${product.thumbnail_url}`
                    : product.thumbnail_url;
            } else if (product.images && product.images.length > 0 && (product.images[0].url || product.images[0].image_url)) {
                let imgField = product.images[0].image_url || product.images[0].url;
                imageUrl = imgField.startsWith('/')
                    ? `http://localhost:8001${imgField}`
                    : imgField;
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
                        <img src="${imageUrl}" alt="${product.name}" onerror="this.src='https://placehold.co/300x200?text=Image+Unavailable'">
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

async function fetchEvents() {
    const container = document.getElementById('events-container');
    const loadingEl = document.getElementById('events-loading');
    const errorEl = document.getElementById('events-error');

    if (!container || !loadingEl || !errorEl) return;

    try {
        const response = await fetch(`${API_BASE_URL}/events/upcoming?client_identifier=${CLIENT_IDENTIFIER}`, {
            method: 'GET',
            headers: {
                'x-api-key': API_KEY,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const eventsData = await response.json();
        const events = eventsData.data || [];

        loadingEl.style.display = 'none';

        if (events.length === 0) {
            container.innerHTML = '<div class="no-products">No upcoming events at the moment.</div>';
            return;
        }

        // Generate HTML for each event
        const eventsHTML = events.map(event => {
            const startDate = new Date(event.start_date);
            const endDate = new Date(event.end_date);

            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const month = monthNames[startDate.getMonth()];
            const day = startDate.getDate();

            const formatTime = (date) => date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
            const timeString = `${formatTime(startDate)} - ${formatTime(endDate)}`;

            // Use specific image if available, else a nice default family picnic image
            let imageUrl = event.image_url || event.image || 'https://images.unsplash.com/photo-1528607929212-2636ec44253e?w=400&q=80';
            if (imageUrl.startsWith('/')) {
                imageUrl = 'https://sakto-app-backend.onrender.com' + imageUrl;
            }

            return `
                <div class="event-card">
                    <div class="event-image">
                        <img src="${imageUrl}" alt="${event.title}">
                    </div>
                    <div class="event-date">
                        <span class="date-day">${day}</span>
                        <span class="date-month">${month}</span>
                    </div>
                    <div class="event-details">
                        <h3>${event.title}</h3>
                        <p class="event-time">📍 ${event.location || 'TBA'} | ${timeString}</p>
                        <p class="event-description">${event.description ? event.description.replace(/\\n/g, '<br>') : ''}</p>
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = eventsHTML;

    } catch (error) {
        console.error('Error fetching events:', error);
        loadingEl.style.display = 'none';
        errorEl.style.display = 'block';
    }
}

async function fetchNews() {
    const container = document.getElementById('news-container');
    const loadingEl = document.getElementById('news-loading');
    const errorEl = document.getElementById('news-error');

    if (!container || !loadingEl || !errorEl) return;

    try {
        const response = await fetch(`${API_BASE_URL}/content-creator?client_identifier=${CLIENT_IDENTIFIER}`, {
            method: 'GET',
            headers: {
                'x-api-key': API_KEY,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const newsData = await response.json();
        const newsList = newsData.data || [];

        loadingEl.style.display = 'none';

        if (newsList.length === 0) {
            container.innerHTML = '<div class="no-products">No news available at the moment.</div>';
            return;
        }

        // Generate HTML for each news item
        const newsHTML = newsList.map(news => {
            const publishDate = new Date(news.published_at || news.created_at);
            const dateString = publishDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

            // Use featured image or a placeholder
            let imageUrl = news.featured_image || 'https://placehold.co/400x250?text=News';

            // Generate an excerpt from content if excerpt is null
            let itemExcerpt = news.excerpt;
            if (!itemExcerpt && news.content) {
                // Strip URLs and take first 100 chars
                itemExcerpt = news.content.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '').substring(0, 100) + '...';
            }

            return `
                <div class="news-card">
                    <div class="news-image">
                        <img src="${imageUrl}" alt="${news.title}" onerror="this.src='https://placehold.co/400x250?text=Image+Unavailable'">
                    </div>
                    <div class="news-content">
                        <span class="news-date">${dateString}</span>
                        <h3 class="news-title">${news.title}</h3>
                        <p class="news-excerpt">${itemExcerpt || ''}</p>
                        ${news.content.includes('http') ? `<a href="${news.content.match(/(?:https?|ftp):\/\/[\n\S]+/)[0]}" target="_blank" class="btn btn-primary btn-sm" style="margin-top: 15px; padding: 8px 15px; font-size: 0.9rem;">Read More</a>` : ''}
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = newsHTML;

    } catch (error) {
        console.error('Error fetching news:', error);
        loadingEl.style.display = 'none';
        errorEl.style.display = 'block';
    }
}

// Call fetch functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    fetchEvents();
    fetchNews();
});
