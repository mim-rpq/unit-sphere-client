import React from 'react';

const Spinner = () => {
    return (
        <div className='min-h-screen flex justify-center items-center '>
           <span className="loading loading-spinner text-secondary loading-xl"></span>
        </div>
    );
};

export default Spinner;