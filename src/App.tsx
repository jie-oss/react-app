import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RouterConfig from "./router/route";

function App() {
    return (
        <Router>
            <RouterConfig />
        </Router>
    );
}

export default App;
