function getLoginStorage() {
    let existingLogins = localStorage.getItem('login');
    // console.log(JSON.parse(existingLogins)[0].userid);
    return JSON.parse(existingLogins)[0].userid;
}

function getUserStorage() {
    let existingUsers = localStorage.getItem('user');
    return existingUsers;
}

function setUserStorage(userList) {
    localStorage.setItem('user', JSON.stringify(userList));
}

function getLoginUserInfo(loginId) {
    let userList = JSON.parse(getUserStorage());
    userList.forEach(element => {
        if (element.userid == loginId) {
            document.querySelector('#userid').innerHTML = element.userid;
            document.querySelector('#name').innerHTML = element.name;
            document.querySelector('#email').innerHTML = element.email;
            document.querySelector('#city').innerHTML = element.city;
            document.querySelector('#gender').innerHTML = element.gender;
        }
    })
}

getLoginUserInfo(getLoginStorage())

let deleteuser = document.querySelector('#deleteuser');
deleteuser.addEventListener('click', function () {
    let dindex;
    let userList = JSON.parse(getUserStorage());
    console.log(userList);
    userList.forEach((element, index) => {
        if (element.userid == getLoginStorage()) {
            dindex = index;
            return false;
        }
    })
    userList.splice(dindex, 1);
    console.log(userList);
    setUserStorage(userList);
    localStorage.removeItem('login');
    alert("회원 탈퇴가 성공적으로 완료되었습니다!");
    window.location.href = "../html/main.html"
})

let updateuser = document.querySelector('#updateuser');
updateuser.addEventListener('click', function () {
    window.location.href = './infoupdate.html';
})

document.getElementById("nav-logout").addEventListener("click", function () {
    localStorage.removeItem('login');
    alert('로그아웃 되었습니다.');
    window.location.href = "../html/main.html"
})