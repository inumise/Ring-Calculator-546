import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { 
  Gem, CircleDot, Sparkles, DollarSign, 
  ShoppingCart, Settings, LogOut, Mail, Send, Trash2, 
  Eye, Globe, Palette, Lock, Menu, X, CheckCircle,
  MessageSquare, Package, ImagePlus, Tag
} from 'lucide-react'

type Language = 'cs' | 'en'

const translations: Record<Language, Record<string, string>> = {
  cs: {
    title: 'Kalkulacka Sperku',
    subtitle: 'Profesionalni nastroj pro klenotniky',
    jewelryType: 'Typ Sperku',
    selectJewelryType: 'Vyberte typ sperku',
    rings: 'Prsteny',
    necklaces: 'Nahrdelniky',
    bracelets: 'Naramky',
    earrings: 'Nausnice',
    pendants: 'Privesky',
    other: 'Ostatni',
    metalDimensions: 'Kov a Rozmery',
    configureSpecs: 'Nastavte material a fyzicke specifikace',
    metalType: 'Typ Kovu',
    metalWeight: 'Hmotnost Kovu (g)',
    suggested: 'Doporuceno',
    thickness: 'Tloustka (mm)',
    width: 'Sirka (mm)',
    ringSize: 'Velikost Prstenu',
    length: 'Delka',
    braceletSize: 'Velikost Naramku',
    size: 'Velikost',
    gemstones: 'Drahokamy',
    addGemstone: '+ Pridat Drahokam',
    gemstoneType: 'Typ Drahokamu',
    cut: 'Brus',
    carat: 'Karat',
    quantity: 'Mnozstvi',
    noGemstones: 'Zadne drahokamy.',
    priceBreakdown: 'Rozpis Ceny',
    metalCost: 'Cena Kovu',
    gemstoneCost: 'Cena Drahokamu',
    laborCost: 'Cena Prace',
    subtotal: 'Mezisoucet',
    markup: 'Marze',
    tax: 'DPH',
    totalPrice: 'Celkova Cena',
    viewCount: 'Pocet Zobrazeni',
    priceEstimate: 'Ceny jsou odhady.',
    addToCart: 'Pridat do Kosiku',
    cart: 'Kosik',
    emptyCart: 'Vas kosik je prazdny',
    checkout: 'Odeslat Poptavku',
    contact: 'Kontakt',
    contactAlex: 'Kontaktujte Alexe',
    yourName: 'Vase Jmeno',
    yourEmail: 'Vas Email',
    yourPhone: 'Vas Telefon',
    message: 'Zprava',
    sendMessage: 'Odeslat Zpravu',
    messageSent: 'Zprava odeslana! Alex vas kontaktuje pro vasi krasu.',
    orderSent: 'Objednavka odeslana! Alex vas kontaktuje pro vasi krasu.',
    admin: 'Admin',
    login: 'Prihlasit',
    logout: 'Odhlasit',
    username: 'Uzivatelske jmeno',
    password: 'Heslo',
    loginError: 'Nespravne prihlasovaci udaje',
    settings: 'Nastaveni',
    laborRate: 'Sazba Prace ($/hod)',
    markupPercent: 'Marze (%)',
    taxRate: 'Sazba DPH (%)',
    notificationEmail: 'Email pro Notifikace',
    saveSettings: 'Ulozit Nastaveni',
    settingsSaved: 'Nastaveni ulozeno!',
    appearance: 'Vzhled',
    backgroundColor: 'Barva Pozadi',
    backgroundImage: 'Obrazek Pozadi (URL)',
    orders: 'Objednavky',
    messages: 'Zpravy',
    noOrders: 'Zadne objednavky',
    noMessages: 'Zadne zpravy',
    quoteId: 'ID Nabidky',
    engraving: 'Gravirovani',
    engravingText: 'Text Gravirovani',
    rushOrder: 'Expresni Objednavka',
    rushFee: 'Priplatek za Expres',
    notes: 'Poznamky',
    customerNotes: 'Poznamky Zakaznika',
    pending: 'Ceka',
    confirmed: 'Potvrzeno',
    completed: 'Dokonceno',
    total: 'Celkem',
    items: 'Polozky',
    czech: 'Cestina',
    english: 'English',
    calculator: 'Kalkulacka',
    alexMessage: 'Alex vas kontaktuje pro vasi krasu.',
    listings: 'Nabidka',
    inStock: 'Na Sklade',
    addListing: 'Pridat Polozku',
    gemName: 'Nazev Drahokamu',
    gemPrice: 'Cena',
    gemImage: 'Obrazek (URL)',
    gemDescription: 'Popis',
    noListings: 'Zadne polozky na sklade',
    deleteListing: 'Smazat',
    selectFromStock: 'Vybrat ze skladu',
    addToCalculation: 'Pridat do kalkulace',
  },
  en: {
    title: 'Jewelry Cost Calculator',
    subtitle: 'Professional pricing tool for jewelers',
    jewelryType: 'Jewelry Type',
    selectJewelryType: 'Select the type of jewelry piece',
    rings: 'Rings',
    necklaces: 'Necklaces',
    bracelets: 'Bracelets',
    earrings: 'Earrings',
    pendants: 'Pendants',
    other: 'Other',
    metalDimensions: 'Metal & Dimensions',
    configureSpecs: 'Configure material and physical specifications',
    metalType: 'Metal Type',
    metalWeight: 'Metal Weight (g)',
    suggested: 'Suggested',
    thickness: 'Thickness (mm)',
    width: 'Width (mm)',
    ringSize: 'Ring Size',
    length: 'Length',
    braceletSize: 'Bracelet Size',
    size: 'Size',
    gemstones: 'Gemstones',
    addGemstone: '+ Add Gemstone',
    gemstoneType: 'Gemstone Type',
    cut: 'Cut',
    carat: 'Carat',
    quantity: 'Quantity',
    noGemstones: 'No gemstones added.',
    priceBreakdown: 'Price Breakdown',
    metalCost: 'Metal Cost',
    gemstoneCost: 'Gemstone Cost',
    laborCost: 'Labor Cost',
    subtotal: 'Subtotal',
    markup: 'Markup',
    tax: 'Tax',
    totalPrice: 'Total Price',
    viewCount: 'View Count',
    priceEstimate: 'Prices are estimates.',
    addToCart: 'Add to Cart',
    cart: 'Cart',
    emptyCart: 'Your cart is empty',
    checkout: 'Submit Request',
    contact: 'Contact',
    contactAlex: 'Contact Alex',
    yourName: 'Your Name',
    yourEmail: 'Your Email',
    yourPhone: 'Your Phone',
    message: 'Message',
    sendMessage: 'Send Message',
    messageSent: 'Message sent! Alex will contact you for your beauty.',
    orderSent: 'Order sent! Alex will contact you for your beauty.',
    admin: 'Admin',
    login: 'Login',
    logout: 'Logout',
    username: 'Username',
    password: 'Password',
    loginError: 'Invalid credentials',
    settings: 'Settings',
    laborRate: 'Labor Rate ($/hour)',
    markupPercent: 'Markup (%)',
    taxRate: 'Tax Rate (%)',
    notificationEmail: 'Notification Email',
    saveSettings: 'Save Settings',
    settingsSaved: 'Settings saved!',
    appearance: 'Appearance',
    backgroundColor: 'Background Color',
    backgroundImage: 'Background Image (URL)',
    orders: 'Orders',
    messages: 'Messages',
    noOrders: 'No orders yet',
    noMessages: 'No messages yet',
    quoteId: 'Quote ID',
    engraving: 'Engraving',
    engravingText: 'Engraving Text',
    rushOrder: 'Rush Order',
    rushFee: 'Rush Fee',
    notes: 'Notes',
    customerNotes: 'Customer Notes',
    pending: 'Pending',
    confirmed: 'Confirmed',
    completed: 'Completed',
    total: 'Total',
    items: 'Items',
    czech: 'Cestina',
    english: 'English',
    calculator: 'Calculator',
    alexMessage: 'Alex will contact you for your beauty.',
    listings: 'Listings',
    inStock: 'In Stock',
    addListing: 'Add Listing',
    gemName: 'Gem Name',
    gemPrice: 'Price',
    gemImage: 'Image (URL)',
    gemDescription: 'Description',
    noListings: 'No items in stock',
    deleteListing: 'Delete',
    selectFromStock: 'Select from stock',
    addToCalculation: 'Add to calculation',
  }
}

