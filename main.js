/* main.js — practice site */

(function () {
  'use strict';

  /* ─── Active nav link ─── */
  function setActiveNav() {
    const path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav__link').forEach(function (a) {
      const href = a.getAttribute('href');
      if (href === path || (path === '' && href === 'index.html')) {
        a.classList.add('active');
      }
    });
  }

  /* ─── Mobile burger menu ─── */
  function initBurger() {
    const burger = document.querySelector('.nav__burger');
    const links  = document.querySelector('.nav__links');
    if (!burger || !links) return;

    burger.addEventListener('click', function () {
      const open = links.classList.toggle('open');
      burger.setAttribute('aria-expanded', open);
    });

    // Close when a link is clicked
    links.querySelectorAll('.nav__link').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        burger.setAttribute('aria-expanded', false);
      });
    });
  }

  /* ─── Scroll reveal ─── */
  function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.12 });

      els.forEach(function (el) { io.observe(el); });
    } else {
      els.forEach(function (el) { el.classList.add('visible'); });
    }
  }

  /* ─── Progress bars ─── */
  function initProgressBars() {
    const bars = document.querySelectorAll('.progress-fill[data-width]');
    if (!bars.length) return;

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.style.width = e.target.dataset.width;
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.3 });
      bars.forEach(function (b) { io.observe(b); });
    } else {
      bars.forEach(function (b) { b.style.width = b.dataset.width; });
    }
  }

  /* ─── Accordion ─── */
  function initAccordion() {
    document.querySelectorAll('.accordion__trigger').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const body = document.getElementById(btn.dataset.target);
        if (!body) return;
        const isOpen = body.classList.contains('open');
        // Close all in same accordion
        const wrapper = btn.closest('.accordion');
        if (wrapper) {
          wrapper.querySelectorAll('.accordion__body.open').forEach(function (b) {
            b.classList.remove('open');
          });
          wrapper.querySelectorAll('.accordion__trigger.open').forEach(function (t) {
            t.classList.remove('open');
          });
        }
        if (!isOpen) {
          body.classList.add('open');
          btn.classList.add('open');
        }
      });
    });
  }

  /* ─── Contact form ─── */
  function initForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const msg = document.getElementById('form-success');
      if (msg) {
        msg.style.display = 'block';
        form.reset();
        setTimeout(function () { msg.style.display = 'none'; }, 5000);
      }
    });
  }

  /* ─── Init ─── */
  document.addEventListener('DOMContentLoaded', function () {
    setActiveNav();
    initBurger();
    initReveal();
    initProgressBars();
    initAccordion();
    initForm();
  });
}());