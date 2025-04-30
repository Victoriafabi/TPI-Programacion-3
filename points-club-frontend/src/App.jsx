import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import LayoutWithoutNavbar from "./components/common/layout/layoutWithoutNavbar/LayoutWithoutNavbar"


import Home from "../src/components/pages/home/Home"
import NotFound from  "./components/pages/notFound/NotFound"


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<LayoutWithoutNavbar/>}>
          <Route path="/" element={<Home />} />
        </Route>

{/*        
        <Route element={<LayoutConNav />}>
          <Route path="/MyExchanges" element={<MyExchanges />} />
          <Route path="/MyPoints" element={<MyPoints />} />
          <Route path="/RewardsClientes" element={<RewardsClientes />} />
          <Route path="/MyBranches" element={<MyBranches />} />
        </Route> */}

   
        <Route path="*" element={<NotFound />} />

      </Routes>
      </BrowserRouter>
  );
}

export default App;