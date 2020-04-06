import React from 'react';
import AboutUs from "./AboutUs/AboutUs";
import MainInfo from "./MainInfo/MainInfo";
import Navigation from "./Navigation/Navigation";
import Showcase from "./Showcase/Showcase";
import Experts from "./Experts/Experts";
import Contacts from "./Contacts/Contacts";

const Landing = () => {
    return (
        <div>
            <Navigation/>
            <MainInfo/>
            <AboutUs/>
            <Experts/>
            <Showcase/>
            <Contacts/>
        </div>
    );
};

export default Landing;