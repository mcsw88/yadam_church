const mainNav = document.querySelector(".ref-main-nav");
const submenuPanel = document.querySelector(".ref-submenu-panel");
const submenuRow = submenuPanel?.querySelector(".ref-sub-row");
const SUBMENU_STORAGE_KEY = "yadam-active-menu";

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

function openSubmenu() {
  document.body.classList.add("submenu-open");
}

function closeSubmenu() {
  document.body.classList.remove("submenu-open");
}

if (mainNav && submenuPanel) {
  const mainLinks = mainNav.querySelectorAll("a");
  let activeMenuKey = "about";

  function renderSubmenu(menuKey) {
    if (!submenuRow) return;
    const items = submenuMap[menuKey] || submenuMap.about;
    submenuRow.innerHTML = items
      .map((item) => `<a href="${item.href}">${item.label}</a>`)
      .join("");
  }

  function switchSubmenu(menuKey) {
    if (menuKey === activeMenuKey) {
      openSubmenu();
      return;
    }
    // Hover-out -> hover-in 느낌으로: 먼저 닫히고, 내용 교체 후 다시 열기
    closeSubmenu();
    window.setTimeout(() => {
      renderSubmenu(menuKey);
      openSubmenu();
    }, 280);
  }

  function setActiveMainLink(activeLink) {
    mainLinks.forEach((link) => link.classList.remove("is-active"));
    activeLink.classList.add("is-active");
  }

  const initialMenuKey =
    window.sessionStorage.getItem(SUBMENU_STORAGE_KEY) || "about";
  activeMenuKey = submenuMap[initialMenuKey] ? initialMenuKey : "about";
  renderSubmenu(activeMenuKey);
  const firstMain = mainNav.querySelector(`a[data-menu="${activeMenuKey}"]`);
  if (firstMain) firstMain.classList.add("is-active");

  mainLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      // Top menu is opener-only, never navigate directly.
      event.preventDefault();
      event.stopPropagation();
      const menuKey = link.dataset.menu || "about";
      switchSubmenu(menuKey);
      activeMenuKey = menuKey;
      window.sessionStorage.setItem(SUBMENU_STORAGE_KEY, activeMenuKey);
      setActiveMainLink(link);
    });
  });

  mainNav.addEventListener("click", (event) => {
    event.stopPropagation();
    openSubmenu();
  });

  submenuPanel.addEventListener("click", (event) => {
    event.stopPropagation();
    const submenuLink = event.target.closest("a");
    if (submenuLink) {
      openSubmenu();
    }
  });

  document.addEventListener("click", closeSubmenu);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeSubmenu();
  });
}
