import React from 'react'

const Footer = () => {

  const productList = ["Market", "ERC20 Token", "Donation"];
  const contactList = [
    "ajeemmanuel221@gmail.com",
    "github.com/Nailer",
    "Contact Us",
  ];
  const usefullLink = ["Home", "About Us", "Company Bio"];

  return (
    <footer className='text-center text-white backgroundMain lg:text-left'>
      <div className='mx-6 py-10 text-center md:text-left'>
        <div className='grid-1 grid gap-8 m:gri-cols-2 lg:grid-cols-4'>

          <div className=''>
            <h6 className='mb-4 fle items-center justify-center font-semibold uppercase md:justify-start'>
            Fundora 
            </h6>
            <p>
              Here you can use the rows and columns to organise yout footer content. 
            </p>
          </div>
          <div className=''>
            <h6 className='mb-4 flex justify-center font-semibold uppercase md:justify-start'>
              Products
            </h6>
            {productList.map((el, i) => (
              <p className='mb-4' key={i + 1}>
                <a href="3!">{el}</a>
              </p>
            ))}
          </div>
          <div className=''>
            <h6 className='mb-4 flex justify-center font-semibold uppercase md:justify-start'>
              Useful Links
            </h6>
            {usefullLink.map((el, i) => (
              <p className='mb-4' key={i + 1}>
                <a href="#!">{el}</a>
              </p>
            ))}
          </div>
          <div className=''>
            <h6 className='mb-4 flex justify-center font-semibold uppercase md:justify-start'>
              Contact
            </h6>
            {contactList.map((el, i) => (
              <p className='mb-4' key={i + 1}>
                <a href="#!">{el}</a>
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className='backgroundMain p-6 text-center'>
        <span>© 2025 Copyright:</span>
        <a 
          href="https://github.com/Nailer"
          className='font-semibold'
        >
          Crypto Sukuna
        </a>
      </div>
    </footer>
  )
}

export default Footer;
