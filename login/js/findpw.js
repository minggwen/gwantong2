function getLoginStorage() {
    let existingLogins = localStorage.getItem('login');
    // console.log(JSON.parse(existingLogins)[0].userid);
    return JSON.parse(existingLogins)[0].userid;
}

function getUserStorage() {
    let existingUsers = localStorage.getItem('user');
    return existingUsers;
}

let findbtn = document.querySelector('#findbtn');
findbtn.addEventListener('click', function () {
    let pw;
    let id = document.querySelector('#findpwid').value;
    let userList = JSON.parse(getUserStorage());
    console.log(userList);
    userList.forEach((element, index) => {
        if (element.userid == id) {
            pw = element.password;
            console.log(id);
            console.log(pw);
            return false;
        }
    })
    alert("비밀번호는 " + pw + " 입니다.");
})