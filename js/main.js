//nav bar 로그인&로그아웃에 따라 변경
document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem('login')==null) unloginMode();
    else loginMode();
});

function unloginMode() {
    document.getElementById('nav-login').style.display = 'initial';
    document.getElementById('nav-signup').style.display = 'initial';
    document.getElementById('nav-logout').style.display = 'none';
    document.getElementById('nav-mypage').style.display = 'none';
}
function loginMode() {
    document.getElementById('nav-login').style.display = 'none';
    document.getElementById('nav-signup').style.display = 'none';
    document.getElementById('nav-logout').style.display = 'initial';
    document.getElementById('nav-mypage').style.display = 'initial';
}
document.getElementById("nav-logout").addEventListener("click", function () {
    localStorage.removeItem('login');
    alert('로그아웃 되었습니다.')
    window.onload();
})
//end