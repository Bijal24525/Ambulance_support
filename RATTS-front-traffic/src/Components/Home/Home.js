import { Button, Card } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import './home.css';
// import Footer from "../footer";

const Home = () => {
    return (
        <div>
             <div className="flex justify-center content-center form-block">
                
                <Card className="w-48 p-6 flex flex-col gap-4 form-card">
                {/* <div className=""> */}
                    <h1><b>Welcome to <br></br><span className="title">Traffic App</span> </b></h1><br/>
                    <Link to='/'><Button className="w-full">Home</Button></Link>
                    <Link to='/traffic'><Button className="w-full">Traffic Detail</Button></Link>
                    <Link to='/driver'><Button className="w-full">Driver Detail</Button></Link>
                    <Link to='/map'><Button className="w-full">Route Information</Button></Link>
                    {/* <Link to='/contact'><Button className="w-full">Chat</Button></Link> */}
                    <Link to='/'><Button className="w-full logout" color="red">Logout</Button></Link>
                {/* </div> */}
                </Card>
            </div>
            {/* <Footer /> */}
        </div>
    )
}

export default Home;