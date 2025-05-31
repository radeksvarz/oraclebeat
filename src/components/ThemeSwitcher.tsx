import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline'

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  const themes = [
    { id: 'light', name: 'Light', icon: SunIcon },
    { id: 'dark', name: 'Dark', icon: MoonIcon },
    { id: 'system', name: 'System', icon: ComputerDesktopIcon },
  ] as const

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="inline-flex items-center justify-center p-2 rounded-lg bg-gray-800 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors">
        {theme === 'light' && <SunIcon className="w-5 h-5" />}
        {theme === 'dark' && <MoonIcon className="w-5 h-5" />}
        {theme === 'system' && <ComputerDesktopIcon className="w-5 h-5" />}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1">
            {themes.map(({ id, name, icon: Icon }) => (
              <Menu.Item key={id}>
                {({ active }) => (
                  <button
                    onClick={() => setTheme(id)}
                    className={`${
                      active ? 'bg-gray-100 dark:bg-gray-700' : ''
                    } ${
                      theme === id ? 'text-blue-600 dark:text-blue-400' : ''
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <Icon className="w-5 h-5 mr-2" aria-hidden="true" />
                    {name}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
} 