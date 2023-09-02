import { Link } from 'react-router-dom';
import { useState } from 'react'

const Navbar = () => {
  const [state, setState] = useState(false)
  const navigation = [
      { title: "Home", path: "/" },
      { title: "About", path: "/about" },
      { title: "Natiq", path: "/natiq" }
  ]

return (
  <nav className="bg-[#141526] py-2 w-full border-b border-white md:static  ">
      <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
          <div className="flex items-center justify-end py-3 md:py-5 md:block">
              <div className="md:hidden">
                  <button className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
                      onClick={() => setState(!state)}
                  >
                      {
                          state ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="#fff">
                                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                          ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="#fff" viewBox="0 0 24 24" stroke="#fff">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                              </svg>
                          )
                      }
                  </button>
              </div>
          </div>
          <div className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${ state ? 'block' : 'hidden'}`}>
              <ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                  {
                      navigation.map((item) => {
                          return (
                            <li key={item.title} className="text-white text-lg font-normal hover:text-[#18bfff]">
                                <Link to={item.path}>
                                    { item.title }
                                </Link>
                            </li>
                          )
                      })
                  }
              </ul>
          </div>
        
      </div>
  </nav>
)
}
export default Navbar;

