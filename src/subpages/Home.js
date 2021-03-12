import HomeImageSlider from "../components/HomeImageSlider";
import HomeQuickSearch from "../components/HomeQuickSearch";
import HomeInfoList from "../components/HomeInfoList";
import Footer from "../components/Footer";
import {useSelector} from "react-redux";

function Home(){

    return(
        <div className={"home"}>
            <HomeImageSlider>
                <HomeQuickSearch />
            </HomeImageSlider>
            <HomeInfoList />
            <Footer />
        </div>
    );
}

export default Home;