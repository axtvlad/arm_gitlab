import React from 'react';
import {Button} from "antd";

const Navigation = () => {
    return (
        <div style={{backgroundColor: '#e7e7e7', padding: 10}}>
            <img src='./' alt={'logo'}/>
            <Button type='link' size={"large"} style={{color: '#34495e'}}>Главная</Button>
            <Button type='link' size={"large"} style={{color: '#34495e'}}>О проекте</Button>
            <Button type='link' size={"large"} style={{color: '#34495e'}}>Эксперты</Button>
            <Button type='link' size={"large"} style={{color: '#34495e'}}>Showcase</Button>
            <Button type='link' size={"large"} style={{color: '#34495e'}}>Контакты</Button>
            <Button
                type='danger'
                icon={'login'}
                style={{marginLeft: 15}}
            >
                Войти в систему
            </Button>
        </div>
    );
};

export default Navigation;