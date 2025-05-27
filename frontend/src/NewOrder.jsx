import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { UserCircleIcon } from '@heroicons/react/24/solid'



export default function NewOrder() {
   const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [currency, setCurrency] = useState("");
  const [frequency, setFrequency] = useState("");
  const [category, setCategory] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [error, setError] = useState("");
  const [submit, setSubmit] = useState("");
  const [user, setUser] = useState("");

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
  }, []);

  const handleSubscription = async (e) => {
  e.preventDefault();
  setError("");
  setSubmit("");
  try {
    const token = localStorage.getItem("token");
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const startdate = yesterday.toISOString();
    const active = "active";
    // Lähetetään tilauksen tiedot backendille
    const res = await axios.post(
      "/api/v1/subscriptions/",
      { name, price, currency, frequency, category, paymentMethod, status: active, startDate: startdate },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setSubmit("Tilauksesi on onnistunut");
    window.location.reload(); // Päivitetään sivu, jotta tilauksen valinnet tyhjentyy
  } catch (err) {
    setError("Tilaus epäonnistui");
  }
};
  return (
    <>
    <div className="flex flex-1 flex-col justify-center m-0">
      <div className="relative isolate overflow-hidden shadow-xl rounded-2xl md:mx-auto mx-5 mt-10 md:w-2/3">
      <Disclosure as="nav" className="bg-amber-400 rounded-t-xl ">
          <div className="mx-auto max-w-full px-5">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* responsiivinen sivu puhelimelle*/}
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
                    <Link to="/new-order" className='bg-slate-800 text-white px-3 py-2 rounded-lg font-semibold'>New Order</Link>
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

         <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-5 pt-2 pb-3">
              <Link to="/home" className='bg-slate-800 text-white px-3 py-2 rounded-lg font-semibold block text-base'>Home</Link>
              <Link to="/new-order" className=' text-white px-3 py-2 rounded-lg font-semibold block text-base hover:bg-slate-400'>New Order</Link>
            </div>
          </DisclosurePanel>
        </Disclosure>
      <div className="relative isolate overflow-hidden bg-slate-800 rounded-b-2xl px-5 pb-10">
          <p className="mt-10 text-2xl font-bold tracking-wide text-slate-200">Hi {user.name}, add a new subscription:</p>
          {submit && <div className="text-green-500 mt-4">{submit}</div>}
      <div className="mt-7">
          <form onSubmit={handleSubscription} method="POST" className="space-y-6 mt-6">{/* Lomake uuden tilauksen tekemiseen */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="name" className="block text-base tracking-wide text-white font-semibold">
                  Subscription Name
                </label>
              </div>
              <div className="mt-2">
                <input value={name} onChange={e => setName(e.target.value)}
                  name="name"
                  type="text"
                  required
                  placeholder='Esim. Amazon Prime'
                  className="block w-full lg:w-2/3 rounded-xl bg-white px-4 py-2 text-lg text-gray-900 outline-2 -outline-offset-1 outline-amber-500 placeholder:text-gray-400 focus:outline-3 focus:-outline-offset-2 focus:outline-sky-400"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="price" className="block text-base tracking-wide text-white font-semibold">
                  Price
                </label>
              </div>
              <div className="mt-2">
                <input value={price} onChange={e => setPrice(e.target.value)}
                  name="price"
                  type="number"
                  required
                  placeholder='Esim. 9.99'
                  className="block w-full lg:w-2/3 rounded-xl bg-white px-4 py-2 text-lg text-gray-900 outline-2 -outline-offset-1 outline-amber-500 placeholder:text-gray-400 focus:outline-3 focus:-outline-offset-2 focus:outline-sky-400"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="currency" className="block text-base tracking-wide text-white font-semibold">
                  Currency
                </label>
              </div>
              <div className="mt-2">
                <select
                  value={currency}
                  onChange={e => setCurrency(e.target.value)}
                  name="currency"
                  required
                  className="block w-full lg:w-2/3 rounded-xl bg-white px-4 py-2 text-lg text-gray-900 outline-2 -outline-offset-1 outline-amber-500 placeholder:text-gray-400 focus:outline-3 focus:-outline-offset-2 focus:outline-sky-400"
                >
                  <option value="" disabled >Select Currency</option>
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                  <option value="GBP">GBP</option>
                  <option value="AUD">AUD</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="frequency" className="block text-base tracking-wide text-white font-semibold">
                  Frequency
                </label>
              </div>
              <div className="mt-2">
                <label htmlFor="frequency" className="inline-flex items-center">
                <input
                  type="radio"
                  name="frequency"
                  value="daily"
                  checked={frequency === "daily"}
                  onChange={e => setFrequency(e.target.value)}
                  className="w-4.5 h-4.5 rounded-full border-4 accent-amber-500"
                  required
                />
                <span className="block ml-2 text-base tracking-wide text-white font-semibold">Daily</span>
              </label>
              <br />
              <label htmlFor="frequency" className="inline-flex items-center">
                <input
                  type="radio"
                  name="frequency"
                  value="weekly"
                  checked={frequency === "weekly"}
                  onChange={e => setFrequency(e.target.value)}
                  className="w-4.5 h-4.5 rounded-full border-4 accent-amber-500"
                />
                <span className="block ml-2 text-base tracking-wide text-white font-semibold">Weekly</span>
              </label>
              <br />
              <label htmlFor="frequency" className="inline-flex items-center">
                <input
                  type="radio"
                  name="frequency"
                  value="monthly"
                  checked={frequency === "monthly"}
                  onChange={e => setFrequency(e.target.value)}
                  className="w-4.5 h-4.5 rounded-full border-4 accent-amber-500"
                />
                <span className="block ml-2 text-base tracking-wide text-white font-semibold">Monthly</span>
              </label>
              <br />
              <label htmlFor="frequency" className="inline-flex items-center">
                <input
                  type="radio"
                  name="frequency"
                  value="yearly"
                  checked={frequency === "yearly"}
                  onChange={e => setFrequency(e.target.value)}
                  className="w-4.5 h-4.5 rounded-full border-4 accent-amber-500"
                />
                <span className="block ml-2 text-base tracking-wide text-white font-semibold">Yearly</span>
              </label>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="category" className="block text-base tracking-wide text-white font-semibold">
                  Category
                </label>
              </div>
              <div className="mt-2">
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  name="category"
                  required
                  className="block w-full lg:w-2/3 rounded-xl bg-white px-4 py-2 text-lg text-gray-900 outline-2 -outline-offset-1 outline-amber-500 placeholder:text-gray-400 focus:outline-3 focus:-outline-offset-2 focus:outline-sky-400"
                >
                  <option value="" disabled >Select Category</option>
                  <option value="finance">Finance</option>
                  <option value="lifestyle">Lifestyle</option>
                  <option value="news">News</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="food">Food</option>
                  <option value="technology">Technology</option>
                  <option value="sports">Sports</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="paymentMethod" className="block text-base tracking-wide text-white font-semibold">
                  Payment Method
                </label>
              </div>
              <div className="mt-2">
                <label htmlFor="paymentMethod" className="inline-flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="credit_card"
                  checked={paymentMethod === "credit_card"}
                  onChange={e => setPaymentMethod(e.target.value)}
                  className="w-4.5 h-4.5 rounded-full border-4 accent-amber-500"
                />
                <span className="block ml-2 text-base tracking-wide text-white font-semibold">Credit Card</span>
              </label>
              <br />
              <label htmlFor="paymentMethod" className="inline-flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="paypal"
                  checked={paymentMethod === "paypal"}
                  onChange={e => setPaymentMethod(e.target.value)}
                  className="w-4.5 h-4.5 rounded-full border-4 accent-amber-500"
                />
                <span className="block ml-2 text-base tracking-wide text-white font-semibold">PayPal</span>
              </label>
              <br />
              <label htmlFor="paymentMethod" className="inline-flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank_transfer"
                  checked={paymentMethod === "bank_transfer"}
                  onChange={e => setPaymentMethod(e.target.value)}
                  className="w-4.5 h-4.5 rounded-full border-4 accent-amber-500"
                />
                <span className="block ml-2 text-base tracking-wide text-white font-semibold">Bank Transfer</span>
              </label>
              <br />
              <label htmlFor="paymentMethod" className="inline-flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="klarna"
                  checked={paymentMethod === "klarna"}
                  onChange={e => setPaymentMethod(e.target.value)}
                  className="w-4.5 h-4.5 rounded-full border-4 accent-amber-500"
                />
                <span className="block ml-2 text-base tracking-wide text-white font-semibold">Klarna</span>
              </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="mt-10 rounded-xl tracking-wide flex transform transition-transform duration-100 hover:scale-105 active:scale-95 justify-center rounded-md bg-amber-500 px-10 py-2 text-lg font-semibold text-white shadow-xs hover:bg-sky-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Add Subscription
              </button>
            </div>
            {error && <div className="mt-4 text-red-500 tracking-wide font-semibold">{error}</div>}
          </form>
      </div>
    </div>
        </div>
      </div>
    </>
  )
}