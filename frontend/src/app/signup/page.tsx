'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export default function SignupPage() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        agree: false,
    })

    const [loading, setLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value, checked, type } = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        try {

            setLoading(true)

            console.log(formData)

            // API CALL HERE

        } catch (error) {

            console.log(error)

        } finally {

            setLoading(false)
        }
    }

    return (
        <div
            className="min-h-[calc(100vh-80px)] flex items-center justify-center px-3 sm:px-4 py-4 bg-cover bg-center relative overflow-hidden mt-20"
            
        >

            {/* Overlay */}

            {/* Main Card */}
            <div className="relative z-10 w-full max-w-5xl rounded-[30px] overflow-hidden border border-white/20 bg-white/10 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.25)]">

                <div className="grid lg:grid-cols-2">

                    {/* Left Side */}
                    <div className="hidden lg:flex flex-col justify-center p-14 text-white bg-[#b87439]">

                        <h1 className="font-alex text-8xl text-[#F5E6DA]">
                            Zetozz
                        </h1>

                        <p className="mt-6 text-lg leading-8 text-white/90 max-w-md">
                            Begin your skincare journey with luxury products
                            crafted for elegance, confidence, and timeless beauty.
                        </p>

                        <div className="flex gap-3 mt-10">
                            <div className="w-12 h-[3px] rounded-full bg-[#F5E6DA]"></div>
                            <div className="w-4 h-[3px] rounded-full bg-white/40"></div>
                            <div className="w-4 h-[3px] rounded-full bg-white/40"></div>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className=" backdrop-blur-2xl px-5 sm:px-8 md:px-10 py-6 sm:py-8 flex items-center justify-center border-l border-white/10">
                        <div className="w-full max-w-sm">

                            {/* Heading */}
                            <div className="mb-5 text-center lg:text-left">

                                <h2 className="text-2xl sm:text-3xl mt-2 font-semibold text-[var(--text)]">
                                    Create Account
                                </h2>

                            </div>

                            {/* Form */}
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-4"
                            >

                                {/* Name */}
                                <div>

                                    <label className="block mb-1.5 text-xs sm:text-sm text-[var(--text)]/70">
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your name"
                                        className="w-full h-10 px-4 rounded-xl bg-white border border-[var(--secondary-bg)] text-sm outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-all"
                                    />
                                </div>

                                {/* Email */}
                                <div>

                                    <label className="block mb-1.5 text-xs sm:text-sm text-[var(--text)]/70">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        className="w-full h-10 px-4 rounded-xl bg-white border border-[var(--secondary-bg)] text-sm outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-all"
                                    />
                                </div>

                                {/* Password */}
                                <div>

                                    <label className="block mb-1.5 text-xs sm:text-sm text-[var(--text)]/70">
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="w-full h-10 px-4 rounded-xl bg-white border border-[var(--secondary-bg)] text-sm outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-all"
                                    />
                                </div>

                                {/* Confirm Password */}
                                <div>

                                    <label className="block mb-1.5 text-xs sm:text-sm text-[var(--text)]/70">
                                        Confirm Password
                                    </label>

                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="w-full h-10 px-4 rounded-xl bg-white border border-[var(--secondary-bg)] text-sm outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-all"
                                    />
                                </div>

                                {/* Terms */}
                                <div className="flex items-start gap-2 text-xs sm:text-sm">

                                    <input
                                        type="checkbox"
                                        name="agree"
                                        checked={formData.agree}
                                        onChange={handleChange}
                                        className="mt-1 accent-[var(--primary)]"
                                    />

                                    <p className="text-[var(--text)]/70 leading-5">
                                        I agree to the{" "}
                                        <span className="text-[var(--primary)] font-medium cursor-pointer hover:underline">
                                            Terms & Conditions
                                        </span>
                                    </p>
                                </div>

                                {/* Signup Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-10 rounded-xl bg-[var(--primary)] text-white text-sm font-medium hover:opacity-90 transition-all shadow-lg shadow-[var(--primary)]/20"
                                >
                                    {
                                        loading
                                            ? 'Creating Account...'
                                            : 'Create Account'
                                    }
                                </button>

                                {/* Divider */}
                                <div className="relative flex items-center justify-center py-1">

                                    <div className="absolute w-full h-[1px] bg-[var(--secondary-bg)]"></div>

                                    <span className="relative bg-white px-3 text-[9px] sm:text-[10px] tracking-[2px] text-[var(--text)]/40">
                                        OR CONTINUE WITH
                                    </span>
                                </div>

                                {/* Google */}
                                <button
                                    type="button"
                                    className="w-full h-10 rounded-xl border border-[var(--secondary-bg)] bg-white flex items-center justify-center gap-2 hover:bg-[var(--bg)] transition-all"
                                >

                                    <img
                                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                                        alt="Google"
                                        className="w-4 h-4"
                                    />

                                    <span className="text-xs sm:text-sm font-medium text-[var(--text)]">
                                        Google
                                    </span>

                                </button>

                                {/* Login */}
                                <p className="text-center text-xs sm:text-sm text-[var(--text)]/65 pt-1">

                                    Already have an account?{" "}

                                    <Link
                                        href="/login"
                                        className="text-[var(--primary)] font-semibold hover:underline"
                                    >
                                        Sign In
                                    </Link>
                                </p>


                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}