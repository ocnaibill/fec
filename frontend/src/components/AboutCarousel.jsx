import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importe o axios
import './style/AboutCarousel.css';

import setaEsquerda from '../assets/images/setaEsquerda.svg';
import setaDireita from '../assets/images/setaDireita.svg';

const AboutCarousel = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
    
    const apiUrl = 'https://feconomiacriativa.catolica.edu.br/api/about-carousel/images/';
    
    axios.get(apiUrl)
      .then(response => {
          const urls = response.data.map(item => item.image_url);
          setImages(urls);
      })
      .catch(error => {
        console.error("Erro ao buscar imagens do carrossel:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); 

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

      useEffect(() => {
        if (isPaused || images.length === 0) {
            return;
        }

        const intervalId = setInterval(() => {
            goToNext();
        }, 3000);


        return () => clearInterval(intervalId);

    }, [currentIndex, isPaused, images.length]); 

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  
  const getPositionClass = (index) => {
    const numImages = images.length;
    if (index === currentIndex) return 'center';
    if (index === (currentIndex - 1 + numImages) % numImages) return 'prev';
    if (index === (currentIndex + 1) % numImages) return 'next';
    if (index === (currentIndex - 2 + numImages) % numImages) return 'hidden-prev';
    if (index === (currentIndex + 2) % numImages) return 'hidden-next';
    return 'hidden';
  };

  return (
    <div className="about-carousel-container"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}>
      <div className="about-carousel-wrapper">
        {images.map((image, index) => (
          <div key={index} className={`about-slide ${getPositionClass(index)}`}>
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>

      <button onClick={goToPrevious} className="about-carousel-button prev">
        <img src={setaEsquerda} alt="Anterior" />
      </button>
      <button onClick={goToNext} className="about-carousel-button next">
        <img src={setaDireita} alt="Próximo" />
      </button>
    </div>
  );
};

export default AboutCarousel;