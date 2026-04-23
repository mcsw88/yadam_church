(() => {
  const root = document.querySelector(".ref-header");
  if (!root) return;

  const mainNav = root.querySelector(".ref-main-nav");
  const submenuPanel = document.querySelector(".ref-submenu-panel");
  const submenuRow = submenuPanel?.querySelector(".ref-sub-row");
  if (!mainNav || !submenuPanel || !submenuRow) return;

  const OPEN_MS = 220;
  const CLOSE_MS = 2000;
  const SUBMENU_CLICK_FEEDBACK_MS = 80;
  const SUBMENU_SHIFT_PX = -10;
  const mainLinks = Array.from(mainNav.querySelectorAll("a[data-menu]"));

  const submenuMap = {
    about: [
      { label: "인사말", href: "./about.html#intro" },
      { label: "교회비전", href: "./about.html#vision" },
      { label: "섬기는 사람들", href: "./about.html#leaders" },
      { label: "예배시간", href: "./about.html#worship" },
    ],
    ministries: [
      { label: "주일사역", href: "./ministries.html#sunday" },
      { label: "다음세대", href: "./ministries.html#nextgen" },
      { label: "선교/봉사", href: "./ministries.html#mission" },
      { label: "새가족", href: "./ministries.html#newcomer" },
    ],
    news: [
      { label: "공지사항", href: "./notice.html" },
      { label: "행사", href: "./news.html" },
    ],
    gallery: [{ label: "행사사진", href: "./gallery.html#events" }],
    contact: [{ label: "익명 자유게시판", href: "./post.html?type=news&id=news-2026-0421" }],
  };

  function getMenuKeyFromPathname(pathname) {
    const page = pathname.split("/").pop() || "index.html";
    const routeMap = {
      "index.html": "about",
      "about.html": "about",
      "ministries.html": "ministries",
      "news.html": "news",
      "notice.html": "news",
      "gallery.html": "gallery",
      "post.html": "news",
      "contact.html": "contact",
      "location.html": "contact",
    };
    return routeMap[page] || "about";
  }

  function getVisualState() {
    const styles = window.getComputedStyle(submenuRow);
    const opacity = Number.parseFloat(styles.opacity) || 0;
    const matrix = new DOMMatrix(styles.transform === "none" ? undefined : styles.transform);
    return {
      opacity,
      y: Number.isFinite(matrix.m42) ? matrix.m42 : SUBMENU_SHIFT_PX,
    };
  }

  let activeMenuKey = submenuMap[getMenuKeyFromPathname(window.location.pathname)] ? getMenuKeyFromPathname(window.location.pathname) : "about";
  let activeAnimation = null;
  let animationToken = 0;
  let navToken = 0;

  function stopAnimation() {
    if (!activeAnimation) return;
    activeAnimation.cancel();
    activeAnimation = null;
  }

  function setOpenState(isOpen) {
    submenuPanel.classList.toggle("is-open", isOpen);
  }

  function animateTo({ open, duration }) {
    animationToken += 1;
    const localAnimationToken = animationToken;
    const toOpacity = open ? 1 : 0;
    const toY = open ? 0 : SUBMENU_SHIFT_PX;
    const from = getVisualState();
    const isSame =
      Math.abs(from.opacity - toOpacity) < 0.01 && Math.abs(from.y - toY) < 0.5;

    if (open) setOpenState(true);
    stopAnimation();

    if (isSame) {
      submenuRow.style.opacity = String(toOpacity);
      submenuRow.style.transform = `translateY(${toY}px)`;
      if (!open) setOpenState(false);
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
        if (localAnimationToken !== animationToken) return;
        submenuRow.style.opacity = String(toOpacity);
        submenuRow.style.transform = `translateY(${toY}px)`;
        if (!open) setOpenState(false);
        if (activeAnimation?.playState === "finished") activeAnimation = null;
      });
  }

  function renderSubmenu(menuKey) {
    const items = submenuMap[menuKey] || [];
    submenuRow.innerHTML = items
      .map((item) => `<a href="${item.href}">${item.label}</a>`)
      .join("");
  }

  function setActiveMain(menuKey) {
    mainLinks.forEach((link) => {
      const isActive = (link.dataset.menu || "") === menuKey;
      link.classList.toggle("is-active", isActive);
    });
  }

  function openMenu(menuKey) {
    navToken += 1;
    activeMenuKey = menuKey;
    renderSubmenu(menuKey);
    setActiveMain(menuKey);
    animateTo({ open: true, duration: OPEN_MS });
  }

  function closeMenu() {
    navToken += 1;
    animateTo({ open: false, duration: CLOSE_MS });
  }

  function handleSubmenuNavigation(href) {
    const localToken = navToken + 1;
    navToken = localToken;
    animateTo({ open: false, duration: SUBMENU_CLICK_FEEDBACK_MS });
    window.setTimeout(() => {
      if (navToken !== localToken) return;
      window.location.href = href;
    }, SUBMENU_CLICK_FEEDBACK_MS);
  }

  renderSubmenu(activeMenuKey);
  setActiveMain(activeMenuKey);
  setOpenState(false);
  submenuRow.style.opacity = "0";
  submenuRow.style.transform = `translateY(${SUBMENU_SHIFT_PX}px)`;

  mainLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const menuKey = link.dataset.menu || "about";
      if (!submenuMap[menuKey]) return;

      if (menuKey === activeMenuKey && submenuPanel.classList.contains("is-open")) {
        closeMenu();
        return;
      }
      openMenu(menuKey);
    });
  });

  submenuPanel.addEventListener("click", (event) => {
    event.stopPropagation();
    const link = event.target.closest("a[href]");
    if (!link) return;
    event.preventDefault();
    const href = link.getAttribute("href");
    if (!href) return;
    handleSubmenuNavigation(href);
  });

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (target.closest(".ref-header") || target.closest(".ref-submenu-panel")) return;
    closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
})();

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderBoardRows(targetEl, items) {
  if (!targetEl) return;
  targetEl.innerHTML = items
    .map(
      (item) => `
      <li class="board-row">
        <a class="board-title-link" href="${item.detailHref}" title="${escapeHtml(item.title)}">${escapeHtml(item.title)}</a>
        <time class="board-date" datetime="${item.date}">${item.date}</time>
      </li>
    `
    )
    .join("");
}

