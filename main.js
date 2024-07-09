let newsList = [];
const menus = document.querySelectorAll(".menus button, .side-menu-list button");
menus.forEach(menu => menu.addEventListener("click",(event) => getNewsByCategory(event)))

const getLatestNews = async () => {
    const url = new URL(`https://eve-the-news-times.netlify.app/top-headlines`);
    url.searchParams.set('country', 'kr');

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("dd",data);
        newsList = data.articles;
        render ();
        console.log("Fetched news:", newsList);
    } catch (error) {
        console.error('Error fetching news:', error.message);
    }
};

//카테고리
const getNewsByCategory = async (event) => {
    const category = event.target.textContent.toLowerCase();
    const url = new URL('https://eve-the-news-times.netlify.app/top-headlines');
    url.searchParams.set('country', 'kr');
    url.searchParams.set('category', category);

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        newsList = data.articles;
        render();
        console.log(`Fetched ${category} news:`, newsList);
    } catch (error) {
        console.error(`Error fetching ${category} news:`, error.message);
    }
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

// 상단 검색창 보이고 숨기기
const openSearchBox = () => {
  let inputArea = document.getElementById("input-area");
  inputArea.style.display = inputArea.style.display === "inline" ? "none" : "inline";
};

getLatestNews();

