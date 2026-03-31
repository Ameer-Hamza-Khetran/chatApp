import Header from "./components/header"
import Sidebar from "./components/sidebar"

function Home() {
    return (
        <div className="home-page">
            <div className="main-content">
                <Header></Header>
                <Sidebar></Sidebar>
                {/* <!--CHAT AREA LAYOUT--> */}
            </div>
        </div>
    )
}

export default Home