const validateConsent = (form) => {
  const field = form.elements.consent;
  const error = document.getElementById(field.getAttribute('aria-describedby'));
  field.setAttribute('aria-invalid', String(!field.checked));
  error.textContent = field.checked ? '' : 'Vui lòng đồng ý với chính sách bảo mật để tiếp tục.';
  error.hidden = field.checked;
  return field.checked;
};

// Preview form: validate locally without transmitting personal information.
const form = document.querySelector('#lead-form');
const status = document.querySelector('#form-status');
if (form && status) {
  form.noValidate = true;
  const fields = [form.elements.name, form.elements.phone];
  const validateField = (field) => {
    const value = field.value.trim();
    const valid = field.name === 'name' ? value.length >= 2 : /^[+0-9 ()-]+$/.test(value) && value.replace(/\D/g, '').length >= 9 && value.replace(/\D/g, '').length <= 15;
    const error = document.getElementById(field.name === 'name' ? 'name-error' : 'phone-error');
    field.setAttribute('aria-invalid', String(!valid));
    error.textContent = valid ? '' : field.name === 'name' ? 'Vui lòng nhập họ tên ít nhất 2 ký tự.' : 'Vui lòng nhập số điện thoại hợp lệ (9–15 chữ số).';
    error.hidden = valid;
    return valid;
  };
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    status.hidden = true;
    const results = fields.map(validateField);
    const consentValid = validateConsent(form);
    const firstInvalid = results.indexOf(false);
    if (firstInvalid !== -1) { fields[firstInvalid].focus(); return; }
    if (!consentValid) { form.elements.consent.focus(); return; }
    status.hidden = false;
    status.textContent = 'Thông tin chưa được gửi. Form đang ở chế độ xem trước; vui lòng gọi 086 260 8234 để nhận bảng giá và tư vấn.';
  });
  fields.forEach(field => field.addEventListener('input', () => {
    status.hidden = true;
    if (field.getAttribute('aria-invalid') === 'true') validateField(field);
  }));
}

