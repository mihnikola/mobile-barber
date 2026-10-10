import Register from '@/components/register/index';
import withKeyboardAvoid from '@/components/wrapper/WrapperKeyboard';

const RegisterForm = () => {
    return (
        <Register />
    )
}

export default withKeyboardAvoid(RegisterForm);