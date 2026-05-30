'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export default function LoginPage() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false,
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
            className="h-[calc(100vh-80px)] flex items-center justify-center p-0 bg-cover bg-center relative overflow-hidden mt-10"
        >

            {/* Main Card */}
            <div className="relative z-10 w-full max-w-4xl max-h-[95vh] rounded-[28px] overflow-hidden border border-white/20 bg-white/10 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.25)]">

                <div className="grid lg:grid-cols-2 h-full">

                    {/* Left Section */}
                    <div className="hidden lg:flex flex-col justify-center p-10 text-white bg-[#b87439]">

                        <h1 className="font-alex text-7xl text-[#F5E6DA] leading-none">
                            Zetozz
                        </h1>

                        <p className="mt-5 text-base leading-7 text-white/90 max-w-sm">
                            Premium skincare crafted for timeless elegance
                            and natural beauty.
                        </p>

                        <div className="flex gap-3 mt-8">
                            <div className="w-12 h-[3px] rounded-full bg-[#F5E6DA]"></div>
                            <div className="w-4 h-[3px] rounded-full bg-white/40"></div>
                            <div className="w-4 h-[3px] rounded-full bg-white/40"></div>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="bg-white/95 px-5 sm:px-7 py-5 sm:py-6 flex items-center justify-center">

                        <div className="w-full max-w-sm">

                            {/* Mobile Logo */}
                            <div className="lg:hidden text-center mb-4">

                                <h1 className="font-brittany text-5xl text-[var(--primary)] leading-none">
                                    Zetozz
                                </h1>

                                <p className="text-xs text-[var(--text)]/60 mt-1">
                                    Luxury skincare
                                </p>
                            </div>

                            {/* Heading */}
                            <div className="mb-4 text-center lg:text-left">

                                <p className="uppercase tracking-[3px] text-[10px] sm:text-xs text-[var(--primary)] font-semibold">
                                    Welcome Back
                                </p>

                                <h2 className="text-2xl sm:text-3xl mt-2 font-semibold text-[var(--text)]">
                                    Sign In
                                </h2>

                            </div>

                            {/* Form */}
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-3"
                            >

                                {/* Email */}
                                <div>

                                    <label className="block mb-1 text-xs sm:text-sm text-[var(--text)]/70">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter email"
                                        className="w-full h-10 px-4 rounded-xl bg-white border border-[var(--secondary-bg)] text-sm outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-all"
                                    />
                                </div>

                                {/* Password */}
                                <div>

                                    <div className="flex items-center justify-between mb-1">

                                        <label className="text-xs sm:text-sm text-[var(--text)]/70">
                                            Password
                                        </label>

                                        <button
                                            type="button"
                                            className="text-[11px] sm:text-xs text-[var(--primary)] hover:underline"
                                        >
                                            Forgot?
                                        </button>

                                    </div>

                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="w-full h-10 px-4 rounded-xl bg-white border border-[var(--secondary-bg)] text-sm outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-all"
                                    />

                                </div>

                                {/* Remember */}
                                <div className="flex items-center justify-between text-xs sm:text-sm">

                                    <label className="flex items-center gap-2 text-[var(--text)]/70">

                                        <input
                                            type="checkbox"
                                            name="remember"
                                            checked={formData.remember}
                                            onChange={handleChange}
                                            className="accent-[var(--primary)]"
                                        />

                                        Remember me

                                    </label>

                                </div>

                                {/* Login Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-10 rounded-xl bg-[var(--primary)] text-white text-sm font-medium hover:opacity-90 transition-all shadow-lg shadow-[var(--primary)]/20"
                                >

                                    {
                                        loading
                                            ? 'Signing In...'
                                            : 'Sign In'
                                    }

                                </button>

                                {/* Divider */}
                                <div className="relative flex items-center justify-center py-1">

                                    <div className="absolute w-full h-[1px] bg-[var(--secondary-bg)]"></div>

                                    <span className="relative bg-white px-3 text-[9px] tracking-[2px] text-[var(--text)]/40">
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

                                {/* Register */}
                                <p className="text-center text-xs sm:text-sm text-[var(--text)]/65 pt-1">

                                    Don&apos;t have an account?{" "}

                                    <Link
                                        href="/signup"
                                        className="text-[var(--primary)] font-semibold hover:underline"
                                    >
                                        Register
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