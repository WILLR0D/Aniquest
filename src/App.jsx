import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import AnimeDetail from './pages/AnimeDetail'
import AnimeModalWrapper from './components/AnimeModalWrapper'

export default function App() {
  const location = useLocation()
  // si venimos de Home, guardamos la ubicación para el modal
  const background = location.state && location.state.background

  return (
    <>
      {/* Renderiza Home o Detail según la URL o el fondo */}
      <Routes location={background || location}>
        <Route path="/" element={<Home />} />
        <Route path="/anime/:id" element={<AnimeDetail />} />
      </Routes>

      {/* Si hay background, abrimos el modal sobre Home */}
      {background && (
        <Routes>
          <Route path="/anime/:id" element={<AnimeModalWrapper />} />
        </Routes>
      )}
    </>
  )
}
