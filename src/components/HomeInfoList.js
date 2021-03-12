import HomeInfoPane from "./HomeInfoPane";

import tourImage from '../images/tours.jpg';
import cryptoImage from '../images/crypto.jpg';
import questionImage from '../images/question.jpg';

function HomeInfoList(){
    const style = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",

        width: "80%",
        margin: "2em auto",
    }
    return(
        <div style={style} className="homeInfoList">
            <HomeInfoPane
                image={tourImage}
                title={"Podróże małe i duże"}
                description="W naszym serwisie oferowane są zarówno krótkie, jednodniowe wycieczki jak i dłuższe obejmujące noclegi i przejazdy pomiędzy kilkoma miastami a nawet wędrówki górskie."
            />
            <HomeInfoPane
                image={cryptoImage}
                title="Lorem ipsum dolor sit amet"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            />
            <HomeInfoPane
                image={questionImage}
                title="Lorem ipsum dolor sit amet"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
            />


        </div>
    )
}


export default HomeInfoList;