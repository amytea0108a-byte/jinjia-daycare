// 【請修改】接收預約的 Email（目前為範例信箱）
const CONTACT_EMAIL = "example@example.com";

// 捲動淡入
document.documentElement.classList.add("js");
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add("show"); io.unobserve(en.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// 全螢幕選單開關
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
menuBtn.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
menu.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    menu.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  })
);

// 預約參觀：組合內容後開啟郵件程式
document.getElementById("visitForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  const body =
    `家屬姓名：${f.get("name")}\n` +
    `聯絡電話：${f.get("phone")}\n` +
    `希望參觀日期：${f.get("date") || "未填"}\n` +
    `詢問內容：${f.get("note") || "無"}`;
  location.href =
    `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("【預約參觀】" + f.get("name"))}` +
    `&body=${encodeURIComponent(body)}`;
});
