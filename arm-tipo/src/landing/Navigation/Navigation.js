import React from 'react';
import {Button} from "antd";

const Navigation = () => {
    return (
        <div style={{backgroundColor: '#e7e7e7', padding: 10}}>
            <img src='./' alt={'logo'}/>
            <Button type='link' size={"large"} style={{color: '#777'}}>Главная</Button>
            <Button type='link' size={"large"} style={{color: '#777'}}>О проекте</Button>
            <Button type='link' size={"large"} style={{color: '#777'}}>Showcase</Button>
            <Button type='link' size={"large"} style={{color: '#777'}}>Контакты</Button>
            <Button
                type='danger'
                icon={'login'}
                style={{
                    marginRight: 30,
                    marginTop: 3,
                    float: 'right',
                }}>
                Войти в систему
            </Button>
        </div>
    );
};

export default Navigation;