 
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
  heroSlider.style.backgroundImage = `url('${heroImages[heroIndex]}')`;
  heroIndex = (heroIndex + 1) % heroImages.length;
}

changeHeroBackground(); 
setInterval(changeHeroBackground, 5000);

    const products = [
      {
        id: 1,
        name: "ساعة يد ذكية",
        company: "TechTime",
        description: "ساعة ذكية مزودة بجميع الميزات الحديثة مع بطارية تدوم طويلاً.",
        price: "299 دولار",
        coupon: "خصم 10% مع الكود TECH10",
        image: "images (2).JFIF",
        rating: 4
      },
      {
        id: 2,
        name: "سماعات لاسلكية",
        company: "SoundMax",
        description: "سماعات بجودة صوت عالية وعزل ممتاز للضوضاء.",
        price: "149 دولار",
        coupon: "",
        image: "images (1).JFIF",
        rating: 3
      },
      {
        id: 3,
        name: "كاميرا احترافية",
        company: "PhotoPro",
        description: "كاميرا رقمية بدقة عالية مناسبة للمحترفين والهواة.",
        price: "850 دولار",
        coupon: "خصم 5% للطلب الأول",
        image: "images12.JFIF",
        rating: 5
      },
      {
        id: 4,
        name: "حاسوب محمول",
        company: "ComputeX",
        description: "حاسوب محمول خفيف الوزن مع أداء عالي للأعمال والترفيه.",
        price: "1200 دولار",
        coupon: "",
        image:"images (4)2.JFIF",
        rating: 2
      },
      {
        id: 5,
        name: "هاتف ذكي",
        company: "SmartCell",
        description: "هاتف ذكي مع كاميرا قوية وشاشة كبيرة بتقنية OLED.",
        price: "650 دولار",
        coupon: "كوبون 15% لفترة محدودة",
        image: "download.JFIF",
        rating: 4
      },
    ];

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

    function createProductCards() {
      products.forEach(product => {
        const card = document.createElement('div');
        card.className = "bg-white rounded-lg shadow-md p-4 min-w-[250px] cursor-pointer hover:shadow-lg transition flex flex-col";
        card.setAttribute('data-id', product.id);
        card.innerHTML = `
          <img src="${product.image}" alt="${product.name}" class="rounded mb-4 aspect-[4/3] object-cover"/>
          <h3 class="text-xl font-semibold mb-1">${product.name}</h3>
          <p class="text-yellow-600 font-bold mb-2">${product.price}</p>
          <div class="flex space-x-1 rtl:space-x-reverse" data-rating="${product.rating}">
            ${renderStars(product.rating, false)}
          </div>
        `;
        slider.appendChild(card);

        card.addEventListener('click', () => openModal(product.id));
      });
    }

    function renderStars(rating, interactive) {
      let starsHTML = '';
      for(let i=1; i<=5; i++) {
        if(interactive) {
          starsHTML += `<span class="star ${i <= rating ? 'active' : ''}" data-star="${i}">&#9733;</span>`;
        } else {
          starsHTML += `<span class="star ${i <= rating ? 'active' : ''}">&#9733;</span>`;
        }
      }
      return starsHTML;
    }

    function openModal(productId) {
      const product = products.find(p => p.id === productId);
      if(!product) return;

      modalImage.src = product.image;
      modalImage.alt = product.name;
      modalName.textContent = product.name;
      modalCompany.textContent = `الشركة المصنعة: ${product.company}`;
      modalDescription.textContent = product.description;
      modalPrice.textContent = product.price;
      modalCoupon.textContent = product.coupon || '';

      modalStars.innerHTML = renderStars(userRatings[productId] ?? product.rating, true);

      addStarListeners(productId);

      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modal.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }

    modalCloseBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', e => {
      if(e.target === modal) closeModal();
    });

    function addStarListeners(productId) {
      const stars = modalStars.querySelectorAll('.star');
      stars.forEach(star => {
        star.onclick = () => {
          const rating = +star.dataset.star;
          userRatings[productId] = rating;
          updateModalStars(rating);
          updateCardStars(productId, rating);
        };
      });
    }

    function updateModalStars(rating) {
      const stars = modalStars.querySelectorAll('.star');
      stars.forEach((star, i) => {
        star.classList.toggle('active', i < rating);
      });
    }

    function updateCardStars(productId, rating) {
      const card = slider.querySelector(`[data-id="${productId}"]`);
      if(!card) return;
      const starsDiv = card.querySelector('div[data-rating]');
      starsDiv.dataset.rating = rating;
      starsDiv.innerHTML = renderStars(rating, false);
    }

    const scrollAmount = 270;

    nextBtn.addEventListener('click', () => {
      slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      resetAutoSlide();
    });
    prevBtn.addEventListener('click', () => {
      slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      resetAutoSlide();
    });

    let autoSlideInterval = setInterval(() => {
      if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
        slider.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }, 4000);

    function resetAutoSlide() {
      clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(() => {
        if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
          slider.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }, 4000);
    }

    createProductCards();