// src/components/Footer.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
    return (
        <footer style={{ backgroundColor: '#2e5c31ff', color: 'white', padding: '40px 0', marginTop: '50px' }}>
            <Container>
                <Row>
                    <Col md={6}>
                        <h5> 瀕危動物認養平台</h5>
                        <p style={{ fontSize: '0.9rem', opacity: '0.8' }}>
                            建構「人」與「自然」的和諧關係。<br />
                            讓愛台灣的心，化作實際的行動力量。
                        </p>
                    </Col>
                    <Col md={6} className="text-md-end">
                        <h6>聯絡資訊</h6>
                        <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', opacity: '0.8' }}>
                            <li> 開發者：李佳芮 資管3C 412630120</li>
                            <li> Email：412630120@o365.tku.edu.tw</li>
                            <li> 淡江大學 網頁程式設計期末專題</li>
                        </ul>
                    </Col>
                </Row>
                <hr style={{ borderColor: 'rgba(255,255,255,0.3)' }} />
                <div className="text-center" style={{ fontSize: '0.8rem' }}>
                    &copy; 2026 Endangered Animals Project. All Rights Reserved.
                </div>
            </Container>
        </footer>
    );
}

export default Footer;