const setupConversionPopup = () => {
  const ctaLinks = [...document.querySelectorAll('a[href="#dang-ky"]')].filter((link) => link.closest('.site-footer') === null);
  if (!ctaLinks.length) return;

  const popup = document.createElement('div');
  popup.className = 'conversion-popup';
  popup.hidden = true;
  popup.setAttribute('role', 'dialog');
  popup.setAttribute('aria-modal', 'true');
  popup.setAttribute('aria-labelledby', 'conversion-popup-title');
  popup.innerHTML = `
    <div class="conversion-popup-panel">
      <button class="conversion-popup-close" type="button" aria-label="Đóng popup">Đóng</button>
      <div class="conversion-popup-copy">
        <div class="popup-brand">VINHOMES GLOBAL GATE <span>HẠ LONG</span></div>
        <p class="section-kicker"><span></span>VỊNH THIÊN ĐƯỜNG · ĐỢT 1</p>
        <h2 id="conversion-popup-title">Nhận bảng giá & tư vấn dòng tiền.</h2>
        <p id="conversion-popup-context">Để lại thông tin, đội ngũ tư vấn sẽ hỗ trợ theo nhu cầu bạn đang quan tâm.</p>
        <ul class="popup-benefits"><li>Bảng giá theo mã căn</li><li>Phương án tài chính</li><li>Tư vấn sản phẩm phù hợp</li></ul>
        <p class="conversion-popup-note">Giá bán và chính sách trên trang mang tính tham khảo/dự kiến; thông tin chính thức áp dụng theo văn bản niêm yết của Chủ đầu tư tại từng thời điểm.</p>
        <a class="conversion-popup-hotline" href="tel:0862608234">Gọi hotline 086 260 8234</a>
      </div>
      <form class="conversion-popup-form" aria-describedby="conversion-popup-context" novalidate>
        <label for="popup-name">Họ và tên <span aria-hidden="true">*</span></label>
        <input id="popup-name" name="name" autocomplete="name" placeholder="Nhập họ và tên" required minlength="2" maxlength="100" aria-describedby="popup-name-error">
        <p class="field-error" id="popup-name-error" hidden></p>
        <label for="popup-phone">Số điện thoại Zalo / nhận thông tin <span aria-hidden="true">*</span></label>
        <input id="popup-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="Nhập số điện thoại" required maxlength="20" aria-describedby="popup-phone-error">
        <p class="field-error" id="popup-phone-error" hidden></p>
        <label for="popup-interest">Nội dung quan tâm</label>
        <select id="popup-interest" name="interest">
          <option>Nhận bảng giá mới nhất</option>
          <option>Tư vấn dòng tiền</option>
          <option>Nhận brochure & bản đồ</option>
          <option>Nhận mặt bằng sản phẩm</option>
          <option>Đặt lịch xem thực địa</option>
        </select>
        <label class="form-consent"><input type="checkbox" name="consent" required aria-describedby="popup-consent-error"><span>Tôi đồng ý để MICC sử dụng thông tin trên nhằm liên hệ tư vấn qua điện thoại/Zalo theo <a href="https://chungcumasterioceancity.com/chinh-sach-bao-mat.html" target="_blank" rel="noopener">Chính sách bảo mật</a>.</span></label><p class="field-error" id="popup-consent-error" hidden></p>
        <button type="submit">ĐĂNG KÝ NHẬN TƯ VẤN <span aria-hidden="true">↗</span></button>
        <p class="form-status" role="status" hidden></p>
      </form>
    </div>`;
  document.body.append(popup);

  const closeButton = popup.querySelector('.conversion-popup-close');
  const popupForm = popup.querySelector('.conversion-popup-form');
  const popupStatus = popup.querySelector('.form-status');
  const popupFields = [popupForm.elements.name, popupForm.elements.phone];
  const popupContext = popup.querySelector('#conversion-popup-context');
  const popupInterest = popupForm.elements.interest;
  let lastFocusedElement;

  const validatePopupField = (field) => {
    const value = field.value.trim();
    const valid = field.name === 'name' ? value.length >= 2 : /^[+0-9 ()-]+$/.test(value) && value.replace(/\D/g, '').length >= 9 && value.replace(/\D/g, '').length <= 15;
    const error = document.getElementById(field.name === 'name' ? 'popup-name-error' : 'popup-phone-error');
    field.setAttribute('aria-invalid', String(!valid));
    error.textContent = valid ? '' : field.name === 'name' ? 'Vui lòng nhập họ tên ít nhất 2 ký tự.' : 'Vui lòng nhập số điện thoại hợp lệ (9–15 chữ số).';
    error.hidden = valid;
    return valid;
  };
  const openPopup = (sourceLink) => {
    const label = sourceLink.textContent.replace(/\s+/g, ' ').trim();
    lastFocusedElement = document.activeElement;
    popupContext.textContent = label ? `Bạn đang chọn: ${label}. Để lại thông tin, đội ngũ tư vấn sẽ hỗ trợ đúng nội dung này.` : 'Để lại thông tin, đội ngũ tư vấn sẽ hỗ trợ theo nhu cầu bạn đang quan tâm.';
    const lowerLabel = label.toLowerCase();
    if (lowerLabel.includes('dòng tiền')) popupInterest.value = 'Tư vấn dòng tiền';
    else if (lowerLabel.includes('brochure') || lowerLabel.includes('bản đồ')) popupInterest.value = 'Nhận brochure & bản đồ';
    else if (lowerLabel.includes('mặt bằng')) popupInterest.value = 'Nhận mặt bằng sản phẩm';
    else popupInterest.value = 'Nhận bảng giá mới nhất';
    popup.hidden = false;
    document.body.classList.add('has-open-conversion');
    window.requestAnimationFrame(() => popupForm.elements.name.focus());
  };
  const closePopup = () => {
    popup.hidden = true;
    popupStatus.hidden = true;
    document.body.classList.remove('has-open-conversion');
    lastFocusedElement?.focus?.();
  };

  ctaLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      openPopup(link);
    });
  });
  popupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    popupStatus.hidden = true;
    const results = popupFields.map(validatePopupField);
    const consentValid = validateConsent(popupForm);
    const firstInvalid = results.indexOf(false);
    if (firstInvalid !== -1) { popupFields[firstInvalid].focus(); return; }
    if (!consentValid) { popupForm.elements.consent.focus(); return; }
    popupStatus.hidden = false;
    popupStatus.textContent = 'Thông tin chưa được gửi. Form đang ở chế độ xem trước; vui lòng gọi 086 260 8234 hoặc chat Zalo để nhận tư vấn ngay.';
  });
  popupFields.forEach(field => field.addEventListener('input', () => {
    popupStatus.hidden = true;
    if (field.getAttribute('aria-invalid') === 'true') validatePopupField(field);
  }));
  closeButton.addEventListener('click', closePopup);
  popup.addEventListener('click', (event) => {
    if (event.target === popup) closePopup();
  });
  document.addEventListener('keydown', (event) => {
    if (popup.hidden) return;
    if (event.key === 'Escape') closePopup();
    if (event.key === 'Tab') {
      const items = [...popup.querySelectorAll('a[href], button, input, select')].filter(item => !item.disabled);
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
};

setupConversionPopup();
document.querySelectorAll('input[name="consent"]').forEach(field => {
  field.addEventListener('change', () => validateConsent(field.form));
});

// Animate only on entry; cards remain visible if JavaScript or observers fail.
const valueCards = document.querySelectorAll('.values .value-card');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let valueObserver;
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  valueObserver = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting) return;
      if (!reducedMotion.matches) target.classList.add('is-entering');
      valueObserver.unobserve(target);
    });
  }, { threshold: 0.08 });
  valueCards.forEach((card) => {
    valueObserver.observe(card);
    card.addEventListener('animationend', () => card.classList.remove('is-entering'), { once: true });
  });
}
reducedMotion.addEventListener('change', ({ matches }) => {
  if (!matches) return;
  valueObserver?.disconnect();
  valueCards.forEach((card) => card.classList.remove('is-entering'));
});

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const setMenuOpen = (open) => {
  menuToggle.setAttribute('aria-expanded', String(open));
  mainNav.classList.toggle('is-open', open);
};
menuToggle.addEventListener('click', () => setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true'));
mainNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenuOpen(false)));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    setMenuOpen(false);
    menuToggle.focus();
  }
});
document.addEventListener('click', (event) => {
  if (!event.target.closest('.header')) setMenuOpen(false);
});
window.matchMedia('(max-width: 1200px)').addEventListener('change', () => setMenuOpen(false));

