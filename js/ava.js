"use strict";

// SLIDER

const swiperElements = document.querySelectorAll(".swiper");

if (swiperElements) {
  swiperElements.forEach((swiperElement) => {
    const swiperInstance = new Swiper(swiperElement, {
      direction: "horizontal",
      loop: true,

      pagination: {
        el: swiperElement.querySelector(".swiper-pagination"),
      },

      navigation: {
        nextEl: swiperElement.querySelector(".swiper-button-next"),
        prevEl: swiperElement.querySelector(".swiper-button-prev"),
      },

      scrollbar: {
        el: swiperElement.querySelector(".swiper-scrollbar"),
      },
    });
  });
}

// ACCORDEON

const accordeonItem = document.querySelectorAll(".accordeon__item");
console.log(accordeonItem);

if (accordeonItem) {
  accordeonItem.forEach((item) => {
    item.addEventListener("click", () => {
      const isActive = item.classList.contains("accordeon__item--active");

      accordeonItem.forEach((accordion) => {
        accordion.classList.remove("accordeon__item--active");
      });

      if (!isActive) {
        item.classList.add("accordeon__item--active");
      }
    });
  });
}

// TEMPORIZADOR

const temporizador = document.querySelector(".temporizador");

if (temporizador) {
  const temporizadorPlayBtn = document.querySelector(".temporizador__btn");
  const temporizadorTimer = document.querySelector(".temporizador__clock");
  const temporizadorRing = document.querySelector(".temporizador audio");

  let [minutes, seconds] = temporizadorTimer.textContent.split(":").map(Number);
  let totalSec = minutes * 60 + seconds;
  const originalSec = totalSec;
  let intervalId = null;

  const clockFormat = (seconds) =>
    `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;

  const startTimer = () => {
    clearInterval(intervalId);

    temporizadorTimer.textContent = clockFormat(totalSec);

    intervalId = setInterval(() => {
      if (totalSec <= 0) {
        clearInterval(intervalId);
        temporizadorRing.play();
        resetTimer();
      } else {
        totalSec--;
        temporizadorTimer.textContent = clockFormat(totalSec);
      }
    }, 1000);
  };

  const resetTimer = () => {
    totalSec = originalSec;
    temporizadorTimer.textContent = clockFormat(totalSec);
    temporizador.classList.remove("active");
    temporizadorPlayBtn.innerHTML = `<ion-icon name="play"></ion-icon>`;
  };

  temporizadorPlayBtn.addEventListener("click", () => {
    if (temporizador.classList.contains("active")) {
      clearInterval(intervalId);
      resetTimer();
    } else {
      temporizador.classList.add("active");
      temporizadorPlayBtn.innerHTML = `<ion-icon name="reload"></ion-icon>`;
      startTimer();
    }
  });
}

// FLIP CARDS

const flipCards = document.querySelectorAll(".flip-card");

if (flipCards) {
  const adjustCardHeights = () => {
    if (!flipCards.length) return;

    flipCards.forEach((card) => {
      card.style.height = "auto";
      [...card.children].forEach((child) => (child.style.height = "auto"));
    });

    requestAnimationFrame(() => {
      const maxHeight = Math.max(
        ...[...flipCards].flatMap((card) =>
          [...card.children].map((child) => child.offsetHeight),
        ),
      );

      flipCards.forEach((card) => {
        card.style.height = `${maxHeight}px`;
        [...card.children].forEach(
          (child) => (child.style.height = `${maxHeight}px`),
        );
      });
    });
  };

  window.addEventListener("load", adjustCardHeights);
  window.addEventListener("resize", adjustCardHeights);

  flipCards.forEach((card) => {
    card.addEventListener("click", () =>
      card.classList.toggle("flip-card--flipped"),
    );
  });
}
