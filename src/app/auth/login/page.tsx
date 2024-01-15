import LogInForm from '@/components/LogInForm'


const initialState = {
    message: null
}

const LoginPage = async ({}) => {

    return (
    <div className='flex flex-col gap-5 items-center justify-center h-screen'> 
        <h1 className='text-2xl font-semibold'>Login</h1>
        <div className='flex flex-col items-center border p-12 rounded-xl gap-7 border-zinc-700 bg-zinc-950'>
            <LogInForm />
            <p className='text-zinc-400'>Not registered? <span>Sign In</span></p>
        </div>
    </div>)
}

export default LoginPage