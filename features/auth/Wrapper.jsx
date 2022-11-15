import * as React from "react";
import {useSession} from "next-auth/react";
import Link from 'next/link'
import { useRouter } from 'next/router';
import {Login} from '@/components/Login'

export default function Wrapper(props)
{
    const session = useSession();
    const router = useRouter();

    if ((session !== null && session?.status === "authenticated"))
    {
        return (
            props.children
        )
    }
   

}