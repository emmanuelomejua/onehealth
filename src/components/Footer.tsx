import React from 'react'

const Footer = () => {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-2.5 border-t border-gray-200 px-8 py-5">
        <span className="text-[13px] text-gray-500">
          © 2025 OneHealth Decentralized Patient Records. All rights reserved.
        </span>
        <div className="flex gap-5">
          <a href="#" className="text-[13px] text-gray-500 hover:text-[#16211d]">
            Privacy Protocol
          </a>
          <a href="#" className="text-[13px] text-gray-500 hover:text-[#16211d]">
            Terms of Vault
          </a>
          <a href="#" className="text-[13px] text-gray-500 hover:text-[#16211d]">
            Security Audit
          </a>
        </div>
    </footer>
  )
}

export default Footer;
