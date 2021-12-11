function convertTZ(date, tzString) {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", { timeZone: tzString }));
}

const requestCommentAPI = (e) => {
    if (e.keyCode === 13 && !e.shiftKey && e.target.value !== '') {
        const userId = document.getElementById('comment-user-id');
        const productId = document.getElementById('comment-product-id');
        const lastName = document.getElementById('comment-user-lastName').getAttribute('name');
        const url = window.location.origin + `/api/comment/${productId.getAttribute('name')}`;

        const newComment = {
            userID: userId.getAttribute('name'),
            content: e.target.value.trim(),
            lastName,
        };


        fetch(url, {
            method: 'POST',
            body: JSON.stringify(newComment),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error === 0) {
                    const commentList = document.querySelector('.comment-block .comment-list')
                    const commentLength = document.querySelector('.comment-block .comment-title')
                    const today = convertTZ(new Date(), "Asia/Bangkok")
                    const month = today.getMonth() + 1;
                    const createDate = today.getDate() + '/' + month + '/' + today.getFullYear();

                    const appendComment = `<li class="comment-section">
                    <div class="comment-user-name">${lastName}<i class="comment-user-time">( ${createDate} )</i></div>
                    <div class="comment-user-content">${newComment.content}</div>
                    </li>`

                    commentList.innerHTML = appendComment + commentList.innerHTML;

                    let len = parseInt(commentLength.innerText.substring(commentLength.innerText.indexOf('(') + 1, commentLength.innerText.indexOf(')'))) + 1
                    commentLength.innerText = `Comments (${len})`;
                } else {
                    const commentError = document.getElementById('comment-error');
                    commentError.innerText = 'Fail to post comment. Please try again'
                    setTimeout(() => commentError.innerText, 3000);
                }
            })
            .then(e.target.value = '')
            .catch(err => console.log(err))
    }
}