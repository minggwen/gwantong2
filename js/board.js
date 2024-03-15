document.addEventListener('DOMContentLoaded', function() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const tableBody = document.querySelector('.table tbody');

    console.log(posts)

    posts.forEach(post => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <th scope="row">${post.id}</th>
            <td>${post.title}</td>
            <td>작성자</td>
            <td>${post.createdAt}</td> <!-- 작성 시간 표시 -->
            <td><a href="../html/board_write.html?id=${post.id}">수정</a></td>
            <td><button class="delete-btn" data-id="${post.id}">삭제</button></td>
            <td><a href="../html/board_detail.html?id=${post.id}">자세히 보기</a></td>
        `;
        tableBody.appendChild(row);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.querySelector('.table tbody');

    tableBody.addEventListener('click', function(e) {
        if (e.target.classList.contains('delete-btn')) {
            const postId = e.target.getAttribute('data-id');
            let posts = JSON.parse(localStorage.getItem('posts')) || [];
            posts = posts.filter(post => post.id.toString() !== postId);
            localStorage.setItem('posts', JSON.stringify(posts));
            window.location.reload(); // 페이지 새로고침
        }
    });
});
