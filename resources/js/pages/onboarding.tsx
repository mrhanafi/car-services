import { Head, Link } from '@inertiajs/react'
import React from 'react'

const Onboarding = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Head title="Home" />
    <div className="font-sans text-gray-800">
      {/* Header Section */}
      {/* <header className='bg-cover bg-center w-full h-[600px] overflow-hidden relative'>
        <img className='absolute inset-0 h-full w-full object-cover' src='/images/bengkel.png' />
        <div className='absolute inset-0 bg-gray-900/50'></div>
         <h1 className="text-4xl md:text-5xl font-bold mb-4">Цифровая платформа для грузоперевозок</h1>
         <p className="text-lg md:text-xl mb-6">Объединяем заказчиков и перевозчиков: логистика, тендеры и безопасность</p>
          <button className="bg-teal-500 hover:bg-teal-600 px-6 py-3 rounded-lg text-white font-semibold">Начать сейчас</button>
      </header> */}
      <header className="bg-cover bg-center h-[600px] bg-[url('/images/bengkel.png')]">
        <div className="absolute inset-0 bg-gray-900/50 h-[600px] flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Track. Record. Remember.</h1>
          <p className="text-lg md:text-xl mb-6">A simple way to log every service you’ve ever done — in one place.</p>
          <div className='space-x-2'>
          <Link href={route('register')} className="bg-white hover:bg-black hover:text-white px-6 py-3 rounded-lg text-black font-semibold">Register</Link>
          <Link href={route('login')} className="bg-white hover:bg-black hover:text-white px-6 py-3 rounded-lg text-black font-semibold">Login</Link>

          </div>
        </div>
      </header>

      {/* Stats Section */}
      {/* <section>
        <div className='bg-amber-50 border-1 border-black w- py-[100px] rounded-md'>
          <h2 className="text-2xl font-semibold">Более 6 000 перевозчиков</h2>
          <p>уже работают с нами</p>
        </div>
      </section> */}
      <section className="-mt-32 py-12 px-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className='bg-white border-1 py-[100px] px-10 rounded-md z-10'>
          <h2 className="text-2xl font-semibold">📦 Over 10,000 Services Logged</h2>
          <p>More and more users rely on us to track their maintenance history.</p>
        </div>
         <div className='bg-white border-1 py-[100px] px-10 rounded-md z-10'>
          <h2 className="text-2xl font-semibold">⏰ Hundreds of Hours Saved</h2>
          <p>Quick logs mean less time searching, more time doing.</p>
        </div>
         <div className='bg-white border-1 py-[100px] px-10 rounded-md z-10'>
          <h2 className="text-2xl font-semibold">✅ Thousands of Timely Reminders Sent</h2>
          <p>Never miss a due service again — we’ve got your back.</p>
        </div>
      </section>


    </div>
      {/* Footer */}
      <footer className="bg-black py-6 text-center text-sm mt-auto">
        <p className='text-white'>© Namel Solutions @ {new Date().getFullYear()}</p>
      </footer>
    </div>
  )
}

export default Onboarding
