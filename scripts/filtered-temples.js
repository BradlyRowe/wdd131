document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("menu-toggle");
    const nav = document.getElementById("nav-menu");

    toggle.addEventListener("click", () => {
        nav.classList.toggle("open");
    });

    document.getElementById("year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = document.lastModified;
});

const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  // Add more temple objects here...
  {
    templeName: "Las Vegas Nevada",
    location: "Las Vegas, Nevada, United States",
    dedicated: "1989, December, 16",
    area: 116642,
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/las-vegas-nevada-temple/las-vegas-nevada-temple-35604-main.jpg"
  },
  {
    templeName: "Idaho Falls Idaho",
    location: "Idaho Falls, Idaho, United States",
    dedicated: "1945, September, 23",
    area: 116642,
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/idaho-falls-idaho-temple/idaho-falls-idaho-temple-55801-main.jpg"
  },
  {
    templeName: "St. George Utah",
    location: "St. George, Utah, United States",
    dedicated: "1877, April, 6",
    area: 116642,
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/st.-george-utah-temple/st.-george-utah-temple-40435-main.jpg"
  },
];

// Render temple cards into the .container element
function renderTemples(list = temples) {
  const container = document.querySelector('.container');
  if (!container) {
    return;
  }

  // clear existing
  container.innerHTML = '';

  list.forEach(t => {
    const card = document.createElement('article');
    card.className = 'temple-card';

    // Image (absolute address) with native lazy loading
    const img = document.createElement('img');
    img.src = t.imageUrl;
    img.alt = t.templeName;
    img.loading = 'lazy';
    img.className = 'temple-image';
    card.appendChild(img);

    // Content container
    const content = document.createElement('div');
    content.className = 'temple-content';

    const name = document.createElement('h3');
    name.textContent = t.templeName;
    content.appendChild(name);

    const loc = document.createElement('p');
    loc.className = 'temple-location';
    loc.textContent = t.location;
    content.appendChild(loc);

    const ded = document.createElement('p');
    ded.className = 'temple-dedicated';
    ded.textContent = 'Dedicated: ' + t.dedicated;
    content.appendChild(ded);

    const area = document.createElement('p');
    area.className = 'temple-area';
    area.textContent = 'Area: ' + (typeof t.area === 'number' ? t.area.toLocaleString() : t.area) + ' sq ft';
    content.appendChild(area);

    card.appendChild(content);
    container.appendChild(card);
  });
}

// Helpers for filtering
function parseYear(dedicatedStr) {
  if (!dedicatedStr) return NaN;
  const m = dedicatedStr.match(/(\d{4})/);
  if (m) {
    return parseInt(m[1], 10);
  }
  return NaN;
}

function filterOld() {
  return temples.filter(t => {
    const y = parseYear(t.dedicated);
    return !isNaN(y) && y < 1900;
  });
}

function filterNew() {
  return temples.filter(t => {
    const y = parseYear(t.dedicated);
    return !isNaN(y) && y > 2000;
  });
}

function filterLarge() {
  return temples.filter(t => typeof t.area === 'number' && t.area > 90000);
}

function filterSmall() {
  return temples.filter(t => typeof t.area === 'number' && t.area < 10000);
}

// Wire navigation filters (Home, Old, New, Large, Small)
function wireNavFilters() {
  const nav = document.getElementById('nav-menu');
  if (!nav) return;

  const links = nav.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const text = (link.textContent || '').trim().toLowerCase();
      switch (text) {
        case 'home':
          renderTemples(temples);
          break;
        case 'old':
          renderTemples(filterOld());
          break;
        case 'new':
          renderTemples(filterNew());
          break;
        case 'large':
          renderTemples(filterLarge());
          break;
        case 'small':
          renderTemples(filterSmall());
          break;
        default:
          renderTemples(temples);
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderTemples(temples);
  wireNavFilters();
});