// Shared editorial motion: one entry per element, with visible fallback content.
const editorialTargets = document.querySelectorAll('.batch-section .batch-heading, .batch-section .batch-opening, .batch-section .batch-media, .amenities .experience-title, .amenities .experience-content, .paradise .paradise-intro');
let editorialObserver;
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  editorialObserver = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting) return;
      if (!reducedMotion.matches) target.classList.add('editorial-enter');
      editorialObserver.unobserve(target);
    });
  }, { threshold: 0.08 });
  editorialTargets.forEach(element => {
    editorialObserver.observe(element);
    element.addEventListener('animationend', event => {
      if (event.target === element || event.target === element.lastElementChild) {
        element.classList.remove('editorial-enter');
      }
    });
  });
}
reducedMotion.addEventListener('change', ({ matches }) => {
  if (!matches) return;
  editorialObserver?.disconnect();
  editorialTargets.forEach(element => element.classList.remove('editorial-enter'));
});

// Suppress the mobile bar while the form is visible or being edited.
const mobileBar = document.querySelector('.mobile-conversion');
const floatingPrice = document.querySelector('.floating-price');
const mobileContact = mobileBar?.querySelector('.mobile-contact');
let formVisible = false;
const syncMobileBar = () => {
  const hidden = formVisible || !!form?.contains(document.activeElement);
  if (hidden && mobileContact) mobileContact.open = false;
  mobileBar?.classList.toggle('is-suppressed', hidden);
  if (mobileBar) mobileBar.inert = hidden;
  floatingPrice?.classList.toggle('is-suppressed', hidden);
};
if (mobileBar && form && 'IntersectionObserver' in window) {
  new IntersectionObserver(([entry]) => {
    formVisible = entry.isIntersecting;
    syncMobileBar();
  }, { rootMargin: '0px 0px 96px 0px' }).observe(form);
}
if (mobileBar && form) {
  form.addEventListener('focusin', syncMobileBar);
  form.addEventListener('focusout', () => requestAnimationFrame(syncMobileBar));
}
if (mobileContact) {
  document.addEventListener('click', event => {
    if (!mobileContact.contains(event.target)) mobileContact.open = false;
  });
  mobileContact.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      mobileContact.open = false;
      mobileContact.querySelector('summary').focus();
    }
  });
  mobileContact.addEventListener('focusout', () => requestAnimationFrame(() => {
    if (!mobileContact.contains(document.activeElement)) mobileContact.open = false;
  }));
  window.matchMedia('(max-width: 600px)').addEventListener('change', () => { mobileContact.open = false; });
}

