import React from 'react';
import {Typography} from "antd";

const {Title} = Typography;
const MainInfo = () => {
    return (
        <div style={{backgroundColor: '#34495e', height: 686, paddingTop: 60}}>
            <div>
                <Title level={1} style={{color: '#e7e7e7', marginTop: 30, marginBottom: 10}}>Добро пожаловать
                    в <b>ARM-TIPO</b></Title>
                <Title level={3} style={{color: '#e7e7e7'}}>Нормативно-правовая база РК для образовательных
                    учреждений</Title>
            </div>
            <div style={{padding: 43}}>
                <img src={require('./app-front.jpeg')} alt={'alt'} width={750}/>
            </div>
        </div>
    );
};

export default MainInfo;