function isFirstVisitToday() {
  const today = new Date().toLocaleDateString();
  let lastVisitDate = localStorage.getItem("lastVisitDate");
  if (!lastVisitDate) {
    lastVisitDate = today;
    localStorage.setItem("lastVisitDate", lastVisitDate);
  }
  if (lastVisitDate !== today) {
    localStorage.setItem("lastVisitDate", today);
    return true;
  }
  return false;
}

if (isFirstVisitToday()) {
  localStorage.clear();
}