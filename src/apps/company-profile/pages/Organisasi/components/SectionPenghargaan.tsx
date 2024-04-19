import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import gambar1 from '@/assets/telkom.jpg';
import gambar2 from '@/assets/telkom2.jpg';
import gambar3 from '@/assets/telkom3.jpg';
import gambar4 from '@/assets/struktur.png';

function SectionPenghargaan() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const containerStyle = {
    background: '#F0F0F0', // Warna abu-abu
    borderRadius: '20px', // Corner radius
    padding: '20px', // Ruang di sekitar konten
    backdropFilter: 'blur(10px)', // Efek blur pada latar belakang
    marginBottom: '20px', // Menambahkan jarak ke elemen di bawahnya
  };

  const textStyle = {
    background: '#F0F0F0', // Warna abu-abu
    borderRadius: '20px', // Corner radius
    padding: '20px', // Ruang di sekitar konten
    backdropFilter: 'blur(10px)', // Efek blur pada latar belakang
    color: '#FF4B4B', // Warna teks merah
    fontWeight: 'bold', // Membuat teks menjadi tebal
    textAlign: 'center', // Teks berada di tengah
    fontSize: '1.2em', // Ukuran font
  };

  const imgStyle = {
    width: '70%', // Lebar gambar lebih kecil
    height: 'auto', // Menyesuaikan tinggi agar gambar tidak terdistorsi
    maxHeight: '450px', // Tinggi maksimum gambar
    borderRadius: '20px', // Menaikkan corner radius pada gambar
    margin: '0 auto', // Posisi gambar di tengah
    display: 'block', // Menjadikan gambar sebagai blok agar dapat diatur margin
    boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.4), 0px 20px 40px rgba(0, 0, 0, 0.2)', // Efek timbul dengan bayangan yang lebih kuat
  };

  const overlayStyle = {
    position: 'absolute', // Mengubah posisi menjadi absolut
    top: 0, // Menempatkan di bagian atas
    left: 0, // Menempatkan di bagian kiri
    width: '100%', // Lebar sesuai dengan parent
    height: '100%', // Tinggi sesuai dengan parent
    opacity: 0.7, // Opasitas background
    borderRadius: '20px', // Menaikkan corner radius
    background: '#FF4B4B', // Warna background
    zIndex: -1, // Menempatkan di belakang gambar
  };

  const imgContainerStyle = {
    position: 'relative', // Mengubah posisi menjadi relatif
    marginBottom: '20px', // Menambahkan jarak ke elemen di bawahnya
  };

  return (
    <div>
      <div style={containerStyle}>
        <div style={textStyle}>
          Penghargaan Telkom Indonesia
        </div>
        <Slider {...settings}>
          <div style={{textAlign: 'center'}}> {/* Atur posisi teks tengah */}
            <img src={gambar1} alt="" style={imgStyle} />
          </div>
          <div style={{textAlign: 'center'}}> {/* Atur posisi teks tengah */}
            <img src={gambar2} alt="" style={imgStyle} />
          </div>
          <div style={{textAlign: 'center'}}> {/* Atur posisi teks tengah */}
            <img src={gambar3} alt="" style={imgStyle} />
          </div>
        </Slider>
      </div>
      <div style={textStyle}>
        Struktur Group Perusahaan
      </div>
      <div style={imgContainerStyle}>
        <div style={overlayStyle}></div> {/* Background dengan warna FF4B4B */}
        <img src={gambar4} alt="" style={imgStyle} /> {/* Gambar4 */}
      </div>
    </div>
  );
}

export default SectionPenghargaan;
