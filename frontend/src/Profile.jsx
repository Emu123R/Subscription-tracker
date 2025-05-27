import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { UserCircleIcon } from '@heroicons/react/24/solid'



export default function Profile() {
  const [error, setError] = useState("");
  const [user, setUser] = useState("");

  //Haetaan käyttäjän tiedot tietokannasta
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        if (!token || !userId) return;
        const res = await axios.get(`/api/v1/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data.data);
      } catch (err) { //virhetila
        setError("Käyttäjätietoja ei löytynyt");
      }
    };
    fetchUser();
  }, []);
    // näytetään profiili sivu jossa näkyy käyttäjän nimi ja sähköposti
  return (
    <>
    <div className="flex flex-1 flex-col justify-center m-0">
      <div className="relative isolate overflow-hidden shadow-xl rounded-2xl md:mx-auto mx-5 mt-10 md:w-2/3 ">
      
      <Disclosure as="nav" className="bg-amber-400 rounded-t-xl ">{/* Navikointi palkki */}
          <div className="mx-auto max-w-full px-5">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* responsiivinen puhelin näkymä */}
                <DisclosureButton className="group relative inline-flex items-center justify-start text-slate-800 ">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon aria-hidden="true" className="block size-12 group-data-open:hidden" />
                  <XMarkIcon aria-hidden="true" className="hidden size-12 group-data-open:block" />
                </DisclosureButton>
              </div>
              <div className="flex flex-1 sm:items-stretch justify-start">
                <div className="hidden sm:block">
                  <div className="flex space-x-4">
                    <Link to="/home" className='text-white px-3 py-2 rounded-lg font-semibold text-shadow-md text-shadow-slate-400 hover:bg-slate-400'>Home</Link>
                    <Link to="/new-order" className='text-white px-3 py-2 rounded-lg font-semibold text-shadow-md text-shadow-slate-400 hover:bg-slate-400'>Uusi tilaus</Link>
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex rounded-full text-sm">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <UserCircleIcon aria-hidden="true" className="size-12 text-white" />
                    </MenuButton>
                  </div>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-3 w-48 origin-top-right rounded-b-2xl bg-amber-400 ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                  >
                    <MenuItem>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-md font-semibold text-white text-shadow-md text-shadow-slate-400 data-focus:bg-white data-focus:text-sky-400 data-focus:outline-hidden"
                      >
                        Your Profile {/* käyttäjän profiili */}
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/"
                        className="block px-4 py-2 text-md w-full text-left font-semibold text-white text-shadow-md text-shadow-slate-400 rounded-b-2xl data-focus:bg-white data-focus:text-sky-400 data-focus:outline-hidden"
                      >
                        Sign out {/* Kirjaudu ulos */}
                      </Link>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </div>

          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-5 pt-2 pb-3">
              <Link to="/home" className='bg-slate-800 text-white px-3 py-2 rounded-lg font-semibold block text-base'>Home</Link>
              <Link to="/new-order" className=' text-white px-3 py-2 rounded-lg font-semibold block text-base hover:bg-slate-400'>Uusi tilaus</Link>
            </div>
          </DisclosurePanel>
        </Disclosure>
      <div className="relative isolate overflow-hidden bg-slate-800 rounded-b-2xl px-10 py-10">

          {error && <div className="text-red-500 mt-4">{error}</div>} {/* virhetila */}
          <div className="@container relative h-full w-full">
          <p className="mt-4 text-slate-200 tracking-wide font-semibold">Hi {user.name}.</p>
          <p className="mt-4 text-slate-200 tracking-wide font-semibold">Your email is: {user.email}.</p>
          </div>

    </div>
        </div>
      </div>
    </>
  )
}