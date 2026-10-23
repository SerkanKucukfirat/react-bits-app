# Slimwell Akademi'ye Giriş – tanıtım videosu

Remotion ile hazırlanan, 1920x1080, 70 saniyelik animasyonlu eğitim videosu.

- `cikti/Slimwell_Akademiye_Giris_2026.mp4` – son sürüm (v1)
- `kaynak/eski-video.mp4` – eski "SLIMWELL HEO AKADEMİ'YE GİRİŞ" videosu (ekran kayıtlarının kaynağı)
- `kaynak/seslendirme-metni.txt` – onaylanan seslendirme metni
- `public/seslendirme.mp3` – Magnific, ElevenLabs v3, "Zeynep Kaya" sesi (68 sn)
- `public/*.mp4|png` – eski videodan kesilmiş ekran görüntüleri (1178x576, maket olmadan)
- `src/Akademi.tsx` – sahneler, zamanlamalar ve animasyonlar

## Çalıştırma

```bash
npm ci
npx remotion studio src/index.ts          # önizleme
npx remotion render src/index.ts Akademi out/sessiz.mp4
ffmpeg -i out/sessiz.mp4 -i public/seslendirme.mp3 -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k \
  -af "loudnorm=I=-16:TP=-1.5" -movflags +faststart cikti/video.mp4
```

Sahne zamanları (`scenes` dizisi) seslendirmenin kelime zamanlamalarına göre ayarlandı.

## Sıradaki adımlar (v2)

1. Yeni, yüksek çözünürlüklü ekran kaydı gelecek; mevcut kesimlerin yerine konacak.
2. Daha "show" bir kurgu: 3B kamera geçişleri, ekrandan fırlayan kartlar, tıklama efektleri,
   kinetik yazılar, büyük quiz sayacı, sertifikada konfeti, müzik ritmine göre kurgu.
3. Seslendirmede marka telaffuzları düzeltilecek; metinde markalar okunduğu gibi yazılacak.
   Onay bekleyen tahminler: Slimwell → "Slimvel", Casmara → "Kasmara", WishPro → "Viş Pro",
   Revcell → "Rev sel", heocademy → ?, Quiz → "Kuiz". "Slimwell Akademi" mi
   "Slimwell HEO Akademi" mi söyleneceği de sorulacak.
4. İstenirse fon müziği (Magnific'te üretilip indirilecek).
