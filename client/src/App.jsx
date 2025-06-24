import AboutUs from "./components/AboutUs";
import HeroContents from "./components/HeroContents";
import RoadContents from "./components/RoadContents";
import PageLayout from "./layouts/PageLayout";

const App = () => {
  return (
    <PageLayout>
      <HeroContents />
      <RoadContents />
      <AboutUs/>
    </PageLayout>
  );
};

export default App;
