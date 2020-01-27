import React from 'react';
import {Typography} from 'antd';

const {Title, Text} = Typography;

const AboutUs = () => {
    return (
        <div style={{height: 580, paddingTop: 70, backgroundColor: '#e7e7e7'}}>
            <div style={{marginBottom: 50}}>
                <Title level={1} style={{color: '#34495e'}}>О проекте</Title>
            </div>
            <div style={{textAlign: '-webkit-center'}}>
                <table>
                    <td style={{textAlign: 'center'}}>
                        <tr>
                            <img
                                alt='img1'
                                src={require('./time.png')}
                                style={{width: 200, marginRight: 100, marginLeft: 100, marginBottom: 50}}
                            />
                        </tr>
                        <tr>
                            <Title level={3} style={{color: '#34495e'}}>Экономит Ваше время</Title>
                        </tr>
                        <tr>
                            <Text style={{color: '#34495e'}}>Наша система позволит сэкономить время и нервы</Text>
                        </tr>
                    </td>
                    <td style={{textAlign: 'center'}}>
                        <tr>
                            <img
                                alt='img2'
                                src={require('./access.png')}
                                style={{width: 200, marginRight: 100, marginLeft: 100, marginBottom: 50}}
                            />
                        </tr>
                        <tr>
                            <Title level={3} style={{color: '#34495e'}}>Легкий доступ</Title>
                        </tr>
                        <tr>
                            <Text style={{color: '#34495e'}}>Доступ к системе 24/7 из любой точки мира</Text>
                        </tr>
                    </td>
                    <td style={{textAlign: 'center'}}>
                        <tr>
                            <img
                                alt='img3'
                                src={require('./expert.png')}
                                style={{width: 200, marginLeft: 100, marginRight: 100, marginBottom: 50}}
                            />
                        </tr>
                        <tr>
                            <Title level={3} style={{color: '#34495e'}}>Консультации от экспертов</Title>
                        </tr>
                        <tr>
                            <Text style={{color: '#34495e'}}>Вас проконсультируют в любом вопросе наши эксперты</Text>
                        </tr>
                    </td>
                </table>
            </div>
        </div>
    );
};

export default AboutUs;