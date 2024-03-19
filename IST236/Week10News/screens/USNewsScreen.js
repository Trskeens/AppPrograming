import NewsList from "../components/List"; 
import { NEWS } from "../data/dummy_data";

function USNewsScreen() {
  const category = "US";
  const displayedNews = NEWS.filter((newsItem) => {
    return newsItem.category === category;
  });


  return <NewsList items={displayedNews} />;
}

export default USNewsScreen;
