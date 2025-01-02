import React from 'react'

const Title = (props) => {
    return (
        <>
            <div className=' pt-4'></div>
            <div className='item-center'>
                <div className='bg-color-blue white title_sec_width font-center'>
                    <span className='title-font-size'>{props.title}</span>
                </div>
            </div>
            <div className=' pt-4'></div>
        </>
    )
}

export default Title