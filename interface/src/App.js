import { MantineProvider, Text } from "@mantine/core";
import { useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Outlet,
    
  } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import PublicDashboard from "./components/dashboard/PublicDashboard";
import LoginScreen from "./components/login/LoginForm";
import PrivateRoute from "./components/routing/PrivateRoute";
import Shell from "./components/shell/Shell";
import UserForm from "./components/users/UserForm";
import UserScreen from "./components/users/UserScreen";
import { ProvideAuth } from "./hooks/useAuth";

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
                            <Route element={<PrivateRoute />}>
                                <Route path="users" element={<Outlet />}>
                                    <Route index element={<UserScreen />} />
                                    <Route path="new" element={<UserForm />} />
                                    <Route path="edit/:id" element={<UserForm />} />
                                </Route>
                                <Route path="applications" element={<Shell />} />
                            </Route>
                        </Route>
                        <Route path="*" element={"404!"} />
                    </Routes>
                </Router>
            </MantineProvider>
        </ProvideAuth>
    );
}

export default App;