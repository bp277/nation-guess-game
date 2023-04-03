function isFirstVisitToday() {
    const today = new Date().toLocaleDateString();
    let lastVisitDate = localStorage.getItem("lastVisitDate");
    if (!lastVisitDate) {
      lastVisitDate = document.cookie.replace(
        /(?:(?:^|.*;\s*)lastVisitDate\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      localStorage.setItem("lastVisitDate", lastVisitDate);
    }
    if (lastVisitDate !== today) {
      document.cookie = `lastVisitDate=${today}; max-age=86400; path=/`;
      localStorage.setItem("lastVisitDate", today);
      return true;
    }
    return false;
  }

  if (isFirstVisitToday()) {
    localStorage.clear();
  }