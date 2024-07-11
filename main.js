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
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        newsList = data.articles;
        render();
        console.log("Fetched news:", newsList);
    } catch (error) {
        console.error('Error fetching news:', error.message);
    }
};

// 검색 뉴스 가져오기
const searchNews = () => {
    const keyword = searchInput.value;
    getLatestNews({ q: keyword });
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
  inputArea.style.display = inputArea.style.display === "inline" ? "none" : "inline";
};

// 검색 버튼에 이벤트 리스너 추가
document.getElementById("search-button").addEventListener("click", searchNews);

//data검색 후 포커스 가해지면 검색창 초기화.
searchInput.addEventListener("focus", function() {
    searchInput.value = "";
});

//검색창에 enter 클릭시 data 전달.
searchInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        searchNews();
    }
});


getLatestNews();

