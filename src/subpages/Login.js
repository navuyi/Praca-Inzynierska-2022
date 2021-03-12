import LoginPanel from "../components/LoginPanel";
import {useHistory} from 'react-router-dom';

function Login(){
    const history = useHistory();
    const style = {
        width: "100%",
        height: "100%",
        position: "absolute",

        backgroundImage: `linear-gradient(${15}deg, #e39207, #f8c518)`,
        zIndex: "99",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }
    function exit(e){
        history.goBack();
    }
    return(
        <div style={style}>
            <LoginPanel
                exit={exit}
            />
        </div>
    )
};

export default Login;