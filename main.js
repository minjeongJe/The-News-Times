let newsList = [];
const menus = document.querySelectorAll(".menus button, .side-menu-list button");
menus.forEach(menu => menu.addEventListener("click",(event) => getNewsByCategory(event)))

const searchInput = document.getElementById("search-input");

const getLatestNews = async (params = {}) => {
    const url = new URL(`https://eve-the-news-times.netlify.app/top-headlines`);
    url.searchParams.set('country', 'kr');

    for (const [key, value] of Object.entries(params)) {
        url.searchParams.set(key, value);
    }

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Failed to fetch');
        }

        const data = await response.json();
        console.log("Data:", data);

        if (response.status === 200) {
            if(data.articles.length === 0){
                throw new Error("No result for this search");
            }
            newsList = data.articles;
            render(); 


        } else {
            throw new Error(data.message || 'Failed to fetch data');
        }
        
    } catch (error) {
        if (error instanceof TypeError) {
            errorRender('Network error: Failed to fetch data');
        } else {
            errorRender(error.message);
        }
    }
};

// 검색 뉴스 가져오기
const searchNews = () => {
    const keyword = searchInput.value;
    getLatestNews({ q: keyword });

    // 검색 완료 후 검색창 초기화
    searchInput.value = "";
};

// 카테고리별 뉴스 가져오기 
const getNewsByCategory = (event) => {
    const category = event.target.textContent.toLowerCase();
    getLatestNews({ category });
};


//UI 그려줌.
const render = () => {
  const defaultImage = './img/no_img.jpg'; // 대체 이미지 설정
  const newsHTML = newsList
    .map((news) => `<div class="row news">
      <div class="col-lg-4">
        <img class="news-img-size"
          src="${news.urlToImage || defaultImage}"
          alt="${news.title}"
          onerror="this.onerror=null;this.src='${defaultImage}';"/>
      </div>
      <div class="col-lg-8">
        <h2>${news.title}</h2>
        <p>${news.description ? (news.description.length > 200 ? news.description.substring(0, 200) + "..." : news.description) : "내용없음"}</p>
       <div>${news.source.name || "no source"}  ${moment(news.publishedAt).fromNow()}</div>
      </div>
    </div>`).join(""); // 배열을 문자열로 변환

  document.getElementById("news-board").innerHTML = newsHTML;
};

//에러 경고창을 보여줌.
const errorRender = (errorMessage) => {
    const errorHTML = `<div class="alert alert-danger" role="alert">
    ${errorMessage}
    </div>`;
    document.getElementById("news-board").innerHTML = errorHTML;
}

// 사이드메뉴
const openNav = () => {
  document.getElementById("mySidenav").style.width = "350px";
};

const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
}

// 상단 검색창 돋보기아이콘을 누르면 보이고 숨기기
const openSearchBox = () => {
  let inputArea = document.getElementById("input-area");
  inputArea.classList.toggle("show");
};
 
// 검색 버튼에 이벤트 리스너 추가
document.getElementById("search-button").addEventListener("click", searchNews);

//검색창에 enter 클릭시 data 전달.
searchInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        searchNews();
    }
});


getLatestNews();

