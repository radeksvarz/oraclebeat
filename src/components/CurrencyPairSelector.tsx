import { useState } from 'react'
import { Listbox } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/24/outline'

const currencies = [
  { id: 1, name: 'Select Base Currency', code: '' },
  { id: 2, name: 'US Dollar', code: 'USD' },
  { id: 3, name: 'Euro', code: 'EUR' },
  { id: 4, name: 'British Pound', code: 'GBP' },
  { id: 5, name: 'Japanese Yen', code: 'JPY' },
]

export default function CurrencyPairSelector() {
  const [baseCurrency, setBaseCurrency] = useState(currencies[0])
  const [quoteCurrency, setQuoteCurrency] = useState(currencies[0])

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Select Currency Pair</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Base Currency
          </label>
          <Listbox value={baseCurrency} onChange={setBaseCurrency}>
            <div className="relative">
              <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-gray-700 py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2">
                <span className="block truncate">{baseCurrency.name}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-700 py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                {currencies.map((currency) => (
                  <Listbox.Option
                    key={currency.id}
                    value={currency}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-blue-600 text-white' : 'text-gray-300'
                      }`
                    }
                  >
                    {currency.name}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Quote Currency
          </label>
          <Listbox value={quoteCurrency} onChange={setQuoteCurrency}>
            <div className="relative">
              <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-gray-700 py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2">
                <span className="block truncate">{quoteCurrency.name}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-700 py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                {currencies.map((currency) => (
                  <Listbox.Option
                    key={currency.id}
                    value={currency}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-blue-600 text-white' : 'text-gray-300'
                      }`
                    }
                  >
                    {currency.name}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
        </div>
      </div>
    </div>
  )
} 