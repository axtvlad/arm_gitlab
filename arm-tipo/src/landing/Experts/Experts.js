import React from 'react';
import {Typography} from "antd";

const {Title, Text} = Typography;

const Experts = () => {
    return (
        <div style={{height: 580, paddingTop: 70, backgroundColor: '#34495e'}}>
            <div style={{marginBottom: 50}}>
                <Title level={1} style={{color: '#e7e7e7'}}>Наши эксперты</Title>
            </div>
            <div style={{textAlign: '-webkit-center'}}>
                <table>
                    <td style={{textAlign: 'center'}}>
                        <tr>
                            <img
                                alt='img1'
                                src={require('./expert.png')}
                                style={{width: 200, marginRight: 100, marginLeft: 100, marginBottom: 50}}
                            />
                        </tr>
                        <tr>
                            <Title level={3} style={{color: '#e7e7e7'}}>Эксперт 1</Title>
                        </tr>
                        <tr>
                            <Text style={{color: '#e7e7e7'}}>Важный человек 1</Text>
                        </tr>
                    </td>
                    <td style={{textAlign: 'center'}}>
                        <tr>
                            <img
                                alt='img2'
                                src={require('./expert.png')}
                                style={{width: 200, marginRight: 100, marginLeft: 100, marginBottom: 50}}
                            />
                        </tr>
                        <tr>
                            <Title level={3} style={{color: '#e7e7e7'}}>Эксепрт 2</Title>
                        </tr>
                        <tr>
                            <Text style={{color: '#e7e7e7'}}>Важный человек 2</Text>
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
                            <Title level={3} style={{color: '#e7e7e7'}}>Эксперт 3</Title>
                        </tr>
                        <tr>
                            <Text style={{color: '#e7e7e7'}}>Важный человек 3</Text>
                        </tr>
                    </td>
                </table>
            </div>
        </div>
    );
};

export default Experts;