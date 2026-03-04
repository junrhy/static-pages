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

            const month = startDate.toLocaleDateString('en-US', { timeZone: 'Asia/Manila', month: 'short' });
            const day = startDate.toLocaleDateString('en-US', { timeZone: 'Asia/Manila', day: 'numeric' });

            const formatTime = (date) => date.toLocaleTimeString('en-US', { timeZone: 'Asia/Manila', hour: 'numeric', minute: '2-digit', hour12: true });
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
        let newsList = newsData.data || [];

        // Only show published content
        newsList = newsList.filter(news => news.status === 'published');

        // Sort news by updated_at (newest first)
        newsList.sort((a, b) => {
            const dateA = new Date(a.updated_at);
            const dateB = new Date(b.updated_at);
            return dateB - dateA; // Descending order
        });

        loadingEl.style.display = 'none';

        if (newsList.length === 0) {
            container.innerHTML = '<div class="no-products">No news available at the moment.</div>';
            return;
        }

        // Generate HTML for each news item
        const newsHTML = newsList.map(news => {
            const publishDate = new Date(news.updated_at);

            const month = publishDate.toLocaleDateString('en-US', { timeZone: 'Asia/Manila', month: 'short' });
            const day = publishDate.toLocaleDateString('en-US', { timeZone: 'Asia/Manila', day: 'numeric' });

            // Use featured image or a placeholder
            let imageUrl = news.featured_image || 'https://placehold.co/400x250?text=News';

            // Convert content into HTML formatting (handling newlines and making links clickable)
            const urlRegex = /(https?:\/\/[^\s]+)/g;
            let formattedContent = (news.content || '')
                .replace(urlRegex, '<a href="$1" target="_blank" rel="noopener noreferrer" style="color: var(--primary-color); font-weight: 500;">$1</a>')
                .replace(/\r?\n/g, '<br>');

            return `
                <div class="news-card" style="margin-bottom: 25px; position: relative; border: 1px solid var(--border-color); border-radius: 16px; overflow: hidden; background: var(--bg-white); box-shadow: var(--shadow-sm); transition: transform 0.3s ease, box-shadow 0.3s ease;">
                    <div class="news-image" style="width: 100%;">
                        <img src="${imageUrl}" alt="${news.title}" onerror="this.src='https://placehold.co/400x250?text=Image+Unavailable'">
                    </div>
                    <div class="event-date" style="position: absolute; top: 20px; left: 20px;">
                        <span class="date-day">${day}</span>
                        <span class="date-month">${month}</span>
                    </div>
                    <div class="event-details" style="padding: 2rem; display: flex; flex-direction: column; justify-content: center; flex-grow: 1;">
                        <h3 style="font-size: 1.5rem; color: var(--primary-dark); margin-bottom: 0.5rem; line-height: 1.4;">${news.title}</h3>
                        <p class="event-time" style="color: var(--secondary-dark); font-weight: 500; margin-bottom: 1rem; font-size: 0.95rem;">✍️ ${news.author || 'Bitagan Family'}</p>
                        <p class="event-description" style="color: var(--text-light); line-height: 1.7; white-space: pre-wrap; margin-bottom: 0;">${formattedContent}</p>
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

async function fetchChallenges() {
    const container = document.getElementById('challenges-container');
    const loadingEl = document.getElementById('challenges-loading');
    const errorEl = document.getElementById('challenges-error');

    if (!container || !loadingEl || !errorEl) return;

    try {
        const response = await fetch(`${API_BASE_URL}/challenges?client_identifier=${CLIENT_IDENTIFIER}`, {
            method: 'GET',
            headers: {
                'x-api-key': API_KEY,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // The API returns an array directly, but let's be safe
        const challenges = Array.isArray(data) ? data : (data.data || []);

        loadingEl.style.display = 'none';

        if (challenges.length === 0) {
            container.innerHTML = '<div class="no-products" style="grid-column: 1 / -1; text-align: center;">More exciting challenges coming soon!</div>';
            return;
        }

        const challengesHTML = challenges.map(challenge => {
            // Determine status and corresponding styling
            const now = new Date();
            const startDate = new Date(challenge.start_date);
            const endDate = new Date(challenge.end_date);

            let statusBadge = '';
            let statusStyle = '';
            let gradientAttr = '';
            let iconAttr = '🏆';
            let actionBtn = '';
            let dateDisplay = '';

            if (now < startDate) {
                // Upcoming
                statusBadge = 'UPCOMING';
                statusStyle = 'color: var(--accent-color);';
                gradientAttr = 'background: linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%);';
                iconAttr = '🎤';
                dateDisplay = `<span>⏳</span> <span style="color: var(--text-light); font-size: 0.9rem;">Starts: ${startDate.toLocaleDateString('en-US', { timeZone: 'Asia/Manila', month: 'short', day: 'numeric', year: 'numeric' })}</span>`;
                actionBtn = `<a href="https://neulify.com/challenges/${challenge.id}/public-register" target="_blank" rel="noopener noreferrer" class="btn" style="background: #e2e8f0; color: #64748b; width: 100%; text-align: center; padding: 0.8rem; border-radius: 12px; font-weight: 600; text-decoration: none; cursor: not-allowed;">Registration Opens Soon</a>`;
            } else if (now > endDate) {
                // Completed
                statusBadge = 'COMPLETED';
                statusStyle = 'color: var(--primary-color);';
                gradientAttr = 'background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%);';
                iconAttr = '🏅';
                dateDisplay = `<span>📅</span> <span style="color: var(--text-light); font-size: 0.9rem;">Ended: ${endDate.toLocaleDateString('en-US', { timeZone: 'Asia/Manila', month: 'short', day: 'numeric', year: 'numeric' })}</span>`;
                actionBtn = `<a href="https://neulify.com/challenges/${challenge.id}/public-register" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="width: 100%; text-align: center; padding: 0.8rem; border-radius: 12px;">View Results</a>`;
            } else {
                // Active
                statusBadge = 'ACTIVE';
                statusStyle = 'color: var(--accent-color);';
                gradientAttr = 'background: linear-gradient(135deg, #FF9A9E 0%, #FECFEF 99%, #FECFEF 100%);';
                iconAttr = '🎯';
                dateDisplay = `<span>⏳</span> <span style="color: var(--text-light); font-size: 0.9rem;">Ends: ${endDate.toLocaleDateString('en-US', { timeZone: 'Asia/Manila', month: 'short', day: 'numeric', year: 'numeric' })}</span>`;
                actionBtn = `<a href="https://neulify.com/challenges/${challenge.id}/public-register" target="_blank" rel="noopener noreferrer" class="btn" style="background: white; color: var(--accent-color); border: 2px solid var(--accent-color); width: 100%; text-align: center; padding: 0.8rem; border-radius: 12px; font-weight: 600; text-decoration: none; transition: all 0.3s;">Join Challenge</a>`;
            }

            // Custom cover image if provided, otherwise fallback to gradient
            const imageDisplay = challenge.image_url
                ? `<img src="${challenge.image_url}" alt="${challenge.title}" style="width: 100%; height: 100%; object-fit: cover; position: absolute; top:0; left:0; z-index: 0;">
                   <div style="position: absolute; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,0.3); z-index: 1;"></div>`
                : `<span style="font-size: 5rem; filter: drop-shadow(2px 4px 6px rgba(0,0,0,0.2)); position: relative; z-index: 2;">${iconAttr}</span>`;

            // Format rewards
            let prizeText = 'TBA';
            if (challenge.rewards && challenge.rewards.length > 0) {
                prizeText = challenge.rewards.map(r => r.value).join(', ');
            } else if (challenge.prize) {
                prizeText = challenge.prize; // Fallback to 'prize' property if it exists
            }

            // Include goal info if available
            let goalDisplay = '';
            if (challenge.goal_value && challenge.goal_unit) {
                goalDisplay = `<div style="display: flex; align-items: center; gap: 10px; margin-bottom: 5px;">
                                    <span>🎯</span> <span style="color: var(--text-light); font-size: 0.9rem;">Goal: ${challenge.goal_value} ${challenge.goal_unit}</span>
                               </div>`;
            }

            return `
                <div class="challenge-card" style="background: var(--bg-white); border-radius: 16px; overflow: hidden; border: 1px solid var(--border-color); box-shadow: var(--shadow-sm); transition: transform 0.3s ease, box-shadow 0.3s ease; display: flex; flex-direction: column;">
                    <div style="position: relative; height: 180px; ${gradientAttr} display: flex; align-items: center; justify-content: center;">
                        ${imageDisplay}
                        <div style="position: absolute; top: 15px; right: 15px; background: white; ${statusStyle} padding: 5px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 700; box-shadow: 0 2px 10px rgba(0,0,0,0.1); z-index: 2;">${statusBadge}</div>
                    </div>
                    <div style="padding: 2rem; display: flex; flex-direction: column; flex-grow: 1;">
                        <h3 style="font-size: 1.4rem; color: var(--text-dark); margin-bottom: 0.5rem; font-family: 'Playfair Display', serif;">${challenge.title}</h3>
                        <p style="color: var(--text-light); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem; flex-grow: 1;">${challenge.description ? challenge.description.replace(/\n|\\n/g, '<br>') : ''}</p>
                        
                        <div style="background: var(--bg-light); padding: 1rem; border-radius: 12px; margin-bottom: 1.5rem;">
                            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 5px;">
                                <span>🏆</span> <strong style="color: var(--primary-dark); font-size: 0.9rem;">Prize: ${prizeText}</strong>
                            </div>
                            ${goalDisplay}
                            <div style="display: flex; align-items: center; gap: 10px;">
                                ${dateDisplay}
                            </div>
                        </div>
                        
                        ${actionBtn}
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = challengesHTML;

    } catch (error) {
        console.error('Error fetching challenges:', error);
        loadingEl.style.display = 'none';
        errorEl.style.display = 'block';
    }
}

// Call fetch functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    fetchEvents();
    fetchChallenges();
    fetchNews();
});
