

const Documents = () => {
    return (
        <div style={{ margin: '5em' }}>
            <h1 style={{ fontWeight: 'bold', color: 'black', fontSize: '55px' }}>Документы</h1>
            <hr style={{ border: '0', borderTop: '1px solid gray', margin: '50px 0' }} />
            <div style={{ marginBottom: '50px' }}>
                {/* Добавьте другие документы здесь */}
                <a href="EVENTORRO_terms.pdf" style={{ color: 'blue', fontSize: '20px', }}>Правила пользования сайтом</a>
                <br /><br />
                <p style={{ color: 'gray', fontSize: '15px' }}>Этот документ регулирует отношения со всеми пользователями Timepad, даже не зарегистрированными на нашем сервисе. Если вы не согласны с какими-то его пунктами — вам нужно немедленно закрыть все страницы сайта и больше никогда их не открывать.</p>
            </div>
            <hr style={{ border: '0', borderTop: '1px solid gray', margin: '50px 0' }} />
            {/* Добавьте другие документы здесь */}
            <div style={{ marginBottom: '50px' }}>
                <a href="EVENTORRO_useragreement.pdf" style={{ color: 'blue', fontSize: '20px', }}>Пользовательское соглашение</a>
                <br /><br />
                <p style={{ color: 'gray', fontSize: '15px' }}>Этот документ определяет правила регистрации и оплаты участия в событиях, размещенных на Timepad. Он описывает взаимные обязательства и права нашей компании и наших пользователей-участников событий. Если вы не согласны с какими-то пунктами этого соглашения — вы не должны регистрироваться на события на нашем сервисе.</p>
            </div>
            <hr style={{ border: '0', borderTop: '1px solid gray', margin: '50px 0' }} />
            {/* Добавьте другие документы здесь */}
            <div style={{ marginBottom: '50px' }}>
                <a href="EVENTORRO_pers.pdf" style={{ color: 'blue', fontSize: '20px', }}>Политика в отношении обработки персональных данных</a>
                <br /><br />
                <p style={{ color: 'gray', fontSize: '15px' }}>Этот документ определяет принципы, условия и порядок обработки персональных данных.</p>
            </div>
        </div>
    );
}

export default Documents;