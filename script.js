import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText);

const slides = [
  {
    title: "Alpha",
    image: "https://picsum.photos/2400/1200?random=1",
  },
  {
    title: "Beta",
    image: "https://picsum.photos/2400/1200?random=2",
  },
  {
    title: "Gamma",
    image: "https://picsum.photos/2400/1200?random=3",
  },
  {
    title: "Delta",
    image: "https://picsum.photos/2400/1200?random=4",
  },
  {
    title: "Epsilon",
    image: "https://picsum.photos/2400/1200?random=5",
  },
  {
    title: "Zeta",
    image: "https://picsum.photos/2400/1200?random=6",
  },
  {
    title: "Eta",
    image: "https://picsum.photos/2400/1200?random=7",
  },
  {
    title: "Theta",
    image: "https://picsum.photos/2400/1200?random=8",
  },
  {
    title: "Iota",
    image: "https://picsum.photos/2400/1200?random=9",
  },
  {
    title: "Kappa",
    image: "https://picsum.photos/2400/1200?random=10",
  },
  {
    title: "Lambda",
    image: "https://picsum.photos/2400/1200?random=11",
  },
  {
    title: "Mu",
    image: "https://picsum.photos/2400/1200?random=12",
  },
  {
    title: "Nu",
    image: "https://picsum.photos/2400/1200?random=13",
  },
  {
    title: "Xi",
    image: "https://picsum.photos/2400/1200?random=14",
  },
  {
    title: "Omicron",
    image: "https://picsum.photos/2400/1200?random=15",
  },
  {
    title: "Pi",
    image: "https://picsum.photos/2400/1200?random=16",
  },
  {
    title: "Rho",
    image: "https://picsum.photos/2400/1200?random=17",
  },
  {
    title: "Sigma",
    image: "https://picsum.photos/2400/1200?random=18",
  },
  {
    title: "Tau",
    image: "https://picsum.photos/2400/1200?random=19",
  },
  {
    title: "Upsilon",
    image: "https://picsum.photos/2400/1200?random=20",
  },
  {
    title: "Phi",
    image: "https://picsum.photos/2400/1200?random=21",
  },
  {
    title: "Chi",
    image: "https://picsum.photos/2400/1200?random=22",
  },
  {
    title: "Psi",
    image: "https://picsum.photos/2400/1200?random=23",
  },
  {
    title: "Omega",
    image: "https://picsum.photos/2400/1200?random=24",
  },
];

const assets = [
  { type: "font", name: "AeonikPro", url: "fonts/AeonikPro.otf" },
  { type: "font", name: "OldLondon", url: "fonts/OldLondon.ttf" },
  ...slides.map(s => s.image),
];

const app = document.querySelector(".app");

!function loadingAnim() {
  const progressText = document.querySelector(".progress-text");
  const loader = document.querySelector(".loader");
  const square = document.querySelector('.spinner');
  const loadingTl = gsap.timeline({ repeat: -1 });
  let loaded = 0;

  loadingTl.to(square, {
    rotation: 45,
    scale: 1.2,
    duration: 0.8,
    ease: "power2.inOut"
  })
    .to(square, {
      duration: 0.2
    })
    .to(square, {
      rotation: 90,
      scale: 1,
      duration: 0.8,
      ease: "power2.inOut"
    });
  Promise.all(assets.map(preload));

  function updateProgress() {
    loaded++;
    let percent = Math.floor((loaded / assets.length) * 100);
    progressText.textContent = percent;
    if (loaded === assets.length) {
      loadingTl.kill();
      const exitTl = gsap.timeline();
      const screenDiagonal = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2);
      const scaleNeeded = screenDiagonal / 50;
      exitTl
        .to(square, {
          scale: scaleNeeded,
          rotation: 45,
          duration: 0.8,
          ease: "power2.inOut"
        })
        .to(loader, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
          onComplete: () => {
            loader.style.display = "none";
            app.style.display = "block";
            initializeSlides();
          }
        });
    }
  }

  function preload(asset) {
    return new Promise((resolve) => {
      if (typeof asset === "string") {
        let el;
        if (asset.match(/\.(jpg|jpeg|png|gif|webp|svg)|picsum/)) {
          el = new Image();
          el.src = asset;
          el.onload = el.onerror = () => resolve(updateProgress());
        } else if (asset.endsWith(".css")) {
          el = document.createElement("link");
          el.rel = "stylesheet";
          el.href = asset;
          el.onload = el.onerror = () => resolve(updateProgress());
          document.head.appendChild(el);
        } else if (asset.endsWith(".js")) {
          el = document.createElement("script");
          el.src = asset;
          el.defer = true;
          el.onload = el.onerror = () => resolve(updateProgress());
          document.head.appendChild(el);
        } else {
          resolve(updateProgress());
        }
      } else if (asset.type === "font") {
        const font = new FontFace(asset.name, `url(${asset.url})`);
        font.load().then((loadedFont) => {
          document.fonts.add(loadedFont);
          updateProgress();
          resolve();
        }).catch(() => {
          updateProgress();
          resolve();
        });
      }
    });
  }
}();

