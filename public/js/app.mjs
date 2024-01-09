window.onload = () => {
    const modal = document.getElementById('myModal');
    const modalBtn = document.getElementById('modal-btn');
    const span = document.getElementsByClassName('close')[0];

  
    function fetchProperties(searchQuery = '', minPrice = '', maxPrice = '') {
      const propertiesContainer = document.getElementById('properties-container');
      propertiesContainer.innerHTML = ''; // 清空之前的内容
  
      // 构建查询参数
      const queryParams = new URLSearchParams();
      if (searchQuery) queryParams.append('search', searchQuery);
      if (minPrice) queryParams.append('minPrice', minPrice);
      if (maxPrice) queryParams.append('maxPrice', maxPrice);

      console.log(maxPrice,minPrice);
  
      // 发送带有查询参数的请求
      fetch(`/properties?${queryParams.toString()}`)
        .then(response => response.json())
        .then(properties => {
          // 使用获得的属性更新页面
            properties.forEach(property => {
              const propertyCard = document.createElement('div');
              propertyCard.className = 'property-card';
              propertyCard.innerHTML = `
                  <a href="/property.html?id=${property._id}" target="_blank">
                      <div>
                          
                          <div class="property-details">
                              <img src="/properties/${property._id}/picture" alt="${property.title}">
                              <h4>${property.title}</h4>
                              <p>${property.city}, ${property.country}</p>
                              <p>$${property.price}</p>
                              <p>⭐️ ${property.averageRating}</p>  <!-- 显示平均评分 -->
                          </div>
                      </div>
                  </a>
              `;
              propertiesContainer.appendChild(propertyCard);
            });
        })
        .catch(error => {
          console.error('Error fetching properties:', error);
        });
    }
  
    // 绑定搜索按钮的点击事件
    document.getElementById('search-btn').addEventListener('click', () => {
      const searchInput = document.getElementById('search-input').value;
      fetchProperties(searchInput); // 调用 fetchProperties 函数并传入搜索查询
    });
  
    // 绑定价格筛选按钮的点击事件
    document.getElementById('price-filter-btn').addEventListener('click', () => {
      const minPrice = document.getElementById('min-price-input').value;
      const maxPrice = document.getElementById('max-price-input').value;
      fetchProperties('', minPrice, maxPrice); // 调用 fetchProperties 函数并传入价格范围
    });
  
    // Fetch all properties on initial page load
    fetchProperties();
  
    modalBtn.onclick = () => {
      modal.style.display = 'block';
    };
  
    span.onclick = () => {
      modal.style.display = 'none';
    };
  
    window.onclick = (event) => {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    };
  };
  