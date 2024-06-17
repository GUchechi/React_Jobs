import Hero from "../components/Hero";
import HomeCards from "../components/HomeCards";
import JobListings from "../components/JobListings";
import ViewAll from "../components/ViewAll";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <HomeCards />
      <JobListings isHome={true} />
      <ViewAll />
    </div>
  );
};

export default HomePage;
