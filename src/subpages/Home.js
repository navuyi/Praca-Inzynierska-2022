import Navbar from "../components/Navbar";
import ImageSlider from "../components/ImageSlider";
import HomeInfoPane from "../components/HomeInfoPane";
import Footer from "../components/Footer";

import trip from '../images/tours.jpg';
import crypto from '../images/crypto.jpg';
import question from '../images/question.jpg';

function Home(){

    return(
        <div className="home">
            <Navbar />
            <div className="row row-1">
                <ImageSlider />
            </div>
            <div className="row row-2">
                <HomeInfoPane
                    title="Lorem ipsum"
                    icon={trip}
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. "
                />
                <HomeInfoPane
                    title="Lorem ipsum"
                    icon={crypto}
                    description="Lorem ipsum dolor sit amet, excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
                />
                <HomeInfoPane
                    title="Lorem ipsum"
                    icon={question}
                    description="Tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
                />
            </div>
            <Footer />
        </div>
    );
}

export default Home;