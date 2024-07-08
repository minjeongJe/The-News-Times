let news = [];
const getLatestNews = async () => {
    const url = new URL (`https://eve-the-news-times.netlify.app/top-headlines&country=kr`);
    const response = await fetch(url);  
    const data = await response.json();
    news = data.articles;
    console.log("ddd",news);
};

getLatestNews (); 