// Pair each amenity label with its own visual; autoplay only while the gallery is visible.
const amenityGallerySets = [
  {
    root: document.querySelector('.paradise-amenities'),
    images: [
      ['assets/images/tien ich/ga-tod-ha-long-station.webp', 'Phối cảnh TOD Ga Depot Hạ Long & Outlet'],
      ['assets/images/tien ich/vinhomes-global-gate-golf.webp', 'Phối cảnh sân golf tại Vinhomes Global Gate Hạ Long'],
      ['assets/images/tien ich/be boi tren bien/be-boi-tren-bien-1.jpg', 'Phối cảnh biển hồ và bể bơi trên biển'],
      ['assets/images/tien ich/cong-vien-chu-de-vinh-binh-minh.jpg', 'Phối cảnh công viên chủ đề nội khu'],
      ['assets/images/tien ich/to-hop-am-thuc-mua-sam-giai-tri-phong-cach-trung-hoa.webp', 'Phối cảnh tổ hợp ẩm thực, mua sắm và giải trí']
    ]
  },
  {
    root: document.querySelectorAll('.experience-chapter')[0],
    images: [
      ['assets/images/tien ich/vinhome-global-gate-bien-ho-lagoon-tien-ich.jpg', 'Phối cảnh Biển hồ Lagoon'],
      ['assets/images/tien ich/cong-vien-rung-globe-ha-long-662-ha.webp', 'Phối cảnh Công viên Rừng Globe Hạ Long'],
      ['assets/images/tien ich/cong-vien-cau-ca.webp', 'Phối cảnh Công viên Câu cá Rừng ngập mặn Wonder Mangrove']
    ]
  },
  {
    root: document.querySelectorAll('.experience-chapter')[1],
    images: [
      ['assets/images/tien ich/vinhomes-global-gate-golf.webp', 'Phối cảnh quần thể sân golf'],
      ['assets/images/tien ich/nha-hat-va-san-khau-ngoai-troi.jpeg', 'Phối cảnh Wonder Theatre và sân khấu ngoài trời'],
      ['assets/images/tien ich/vin-wonder-1.jpg', 'Phối cảnh VinWonders']
    ]
  },
  {
    root: document.querySelectorAll('.experience-chapter')[2],
    images: [
      ['assets/images/tien ich/cong-vien-suc-khoe-coco-oasis-6.3-ha.jpg', 'Phối cảnh không gian chăm sóc sức khỏe'],
      ['assets/images/tien ich/cong-vien-song-vinh-binh-minh-1.jpg', 'Phối cảnh không gian sinh hoạt dành cho gia đình'],
      ['assets/images/tien ich/khu-pho-thuong-mai-vincom-collection.webp', 'Phối cảnh khu phố thương mại Vincom Collection']
    ]
  }
];

