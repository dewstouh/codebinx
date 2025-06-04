"use client";

import RegisterForm from "./_components/RegisterForm";
import RegisterSuccess from "./_components/RegisterSuccess";
import { useRegister } from "./_hooks/useRegister";

export default function RegisterPage() {
    const register = useRegister();

    if (register.success) return <RegisterSuccess />;
    return <RegisterForm {...register} />;
}
