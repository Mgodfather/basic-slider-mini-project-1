// Slider configuration
const config = {
    slidesPerView: 3,
    slideWidth: 300,
    autoplayInterval: 5000 // 5 seconds
};

// DOM elements
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

// State
let currentIndex = 0;
const totalSlides = slides.length;

// Function to update slider position
const updateSliderPosition = () => {
    slider.style.transform = `translateX(-${currentIndex * config.slideWidth}px)`;
    updateDots();
};

// Function to update dots
const updateDots = () => {
    const activeDotIndex = Math.floor(currentIndex / config.slidesPerView);
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeDotIndex);
    });
};

// Function to move to next slide
const nextSlide = () => {
    currentIndex = (currentIndex + config.slidesPerView) % totalSlides;
    updateSliderPosition();
};

// Function to move to previous slide
const prevSlide = () => {
    currentIndex = (currentIndex - config.slidesPerView + totalSlides) % totalSlides;
    updateSliderPosition();
};

// Set up autoplay
let autoplayInterval = setInterval(nextSlide, config.autoplayInterval);

// Event listener for dots
dots.forEach(dot => {
    dot.addEventListener('click', function() {
        const dotIndex = parseInt(this.getAttribute('data-index'));
        currentIndex = dotIndex * config.slidesPerView;
        updateSliderPosition();
        clearInterval(autoplayInterval);
        autoplayInterval = setInterval(nextSlide, config.autoplayInterval);
    });
});

// Event listeners for touch events (basic swipe functionality)
let touchStartX = 0;
let touchEndX = 0;

slider.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

slider.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) {
        nextSlide();
    } else if (touchEndX - touchStartX > 50) {
        prevSlide();
    }
    clearInterval(autoplayInterval);
    autoplayInterval = setInterval(nextSlide, config.autoplayInterval);
});

// Initial update
updateSliderPosition();