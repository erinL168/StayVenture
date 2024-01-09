document.addEventListener('DOMContentLoaded', () => {
    // Extract property ID from URL
    const propertyId = new URLSearchParams(window.location.search).get('id');
    console.log(propertyId)
    // Elements in the DOM
    const titleElement = document.querySelector('.property-title');
    const priceElement = document.querySelector('.price');
    const addressElement = document.querySelector('.address');
    const descElement = document.querySelector('.desc');
    const deleteForm = document.getElementById('delete-form');

    fetchComments(propertyId)

    fetch(`/properties/${propertyId}`)
    .then(response => response.json())
    .then(property => {
        // Populate the DOM with the property data
        titleElement.innerText = `${property.title} in ${property.city}, ${property.country}`;
        priceElement.innerText = `$${property.price}/per night`;
        addressElement.innerText = property.address;
        descElement.innerText = property.description;
        deleteForm.action = `/${property._id}`;
        document.getElementById('property-image').src = `/properties/${property._id}/picture`;
        // document.getElementById('property-image').src = property.images[0].path;
        
        // // Previous and next buttons for images
        // let currentImageIndex = 0;
        // document.getElementById('prev-arrow').addEventListener('click', () => {
        //     currentImageIndex = (currentImageIndex - 1 + property.images.length) % property.images.length;
        //     document.getElementById('property-image').src = property.images[currentImageIndex].path;
        // });
        // document.getElementById('next-arrow').addEventListener('click', () => {
        //     currentImageIndex = (currentImageIndex + 1) % property.images.length;
        //     document.getElementById('property-image').src = property.images[currentImageIndex].path;
        // });
    })
    .catch(error => {
        console.error('Error:', error);
    });

    // Handle delete button click
    const deleteBtn = document.getElementById('delete-btn');
    deleteBtn.addEventListener('click', () => {
        fetch(deleteForm.action, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        })
        .then(response => {
            if (response.status === 200) {
                console.log('Property deleted successfully.');
                window.location.href = '/';
            } else {
                console.error('Error deleting property.');
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
    });

        // 显示评论的函数
    function displayComments(comments) {
        const commentsContainer = document.getElementById('comments-container');
        commentsContainer.innerHTML = ''; // 清空现有评论

        comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.className = 'comment';
            commentElement.innerHTML = `
              
                    <p class='comments-username'>
                        ${comment.username}
                    </p>
                    <p class='comments-rating'>
                        ⭐️ ${comment.rating}
                    </p>
                    <p class='comments-message'>
                        ${comment.message}
                    </p>
            `;
            commentsContainer.appendChild(commentElement);
        });
    }

    function fetchComments(propertyId) {
        fetch(`/properties/${propertyId}/comments`)
        .then(response => response.json())
        .then(data => {
            if (data && data.comments) {
                displayComments(data.comments);
            }
        })
        .catch(error => console.error('Error:', error));
    }



    document.getElementById('comment-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const propertyId = new URLSearchParams(window.location.search).get('id');
        const username = document.getElementById('username').value;
        const rating = document.getElementById('rating').value;
        const message = document.getElementById('message').value;

        fetch(`/properties/${propertyId}/comment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, rating, message })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // TODO: 更新页面上的评论列表
            displayComments(data.comments); // 假设响应包含更新后的评论列表
                // 清空表单
            document.getElementById('username').value = '';
            document.getElementById('rating').value = ''; // 或设置为默认评分
            document.getElementById('message').value = '';
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });

    // 在页面加载时获取并显示评论
    document.addEventListener('DOMContentLoaded', () => {
        const propertyId = new URLSearchParams(window.location.search).get('id');

        fetch(`/properties/${propertyId}/comments`)
        .then(response => response.json())
        .then(data => {
            displayComments(data.comments);
        })
        .catch(error => console.error('Error:', error));
    });
});