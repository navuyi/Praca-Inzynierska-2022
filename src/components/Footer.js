
import person from '../images/person.png';
import mail from '../images/mail.png';


function Footer(){
    return(
        <div className="footer">
            <div className="col-1">
                <div className="wrapper">
                    <img src={person} alt=""/>
                    <p> Rafał Figlus </p>
                </div>
                <div className="wrapper">
                    <img src={mail} alt=""/>
                    <p> figlusrafal@gmail.com </p>
                </div>


            </div>
            <div className="col-2">

            </div>
            <div className="col-1">

            </div>
        </div>
    )
}

export default Footer;