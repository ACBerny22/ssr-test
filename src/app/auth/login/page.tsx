import LogInForm from "@/components/LogInForm";

const initialState = {
    message: null,
};

const LoginPage = async ({}) => {
    return (
        <div className="">
            {/* Este LoginForm es un Client-Component, para que se puedan
        desplegar elementos client-side */}
            <LogInForm />
        </div>
    );
};

export default LoginPage;
