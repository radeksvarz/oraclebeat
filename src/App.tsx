import { ThemeProvider } from './contexts/ThemeContext'
import Header from './components/Header'
import Hero from './components/Hero'
import CurrencyPairSelector from './components/CurrencyPairSelector'
import DataSourceSelector from './components/DataSourceSelector'
import RealTimeRates from './components/RealTimeRates'
import HistoricalRates from './components/HistoricalRates'

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Header />
        <main className="container mx-auto px-4 py-8 space-y-8">
          <Hero />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <CurrencyPairSelector />
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <DataSourceSelector />
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <RealTimeRates />
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <HistoricalRates />
              </div>
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App
