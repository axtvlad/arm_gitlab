import {Breadcrumb, Layout} from "antd";
import React from "react";
import MainData from "./MainData/MainData";

const {Content} = Layout;

const WorkSpace = (props) => {
    return (
        <Content style={{margin: '0 16px'}}>
            <Breadcrumb style={{margin: '16px 0', textAlign: 'left'}}>
                <Breadcrumb.Item>Основная база</Breadcrumb.Item>
                <Breadcrumb.Item>Приказы</Breadcrumb.Item>
            </Breadcrumb>

            {/* <div style={{padding: 24, background: '#fff', minHeight: 360}}>
                Главная
            </div>*/}
            <div style={{padding: 24, background: '#fff', minHeight: 360}}>
                <MainData />
            </div>
            {/*  <div style={{padding: 24, background: '#fff', minHeight: 360}}>
                Прочие документы
                <div>Карты развития</div>
            </div>
            <div style={{padding: 24, background: '#fff', minHeight: 360}}>
                Шаблоны
                <div>Шаблон</div>
            </div>
            <div style={{padding: 24, background: '#fff', minHeight: 360}}>
                Эксперты
                <div>Эксперт</div>
            </div>
            */}

        </Content>
    )
};
export default WorkSpace;