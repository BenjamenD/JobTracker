import React from 'react'

const Footer = () => {
  return (
    <footer className='border-t border-slate-200 bg-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/40'>
      <div className='mx-auto max-w-5xl px-4 py-6 text-center text-sm text-slate-600'>
        <span className='font-medium text-slate-800'>JobTracker</span> · Built by{' '}
        <a className='underline decoration-slate-300 hover:decoration-slate-500' href='https://github.com/BenjamenD' target='_blank' rel='noreferrer'>
          @BenjamenD
        </a>
      </div>
    </footer>
  )
}

export default Footer