import React from 'react';
import AppNav from './AppNav';
import Footer from './Footer';

const PageLayout = (props) => {
    return (
        <div className='h-screen flex flex-col justify-between'>
            <AppNav/>
            {props.children}
            <Footer/>
        </div>
    );
};

export default PageLayout;