import "./WelcomeMessage.css";
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';

const WelcomeMessage = () => {
    const { isAuthenticated } = useAuth0();

    return (
        <div className="welcome-container">
            <h1 className="welcome-title">Bem-vindo ao Expense Tracker!</h1>
            <p className="welcome-text">
                Estamos aqui para ajudar você a assumir o controle total das suas finanças pessoais.
                Com o Expense Tracker, você pode acompanhar seus gastos, definir metas financeiras e alcançar
                um futuro mais organizado e tranquilo.
            </p>
            <div className="welcome-features">
                <div className="feature-card">
                    <h3 className="feature-title">🧾 Registro de Despesas</h3>
                    <p className="feature-description">
                        Registro simples e rápido de suas despesas.
                    </p>
                </div>
                <div className="feature-card">
                    <h3 className="feature-title">📊 Relatórios</h3>
                    <p className="feature-description">
                        Relatórios claros para entender onde o seu dinheiro está indo.
                    </p>
                </div>
                <div className="feature-card">
                    <h3 className="feature-title">💰 Planejamento</h3>
                    <p className="feature-description">
                        Ferramentas inteligentes para ajudá-lo a economizar e planejar.
                    </p>
                </div>
            </div>
            <p className="welcome-text">
                Faça do Expense Tracker o seu aliado para transformar hábitos financeiros e alcançar seus sonhos.
                Pronto para começar sua jornada rumo ao controle financeiro? Vamos lá! 🚀
            </p>
            {!isAuthenticated && (
                <LoginButton />
            )}
        </div>
    );
}

export default WelcomeMessage;