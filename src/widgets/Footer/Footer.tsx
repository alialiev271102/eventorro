// Footer.tsx
import React from 'react';
import styles from './footer.module.less';
import { Logo } from '@/widgets/Navbar/additionUI';

interface FooterProps {
    toDocs: () => void;
}

const Footer: React.FC<FooterProps> = ({ toDocs }) => {
    return (
        <footer className={styles.footer}>
            {/* Ваш код футера */}
            {/* Первая горизонтальная секция */}
            <div>
                <Logo />
                <p>Все мероприятия города<br />на одном сайте!</p>
            </div>
            {/* Вторая вертикальная секция */}
            <div>
                <a href="/">О нас</a>
                <a onClick={toDocs}>Документы</a>
                <a href="/">Инструкция</a>
            </div>
            {/* Третья горизонтальная секция */}
            <div>
                {/* Контейнер для иконок */}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <a href="https://www.instagram.com/eventorro/">
                        <img src={'instagramIcon.png?${Math.random()}'} alt="Instagram" />
                    </a>
                    <a href="https://t.me/eventorro_bishkek">
                        <img src={"telegramIcon.png"} alt="Telegram" />
                    </a>
                    <a href="https://wa.me/996999901070">
                        <img src="whatsappIcon.png" alt="WhatsApp" />
                    </a>
                </div>
                
                <p>+996 999 901 070</p>
            </div>
        </footer>
    );
}

export default Footer;
