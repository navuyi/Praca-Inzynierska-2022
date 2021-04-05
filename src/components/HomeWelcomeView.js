
// Dependencies
import {Container, Row, Col} from "react-bootstrap";
import {useState} from "react";

// Images
import image from '../images/home/rounded.png';


function HomeWelcomeView(){

    const [search, setSearch] = useState("");
    const handleSubmit = (e) =>{
        e.preventDefault();
        setSearch("");
    }
    const onChange = (e) =>{
        setSearch(e.target.value);
    }

    return(
        <div className="homeWelcomeView">
            <div className="header-container">
                <h1> Wyjazdy czekają na Ciebie!</h1>
                <p> Sprawdź oferty przewodników już teraz! </p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={search}
                        onChange={onChange}
                    />
                    <button> Szukaj </button>
                </form>
            </div>
            <img src={image} alt={""} />
        </div>
    )
}

export default HomeWelcomeView