// 1. Hero Background Slider
const heroSlider = document.getElementById("hero-slider");
const heroImages = [
  "s.jpeg",
  "c.webp",
  "cs.webp",
  "m.webp",
  "sci.webp",
  "mo.webp",
  "mob.webp",
];

let heroIndex = 0;

function changeHeroBackground() {
  if (heroSlider) {
    heroSlider.style.backgroundImage = `url('${heroImages[heroIndex]}')`;
    heroIndex = (heroIndex + 1) % heroImages.length;
  }
}

changeHeroBackground();
setInterval(changeHeroBackground, 5000);

// 2. Products Data
const products = [
  {
    id: 1,
    name: "ساعة يد ذكية",
    company: "Samsung",
    description: "ساعة ذكية مزودة بجميع الميزات الحديثة مع بطارية تدوم طويلاً.",
    price: "299 دولار",
    coupon: "خصم 10% مع الكود TECH10",
    image: "images (2).png",
    rating: 4
  },
  {
    id: 2,
    name: "سماعات لاسلكية",
    company: "Samsung",
    description: "سماعات بجودة صوت عالية وعزل ممتاز للضوضاء.",
    price: "149 دولار",
    coupon: "",
    image: "images (1).png",
    rating: 3
  },
  {
    id: 3,
    name: "كاميرا احترافية",
    company: "Samsung",
    description: "كاميرا رقمية بدقة عالية مناسبة للمحترفين والهواة.",
    price: "850 دولار",
    coupon: "خصم 5% للطلب الأول",
    image: "images12.png",
    rating: 5
  },
  {
    id: 4,
    name: "حاسوب محمول",
    company: "Samsung",
    description: "حاسوب محمول خفيف الوزن مع أداء عالي للأعمال والترفيه.",
    price: "1200 دولار",
    coupon: "",
    image: "images (4)2.png",
    rating: 2
  },
  {
    id: 5,
    name: "هاتف ذكي",
    company: "Samsung",
    description: "هاتف ذكي مع كاميرا قوية وشاشة كبيرة بتقنية OLED.",
    price: "650 دولار",
    coupon: "كوبون 15% لفترة محدودة",
    image: "download.png",
    rating: 4
  },
];

// 3. DOM Elements
const slider = document.getElementById('product-slider');
const modal = document.getElementById('modal');
const modalCloseBtn = document.getElementById('modalClose');
const modalImage = document.getElementById('modalImage');
const modalName = document.getElementById('modalName');
const modalCompany = document.getElementById('modalCompany');
const modalDescription = document.getElementById('modalDescription');
const modalPrice = document.getElementById('modalPrice');
const modalCoupon = document.getElementById('modalCoupon');
const modalStars = document.getElementById('modalStars');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const userRatings = {};

// 4. Star Rendering Engine
function renderStars(rating, isInteractive = false) {
  let starsHTML = '';
  for (let i = 1; i <= 5; i++) {
    const activeClass = i <= rating ? 'active' : '';
    const interactiveClass = isInteractive ? 'interactive-star' : 'star';
    starsHTML += `<span class="${interactiveClass} ${activeClass}" data-star="${i}">★</span>`;
  }
  return starsHTML;
}

function createProductCards() {
  slider.innerHTML = '';
  products.forEach(product => {
    const currentRating = userRatings[product.id] ?? product.rating;
    const card = document.createElement('div');
    card.className = "bg-white rounded-lg shadow-md p-4 min-w-[250px] cursor-pointer hover:shadow-lg transition flex flex-col";
    card.setAttribute('data-id', product.id);
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="rounded mb-4 aspect-[4/3] object-cover"/>
      <h3 class="text-xl font-semibold mb-1">${product.name}</h3>
      <p class="text-yellow-600 font-bold mb-2">${product.price}</p>
      <div class="stars-container flex space-x-1 rtl:space-x-reverse" data-rating="${currentRating}">
        ${renderStars(currentRating, false)}
      </div>
    `;
    slider.appendChild(card);

    card.addEventListener('click', () => openModal(product.id));
  });
}

function openModal(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  modalImage.src = product.image;
  modalImage.alt = product.name;
  modalName.textContent = product.name;
  modalCompany.textContent = `الشركة المصنعة: ${product.company}`;
  modalDescription.textContent = product.description;
  modalPrice.textContent = product.price;
  
  if(product.coupon) {
    modalCoupon.textContent = product.coupon;
    modalCoupon.classList.remove('hidden');
  } else {
    modalCoupon.classList.add('hidden');
  }

  const currentRating = userRatings[productId] ?? product.rating;
  modalStars.innerHTML = renderStars(currentRating, true);

  attachStarEvents(productId);

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.add('hidden');
  document.body.style.overflow = 'auto';
}

modalCloseBtn.addEventListener('click', closeModal);
modal.addEventListener('click', e => {
  if (e.target === modal) closeModal();
});

// 5. Star Rating Event Listeners
function attachStarEvents(productId) {
  const stars = modalStars.querySelectorAll('.interactive-star');
  
  stars.forEach(star => {
    star.onmouseenter = () => {
      const hoverValue = Number(star.getAttribute('data-star'));
      updateStarColors(stars, hoverValue);
    };

    star.onmouseleave = () => {
      const savedRating = userRatings[productId] ?? products.find(p => p.id === productId).rating;
      updateStarColors(stars, savedRating);
    };

    star.onclick = (e) => {
      e.stopPropagation();
      const selectedRating = Number(star.getAttribute('data-star'));
      userRatings[productId] = selectedRating;
      
      updateStarColors(stars, selectedRating);
      updateCardStars(productId, selectedRating);
    };
  });
}

function updateStarColors(starsArray, targetRating) {
  starsArray.forEach((s, index) => {
    if (index < targetRating) {
      s.classList.add('active');
    } else {
      s.classList.remove('active');
    }
  });
}

function updateCardStars(productId, rating) {
  const card = slider.querySelector(`[data-id="${productId}"]`);
  if (!card) return;
  const starsDiv = card.querySelector('.stars-container');
  if (starsDiv) {
    starsDiv.setAttribute('data-rating', rating);
    starsDiv.innerHTML = renderStars(rating, false);
  }
}

// 6. Horizontal Slider Scroll
const scrollAmount = 270;

nextBtn.addEventListener('click', () => {
  slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  resetAutoSlide();
});
prevBtn.addEventListener('click', () => {
  slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  resetAutoSlide();
});

let autoSlideInterval = setInterval(autoScroll, 4000);

function autoScroll() {
  if (Math.abs(slider.scrollLeft) + slider.clientWidth >= slider.scrollWidth - 5) {
    slider.scrollTo({ left: 0, behavior: 'smooth' });
  } else {
    slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  }
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(autoScroll, 4000);
}

createProductCards();
