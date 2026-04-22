const mainNav = document.querySelector(".ref-main-nav");
const submenuPanel = document.querySelector(".ref-submenu-panel");
const submenuRow = submenuPanel?.querySelector(".ref-sub-row");
const SUBMENU_STORAGE_KEY = "yadam-active-menu";
const MAIN_SWITCH_CLOSE_MS = 170;
const MAIN_SWITCH_OPEN_MS = 200;
const SUBMENU_CLICK_CLOSE_MS = 2000;
const SUBMENU_SHIFT_PX = -10;

const submenuMap = {
  about: [
    { label: "인사말", href: "./about.html#intro" },
    { label: "비전", href: "./about.html#vision" },
    { label: "섬기는 사람", href: "./about.html#leaders" },
    { label: "예배시간", href: "./about.html#worship" },
  ],
  ministries: [
    { label: "주일사역", href: "./ministries.html#sunday" },
    { label: "다음세대", href: "./ministries.html#nextgen" },
    { label: "선교/봉사", href: "./ministries.html#mission" },
    { label: "새가족", href: "./ministries.html#newcomer" },
  ],
  news: [
    { label: "공지사항", href: "./news.html#notice" },
    { label: "행사일정", href: "./news.html#events" },
    { label: "주보/알림", href: "./news.html#bulletin" },
  ],
  gallery: [
    { label: "예배사진", href: "./gallery.html#worship" },
    { label: "행사사진", href: "./gallery.html#events" },
    { label: "아카이브", href: "./gallery.html#archive" },
  ],
  contact: [
    { label: "일반문의", href: "./contact.html#general" },
    { label: "기도요청", href: "./contact.html#prayer" },
    { label: "새가족등록", href: "./contact.html#newcomer" },
  ],
};

if (mainNav && submenuPanel && submenuRow) {
  const mainLinks = mainNav.querySelectorAll("a");
  let activeMenuKey = "about";
  let transitionToken = 0;
  let pendingNavigationHref = null;
  let activeAnimation = null;

  function getCurrentVisualState() {
    const styles = window.getComputedStyle(submenuRow);
    const opacity = Number.parseFloat(styles.opacity) || 0;
    const matrix = new DOMMatrix(styles.transform === "none" ? undefined : styles.transform);
    return {
      opacity,
      y: Number.isFinite(matrix.m42) ? matrix.m42 : (opacity > 0.5 ? 0 : SUBMENU_SHIFT_PX),
    };
  }

  function stopAnimation() {
    if (!activeAnimation) return;
    activeAnimation.cancel();
    activeAnimation = null;
  }

  function setLogicalOpen(isOpen) {
    if (isOpen) {
      document.body.classList.add("submenu-open");
    } else {
      document.body.classList.remove("submenu-open");
    }
  }

  function animateTo(isOpen, duration) {
    const from = getCurrentVisualState();
    const toOpacity = isOpen ? 1 : 0;
    const toY = isOpen ? 0 : SUBMENU_SHIFT_PX;
    const isNearlySame =
      Math.abs(from.opacity - toOpacity) < 0.01 && Math.abs(from.y - toY) < 0.5;

    if (isOpen) setLogicalOpen(true);
    stopAnimation();

    if (isNearlySame) {
      submenuRow.style.opacity = String(toOpacity);
      submenuRow.style.transform = `translateY(${toY}px)`;
      if (!isOpen) setLogicalOpen(false);
      return Promise.resolve();
    }

    activeAnimation = submenuRow.animate(
      [
        { opacity: from.opacity, transform: `translateY(${from.y}px)` },
        { opacity: toOpacity, transform: `translateY(${toY}px)` },
      ],
      { duration, easing: "ease", fill: "forwards" }
    );

    return activeAnimation.finished
      .catch(() => undefined)
      .then(() => {
        submenuRow.style.opacity = String(toOpacity);
        submenuRow.style.transform = `translateY(${toY}px)`;
        if (!isOpen) setLogicalOpen(false);
        if (activeAnimation?.playState === "finished") activeAnimation = null;
      });
  }

  function renderSubmenu(menuKey) {
    const items = submenuMap[menuKey] || submenuMap.about;
    submenuRow.innerHTML = items.map((item) => `<a href="${item.href}">${item.label}</a>`).join("");
  }

  function setActiveMainLink(activeLink) {
    mainLinks.forEach((link) => link.classList.remove("is-active"));
    activeLink.classList.add("is-active");
  }

  async function runMainMenuSwitch(menuKey) {
    transitionToken += 1;
    const localToken = transitionToken;
    pendingNavigationHref = null;

    if (menuKey === activeMenuKey) {
      await animateTo(true, MAIN_SWITCH_OPEN_MS);
      return;
    }

    await animateTo(false, MAIN_SWITCH_CLOSE_MS);
    if (localToken !== transitionToken) return;
    renderSubmenu(menuKey);
    await animateTo(true, MAIN_SWITCH_OPEN_MS);
  }

  function runSubmenuNavigation(href) {
    transitionToken += 1;
    pendingNavigationHref = href;
    const localToken = transitionToken;

    animateTo(false, SUBMENU_CLICK_CLOSE_MS).then(() => {
      if (localToken !== transitionToken) return;
      if (!pendingNavigationHref) return;
      window.location.href = pendingNavigationHref;
    });
  }

  const initialMenuKey = window.sessionStorage.getItem(SUBMENU_STORAGE_KEY) || "about";
  activeMenuKey = submenuMap[initialMenuKey] ? initialMenuKey : "about";
  renderSubmenu(activeMenuKey);
  setLogicalOpen(false);
  submenuRow.style.opacity = "0";
  submenuRow.style.transform = `translateY(${SUBMENU_SHIFT_PX}px)`;

  const firstMain = mainNav.querySelector(`a[data-menu="${activeMenuKey}"]`);
  if (firstMain) firstMain.classList.add("is-active");

  mainLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const menuKey = link.dataset.menu || "about";
      activeMenuKey = menuKey;
      window.sessionStorage.setItem(SUBMENU_STORAGE_KEY, activeMenuKey);
      setActiveMainLink(link);
      runMainMenuSwitch(menuKey);
    });
  });

  mainNav.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  submenuPanel.addEventListener("click", (event) => {
    event.stopPropagation();
    const submenuLink = event.target.closest("a");
    if (!submenuLink) return;
    event.preventDefault();
    const href = submenuLink.getAttribute("href");
    if (!href) return;
    runSubmenuNavigation(href);
  });

  document.addEventListener("click", () => {
    transitionToken += 1;
    pendingNavigationHref = null;
    animateTo(false, MAIN_SWITCH_CLOSE_MS);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    transitionToken += 1;
    pendingNavigationHref = null;
    animateTo(false, MAIN_SWITCH_CLOSE_MS);
  });
}