const METAL_PRICES: Record<string, { price: number; label: string }> = {
  gold_24k: { price: 75.50, label: '24K Gold (999)' },
  gold_22k: { price: 69.21, label: '22K Gold (916)' },
  gold_18k: { price: 56.63, label: '18K Gold (750)' },
  gold_14k: { price: 44.04, label: '14K Gold (585)' },
  gold_10k: { price: 31.46, label: '10K Gold (417)' },
  white_gold_18k: { price: 58.50, label: '18K White Gold' },
  white_gold_14k: { price: 46.00, label: '14K White Gold' },
  rose_gold_18k: { price: 57.00, label: '18K Rose Gold' },
  rose_gold_14k: { price: 45.00, label: '14K Rose Gold' },
  platinum_950: { price: 42.00, label: 'Platinum 950' },
  palladium: { price: 35.00, label: 'Palladium' },
  silver_925: { price: 1.05, label: 'Sterling Silver (925)' },
  titanium: { price: 0.25, label: 'Titanium' },
}

const GEMSTONE_PRICES: Record<string, { price: number; label: string }> = {
  diamond_d_if: { price: 15000, label: 'Diamond (D/IF)' },
  diamond_g_si1: { price: 4000, label: 'Diamond (G/SI1)' },
  diamond_i_i1: { price: 1200, label: 'Diamond (I/I1)' },
  ruby_aaa: { price: 5000, label: 'Ruby (AAA)' },
  ruby_a: { price: 800, label: 'Ruby (A)' },
  sapphire_aaa: { price: 4000, label: 'Sapphire (AAA)' },
  sapphire_a: { price: 600, label: 'Sapphire (A)' },
  emerald_aaa: { price: 8000, label: 'Emerald (AAA)' },
  emerald_a: { price: 1000, label: 'Emerald (A)' },
  tanzanite: { price: 1200, label: 'Tanzanite' },
  aquamarine: { price: 400, label: 'Aquamarine' },
  morganite: { price: 300, label: 'Morganite' },
  topaz: { price: 25, label: 'Blue Topaz' },
  amethyst: { price: 20, label: 'Amethyst' },
  citrine: { price: 15, label: 'Citrine' },
  peridot: { price: 80, label: 'Peridot' },
  garnet: { price: 150, label: 'Garnet' },
  tourmaline: { price: 500, label: 'Tourmaline' },
  opal: { price: 200, label: 'Opal' },
  pearl: { price: 150, label: 'Pearl' },
  moissanite: { price: 400, label: 'Moissanite' },
  cubic_zirconia: { price: 2, label: 'Cubic Zirconia' },
  lab_diamond: { price: 1500, label: 'Lab Diamond' },
}

const GEMSTONE_CUTS: Record<string, { multiplier: number; label: string }> = {
  round_brilliant: { multiplier: 1.0, label: 'Round Brilliant' },
  princess: { multiplier: 0.85, label: 'Princess' },
  cushion: { multiplier: 0.90, label: 'Cushion' },
  oval: { multiplier: 0.88, label: 'Oval' },
  emerald_cut: { multiplier: 0.82, label: 'Emerald Cut' },
  marquise: { multiplier: 0.80, label: 'Marquise' },
  pear: { multiplier: 0.82, label: 'Pear' },
  heart: { multiplier: 0.78, label: 'Heart' },
  cabochon: { multiplier: 0.65, label: 'Cabochon' },
}

const JEWELRY_TYPES: Record<string, { label: string; baseWeight: number; laborMultiplier: number; category: string }> = {
  ring_solitaire: { label: 'Solitaire Ring', baseWeight: 4, laborMultiplier: 1.0, category: 'rings' },
  ring_halo: { label: 'Halo Ring', baseWeight: 5, laborMultiplier: 1.5, category: 'rings' },
  ring_three_stone: { label: 'Three Stone Ring', baseWeight: 5.5, laborMultiplier: 1.4, category: 'rings' },
  ring_eternity: { label: 'Eternity Band', baseWeight: 3, laborMultiplier: 1.8, category: 'rings' },
  ring_wedding_plain: { label: 'Plain Wedding Band', baseWeight: 4, laborMultiplier: 0.6, category: 'rings' },
  ring_cocktail: { label: 'Cocktail Ring', baseWeight: 8, laborMultiplier: 1.6, category: 'rings' },
  ring_signet: { label: 'Signet Ring', baseWeight: 10, laborMultiplier: 1.2, category: 'rings' },
  necklace_pendant: { label: 'Pendant Necklace', baseWeight: 8, laborMultiplier: 1.1, category: 'necklaces' },
  necklace_chain: { label: 'Chain Necklace', baseWeight: 15, laborMultiplier: 0.8, category: 'necklaces' },
  necklace_choker: { label: 'Choker', baseWeight: 20, laborMultiplier: 1.2, category: 'necklaces' },
  necklace_tennis: { label: 'Tennis Necklace', baseWeight: 25, laborMultiplier: 2.0, category: 'necklaces' },
  bracelet_tennis: { label: 'Tennis Bracelet', baseWeight: 12, laborMultiplier: 1.8, category: 'bracelets' },
  bracelet_bangle: { label: 'Bangle', baseWeight: 20, laborMultiplier: 0.9, category: 'bracelets' },
  bracelet_cuff: { label: 'Cuff Bracelet', baseWeight: 35, laborMultiplier: 1.1, category: 'bracelets' },
  bracelet_chain: { label: 'Chain Bracelet', baseWeight: 8, laborMultiplier: 0.8, category: 'bracelets' },
  earring_stud: { label: 'Stud Earrings', baseWeight: 2, laborMultiplier: 1.0, category: 'earrings' },
  earring_hoop: { label: 'Hoop Earrings', baseWeight: 4, laborMultiplier: 0.9, category: 'earrings' },
  earring_drop: { label: 'Drop Earrings', baseWeight: 5, laborMultiplier: 1.3, category: 'earrings' },
  earring_chandelier: { label: 'Chandelier Earrings', baseWeight: 8, laborMultiplier: 1.8, category: 'earrings' },
  pendant_simple: { label: 'Simple Pendant', baseWeight: 3, laborMultiplier: 0.8, category: 'pendants' },
  pendant_halo: { label: 'Halo Pendant', baseWeight: 4, laborMultiplier: 1.4, category: 'pendants' },
  pendant_locket: { label: 'Locket', baseWeight: 8, laborMultiplier: 1.5, category: 'pendants' },
  brooch: { label: 'Brooch', baseWeight: 15, laborMultiplier: 1.5, category: 'other' },
  anklet: { label: 'Anklet', baseWeight: 5, laborMultiplier: 0.8, category: 'other' },
  tiara: { label: 'Tiara', baseWeight: 50, laborMultiplier: 2.5, category: 'other' },
  cufflinks: { label: 'Cufflinks', baseWeight: 12, laborMultiplier: 1.1, category: 'other' },
}

