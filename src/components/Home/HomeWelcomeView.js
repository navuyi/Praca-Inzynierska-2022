// Dependencies
import {useState} from "react";

// Images
import image from '../../images/home/rounded.png';
import {Button} from "@material-ui/core";
import {useHistory} from "react-router-dom";


function HomeWelcomeView() {
    const history = useHistory()
    const [search, setSearch] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        setSearch("");
    }
    const onChange = (e) => {
        setSearch(e.target.value);
    }

    return (
        <div className="homeWelcomeView">
            <div className="header-container">
                <h1> Wyjazdy czekają na Ciebie!</h1>
                <p> Sprawdź oferty przewodników już teraz! </p>
                <Button variant={"contained"} className={"w-100"} color={"secondary"} onClick={() => {
                    history.push("/tours")
                }}>Przejdź do wyszukiwania</Button>
            </div>
            <img src={image} alt={""}/>
        </div>
    )
}

export default HomeWelcomeView