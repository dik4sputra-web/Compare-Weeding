// v22
import { useState, useRef } from 'react'

const PLATFORM_STYLES: Record<string, { label: string; bg: string; color: string; border: string }> = {
  instagram: { label: 'Instagram', bg: 'linear-gradient(135deg,#f9ce34,#ee2a7b,#6228d7)', color: '#fff', border: 'transparent' },
  whatsapp:  { label: 'WhatsApp',  bg: '#25D366',                                           color: '#fff', border: 'transparent' },
  tiktok:    { label: 'TikTok',    bg: '#010101',                                           color: '#fff', border: 'transparent' },
  facebook:  { label: 'Facebook',  bg: '#1877F2',                                           color: '#fff', border: 'transparent' },
  website:   { label: 'Website',   bg: '#ffffff',                                           color: '#8c7b75', border: '#e8ddd8' },
}

const PLATFORM_ICONS: Record<string, React.ReactNode> = {
  instagram: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  ),
  whatsapp: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  ),
  tiktok: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/>
    </svg>
  ),
  facebook: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  website: (
    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  ),
}

function SocialLinks({ links }: { links: Vendor['links'] }) {
  const platforms = ['instagram', 'whatsapp', 'facebook', 'tiktok', 'website'] as const
  const entries = platforms.map(p => ({ platform: p, url: links?.[p] })).filter(e => !!e.url)
  if (entries.length === 0) return null
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
      {entries.map(({ platform, url }) => {
        const s = PLATFORM_STYLES[platform]
        return (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            title={s.label}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: s.bg,
              color: s.color,
              border: `1px solid ${s.border}`,
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            {PLATFORM_ICONS[platform]}
          </a>
        )
      })}
    </div>
  )
}


type Category = string

interface Vendor {
  id: string
  name: string
  category: Category
  price: string
  priceNum: number
  rating: number
  reviews: number
  location: string
  experience: string
  image: string
  tags: string[]
  features: Record<string, string | boolean>
  description: string
  links: {
    instagram?: string
    whatsapp?: string
    facebook?: string
    tiktok?: string
    website?: string
  }
  custom?: boolean
}

interface CategoryMeta { id: Category; label: string; icon: string }

const categories: CategoryMeta[] = [
  { id: 'mua', label: 'MUA', icon: '💄' },
  { id: 'decoration', label: 'Dekorasi', icon: '🌸' },
  { id: 'mc', label: 'MC', icon: '🎤' },
  { id: 'music', label: 'Musik / Band', icon: '🎶' },
  { id: 'catering', label: 'Catering', icon: '🍽️' },
  { id: 'photo', label: 'Foto & Video', icon: '📸' },
  { id: 'seserahan', label: 'Seserahan', icon: '🎁' },
  { id: 'souvenir', label: 'Souvenir', icon: '🛍️' },
  { id: 'venue', label: 'Gedung / Venue', icon: '🏛️' },
  { id: 'attire', label: 'Busana Pengantin', icon: '👗' },
  { id: 'invitation', label: 'Undangan', icon: '✉️' },
  { id: 'transport', label: 'Transportasi', icon: '🚗' },
  { id: 'ring', label: 'Cincin Kawin', icon: '💍' },
  { id: 'mahar', label: 'Mahar / Maskawin', icon: '🕌' },
  { id: 'familyattire', label: 'Busana Keluarga', icon: '👨‍👩‍👧' },
  { id: 'accessories', label: 'Aksesoris Pengantin', icon: '👑' },
  { id: 'wo', label: 'Wedding Organizer', icon: '📋' },
]

const featureKeys: Record<Category, string[]> = {
  mua: ['Percobaan Makeup', 'Airbrush', 'Tata Hijab', 'Adat Jawa', 'Gaya Modern', 'Kit Rias Ulang'],
  decoration: ['Bunga Segar', 'Bunga Artificial', 'Backdrop', 'Dekor Lorong', 'Pencahayaan', 'Konsultasi Gratis'],
  mc: ['Bilingual', 'Javanese Adat', 'Akad Nikah', 'Gereja', 'Sound System', 'Rundown Acara'],
  music: ['Live Band', 'Akustik', 'Kuartet Gesek', 'Gamelan', 'Sound System', 'Repertoar Kustom'],
  catering: ['Sertifikasi Halal', 'Vegetarian', 'Menu Barat', 'Menu Nusantara', 'Live Cooking', 'Dekor Meja'],
  photo: ['Fotografi', 'Videografi', 'Drone', 'Same Day Edit', 'Album Fisik', 'Pre-wedding'],
  seserahan: ['Paket Lengkap', 'Kotak Kustom', 'Rangkaian Buah', 'Kue Tradisional', 'Perlengkapan Ibadah', 'Pengiriman'],
  souvenir: ['Nama Kustom', 'Kemasan Premium', 'Min. Pesanan Rendah', 'Ramah Lingkungan', 'Souvenir Edible', 'Ongkir Tersedia'],
  venue: ['Kapasitas 500+', 'Parkir Luas', 'Area Outdoor', 'Katering In-house', 'AC', 'Dekorasi Termasuk'],
  attire: ['Jahit Kustom', 'Sewa', 'Javanese Adat', 'Internasional', 'Busana Tamu', 'Fitting Gratis'],
  invitation: ['Digital', 'Cetak', 'Desain Kustom', 'Amplop Eksklusif', 'Website Nikah', 'RSVP Online'],
  transport: ['Limousine', 'Mobil Klasik', 'Bus Tamu', 'Dekorasi Mobil', 'Sopir Profesional', 'GPS Tracking'],
  ring: ['Ukir Nama', 'Emas 24K', 'Platinum', 'Perak 925', 'Berlian', 'Garansi Seumur Hidup'],
  mahar: ['Logam Mulia', 'Perangkat Sholat', 'Al-Quran', 'Perhiasan', 'Kotak Mahar Kustom', 'Sertifikat'],
  familyattire: ['Seragam Keluarga', 'Ukuran Kustom', 'Bahan Premium', 'Sewa Tersedia', 'Adat Jawa', 'Ongkir Tersedia'],
  accessories: ['Mahkota / Tiara', 'Kerudung Pengantin', 'Set Perhiasan', 'Sepatu Pengantin', 'Sarung Tangan', 'Tas Pesta'],
  wo: ['Konsultasi Gratis', 'Full Day Coverage', 'Koordinasi Vendor', 'Timeline Acara', 'Dekorasi Termasuk', 'Tim Profesional'],
}

