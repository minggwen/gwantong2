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

let updatebtn = document.querySelector('#updatebtn');
updatebtn.addEventListener('click', function () {
    let uindex;
    let userList = JSON.parse(getUserStorage());
    console.log(userList);
    userList.forEach((element, index) => {
        if (element.userid == getLoginStorage()) {
            let nPassword = document.querySelector('#newPassword').value;
            let nEmail = document.querySelector('#newEmail').value;
            let nCity = document.querySelector('#newCity').value;
            let nGender = document.querySelector('#newGender').value;

            element.password = nPassword;
            element.email = nEmail;
            element.city = nCity;
            element.gender = nGender;
            return false;
        }
    });

    setUserStorage(userList);
    alert("회원정보 변경이 완료되었습니다!!!");
    window.location.href = './mypage.html';
})