function initializeHomeBoards() {
  const contentApi = window.YedamContent;
  if (!contentApi) return;

  const boardSections = document.querySelectorAll("[data-home-board]");
  boardSections.forEach((section) => {
    const type = section.getAttribute("data-board-type");
    if (!type) return;

    const meta = contentApi.boardMeta[type];
    const titleEl = section.querySelector("[data-board-title]");
    const moreEl = section.querySelector("[data-board-more]");
    const listEl = section.querySelector("[data-board-list]");
    const limit = Number.parseInt(section.getAttribute("data-board-limit") || "5", 10);
    const items = contentApi.getPostsByType(type, Number.isNaN(limit) ? 5 : limit);

    if (titleEl && meta) titleEl.textContent = meta.label;
    if (moreEl && meta) moreEl.setAttribute("href", meta.listPage);
    renderBoardRows(listEl, items);
  });
}

function renderHomeTableRows(targetEl, items) {
  if (!targetEl) return;
  targetEl.innerHTML = items
    .map(
      (item) => `
      <li class="home-board-item">
        <a class="board-title-link" href="${item.detailHref}" title="${escapeHtml(item.title)}">${escapeHtml(item.title)}</a>
        <time class="board-date" datetime="${item.date}">${item.date}</time>
      </li>
    `
    )
    .join("");
}

function initializeHomeBoardTable() {
  const contentApi = window.YedamContent;
  const tableRoot = document.querySelector("[data-home-board-table]");
  if (!contentApi || !tableRoot) return;

  const limit = Number.parseInt(tableRoot.getAttribute("data-board-limit") || "5", 10);
  const safeLimit = Number.isNaN(limit) ? 5 : limit;
  const noticeMeta = contentApi.boardMeta.notice;
  const newsMeta = contentApi.boardMeta.news;
  const noticeItems = contentApi.getPostsByType("notice", safeLimit);
  const newsItems = contentApi.getPostsByType("news", safeLimit);
  const noticeTitle = tableRoot.querySelector('[data-board-title="notice"]');
  const newsTitle = tableRoot.querySelector('[data-board-title="news"]');
  const noticeMore = tableRoot.querySelector('[data-board-more="notice"]');
  const newsMore = tableRoot.querySelector('[data-board-more="news"]');
  const noticeBody = tableRoot.querySelector('[data-home-board-body="notice"]');
  const newsBody = tableRoot.querySelector('[data-home-board-body="news"]');

  if (noticeTitle && noticeMeta) noticeTitle.textContent = noticeMeta.label;
  if (newsTitle && newsMeta) newsTitle.textContent = newsMeta.label;
  if (noticeMore && noticeMeta) noticeMore.setAttribute("href", noticeMeta.listPage);
  if (newsMore && newsMeta) newsMore.setAttribute("href", newsMeta.listPage);

  renderHomeTableRows(noticeBody, noticeItems);
  renderHomeTableRows(newsBody, newsItems);
}

function initializeListBoards() {
  const contentApi = window.YedamContent;
  if (!contentApi) return;

  const boardSections = document.querySelectorAll("[data-list-board]");
  boardSections.forEach((section) => {
    const type = section.getAttribute("data-board-type");
    if (!type) return;

    const meta = contentApi.boardMeta[type];
    const titleEl = section.querySelector("[data-list-title]");
    const listEl = section.querySelector("[data-board-list]");
    const items = contentApi.getPostsByType(type);

    if (titleEl && meta) titleEl.textContent = meta.label;
    renderBoardRows(listEl, items);
  });
}

function initializePostDetail() {
  const detailRoot = document.querySelector("[data-post-detail]");
  const contentApi = window.YedamContent;
  if (!detailRoot || !contentApi) return;

  const params = new URLSearchParams(window.location.search);
  const type = params.get("type");
  const id = params.get("id");
  const titleEl = detailRoot.querySelector("[data-post-title]");
  const dateEl = detailRoot.querySelector("[data-post-date]");
  const bodyEl = detailRoot.querySelector("[data-post-body]");
  const listLink = detailRoot.querySelector("[data-post-list-link]");
  const meta = type ? contentApi.boardMeta[type] : null;
  const post = type && id ? contentApi.getPostById(type, id) : null;

  if (meta && listLink) {
    listLink.textContent = `${meta.label} 목록`;
    listLink.setAttribute("href", meta.listPage);
  }

  if (!post) {
    if (titleEl) titleEl.textContent = "게시글을 찾을 수 없습니다.";
    if (dateEl) dateEl.textContent = "";
    if (bodyEl) {
      bodyEl.textContent = "요청하신 게시글이 없거나 주소가 올바르지 않습니다.";
    }
    return;
  }

  if (titleEl) titleEl.textContent = post.title;
  if (dateEl) dateEl.textContent = post.date;
  if (bodyEl) {
    bodyEl.textContent = "상세 본문은 향후 관리자 연동 시 데이터 소스에서 불러오도록 연결됩니다.";
  }
}

initializeHomeBoards();
initializeHomeBoardTable();
initializeListBoards();
initializePostDetail();
