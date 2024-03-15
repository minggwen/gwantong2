function getUserStorage() {
    let existingUsers = localStorage.getItem('user');
    return existingUsers;
}

function getLoginStorage() {
    let existingLogins = localStorage.getItem('login');
    return existingLogins;
}

function setLoginStorage(loginList) {
    localStorage.setItem('login', JSON.stringify(loginList));
}

function saveLoginInfo(loginId) {
    let existingLogins = getLoginStorage();
    let loginList = existingLogins ? JSON.parse(existingLogins) : [];
    let loginObj = {};
    loginObj['userid'] = loginId;
    loginList.push(loginObj);
    setLoginStorage(loginList);
    window.location.href = "../html/main.html"
}

const signup = document.querySelector("#login");
signup.addEventListener('click', function () {
    let ID = 0;
    let PW = 0;
    let loginId = document.querySelector('#username').value;
    let loginPassWord = document.querySelector('#password').value;
    let userList = JSON.parse(getUserStorage())
    //console.log(userList);
    userList.forEach(element => {
        console.log(element.userid);
        if (element.userid == loginId) {
            ID = 1;
            if (element.password == loginPassWord) {
                PW = 1;
            }
        }
    });

    if (ID == 1 && PW == 1) {
        saveLoginInfo(loginId);
    }
    else if (ID == 1 && PW == 0) {
        alert("비밀번호가 올바르지 않습니다!");
    }
    else {
        alert("등록되지 않은 아이디입니다!")
    }
})

function findpw() {
    window.open("findpw.html", "비밀번호 찾기", "width=600, height=600, top=10, left=10")
}