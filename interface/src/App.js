import { MantineProvider } from "@mantine/core";
import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import { ProvideAuth } from "./hooks/useAuth";
import Dashboard from "./components/dashboard/Dashboard";
import LoginScreen from "./components/login/LoginForm";

function App() {

    return (
        <ProvideAuth>
            <MantineProvider
                theme={{
                    fontFamily: 'Open Sans, sans serif',
                    spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
                }}
            >
                <Router>
                    <Routes>
                        <Route path="/">
                            <Route index element={<Dashboard />} />
                            <Route exact path="login" element={<LoginScreen />} />
                            <Route exact path="admin" element={<LoginScreen />} />
                        </Route>
                        <Route path="*" element={"404!"} />
                    </Routes>
                </Router>
            </MantineProvider>
        </ProvideAuth>
    );
}

export default App;