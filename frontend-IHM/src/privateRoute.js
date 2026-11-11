import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import api from "./backend/controler/api_autenticar";
import { getVariavelGlobal, setVariavelGlobal} from "./GvarAuth";

export default function PrivateRoute({ children }) {
    const navigate = useNavigate();
    let variavelGlobal = getVariavelGlobal();

    const Auth = async () => {
        try {
            const data = await api.enviar();

            if (!data.ok) {
                setVariavelGlobal(true);
            } else {
                setVariavelGlobal(false);
            }
        } catch (e) {
            setVariavelGlobal(true);
        }
    }

    useEffect(() => {
        Auth();
        const intervalId = setInterval(Auth, 1800000);
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    // Remova o segundo useEffect que chama Auth quando children mudar

    useEffect(() => {
        if (variavelGlobal) {
            sessionStorage.clear();
            localStorage.clear();
            navigate('/login');
        }
    }, [variavelGlobal, navigate]);

    if (!variavelGlobal) {
        return children;
    } else {
        return null;
    }
}