function initializeSlides() {
  const backgroundContainer = document.querySelector('.background-container');
  const titlesContainer = document.querySelector('.titles-container');
  const slideNumber = document.querySelector('.slide-number');
  const slideTotal = document.querySelector('.slide-total');

  slideTotal.textContent = slides.length;

  const scrollContainer = document.createElement('div');
  scrollContainer.className = 'scroll-container';
  scrollContainer.style.height = `${slides.length * 300}vh`;
  document.body.appendChild(scrollContainer);

  const lenis = new Lenis({
    lerp: 0.05,
    smoothWheel: true,
    wheelMultiplier: 0.3,
    touchMultiplier: 0.3,
  });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  slides.forEach((slide, index) => {
    const backgroundElement = document.createElement('div');
    backgroundElement.className = 'slide-background';
    backgroundElement.setAttribute('data-bg', index);
    backgroundElement.style.zIndex = index;
    backgroundContainer.appendChild(backgroundElement);

    const childImg = document.createElement('img');
    childImg.src = slide.image;
    childImg.alt = slide.title;
    backgroundElement.appendChild(childImg);

    const titleElement = document.createElement('h1');
    titleElement.className = 'slide-title';
    titleElement.setAttribute('data-title', index);
    titleElement.textContent = slide.title;
    titlesContainer.appendChild(titleElement);

    if (index === 0) {
      gsap.set(backgroundElement, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        translateY: "0%",
      });
    } else {
      gsap.set(backgroundElement, {
        clipPath: "polygon(33% 82%, 62% 100%, 48% 100%, 16% 100%)",
        translateY: "16%",
      });
      gsap.set(titlesContainer, {
        top: 0,
      });
    }
  });

  slides.forEach((slide, index) => {
    if (index === 0) return;

    const currentBg = document.querySelector(`[data-bg="${index}"]`);

    ScrollTrigger.create({
      trigger: scrollContainer,
      start: `${(index - 1) * 300}vh top`,
      end: `${index * 300}vh top`,
      scrub: 2,
      animation: gsap.fromTo(
        currentBg,
        {
          clipPath: "polygon(33% 82%, 62% 100%, 48% 100%, 16% 100%)",
          translateY: "100%"
        },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          translateY: "0%",
        }
      )
    });

    ScrollTrigger.create({
      trigger: scrollContainer,
      start: `${(index - 1) * 300}vh top`,
      end: `${index * 300}vh top`,
      scrub: 2,
      animation: gsap.fromTo(
        titlesContainer,
        {
          top: Math.max(index - 1, 0) * -128,
        },
        {
          top: index * -128,
        }
      ),
      onUpdate: (self) => {
        const progress = self.progress;
        let currentSlideIndex;

        if (progress <= 0.5) {
          currentSlideIndex = index - 1;
        } else {
          currentSlideIndex = index;
        }

        slideNumber.textContent = (currentSlideIndex + 1).toString().padStart(2, '0');
      }
    });
  });

  slideNumber.textContent = '01';

  let snapTimeout;
  let lastScrollTime = 0;

  const handleScrollEnd = () => {
    lastScrollTime = Date.now();

    if (snapTimeout) {
      clearTimeout(snapTimeout);
    }

    snapTimeout = setTimeout(() => {
      if (Date.now() - lastScrollTime > 200) {
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.animation) {
            const progress = trigger.progress;

            if (progress > 0 && progress < 1) {
              const shouldComplete = progress >= 0.5;

              if (shouldComplete) {
                lenis.scrollTo(trigger.end, {
                  duration: 1.2,
                  easing: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
                });
              } else {
                lenis.scrollTo(trigger.start, {
                  duration: 1.2,
                  easing: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
                });
              }
            }
          }
        });
      }
    }, 200);
  };

  lenis.on('scroll', handleScrollEnd);
}