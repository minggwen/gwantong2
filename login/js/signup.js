function getUserStorage() {
    let existingUsers = localStorage.getItem('user');
    return existingUsers;
}

function setUserStorage(userList) {
    localStorage.setItem('user', JSON.stringify(userList));
}

function makeObj() {

    let User = {};
    let infos = ['userid', 'password', 'name', 'email', 'city', 'gender'];
    
    let userId = document.querySelector('#inputUsername');
    let passWord = document.querySelector('#inputPassword');
    let name = document.querySelector('#name');
    let email = document.querySelector('#inputEmail');
    let city = document.querySelector('#inputCity');
    let gender = document.querySelector('#inputGender');
    
    User['userid'] = userId.value;
    User['password'] = passWord.value;
    User['name'] = name.value;
    User['email'] = email.value;
    User['city'] = city.value;
    User['gender'] = gender.value;

    return User;
}

function saveUserInfo(userObj) {
    let existingUsers = getUserStorage();
    let userList = existingUsers ? JSON.parse(existingUsers) : [];
    userList.push(userObj);
    setUserStorage(userList);
    alert("회원가입이 완료되었습니다!!!");
}

const signup = document.querySelector(".btn");
signup.addEventListener('click', function () {
    let flag = 1;
    let userObj = makeObj();
    console.log(userObj)
    Object.keys(userObj).forEach(k => {
        if (userObj[k] == '') {
            alert(k + "을(를) 입력해주세요.");
            flag = 0;
        }
    });
    if (flag == 1) {
        saveUserInfo(userObj);
    }
})