// Shared gallery controller: decode on demand, warm only the next nearby image.
const galleryImageCache = new Map();
const loadGalleryImage = (src) => {
  if (!galleryImageCache.has(src)) {
    const pending = new Promise((resolve, reject) => {
      const preload = new Image();
      preload.decoding = 'async';
      preload.fetchPriority = 'low';
      preload.onload = () => preload.decode().catch(() => {}).then(resolve);
      preload.onerror = reject;
      preload.src = src;
    }).catch(error => { galleryImageCache.delete(src); throw error; });
    galleryImageCache.set(src, pending);
  }
  return galleryImageCache.get(src);
};
const setupGallery = ({ root, images, isProgress = false }) => {
  if (!root) return;
  const figure = root.matches('figure') ? root : root.querySelector('.batch-media');
  const image = figure?.querySelector('img');
  const link = figure?.querySelector('a');
  const caption = figure?.querySelector('figcaption');
  if (!image || !link || !caption) return;
  const details = [...root.querySelectorAll('.batch-detail')];
  if (details.length) root.classList.add('interactive-amenities');
  figure.classList.add('amenity-gallery');
  figure.setAttribute('aria-roledescription', 'bộ sưu tập ảnh');
  link.classList.add('gallery-image-link');
  image.loading = 'lazy';
  image.fetchPriority = 'low';
  const controls = document.createElement('div');
  controls.className = 'gallery-controls';
  controls.setAttribute('role', 'group');
  controls.setAttribute('aria-label', 'Điều khiển bộ ảnh');
  controls.innerHTML = '<span class="amenity-gallery-count"></span><button type="button" class="gallery-play" aria-label="Tạm dừng trình chiếu">Tạm dừng</button><button type="button" class="gallery-prev" aria-label="Ảnh trước">←</button><button type="button" class="gallery-next" aria-label="Ảnh tiếp theo">→</button>';
  link.after(controls);
  const status = document.createElement('span');
  status.className = 'gallery-status';
  status.setAttribute('role', 'status');
  figure.append(status);
  const count = controls.querySelector('.amenity-gallery-count');
  const play = controls.querySelector('.gallery-play');
  const captionLink = caption.querySelector('a');
  let activeIndex = 0, requestedIndex = 0, revision = 0;
  let visible = false, near = false, interacted = false, paused = reducedMotion.matches, hovered = false;
  let timer, outgoing;
  let animations = [];
  const stop = () => { clearTimeout(timer); timer = undefined; };
  const settle = () => {
    animations.forEach(animation => animation.cancel());
    animations = [];
    outgoing?.remove();
    outgoing = undefined;
  };
  const updatePlay = () => {
    play.textContent = paused ? 'Tự chạy' : 'Tạm dừng';
    play.setAttribute('aria-label', paused ? 'Bật trình chiếu tự động' : 'Tạm dừng trình chiếu');
    play.setAttribute('aria-pressed', String(!paused));
  };
  const warmNext = () => {
    if ((!near && !interacted) || document.hidden || navigator.connection?.saveData) return;
    loadGalleryImage(images[(activeIndex + 1) % images.length][0]).catch(() => {});
  };
  const sync = () => {
    const [src, alt] = images[activeIndex];
    image.src = src;
    image.alt = alt;
    link.href = src;
    link.setAttribute('aria-label', `Phóng to ảnh: ${alt}`);
    caption.firstChild.textContent = isProgress ? `${alt}. ` : `${alt} · Hình ảnh minh họa. `;
    if (captionLink) captionLink.href = src;
    count.textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(images.length).padStart(2, '0')}`;
    details.forEach((item, index) => {
      item.classList.toggle('is-active', index === activeIndex);
      const summary = item.querySelector('summary');
      if (index === activeIndex) summary.setAttribute('aria-current', 'true');
      else summary.removeAttribute('aria-current');
    });
  };
  const start = () => {
    stop();
    if (!visible || paused || hovered || document.hidden || root.contains(document.activeElement)) return;
    timer = setTimeout(() => render((activeIndex + 1) % images.length), 5200);
  };
  const render = async (index, manual = false) => {
    requestedIndex = (index + images.length) % images.length;
    const next = requestedIndex;
    const token = ++revision;
    stop();
    if (manual) { interacted = true; paused = true; updatePlay(); }
    if (next === activeIndex) { settle(); figure.removeAttribute('aria-busy'); warmNext(); start(); return; }
    figure.setAttribute('aria-busy', 'true');
    try {
      await loadGalleryImage(images[next][0]);
      if (token !== revision) return;
      settle();
      if (!reducedMotion.matches && image.complete && image.naturalWidth) {
        outgoing = image.cloneNode();
        outgoing.classList.add('gallery-outgoing');
        outgoing.alt = '';
        outgoing.setAttribute('aria-hidden', 'true');
        link.append(outgoing);
      }
      activeIndex = next;
      sync();
      details.forEach((item, i) => { if (i !== activeIndex) item.open = false; });
      if (outgoing) {
        const options = { duration: 400, easing: 'ease-in-out' };
        animations = [outgoing.animate([{ opacity: 1 }, { opacity: 0 }], options), image.animate([{ opacity: 0 }, { opacity: 1 }], options)];
        animations[1].onfinish = settle;
      }
      if (manual) status.textContent = `Ảnh ${activeIndex + 1}/${images.length}: ${images[activeIndex][1]}`;
      warmNext();
    } catch {
      if (token === revision) {
        requestedIndex = activeIndex;
        if (manual) status.textContent = 'Chưa tải được ảnh. Vui lòng thử lại.';
      }
    } finally {
      if (token === revision) { figure.removeAttribute('aria-busy'); start(); }
    }
  };
  controls.querySelector('.gallery-prev').addEventListener('click', () => render(requestedIndex - 1, true));
  controls.querySelector('.gallery-next').addEventListener('click', () => render(requestedIndex + 1, true));
  play.addEventListener('click', () => { paused = !paused; updatePlay(); warmNext(); start(); });
  figure.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    render(requestedIndex + (event.key === 'ArrowRight' ? 1 : -1), true);
  });
  details.forEach((item, index) => item.querySelector('summary').addEventListener('click', () => {
    render(index, true);
    details.forEach(other => { if (other !== item) other.open = false; });
  }));
  root.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') { hovered = true; stop(); } });
  root.addEventListener('pointerleave', () => { hovered = false; start(); });
  root.addEventListener('focusin', stop);
  root.addEventListener('focusout', () => requestAnimationFrame(start));
  document.addEventListener('visibilitychange', start);
  reducedMotion.addEventListener('change', ({ matches }) => {
    if (matches) { paused = true; settle(); }
    updatePlay(); start();
  });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      near = entry.isIntersecting;
      if (near) { image.loading = 'eager'; warmNext(); }
    }, { rootMargin: '400px 0px' }).observe(figure);
    new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; start(); }, { threshold: 0.2 }).observe(figure);
  }
  sync();
  updatePlay();
};

amenityGallerySets.forEach(setupGallery);

const subdistricts = document.querySelector('.paradise .batch-highlights');
if (subdistricts) {
  subdistricts.insertAdjacentHTML('beforebegin', '<p class="paradise-subdistrict-label">CÁC TIỂU KHU CỦA VỊNH THIÊN ĐƯỜNG</p>');
}
document.querySelectorAll('.batch-plan .batch-detail summary').forEach((summary) => {
  if (summary.firstChild?.nodeType === Node.TEXT_NODE) summary.firstChild.nodeValue = 'Bố trí từng tầng';
});

setupGallery({
  root: document.querySelector('.progress-gallery'),
  isProgress: true,
  images: [
    ['assets/images/tien do du an/1-tien-do-du-an-thang-9.jpg', 'Ảnh tiến độ dự án tháng 9 · góc nhìn 01'],
    ['assets/images/tien do du an/2-tien-do-du-an-thang-9.jpg', 'Ảnh tiến độ dự án tháng 9 · góc nhìn 02'],
    ['assets/images/tien do du an/3-tien-do-du-an-thang-9.jpg', 'Ảnh tiến độ dự án tháng 9 · góc nhìn 03'],
    ['assets/images/tien do du an/4-tien-do-du-an-thang-9.jpg', 'Ảnh tiến độ dự án tháng 9 · góc nhìn 04'],
    ['assets/images/tien do du an/5-tien-do-du-an-thang-9.jpg', 'Ảnh tiến độ dự án tháng 9 · góc nhìn 05']
  ]
});

const setupImageLightbox = () => {
  const imageLinks = [...document.querySelectorAll('.batch-media a, .overview-image-link')].filter((link) => /\.(jpe?g|png|webp|avif|gif)$/i.test(link.getAttribute('href') || ''));
  if (!imageLinks.length) return;

  const lightbox = document.createElement('div');
  lightbox.className = 'image-lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', 'Phóng to ảnh');
  lightbox.hidden = true;
  lightbox.innerHTML = '<button class="image-lightbox-close" type="button" aria-label="Đóng ảnh phóng to">Đóng</button><img alt=""><p></p>';
  document.body.append(lightbox);

  const lightboxImage = lightbox.querySelector('img');
  const lightboxCaption = lightbox.querySelector('p');
  const closeButton = lightbox.querySelector('button');
  let lastFocusedElement;

  const openLightbox = (link) => {
    const figure = link.closest('figure');
    const sourceImage = figure?.querySelector('img') || link.querySelector('img');
    lastFocusedElement = document.activeElement;
    lightboxImage.src = link.href;
    lightboxImage.alt = sourceImage?.alt || link.getAttribute('aria-label') || 'Ảnh dự án';
    lightboxCaption.textContent = sourceImage?.alt || 'Ảnh dự án';
    lightbox.hidden = false;
    document.body.classList.add('has-open-lightbox');
    closeButton.focus();
  };
  const closeLightbox = () => {
    lightbox.hidden = true;
    lightboxImage.removeAttribute('src');
    document.body.classList.remove('has-open-lightbox');
    lastFocusedElement?.focus?.();
  };

  imageLinks.forEach((link) => {
    link.removeAttribute('target');
    link.removeAttribute('rel');
    link.addEventListener('click', (event) => {
      event.preventDefault();
      openLightbox(link);
    });
  });
  closeButton.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !lightbox.hidden) closeLightbox();
  });
};

setupImageLightbox();

// Progressive enhancement: preserve all source plans and their existing lightbox links.
const setupFloorplanSelector = () => {
  const browser = document.querySelector('.products .batch-plan-browser');
  if (!browser) return;
  const navigation = browser.querySelector('.batch-plan-tabs');
  const links = [...navigation.querySelectorAll('a')];
  const panels = links.map(link => browser.querySelector(link.hash));
  if (panels.some(panel => !panel)) return;
  const stage = document.createElement('div');
  stage.className = 'floorplan-stage';
  navigation.after(stage);
  navigation.setAttribute('role', 'tablist');
  const tabs = links.map((link, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.id = `floorplan-choice-${index}`;
    button.innerHTML = link.innerHTML;
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-controls', panels[index].id);
    link.replaceWith(button);
    const panel = panels[index];
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', button.id);
    panel.tabIndex = 0;
    stage.append(panel);
    return button;
  });
  browser.classList.add('has-floorplan-selector');
  let selected = -1;
  let animations = [];
  const settle = () => {
    animations.forEach(animation => animation.cancel());
    animations = [];
    panels.forEach((panel, index) => {
      panel.classList.remove('is-leaving');
      panel.hidden = index !== selected;
      panel.inert = index !== selected;
    });
  };
  const select = (index, animate = true) => {
    if (index === selected) return;
    settle();
    const previous = panels[selected];
    selected = index;
    panels.forEach((panel, i) => {
      panel.hidden = i !== index;
      panel.inert = i !== index;
      tabs[i].setAttribute('aria-selected', String(i === index));
      tabs[i].tabIndex = i === index ? 0 : -1;
    });
    if (!animate || !previous || reducedMotion.matches) return;
    previous.hidden = false;
    previous.classList.add('is-leaving');
    const options = { duration: 400, easing: 'ease-in-out' };
    animations = [previous.animate([{ opacity: 1 }, { opacity: 0 }], options), panels[index].animate([{ opacity: 0 }, { opacity: 1 }], options)];
    animations[1].onfinish = settle;
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(index));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      tabs[next].focus();
      select(next);
    });
  });
  const selectHash = () => {
    const index = panels.findIndex(panel => `#${panel.id}` === location.hash);
    if (index >= 0) select(index, false);
  };
  select(0, false);
  selectHash();
  window.addEventListener('hashchange', selectHash);
  reducedMotion.addEventListener('change', ({ matches }) => { if (matches) settle(); });
};
setupFloorplanSelector();
