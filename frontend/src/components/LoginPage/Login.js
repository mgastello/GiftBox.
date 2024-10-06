import { useState } from 'react'
import { Redirect, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as sessionActions from '../../store/session'
import present from '../../images/present.png'

const Signup = () => {
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])

    if (sessionUser) return <Redirect to='/' />

    const handleSubmit = (e) => {
        e.preventDefault();
        return dispatch(sessionActions.login({ email, password }))
            .catch(async (res) => {
                let data;
                try {
                    data = await res.clone().json();
                } catch {
                    data = await res.text();
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
            });
    }

    return (
        <div>
            <NavLink to='/' className='flex mx-24 my-4 w-fit'>
                <img src={present} alt='present' className='w-10' />
                <h1 className='text-3xl'>
                    GiftBox.
                </h1>
            </NavLink>
            <div className='flex flex-col items-center p-6'>
                <h1 className='text-2xl mb-2'>Welcome back.</h1>
                <h3 className='text-xl mb-4'>Making gift giving fun and simple.</h3>
                <h3 className='text-xl'>Login to your GiftBox account here.</h3>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col items-center'>
                <input
                    type='text'
                    value={email}
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)}
                    className={`p-3 mt-3 text-md min-w-96 border-2 border-black rounded-md outline-none ${errors.length > 0 ? 'bg-amber-300 placeholder:text-red-500' : ''}`}
                />
                <input
                    type='password'
                    value={password}
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
                    className={`p-3 mt-3 text-md min-w-96 border-2 border-black rounded-md outline-none ${errors.length > 0 ? 'bg-amber-300 placeholder:text-red-500' : ''}`}
                />
                {errors ? (<h1 className='mt-1 text-red-500'>{errors}</h1>) : (null)}
                <NavLink to='/signup' className='m-4 underline hover:text-blue-600'>Don't have an account yet? Signup!</NavLink>
                <button type='submit' className="px-8 py-2 bg-sky-400 rounded-xl text-neutral-100 text-lg hover:bg-sky-500">Login</button>
            </form>
        </div>
    )
}

export default Signup;