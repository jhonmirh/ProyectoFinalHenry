'use client';

import React from "react";
import { useSearchParams } from "next/navigation";
import LoginGoogle from "@/components/LoginGoogle/LoginGoogle";

const GoogleLogin = () => {
  const searchParams = useSearchParams();
  const emailgoogle = searchParams?.get("email") || "";
  const password = searchParams?.get("password") || "";

  return <LoginGoogle emailgoogle={emailgoogle} password={password} />;
};

export const dynamic = 'force-dynamic'; 
export default GoogleLogin;