const RING_SIZES = ['3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13']
const NECKLACE_LENGTHS = ['14"', '16"', '18"', '20"', '22"', '24"']
const BRACELET_SIZES = ['6"', '7"', '8"', '9"']

interface GemstoneEntry { id: string; type: string; cut: string; carat: number; quantity: number }
interface CartItem { id: string; jewelryType: string; metal: string; metalWeight: number; gemstones: GemstoneEntry[]; total: number; engraving: string; rushOrder: boolean; notes: string; quoteId: string }
interface Order { id: string; items: CartItem[]; customer: { name: string; email: string; phone: string }; total: number; date: string; status: 'pending' | 'confirmed' | 'completed' }
interface Message { id: string; name: string; email: string; phone: string; message: string; date: string }
interface GemListing { id: string; name: string; price: number; image: string; description: string; carat: number; cut: string }
interface AdminSettings { laborRate: number; markup: number; taxRate: number; notificationEmail: string; bgColor: { r: number; g: number; b: number }; bgImage: string }

function App() {
  const [language, setLanguage] = useState<Language>(() => (localStorage.getItem('jewelry_language') as Language) || 'cs')
  const t = translations[language]

  const [currentView, setCurrentView] = useState<'calculator' | 'cart' | 'contact' | 'admin'>('calculator')
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)
  const [adminTab, setAdminTab] = useState<'settings' | 'orders' | 'messages' | 'appearance' | 'listings'>('settings')
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError, setLoginError] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const [adminSettings, setAdminSettings] = useState<AdminSettings>(() => {
    const saved = localStorage.getItem('jewelry_admin_settings')
    return saved ? JSON.parse(saved) : { laborRate: 50, markup: 100, taxRate: 21, notificationEmail: 'alex@jewelry.com', bgColor: { r: 15, g: 23, b: 42 }, bgImage: '' }
  })
  const [settingsSaved, setSettingsSaved] = useState(false)

    const [orders, setOrders] = useState<Order[]>(() => { const saved = localStorage.getItem('jewelry_orders'); return saved ? JSON.parse(saved) : [] })
    const [messages, setMessages] = useState<Message[]>(() => { const saved = localStorage.getItem('jewelry_messages'); return saved ? JSON.parse(saved) : [] })
    const [viewCount, setViewCount] = useState(() => { const saved = localStorage.getItem('jewelry_view_count'); return saved ? parseInt(saved) : 0 })
    const [gemListings, setGemListings] = useState<GemListing[]>(() => { const saved = localStorage.getItem('jewelry_gem_listings'); return saved ? JSON.parse(saved) : [] })
    const [newListing, setNewListing] = useState<Omit<GemListing, 'id'>>({ name: '', price: 0, image: '', description: '', carat: 1, cut: 'round_brilliant' })

  const [jewelryType, setJewelryType] = useState('ring_solitaire')
  const [jewelryCategory, setJewelryCategory] = useState('rings')
  const [metal, setMetal] = useState('gold_18k')
  const [metalWeight, setMetalWeight] = useState(5)
  const [thickness, setThickness] = useState(2)
  const [width, setWidth] = useState(2)
  const [size, setSize] = useState('7')
  const [engraving, setEngraving] = useState('')
  const [rushOrder, setRushOrder] = useState(false)
  const [customerNotes, setCustomerNotes] = useState('')

  const [gemstones, setGemstones] = useState<GemstoneEntry[]>([{ id: '1', type: 'diamond_g_si1', cut: 'round_brilliant', carat: 1.0, quantity: 1 }])
  const [cart, setCart] = useState<CartItem[]>(() => { const saved = localStorage.getItem('jewelry_cart'); return saved ? JSON.parse(saved) : [] })

  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [contactMessage, setContactMessage] = useState('')
  const [messageSent, setMessageSent] = useState(false)
  const [orderSent, setOrderSent] = useState(false)

  const [checkoutName, setCheckoutName] = useState('')
  const [checkoutEmail, setCheckoutEmail] = useState('')
  const [checkoutPhone, setCheckoutPhone] = useState('')

  useEffect(() => { const newCount = viewCount + 1; setViewCount(newCount); localStorage.setItem('jewelry_view_count', newCount.toString()) }, [])
  useEffect(() => { localStorage.setItem('jewelry_language', language) }, [language])
  useEffect(() => { localStorage.setItem('jewelry_admin_settings', JSON.stringify(adminSettings)) }, [adminSettings])
  useEffect(() => { localStorage.setItem('jewelry_orders', JSON.stringify(orders)) }, [orders])
  useEffect(() => { localStorage.setItem('jewelry_messages', JSON.stringify(messages)) }, [messages])
  useEffect(() => { localStorage.setItem('jewelry_cart', JSON.stringify(cart)) }, [cart])
  useEffect(() => { localStorage.setItem('jewelry_gem_listings', JSON.stringify(gemListings)) }, [gemListings])

  const handleLogin = () => {
    if (loginUsername === 'Blazenalex123' && loginPassword === 'Blazenalex123') {
      setIsAdminLoggedIn(true); setLoginError(false); setLoginUsername(''); setLoginPassword('')
    } else { setLoginError(true) }
  }

  const addGemstone = () => setGemstones([...gemstones, { id: Date.now().toString(), type: 'diamond_g_si1', cut: 'round_brilliant', carat: 0.5, quantity: 1 }])
  const removeGemstone = (id: string) => setGemstones(gemstones.filter(g => g.id !== id))
  const updateGemstone = (id: string, field: keyof GemstoneEntry, value: string | number) => setGemstones(gemstones.map(g => g.id === id ? { ...g, [field]: value } : g))

  const calculations = useMemo(() => {
    const metalData = METAL_PRICES[metal]
    const jewelryData = JEWELRY_TYPES[jewelryType]
    const metalCost = metalWeight * metalData.price
    let totalGemCost = 0
    gemstones.forEach(gem => {
      const gemData = GEMSTONE_PRICES[gem.type]
      const cutData = GEMSTONE_CUTS[gem.cut]
      if (gemData && cutData) totalGemCost += gemData.price * gem.carat * cutData.multiplier * gem.quantity
    })
    const baseLabor = adminSettings.laborRate * jewelryData.laborMultiplier * (metalWeight / 5)
    const laborCost = baseLabor + (gemstones.length * adminSettings.laborRate * 0.5)
    const rushFee = rushOrder ? laborCost * 0.5 : 0
    const subtotal = metalCost + totalGemCost + laborCost + rushFee
    const markupAmount = subtotal * (adminSettings.markup / 100)
    const preTaxTotal = subtotal + markupAmount
    const taxAmount = preTaxTotal * (adminSettings.taxRate / 100)
    const total = preTaxTotal + taxAmount
    return { metalCost, totalGemCost, laborCost, rushFee, subtotal, markupAmount, taxAmount, total }
  }, [jewelryType, metal, metalWeight, gemstones, adminSettings, rushOrder])

  const generateQuoteId = () => `Q-${Date.now().toString(36).toUpperCase()}`
  const addToCart = () => setCart([...cart, { id: Date.now().toString(), jewelryType, metal, metalWeight, gemstones: [...gemstones], total: calculations.total, engraving, rushOrder, notes: customerNotes, quoteId: generateQuoteId() }])
  const removeFromCart = (id: string) => setCart(cart.filter(item => item.id !== id))

  const submitOrder = () => {
    if (!checkoutName || !checkoutEmail || !checkoutPhone) return
    const order: Order = { id: Date.now().toString(), items: [...cart], customer: { name: checkoutName, email: checkoutEmail, phone: checkoutPhone }, total: cart.reduce((sum, item) => sum + item.total, 0), date: new Date().toISOString(), status: 'pending' }
    setOrders([...orders, order]); setCart([]); setOrderSent(true); setCheckoutName(''); setCheckoutEmail(''); setCheckoutPhone('')
    setTimeout(() => setOrderSent(false), 5000)
  }

  const submitMessage = () => {
    if (!contactName || !contactEmail || !contactMessage) return
    const msg: Message = { id: Date.now().toString(), name: contactName, email: contactEmail, phone: contactPhone, message: contactMessage, date: new Date().toISOString() }
    setMessages([...messages, msg]); setMessageSent(true); setContactName(''); setContactEmail(''); setContactPhone(''); setContactMessage('')
    setTimeout(() => setMessageSent(false), 5000)
  }

  const saveAdminSettings = () => { setSettingsSaved(true); setTimeout(() => setSettingsSaved(false), 3000) }

  const addGemListing = () => {
    if (!newListing.name || newListing.price <= 0) return
    const listing: GemListing = { ...newListing, id: Date.now().toString() }
    setGemListings([...gemListings, listing])
    setNewListing({ name: '', price: 0, image: '', description: '', carat: 1, cut: 'round_brilliant' })
  }
  const deleteGemListing = (id: string) => setGemListings(gemListings.filter(l => l.id !== id))
  const addListingToCalculation = (listing: GemListing) => {
    setGemstones([...gemstones, { id: Date.now().toString(), type: 'custom', cut: listing.cut, carat: listing.carat, quantity: 1 }])
  }

  const isRing = jewelryType.startsWith('ring_')
  const isNecklace = jewelryType.startsWith('necklace_')
  const isBracelet = jewelryType.startsWith('bracelet_')

  const bgStyle = { backgroundColor: `rgb(${adminSettings.bgColor.r}, ${adminSettings.bgColor.g}, ${adminSettings.bgColor.b})`, backgroundImage: adminSettings.bgImage ? `url(${adminSettings.bgImage})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }

  return (
    <div className="min-h-screen" style={bgStyle}>
      <div className="min-h-screen bg-gradient-to-br from-slate-900/90 via-purple-900/80 to-slate-900/90">
        <header className="border-b border-purple-500/30 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Gem className="w-8 h-8 text-purple-400" />
                <div>
                  <h1 className="text-2xl font-bold text-white">{t.title}</h1>
                  <p className="text-xs text-purple-300">{t.subtitle}</p>
                </div>
              </div>

              <nav className="hidden md:flex items-center gap-2">
                <Button variant={currentView === 'calculator' ? 'default' : 'ghost'} onClick={() => setCurrentView('calculator')} className="text-white">
                  <DollarSign className="w-4 h-4 mr-2" />{t.calculator}
                </Button>
                <Button variant={currentView === 'cart' ? 'default' : 'ghost'} onClick={() => setCurrentView('cart')} className="text-white relative">
                  <ShoppingCart className="w-4 h-4 mr-2" />{t.cart}
                  {cart.length > 0 && <Badge className="absolute -top-2 -right-2 bg-pink-500">{cart.length}</Badge>}
                </Button>
                <Button variant={currentView === 'contact' ? 'default' : 'ghost'} onClick={() => setCurrentView('contact')} className="text-white">
                  <Mail className="w-4 h-4 mr-2" />{t.contact}
                </Button>
                <Button variant={currentView === 'admin' ? 'default' : 'ghost'} onClick={() => setCurrentView('admin')} className="text-white">
                  <Lock className="w-4 h-4 mr-2" />{t.admin}
                </Button>
                <Select value={language} onValueChange={(v) => setLanguage(v as Language)}>
                  <SelectTrigger className="w-28 bg-slate-800 border-slate-600 text-white"><Globe className="w-4 h-4 mr-2" /><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="cs" className="text-white">{t.czech}</SelectItem>
                    <SelectItem value="en" className="text-white">{t.english}</SelectItem>
                  </SelectContent>
                </Select>
              </nav>

              <Button variant="ghost" className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>

            {mobileMenuOpen && (
              <nav className="md:hidden mt-4 flex flex-col gap-2">
                <Button variant="ghost" onClick={() => { setCurrentView('calculator'); setMobileMenuOpen(false) }} className="text-white justify-start"><DollarSign className="w-4 h-4 mr-2" /> {t.calculator}</Button>
                <Button variant="ghost" onClick={() => { setCurrentView('cart'); setMobileMenuOpen(false) }} className="text-white justify-start"><ShoppingCart className="w-4 h-4 mr-2" /> {t.cart} {cart.length > 0 && `(${cart.length})`}</Button>
                <Button variant="ghost" onClick={() => { setCurrentView('contact'); setMobileMenuOpen(false) }} className="text-white justify-start"><Mail className="w-4 h-4 mr-2" /> {t.contact}</Button>
                <Button variant="ghost" onClick={() => { setCurrentView('admin'); setMobileMenuOpen(false) }} className="text-white justify-start"><Lock className="w-4 h-4 mr-2" /> {t.admin}</Button>
                <Select value={language} onValueChange={(v) => setLanguage(v as Language)}>
                  <SelectTrigger className="bg-slate-800 border-slate-600 text-white"><Globe className="w-4 h-4 mr-2" /><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="cs" className="text-white">{t.czech}</SelectItem>
                    <SelectItem value="en" className="text-white">{t.english}</SelectItem>
                  </SelectContent>
                </Select>
              </nav>
            )}
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {currentView === 'calculator' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2"><Sparkles className="w-5 h-5 text-purple-400" />{t.jewelryType}</CardTitle>
                    <CardDescription className="text-slate-400">{t.selectJewelryType}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs value={jewelryCategory} onValueChange={setJewelryCategory}>
                      <TabsList className="grid grid-cols-6 bg-slate-700/50">
                        <TabsTrigger value="rings" className="text-xs">{t.rings}</TabsTrigger>
                        <TabsTrigger value="necklaces" className="text-xs">{t.necklaces}</TabsTrigger>
                        <TabsTrigger value="bracelets" className="text-xs">{t.bracelets}</TabsTrigger>
                        <TabsTrigger value="earrings" className="text-xs">{t.earrings}</TabsTrigger>
                        <TabsTrigger value="pendants" className="text-xs">{t.pendants}</TabsTrigger>
                        <TabsTrigger value="other" className="text-xs">{t.other}</TabsTrigger>
                      </TabsList>
                      {['rings', 'necklaces', 'bracelets', 'earrings', 'pendants', 'other'].map(cat => (
                        <TabsContent key={cat} value={cat} className="mt-4">
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {Object.entries(JEWELRY_TYPES).filter(([, v]) => v.category === cat).map(([key, value]) => (
                              <button key={key} onClick={() => setJewelryType(key)} className={`p-3 rounded-lg border transition-all text-left ${jewelryType === key ? 'bg-purple-600 border-purple-400 text-white' : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:border-purple-500'}`}>
                                <span className="text-sm">{value.label}</span>
                              </button>
                            ))}
                          </div>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2"><CircleDot className="w-5 h-5 text-yellow-400" />{t.metalDimensions}</CardTitle>
                    <CardDescription className="text-slate-400">{t.configureSpecs}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-slate-300">{t.metalType}</Label>
                        <Select value={metal} onValueChange={setMetal}>
                          <SelectTrigger className="bg-slate-700 border-slate-600 text-white"><SelectValue /></SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-600 max-h-60">
                            {Object.entries(METAL_PRICES).map(([key, value]) => (<SelectItem key={key} value={key} className="text-white">{value.label} - ${value.price}/g</SelectItem>))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-slate-300">{t.metalWeight}</Label>
                        <Input type="number" value={metalWeight} onChange={(e) => setMetalWeight(parseFloat(e.target.value) || 0)} min={0.1} step={0.1} className="bg-slate-700 border-slate-600 text-white" />
                        <p className="text-xs text-slate-500">{t.suggested}: {JEWELRY_TYPES[jewelryType]?.baseWeight}g</p>
                      </div>
                    </div>
                    <Separator className="bg-slate-600" />
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label className="text-slate-300">{t.thickness}</Label>
                        <Input type="number" value={thickness} onChange={(e) => setThickness(parseFloat(e.target.value) || 0)} min={0.5} step={0.1} className="bg-slate-700 border-slate-600 text-white" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-slate-300">{t.width}</Label>
                        <Input type="number" value={width} onChange={(e) => setWidth(parseFloat(e.target.value) || 0)} min={0.5} step={0.1} className="bg-slate-700 border-slate-600 text-white" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-slate-300">{isRing ? t.ringSize : isNecklace ? t.length : isBracelet ? t.braceletSize : t.size}</Label>
                        <Select value={size} onValueChange={setSize}>
                          <SelectTrigger className="bg-slate-700 border-slate-600 text-white"><SelectValue /></SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-600">
                            {(isRing ? RING_SIZES : isNecklace ? NECKLACE_LENGTHS : isBracelet ? BRACELET_SIZES : RING_SIZES).map((s) => (<SelectItem key={s} value={s} className="text-white">{s}</SelectItem>))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white flex items-center gap-2"><Gem className="w-5 h-5 text-blue-400" />{t.gemstones}</CardTitle>
                      <Button onClick={addGemstone} className="bg-purple-600 hover:bg-purple-700">{t.addGemstone}</Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {gemstones.map((gem, index) => (
                      <div key={gem.id} className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                        <div className="flex items-center justify-between mb-3">
                          <Badge variant="outline" className="text-purple-300 border-purple-500">{t.gemstones} {index + 1}</Badge>
                          {gemstones.length > 1 && <Button variant="ghost" size="sm" onClick={() => removeGemstone(gem.id)} className="text-red-400 hover:text-red-300"><Trash2 className="w-4 h-4" /></Button>}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div className="space-y-2">
                            <Label className="text-slate-300 text-xs">{t.gemstoneType}</Label>
                            <Select value={gem.type} onValueChange={(v) => updateGemstone(gem.id, 'type', v)}>
                              <SelectTrigger className="bg-slate-600 border-slate-500 text-white text-sm"><SelectValue /></SelectTrigger>
                              <SelectContent className="bg-slate-800 border-slate-600 max-h-60">
                                {Object.entries(GEMSTONE_PRICES).map(([key, value]) => (<SelectItem key={key} value={key} className="text-white text-xs">{value.label}</SelectItem>))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-slate-300 text-xs">{t.cut}</Label>
                            <Select value={gem.cut} onValueChange={(v) => updateGemstone(gem.id, 'cut', v)}>
                              <SelectTrigger className="bg-slate-600 border-slate-500 text-white text-sm"><SelectValue /></SelectTrigger>
                              <SelectContent className="bg-slate-800 border-slate-600">
                                {Object.entries(GEMSTONE_CUTS).map(([key, value]) => (<SelectItem key={key} value={key} className="text-white text-xs">{value.label}</SelectItem>))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-slate-300 text-xs">{t.carat}</Label>
                            <Input type="number" value={gem.carat} onChange={(e) => updateGemstone(gem.id, 'carat', parseFloat(e.target.value) || 0)} min={0.01} step={0.01} className="bg-slate-600 border-slate-500 text-white text-sm" />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-slate-300 text-xs">{t.quantity}</Label>
                            <Input type="number" value={gem.quantity} onChange={(e) => updateGemstone(gem.id, 'quantity', parseInt(e.target.value) || 1)} min={1} className="bg-slate-600 border-slate-500 text-white text-sm" />
                          </div>
                        </div>
                      </div>
                    ))}
                    {gemstones.length === 0 && <div className="text-center py-8 text-slate-400">{t.noGemstones}</div>}
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur">
                  <CardHeader><CardTitle className="text-white flex items-center gap-2"><Settings className="w-5 h-5 text-green-400" />{t.notes}</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-slate-300">{t.engravingText}</Label>
                        <Input value={engraving} onChange={(e) => setEngraving(e.target.value)} placeholder="..." className="bg-slate-700 border-slate-600 text-white" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-slate-300">{t.rushOrder}</Label>
                        <div className="flex items-center gap-2">
                          <input type="checkbox" checked={rushOrder} onChange={(e) => setRushOrder(e.target.checked)} className="w-5 h-5" />
                          <span className="text-slate-400 text-sm">+50% {t.laborCost}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-300">{t.customerNotes}</Label>
                      <Textarea value={customerNotes} onChange={(e) => setCustomerNotes(e.target.value)} placeholder="..." className="bg-slate-700 border-slate-600 text-white" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="bg-gradient-to-br from-purple-900/80 to-slate-800/80 border-purple-400/50 backdrop-blur sticky top-24">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2"><DollarSign className="w-5 h-5 text-green-400" />{t.priceBreakdown}</CardTitle>
                    <CardDescription className="text-purple-200">{JEWELRY_TYPES[jewelryType]?.label} - {METAL_PRICES[metal]?.label}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 bg-slate-800/50 rounded-lg"><div className="flex justify-between items-center"><span className="text-slate-300">{t.metalCost}</span><span className="text-white font-semibold">${calculations.metalCost.toFixed(2)}</span></div></div>
                    <div className="p-3 bg-slate-800/50 rounded-lg"><div className="flex justify-between items-center"><span className="text-slate-300">{t.gemstoneCost}</span><span className="text-white font-semibold">${calculations.totalGemCost.toFixed(2)}</span></div></div>
                    <div className="p-3 bg-slate-800/50 rounded-lg"><div className="flex justify-between items-center"><span className="text-slate-300">{t.laborCost}</span><span className="text-white font-semibold">${calculations.laborCost.toFixed(2)}</span></div></div>
                    {rushOrder && <div className="p-3 bg-orange-800/50 rounded-lg"><div className="flex justify-between items-center"><span className="text-orange-300">{t.rushFee}</span><span className="text-white font-semibold">${calculations.rushFee.toFixed(2)}</span></div></div>}
                    <Separator className="bg-slate-600" />
                    <div className="flex justify-between items-center"><span className="text-slate-300">{t.subtotal}</span><span className="text-white">${calculations.subtotal.toFixed(2)}</span></div>
                    <div className="flex justify-between items-center"><span className="text-slate-300">{t.markup} ({adminSettings.markup}%)</span><span className="text-white">${calculations.markupAmount.toFixed(2)}</span></div>
                    <div className="flex justify-between items-center"><span className="text-slate-300">{t.tax} ({adminSettings.taxRate}%)</span><span className="text-white">${calculations.taxAmount.toFixed(2)}</span></div>
                    <Separator className="bg-purple-500/50" />
                    <div className="p-4 bg-gradient-to-r from-purple-600/50 to-pink-600/50 rounded-lg"><div className="flex justify-between items-center"><span className="text-white text-lg font-semibold">{t.totalPrice}</span><span className="text-3xl font-bold text-white">${calculations.total.toFixed(2)}</span></div></div>
                    <Button onClick={addToCart} className="w-full bg-green-600 hover:bg-green-700 text-white"><ShoppingCart className="w-4 h-4 mr-2" />{t.addToCart}</Button>
                  </CardContent>
                </Card>
                          <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur"><CardContent className="py-4"><div className="flex items-center justify-center gap-2 text-slate-400"><Eye className="w-4 h-4" /><span>{t.viewCount}: {viewCount}</span></div></CardContent></Card>
                        </div>
                      </div>
                    )}

                    {currentView === 'calculator' && gemListings.length > 0 && (
                      <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur mt-6">
                        <CardHeader>
                          <CardTitle className="text-white flex items-center gap-2"><Tag className="w-5 h-5 text-green-400" />{t.inStock}</CardTitle>
                          <CardDescription className="text-slate-400">{t.selectFromStock}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {gemListings.map((listing) => (
                              <div key={listing.id} className="p-4 bg-slate-700/50 rounded-lg border border-slate-600 hover:border-purple-500 transition-all cursor-pointer" onClick={() => addListingToCalculation(listing)}>
                                <div className="flex gap-4">
                                  {listing.image ? (
                                    <img src={listing.image} alt={listing.name} className="w-24 h-24 object-cover rounded-lg" />
                                  ) : (
                                    <div className="w-24 h-24 bg-slate-600 rounded-lg flex items-center justify-center"><Gem className="w-8 h-8 text-slate-400" /></div>
                                  )}
                                  <div className="flex-1">
                                    <h3 className="text-white font-semibold">{listing.name}</h3>
                                    <p className="text-green-400 font-bold text-lg">${listing.price.toFixed(2)}</p>
                                    <p className="text-slate-400 text-sm">{listing.carat} ct - {GEMSTONE_CUTS[listing.cut]?.label}</p>
                                    {listing.description && <p className="text-slate-500 text-xs mt-1 line-clamp-2">{listing.description}</p>}
                                    <Button size="sm" className="mt-2 bg-purple-600 hover:bg-purple-700 text-xs"><Sparkles className="w-3 h-3 mr-1" />{t.addToCalculation}</Button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {currentView === 'cart' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur">
                <CardHeader><CardTitle className="text-white flex items-center gap-2"><ShoppingCart className="w-5 h-5 text-purple-400" />{t.cart}</CardTitle></CardHeader>
                <CardContent>
                  {cart.length === 0 ? (
                    <div className="text-center py-12 text-slate-400"><ShoppingCart className="w-16 h-16 mx-auto mb-4 opacity-50" /><p>{t.emptyCart}</p></div>
                  ) : (
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div key={item.id} className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-white font-semibold">{JEWELRY_TYPES[item.jewelryType]?.label}</h3>
                              <p className="text-slate-400 text-sm">{METAL_PRICES[item.metal]?.label} - {item.metalWeight}g</p>
                              <p className="text-slate-500 text-xs">{t.quoteId}: {item.quoteId}</p>
                              {item.engraving && <p className="text-slate-400 text-xs">{t.engraving}: {item.engraving}</p>}
                              {item.rushOrder && <Badge className="bg-orange-600 mt-1">{t.rushOrder}</Badge>}
                            </div>
                            <div className="text-right">
                              <p className="text-white font-bold text-xl">${item.total.toFixed(2)}</p>
                              <Button variant="ghost" size="sm" onClick={() => removeFromCart(item.id)} className="text-red-400"><Trash2 className="w-4 h-4" /></Button>
                            </div>
                          </div>
                        </div>
                      ))}
                      <Separator className="bg-slate-600" />
                      <div className="flex justify-between items-center text-xl"><span className="text-white font-semibold">{t.total}:</span><span className="text-white font-bold">${cart.reduce((sum, item) => sum + item.total, 0).toFixed(2)}</span></div>
                      <div className="space-y-4 mt-6">
                        <h3 className="text-white font-semibold">{t.contact}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Input placeholder={t.yourName} value={checkoutName} onChange={(e) => setCheckoutName(e.target.value)} className="bg-slate-700 border-slate-600 text-white" />
                          <Input placeholder={t.yourEmail} type="email" value={checkoutEmail} onChange={(e) => setCheckoutEmail(e.target.value)} className="bg-slate-700 border-slate-600 text-white" />
                          <Input placeholder={t.yourPhone} value={checkoutPhone} onChange={(e) => setCheckoutPhone(e.target.value)} className="bg-slate-700 border-slate-600 text-white" />
                        </div>
                        <Button onClick={submitOrder} className="w-full bg-green-600 hover:bg-green-700" disabled={!checkoutName || !checkoutEmail || !checkoutPhone}><Send className="w-4 h-4 mr-2" />{t.checkout}</Button>
                        {orderSent && <div className="p-4 bg-green-600/20 border border-green-500 rounded-lg text-green-300 text-center"><CheckCircle className="w-6 h-6 mx-auto mb-2" />{t.orderSent}</div>}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {currentView === 'contact' && (
            <div className="max-w-2xl mx-auto">
              <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2"><Mail className="w-5 h-5 text-purple-400" />{t.contactAlex}</CardTitle>
                  <CardDescription className="text-purple-200">{t.alexMessage}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2"><Label className="text-slate-300">{t.yourName}</Label><Input value={contactName} onChange={(e) => setContactName(e.target.value)} className="bg-slate-700 border-slate-600 text-white" /></div>
                    <div className="space-y-2"><Label className="text-slate-300">{t.yourEmail}</Label><Input type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} className="bg-slate-700 border-slate-600 text-white" /></div>
                  </div>
                  <div className="space-y-2"><Label className="text-slate-300">{t.yourPhone}</Label><Input value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} className="bg-slate-700 border-slate-600 text-white" /></div>
                  <div className="space-y-2"><Label className="text-slate-300">{t.message}</Label><Textarea value={contactMessage} onChange={(e) => setContactMessage(e.target.value)} rows={5} className="bg-slate-700 border-slate-600 text-white" /></div>
                  <Button onClick={submitMessage} className="w-full bg-purple-600 hover:bg-purple-700" disabled={!contactName || !contactEmail || !contactMessage}><Send className="w-4 h-4 mr-2" />{t.sendMessage}</Button>
                  {messageSent && <div className="p-4 bg-green-600/20 border border-green-500 rounded-lg text-green-300 text-center"><CheckCircle className="w-6 h-6 mx-auto mb-2" />{t.messageSent}</div>}
                </CardContent>
              </Card>
            </div>
          )}

          {currentView === 'admin' && (
            <div className="max-w-4xl mx-auto">
              {!isAdminLoggedIn ? (
                <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur max-w-md mx-auto">
                  <CardHeader><CardTitle className="text-white flex items-center gap-2"><Lock className="w-5 h-5 text-purple-400" />{t.admin} {t.login}</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2"><Label className="text-slate-300">{t.username}</Label><Input value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} className="bg-slate-700 border-slate-600 text-white" /></div>
                    <div className="space-y-2"><Label className="text-slate-300">{t.password}</Label><Input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="bg-slate-700 border-slate-600 text-white" /></div>
                    {loginError && <p className="text-red-400 text-sm">{t.loginError}</p>}
                    <Button onClick={handleLogin} className="w-full bg-purple-600 hover:bg-purple-700">{t.login}</Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-white">{t.admin}</h2>
                    <Button variant="ghost" onClick={() => setIsAdminLoggedIn(false)} className="text-white"><LogOut className="w-4 h-4 mr-2" />{t.logout}</Button>
                  </div>
                  <Tabs value={adminTab} onValueChange={(v) => setAdminTab(v as typeof adminTab)}>
                                        <TabsList className="bg-slate-700/50">
                                          <TabsTrigger value="settings"><Settings className="w-4 h-4 mr-2" />{t.settings}</TabsTrigger>
                                          <TabsTrigger value="appearance"><Palette className="w-4 h-4 mr-2" />{t.appearance}</TabsTrigger>
                                          <TabsTrigger value="listings"><Tag className="w-4 h-4 mr-2" />{t.listings} ({gemListings.length})</TabsTrigger>
                                          <TabsTrigger value="orders"><Package className="w-4 h-4 mr-2" />{t.orders} ({orders.length})</TabsTrigger>
                                          <TabsTrigger value="messages"><MessageSquare className="w-4 h-4 mr-2" />{t.messages} ({messages.length})</TabsTrigger>
                                        </TabsList>

                    <TabsContent value="settings">
                      <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur">
                        <CardContent className="pt-6 space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2"><Label className="text-slate-300">{t.laborRate}</Label><Input type="number" value={adminSettings.laborRate} onChange={(e) => setAdminSettings({ ...adminSettings, laborRate: parseFloat(e.target.value) || 0 })} className="bg-slate-700 border-slate-600 text-white" /></div>
                            <div className="space-y-2"><Label className="text-slate-300">{t.markupPercent}</Label><Input type="number" value={adminSettings.markup} onChange={(e) => setAdminSettings({ ...adminSettings, markup: parseFloat(e.target.value) || 0 })} className="bg-slate-700 border-slate-600 text-white" /></div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2"><Label className="text-slate-300">{t.taxRate}</Label><Input type="number" value={adminSettings.taxRate} onChange={(e) => setAdminSettings({ ...adminSettings, taxRate: parseFloat(e.target.value) || 0 })} className="bg-slate-700 border-slate-600 text-white" /></div>
                            <div className="space-y-2"><Label className="text-slate-300">{t.notificationEmail}</Label><Input type="email" value={adminSettings.notificationEmail} onChange={(e) => setAdminSettings({ ...adminSettings, notificationEmail: e.target.value })} className="bg-slate-700 border-slate-600 text-white" /></div>
                          </div>
                          <div className="flex items-center gap-2 text-slate-400"><Eye className="w-4 h-4" /><span>{t.viewCount}: {viewCount}</span></div>
                          <Button onClick={saveAdminSettings} className="bg-green-600 hover:bg-green-700">{t.saveSettings}</Button>
                          {settingsSaved && <p className="text-green-400">{t.settingsSaved}</p>}
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="appearance">
                      <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur">
                        <CardContent className="pt-6 space-y-4">
                          <div className="space-y-2">
                            <Label className="text-slate-300">{t.backgroundColor} (RGB)</Label>
                            <div className="grid grid-cols-3 gap-4">
                              <div><Label className="text-slate-400 text-xs">R</Label><Input type="number" min={0} max={255} value={adminSettings.bgColor.r} onChange={(e) => setAdminSettings({ ...adminSettings, bgColor: { ...adminSettings.bgColor, r: parseInt(e.target.value) || 0 } })} className="bg-slate-700 border-slate-600 text-white" /></div>
                              <div><Label className="text-slate-400 text-xs">G</Label><Input type="number" min={0} max={255} value={adminSettings.bgColor.g} onChange={(e) => setAdminSettings({ ...adminSettings, bgColor: { ...adminSettings.bgColor, g: parseInt(e.target.value) || 0 } })} className="bg-slate-700 border-slate-600 text-white" /></div>
                              <div><Label className="text-slate-400 text-xs">B</Label><Input type="number" min={0} max={255} value={adminSettings.bgColor.b} onChange={(e) => setAdminSettings({ ...adminSettings, bgColor: { ...adminSettings.bgColor, b: parseInt(e.target.value) || 0 } })} className="bg-slate-700 border-slate-600 text-white" /></div>
                            </div>
                            <div className="w-full h-12 rounded-lg border border-slate-600" style={{ backgroundColor: `rgb(${adminSettings.bgColor.r}, ${adminSettings.bgColor.g}, ${adminSettings.bgColor.b})` }} />
                          </div>
                                              <div className="space-y-2"><Label className="text-slate-300">{t.backgroundImage}</Label><Input value={adminSettings.bgImage} onChange={(e) => setAdminSettings({ ...adminSettings, bgImage: e.target.value })} placeholder="https://..." className="bg-slate-700 border-slate-600 text-white" /></div>
                                              <Button onClick={saveAdminSettings} className="bg-green-600 hover:bg-green-700">{t.saveSettings}</Button>
                                            </CardContent>
                                          </Card>
                                        </TabsContent>

                                        <TabsContent value="listings">
                                          <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur">
                                            <CardContent className="pt-6 space-y-6">
                                              <div className="space-y-4 p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                                                <h3 className="text-white font-semibold flex items-center gap-2"><ImagePlus className="w-5 h-5 text-purple-400" />{t.addListing}</h3>
                                                <div className="grid grid-cols-2 gap-4">
                                                  <div className="space-y-2"><Label className="text-slate-300">{t.gemName}</Label><Input value={newListing.name} onChange={(e) => setNewListing({ ...newListing, name: e.target.value })} placeholder="Diamond 1ct..." className="bg-slate-700 border-slate-600 text-white" /></div>
                                                  <div className="space-y-2"><Label className="text-slate-300">{t.gemPrice} ($)</Label><Input type="number" value={newListing.price} onChange={(e) => setNewListing({ ...newListing, price: parseFloat(e.target.value) || 0 })} className="bg-slate-700 border-slate-600 text-white" /></div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                  <div className="space-y-2"><Label className="text-slate-300">{t.carat}</Label><Input type="number" value={newListing.carat} onChange={(e) => setNewListing({ ...newListing, carat: parseFloat(e.target.value) || 0 })} step={0.1} className="bg-slate-700 border-slate-600 text-white" /></div>
                                                  <div className="space-y-2">
                                                    <Label className="text-slate-300">{t.cut}</Label>
                                                    <Select value={newListing.cut} onValueChange={(v) => setNewListing({ ...newListing, cut: v })}>
                                                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white"><SelectValue /></SelectTrigger>
                                                      <SelectContent className="bg-slate-800 border-slate-600">
                                                        {Object.entries(GEMSTONE_CUTS).map(([key, value]) => (<SelectItem key={key} value={key} className="text-white">{value.label}</SelectItem>))}
                                                      </SelectContent>
                                                    </Select>
                                                  </div>
                                                </div>
                                                <div className="space-y-2"><Label className="text-slate-300">{t.gemImage}</Label><Input value={newListing.image} onChange={(e) => setNewListing({ ...newListing, image: e.target.value })} placeholder="https://..." className="bg-slate-700 border-slate-600 text-white" /></div>
                                                <div className="space-y-2"><Label className="text-slate-300">{t.gemDescription}</Label><Textarea value={newListing.description} onChange={(e) => setNewListing({ ...newListing, description: e.target.value })} placeholder="..." className="bg-slate-700 border-slate-600 text-white" /></div>
                                                <Button onClick={addGemListing} className="bg-purple-600 hover:bg-purple-700" disabled={!newListing.name || newListing.price <= 0}><ImagePlus className="w-4 h-4 mr-2" />{t.addListing}</Button>
                                              </div>
                                              {gemListings.length === 0 ? <p className="text-slate-400 text-center py-8">{t.noListings}</p> : (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                  {gemListings.map((listing) => (
                                                    <div key={listing.id} className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                                                      <div className="flex gap-4">
                                                        {listing.image && <img src={listing.image} alt={listing.name} className="w-20 h-20 object-cover rounded-lg" />}
                                                        <div className="flex-1">
                                                          <h3 className="text-white font-semibold">{listing.name}</h3>
                                                          <p className="text-purple-400 font-bold">${listing.price.toFixed(2)}</p>
                                                          <p className="text-slate-400 text-sm">{listing.carat} ct - {GEMSTONE_CUTS[listing.cut]?.label}</p>
                                                          {listing.description && <p className="text-slate-500 text-xs mt-1">{listing.description}</p>}
                                                        </div>
                                                        <Button variant="ghost" size="sm" onClick={() => deleteGemListing(listing.id)} className="text-red-400 hover:text-red-300"><Trash2 className="w-4 h-4" /></Button>
                                                      </div>
                                                    </div>
                                                  ))}
                                                </div>
                                              )}
                                            </CardContent>
                                          </Card>
                                        </TabsContent>

                                        <TabsContent value="orders">
                      <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur">
                        <CardContent className="pt-6">
                          {orders.length === 0 ? <p className="text-slate-400 text-center py-8">{t.noOrders}</p> : (
                            <div className="space-y-4">
                              {orders.map((order) => (
                                <div key={order.id} className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                                  <div className="flex justify-between items-start mb-2">
                                    <div>
                                      <h3 className="text-white font-semibold">{order.customer.name}</h3>
                                      <p className="text-slate-400 text-sm">{order.customer.email} | {order.customer.phone}</p>
                                      <p className="text-slate-500 text-xs">{new Date(order.date).toLocaleString()}</p>
                                    </div>
                                    <div className="text-right">
                                      <p className="text-white font-bold">${order.total.toFixed(2)}</p>
                                      <Badge className={order.status === 'completed' ? 'bg-green-600' : order.status === 'confirmed' ? 'bg-blue-600' : 'bg-yellow-600'}>{t[order.status]}</Badge>
                                    </div>
                                  </div>
                                  <div className="text-slate-400 text-sm">{order.items.length} {t.items}</div>
                                </div>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="messages">
                      <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur">
                        <CardContent className="pt-6">
                          {messages.length === 0 ? <p className="text-slate-400 text-center py-8">{t.noMessages}</p> : (
                            <div className="space-y-4">
                              {messages.map((msg) => (
                                <div key={msg.id} className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                                  <div className="flex justify-between items-start mb-2">
                                    <div>
                                      <h3 className="text-white font-semibold">{msg.name}</h3>
                                      <p className="text-slate-400 text-sm">{msg.email} {msg.phone && `| ${msg.phone}`}</p>
                                      <p className="text-slate-500 text-xs">{new Date(msg.date).toLocaleString()}</p>
                                    </div>
                                  </div>
                                  <p className="text-slate-300">{msg.message}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              )}
            </div>
          )}
        </main>

        <footer className="border-t border-purple-500/30 bg-slate-900/80 backdrop-blur mt-12">
          <div className="container mx-auto px-4 py-6 text-center text-slate-400">
            <p>{t.priceEstimate}</p>
            <p className="mt-2 text-purple-300">{t.alexMessage}</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
