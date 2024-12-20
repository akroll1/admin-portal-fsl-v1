import {useLocation, useNavigate } from 'react-router-dom'
import { useGlobalStore } from '../stores'
import { useEffect } from 'react'

export const Auth = () => {

    const navigate = useNavigate()

    const { setUser } = useGlobalStore()
    let { hash } = useLocation();
    
    const [access_token, id_token] = hash.split('&').map(item => item.split('=')[1])

    useEffect(() => {
        if(access_token && id_token){
            const setUserAsync = async (access_token, id_token) => {
                await setUser(access_token, id_token)
            }
            setUserAsync(access_token, id_token)
            navigate("/forms/distances")
        }
    },[access_token, id_token])

    return (
        <></>
    )
}
