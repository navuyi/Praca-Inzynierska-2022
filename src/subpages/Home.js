import Navbar from "../components/Navbar";
import ImageSlider from "../components/ImageSlider";
import HomeInfoPanel from "../components/HomeInfoPanel";
import Footer from "../components/Footer";
import HomeTourPanel from "../components/HomeTourPanel";

import trip from '../images/tours.jpg';
import crypto from '../images/crypto.jpg';
import question from '../images/question.jpg';

import test from '../images/slider03.jpg';

import tour01 from '../images/tour01.jpg';
import tour02 from '../images/tour02.jpg';
import tour03 from '../images/tour03.jpg';

function Home(){

    return(
        <div className="home">
            <Navbar />
            <div className="row row-1">
                <ImageSlider />
            </div>
            <div className="row row-2">
                <HomeTourPanel
                    image={test}
                    title="Lorem ipsum"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc consequat interdum."
                />
                <HomeTourPanel
                    image={tour02}
                    title="Ipsum lorem torem"
                    description="Id neque aliquam vestibulum morbi blandit cursus. Sed euismod nisi porta lorem mollis aliquam ut."
                />
                <HomeTourPanel
                    image={tour01}
                    title="Lorem ipsum"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc consequat interdum."
                />
                <HomeTourPanel
                    image={tour03}
                    title="Viverra vitae"
                    description="Quis commodo odio aenean sed adipiscing diam donec adipiscing. Tortor at risus viverra adipiscing at. Nibh sit amet commodo nulla. Augue neque gravida in fermentum. Sed vulputate odio ut enim blandit. Arcu risus quis varius quam quisque id."
                />
            </div>
            <div className="row row-3">
                <HomeInfoPanel
                    title="Lorem ipsum"
                    icon={trip}
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. "
                />
                <HomeInfoPanel
                    title="Lorem ipsum"
                    icon={crypto}
                    description="Lorem ipsum dolor sit amet, excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
                />
                <HomeInfoPanel
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