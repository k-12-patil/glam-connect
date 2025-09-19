// src/data.jsx
const Data = [
  // ---------- ELITE ----------
  { id: 1, name: "Bene LipTint", price:  199.00, image: "/images/LipTint.jpg", description: "Benetint Lip & Cheek Stain Waterproof,longlasting tint for lip and cheeck (12.5 ml,red)" },
  { id: 2,name: "Swiss Beauty Eyeshadow",price:  800.00, image: "/images/Eyeshadow.jpg", description: "Ultimate Eyeshadow Palette 9 Colors 6 g(04) \ Vibrant eyeshadow palette for bold looks." },
  { id: 3,name: "Maybelline New York Primer", price: 499.00, image: "/images/Primer.jpg", description: "MAYBELLINE NEW YORK Fit me Face Primer Matte + Poreless,30 ml Primer -30 ml(Matte+Poreless) A mattifying primer for a smooth base." },
  { id: 4,  name: "Sugar Contour", price: 349.00, image: "/images/Contour.jpg", description: "Contour De Force Fcae Palette 01 Subtle Summit, 3-in-1 makeup palette that includes highlighter,bronzer and blush"  },
  // ---------- EYES ----------
  { id: 5, name: "Maybelline New York Mascara", price: 750.00, image: "/images/MayMascara.jpeg",description:"LASH SENSATIONAL Waterproof Mascara,Longlasting, Highly pigmented 10 ml(Black)" },
  { id: 6, name: "Mars Mascara", price: 699.00, image: "/images/MarsMascara.jpg",description:"2-in-1 Volumizing and Lengthening Long Lasting Mascara 15 ml(Black)" },
  { id: 7, name: "Swiss Beauty Eye Liner", price: 599.00, image: "/images/EyeLiner1.jpeg" ,descripion:"Waterproof Matte Liquid Black Eyeliner|Smudge Proof,Transfer Proof for EyeMakeup 4 ml(Black)"},
  { id: 8, name: "Lakme Kajal", price:  399.00, image: "/images/Kajal.jpg",description:"9 to 5 Kajal, Smudgeproof, Waterproof, lasts upto 24hrs, (Deep Black,0.35 g) "},
  { id: 9, name: "MamaEarth Kajal", price: 299.00, image: "/images/kajal1.jpeg",description:"Charcoal Black Long Stay Kajal Black Waterproof,with Vitamin C & Chamomile for 11-Hour Smudge-free Stay (Black, 0.35 g)" },
  { id: 10, name: "Swiss Beauty Kajal", price: 499.00, image: "/images/Kajal2.jpeg",description:"Swiss Beauty Bold and Black Kajal,Waterproof,24 Hour Stay,Enriched with Vitamin E" },
  { id: 11, name: "Swiss Beauty EyeShadow", price: " 800.00", image: "/images/Eyeshadow.jpg",description:"Ultimate Eyeshadow Palette 9 Colors 6 g(04) \ Vibrant eyeshadow palette for bold looks." },
  { id: 12, name: "Sugar Eyeshadow", price: 1499.00, image: "/images/Eyeshadow1.jpeg",description:"Blend The Rules Eyeshadow Palette 10.4 g (04 Fetish (Nudes))" },
  { id: 13, name: "Mars Eyeshadow", price: 1299.00, image: "/images/Eyeshadow2.jpeg" ,description:"Ultra Pigmented Smoky Eyes Mesmereyes Eyeshadow palette 28 g (Shimmers,Mattes,Glitters)"},

  // ---------- FACE ----------
   { id: 14, name: " Sugar Foundation", price: 759.00, image: "/images/Foundation.jpg",description:"Drop The Base Serum Foundation (15 Cappuccino (Light, Cool undertone) Foundation, 20 ml)" },
  { id: 15, name: "Fit Me Foundation", price:  599.00, image: "/images/Foundation1.jpeg" ,description:"MAYBELLINE NEW YORK Fit Me Matte + Poreless Foundation Natural Matte|12H ,30 ml Foundation (Soft Nude, 30 ml)"},
  { id: 15, name: "L'Oreal Paris Foundation", price: 899.00, image: "/images/Foundation2.jpeg",description:"True Match Super-Blendable Foundation -3W Warm (30 ml)" },
  { id: 16, name: "Maybelline New York Primer", price: 499.00, image: "/images/Primer.jpg",description:"MAYBELLINE NEW YORK Fit me Face Primer Matte + Poreless,30 ml Primer -30 ml(Matte+Poreless) A mattifying primer for a smooth base." },
  { id: 17, name: " Maybelline New York Concealer", price: 505.00, image: "/images/Concealer1.jpeg",description:"MAYBELLINE NEW YORK New Instant Age Rewind Concealer (Ivory, 6 ml)" },
  { id: 18, name: "Maybelline New York Concealer", price: 415.00, image: "/images/Concealer2.jpeg",description:"MAYBELLINE NEW YORK Fit Me Concealer (25 Medium, 6.8 ml)" },
  { id: 19, name: "Maybelline New York Compact", price: 199.00, image: "/images/MayCompact.jpg",description:"MAYBELLINE NEW YORK Fit Me Matte + Poreless Powder| 16H Oil Control with SPF 32 +++ Compact (Shade 115, 6 g)" },
  { id: 20, name: "Mamaearth Compact powder", price: 429.00, image: "/images/Compactpowder1.jpeg",description:"Glow Oil Control Compact SPF 30 with Vitamin C & Turmeric for 2X Instant Glow Compact (Nude Glow, 9 g)" },
  { id: 21, name: "Sugar Compact", price: 659.00, image: "/images/SugarPowder.jpg",description:"Set The Tone Tinted Powder Compact (30 Chococcino (Medium), 15 g)" },
  { id: 22, name: "M.A.C Blush", price:  2650.00, image: "/images/Blush.jpg",description:"M.A.C Mineralize Blush Petal Power - Petal Power - 2.3 gm" },
  { id: 23, name: "Swiss Beauty Blush & Highlighter", price: 299.00, image: "/images/BlushHighlighter.jpeg",description:"SWISS BEAUTY Baked Blusher & Highlighter (Shade-02)" },
  { id: 24, name: "Pixi Blush", price:  799.00, image: "/images/Blush2.jpg",description:"PIXI On The Glow Blush (FLEUR)"},

  // ---------- LIPS ----------
  { id: 25, name: "Huda Beauty Lipstick", price:  1200.00, image: "/images/HudaLipstick.jpg",description:"Huda Beauty Power Bullet Matte Lipstick" },
  { id: 26, name: "MamaEarth Lipstick", price:  399.00, image: "/images/MamLipstick.jpg" ,description:"Mamaearth Moisture Matte Longstay Lipstick with Avocado Oil & Vitamin E-12 Hour Long Stay (Grapefruit Pink, 2 g)"},
  { id: 27, name: "Maybelline New York Lipstick", price:  469.00, image: "/images/MayLipstick1.jpg" ,description:"MAYBELLINE NEW YORK Superstay Vinyl Ink Liquid Lipstick, Awestruck, 4.2ml (Awestruck, 4.2 ml)"},
  { id: 28, name: "Mars Lip Gloss", price:  209.00, image: "/images/MarsLipGloss.jpeg" ,description:"MARS Candylicious Coloured Lip Gloss|Hydrating | High shine | Non-Sticky Lipgloss (4 ml, 03-CARAMEL CRUNCH)"},
  { id: 29, name: "Mars LipLiner", price: 89.00, image: "/images/LipLiner1.jpeg" ,description:"MARS matte Lip Liner | Smooth Application, Long Lasting & Travel friendly Lip Pencil (WINE NIGHTS)"},
  { id: 30, name: "Mars Lipstick", price:  359.00, image: "/images/MarsLipstick.jpeg" ,description:"Mars Ultra Pigmented Creamy Matte Lipstick (06 Bhangra Bloom, 3.2 g)"},
  { id: 31, name: " Bene Lip Tint", price: 199.00, image: "/images/LipTint.jpg" ,description:"Benetint Lip & Cheek Stain Waterproof,longlasting tint for lip and cheeck (12.5 ml,red)"},
  { id: 32, name: "Swiss Beauty Lip Balm", price: 99.00, image: "/images/LipBalm2.jpeg",description:"SWISS BEAUY Swiss Beauty Kiss Kandy Lip Balm With Olive Oil" },
  { id: 33, name: "Sugar Lip Balm", price: 119.00, image: "/images/Lipbalm3.jpeg",description:"SUGAR POP SUGAR POP Lip Balm Cherry (Pack of:1, 4.5 g)" },
  // ---------- NEW ----------
  { id: 35, name: "M.A.C Highlighter", price: 27000.00, image: "/images/MacHighlighter.jpg",description:"M.A.C Mineralize Blush Petal Power - Petal Power - 2.3 gm"},
];

export default Data;