import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  const lottieRef = useRef(null)
  const lottieInstance = useRef(null)

  
  useEffect(() => {
    if (window.lottie && lottieRef.current) {
      if (lottieInstance.current) {
        lottieInstance.current.destroy()
      }
      lottieInstance.current = window.lottie.loadAnimation({
        container: lottieRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'https://lottie.host/d987597c-7676-4424-8817-7fca6dc1a33e/BVrFXsaeui.json'
      })
    }
    return () => {
      if (lottieInstance.current) {
        lottieInstance.current.destroy()
      }
    }
  }, [])

  return (
    <div className="error-container">
      <div className="lottie-animation" ref={lottieRef}></div>
      <div className="error-content">
        <h1>404</h1>
        <p>Oops! A página que você está procurando não existe.</p>
        <Link to="/" className="btn btn-primary btn-black-text">Voltar</Link>
      </div>
      <style>{`
        .error-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #f8f9fa;
        }
        .error-content {
          text-align: center;
        }
        .error-content h1 {
          font-size: 6rem;
          font-weight: bold;
          margin-bottom: 1rem;
        }
        .error-content p {
          font-size: 1.5rem;
          margin-bottom: 2rem;
        }
        .lottie-animation {
          max-width: 400px;
          margin-bottom: 2rem;
        }

        .btn-transparent {
          background: transparent !important;
          border: 2px solid #111 !important;
          color: #111 !important;
        }
        .btn-transparent:hover, .btn-transparent:focus {
          background: #f1f1f1 !important;
          color: #111 !important;
          border-color: #333 !important;
        }
        .btn-black-text {
          color: #111 !important;
        }
          
      `}</style>
    </div>
  )
}