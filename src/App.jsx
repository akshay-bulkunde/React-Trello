import React from "react";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListsPage from "./pages/ListsPage/ListsPage";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";
import { SnackbarProvider } from "notistack";

const App = () => {
  return (
    <ErrorBoundary>
      <SnackbarProvider maxSnack={3}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="lists/:boardId" element={<ListsPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </SnackbarProvider>
    </ErrorBoundary>
  );
};

export default App;
