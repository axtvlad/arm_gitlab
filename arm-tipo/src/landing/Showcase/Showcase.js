import React from 'react';
import {Carousel, Typography} from 'antd';

const {Title} = Typography;
const Showcase = () => {
    return (
        <div style={{textAlign: '-webkit-center', backgroundColor: '#e7e7e7', paddingTop: 80, paddingBottom: 80}}>
            <div style={{marginBottom: 30}}>
                <Title level={2} style={{color: '#34495e'}}>
                    Showcase
                </Title>
            </div>
            <div>
                <Carousel autoplay>
                    <div>
                        <img src={require('../MainInfo/app-front.jpeg')} alt="img1" style={{width: 800}}/>
                    </div>
                    <div>
                        <img src={require('../MainInfo/app-front.jpeg')} alt="img1" style={{width: 800}}/>
                    </div>
                    <div>
                        <img src={require('../MainInfo/app-front.jpeg')} alt="img1" style={{width: 800}}/>
                    </div>
                </Carousel>
            </div>
        </div>
    );
};

export default Showcase;