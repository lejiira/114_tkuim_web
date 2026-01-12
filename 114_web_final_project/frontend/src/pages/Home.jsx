// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';


import {
    TreeFill,
    PersonPlusFill,
    Search,
    HeartFill,
    InfoCircleFill
} from 'react-bootstrap-icons';

function Home() {
    const [animals, setAnimals] = useState([]);
    const navigate = useNavigate();

    // 抓取資料
    useEffect(() => {
        fetch('http://localhost:5000/api/animals')
            .then(res => res.json())
            .then(data => setAnimals(data))
            .catch(err => console.error("抓取失敗:", err));
    }, []);

    // 認養功能
    const handleAdopt = async (animalId) => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            alert("請先登入才能認養喔！");
            navigate('/login');
            return;
        }
        const user = JSON.parse(storedUser);

        try {
            const response = await fetch('http://localhost:5000/api/adopt', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user._id, animalId })
            });
            const data = await response.json();
            if (response.ok) alert(`🎉 ${data.message}`);
            else alert(`❌ ${data.message}`);
        } catch (error) {
            console.error("錯誤:", error);
        }
    };

    return (
        <div>
            {/* 1. Hero Section：響應式大照片 + 核心價值 */}
            <div className="hero-section">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <h1 className="display-3 fw-bold mb-4">將愛台灣的心，化作行動力量</h1>
                    <h4 className="mb-5"> 將被動的『瀏覽』轉化為可參與的『虛擬保育行動』，<br />
                        拉近大眾與台灣瀕危物種的距離。</h4>
                    <p className="lead mb-5 d-none d-md-block">
                        台灣有許多珍貴的物種正在默默消失，<br />
                        我們建立這個平台的初衷，是希望透過數位化的認養機制，<br />
                        讓生態保育不再遙不可及，而是每個人都能參與的日常。
                    </p>
                    <Button className="btn-nature btn-lg" href="#adoption-rules">
                        <InfoCircleFill className="me-2" />
                        了解認養機制
                    </Button>
                </div>
            </div>

            {/* 2. 認養機制說明 (獨立區塊，白色背景) */}
            <div id="adoption-rules" className="py-5 bg-white">
                <Container>
                    <div className="text-center mb-5">
                        <h2 className="section-title"><TreeFill className="me-2 text-success" size={30} />如何參與認養？</h2>
                        <p className="text-muted">簡單三步驟，成為生態守護者</p>
                    </div>

                    <Row className="text-center">
                        <Col md={4} className="mb-4">
                            <div className="display-4 mb-3"><PersonPlusFill size={60} /></div>
                            <h4>1. 註冊會員</h4>
                            <p className="text-muted">建立您的專屬帳號，開啟保育之旅。</p>
                        </Col>
                        <Col md={4} className="mb-4">
                            <div className="display-4 mb-3"><Search size={60} /></div>
                            <h4>2. 選擇動物</h4>
                            <p className="text-muted">瀏覽下方列表，選擇您有眼緣的動物。</p>
                        </Col>
                        <Col md={4} className="mb-4">
                            <div className="display-4 mb-3"><HeartFill size={60} /></div>
                            <h4>3. 線上認養</h4>
                            <p className="text-muted">點擊認養，在會員中心隨時查看您的守護紀錄。</p>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* 3. 動物列表區塊 (淺綠色背景) */}
            <div className="py-5" style={{ backgroundColor: '#F1F8F2' }}>
                <Container>
                    <div className="text-center mb-5">
                        <h2 className="section-title">待認養動物清單</h2>
                        <p>目前共有 {animals.length} 位小夥伴等待您的守護</p>
                    </div>

                    <Row>
                        {animals.map((animal) => (
                            <Col key={animal._id} xs={12} sm={6} md={4} className="mb-4">
                                <Card className="h-100 shadow border-0" style={{ borderRadius: '15px', overflow: 'hidden' }}>
                                    <div style={{ height: '220px', overflow: 'hidden' }}>
                                        <Card.Img
                                            variant="top"
                                            src={animal.image || "https://via.placeholder.com/300"}
                                            // 這裡你可以選 objectFit: 'cover' (滿版) 或 'contain' (完整)
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </div>
                                    <Card.Body className="d-flex flex-column text-center">
                                        <Card.Title className="fw-bold fs-4">{animal.name}</Card.Title>
                                        <div className="mb-3">
                                            <Badge bg={animal.status === '瀕危' || animal.status === '極危' ? 'danger' : 'warning'} pill>
                                                {animal.status}
                                            </Badge>
                                        </div>
                                        <Card.Text className="text-muted flex-grow-1 text-start">
                                            {animal.description.length > 60
                                                ? animal.description.substring(0, 60) + "..."
                                                : animal.description}
                                        </Card.Text>
                                        <Button
                                            className="btn-nature w-100 mt-3"
                                            onClick={() => handleAdopt(animal._id)}
                                        >
                                            我要認養 <HeartFill className="ms-1" size={16} />
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default Home;