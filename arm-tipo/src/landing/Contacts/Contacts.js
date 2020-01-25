import React from 'react';
import {Typography} from "antd";

const {Title, Text} = Typography;

const Contacts = () => {
    return (
        <div style={{height: 280, paddingTop: 70, backgroundColor: '#34495e'}}>
            <div style={{marginBottom: 50}}>
                <Title level={1} style={{color: '#e7e7e7'}}>Контакты</Title>
            </div>
            <div style={{textAlign: 'left', paddingLeft: 30}}>
                <div>
                    <Title level={4} style={{color: '#e7e7e7'}}>
                        Казахстан, г. Нур-Султан
                    </Title>
                </div>
                <div>
                    <Text style={{color: '#e7e7e7'}}>
                        +7(747)3381815
                    </Text>
                </div>
            </div>
        </div>
    );
};

export default Contacts;