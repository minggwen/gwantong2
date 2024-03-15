//글 작성 버튼을 누르면 board 로컬 스토리지에 작성한 글을 추가하는 로직 완성해줫으면 좋겠다

// document.getElementById("enroll").addEventListener("click", function () {
//     var boards = [];
//     var boards = JSON.parse(localStorage.getItem("board"));
//     var write = [];
//     var title = document.getElementById('title-field').value;
//     var content = document.getElementById('content-field').value;
//     var id = localStorage.getItem('login').id;
//     write.push(title);
//     write.push(content);
//     write.push(id);
//     boards.push(boards);
    
//     alert("글 작성이 완료 되었습니다!");
// });
document.addEventListener('DOMContentLoaded', function() {
    const enrollButton = document.getElementById('enroll');
    const queryParams = getQueryParams();
    const isEditing = queryParams.id !== undefined;

    enrollButton.addEventListener('click', function(e) {
        e.preventDefault();
        const title = document.getElementById('title-field').value;
        const content = document.getElementById('content-field').value;
        let posts = JSON.parse(localStorage.getItem('posts')) || [];

        if (isEditing) {
            // 수정 모드
            const postId = queryParams.id;
            const postIndex = posts.findIndex(post => post.id.toString() === postId);
            if (postIndex !== -1) {
                posts[postIndex].title = title;
                posts[postIndex].content = content;
                posts[postIndex].updatedAt = new Date().toISOString(); // 수정 시간 업데이트
                alert('글이 수정되었습니다.');
            }
        } else {
            // 새 글 작성 모드
            const postId = Date.now(); // 유니크한 ID 생성
            const currentTime = new Date().toISOString(); // 현재 시간을 ISO 8601 형식의 문자열로 변환
            const post = { id: postId, title: title, content: content, createdAt: currentTime };
            posts.push(post);
            alert('글이 등록되었습니다.');
        }

        localStorage.setItem('posts', JSON.stringify(posts));
        window.location.href = '../html/board.html'; // 게시판 페이지로 리다이렉트
    });
});

// URL에서 쿼리 파라미터를 파싱하는 함수
function getQueryParams() {
    const queryParams = {};
    const urlSearchParams = new URLSearchParams(window.location.search);
    for (const [key, value] of urlSearchParams.entries()) {
        queryParams[key] = value;
    }
    return queryParams;
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', function() {
    const queryParams = getQueryParams();
    if (queryParams.id) {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const post = posts.find(post => post.id.toString() === queryParams.id);
        if (post) {
            document.getElementById('title-field').value = post.title;
            document.getElementById('content-field').value = post.content;
        }
    }
    // 기존에 작성된 'enroll' 버튼 이벤트 리스너 코드는 여기에 포함됩니다.
});