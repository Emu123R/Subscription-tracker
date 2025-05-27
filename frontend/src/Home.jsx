import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { UserCircleIcon } from '@heroicons/react/24/solid'



export default function Home() {
   const [subscriptions, setSubscriptions] = useState([]);
  const [error, setError] = useState("");
  const [user, setUser] = useState("");


  // Haetaan käyttäjän tiedot tietokannasta
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
      } catch (err) {
        setError("Käyttäjätietoja ei löytynyt");
      }
    };
    fetchUser();
    const fetchSubscriptions = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        if (!token || !userId) return;
        const res = await axios.get(`/api/v1/subscriptions/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSubscriptions(res.data.data);
      } catch (err) {
        setError("Ei vielä tilauksia");
      }
    };
    fetchSubscriptions();
  }, []);

  // näytetään kotisivu jossa näkyy käyttäjän tilaukset
  return (
    <>
    <div className="flex flex-1 flex-col justify-center m-0">
      <div className="relative isolate overflow-hidden shadow-xl rounded-2xl md:mx-auto mx-5 mt-10 md:w-2/3 ">
      
      <Disclosure as="nav" className="bg-amber-400 rounded-t-xl ">
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
                    <Link to="/home" className='bg-slate-800 text-white px-3 py-2 rounded-lg font-semibold'>Home</Link>
                    <Link to="/new-order" className='text-white px-3 py-2 rounded-lg font-semibold text-shadow-md text-shadow-slate-400 hover:bg-slate-400'>New Order</Link>
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
                        Your Profile
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/"
                        className="block px-4 py-2 text-md w-full text-left font-semibold text-white text-shadow-md text-shadow-slate-400 rounded-b-2xl data-focus:bg-white data-focus:text-sky-400 data-focus:outline-hidden"
                      >
                        Sign out
                      </Link>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </div>
          {/* Linkit kotisivulle ja uuden tilauksen tekemiseen */}
          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-5 pt-2 pb-3">
              <Link to="/home" className='bg-slate-800 text-white px-3 py-2 rounded-lg font-semibold block text-base'>Home</Link>
              <Link to="/new-order" className=' text-white px-3 py-2 rounded-lg font-semibold block text-base hover:bg-slate-400'>New Order</Link>
            </div>
          </DisclosurePanel>
        </Disclosure>
      <div className="relative isolate overflow-hidden bg-slate-800 rounded-b-2xl px-5 pb-10">

          <h2 className="mt-10 text-2xl font-bold tracking-wide text-slate-200">
            Welcome to your subscriptions page
          </h2>
          <p className="mt-4 text-slate-200 tracking-wide font-semibold">Hi {user.name}, you are currently subscribed to:</p>
      <div className="max-w-2xl lg:max-w-7xl">
        <div className="mt-10 grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
          {error && <div className="text-red-500 mt-4">{error}</div>}{/* ohjataan käyttäjä new-order sivulle, jos häneltä ei löydy vielä tilauksia */}
            {subscriptions.length === 0 && !error && (
              <div className="relative md:col-span-2 lg:row-span-2">
              <div className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg">
                <div className="text-center bg-white p-6 ">
                  <p className="mb-6 pb-2 border-b border-slate-300 text-xl tracking-wide font-bold text-shadow-sm text-shadow-slate-200 text-amber-400 max-lg:text-center">
                    You don't have any subscriptions yet.
                  </p>
                  <Link to="/new-order" className='text-lg font-medium tracking-wide text-white max-lg:text-center bg-amber-400 text-shadow-md text-shadow-slate-400 rounded-md px-4 py-2 hover:bg-sky-500'>+ New Order</Link>
                  </div>
              </div>
              </div>
            )}{/* Listataan käyttäjän tilauksien tiedot */}
          {subscriptions.map(sub => ( 
            <div className="relative lg:row-span-2">
              <div className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg">
                <div className="flex justify-left bg-amber-400 p-6">
                  <p className="mt-2 text-lg font-medium text-shadow-md text-shadow-slate-400 tracking-wide text-white max-lg:text-center">
                    {sub.name}
                  </p>
                </div>
                <div className="@container relative h-full w-full">
                    <div className="col-span-2 px-5">
                      <p className="pt-5 text-md font-semibold text-slate-800 tracking-wide border-b-2 border-slate-300 pb-2">
                        <b className='text-sky-600'>Type:</b><br /> {sub.category}
                      </p>
                      <p className="mt-2 text-md font-semibold text-slate-800 tracking-wide border-b-2 border-slate-300 pb-2">
                        <b className='text-sky-600'>Price:</b><br /> {sub.price} {sub.currency}
                      </p>
                      <p className="mt-2 text-md font-semibold text-slate-800 tracking-wide border-b-2 border-slate-300 pb-2">
                        <b className='text-sky-600'>Payment Method:</b><br /> {sub.paymentMethod}
                      </p>
                      <p className="mt-2 text-md font-semibold text-slate-800 tracking-wide border-b-2 border-slate-300 pb-2">
                        <b className='text-sky-600'>Frequency:</b><br /> {sub.frequency}
                      </p>
                      <p className="mt-2 text-md font-semibold text-slate-800 tracking-wide border-b-2 border-slate-300 pb-2">
                        <b className='text-sky-600'>Renewal Date:</b><br /> {new Date(sub.renewalDate).toLocaleDateString()} {/* Listataan uusimis päivämäär muotoon dd.kk.vvvv */}
                      </p>
                      <p className="mt-2 text-md font-semibold text-slate-800 tracking-wide pb-5">
                        <b className='text-sky-600'>Status:</b><br /> {sub.status}
                      </p>
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
        </div>
      </div>
    </>
  )
}
