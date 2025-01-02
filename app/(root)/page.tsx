import AnimeList from "@/components/homepage/TopAnime";
import TitleSection from "@/components/homepage/Header";
import MainAnime from "@/components/homepage/Main";
import { FetchAPI, FetchNestedResponse, ReproduceData } from "@/libs/api";
import RecommendationAnime from "@/components/homepage/Recommendation";

const Page = async () => {
  const FetchAnime = await FetchAPI({
    resource: "top/anime",
    query: "limit=1",
  });

  const FetchtopAnime = await FetchAPI({
    resource: "top/anime",
    query: "limit=25",
  });
  const topAnime = {
    data: FetchtopAnime?.data ? FetchtopAnime.data.slice(1) : [],
  };

  let recommendationAnime = await FetchNestedResponse({
    resource: "recommendations/anime",
    query: "",
    objectProps: "entry",
  });
  recommendationAnime = ReproduceData({
    data: recommendationAnime || [],
    gapData: 8,
  });

  return (
    <section className="mt-4">
      <TitleSection
        title="Most Popular Anime"
        linkTitle="See All"
        linkHref="/popularAnime"
      />
      <div className="flex flex-col md:flex-row gap-8 px-4">
        <div className="md:w-1/3 h-full">
          <MainAnime api={FetchAnime} />
        </div>
        <div className="md:w-2/3 h-full">
          <AnimeList api={topAnime} />
        </div>
      </div>
      <section className="mt-4">
        <TitleSection title="Recommendations Anime" />
        <RecommendationAnime api={recommendationAnime} />
      </section>
    </section>
  );
};

export default Page;
