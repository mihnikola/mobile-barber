import Register from '@/components/register/index';
import { withScreen } from "@/components/ui";

const RegisterForm = () => {
    return (
        <Register />
    )
}

export default withScreen(RegisterForm, "keyboard");