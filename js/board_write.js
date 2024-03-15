//글 작성 버튼을 누르면 board 로컬 스토리지에 작성한 글을 추가하는 로직 완성해줫으면 좋겠다

document.getElementById("enroll").addEventListener("click", function () {
    var boards = [];
    var boards = JSON.parse(localStorage.getItem("board"));
    var write = [];
    var title = document.getElementById('title-field').value;
    var content = document.getElementById('content-field').value;
    var id = localStorage.getItem('login').id;
    write.push(title);
    write.push(content);
    write.push(id);
    boards.push(boards);
    
    alert("글 작성이 완료 되었습니다!");
});