const defaultVendors: Vendor[] = [
  // MUA
  { id: 'mua-1', name: 'Sari Ayu Bridal', category: 'mua', price: 'Rp 3.500.000', priceNum: 3500000, rating: 4.9, reviews: 284, location: 'Jakarta Selatan', experience: '2014', image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=300&fit=crop&auto=format', tags: ['Airbrush', 'Hijab Syar\'i', 'Trial Termasuk'], description: 'Berpengalaman lebih dari 10 tahun dalam riasan pengantin adat Jawa dan modern. Menggunakan teknik airbrush profesional dengan produk MAC, NARS, dan Charlotte Tilbury yang tahan lama hingga 12 jam. Setiap paket sudah termasuk trial makeup 2 minggu sebelum hari-H, tata hijab syar\'i, dan touch-up kit untuk pengantin. Sari Ayu Bridal telah menangani lebih dari 300 pernikahan dan menjadi pilihan utama pengantin Jakarta Selatan.', links: { instagram: 'https://instagram.com/sariayu_bridal', whatsapp: 'https://wa.me/6281234567890' }, features: { 'Percobaan Makeup': true, 'Airbrush': true, 'Tata Hijab': true, 'Adat Jawa': true, 'Gaya Modern': true, 'Kit Rias Ulang': true } },
  { id: 'mua-2', name: 'Glam Studio by Rena', category: 'mua', price: 'Rp 2.800.000', priceNum: 2800000, rating: 4.7, reviews: 192, location: 'Bekasi', experience: '2018', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop&auto=format', tags: ['Tampilan Natural', 'HD Makeup', 'Layanan di Lokasi'], description: 'Spesialis tampilan natural dan HD makeup untuk pengantin modern menggunakan produk internasional premium seperti Dior Beauty, Laura Mercier, dan Fenty Beauty. Melayani riasan on-location ke seluruh Jabodetabek tanpa biaya tambahan. Tim terdiri dari 3 makeup artist bersertifikat internasional. Cocok untuk pengantin yang menginginkan tampilan clean, glowy, dan fotogenik di kamera maupun video.', links: { instagram: 'https://instagram.com/glamstudio_rena', tiktok: 'https://tiktok.com/@glamstudio_rena' }, features: { 'Percobaan Makeup': true, 'Airbrush': false, 'Tata Hijab': true, 'Adat Jawa': false, 'Gaya Modern': true, 'Kit Rias Ulang': true } },
  { id: 'mua-3', name: 'Cantik Bersama Dewi', category: 'mua', price: 'Rp 1.900.000', priceNum: 1900000, rating: 4.5, reviews: 108, location: 'Depok', experience: '2021', image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=300&fit=crop&auto=format', tags: ['Ramah Anggaran', 'Natural', 'Sundanese Adat'], description: 'Pilihan tepat bagi pengantin dengan anggaran terbatas namun tetap menginginkan riasan berkualitas. Spesialis riasan pengantin adat Sunda dengan sanggul tradisional dan tata hijab syar\'i. Menggunakan produk lokal premium seperti Wardah, La Tulipe, dan Make Over yang halal dan cocok untuk kulit tropis. Proses rias biasanya 2–2,5 jam dengan hasil yang rapi dan awet sepanjang hari.', links: { whatsapp: 'https://wa.me/6285678901234', facebook: 'https://facebook.com/cantikbersamadewi' }, features: { 'Percobaan Makeup': false, 'Airbrush': false, 'Tata Hijab': true, 'Adat Jawa': false, 'Gaya Modern': true, 'Kit Rias Ulang': false } },
  { id: 'mua-4', name: 'Ayu Maharani MUA', category: 'mua', price: 'Rp 4.200.000', priceNum: 4200000, rating: 4.8, reviews: 176, location: 'Surabaya', experience: '2013', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop&auto=format', tags: ['Airbrush', 'Adat Jawa', 'Premium'], description: 'MUA senior berpengalaman 11 tahun, spesialis riasan pengantin adat Jawa pakem maupun modifikasi. Menggunakan teknik airbrush Dinair dengan produk Giorgio Armani Beauty dan Chanel yang memberikan hasil mewah dan tahan lama hingga 14 jam. Tersedia paket lengkap termasuk riasan ibu mempelai, tata rambut, dan sanggul tradisional. Telah menangani lebih dari 400 klien dari Surabaya, Sidoarjo, Malang, hingga Gresik.', links: { instagram: 'https://instagram.com/ayu_maharani_mua', whatsapp: 'https://wa.me/6281399887766' }, features: { 'Percobaan Makeup': true, 'Airbrush': true, 'Tata Hijab': false, 'Adat Jawa': true, 'Gaya Modern': true, 'Kit Rias Ulang': true } },
  { id: 'mua-5', name: 'Glow Studio Nadira', category: 'mua', price: 'Rp 2.200.000', priceNum: 2200000, rating: 4.6, reviews: 143, location: 'Tangerang', experience: '2019', image: 'https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=400&h=300&fit=crop&auto=format', tags: ['Gaya Modern', 'Tampilan Natural', 'Tata Hijab'], description: 'Makeup artist spesialis teknik contouring dan highlighting terkini untuk pengantin hijab maupun non-hijab. Menggunakan produk kulit sensitif yang aman dan breathable seperti Armani Luminous Silk Foundation dan Too Faced setting spray. Tersedia paket bridesmaid up to 5 orang dengan harga khusus. Glow Nadira juga aktif di TikTok dengan 80k+ followers, hasilnya sering viral karena tampilan natural yang tetap memukau di kamera.', links: { instagram: 'https://instagram.com/glow_nadira', tiktok: 'https://tiktok.com/@glow_nadira' }, features: { 'Percobaan Makeup': true, 'Airbrush': false, 'Tata Hijab': true, 'Adat Jawa': false, 'Gaya Modern': true, 'Kit Rias Ulang': true } },
  // DECORATION
  { id: 'dek-1', name: 'Bloom & Glory Decor', category: 'decoration', price: 'Rp 18.000.000', priceNum: 18000000, rating: 4.9, reviews: 156, location: 'Jakarta Pusat', experience: '2011', image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop&auto=format', tags: ['Bunga Segar', 'Internasional', 'Setup Penuh'], description: 'Penyedia dekorasi pernikahan mewah kelas atas dengan pengalaman 13 tahun. Menggunakan bunga segar impor pilihan seperti garden rose, peony, hydrangea, dan baby\'s breath dari Belanda dan Ekuador. Melayani venue indoor gedung bintang 5 hingga outdoor di resort. Tim terdiri dari 15 dekorator profesional yang mampu setup dalam waktu 8 jam. Konsultasi dan site visit gratis, serta ada paket all-in termasuk dekor pelaminan, lorong, meja tamu, dan photozone.', links: { instagram: 'https://instagram.com/bloom_glorydecor', website: 'https://bloomglorydecor.com' }, features: { 'Bunga Segar': true, 'Bunga Artificial': false, 'Backdrop': true, 'Dekor Lorong': true, 'Pencahayaan': true, 'Konsultasi Gratis': true } },
  { id: 'dek-2', name: 'Petal & Sage Studio', category: 'decoration', price: 'Rp 12.500.000', priceNum: 12500000, rating: 4.7, reviews: 98, location: 'Tangerang', experience: '2017', image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop&auto=format', tags: ['Rustic', 'Bohemian', 'Outdoor'], description: 'Studio dekorasi kreatif spesialis konsep rustic, bohemian, dan woodland yang hangat dan romantis. Menggunakan material natural seperti kayu pallet, dedaunan hijau, dried flower, dan bunga lokal. Cocok untuk venue outdoor, taman, villa, maupun gedung dengan kesan semi-outdoor. Setiap dekorasi dirancang custom sesuai mood board pasangan. Tim juga menyediakan backdrop neon sign dan photobooth digital sebagai pelengkap.', links: { instagram: 'https://instagram.com/petal_sage_studio', tiktok: 'https://tiktok.com/@petal_sage_studio' }, features: { 'Bunga Segar': true, 'Bunga Artificial': true, 'Backdrop': true, 'Dekor Lorong': true, 'Pencahayaan': false, 'Konsultasi Gratis': true } },
  { id: 'dek-3', name: 'Elegance Decoration', category: 'decoration', price: 'Rp 7.500.000', priceNum: 7500000, rating: 4.4, reviews: 74, location: 'Bogor', experience: '2020', image: 'https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?w=400&h=300&fit=crop&auto=format', tags: ['Ramah Anggaran', 'Artificial', 'Indoor'], description: 'Solusi dekorasi pernikahan estetis dengan anggaran terbatas menggunakan bunga artificial kualitas premium yang tampak nyata dan tahan lama. Cocok untuk venue indoor gedung serbaguna, aula, dan rumah. Tersedia lebih dari 50 pilihan warna dan tema termasuk elegant white, dusty rose, sage green, dan gold. Backdrop dan pelaminan dapat dicustom sesuai permintaan. Pengiriman dan setup tersedia di area Bogor, Depok, dan Tangerang.', links: { whatsapp: 'https://wa.me/6281398765432', facebook: 'https://facebook.com/elegancedecoration' }, features: { 'Bunga Segar': false, 'Bunga Artificial': true, 'Backdrop': true, 'Dekor Lorong': false, 'Pencahayaan': false, 'Konsultasi Gratis': false } },
  { id: 'dek-4', name: 'Floral Dreamscape', category: 'decoration', price: 'Rp 22.000.000', priceNum: 22000000, rating: 4.8, reviews: 87, location: 'Jakarta Selatan', experience: '2010', image: 'https://images.unsplash.com/photo-1561128290-000e0e56d9a5?w=400&h=300&fit=crop&auto=format', tags: ['Premium', 'Full Setup', 'Bunga Segar'], description: 'Dekorasi pernikahan premium yang telah memenangkan penghargaan Best Wedding Decor 2022 versi Wedding Market Indonesia. Menggunakan bunga segar pilihan dengan pencahayaan dramatis dari lampu Edison, fairy lights, dan spotlight teatrikal untuk venue eksklusif. Spesialis altar floral arch, ceiling flower installation, dan floral wall bertema mewah. Berpengalaman di Grand Ballroom hotel berbintang 5 di Jakarta dan Bali. Tim berjumlah 20+ orang dengan koordinator lapangan berdedikasi.', links: { instagram: 'https://instagram.com/floral_dreamscape', website: 'https://floraldreamscape.id' }, features: { 'Bunga Segar': true, 'Bunga Artificial': false, 'Backdrop': true, 'Dekor Lorong': true, 'Pencahayaan': true, 'Konsultasi Gratis': true } },
  { id: 'dek-5', name: 'Dekorasi Mulia Mandiri', category: 'decoration', price: 'Rp 5.500.000', priceNum: 5500000, rating: 4.4, reviews: 112, location: 'Bekasi', experience: '2017', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&auto=format', tags: ['Anggaran Hemat', 'Indoor', 'Paket Lengkap'], description: 'Pilihan dekorasi pernikahan terlengkap dengan harga bersaing di area Bekasi dan sekitarnya. Menyediakan paket dekor pelaminan, lorong, meja tamu, dan gerbang buatan dengan pilihan tema modern, islami, hingga tradisional. Bunga artificial kualitas baik dengan warna vivid dan tahan debu. Setup cepat dalam 5–6 jam. Tersedia paket all-in termasuk sewa kursi, meja, backdrop, dan sound system untuk menghemat biaya koordinasi vendor.', links: { whatsapp: 'https://wa.me/6281500600700', instagram: 'https://instagram.com/dekorasi_mulia' }, features: { 'Bunga Segar': false, 'Bunga Artificial': true, 'Backdrop': true, 'Dekor Lorong': true, 'Pencahayaan': false, 'Konsultasi Gratis': true } },
  // MC
  { id: 'mc-1', name: 'Hendro MC Professional', category: 'mc', price: 'Rp 4.500.000', priceNum: 4500000, rating: 4.9, reviews: 320, location: 'Jakarta', experience: '2008', image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=300&fit=crop&auto=format', tags: ['Bilingual', 'Javanese Adat', 'Gereja'], description: 'MC senior dengan 16 tahun pengalaman membawakan lebih dari 500 pernikahan di seluruh Indonesia. Fasih bilingual Indonesia–Inggris dengan penyampaian yang elegan, hangat, dan selalu tepat waktu. Spesialis prosesi akad nikah, adat Jawa, dan pemberkatan gereja. Hendro dikenal karena kemampuannya membaca suasana dan mengelola momen tak terduga dengan profesional. Tersedia paket bundling dengan sound system dan rundown acara tertulis detail.', links: { instagram: 'https://instagram.com/hendro_mc', whatsapp: 'https://wa.me/6281987654321' }, features: { 'Bilingual': true, 'Javanese Adat': true, 'Akad Nikah': true, 'Gereja': true, 'Sound System': false, 'Rundown Acara': true } },
  { id: 'mc-2', name: 'Tania & Co MC', category: 'mc', price: 'Rp 3.200.000', priceNum: 3200000, rating: 4.7, reviews: 148, location: 'Bandung', experience: '2016', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=300&fit=crop&auto=format', tags: ['MC Wanita', 'Modern', 'Interaktif'], description: 'MC wanita energik dan interaktif dengan gaya pembawaan yang fresh, modern, dan tetap elegan. Berpengalaman dalam resepsi modern, garden party, intimate wedding, hingga event hybrid online-offline. Fasih bilingual Indonesia–Inggris, cocok untuk tamu campuran lokal dan internasional. Tania juga menyediakan layanan konsultasi rundown acara gratis dan siap berkoordinasi langsung dengan tim WO maupun keluarga untuk memastikan acara berjalan mulus.', links: { instagram: 'https://instagram.com/tania_mc', tiktok: 'https://tiktok.com/@tania_mc', facebook: 'https://facebook.com/taniacomc' }, features: { 'Bilingual': true, 'Javanese Adat': false, 'Akad Nikah': false, 'Gereja': true, 'Sound System': false, 'Rundown Acara': true } },
  { id: 'mc-3', name: 'Bima Satria MC', category: 'mc', price: 'Rp 2.000.000', priceNum: 2000000, rating: 4.4, reviews: 89, location: 'Yogyakarta', experience: '2020', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop&auto=format', tags: ['Javanese Adat', 'Javanese Language', 'Anggaran Hemat'], description: 'MC muda berbakat dengan spesialisasi kuat dalam prosesi pernikahan adat Jawa. Fasih menggunakan Bahasa Jawa Krama Inggil yang halus dan tepat untuk siraman, midodareni, akad, hingga resepsi. Memahami secara mendalam filosofi dan urutan prosesi adat Jawa klasik maupun modifikasi. Tersedia paket bundling dengan sound system portabel. Cocok untuk pernikahan sederhana namun berkesan di daerah Yogyakarta, Klaten, Magelang, dan sekitarnya.', links: { whatsapp: 'https://wa.me/6282345678901' }, features: { 'Bilingual': false, 'Javanese Adat': true, 'Akad Nikah': true, 'Gereja': false, 'Sound System': true, 'Rundown Acara': true } },
  { id: 'mc-4', name: 'Rizky Pratama MC', category: 'mc', price: 'Rp 3.800.000', priceNum: 3800000, rating: 4.8, reviews: 201, location: 'Surabaya', experience: '2014', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop&auto=format', tags: ['Bilingual', 'Interaktif', 'Akad Nikah'], description: 'MC profesional bilingual Indonesia–Inggris dengan gaya pembawaan yang hangat, personal, dan selalu disesuaikan dengan karakter pasangan. Berpengalaman membawakan akad nikah, resepsi modern, intimate wedding, dan pernikahan di venue luar kota. Sound system profesional sudah termasuk dalam paket. Rizky dikenal karena selalu hadir untuk gladi resik H-1 tanpa biaya tambahan dan menyiapkan script MC yang dipersonalisasi khusus untuk setiap pasangan.', links: { instagram: 'https://instagram.com/rizky_mc', whatsapp: 'https://wa.me/6281600700800' }, features: { 'Bilingual': true, 'Adat Jawa': false, 'Akad Nikah': true, 'Gereja': false, 'Sound System': true, 'Rundown Acara': true } },
  { id: 'mc-5', name: 'Siti Rahayu MC Pernikahan', category: 'mc', price: 'Rp 1.800.000', priceNum: 1800000, rating: 4.3, reviews: 78, location: 'Yogyakarta', experience: '2020', image: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=400&h=300&fit=crop&auto=format', tags: ['MC Wanita', 'Anggaran Hemat', 'Adat Jawa'], description: 'MC wanita dengan pembawaan anggun, berwibawa, dan penuh empati untuk prosesi pernikahan yang sakral. Spesialis adat Jawa termasuk siraman, midodareni, akad nikah, dan resepsi dengan bahasa Jawa Krama yang tepat. Memiliki latar belakang seni budaya Jawa sehingga mampu menjelaskan makna setiap prosesi kepada tamu. Harga sangat terjangkau dengan kualitas yang tidak kalah dari MC senior. Aktif melayani wilayah DIY, Jawa Tengah, dan Jawa Timur bagian barat.', links: { whatsapp: 'https://wa.me/6282300400500' }, features: { 'Bilingual': false, 'Adat Jawa': true, 'Akad Nikah': true, 'Gereja': false, 'Sound System': false, 'Rundown Acara': true } },
  // MUSIC
  { id: 'mus-1', name: 'Harmoni Wedding Band', category: 'music', price: 'Rp 12.000.000', priceNum: 12000000, rating: 4.9, reviews: 201, location: 'Jakarta', experience: '2012', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=300&fit=crop&auto=format', tags: ['Live Band', '7 Members', 'Jazz & Pop'], description: 'Band pernikahan premium beranggotakan 7 musisi profesional lulusan sekolah musik ternama. Repertoar mencakup jazz, pop Indonesia, pop mancanegara, dan keroncong romantis. Menggunakan sound system berkualitas tinggi dengan engineer suara berdedikasi untuk memastikan kualitas audio terbaik di setiap venue. Tersedia paket pra-pernikahan (live music akustik untuk siraman/midodareni) dan paket resepsi penuh. Berpengalaman tampil di lebih dari 200 pernikahan dan event hotel bintang 5.', links: { instagram: 'https://instagram.com/harmoni_band', website: 'https://harmoniband.id', whatsapp: 'https://wa.me/6281123456789' }, features: { 'Live Band': true, 'Akustik': true, 'Kuartet Gesek': false, 'Gamelan': false, 'Sound System': true, 'Repertoar Kustom': true } },
  { id: 'mus-2', name: 'Senar Emas Quartet', category: 'music', price: 'Rp 8.500.000', priceNum: 8500000, rating: 4.8, reviews: 134, location: 'Surabaya', experience: '2015', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&auto=format', tags: ['Kuartet Gesek', 'Klasik', 'Akad Nikah'], description: 'Kuartet gesek profesional terdiri dari 2 biola, 1 biola alto, dan 1 cello dengan kualitas suara yang mewah dan menghanyutkan. Sempurna untuk mengisi suasana prosesi akad nikah, jalan masuk pengantin, dan cocktail hour. Mampu membawakan musik klasik (Bach, Vivaldi), pop romantis (Ed Sheeran, John Legend), hingga lagu Nusantara dalam aransemen gesek yang indah. Semua anggota berpengalaman tampil di event internasional dan bersedia menerima request lagu custom.', links: { instagram: 'https://instagram.com/senar_emas', facebook: 'https://facebook.com/senaremas' }, features: { 'Live Band': false, 'Akustik': true, 'Kuartet Gesek': true, 'Gamelan': false, 'Sound System': false, 'Repertoar Kustom': true } },
  { id: 'mus-3', name: 'Nusantara Gamelan Group', category: 'music', price: 'Rp 6.000.000', priceNum: 6000000, rating: 4.6, reviews: 67, location: 'Yogyakarta', experience: '2006', image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400&h=300&fit=crop&auto=format', tags: ['Gamelan', 'Javanese Adat', 'Tradisional'], description: 'Ensemble gamelan Jawa otentik beranggotakan 12 penabuh berpengalaman lebih dari dua dekade dalam pernikahan adat. Memainkan gendhing-gendhing Jawa klasik seperti Ladrang Wilujeng, Gendhing Ketawang Sri Narendra, dan lancaran untuk pengiring prosesi siraman, midodareni, dan panggih. Instrumen gamelan asli dari kayu jati dan perunggu berkualitas tinggi. Tersedia pula paket campuran gamelan + keroncong untuk resepsi yang lebih variatif.', links: { whatsapp: 'https://wa.me/6287654321098', facebook: 'https://facebook.com/nusantaragamelan' }, features: { 'Live Band': false, 'Akustik': true, 'Kuartet Gesek': false, 'Gamelan': true, 'Sound System': true, 'Repertoar Kustom': false } },
  { id: 'mus-4', name: 'Akustik Cinta Duo', category: 'music', price: 'Rp 4.500.000', priceNum: 4500000, rating: 4.7, reviews: 98, location: 'Bandung', experience: '2016', image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=300&fit=crop&auto=format', tags: ['Live Band', 'Akustik', 'Romantis'], description: 'Duo akustik romantis dengan suara yang harmonis dan hangat, ideal untuk intimate wedding, akad nikah, dan cocktail hour. Membawakan lagu-lagu pilihan dalam genre pop romantis, bossa nova, dan acoustic cover dari musisi favorit pasangan. Menggunakan gitar akustik premium dan vokal dua suara yang saling melengkapi. Tersedia request lagu khusus (first dance song) yang dilatih minimal 2 minggu sebelum hari-H tanpa biaya tambahan.', links: { instagram: 'https://instagram.com/akustik_cinta', whatsapp: 'https://wa.me/6281700800900' }, features: { 'Live Band': false, 'Akustik': true, 'Kuartet Gesek': false, 'Gamelan': false, 'Sound System': true, 'Repertoar Kustom': true } },
  { id: 'mus-5', name: 'All Genre Wedding Band', category: 'music', price: 'Rp 18.000.000', priceNum: 18000000, rating: 4.9, reviews: 154, location: 'Jakarta', experience: '2009', image: 'https://images.unsplash.com/photo-1501612780327-45045538702b?w=400&h=300&fit=crop&auto=format', tags: ['Live Band', 'Sound System', 'Repertoar Kustom'], description: 'Band pernikahan all-genre terlengkap di Jakarta dengan 10 personel profesional termasuk brass section (saxophone, trumpet, trombone). Mampu memainkan semua genre: pop, jazz, R&B, keroncong, dangdut koplo, hingga EDM untuk pesta after party. Dilengkapi sound system 20.000 watt, 4 monitor panggung, dan lighting otomatis yang mengikuti ritme musik. Tersedia paket custom dari 2 jam hingga full night dan dapat digabung dengan DJ set sebagai pelengkap.', links: { instagram: 'https://instagram.com/allgenre_band', website: 'https://allgenreband.com', whatsapp: 'https://wa.me/6281234500000' }, features: { 'Live Band': true, 'Akustik': true, 'Kuartet Gesek': false, 'Gamelan': false, 'Sound System': true, 'Repertoar Kustom': true } },
  // CATERING
  { id: 'cat-1', name: 'Mustika Rasa Catering', category: 'catering', price: 'Rp 95.000/pax', priceNum: 95000, rating: 4.8, reviews: 412, location: 'Jakarta', experience: '2004', image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=400&h=300&fit=crop&auto=format', tags: ['500–5000 pax', 'Buffet', 'Sertifikasi Halal'], description: 'Katering pernikahan premium bersertifikat halal MUI dengan kapasitas 500–5000 pax. Telah melayani lebih dari 1000 pernikahan sejak 2004 termasuk acara kenegaraan dan VVIP. Menu mencakup 50+ pilihan masakan Nusantara dan internasional dengan opsi live cooking station (dim sum, sate, grill, pasta). Semua bahan segar dipilih harian, chef berpengalaman 15+ tahun, dan tim service terlatih memakai seragam resmi. Gratis dekor meja dan ice carving untuk pesanan di atas 500 pax.', links: { website: 'https://mustarasa.co.id', instagram: 'https://instagram.com/mustika_rasa', whatsapp: 'https://wa.me/6281200001111' }, features: { 'Sertifikasi Halal': true, 'Vegetarian': true, 'Menu Barat': true, 'Menu Nusantara': true, 'Live Cooking': true, 'Dekor Meja': true } },
  { id: 'cat-2', name: 'Dapur Istimewa', category: 'catering', price: 'Rp 72.000/pax', priceNum: 72000, rating: 4.7, reviews: 289, location: 'Bandung', experience: '2010', image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop&auto=format', tags: ['100–2000 pax', 'Fusion', 'Halal'], description: 'Katering dengan konsep fusion modern yang memadukan teknik memasak internasional dengan bahan dan rempah lokal Indonesia. Dikelola oleh chef lulusan Le Cordon Bleu Jakarta. Menu andalan: rendang saus truffle, nasi goreng mentai, sate jamur dengan saus fusion, dan dessert macaron batik. Kapasitas 100–2000 pax dengan paket semi-buffet maupun plated dinner elegan. Sertifikasi halal MUI aktif dan tersedia opsi menu vegetarian dan vegan.', links: { website: 'https://dapuristimewa.com', facebook: 'https://facebook.com/dapuristimewa' }, features: { 'Sertifikasi Halal': true, 'Vegetarian': true, 'Menu Barat': true, 'Menu Nusantara': true, 'Live Cooking': false, 'Dekor Meja': true } },
  { id: 'cat-3', name: 'Sederhana Barakah', category: 'catering', price: 'Rp 45.000/pax', priceNum: 45000, rating: 4.5, reviews: 178, location: 'Bekasi', experience: '2016', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop&auto=format', tags: ['50–1000 pax', 'Anggaran Hemat', 'Halal'], description: 'Katering rumahan dengan cita rasa autentik masakan Betawi dan Jawa yang lezat dan familiar. Menu favorit: nasi uduk Betawi, ayam bakar kecap, semur daging, sayur asem, dan aneka gorengan hangat. Halal tanpa MSG dengan bahan segar yang dimasak di hari yang sama. Kapasitas 50–1000 pax cocok untuk resepsi di rumah, tenda, maupun gedung serbaguna. Harga paling terjangkau di area Bekasi dengan kualitas yang konsisten dan rasa yang tidak pernah mengecewakan.', links: { instagram: 'https://instagram.com/sederhana_barakah', whatsapp: 'https://wa.me/6289876543210' }, features: { 'Sertifikasi Halal': true, 'Vegetarian': false, 'Menu Barat': false, 'Menu Nusantara': true, 'Live Cooking': false, 'Dekor Meja': false } },
  { id: 'cat-4', name: 'Nusarasa Catering Premium', category: 'catering', price: 'Rp 115.000/pax', priceNum: 115000, rating: 4.9, reviews: 321, location: 'Jakarta Selatan', experience: '2007', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop&auto=format', tags: ['Premium', 'Live Cooking', 'Sertifikasi Halal'], description: 'Katering premium dengan executive chef berpengalaman 20+ tahun di hotel berbintang. Menyajikan hidangan Nusantara otentik (gulai kambing, rendang wagyu, soto Betawi) dan internasional (grilled salmon, beef tenderloin, pasta arrabbiata) dalam penyajian plated dinner maupun grand buffet. Live cooking station tersedia: BBQ grill, sushi counter, dan dessert bar. Tersertifikasi halal MUI dan ISO 9001. Melayani 200–3000 pax dengan koordinator katering khusus per event.', links: { website: 'https://nusarasa.co.id', instagram: 'https://instagram.com/nusarasa_catering', whatsapp: 'https://wa.me/6281900000111' }, features: { 'Sertifikasi Halal': true, 'Vegetarian': true, 'Menu Barat': true, 'Menu Nusantara': true, 'Live Cooking': true, 'Dekor Meja': true } },
  { id: 'cat-5', name: 'Katering Berkah Sejahtera', category: 'catering', price: 'Rp 38.000/pax', priceNum: 38000, rating: 4.3, reviews: 198, location: 'Bogor', experience: '2015', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop&auto=format', tags: ['Anggaran Hemat', 'Sertifikasi Halal', 'Min. 100 pax'], description: 'Katering halal ekonomis yang tidak mengorbankan kualitas rasa. Spesialis menu prasmanan sederhana namun memuaskan: nasi putih, ayam goreng/bakar, tumis sayur, tempe tahu, dan es buah segar. Cocok untuk pesta sederhana di rumah, arisan, maupun walimahan dengan anggaran terbatas. Minimum order 100 pax, tersedia perlengkapan makan lengkap (piring, sendok, gelas). Pengiriman gratis radius 15 km dari Bogor Kota dengan armada pendingin higienis.', links: { whatsapp: 'https://wa.me/6282100200300', instagram: 'https://instagram.com/katering_berkah' }, features: { 'Sertifikasi Halal': true, 'Vegetarian': false, 'Menu Barat': false, 'Menu Nusantara': true, 'Live Cooking': false, 'Dekor Meja': false } },
  // PHOTO
  { id: 'fv-1', name: 'Lensa Cinta Studio', category: 'photo', price: 'Rp 15.000.000', priceNum: 15000000, rating: 4.9, reviews: 267, location: 'Jakarta', experience: '2013', image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=300&fit=crop&auto=format', tags: ['Sinematik', 'Drone', 'Premium Album'], description: 'Studio foto dan video pernikahan sinematik dengan standar internasional. Menggunakan kamera Sony A7 IV, Canon EOS R5, drone DJI Mavic 3, dan gimbal Ronin RS3 Pro. Tim terdiri dari 2 fotografer, 2 videografer, dan 1 drone pilot profesional. Hasil editing menggunakan teknik color grading sinematik ala film Hollywood. Tersedia same day edit (SDE) yang ditayangkan di akhir resepsi, album hardcover premium 40 halaman, dan video highlight 5–7 menit. Booking minimal 3 bulan sebelum hari-H.', links: { website: 'https://lensacinta.com', instagram: 'https://instagram.com/lensacinta_studio' }, features: { 'Fotografi': true, 'Videografi': true, 'Drone': true, 'Same Day Edit': true, 'Album Fisik': true, 'Pre-wedding': true } },
  { id: 'fv-2', name: 'Moment Abadi Photo', category: 'photo', price: 'Rp 9.500.000', priceNum: 9500000, rating: 4.7, reviews: 189, location: 'Surabaya', experience: '2017', image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&h=300&fit=crop&auto=format', tags: ['Foto Saja', 'Editorial', 'Candid'], description: 'Fotografer spesialis candid editorial yang mahir menangkap momen-momen autentik, jujur, dan penuh emosi tanpa arah berlebihan. Gaya foto terinspirasi dari editorial fashion magazine dengan tonal warm-film yang khas. Menggunakan Leica M11 dan Fujifilm GFX untuk kualitas medium format yang menakjubkan. Setiap paket menghasilkan 500–800 foto pilihan yang diedit manual satu per satu. Tersedia sesi pre-wedding lokasi pilihan dan layanan cetak album hardcover premium.', links: { instagram: 'https://instagram.com/momentabadi', tiktok: 'https://tiktok.com/@momentabadi' }, features: { 'Fotografi': true, 'Videografi': false, 'Drone': false, 'Same Day Edit': false, 'Album Fisik': true, 'Pre-wedding': true } },
  { id: 'fv-3', name: 'Cerita Kita Videography', category: 'photo', price: 'Rp 6.800.000', priceNum: 6800000, rating: 4.5, reviews: 112, location: 'Yogyakarta', experience: '2019', image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=400&h=300&fit=crop&auto=format', tags: ['Video Saja', 'Sinematik', 'Anggaran Hemat'], description: 'Videografer spesialis film pernikahan sinematik dengan estetika soft dan romantis. Menggunakan Sony FX3, DJI drone, dan stabilizer gimbal 3-axis untuk footage yang mulus dan sinematik. Paket termasuk video highlight 5–7 menit, video full ceremony raw cut, dan SDE (same day edit) yang diputar di akhir resepsi. Color grading dilakukan manual dengan gaya moody cinematic. Cocok untuk pasangan muda yang menginginkan kenangan pernikahan seperti film pendek profesional dengan harga ramah anggaran.', links: { instagram: 'https://instagram.com/ceritakita_video', whatsapp: 'https://wa.me/6281345678901' }, features: { 'Fotografi': false, 'Videografi': true, 'Drone': true, 'Same Day Edit': true, 'Album Fisik': false, 'Pre-wedding': false } },
  { id: 'fv-4', name: 'Visual Story Studio', category: 'photo', price: 'Rp 12.000.000', priceNum: 12000000, rating: 4.8, reviews: 145, location: 'Bandung', experience: '2014', image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=300&fit=crop&auto=format', tags: ['Fotografi', 'Videografi', 'Drone'], description: 'Studio dokumentasi pernikahan lengkap fotografi dan videografi dengan gaya editorial modern yang clean dan timeless. Tim profesional terdiri dari 2 fotografer dan 2 videografer spesialis wedding. Dilengkapi drone DJI Air 3 untuk aerial shot yang dramatis dan gimbal video untuk footage sinematik. Same day edit (SDE) disiapkan dalam 4–5 jam dan ditayangkan di penghujung resepsi. Color grading bertema "airy light" yang populer di Instagram. Tersedia sesi pre-wedding lokasi Bandung dan sekitarnya.', links: { instagram: 'https://instagram.com/visual_story_studio', website: 'https://visualstory.id' }, features: { 'Fotografi': true, 'Videografi': true, 'Drone': true, 'Same Day Edit': true, 'Album Fisik': false, 'Pre-wedding': true } },
  { id: 'fv-5', name: 'Foto Bahagia Abadi', category: 'photo', price: 'Rp 4.500.000', priceNum: 4500000, rating: 4.4, reviews: 167, location: 'Depok', experience: '2018', image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&h=300&fit=crop&auto=format', tags: ['Fotografi', 'Anggaran Hemat', 'Album Fisik'], description: 'Fotografi pernikahan berkualitas dengan paket ekonomis, termasuk album fisik eksklusif dan file digital.', links: { whatsapp: 'https://wa.me/6281200300400', instagram: 'https://instagram.com/foto_bahagia' }, features: { 'Fotografi': true, 'Videografi': false, 'Drone': false, 'Same Day Edit': false, 'Album Fisik': true, 'Pre-wedding': true } },
  // SESERAHAN
  { id: 'ses-1', name: 'Hantaran Cantik Nusantara', category: 'seserahan', price: 'Rp 4.500.000', priceNum: 4500000, rating: 4.9, reviews: 187, location: 'Jakarta Selatan', experience: '2016', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=300&fit=crop&auto=format', tags: ['Paket Lengkap', 'Javanese Adat', 'Kustom'], description: 'Paket seserahan lengkap dengan dekorasi adat Jawa, tersedia dalam berbagai pilihan paket.', links: { instagram: 'https://instagram.com/hantaran_cantik', whatsapp: 'https://wa.me/6281555666777' }, features: { 'Paket Lengkap': true, 'Kotak Kustom': true, 'Rangkaian Buah': true, 'Kue Tradisional': true, 'Perlengkapan Ibadah': true, 'Pengiriman': true } },
  { id: 'ses-2', name: 'Kotak Hantaran Elegan', category: 'seserahan', price: 'Rp 2.800.000', priceNum: 2800000, rating: 4.7, reviews: 134, location: 'Bandung', experience: '2019', image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop&auto=format', tags: ['Modern', 'Kotak Kustom', 'Minimalis'], description: 'Seserahan minimalis modern dengan kotak kustom premium dan penyajian yang elegan.', links: { instagram: 'https://instagram.com/kotak_elegan', tiktok: 'https://tiktok.com/@kotak_elegan' }, features: { 'Paket Lengkap': true, 'Kotak Kustom': true, 'Rangkaian Buah': false, 'Kue Tradisional': false, 'Perlengkapan Ibadah': true, 'Pengiriman': true } },
  { id: 'ses-3', name: 'Barokah Hantaran', category: 'seserahan', price: 'Rp 1.500.000', priceNum: 1500000, rating: 4.5, reviews: 89, location: 'Bekasi', experience: '2021', image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=400&h=300&fit=crop&auto=format', tags: ['Ramah Anggaran', 'Sundanese Adat', 'Complete'], description: 'Paket seserahan lengkap dengan harga ramah kantong, cocok untuk anggaran terbatas.', links: { whatsapp: 'https://wa.me/6282200334455', facebook: 'https://facebook.com/barokahhantaran' }, features: { 'Paket Lengkap': true, 'Kotak Kustom': false, 'Rangkaian Buah': true, 'Kue Tradisional': true, 'Perlengkapan Ibadah': true, 'Pengiriman': false } },
  { id: 'ses-4', name: 'Hantaran Istimewa Ayu', category: 'seserahan', price: 'Rp 3.200.000', priceNum: 3200000, rating: 4.7, reviews: 112, location: 'Solo', experience: '2015', image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop&auto=format', tags: ['Paket Lengkap', 'Kustom', 'Batik'], description: 'Hantaran dengan sentuhan batik Solo yang elegan, setiap item disusun rapi dalam kotak premium berlapis kain.', links: { instagram: 'https://instagram.com/hantaran_ayu', whatsapp: 'https://wa.me/6281400500600' }, features: { 'Paket Lengkap': true, 'Kotak Kustom': true, 'Rangkaian Buah': true, 'Kue Tradisional': true, 'Perlengkapan Ibadah': true, 'Pengiriman': false } },
  { id: 'ses-5', name: 'Modern Hantaran Studio', category: 'seserahan', price: 'Rp 1.800.000', priceNum: 1800000, rating: 4.5, reviews: 89, location: 'Tangerang', experience: '2019', image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=400&h=300&fit=crop&auto=format', tags: ['Minimalis', 'Modern', 'Anggaran Hemat'], description: 'Seserahan bergaya minimalis modern dengan kemasan bersih dan estetis, cocok untuk tema pernikahan kekinian.', links: { instagram: 'https://instagram.com/modern_hantaran', tiktok: 'https://tiktok.com/@modern_hantaran' }, features: { 'Paket Lengkap': false, 'Kotak Kustom': true, 'Rangkaian Buah': false, 'Kue Tradisional': false, 'Perlengkapan Ibadah': true, 'Pengiriman': true } },
  // SOUVENIR
  { id: 'suv-1', name: 'Kenangan Abadi Souvenir', category: 'souvenir', price: 'Rp 15.000/pcs', priceNum: 15000, rating: 4.8, reviews: 298, location: 'Yogyakarta', experience: '2014', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&auto=format', tags: ['Nama Kustom', 'Min. 100 pcs', 'Ramah Lingkungan'], description: 'Souvenir pernikahan ramah lingkungan dengan nama dan tanggal pernikahan kustom.', links: { instagram: 'https://instagram.com/kenangan_abadi', whatsapp: 'https://wa.me/6281700800900' }, features: { 'Nama Kustom': true, 'Kemasan Premium': true, 'Min. Pesanan Rendah': false, 'Ramah Lingkungan': true, 'Souvenir Edible': false, 'Ongkir Tersedia': true } },
  { id: 'suv-2', name: 'Manis Bersama Hampers', category: 'souvenir', price: 'Rp 22.000/pcs', priceNum: 22000, rating: 4.9, reviews: 201, location: 'Surabaya', experience: '2018', image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=400&h=300&fit=crop&auto=format', tags: ['Edible', 'Hampers', 'Premium'], description: 'Souvenir hamper makanan premium dengan kemasan indah dan cita rasa lezat.', links: { instagram: 'https://instagram.com/manis_hampers', tiktok: 'https://tiktok.com/@manis_hampers', website: 'https://manishampers.com' }, features: { 'Nama Kustom': true, 'Kemasan Premium': true, 'Min. Pesanan Rendah': true, 'Ramah Lingkungan': false, 'Souvenir Edible': true, 'Ongkir Tersedia': true } },
  { id: 'suv-3', name: 'Unik Gift Studio', category: 'souvenir', price: 'Rp 9.500/pcs', priceNum: 9500, rating: 4.5, reviews: 156, location: 'Jakarta', experience: '2020', image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop&auto=format', tags: ['Min. 50 pcs', 'Anggaran Hemat', 'Unik'], description: 'Souvenir unik dan terjangkau dengan minimum pesanan rendah, ideal untuk anggaran ketat.', links: { instagram: 'https://instagram.com/unik_gift', facebook: 'https://facebook.com/unikgiftstudio' }, features: { 'Nama Kustom': true, 'Kemasan Premium': false, 'Min. Pesanan Rendah': true, 'Ramah Lingkungan': false, 'Souvenir Edible': false, 'Ongkir Tersedia': true } },
  { id: 'suv-4', name: 'Kreasi Souvenir Etnik', category: 'souvenir', price: 'Rp 18.000/pcs', priceNum: 18000, rating: 4.8, reviews: 178, location: 'Solo', experience: '2013', image: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&h=300&fit=crop&auto=format', tags: ['Batik', 'Nama Kustom', 'Etnik'], description: 'Souvenir etnik bertema batik dengan ukiran nama kustom, dibuat oleh pengrajin lokal berpengalaman.', links: { instagram: 'https://instagram.com/kreasi_etnik', whatsapp: 'https://wa.me/6281600700800' }, features: { 'Nama Kustom': true, 'Kemasan Premium': true, 'Min. Pesanan Rendah': false, 'Ramah Lingkungan': true, 'Souvenir Edible': false, 'Ongkir Tersedia': true } },
  { id: 'suv-5', name: 'Sweet Box Souvenir', category: 'souvenir', price: 'Rp 12.000/pcs', priceNum: 12000, rating: 4.6, reviews: 234, location: 'Jakarta', experience: '2017', image: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400&h=300&fit=crop&auto=format', tags: ['Souvenir Edible', 'Min. Pesanan Rendah', 'Premium'], description: 'Souvenir kue kering premium dalam kotak cantik dengan nama kustom, minimum pesanan hanya 50 pcs.', links: { instagram: 'https://instagram.com/sweetbox_souvenir', tiktok: 'https://tiktok.com/@sweetbox_souvenir', whatsapp: 'https://wa.me/6281900100200' }, features: { 'Nama Kustom': true, 'Kemasan Premium': true, 'Min. Pesanan Rendah': true, 'Ramah Lingkungan': false, 'Souvenir Edible': true, 'Ongkir Tersedia': true } },
  // VENUE
  { id: 'ven-1', name: 'Grand Ballroom Mulia', category: 'venue', price: 'Rp 120.000.000', priceNum: 120000000, rating: 4.9, reviews: 143, location: 'Jakarta Pusat', experience: '2001', image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=300&fit=crop&auto=format', tags: ['2000 pax', 'Hotel Bintang 5', 'Layanan Penuh'], description: 'Ballroom bintang lima mewah berkapasitas hingga 2000 tamu, fasilitas lengkap dan pelayanan prima.', links: { website: 'https://mulia.com', instagram: 'https://instagram.com/grandballroom_mulia' }, features: { 'Kapasitas 500+': true, 'Parkir Luas': true, 'Area Outdoor': false, 'Katering In-house': true, 'AC': true, 'Dekorasi Termasuk': false } },
  { id: 'ven-2', name: 'Taman Sari Garden Venue', category: 'venue', price: 'Rp 55.000.000', priceNum: 55000000, rating: 4.8, reviews: 97, location: 'Bogor', experience: '2012', image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop&auto=format', tags: ['Outdoor', '800 pax', 'Taman'], description: 'Venue taman outdoor yang asri dengan pemandangan hijau, ideal untuk pernikahan di udara terbuka.', links: { instagram: 'https://instagram.com/tamansari_venue', whatsapp: 'https://wa.me/6282511122334' }, features: { 'Kapasitas 500+': true, 'Parkir Luas': true, 'Area Outdoor': true, 'Katering In-house': false, 'AC': false, 'Dekorasi Termasuk': false } },
  { id: 'ven-3', name: 'Gedung Amanah Wedding', category: 'venue', price: 'Rp 28.000.000', priceNum: 28000000, rating: 4.5, reviews: 201, location: 'Depok', experience: '2008', image: 'https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?w=400&h=300&fit=crop&auto=format', tags: ['500 pax', 'Anggaran Hemat', 'Indoor'], description: 'Gedung pernikahan elegan dengan harga terjangkau, berkapasitas 500 tamu.', links: { instagram: 'https://instagram.com/gedung_amanah', facebook: 'https://facebook.com/gedungamanahwedding', whatsapp: 'https://wa.me/6281988776655' }, features: { 'Kapasitas 500+': true, 'Parkir Luas': true, 'Area Outdoor': false, 'Katering In-house': true, 'AC': true, 'Dekorasi Termasuk': true } },
  { id: 'ven-4', name: 'Villa Nirwana Wedding', category: 'venue', price: 'Rp 75.000.000', priceNum: 75000000, rating: 4.8, reviews: 76, location: 'Bali', experience: '2012', image: 'https://images.unsplash.com/photo-1544124065-8ac9c22e8f03?w=400&h=300&fit=crop&auto=format', tags: ['Outdoor', 'Premium', 'Kapasitas 500+'], description: 'Villa pernikahan mewah di Bali dengan pemandangan sawah dan kolam renang, sempurna untuk destination wedding.', links: { website: 'https://villanirwana.com', instagram: 'https://instagram.com/villa_nirwana', whatsapp: 'https://wa.me/6281300400500' }, features: { 'Kapasitas 500+': true, 'Parkir Luas': true, 'Area Outdoor': true, 'Katering In-house': true, 'AC': false, 'Dekorasi Termasuk': true } },
  { id: 'ven-5', name: 'Balai Pertemuan Harmoni', category: 'venue', price: 'Rp 15.000.000', priceNum: 15000000, rating: 4.3, reviews: 145, location: 'Bekasi', experience: '2011', image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=300&fit=crop&auto=format', tags: ['Anggaran Hemat', 'Indoor', '300 pax'], description: 'Balai pertemuan serbaguna dengan kapasitas 300 tamu, cocok untuk pernikahan sederhana namun berkelas.', links: { whatsapp: 'https://wa.me/6281400500600', instagram: 'https://instagram.com/balai_harmoni' }, features: { 'Kapasitas 500+': false, 'Parkir Luas': true, 'Area Outdoor': false, 'Katering In-house': false, 'AC': true, 'Dekorasi Termasuk': false } },
  // ATTIRE
  { id: 'bus-1', name: 'Kebaya Anggun Bridal', category: 'attire', price: 'Rp 8.500.000', priceNum: 8500000, rating: 4.9, reviews: 178, location: 'Solo', experience: '2006', image: 'https://images.unsplash.com/photo-1594552072238-b8a33785b6cd?w=400&h=300&fit=crop&auto=format', tags: ['Jahit Kustom', 'Kebaya', 'Javanese Adat'], description: 'Spesialis kebaya pernikahan adat Jawa dengan jahitan tangan premium.', links: { instagram: 'https://instagram.com/kebaya_anggun', whatsapp: 'https://wa.me/6281233445566' }, features: { 'Jahit Kustom': true, 'Sewa': false, 'Javanese Adat': true, 'Internasional': false, 'Busana Tamu': true, 'Fitting Gratis': true } },
  { id: 'bus-2', name: 'White Veil Bridal House', category: 'attire', price: 'Rp 12.000.000', priceNum: 12000000, rating: 4.8, reviews: 134, location: 'Jakarta', experience: '2011', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop&auto=format', tags: ['Gaun Internasional', 'Sewa & Beli', 'Modern'], description: 'Koleksi gaun pengantin internasional dan modern, tersedia dalam pilihan sewa maupun beli.', links: { website: 'https://whiteveil.co.id', instagram: 'https://instagram.com/whiteveil_bridal' }, features: { 'Jahit Kustom': true, 'Sewa': true, 'Javanese Adat': false, 'Internasional': true, 'Busana Tamu': true, 'Fitting Gratis': true } },
  { id: 'bus-3', name: 'Sewa Baju Pengantin', category: 'attire', price: 'Rp 1.800.000', priceNum: 1800000, rating: 4.4, reviews: 89, location: 'Bandung', experience: '2018', image: 'https://images.unsplash.com/photo-1524863479829-916d8e77f114?w=400&h=300&fit=crop&auto=format', tags: ['Sewa', 'Anggaran Hemat', 'Pilihan Lengkap'], description: 'Sewa busana pengantin berkualitas dengan harga terjangkau, tersedia dalam berbagai gaya.', links: { instagram: 'https://instagram.com/sewa_pengantin', tiktok: 'https://tiktok.com/@sewa_pengantin' }, features: { 'Jahit Kustom': false, 'Sewa': true, 'Javanese Adat': true, 'Internasional': true, 'Busana Tamu': false, 'Fitting Gratis': true } },
  { id: 'bus-4', name: 'Gaun Impian Bridal', category: 'attire', price: 'Rp 6.500.000', priceNum: 6500000, rating: 4.7, reviews: 112, location: 'Surabaya', experience: '2013', image: 'https://images.unsplash.com/photo-1536073457726-3b5178e57e5e?w=400&h=300&fit=crop&auto=format', tags: ['Gaun Internasional', 'Sewa & Beli', 'Modern'], description: 'Koleksi gaun dan kebaya pengantin modern dengan pilihan sewa maupun beli, desain eksklusif dari desainer lokal.', links: { instagram: 'https://instagram.com/gaun_impian', whatsapp: 'https://wa.me/6281500600700' }, features: { 'Jahit Kustom': true, 'Sewa': true, 'Javanese Adat': false, 'Internasional': true, 'Busana Tamu': false, 'Fitting Gratis': true } },
  { id: 'bus-5', name: 'Batik Pengantin Nusantara', category: 'attire', price: 'Rp 3.500.000', priceNum: 3500000, rating: 4.6, reviews: 98, location: 'Yogyakarta', experience: '2011', image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=300&fit=crop&auto=format', tags: ['Adat Jawa', 'Batik', 'Jahit Kustom'], description: 'Busana pengantin batik tulis Yogyakarta dengan jahitan kustom, menghadirkan keanggunan budaya Jawa.', links: { instagram: 'https://instagram.com/batik_pengantin', facebook: 'https://facebook.com/batikpengantin' }, features: { 'Jahit Kustom': true, 'Sewa': false, 'Javanese Adat': true, 'Internasional': false, 'Busana Tamu': true, 'Fitting Gratis': true } },
  // INVITATION
  { id: 'und-1', name: 'Digital Invite Studio', category: 'invitation', price: 'Rp 350.000', priceNum: 350000, rating: 4.9, reviews: 412, location: 'Jakarta', experience: '2019', image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop&auto=format', tags: ['Digital + Print', 'Website', 'RSVP Online'], description: 'Undangan digital interaktif dengan website pernikahan, RSVP online, dan peta lokasi langsung.', links: { website: 'https://digitalinvite.id', instagram: 'https://instagram.com/digitalinvite_studio', whatsapp: 'https://wa.me/6281444555666' }, features: { 'Digital': true, 'Cetak': false, 'Desain Kustom': true, 'Amplop Eksklusif': false, 'Website Nikah': true, 'RSVP Online': true } },
  { id: 'und-2', name: 'Undangan Mewah Printing', category: 'invitation', price: 'Rp 12.000/pcs', priceNum: 12000, rating: 4.7, reviews: 267, location: 'Surabaya', experience: '2008', image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=400&h=300&fit=crop&auto=format', tags: ['Hard Cover', 'Foil Stamping', 'Premium'], description: 'Undangan cetak premium dengan teknik foil stamping dan hard cover eksklusif.', links: { instagram: 'https://instagram.com/undangan_mewah', facebook: 'https://facebook.com/undanganmewah' }, features: { 'Digital': false, 'Cetak': true, 'Desain Kustom': true, 'Amplop Eksklusif': true, 'Website Nikah': false, 'RSVP Online': false } },
  { id: 'und-3', name: 'Simple Wedding Card', category: 'invitation', price: 'Rp 3.500/pcs', priceNum: 3500, rating: 4.5, reviews: 198, location: 'Bekasi', experience: '2016', image: 'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=400&h=300&fit=crop&auto=format', tags: ['Digital & Print', 'Anggaran Hemat', 'Min. 100 pcs'], description: 'Undangan cetak dan digital terjangkau, minimum 100 lembar dengan desain elegan.', links: { instagram: 'https://instagram.com/simple_weddingcard', whatsapp: 'https://wa.me/6283344556677' }, features: { 'Digital': true, 'Cetak': true, 'Desain Kustom': true, 'Amplop Eksklusif': false, 'Website Nikah': false, 'RSVP Online': true } },
  { id: 'und-4', name: 'Kreatif Undangan Studio', category: 'invitation', price: 'Rp 8.000/pcs', priceNum: 8000, rating: 4.7, reviews: 189, location: 'Bandung', experience: '2016', image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=400&h=300&fit=crop&auto=format', tags: ['Cetak', 'Desain Kustom', 'Amplop Eksklusif'], description: 'Undangan cetak dengan desain kustom unik dan amplop eksklusif, tersedia berbagai pilihan kertas premium.', links: { instagram: 'https://instagram.com/kreatif_undangan', whatsapp: 'https://wa.me/6281600700800' }, features: { 'Digital': false, 'Cetak': true, 'Desain Kustom': true, 'Amplop Eksklusif': true, 'Website Nikah': false, 'RSVP Online': false } },
  { id: 'und-5', name: 'E-Invite Teknologi', category: 'invitation', price: 'Rp 250.000', priceNum: 250000, rating: 4.8, reviews: 356, location: 'Jakarta', experience: '2020', image: 'https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?w=400&h=300&fit=crop&auto=format', tags: ['Digital', 'Website Nikah', 'RSVP Online'], description: 'Undangan digital modern dengan website nikah interaktif, RSVP online, dan berbagi lokasi otomatis.', links: { website: 'https://einvite.id', instagram: 'https://instagram.com/einvite_id', whatsapp: 'https://wa.me/6281700800900' }, features: { 'Digital': true, 'Cetak': false, 'Desain Kustom': true, 'Amplop Eksklusif': false, 'Website Nikah': true, 'RSVP Online': true } },
  // TRANSPORT
  { id: 'trn-1', name: 'Royal Wedding Car', category: 'transport', price: 'Rp 3.500.000', priceNum: 3500000, rating: 4.9, reviews: 167, location: 'Jakarta', experience: '2010', image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=400&h=300&fit=crop&auto=format', tags: ['Limousine', 'Klasik', 'Berdekorasi'], description: 'Armada premium termasuk limousine, mobil klasik, dan layanan dekorasi penuh.', links: { website: 'https://royalweddingcar.id', instagram: 'https://instagram.com/royal_weddingcar', whatsapp: 'https://wa.me/6281600700800' }, features: { 'Limousine': true, 'Mobil Klasik': true, 'Bus Tamu': false, 'Dekorasi Mobil': true, 'Sopir Profesional': true, 'GPS Tracking': true } },
  { id: 'trn-2', name: 'Elegan Transport', category: 'transport', price: 'Rp 1.800.000', priceNum: 1800000, rating: 4.7, reviews: 123, location: 'Bandung', experience: '2015', image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=300&fit=crop&auto=format', tags: ['Luxury Sedan', 'Decoration', 'Tepat Waktu'], description: 'Layanan transportasi pengantin dengan sedan mewah dan dekorasi romantis.', links: { instagram: 'https://instagram.com/elegan_transport', whatsapp: 'https://wa.me/6282299887766' }, features: { 'Limousine': false, 'Mobil Klasik': false, 'Bus Tamu': false, 'Dekorasi Mobil': true, 'Sopir Profesional': true, 'GPS Tracking': false } },
  { id: 'trn-3', name: 'Bus & Shuttle Wedding', category: 'transport', price: 'Rp 2.500.000', priceNum: 2500000, rating: 4.6, reviews: 89, location: 'Jakarta', experience: '2017', image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400&h=300&fit=crop&auto=format', tags: ['Bus Tamu', 'Shuttle', 'Kapasitas Besar'], description: 'Layanan bus dan shuttle untuk mengangkut tamu dari berbagai titik penjemputan.', links: { instagram: 'https://instagram.com/bus_shuttlewedding', facebook: 'https://facebook.com/busshuttlewedding' }, features: { 'Limousine': false, 'Mobil Klasik': false, 'Bus Tamu': true, 'Dekorasi Mobil': false, 'Sopir Profesional': true, 'GPS Tracking': true } },
  { id: 'trn-4', name: 'Prestige Wedding Car', category: 'transport', price: 'Rp 2.200.000', priceNum: 2200000, rating: 4.7, reviews: 134, location: 'Surabaya', experience: '2013', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop&auto=format', tags: ['Limousine', 'Dekorasi Mobil', 'Sopir Profesional'], description: 'Layanan mobil pengantin premium dengan limousine dan sedan mewah, termasuk dekorasi bunga segar.', links: { instagram: 'https://instagram.com/prestige_weddingcar', whatsapp: 'https://wa.me/6281800900000' }, features: { 'Limousine': true, 'Mobil Klasik': false, 'Bus Tamu': false, 'Dekorasi Mobil': true, 'Sopir Profesional': true, 'GPS Tracking': true } },
  { id: 'trn-5', name: 'Armada Nusantara Transport', category: 'transport', price: 'Rp 800.000', priceNum: 800000, rating: 4.3, reviews: 89, location: 'Bekasi', experience: '2018', image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop&auto=format', tags: ['Bus Tamu', 'Anggaran Hemat', 'GPS Tracking'], description: 'Armada bus tamu dengan harga terjangkau, cocok untuk mengangkut undangan dari luar kota ke venue.', links: { whatsapp: 'https://wa.me/6281900100200', instagram: 'https://instagram.com/armada_nusantara' }, features: { 'Limousine': false, 'Mobil Klasik': false, 'Bus Tamu': true, 'Dekorasi Mobil': false, 'Sopir Profesional': true, 'GPS Tracking': true } },
  // CINCIN KAWIN
  { id: 'rng-1', name: 'Berlian Abadi Jewelry', category: 'ring', price: 'Rp 8.500.000', priceNum: 8500000, rating: 4.9, reviews: 312, location: 'Jakarta Pusat', experience: '2005', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=300&fit=crop&auto=format', tags: ['Emas 24K', 'Berlian', 'Ukir Nama'], description: 'Cincin kawin emas 24K dan platinum dengan berlian asli, tersedia ukiran nama dan tanggal pernikahan.', links: { instagram: 'https://instagram.com/berlian_abadi', website: 'https://berlianabadi.co.id', whatsapp: 'https://wa.me/6281300100200' }, features: { 'Ukir Nama': true, 'Emas 24K': true, 'Platinum': true, 'Perak 925': false, 'Berlian': true, 'Garansi Seumur Hidup': true } },
  { id: 'rng-2', name: 'Cincin Impian Solo', category: 'ring', price: 'Rp 3.200.000', priceNum: 3200000, rating: 4.7, reviews: 189, location: 'Solo', experience: '2012', image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=300&fit=crop&auto=format', tags: ['Emas 18K', 'Kustom', 'Terjangkau'], description: 'Cincin kawin kustom emas 18K dengan desain elegan dan harga terjangkau, tersedia berbagai model.', links: { instagram: 'https://instagram.com/cincin_impian', whatsapp: 'https://wa.me/6281277889900' }, features: { 'Ukir Nama': true, 'Emas 24K': false, 'Platinum': false, 'Perak 925': false, 'Berlian': false, 'Garansi Seumur Hidup': true } },
  { id: 'rng-3', name: 'Silver & Gold Atelier', category: 'ring', price: 'Rp 1.500.000', priceNum: 1500000, rating: 4.5, reviews: 134, location: 'Bandung', experience: '2016', image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=300&fit=crop&auto=format', tags: ['Perak 925', 'Anggaran Hemat', 'Ukir Nama'], description: 'Cincin kawin perak 925 berkualitas tinggi dengan pilihan motif batik dan ukiran kustom.', links: { instagram: 'https://instagram.com/silvergold_atelier', tiktok: 'https://tiktok.com/@silvergold_atelier' }, features: { 'Ukir Nama': true, 'Emas 24K': false, 'Platinum': false, 'Perak 925': true, 'Berlian': false, 'Garansi Seumur Hidup': false } },
  { id: 'rng-4', name: 'Platinum Prestige Ring', category: 'ring', price: 'Rp 12.000.000', priceNum: 12000000, rating: 4.9, reviews: 201, location: 'Surabaya', experience: '2008', image: 'https://images.unsplash.com/photo-1573408301185-9519f94816b5?w=400&h=300&fit=crop&auto=format', tags: ['Platinum', 'Berlian', 'Garansi Seumur Hidup'], description: 'Cincin kawin platinum premium dengan berlian pilihan dan sertifikat keaslian internasional.', links: { instagram: 'https://instagram.com/platinum_prestige', website: 'https://platinumprestige.co.id', whatsapp: 'https://wa.me/6281600700800' }, features: { 'Ukir Nama': true, 'Emas 24K': false, 'Platinum': true, 'Perak 925': false, 'Berlian': true, 'Garansi Seumur Hidup': true } },
  { id: 'rng-5', name: 'Toko Mas Mutiara', category: 'ring', price: 'Rp 900.000', priceNum: 900000, rating: 4.4, reviews: 298, location: 'Yogyakarta', experience: '2003', image: 'https://images.unsplash.com/photo-1586104195538-050b9f74f58e?w=400&h=300&fit=crop&auto=format', tags: ['Anggaran Hemat', 'Emas 24K', 'Ukir Nama'], description: 'Toko emas terpercaya dengan cincin kawin emas asli harga terjangkau, melayani ukiran nama gratis.', links: { whatsapp: 'https://wa.me/6281700800900' }, features: { 'Ukir Nama': true, 'Emas 24K': true, 'Platinum': false, 'Perak 925': false, 'Berlian': false, 'Garansi Seumur Hidup': false } },
  // MAHAR / MASKAWIN
  { id: 'mhr-1', name: 'Mahar Indah Nusantara', category: 'mahar', price: 'Rp 5.500.000', priceNum: 5500000, rating: 4.9, reviews: 241, location: 'Jakarta Selatan', experience: '2010', image: 'https://images.unsplash.com/photo-1589561253898-768105ca91a8?w=400&h=300&fit=crop&auto=format', tags: ['Logam Mulia', 'Paket Lengkap', 'Kustom'], description: 'Paket mahar lengkap termasuk logam mulia, perangkat sholat, dan Al-Quran dalam kotak mewah kustom.', links: { instagram: 'https://instagram.com/mahar_indah', whatsapp: 'https://wa.me/6281555666777' }, features: { 'Logam Mulia': true, 'Perangkat Sholat': true, 'Al-Quran': true, 'Perhiasan': true, 'Kotak Mahar Kustom': true, 'Sertifikat': true } },
  { id: 'mhr-2', name: 'Amanah Mahar Studio', category: 'mahar', price: 'Rp 3.800.000', priceNum: 3800000, rating: 4.7, reviews: 178, location: 'Yogyakarta', experience: '2013', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=300&fit=crop&auto=format', tags: ['Adat Jawa', 'Logam Mulia', 'Estetis'], description: 'Mahar bergaya adat Jawa dengan logam mulia dan perangkat ibadah dalam kotak ukir kayu jati.', links: { instagram: 'https://instagram.com/amanah_mahar', facebook: 'https://facebook.com/amanahmaharstudio' }, features: { 'Logam Mulia': true, 'Perangkat Sholat': true, 'Al-Quran': true, 'Perhiasan': false, 'Kotak Mahar Kustom': true, 'Sertifikat': true } },
  { id: 'mhr-3', name: 'Berkah Mahar Shop', category: 'mahar', price: 'Rp 1.800.000', priceNum: 1800000, rating: 4.5, reviews: 112, location: 'Bekasi', experience: '2018', image: 'https://images.unsplash.com/photo-1532635239-06e08db8f247?w=400&h=300&fit=crop&auto=format', tags: ['Anggaran Hemat', 'Perangkat Sholat', 'Al-Quran'], description: 'Paket mahar terjangkau dengan perangkat sholat dan Al-Quran edisi premium dalam kotak elegan.', links: { whatsapp: 'https://wa.me/6282200334455', instagram: 'https://instagram.com/berkah_maharshop' }, features: { 'Logam Mulia': false, 'Perangkat Sholat': true, 'Al-Quran': true, 'Perhiasan': false, 'Kotak Mahar Kustom': true, 'Sertifikat': false } },
  { id: 'mhr-4', name: 'Nuansa Mahar Islami', category: 'mahar', price: 'Rp 2.800.000', priceNum: 2800000, rating: 4.6, reviews: 143, location: 'Surabaya', experience: '2016', image: 'https://images.unsplash.com/photo-1532635239-06e08db8f247?w=400&h=300&fit=crop&auto=format', tags: ['Perangkat Sholat', 'Al-Quran', 'Islami'], description: 'Mahar Islami elegan dengan perangkat sholat premium, Al-Quran edisi terbatas, dan kotak mahar berukir.', links: { instagram: 'https://instagram.com/nuansa_mahar', whatsapp: 'https://wa.me/6281800900100' }, features: { 'Logam Mulia': false, 'Perangkat Sholat': true, 'Al-Quran': true, 'Perhiasan': false, 'Kotak Mahar Kustom': true, 'Sertifikat': false } },
  { id: 'mhr-5', name: 'Mahar Logam Nusantara', category: 'mahar', price: 'Rp 7.500.000', priceNum: 7500000, rating: 4.8, reviews: 98, location: 'Jakarta Pusat', experience: '2011', image: 'https://images.unsplash.com/photo-1589561253898-768105ca91a8?w=400&h=300&fit=crop&auto=format', tags: ['Logam Mulia', 'Perhiasan', 'Sertifikat'], description: 'Mahar berupa logam mulia bersertifikat dan set perhiasan emas dalam kotak mewah, investasi sekaligus mahar.', links: { instagram: 'https://instagram.com/mahar_logam', website: 'https://maharlogam.co.id', whatsapp: 'https://wa.me/6281900100200' }, features: { 'Logam Mulia': true, 'Perangkat Sholat': false, 'Al-Quran': false, 'Perhiasan': true, 'Kotak Mahar Kustom': true, 'Sertifikat': true } },
  // BUSANA KELUARGA
  { id: 'bk-1', name: 'Seragam Keluarga Nusantara', category: 'familyattire', price: 'Rp 450.000/pcs', priceNum: 450000, rating: 4.8, reviews: 203, location: 'Solo', experience: '2008', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&auto=format', tags: ['Batik Premium', 'Seragam Keluarga', 'Kustom'], description: 'Seragam keluarga batik premium kustom dengan bahan berkualitas, cocok untuk seluruh anggota keluarga.', links: { instagram: 'https://instagram.com/seragam_nusantara', whatsapp: 'https://wa.me/6281311122233' }, features: { 'Seragam Keluarga': true, 'Ukuran Kustom': true, 'Bahan Premium': true, 'Sewa Tersedia': false, 'Adat Jawa': true, 'Ongkir Tersedia': true } },
  { id: 'bk-2', name: 'Keluarga Elegan Boutique', category: 'familyattire', price: 'Rp 650.000/pcs', priceNum: 650000, rating: 4.7, reviews: 156, location: 'Jakarta Selatan', experience: '2014', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=300&fit=crop&auto=format', tags: ['Modern', 'Set Keluarga', 'Premium'], description: 'Busana keluarga bergaya modern elegan dengan pilihan warna sesuai tema pernikahan.', links: { instagram: 'https://instagram.com/keluarga_elegan', website: 'https://keluargaelegan.com' }, features: { 'Seragam Keluarga': true, 'Ukuran Kustom': true, 'Bahan Premium': true, 'Sewa Tersedia': true, 'Adat Jawa': false, 'Ongkir Tersedia': true } },
  { id: 'bk-3', name: 'Sewa Seragam Murah', category: 'familyattire', price: 'Rp 150.000/pcs', priceNum: 150000, rating: 4.4, reviews: 89, location: 'Depok', experience: '2019', image: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=400&h=300&fit=crop&auto=format', tags: ['Anggaran Hemat', 'Sewa Tersedia', 'Pilihan Lengkap'], description: 'Sewa busana keluarga dengan harga terjangkau, pilihan batik dan kebaya tersedia untuk semua ukuran.', links: { whatsapp: 'https://wa.me/6283344556677', instagram: 'https://instagram.com/sewa_seragam' }, features: { 'Seragam Keluarga': true, 'Ukuran Kustom': false, 'Bahan Premium': false, 'Sewa Tersedia': true, 'Adat Jawa': true, 'Ongkir Tersedia': false } },
  { id: 'bk-4', name: 'Kebaya Keluarga Harmoni', category: 'familyattire', price: 'Rp 550.000/pcs', priceNum: 550000, rating: 4.8, reviews: 134, location: 'Yogyakarta', experience: '2012', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=300&fit=crop&auto=format', tags: ['Kebaya', 'Adat Jawa', 'Seragam Keluarga'], description: 'Kebaya seragam keluarga dengan bahan katun premium pilihan, tersedia dalam berbagai warna dan ukuran.', links: { instagram: 'https://instagram.com/kebaya_harmoni', whatsapp: 'https://wa.me/6281300400500' }, features: { 'Seragam Keluarga': true, 'Ukuran Kustom': true, 'Bahan Premium': true, 'Sewa Tersedia': false, 'Adat Jawa': true, 'Ongkir Tersedia': false } },
  { id: 'bk-5', name: 'Modern Family Outfit', category: 'familyattire', price: 'Rp 750.000/pcs', priceNum: 750000, rating: 4.6, reviews: 88, location: 'Bandung', experience: '2017', image: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=400&h=300&fit=crop&auto=format', tags: ['Modern', 'Bahan Premium', 'Ukuran Kustom'], description: 'Busana keluarga modern dengan konsep color-matching yang serasi dengan tema pernikahan, jahit kustom per orang.', links: { instagram: 'https://instagram.com/modern_familyoutfit', tiktok: 'https://tiktok.com/@modern_family' }, features: { 'Seragam Keluarga': true, 'Ukuran Kustom': true, 'Bahan Premium': true, 'Sewa Tersedia': false, 'Adat Jawa': false, 'Ongkir Tersedia': true } },
  // AKSESORIS PENGANTIN
  { id: 'akc-1', name: 'Crown & Veil Bridal', category: 'accessories', price: 'Rp 2.800.000', priceNum: 2800000, rating: 4.9, reviews: 267, location: 'Jakarta Pusat', experience: '2011', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop&auto=format', tags: ['Mahkota / Tiara', 'Kerudung Pengantin', 'Set Lengkap'], description: 'Paket aksesoris pengantin lengkap mulai dari mahkota, kerudung, perhiasan, hingga tas pesta mewah.', links: { instagram: 'https://instagram.com/crown_veil', website: 'https://crownveil.co.id', whatsapp: 'https://wa.me/6281400500600' }, features: { 'Mahkota / Tiara': true, 'Kerudung Pengantin': true, 'Set Perhiasan': true, 'Sepatu Pengantin': true, 'Sarung Tangan': true, 'Tas Pesta': true } },
  { id: 'akc-2', name: 'Anggun Bridal Accessories', category: 'accessories', price: 'Rp 1.500.000', priceNum: 1500000, rating: 4.7, reviews: 198, location: 'Bandung', experience: '2015', image: 'https://images.unsplash.com/photo-1594552072238-b8a33785b6cd?w=400&h=300&fit=crop&auto=format', tags: ['Mahkota / Tiara', 'Set Perhiasan', 'Modern'], description: 'Aksesoris pengantin modern dengan mahkota kristal dan set perhiasan yang elegan untuk pengantin masa kini.', links: { instagram: 'https://instagram.com/anggun_bridal', tiktok: 'https://tiktok.com/@anggun_bridal' }, features: { 'Mahkota / Tiara': true, 'Kerudung Pengantin': false, 'Set Perhiasan': true, 'Sepatu Pengantin': true, 'Sarung Tangan': false, 'Tas Pesta': true } },
  { id: 'akc-3', name: 'Sewa Aksesoris Pengantin', category: 'accessories', price: 'Rp 500.000', priceNum: 500000, rating: 4.5, reviews: 143, location: 'Surabaya', experience: '2017', image: 'https://images.unsplash.com/photo-1612633405728-a701ac40a7e5?w=400&h=300&fit=crop&auto=format', tags: ['Sewa Tersedia', 'Anggaran Hemat', 'Pilihan Lengkap'], description: 'Sewa aksesoris pengantin lengkap dengan harga terjangkau, cocok untuk berbagai tema pernikahan.', links: { whatsapp: 'https://wa.me/6281700800900', instagram: 'https://instagram.com/sewa_aksesorisnkah' }, features: { 'Mahkota / Tiara': true, 'Kerudung Pengantin': true, 'Set Perhiasan': true, 'Sepatu Pengantin': false, 'Sarung Tangan': false, 'Tas Pesta': false } },
  { id: 'akc-4', name: 'Mutiara Bridal Accessories', category: 'accessories', price: 'Rp 3.800.000', priceNum: 3800000, rating: 4.8, reviews: 178, location: 'Solo', experience: '2013', image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=300&fit=crop&auto=format', tags: ['Set Perhiasan', 'Mutiara', 'Adat Jawa'], description: 'Aksesoris pengantin mutiara asli Lombok dengan desain adat Jawa yang anggun dan berkelas.', links: { instagram: 'https://instagram.com/mutiara_bridal', whatsapp: 'https://wa.me/6281800900100' }, features: { 'Mahkota / Tiara': true, 'Kerudung Pengantin': false, 'Set Perhiasan': true, 'Sepatu Pengantin': false, 'Sarung Tangan': true, 'Tas Pesta': true } },
  { id: 'akc-5', name: 'Glamour Bridal Studio', category: 'accessories', price: 'Rp 1.200.000', priceNum: 1200000, rating: 4.6, reviews: 112, location: 'Jakarta Selatan', experience: '2018', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop&auto=format', tags: ['Modern', 'Sepatu Pengantin', 'Tas Pesta'], description: 'Paket aksesoris pengantin modern meliputi sepatu, tas pesta, dan sarung tangan dengan desain kontemporer.', links: { instagram: 'https://instagram.com/glamour_bridal', tiktok: 'https://tiktok.com/@glamour_bridal', whatsapp: 'https://wa.me/6281900100200' }, features: { 'Mahkota / Tiara': false, 'Kerudung Pengantin': false, 'Set Perhiasan': false, 'Sepatu Pengantin': true, 'Sarung Tangan': true, 'Tas Pesta': true } },

  // Wedding Organizer
  { id: 'wo-1', name: 'Moments Wedding Organizer', category: 'wo', price: 'Rp 25.000.000', priceNum: 25000000, rating: 4.9, reviews: 312, location: 'Jakarta Selatan', experience: '2010', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop&auto=format', tags: ['Full Service', 'Koordinasi Penuh', 'Tim Profesional'], description: 'Wedding Organizer premium dengan track record lebih dari 12 tahun dan 400+ pernikahan sukses di seluruh Indonesia. Tim profesional terdiri dari 8 koordinator senior, desainer dekorasi, dan vendor network yang sudah terverifikasi. Melayani pernikahan skala intimate 50 pax hingga grand wedding 2000+ pax di hotel bintang 5, resort, dan venue eksklusif. Layanan full service mencakup: konsultasi awal, pemilihan vendor, koordinasi D-Day, rundown detail, dan laporan pasca acara. Tersedia paket adat Jawa, modern, dan garden party.', links: { instagram: 'https://instagram.com/moments_wo', website: 'https://momentswo.com', whatsapp: 'https://wa.me/6281200001234' }, features: { 'Konsultasi Gratis': true, 'Full Day Coverage': true, 'Koordinasi Vendor': true, 'Timeline Acara': true, 'Dekorasi Termasuk': true, 'Tim Profesional': true } },
  { id: 'wo-2', name: 'Dreamy Day WO', category: 'wo', price: 'Rp 15.000.000', priceNum: 15000000, rating: 4.8, reviews: 198, location: 'Bandung', experience: '2015', image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&h=300&fit=crop&auto=format', tags: ['Modern', 'Garden Party', 'Koordinasi Vendor'], description: 'WO spesialis pernikahan outdoor, garden party, dan intimate wedding dengan konsep modern romantis yang sedang tren. Berpengalaman mengelola venue terbuka seperti vila, kebun, rooftop, dan resort di Bandung dan sekitarnya. Tim kreatif membantu pasangan dari mood board hingga dekorasi final, termasuk koordinasi vendor: MUA, katering, fotografi, dan hiburan. Tersedia paket all-inclusive yang menghemat waktu dan energi. Konsultasi gratis tanpa batas hingga hari-H.', links: { instagram: 'https://instagram.com/dreamyday_wo', whatsapp: 'https://wa.me/6281300400567' }, features: { 'Konsultasi Gratis': true, 'Full Day Coverage': true, 'Koordinasi Vendor': true, 'Timeline Acara': true, 'Dekorasi Termasuk': false, 'Tim Profesional': true } },
  { id: 'wo-3', name: 'Harmoni Nusantara WO', category: 'wo', price: 'Rp 8.500.000', priceNum: 8500000, rating: 4.6, reviews: 143, location: 'Yogyakarta', experience: '2017', image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop&auto=format', tags: ['Adat Jawa', 'Tradisional', 'Anggaran Hemat'], description: 'WO spesialis pernikahan adat Jawa dengan pemahaman mendalam tentang setiap prosesi: siraman, midodareni, panggih, balangan suruh, hingga sungkeman. Tim memiliki latar belakang budaya Jawa yang kuat dan bekerja sama dengan juru rias dan MC adat terpercaya. Cocok untuk keluarga yang ingin melangsungkan pernikahan tradisional yang lengkap namun tetap rapi dan terorganisir. Tarif terjangkau dengan kualitas koordinasi yang tidak kalah dari WO premium. Melayani DIY, Jawa Tengah, dan Jawa Timur.', links: { whatsapp: 'https://wa.me/6281500600789', instagram: 'https://instagram.com/harmoni_wo' }, features: { 'Konsultasi Gratis': true, 'Full Day Coverage': true, 'Koordinasi Vendor': true, 'Timeline Acara': true, 'Dekorasi Termasuk': false, 'Tim Profesional': true } },
  { id: 'wo-4', name: 'Elegan Events', category: 'wo', price: 'Rp 35.000.000', priceNum: 35000000, rating: 4.9, reviews: 87, location: 'Bali', experience: '2012', image: 'https://images.unsplash.com/photo-1550005809-91ad75fb315f?w=400&h=300&fit=crop&auto=format', tags: ['Destination Wedding', 'Luxury', 'Full Service'], description: 'WO eksklusif spesialis destination wedding di Bali dengan standar layanan internasional. Berpengalaman menangani tamu dari 20+ negara dengan koordinasi penuh: penjemputan, akomodasi, dekorasi, katering bercita rasa internasional, hingga dokumentasi. Bekerja sama dengan venue eksklusif di Ubud, Seminyak, Uluwatu, dan Nusa Penida. Memiliki lisensi legal wedding untuk pasangan asing di Bali. Setiap pernikahan ditangani oleh satu dedicated wedding coordinator dari planning hingga hari-H selesai.', links: { instagram: 'https://instagram.com/elegan_events', website: 'https://eleganevents.id', whatsapp: 'https://wa.me/6281700800123' }, features: { 'Konsultasi Gratis': true, 'Full Day Coverage': true, 'Koordinasi Vendor': true, 'Timeline Acara': true, 'Dekorasi Termasuk': true, 'Tim Profesional': true } },
  { id: 'wo-5', name: 'Barokah Wedding Planner', category: 'wo', price: 'Rp 5.000.000', priceNum: 5000000, rating: 4.5, reviews: 234, location: 'Bekasi', experience: '2019', image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=300&fit=crop&auto=format', tags: ['Anggaran Hemat', 'Islami', 'Paket Lengkap'], description: 'Wedding Organizer terjangkau dengan nuansa Islami yang kental, membantu pasangan merencanakan pernikahan impian dalam anggaran terbatas namun bermakna. Spesialisasi akad nikah syar\'i, walimahan sederhana, dan resepsi bernuansa Islami. Menyediakan jaringan vendor halal terpercaya termasuk katering halal, MUA berhijab, dan dekorasi bernuansa Islami. Tersedia layanan konsultasi anggaran gratis untuk memaksimalkan hasil dalam budget yang ada. Aktif melayani area Bekasi, Depok, dan Bogor.', links: { whatsapp: 'https://wa.me/6282100200456', instagram: 'https://instagram.com/barokah_wo', facebook: 'https://facebook.com/barokahwedding' }, features: { 'Konsultasi Gratis': true, 'Full Day Coverage': false, 'Koordinasi Vendor': true, 'Timeline Acara': true, 'Dekorasi Termasuk': false, 'Tim Profesional': true } },
]

function StarRating({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'xs' }) {
  const sz = size === 'xs' ? 'w-3 h-3' : 'w-3.5 h-3.5'
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <svg key={s} className={`${sz} ${s <= Math.round(rating) ? 'text-[#c4a35a]' : 'text-[#e8ddd8]'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

interface AddVendorModalProps {
  category: Category
  onClose: () => void
  onAdd: (v: Vendor) => void
  editVendor?: Vendor | null
}

const emptyFeatures = (cat: Category, fKeys: Record<string, string[]>): Record<string, boolean> =>
  Object.fromEntries((fKeys[cat] ?? []).map(k => [k, false]))

function AddVendorModal({ category, onClose, onAdd, editVendor, catList, fKeys }: AddVendorModalProps & { catList: CategoryMeta[]; fKeys: Record<string, string[]> }) {
  const catMeta = catList.find(c => c.id === category)!
  const keys = fKeys[category] ?? []
  const [form, setForm] = useState({
    name: editVendor?.name ?? '',
    price: editVendor?.price ?? '',
    priceNum: editVendor?.priceNum ?? 0,
    rating: editVendor?.rating ?? 5,
    reviews: editVendor?.reviews ?? 0,
    location: editVendor?.location ?? '',
    experience: editVendor?.experience ?? '',
    description: editVendor?.description ?? '',
    links: {
      instagram: editVendor?.links?.instagram ?? '',
      whatsapp: editVendor?.links?.whatsapp ?? '',
      facebook: editVendor?.links?.facebook ?? '',
      tiktok: editVendor?.links?.tiktok ?? '',
      website: editVendor?.links?.website ?? '',
    },
    image: editVendor?.image ?? '',
    tags: editVendor?.tags.join(', ') ?? '',
    features: editVendor?.features ? { ...editVendor.features } as Record<string, boolean> : emptyFeatures(category, fKeys),
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name.trim()) return
    const builtLinks: Vendor['links'] = {}
    if (form.links.instagram.trim()) builtLinks.instagram = form.links.instagram.trim()
    if (form.links.whatsapp.trim()) builtLinks.whatsapp = form.links.whatsapp.trim()
    if (form.links.facebook.trim()) builtLinks.facebook = form.links.facebook.trim()
    if (form.links.tiktok.trim()) builtLinks.tiktok = form.links.tiktok.trim()
    if (form.links.website.trim()) builtLinks.website = form.links.website.trim()
    const vendor: Vendor = {
      id: editVendor?.id ?? `custom-${Date.now()}`,
      category,
      name: form.name,
      price: form.price || '-',
      priceNum: Number(form.priceNum) || 0,
      rating: Number(form.rating) || 5,
      reviews: Number(form.reviews) || 0,
      location: form.location || '-',
      experience: form.experience,
      description: form.description,
      links: builtLinks,
      image: form.image || `https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop&auto=format`,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      features: form.features,
      custom: true,
    }
    onAdd(vendor)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(44,36,32,0.7)', backdropFilter: 'blur(4px)' }}>
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-[#f5e6e0] px-7 py-5 flex items-center justify-between rounded-t-3xl z-10">
          <div>
            <div className="text-xs font-mono text-[#c4a35a] uppercase tracking-widest mb-0.5">{catMeta.icon} {catMeta.label}</div>
            <h2 className="font-display text-xl font-semibold text-[#2c2420]">
              {editVendor ? 'Edit Vendor' : 'Tambah Vendor Baru'}
            </h2>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full border border-[#e8ddd8] flex items-center justify-center text-[#8c7b75] hover:bg-[#fdf8f3] transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="px-7 py-6 space-y-5">
          <p className="text-xs text-[#8c7b75] bg-[#fdf8f3] border border-[#e8ddd8] rounded-lg px-3 py-2">
            Hanya <strong>Nama Vendor</strong> yang wajib diisi. Kolom lainnya bisa diisi belakangan.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-medium text-[#8c7b75] mb-1.5 uppercase tracking-wide">Nama Vendor <span className="text-[#c9736a]">*</span></label>
              <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="cth. Sari Ayu Bridal" className="w-full px-4 py-2.5 rounded-xl border border-[#e8ddd8] text-sm text-[#2c2420] focus:outline-none focus:border-[#c9736a] transition-colors bg-[#fdf8f3]" />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#8c7b75] mb-1.5 uppercase tracking-wide">Label Harga</label>
              <input value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} placeholder="cth. Rp 3.500.000" className="w-full px-4 py-2.5 rounded-xl border border-[#e8ddd8] text-sm text-[#2c2420] focus:outline-none focus:border-[#c9736a] transition-colors bg-[#fdf8f3]" />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#8c7b75] mb-1.5 uppercase tracking-wide">Harga (angka)</label>
              <input type="number" value={form.priceNum || ''} onChange={e => setForm(f => ({ ...f, priceNum: Number(e.target.value) }))} placeholder="3500000" className="w-full px-4 py-2.5 rounded-xl border border-[#e8ddd8] text-sm text-[#2c2420] focus:outline-none focus:border-[#c9736a] transition-colors bg-[#fdf8f3]" />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#8c7b75] mb-1.5 uppercase tracking-wide">Lokasi</label>
              <input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="cth. Jakarta Selatan" className="w-full px-4 py-2.5 rounded-xl border border-[#e8ddd8] text-sm text-[#2c2420] focus:outline-none focus:border-[#c9736a] transition-colors bg-[#fdf8f3]" />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#8c7b75] mb-1.5 uppercase tracking-wide">Pengalaman</label>
              <input value={form.experience} onChange={e => setForm(f => ({ ...f, experience: e.target.value }))} placeholder="cth. 8 tahun" className="w-full px-4 py-2.5 rounded-xl border border-[#e8ddd8] text-sm text-[#2c2420] focus:outline-none focus:border-[#c9736a] transition-colors bg-[#fdf8f3]" />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#8c7b75] mb-1.5 uppercase tracking-wide">Rating (1–5)</label>
              <input type="number" min={1} max={5} step={0.1} value={form.rating} onChange={e => setForm(f => ({ ...f, rating: Number(e.target.value) }))} className="w-full px-4 py-2.5 rounded-xl border border-[#e8ddd8] text-sm text-[#2c2420] focus:outline-none focus:border-[#c9736a] transition-colors bg-[#fdf8f3]" />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#8c7b75] mb-1.5 uppercase tracking-wide">Jumlah Ulasan</label>
              <input type="number" value={form.reviews || ''} onChange={e => setForm(f => ({ ...f, reviews: Number(e.target.value) }))} placeholder="cth. 120" className="w-full px-4 py-2.5 rounded-xl border border-[#e8ddd8] text-sm text-[#2c2420] focus:outline-none focus:border-[#c9736a] transition-colors bg-[#fdf8f3]" />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-medium text-[#8c7b75] mb-2 uppercase tracking-wide">Link & Sosial Media</label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-base w-6 text-center shrink-0">📷</span>
                  <input value={form.links.instagram} onChange={e => setForm(f => ({ ...f, links: { ...f.links, instagram: e.target.value } }))} placeholder="https://instagram.com/namavendor" className="flex-1 px-4 py-2 rounded-xl border border-[#e8ddd8] text-sm text-[#2c2420] focus:outline-none focus:border-[#c9736a] transition-colors bg-[#fdf8f3]" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-base w-6 text-center shrink-0">💬</span>
                  <input value={form.links.whatsapp} onChange={e => setForm(f => ({ ...f, links: { ...f.links, whatsapp: e.target.value } }))} placeholder="https://wa.me/628xxxxxxxxxx" className="flex-1 px-4 py-2 rounded-xl border border-[#e8ddd8] text-sm text-[#2c2420] focus:outline-none focus:border-[#c9736a] transition-colors bg-[#fdf8f3]" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-base w-6 text-center shrink-0">📘</span>
                  <input value={form.links.facebook} onChange={e => setForm(f => ({ ...f, links: { ...f.links, facebook: e.target.value } }))} placeholder="https://facebook.com/namavendor" className="flex-1 px-4 py-2 rounded-xl border border-[#e8ddd8] text-sm text-[#2c2420] focus:outline-none focus:border-[#c9736a] transition-colors bg-[#fdf8f3]" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-base w-6 text-center shrink-0">🎵</span>
                  <input value={form.links.tiktok} onChange={e => setForm(f => ({ ...f, links: { ...f.links, tiktok: e.target.value } }))} placeholder="https://tiktok.com/@namavendor" className="flex-1 px-4 py-2 rounded-xl border border-[#e8ddd8] text-sm text-[#2c2420] focus:outline-none focus:border-[#c9736a] transition-colors bg-[#fdf8f3]" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-base w-6 text-center shrink-0">🌐</span>
                  <input value={form.links.website} onChange={e => setForm(f => ({ ...f, links: { ...f.links, website: e.target.value } }))} placeholder="https://namavendor.com" className="flex-1 px-4 py-2 rounded-xl border border-[#e8ddd8] text-sm text-[#2c2420] focus:outline-none focus:border-[#c9736a] transition-colors bg-[#fdf8f3]" />
                </div>
              </div>
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-medium text-[#8c7b75] mb-1.5 uppercase tracking-wide">Foto Vendor</label>
              {/* Upload from gallery/camera */}
              <div
                className="w-full rounded-xl border-2 border-dashed border-[#e8ddd8] hover:border-[#c9736a] transition-colors cursor-pointer bg-[#fdf8f3] mb-2 relative overflow-hidden"
                style={{ minHeight: form.image ? '120px' : '80px' }}
                onClick={() => document.getElementById('vendor-photo-upload')?.click()}
              >
                {form.image ? (
                  <div className="relative">
                    <img src={form.image} alt="preview" className="w-full h-32 object-cover rounded-xl" />
                    <button
                      type="button"
                      onClick={e => { e.stopPropagation(); setForm(f => ({ ...f, image: '' })) }}
                      className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center text-xs hover:bg-black/80"
                    >✕</button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-5 gap-1.5 text-[#8c7b75]">
                    <svg className="w-8 h-8 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>
                    <span className="text-xs font-medium">Unggah dari Galeri / Kamera</span>
                    <span className="text-[10px] opacity-60">JPG, PNG, WEBP — klik atau ketuk di sini</span>
                  </div>
                )}
                <input
                  id="vendor-photo-upload"
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={e => {
                    const file = e.target.files?.[0]
                    if (!file) return
                    const reader = new FileReader()
                    reader.onload = ev => setForm(f => ({ ...f, image: ev.target?.result as string }))
                    reader.readAsDataURL(file)
                  }}
                />
              </div>
              {/* URL fallback */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[#8c7b75] shrink-0">atau URL:</span>
                <input value={form.image.startsWith('data:') ? '' : form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} placeholder="https://images.unsplash.com/..." className="flex-1 px-3 py-1.5 rounded-lg border border-[#e8ddd8] text-xs text-[#2c2420] focus:outline-none focus:border-[#c9736a] transition-colors bg-[#fdf8f3]" />
              </div>
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-medium text-[#8c7b75] mb-1.5 uppercase tracking-wide">Tag (pisah dengan koma)</label>
              <input value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} placeholder="cth. Airbrush, Trial Included, Modern" className="w-full px-4 py-2.5 rounded-xl border border-[#e8ddd8] text-sm text-[#2c2420] focus:outline-none focus:border-[#c9736a] transition-colors bg-[#fdf8f3]" />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-medium text-[#8c7b75] mb-1 uppercase tracking-wide">Deskripsi Lengkap</label>
              <p className="text-[11px] text-[#b0a09b] mb-1.5">Tulis deskripsi detail: pengalaman, teknik/produk yang digunakan, keunggulan, paket yang tersedia, area layanan, dll.</p>
              <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Contoh: Berpengalaman 10 tahun dalam riasan pengantin adat Jawa dan modern. Menggunakan produk MAC, NARS, dan Charlotte Tilbury yang tahan lama hingga 12 jam. Paket sudah termasuk trial makeup 2 minggu sebelum hari-H dan touch-up kit. Melayani area Jakarta, Depok, dan Bekasi..." rows={6} className="w-full px-4 py-2.5 rounded-xl border border-[#e8ddd8] text-sm text-[#2c2420] focus:outline-none focus:border-[#c9736a] transition-colors bg-[#fdf8f3] resize-y" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-xs font-medium text-[#8c7b75] uppercase tracking-wide">Fitur & Layanan</label>
              <button
                type="button"
                onClick={() => {
                  const nama = prompt('Nama fitur baru:')
                  if (nama?.trim()) {
                    const k = nama.trim()
                    setForm(f => ({ ...f, features: { ...f.features, [k]: true } }))
                  }
                }}
                className="text-xs text-[#c4a35a] border border-[#c4a35a] rounded-full px-2 py-0.5 hover:bg-[#c4a35a] hover:text-white transition-colors"
              >+ Tambah Fitur</button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[...new Set([...keys, ...Object.keys(form.features)])].map(key => (
                <div key={key} className="flex items-center gap-1 px-3 py-2 rounded-lg border border-[#e8ddd8] hover:bg-[#fdf8f3] transition-colors group">
                  <input
                    type="checkbox"
                    checked={!!form.features[key]}
                    onChange={e => setForm(f => ({ ...f, features: { ...f.features, [key]: e.target.checked } }))}
                    className="accent-[#c9736a] w-4 h-4 shrink-0"
                  />
                  <span className="text-xs text-[#2c2420] flex-1 truncate">{key}</span>
                  <div className="flex gap-0.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        const newName = prompt('Ubah nama fitur:', key)
                        if (newName?.trim() && newName.trim() !== key) {
                          setForm(f => {
                            const feats = { ...f.features }
                            feats[newName.trim()] = feats[key]
                            delete feats[key]
                            return { ...f, features: feats }
                          })
                        }
                      }}
                      className="w-5 h-5 flex items-center justify-center text-[#8c7b75] hover:text-[#c9736a] transition-colors"
                      title="Edit nama fitur"
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => setForm(f => { const feats = { ...f.features }; delete feats[key]; return { ...f, features: feats } })}
                      className="w-5 h-5 flex items-center justify-center text-[#8c7b75] hover:text-red-500 transition-colors"
                      title="Hapus fitur"
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl border border-[#e8ddd8] text-sm font-medium text-[#8c7b75] hover:bg-[#fdf8f3] transition-colors">
              Batal
            </button>
            <button
              type="submit"
              disabled={!form.name.trim()}
              className="flex-1 py-3 rounded-xl text-sm font-medium text-white transition-all shadow-md hover:shadow-lg active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: 'linear-gradient(135deg, #c9736a, #a85a52)' }}
            >
              {editVendor ? 'Simpan Perubahan' : 'Simpan Vendor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function VendorDetailModal({ vendor, selected, onToggle, onClose, onEdit, fKeys }: {
  vendor: Vendor; selected: boolean; onToggle: () => void; onClose: () => void; onEdit: () => void; fKeys: Record<string, string[]>
}) {
  const keys = fKeys[vendor.category] ?? []
  const trueFeatures = keys.filter(k => vendor.features[k] === true)
  const falseFeatures = keys.filter(k => vendor.features[k] === false)
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" style={{ background: 'rgba(44,36,32,0.65)', backdropFilter: 'blur(4px)' }} onClick={onClose}>
      <div className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
        {/* Image */}
        <div className="relative h-52 shrink-0">
          <img src={vendor.image} alt={vendor.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors text-sm">✕</button>
          {vendor.custom && <span className="absolute top-3 left-3 text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#c4a35a] text-white">Custom</span>}
          <div className="absolute bottom-3 left-4 right-4">
            <h2 className="font-display text-xl font-bold text-white leading-tight">{vendor.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <StarRating rating={vendor.rating} />
              <span className="text-white/80 text-xs font-mono">{vendor.rating} ({vendor.reviews} ulasan)</span>
            </div>
          </div>
        </div>
        {/* Content */}
        <div className="overflow-y-auto flex-1 p-5 flex flex-col gap-4">
          {/* Meta */}
          <div className="flex flex-wrap gap-2">
            {vendor.location && <span className="flex items-center gap-1 text-xs text-[#8c7b75] bg-[#fdf8f3] border border-[#e8ddd8] rounded-full px-3 py-1"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>{vendor.location}</span>}
            {vendor.experience && <span className="flex items-center gap-1 text-xs text-[#8c7b75] bg-[#fdf8f3] border border-[#e8ddd8] rounded-full px-3 py-1">📅 Sejak {vendor.experience}</span>}
            <span className="flex items-center gap-1 text-sm font-semibold text-[#c9736a] bg-[#fdf8f3] border border-[#f5e6e0] rounded-full px-3 py-1">{vendor.price}</span>
          </div>
          {/* Tags */}
          {vendor.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {vendor.tags.map(t => <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-[#fdf8f3] border border-[#e8ddd8] text-[#5c4d47]">{t}</span>)}
            </div>
          )}
          {/* Description */}
          {vendor.description && (
            <div className="bg-[#fdf8f3] border border-[#e8ddd8] rounded-xl p-4">
              <div className="flex items-center gap-1.5 mb-2">
                <svg className="w-4 h-4 text-[#c4a35a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                <span className="text-xs font-semibold text-[#c4a35a] uppercase tracking-wide">Deskripsi Lengkap</span>
              </div>
              <p className="text-sm text-[#2c2420] leading-relaxed">{vendor.description}</p>
            </div>
          )}
          {/* Features */}
          {keys.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-[#8c7b75] uppercase tracking-wide mb-2">Fitur & Layanan</div>
              <div className="grid grid-cols-2 gap-1.5">
                {trueFeatures.map(f => <div key={f} className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg px-2.5 py-1.5"><svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>{f}</div>)}
                {falseFeatures.map(f => <div key={f} className="flex items-center gap-1.5 text-xs text-[#8c7b75] bg-[#fdf8f3] border border-[#e8ddd8] rounded-lg px-2.5 py-1.5 opacity-60"><svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>{f}</div>)}
              </div>
            </div>
          )}
          {/* Social */}
          <div>
            <div className="text-xs font-semibold text-[#8c7b75] uppercase tracking-wide mb-2">Kontak & Media Sosial</div>
            <SocialLinks links={vendor.links} />
          </div>
        </div>
        {/* Footer actions */}
        <div className="p-4 border-t border-[#f5e6e0] flex gap-2 shrink-0">
          <button onClick={onEdit} className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#e8ddd8] text-sm text-[#8c7b75] hover:bg-[#fdf8f3] transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            Edit
          </button>
          <button onClick={() => { onToggle(); onClose() }} className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${selected ? 'bg-[#fdf8f3] border border-[#c9736a] text-[#c9736a]' : 'text-white'}`} style={selected ? {} : { background: 'linear-gradient(135deg,#c9736a,#a85a52)' }}>
            {selected ? '✓ Sudah Dipilih — Batalkan' : '+ Tambahkan ke Perbandingan'}
          </button>
        </div>
      </div>
    </div>
  )
}

function VendorCard({ vendor, selected, onToggle, onEdit, onDelete, onDetail }: {
  vendor: Vendor; selected: boolean; onToggle: () => void
  onEdit: () => void; onDelete: () => void; onDetail: () => void
}) {
  return (
    <div
      onClick={onToggle}
      className={`relative rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer group ${selected ? 'ring-2 ring-[#c9736a] ring-offset-2 shadow-xl shadow-[#c9736a]/20' : 'ring-1 ring-[#e8ddd8] hover:ring-[#c4a35a]/60 hover:shadow-lg hover:shadow-[#c4a35a]/10'}`}
      style={{ background: '#ffffff' }}
    >
      {/* Selected overlay checkmark */}
      {selected && (
        <div className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-[#c9736a] flex items-center justify-center shadow-lg">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
        </div>
      )}

      <div className="relative h-44 overflow-hidden bg-[#f5e6e0]">
        <img src={vendor.image} alt={vendor.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className={`absolute inset-0 transition-all duration-300 ${selected ? 'bg-gradient-to-t from-black/50 via-[#c9736a]/10 to-transparent' : 'bg-gradient-to-t from-black/40 to-transparent'}`} />
        {vendor.custom && (
          <div className="absolute bottom-3 left-3">
            <span className="font-mono text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#c4a35a]/90 text-white">Custom</span>
          </div>
        )}
        {/* Edit / Delete — always visible, bottom-right of photo */}
        <div className="absolute bottom-2 right-2 z-20 flex gap-1.5" onClick={e => e.stopPropagation()}>
          <button
            onClick={onEdit}
            className="w-7 h-7 rounded-full bg-white/95 border border-[#e8ddd8] flex items-center justify-center text-[#8c7b75] hover:text-[#c9736a] hover:border-[#c9736a] transition-colors shadow-sm"
            title="Edit vendor"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
          </button>
          <button
            onClick={onDelete}
            className="w-7 h-7 rounded-full bg-white/95 border border-[#e8ddd8] flex items-center justify-center text-[#8c7b75] hover:text-red-500 hover:border-red-300 transition-colors shadow-sm"
            title="Hapus vendor"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-display font-semibold text-base text-[#2c2420] leading-tight mb-1.5">{vendor.name}</h3>
        <div className="flex items-center gap-2 mb-2">
          <StarRating rating={vendor.rating} />
          <span className="text-xs font-mono text-[#8c7b75]">{vendor.rating} ({vendor.reviews})</span>
        </div>
        <p className="text-xs text-[#8c7b75] mb-3 flex items-center gap-1">
          <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          {vendor.location}
        </p>
        <div className="flex items-center gap-1 mb-2">
          {vendor.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 flex-1 min-w-0">
              {vendor.tags.slice(0, 3).map(t => (
                <span key={t} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#fdf8f3] border border-[#e8ddd8] text-[#8c7b75]">{t}</span>
              ))}
            </div>
          )}
          {vendor.description && (
            <button
              onClick={e => { e.stopPropagation(); onDetail() }}
              title="Lihat deskripsi"
              className="shrink-0 w-6 h-6 rounded-full bg-[#fdf8f3] border border-[#e8ddd8] flex items-center justify-center text-[#c4a35a] hover:bg-[#f5e6e0] hover:border-[#c4a35a] transition-colors ml-auto"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </button>
          )}
        </div>
        <div className="pt-3 border-t border-[#f5e6e0]">
          <SocialLinks links={vendor.links} />
          <span className="font-display font-semibold text-[#c9736a] text-sm">{vendor.price}</span>
        </div>
      </div>
    </div>
  )
}

function getSummary(vendors: Vendor[], category: Category, fKeys: Record<string, string[]>): { id: string; badge: string; color: string; bg: string; border: string; reason: string }[] {
  const keys = fKeys[category] ?? []
  const scored = vendors.map(v => {
    const featureScore = keys.filter(k => v.features[k] === true).length / keys.length
    const score = v.rating * 0.6 + featureScore * 5 * 0.4
    return { v, score, featureScore }
  }).sort((a, b) => b.score - a.score)

  const results: { id: string; badge: string; color: string; bg: string; border: string; reason: string }[] = []
  const priceRanked = [...vendors].filter(v => v.priceNum > 0).sort((a, b) => a.priceNum - b.priceNum)
  const priceDesc = [...vendors].filter(v => v.priceNum > 0).sort((a, b) => b.priceNum - a.priceNum)
  const cheapestId = priceRanked[0]?.id
  const priceyId = priceDesc[0]?.id
  const usedBadges = new Set<string>()

  scored.forEach((item, i) => {
    const featurePct = Math.round(item.featureScore * 100)
    const isCheapest = item.v.id === cheapestId
    const isPriciest = item.v.id === priceyId && vendors.length > 1

    let badge: string, color: string, bg: string, border: string, reason: string

    if (i === 0 && !usedBadges.has('terbaik')) {
      badge = '🏆 Pilihan Terbaik'; color = 'text-amber-700'; bg = 'bg-amber-50'; border = 'border-amber-200'
      reason = `Skor gabungan tertinggi — rating ${item.v.rating} dengan ${featurePct}% fitur tersedia. Rekomendasi utama untuk pernikahan Anda.`
      usedBadges.add('terbaik')
    } else if (isCheapest && !usedBadges.has('hemat')) {
      badge = '💚 Pilihan Hemat'; color = 'text-emerald-700'; bg = 'bg-emerald-50'; border = 'border-emerald-200'
      reason = `Harga paling terjangkau (${item.v.price}) dengan rating ${item.v.rating}. Pilihan cerdas untuk anggaran terbatas.`
      usedBadges.add('hemat')
    } else if (isPriciest && !usedBadges.has('premium') && item.v.rating >= 4.5) {
      badge = '💎 Pilihan Premium'; color = 'text-purple-700'; bg = 'bg-purple-50'; border = 'border-purple-200'
      reason = `Layanan premium (${item.v.price}) dengan ${featurePct}% fitur dan rating ${item.v.rating}. Untuk yang mengutamakan kualitas terbaik.`
      usedBadges.add('premium')
    } else if (i === scored.length - 1 && scored.length > 2 && !usedBadges.has('fleksibel')) {
      badge = '🔄 Pilihan Fleksibel'; color = 'text-indigo-700'; bg = 'bg-indigo-50'; border = 'border-indigo-200'
      reason = `Rating ${item.v.rating} dengan variasi harga ${item.v.price}. Cocok jika kebutuhan spesifik Anda sesuai fitur yang tersedia.`
      usedBadges.add('fleksibel')
    } else {
      badge = '⭐ Pilihan Standar'; color = 'text-blue-700'; bg = 'bg-blue-50'; border = 'border-blue-200'
      reason = `Rating ${item.v.rating} dengan ${featurePct}% fitur tersedia. Pilihan seimbang antara kualitas dan harga.`
    }

    results.push({ id: item.v.id, badge, color, bg, border, reason })
  })
  return results
}

function SummarySection({ vendors, category, budgetNum = 0, fKeys }: { vendors: Vendor[]; category: Category; budgetNum?: number; fKeys: Record<string, string[]> }) {
  if (vendors.length < 2) return null
  const summaries = getSummary(vendors, category, fKeys)
  const vendorMap = Object.fromEntries(vendors.map(v => [v.id, v]))
  const keys = fKeys[category] ?? []
  const withinBudget = budgetNum > 0 ? vendors.filter(v => v.priceNum > 0 && v.priceNum <= budgetNum) : []
  const overBudget = budgetNum > 0 ? vendors.filter(v => v.priceNum > 0 && v.priceNum > budgetNum) : []
  const formatBudget = (n: number) => 'Rp ' + n.toLocaleString('id-ID')

  return (
    <div className="mb-8 rounded-2xl border border-[#e8ddd8] overflow-hidden bg-white shadow-sm">
      <div className="px-6 py-4 border-b border-[#f5e6e0] flex items-center gap-2" style={{ background: 'linear-gradient(135deg, #2c2420 0%, #3d2e29 100%)' }}>
        <span className="text-lg">✨</span>
        <span className="font-display font-semibold text-white text-lg">Kesimpulan & Rekomendasi</span>
        <span className="ml-auto font-mono text-xs text-white/40">AI Analysis</span>
      </div>
      <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {summaries.map(s => {
          const v = vendorMap[s.id]
          if (!v) return null
          const trueFeatures = keys.filter(k => v.features[k] === true)
          const falseFeatures = keys.filter(k => v.features[k] === false)
          const featurePct = Math.round((trueFeatures.length / keys.length) * 100)

          return (
            <div key={s.id} className={`rounded-2xl border-2 overflow-hidden ${s.border}`}>
              {/* Card Header */}
              <div className={`px-4 py-2.5 ${s.bg}`}>
                <span className={`text-xs font-bold tracking-wide ${s.color}`}>{s.badge}</span>
              </div>

              {/* Vendor Identity */}
              <div className="p-4 border-b border-[#f5e6e0]">
                <div className="flex items-center gap-3 mb-3">
                  <img src={v.image} alt={v.name} className="w-14 h-14 rounded-xl object-cover border-2 border-white shadow-md flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="font-display text-base font-bold text-[#2c2420] leading-tight truncate">{v.name}</div>
                    <div className={`text-sm font-mono font-semibold mt-0.5 ${s.color}`}>{v.price}</div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <div className="flex items-center gap-0.5">
                        {[1,2,3,4,5].map(i => (
                          <svg key={i} className={`w-3 h-3 ${i <= Math.round(v.rating) ? 'text-[#c4a35a]' : 'text-[#e8ddd8]'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                        ))}
                      </div>
                      <span className="text-xs font-mono text-[#8c7b75]">{v.rating} ({v.reviews} ulasan)</span>
                    </div>
                  </div>
                </div>

                {/* Meta info */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {v.location && v.location !== '-' && (
                    <div className="flex items-center gap-1.5 bg-white/70 rounded-lg px-2.5 py-1.5 border border-[#e8ddd8]">
                      <svg className="w-3 h-3 text-[#8c7b75] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      <span className="text-[10px] text-[#5a4a44] truncate">{v.location}</span>
                    </div>
                  )}
                  {v.experience && (
                    <div className="flex items-center gap-1.5 bg-white/70 rounded-lg px-2.5 py-1.5 border border-[#e8ddd8]">
                      <svg className="w-3 h-3 text-[#8c7b75] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span className="text-[10px] text-[#5a4a44]">{v.experience}</span>
                    </div>
                  )}
                </div>

                {/* Feature bar */}
                <div className="mb-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-medium text-[#8c7b75] uppercase tracking-wide">Fitur Tersedia</span>
                    <span className={`text-[10px] font-bold font-mono ${s.color}`}>{featurePct}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#f0e8e4] rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-500 ${s.color.includes('amber') ? 'bg-amber-400' : s.color.includes('emerald') ? 'bg-emerald-400' : s.color.includes('rose') ? 'bg-rose-400' : 'bg-blue-400'}`} style={{ width: `${featurePct}%` }} />
                  </div>
                </div>
              </div>

              {/* Analysis */}
              <div className="px-4 py-3 bg-white">
                {v.description && (
                  <p className="text-xs text-[#8c7b75] leading-relaxed mb-2 italic border-l-2 border-[#e8ddd8] pl-2">{v.description}</p>
                )}
                <p className="text-xs text-[#5a4a44] leading-relaxed mb-3">{s.reason}</p>

                {/* Pros */}
                {trueFeatures.length > 0 && (
                  <div className="mb-2">
                    <div className="text-[10px] font-semibold text-emerald-700 uppercase tracking-wide mb-1">✓ Tersedia</div>
                    <div className="flex flex-wrap gap-1">
                      {trueFeatures.slice(0, 4).map(f => (
                        <span key={f} className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700">{f}</span>
                      ))}
                      {trueFeatures.length > 4 && <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700">+{trueFeatures.length - 4} lagi</span>}
                    </div>
                  </div>
                )}

                {/* Cons */}
                {falseFeatures.length > 0 && (
                  <div className="mb-3">
                    <div className="text-[10px] font-semibold text-rose-600 uppercase tracking-wide mb-1">✗ Tidak Tersedia</div>
                    <div className="flex flex-wrap gap-1">
                      {falseFeatures.slice(0, 3).map(f => (
                        <span key={f} className="text-[9px] px-1.5 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-600">{f}</span>
                      ))}
                      {falseFeatures.length > 3 && <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-600">+{falseFeatures.length - 3} lagi</span>}
                    </div>
                  </div>
                )}

                {/* Tags */}
                {v.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {v.tags.map(t => (
                      <span key={t} className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#fdf8f3] border border-[#e8ddd8] text-[#8c7b75]">{t}</span>
                    ))}
                  </div>
                )}

                {/* CTA */}
                <SocialLinks links={v.links} />
              </div>
            </div>
          )
        })}
      </div>
      <div className="px-5 pb-5 flex flex-col gap-3">
        {budgetNum > 0 && (
          <div className="text-xs bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 leading-relaxed text-amber-800">
            <div className="font-semibold mb-1">💰 Analisis Budget: {formatBudget(budgetNum)}</div>
            {withinBudget.length > 0 ? (
              <p>✅ <strong>{withinBudget.length} vendor</strong> sesuai budget Anda: {withinBudget.map(v => v.name).join(', ')}.</p>
            ) : (
              <p>⚠️ Tidak ada vendor yang dipilih masuk dalam budget {formatBudget(budgetNum)}.</p>
            )}
            {overBudget.length > 0 && (
              <p className="mt-1">❌ <strong>{overBudget.length} vendor</strong> melebihi budget: {overBudget.map(v => `${v.name} (${v.price})`).join(', ')}.</p>
            )}
            {withinBudget.length > 0 && (
              <p className="mt-1 text-amber-700">💡 Dengan budget {formatBudget(budgetNum)}, pilihan terbaik yang terjangkau adalah <strong>{withinBudget.sort((a,b) => b.rating - a.rating)[0].name}</strong>.</p>
            )}
          </div>
        )}
        <p className="text-xs text-[#8c7b75] bg-[#fdf8f3] border border-[#e8ddd8] rounded-xl px-4 py-3 leading-relaxed">
          <strong>💡 Tip:</strong> Kesimpulan di atas didasarkan pada rating, jumlah fitur, dan harga. Pertimbangkan juga lokasi, ketersediaan tanggal, dan selera pribadi sebelum memutuskan.
        </p>
      </div>
    </div>
  )
}

function ComparisonTable({ vendors, category, fKeys }: { vendors: Vendor[]; category: Category; fKeys: Record<string, string[]> }) {
  const keys = fKeys[category] ?? []
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse min-w-[600px]">
        <thead>
          <tr>
            <th className="text-left py-4 px-5 text-xs font-medium text-[#8c7b75] uppercase tracking-wider w-44 border-b border-[#e8ddd8] bg-[#fdf8f3]">Fitur</th>
            {vendors.map(v => (
              <th key={v.id} className="py-4 px-5 text-center border-b border-[#e8ddd8] min-w-44 bg-[#fdf8f3]">
                <div className="flex flex-col items-center gap-2">
                  <img src={v.image} alt={v.name} className="w-12 h-12 rounded-full object-cover border-2 border-[#e8ddd8]" />
                  <span className="font-display text-sm font-semibold text-[#2c2420] leading-tight">{v.name}</span>
                  <span className="font-mono text-xs text-[#c9736a]">{v.price}</span>
                  <SocialLinks links={v.links} />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            { label: 'Rating', render: (v: Vendor) => <div className="flex flex-col items-center gap-1"><StarRating rating={v.rating} size="xs" /><span className="font-mono text-xs text-[#8c7b75]">{v.rating} ({v.reviews})</span></div> },
            { label: 'Lokasi', render: (v: Vendor) => <span className="text-xs text-[#2c2420]">{v.location}</span> },
            { label: 'Sejak', render: (v: Vendor) => <span className="text-xs font-mono text-[#2c2420]">{v.experience}</span> },
          ].map((row, i) => (
            <tr key={row.label} className={`border-b border-[#f5e6e0] ${i % 2 === 0 ? '' : 'bg-[#fdf8f3]/40'}`}>
              <td className="py-3 px-5 text-xs font-medium text-[#8c7b75]">{row.label}</td>
              {vendors.map(v => <td key={v.id} className="py-3 px-5 text-center">{row.render(v)}</td>)}
            </tr>
          ))}
          {keys.map((key, i) => (
            <tr key={key} className={`border-b border-[#f5e6e0] ${i % 2 === 0 ? 'bg-[#fdf8f3]/40' : ''}`}>
              <td className="py-3 px-5 text-xs font-medium text-[#8c7b75]">{key}</td>
              {vendors.map(v => (
                <td key={v.id} className="py-3 px-5 text-center">
                  {v.features[key] === true ? (
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-50 text-emerald-600"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg></span>
                  ) : v.features[key] === false ? (
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-rose-50 text-rose-400"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></span>
                  ) : (
                    <span className="text-xs text-[#2c2420] font-mono">{String(v.features[key])}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function CategoryModal({ editingCat, onClose, onSave, existingKeys = [] }: {
  editingCat: CategoryMeta | null
  onClose: () => void
  onSave: (cat: CategoryMeta, keys: string[]) => void
  existingKeys?: string[]
}) {
  const [label, setLabel] = useState(editingCat?.label ?? '')
  const [icon, setIcon] = useState(editingCat?.icon ?? '🏷️')
  const [keysText, setKeysText] = useState(existingKeys.join(', '))

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!label.trim()) return
    const id = editingCat?.id ?? label.trim().toLowerCase().replace(/[^a-z0-9]/g, '_') + '_' + Date.now()
    const keys = keysText.split(',').map(k => k.trim()).filter(Boolean)
    onSave({ id, label: label.trim(), icon: icon.trim() || '🏷️' }, keys)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(44,36,32,0.6)', backdropFilter: 'blur(4px)' }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="px-6 py-4 border-b border-[#f5e6e0] flex items-center justify-between" style={{ background: 'linear-gradient(135deg,#2c2420,#3d2e29)' }}>
          <span className="font-display font-semibold text-white text-lg">{editingCat ? 'Edit Kategori' : 'Tambah Kategori'}</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: '20px', lineHeight: 1 }}>✕</button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#8c7b75] uppercase tracking-wide mb-1">Emoji / Ikon</label>
            <input value={icon} onChange={e => setIcon(e.target.value)} className="w-20 text-2xl text-center border border-[#e8ddd8] rounded-lg p-2 focus:outline-none focus:border-[#c9736a]" maxLength={4} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#8c7b75] uppercase tracking-wide mb-1">Nama Kategori *</label>
            <input required value={label} onChange={e => setLabel(e.target.value)} placeholder="cth. Kebaya, Karikatur..." className="w-full border border-[#e8ddd8] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#c9736a]" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#8c7b75] uppercase tracking-wide mb-1">Fitur (pisahkan dengan koma, opsional)</label>
            <textarea value={keysText} onChange={e => setKeysText(e.target.value)} placeholder="cth. Gratis Konsultasi, Garansi, Pengiriman" rows={3} className="w-full border border-[#e8ddd8] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#c9736a] resize-none" />
            <p className="text-[10px] text-[#8c7b75] mt-1">Fitur akan muncul sebagai opsi saat tambah vendor di kategori ini.</p>
          </div>
          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-[#e8ddd8] text-sm text-[#8c7b75] hover:bg-[#fdf8f3] transition-colors">Batal</button>
            <button type="submit" className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors" style={{ background: '#2c2420' }}>
              {editingCat ? 'Simpan' : 'Tambah'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('mua')
  const [allVendors, setAllVendors] = useState<Vendor[]>(defaultVendors)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<'rating' | 'price_asc' | 'price_desc'>('rating')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null)
  const [budget, setBudget] = useState<string>('')
  const [categoryList, setCategoryList] = useState<CategoryMeta[]>(categories)
  const [categoryFeatureKeys, setCategoryFeatureKeys] = useState<Record<string, string[]>>(featureKeys as Record<string, string[]>)
  const [showCatModal, setShowCatModal] = useState(false)
  const [editingCat, setEditingCat] = useState<CategoryMeta | null>(null)
  const [detailVendor, setDetailVendor] = useState<Vendor | null>(null)
  const tabsRef = useRef<HTMLDivElement>(null)

  const categoryVendors = allVendors.filter(v => v.category === activeCategory)
  const budgetNum = budget.replace(/\D/g, '') ? parseInt(budget.replace(/\D/g, ''), 10) : 0
  const sorted = [...categoryVendors].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating
    if (sortBy === 'price_asc') return a.priceNum - b.priceNum
    return b.priceNum - a.priceNum
  })
  const selectedInCategory = selectedIds.filter(id => allVendors.find(v => v.id === id)?.category === activeCategory)
  const selectedVendors = allVendors.filter(v => selectedIds.includes(v.id) && v.category === activeCategory)

  function toggleVendor(id: string) {
    setSelectedIds(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id)
      const inCat = prev.filter(x => allVendors.find(v => v.id === x)?.category === activeCategory)
      // no max limit
      return [...prev, id]
    })
  }

  function changeCategory(cat: Category) {
    setActiveCategory(cat)
    setBudget('')
  }

  function handleAddVendor(v: Vendor) {
    if (editingVendor) {
      setAllVendors(prev => prev.map(x => x.id === v.id ? v : x))
    } else {
      setAllVendors(prev => [...prev, v])
    }
    setEditingVendor(null)
  }

  function handleDeleteVendor(id: string) {
    setAllVendors(prev => prev.filter(v => v.id !== id))
    setSelectedIds(prev => prev.filter(x => x !== id))
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-cream, #fdf8f3)' }}>
      {/* Hero */}
      <header className="relative overflow-hidden border-b border-[#3a2e2a]" style={{ background: '#2c2420' }}>
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23c4a35a' fill-opacity='1'%3E%3Cpath d='M20 20.5V18H0v5h5v5H0v5h20v-9.5zm-2 4.5h-1v-1h1v1zm1-10H4v1h15v4H4v1h15v5H4v1h15v-5h1v5h1v-4h1V8h-1v1h-1V8h-1v1zm0 10h-1v1h1v-1z'/%3E%3C/g%3E%3C/svg%3E")` }} />
        <div className="relative max-w-6xl mx-auto px-6 py-12 md:py-16">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-px bg-[#c4a35a]" />
            <span className="text-[#c4a35a] text-xs font-mono uppercase tracking-[0.2em]">Wedding Vendor Indonesia</span>
            <div className="w-10 h-px bg-[#c4a35a]" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4 leading-[1.1]">
            Compare Your<br />
            <em className="text-[#c4a35a] not-italic">Dream Wedding</em> Vendors
          </h1>
          <p className="text-white/55 text-base md:text-lg max-w-xl leading-relaxed font-light mb-8">
            Temukan dan bandingkan vendor MUA, dekorasi, MC, musik, catering, dan fotografi terbaik untuk hari paling istimewa Anda.
          </p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-7 items-center">
          {categoryList.map(c => {
            const isActive = activeCategory === c.id
            return (
              <div key={c.id} style={{ position: 'relative', display: 'inline-flex' }} className="group">
                <button
                  onClick={() => changeCategory(c.id)}
                  className="flex items-center gap-1.5 whitespace-nowrap transition-all duration-200"
                  style={{
                    padding: '7px 16px',
                    borderRadius: '999px',
                    fontSize: '13.5px',
                    fontWeight: 500,
                    letterSpacing: '0.01em',
                    background: isActive ? '#2c2420' : '#ffffff',
                    color: isActive ? '#ffffff' : '#5c4d47',
                    border: isActive ? '1.5px solid #2c2420' : '1.5px solid #e0d4ce',
                    cursor: 'pointer',
                    lineHeight: 1,
                    paddingRight: '36px',
                  }}
                >
                  <span style={{ fontSize: '15px', lineHeight: 1, display: 'flex', alignItems: 'center' }}>{c.icon}</span>
                  <span>{c.label}</span>
                </button>
                {/* Edit/Delete on hover */}
                <div className="absolute right-1 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center gap-0.5">
                  <button
                    onClick={e => { e.stopPropagation(); setEditingCat(c); setShowCatModal(true) }}
                    title="Edit kategori"
                    style={{ background: isActive ? 'rgba(255,255,255,0.2)' : 'rgba(44,36,32,0.08)', border: 'none', borderRadius: '4px', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0 }}
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={isActive ? '#fff' : '#5c4d47'} strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  </button>
                  {categoryList.length > 1 && (
                    <button
                      onClick={e => { e.stopPropagation(); if (confirm(`Hapus kategori "${c.label}"? Semua vendor di kategori ini juga akan dihapus.`)) { setCategoryList(prev => prev.filter(x => x.id !== c.id)); setAllVendors(prev => prev.filter(v => v.category !== c.id)); if (activeCategory === c.id) setActiveCategory(categoryList.find(x => x.id !== c.id)!.id) } }}
                      title="Hapus kategori"
                      style={{ background: 'rgba(201,115,106,0.15)', border: 'none', borderRadius: '4px', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0 }}
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#c9736a" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  )}
                </div>
              </div>
            )
          })}
          {/* Add Category Button */}
          <button
            onClick={() => { setEditingCat(null); setShowCatModal(true) }}
            title="Tambah kategori"
            className="flex items-center gap-1 whitespace-nowrap transition-all duration-200 hover:bg-[#f5e6e0]"
            style={{ padding: '7px 12px', borderRadius: '999px', fontSize: '13px', fontWeight: 500, background: '#fff', color: '#c4a35a', border: '1.5px dashed #c4a35a', cursor: 'pointer', lineHeight: 1 }}
          >
            <span style={{ fontSize: '16px' }}>+</span>
            <span>Kategori</span>
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          <div>
            <h2 className="font-display text-2xl font-semibold text-[#2c2420]">
              {categoryList.find(c => c.id === activeCategory)?.label}
            </h2>
            <p className="text-sm text-[#8c7b75] mt-0.5">
              {selectedInCategory.length === 0
                ? 'Klik kartu vendor untuk memilih dan membandingkan'
                : selectedInCategory.length === 1
                ? `${selectedInCategory.length} dipilih — pilih minimal 1 lagi untuk melihat perbandingan`
                : `${selectedInCategory.length} dipilih — perbandingan & rekomendasi otomatis tampil di bawah`}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <span style={{ position: 'absolute', left: '10px', fontSize: '13px', color: '#8c7b75', pointerEvents: 'none', fontWeight: 500 }}>Rp</span>
              <input
                type="text"
                inputMode="numeric"
                value={budget ? Number(budget.replace(/\./g, '')).toLocaleString('id-ID') : ''}
                onChange={e => {
                  const raw = e.target.value.replace(/\./g, '').replace(/[^\d]/g, '')
                  setBudget(raw)
                }}
                placeholder="Maks. budget (opsional)"
                className="text-sm border border-[#e8ddd8] rounded-lg bg-white text-[#2c2420] focus:outline-none focus:border-[#c9736a] transition-colors"
                style={{ paddingLeft: '32px', paddingRight: budget ? '28px' : '12px', paddingTop: '8px', paddingBottom: '8px', width: '200px' }}
              />
              {budget && (
                <button onClick={() => setBudget('')} style={{ position: 'absolute', right: '8px', color: '#8c7b75', cursor: 'pointer', lineHeight: 1, background: 'none', border: 'none', fontSize: '14px', display: 'flex' }} title="Hapus budget">✕</button>
              )}
            </div>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as typeof sortBy)}
              className="text-sm border border-[#e8ddd8] rounded-lg px-3 py-2 bg-white text-[#2c2420] focus:outline-none focus:border-[#c9736a] transition-colors"
            >
              <option value="rating">Rating Tertinggi</option>
              <option value="price_asc">Harga Terendah</option>
              <option value="price_desc">Harga Tertinggi</option>
            </select>
            <button
              onClick={() => { setEditingVendor(null); setShowAddModal(true) }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium border border-[#c4a35a] text-[#c4a35a] hover:bg-[#c4a35a] hover:text-white transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
              Tambah Vendor
            </button>
          </div>
        </div>

        {/* Vendor Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sorted.map(vendor => (
            <VendorCard
              key={vendor.id}
              vendor={vendor}
              selected={selectedIds.includes(vendor.id)}
              onToggle={() => toggleVendor(vendor.id)}
              onEdit={() => { setEditingVendor(vendor); setShowAddModal(true) }}
              onDelete={() => handleDeleteVendor(vendor.id)}
              onDetail={() => setDetailVendor(vendor)}
            />
          ))}
        </div>

        {/* Comparison + Summary — muncul di bawah grid */}
        {selectedVendors.length >= 2 && (
          <div className="mt-8">
            {/* Description comparison panel */}
            {selectedVendors.some(v => v.description) && (
              <div className="mb-5 rounded-2xl border border-[#e8ddd8] overflow-hidden bg-white shadow-sm">
                <div className="px-6 py-4 border-b border-[#f5e6e0] flex items-center gap-2" style={{ background: '#fdf8f3' }}>
                  <svg className="w-4 h-4 text-[#c4a35a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  <span className="font-display font-semibold text-[#2c2420] text-lg">Deskripsi Vendor</span>
                </div>
                <div className="grid gap-0 divide-x divide-[#f5e6e0]" style={{ gridTemplateColumns: `repeat(${selectedVendors.length}, 1fr)` }}>
                  {selectedVendors.map(v => (
                    <div key={v.id} className="p-5">
                      {/* Vendor identity */}
                      <div className="flex items-center gap-2.5 mb-3">
                        <img src={v.image} alt={v.name} className="w-10 h-10 rounded-full object-cover border-2 border-[#e8ddd8] shrink-0" />
                        <div className="min-w-0">
                          <div className="font-display font-semibold text-sm text-[#2c2420] leading-tight truncate">{v.name}</div>
                          <div className="flex items-center gap-0.5 mt-0.5">
                            {[1,2,3,4,5].map(i => (
                              <svg key={i} className={`w-2.5 h-2.5 ${i <= Math.round(v.rating) ? 'text-[#c4a35a]' : 'text-[#e8ddd8]'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                            ))}
                            <span className="text-[10px] font-mono text-[#8c7b75] ml-0.5">{v.rating} ({v.reviews})</span>
                          </div>
                        </div>
                      </div>

                      {/* Key facts */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#c9736a] bg-[#fdf0ed] border border-[#f5d5cc] rounded-full px-2.5 py-0.5">
                          {v.price}
                        </span>
                        {v.location && v.location !== '-' && (
                          <span className="inline-flex items-center gap-1 text-[11px] text-[#5a4a44] bg-[#fdf8f3] border border-[#e8ddd8] rounded-full px-2.5 py-0.5">
                            <svg className="w-2.5 h-2.5 text-[#8c7b75]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                            {v.location}
                          </span>
                        )}
                        {v.experience && (
                          <span className="inline-flex items-center gap-1 text-[11px] text-[#5a4a44] bg-[#fdf8f3] border border-[#e8ddd8] rounded-full px-2.5 py-0.5">
                            <svg className="w-2.5 h-2.5 text-[#8c7b75]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                            Sejak {v.experience}
                          </span>
                        )}
                      </div>

                      {/* Description box */}
                      <div className="rounded-xl border border-[#f0e8e4] bg-[#fdf8f3] p-3">
                        <div className="flex items-center gap-1.5 mb-2">
                          <svg className="w-3.5 h-3.5 text-[#c4a35a] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                          <span className="text-[10px] font-bold text-[#c4a35a] uppercase tracking-wider">Deskripsi Lengkap</span>
                        </div>
                        {v.description
                          ? <p className="text-xs text-[#5a4a44] leading-relaxed">{v.description}</p>
                          : <p className="text-xs text-[#c4b4ae] italic">Tidak ada deskripsi.</p>
                        }
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <SummarySection vendors={selectedVendors} category={activeCategory} budgetNum={budgetNum} fKeys={categoryFeatureKeys} />

            <div className="rounded-2xl border border-[#e8ddd8] overflow-hidden bg-white shadow-sm">
              <div className="px-6 py-4 border-b border-[#f5e6e0] flex items-center justify-between" style={{ background: '#fdf8f3' }}>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#c9736a]" />
                  <span className="font-display font-semibold text-[#2c2420] text-lg">Tabel Perbandingan</span>
                </div>
                <span className="font-mono text-xs text-[#8c7b75]">{selectedVendors.length} vendor dibandingkan</span>
              </div>
              <ComparisonTable vendors={selectedVendors} category={activeCategory} fKeys={categoryFeatureKeys} />
            </div>
          </div>
        )}

        {sorted.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">{categoryList.find(c => c.id === activeCategory)?.icon}</div>
            <p className="font-display text-xl text-[#8c7b75] mb-2">Belum ada vendor</p>
            <p className="text-sm text-[#8c7b75] mb-6">Jadilah yang pertama menambahkan vendor di kategori ini</p>
            <button onClick={() => { setEditingVendor(null); setShowAddModal(true) }} className="px-6 py-2.5 rounded-xl text-sm font-medium text-white shadow-md" style={{ background: 'linear-gradient(135deg, #c9736a, #a85a52)' }}>
              Tambah Vendor Pertama
            </button>
          </div>
        )}

        {/* How it Works */}
        <section className="mt-20 mb-8">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-12 h-px bg-[#e8ddd8]" />
              <span className="text-[#c4a35a] text-xs font-mono uppercase tracking-widest">Cara Kerja</span>
              <div className="w-12 h-px bg-[#e8ddd8]" />
            </div>
            <h2 className="font-display text-3xl font-bold text-[#2c2420]">Mudah & Cepat</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {[
              { step: '01', icon: '🏷️', title: 'Pilih Kategori', desc: 'Jelajahi MUA, dekorasi, catering, musik, dan 8 kategori vendor pernikahan lainnya.' },
              { step: '02', icon: '➕', title: 'Tambah Vendor Anda', desc: 'Ada vendor yang belum terdaftar? Tambahkan sendiri lengkap dengan link, harga, dan fiturnya.' },
              { step: '03', icon: '☑️', title: 'Klik Kartu Vendor', desc: 'Cukup klik kartu vendor untuk memilihnya. Pilih 2–5 vendor, perbandingan langsung muncul otomatis.' },
              { step: '04', icon: '✨', title: 'Kesimpulan Otomatis', desc: 'Dapatkan rekomendasi terbaik, pilihan budget, dan analisis vendor secara instan.' },
            ].map(s => (
              <div key={s.step} className="relative p-6 rounded-2xl border border-[#e8ddd8] bg-white group hover:border-[#c4a35a]/40 hover:shadow-md transition-all">
                <div className="font-mono text-3xl font-medium text-[#f5e6e0] mb-2 leading-none">{s.step}</div>
                <div className="text-2xl mb-2">{s.icon}</div>
                <h3 className="font-display font-semibold text-[#2c2420] text-base mb-1.5">{s.title}</h3>
                <p className="text-xs text-[#8c7b75] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#3a2e2a] mt-8" style={{ background: '#2c2420' }}>
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="font-display text-xl font-semibold text-white mb-1">WeddingCompare</div>
              <p className="text-white/35 text-xs font-mono">Platform perbandingan vendor pernikahan #1 Indonesia</p>
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {categoryList.map(c => (
                <button
                  key={c.id}
                  onClick={() => { changeCategory(c.id); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                  className="text-white/35 text-xs hover:text-[#c4a35a] cursor-pointer transition-colors whitespace-nowrap"
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
          <div className="border-t border-white/10 mt-6 pt-6 text-center">
            <p className="text-white/20 text-xs font-mono">© 2025 WeddingCompare · Dibuat dengan ♥ untuk pasangan Indonesia</p>
          </div>
        </div>
      </footer>

      {/* Vendor Detail Modal */}
      {detailVendor && (
        <VendorDetailModal
          vendor={detailVendor}
          selected={selectedIds.includes(detailVendor.id)}
          onToggle={() => toggleVendor(detailVendor.id)}
          onClose={() => setDetailVendor(null)}
          onEdit={() => { setEditingVendor(detailVendor); setShowAddModal(true); setDetailVendor(null) }}
          fKeys={categoryFeatureKeys}
        />
      )}

      {/* Add / Edit Vendor Modal */}
      {showAddModal && (
        <AddVendorModal
          category={activeCategory}
          onClose={() => { setShowAddModal(false); setEditingVendor(null) }}
          onAdd={handleAddVendor}
          editVendor={editingVendor}
          catList={categoryList}
          fKeys={categoryFeatureKeys}
        />
      )}

      {/* Add / Edit Category Modal */}
      {showCatModal && (
        <CategoryModal
          editingCat={editingCat}
          existingKeys={editingCat ? (categoryFeatureKeys[editingCat.id] ?? []) : []}
          onClose={() => { setShowCatModal(false); setEditingCat(null) }}
          onSave={(cat, keys) => {
            if (editingCat) {
              setCategoryList(prev => prev.map(c => c.id === editingCat.id ? cat : c))
              setCategoryFeatureKeys(prev => ({ ...prev, [cat.id]: keys }))
            } else {
              setCategoryList(prev => [...prev, cat])
              setCategoryFeatureKeys(prev => ({ ...prev, [cat.id]: keys }))
              setActiveCategory(cat.id)
            }
            setShowCatModal(false)
            setEditingCat(null)
          }}
        />
      )}
    </div>
  )
}
