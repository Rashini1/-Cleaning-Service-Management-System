import { useState, useEffect, useRef } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    id: 1,
    name: "Deep Clean",
    category: "Residential",
    price: 149,
    priceUnit: "starting from",
    duration: "4–6 hrs",
    description:
      "Our most thorough service — every corner, every surface, every detail. Perfect for first-time clients or seasonal resets.",
    features: ["Kitchen deep scrub", "Bathroom sanitization", "Inside appliances", "Baseboards & vents", "Window sills"],
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=700&q=80",
    badge: "Most Popular",
    badgeColor: "#5a875a",
  },
  {
    id: 2,
    name: "Standard Home Clean",
    category: "Residential",
    price: 79,
    priceUnit: "per visit",
    duration: "2–3 hrs",
    description:
      "Regular maintenance cleaning to keep your home consistently fresh. Ideal for weekly or bi-weekly visits.",
    features: ["Dusting & wiping", "Vacuuming & mopping", "Bathroom refresh", "Kitchen wipe-down", "Trash removal"],
    image: "https://images.unsplash.com/photo-1527515637462-cff94aca208e?w=700&q=80",
    badge: null,
  },
  {
    id: 3,
    name: "Office Cleaning",
    category: "Commercial",
    price: 199,
    priceUnit: "starting from",
    duration: "3–5 hrs",
    description:
      "Professional cleaning for offices and co-working spaces. Scheduled around your business hours to minimise disruption.",
    features: ["Workstation wipe-down", "Meeting rooms", "Kitchen & pantry", "Washroom sanitization", "Floor care"],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=80",
    badge: null,
  },
  {
    id: 4,
    name: "Sofa & Upholstery",
    category: "Specialized",
    price: 89,
    priceUnit: "starting from",
    duration: "1–2 hrs",
    description:
      "Specialized cleaning for sofas, armchairs, and all upholstered furniture. Lifts stains, eliminates odors, restores freshness.",
    features: ["Stain treatment", "Odor elimination", "Fabric protection", "Hot water extraction", "Quick dry formula"],
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=700&q=80",
    badge: null,
  },
  {
    id: 5,
    name: "Move-In / Move-Out",
    category: "Specialized",
    price: 189,
    priceUnit: "starting from",
    duration: "5–8 hrs",
    description:
      "Comprehensive cleaning for properties being vacated or newly occupied. Ensures the space is spotless for the next chapter.",
    features: ["Inside cabinets & drawers", "Appliance interiors", "Wall spot cleaning", "Deep bathroom scrub", "Window cleaning"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80",
    badge: null,
  },
  {
    id: 6,
    name: "Post-Construction",
    category: "Specialized",
    price: 249,
    priceUnit: "starting from",
    duration: "6–10 hrs",
    description:
      "Specialist removal of construction dust, debris, and residue after renovation work. Your freshly built space, truly move-in ready.",
    features: ["Construction dust removal", "Paint splatter clean", "Window & glass polish", "Floor restoration", "Debris disposal"],
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80",
    badge: null,
  },
  {
    id: 7,
    name: "Carpet Steam Clean",
    category: "Specialized",
    price: 69,
    priceUnit: "per room",
    duration: "1–3 hrs",
    description:
      "Industrial-grade steam cleaning for carpets and rugs. Removes deep-set dirt, allergens, and stubborn stains.",
    features: ["Hot steam extraction", "Stain pre-treatment", "Deodorizing", "Allergen removal", "Fast-dry technique"],
    image: "https://images.unsplash.com/photo-1558618047-3c8c6d4f66a7?w=700&q=80",
    badge: null,
  },
  {
    id: 8,
    name: "Express Tidy",
    category: "Express",
    price: 49,
    priceUnit: "per visit",
    duration: "60–90 min",
    description:
      "A quick spruce-up for when you need your home guest-ready fast. Covers high-traffic areas and leaves things looking sharp.",
    features: ["Living area tidy", "Kitchen surface wipe", "Bathroom quick clean", "Vacuum main areas", "Trash empty"],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&q=80",
    badge: "Quick Book",
    badgeColor: "#d97706",
  },
];

const REVIEWS = [
  { id: 1, name: "Priya Mendis", initials: "PM", rating: 5, service: "Deep Clean", comment: "My apartment looks brand new! They paid attention to every corner and even cleaned behind the fridge. Absolutely incredible work." },
  { id: 2, name: "Rajesh Fernando", initials: "RF", rating: 5, service: "Office Cleaning", comment: "Using CleanPro for our office for 6 months. Consistent, professional, always on time. Exactly what a growing business needs." },
  { id: 3, name: "Anika Perera", initials: "AP", rating: 4, service: "Sofa & Upholstery", comment: "My 5-year-old couch looks almost new again! Stains I thought were permanent are completely gone. Will definitely book again." },
  { id: 4, name: "Dinesh Karunaratne", initials: "DK", rating: 5, service: "Move-In / Move-Out", comment: "Used CleanPro for our move-out and got the full deposit back! The property manager was genuinely impressed. Worth every rupee." },
  { id: 5, name: "Sanduni Wickramasinghe", initials: "SW", rating: 5, service: "Express Tidy", comment: "Booked the express tidy before my in-laws visit and they thought I'd spent the whole day cleaning. Fast, efficient, sparkling result!" },
  { id: 6, name: "Malik Jayasuriya", initials: "MJ", rating: 4, service: "Post-Construction", comment: "Post-renovation clean was done brilliantly. The fine dust is the hardest to deal with and they handled it perfectly. Very satisfied." },
];

const GALLERY_IMAGES = [
  { id: 1, src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=700&q=80", label: "Living Room" },
  { id: 2, src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&q=80", label: "Kitchen" },
  { id: 3, src: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=700&q=80", label: "Bathroom" },
  { id: 4, src: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=700&q=80", label: "Bedroom" },
  { id: 5, src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=700&q=80", label: "Office" },
  { id: 6, src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=700&q=80", label: "Dining Area" },
  { id: 7, src: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=700&q=80", label: "Master Suite" },
  { id: 8, src: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=700&q=80", label: "Bathroom Refresh" },
];

const TIME_SLOTS = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];

// ─── ADMIN PANEL ──────────────────────────────────────────────────────────────

function AdminPanel({ onClose }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [bookings, setBookings] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cp_bookings") || "[]"); } catch { return []; }
  });
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "admin123") { setLoggedIn(true); setError(""); }
    else setError("Incorrect password. Try: admin123");
  };

  const updateStatus = (id, status) => {
    const updated = bookings.map(b => b.id === id ? { ...b, status } : b);
    setBookings(updated);
    localStorage.setItem("cp_bookings", JSON.stringify(updated));
  };

  const deleteBooking = (id) => {
    const updated = bookings.filter(b => b.id !== id);
    setBookings(updated);
    localStorage.setItem("cp_bookings", JSON.stringify(updated));
  };

  const filtered = filter === "all" ? bookings : bookings.filter(b => b.status === filter);

  const statusStyle = { pending: "#d97706", confirmed: "#2563eb", completed: "#5a875a", cancelled: "#dc2626" };

  if (!loggedIn) return (
    <div style={styles.overlay}>
      <div style={styles.adminLoginBox}>
        <button onClick={onClose} style={styles.closeBtn}>✕</button>
        <div style={{ fontSize: 32, marginBottom: 8 }}>🔐</div>
        <h2 style={styles.adminTitle}>Admin Access</h2>
        <p style={styles.adminSub}>Enter your admin password to continue</p>
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input
            type="password"
            placeholder="Password (hint: admin123)"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={styles.input}
          />
          {error && <p style={{ color: "#dc2626", fontSize: 13 }}>{error}</p>}
          <button type="submit" style={styles.btnPrimary}>Login →</button>
        </form>
      </div>
    </div>
  );

  return (
    <div style={styles.overlay}>
      <div style={styles.adminPanel}>
        <div style={styles.adminHeader}>
          <div>
            <h2 style={styles.adminTitle}>Admin Dashboard</h2>
            <p style={styles.adminSub}>{bookings.length} total bookings</p>
          </div>
          <button onClick={onClose} style={styles.closeBtn}>✕</button>
        </div>

        {/* Stats */}
        <div style={styles.statsRow}>
          {[
            { label: "Total", val: bookings.length, color: "#1a1f1a" },
            { label: "Pending", val: bookings.filter(b => b.status === "pending").length, color: "#d97706" },
            { label: "Confirmed", val: bookings.filter(b => b.status === "confirmed").length, color: "#2563eb" },
            { label: "Completed", val: bookings.filter(b => b.status === "completed").length, color: "#5a875a" },
          ].map(s => (
            <div key={s.label} style={styles.statCard}>
              <div style={{ ...styles.statNum, color: s.color }}>{s.val}</div>
              <div style={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div style={styles.filterRow}>
          {["all", "pending", "confirmed", "completed", "cancelled"].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{ ...styles.filterBtn, ...(filter === f ? styles.filterBtnActive : {}) }}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Bookings */}
        <div style={styles.bookingsList}>
          {filtered.length === 0 ? (
            <div style={styles.emptyState}>No bookings found</div>
          ) : filtered.map(b => (
            <div key={b.id} style={styles.bookingCard}>
              <div style={styles.bookingTop}>
                <div>
                  <div style={styles.bookingRef}>{b.ref}</div>
                  <div style={styles.bookingName}>{b.customerName}</div>
                  <div style={styles.bookingMeta}>{b.email} · {b.phone}</div>
                </div>
                <span style={{ ...styles.statusBadge, background: statusStyle[b.status] + "20", color: statusStyle[b.status] }}>
                  {b.status}
                </span>
              </div>
              <div style={styles.bookingInfo}>
                <span>🧹 {b.serviceName}</span>
                <span>📅 {b.date} at {b.timeSlot}</span>
                <span>📍 {b.address?.street}, {b.address?.city}</span>
              </div>
              {b.notes && <div style={styles.bookingNotes}>"{b.notes}"</div>}
              <div style={styles.bookingActions}>
                <select
                  value={b.status}
                  onChange={e => updateStatus(b.id, e.target.value)}
                  style={styles.statusSelect}
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <button onClick={() => updateStatus(b.id, "completed")} style={styles.btnComplete}>
                  ✓ Complete
                </button>
                <button onClick={() => deleteBooking(b.id)} style={styles.btnDelete}>
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── BOOKING FORM ─────────────────────────────────────────────────────────────

function BookingModal({ selectedService, onClose, onSuccess }) {
  const [form, setForm] = useState({
    customerName: "", email: "", phone: "",
    street: "", city: "", postalCode: "",
    service: selectedService?.id || "",
    date: "", timeSlot: "", notes: "", propertySize: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const set = (key, val) => {
    setForm(f => ({ ...f, [key]: val }));
    if (errors[key]) setErrors(e => ({ ...e, [key]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.customerName.trim()) e.customerName = "Name is required";
    if (!form.email.match(/^\S+@\S+\.\S+$/)) e.email = "Valid email required";
    if (!form.phone.trim()) e.phone = "Phone is required";
    if (!form.street.trim()) e.street = "Street address is required";
    if (!form.city.trim()) e.city = "City is required";
    if (!form.service) e.service = "Please select a service";
    if (!form.date) e.date = "Please select a date";
    else if (new Date(form.date) < new Date(new Date().toDateString())) e.date = "Date cannot be in the past";
    if (!form.timeSlot) e.timeSlot = "Please select a time slot";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    setTimeout(() => {
      const svc = SERVICES.find(s => s.id === Number(form.service));
      const ref = "CP-" + Date.now().toString(36).toUpperCase();
      const booking = {
        id: Date.now(), ref,
        customerName: form.customerName, email: form.email, phone: form.phone,
        address: { street: form.street, city: form.city, postalCode: form.postalCode },
        serviceId: form.service, serviceName: svc?.name || "",
        date: form.date, timeSlot: form.timeSlot, notes: form.notes,
        status: "pending", createdAt: new Date().toISOString(),
      };
      const existing = JSON.parse(localStorage.getItem("cp_bookings") || "[]");
      localStorage.setItem("cp_bookings", JSON.stringify([...existing, booking]));
      setLoading(false);
      onSuccess(ref, svc?.name);
    }, 1200);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div style={styles.overlay}>
      <div style={styles.bookingModal}>
        <div style={styles.bookingModalHeader}>
          <div>
            <h2 style={styles.modalTitle}>Book Your Clean</h2>
            <p style={styles.modalSub}>Fill in your details and we'll confirm within 2 hours</p>
          </div>
          <button onClick={onClose} style={styles.closeBtn}>✕</button>
        </div>

        <form onSubmit={handleSubmit} style={styles.bookingForm}>
          {/* Personal Info */}
          <div style={styles.formSection}>
            <div style={styles.formSectionTitle}>Personal Details</div>
            <div style={styles.formGrid2}>
              <div>
                <label style={styles.label}>Full Name *</label>
                <input style={{ ...styles.input, ...(errors.customerName ? styles.inputError : {}) }}
                  placeholder="e.g. Priya Fernando"
                  value={form.customerName} onChange={e => set("customerName", e.target.value)} />
                {errors.customerName && <span style={styles.errorText}>{errors.customerName}</span>}
              </div>
              <div>
                <label style={styles.label}>Phone *</label>
                <input style={{ ...styles.input, ...(errors.phone ? styles.inputError : {}) }}
                  placeholder="+94 71 234 5678"
                  value={form.phone} onChange={e => set("phone", e.target.value)} />
                {errors.phone && <span style={styles.errorText}>{errors.phone}</span>}
              </div>
            </div>
            <div>
              <label style={styles.label}>Email Address *</label>
              <input style={{ ...styles.input, ...(errors.email ? styles.inputError : {}) }}
                type="email" placeholder="you@email.com"
                value={form.email} onChange={e => set("email", e.target.value)} />
              {errors.email && <span style={styles.errorText}>{errors.email}</span>}
            </div>
          </div>

          {/* Address */}
          <div style={styles.formSection}>
            <div style={styles.formSectionTitle}>Service Address</div>
            <div>
              <label style={styles.label}>Street Address *</label>
              <input style={{ ...styles.input, ...(errors.street ? styles.inputError : {}) }}
                placeholder="123 Galle Road"
                value={form.street} onChange={e => set("street", e.target.value)} />
              {errors.street && <span style={styles.errorText}>{errors.street}</span>}
            </div>
            <div style={styles.formGrid2}>
              <div>
                <label style={styles.label}>City *</label>
                <input style={{ ...styles.input, ...(errors.city ? styles.inputError : {}) }}
                  placeholder="Colombo"
                  value={form.city} onChange={e => set("city", e.target.value)} />
                {errors.city && <span style={styles.errorText}>{errors.city}</span>}
              </div>
              <div>
                <label style={styles.label}>Postal Code</label>
                <input style={styles.input} placeholder="00300"
                  value={form.postalCode} onChange={e => set("postalCode", e.target.value)} />
              </div>
            </div>
          </div>

          {/* Service & Schedule */}
          <div style={styles.formSection}>
            <div style={styles.formSectionTitle}>Service & Schedule</div>
            <div>
              <label style={styles.label}>Select Service *</label>
              <select style={{ ...styles.select, ...(errors.service ? styles.inputError : {}) }}
                value={form.service} onChange={e => set("service", e.target.value)}>
                <option value="">-- Choose a service --</option>
                {SERVICES.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name} — LKR {s.price.toLocaleString()} {s.priceUnit}
                  </option>
                ))}
              </select>
              {errors.service && <span style={styles.errorText}>{errors.service}</span>}
            </div>
            <div style={styles.formGrid2}>
              <div>
                <label style={styles.label}>Preferred Date *</label>
                <input type="date" min={today}
                  style={{ ...styles.input, ...(errors.date ? styles.inputError : {}) }}
                  value={form.date} onChange={e => set("date", e.target.value)} />
                {errors.date && <span style={styles.errorText}>{errors.date}</span>}
              </div>
              <div>
                <label style={styles.label}>Time Slot *</label>
                <select style={{ ...styles.select, ...(errors.timeSlot ? styles.inputError : {}) }}
                  value={form.timeSlot} onChange={e => set("timeSlot", e.target.value)}>
                  <option value="">-- Select time --</option>
                  {TIME_SLOTS.map(t => (
                    <option key={t} value={t}>{t} {parseInt(t) < 12 ? "AM" : "PM"}</option>
                  ))}
                </select>
                {errors.timeSlot && <span style={styles.errorText}>{errors.timeSlot}</span>}
              </div>
            </div>
            <div>
              <label style={styles.label}>Property Size</label>
              <select style={styles.select} value={form.propertySize} onChange={e => set("propertySize", e.target.value)}>
                <option value="">-- Select size (optional) --</option>
                <option value="studio">Studio / 1 Room</option>
                <option value="1bhk">1 BHK</option>
                <option value="2bhk">2 BHK</option>
                <option value="3bhk">3 BHK</option>
                <option value="4bhk+">4 BHK+</option>
                <option value="office-small">Office (Small)</option>
                <option value="office-large">Office (Large)</option>
              </select>
            </div>
            <div>
              <label style={styles.label}>Special Instructions</label>
              <textarea style={{ ...styles.input, height: 80, resize: "vertical" }}
                placeholder="Pet at home, key under mat, focus on kitchen..."
                value={form.notes} onChange={e => set("notes", e.target.value)} />
            </div>
          </div>

          <button type="submit" style={{ ...styles.btnPrimary, fontSize: 15, padding: "14px 24px" }} disabled={loading}>
            {loading ? "⏳ Confirming your booking..." : "✓ Confirm Booking"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── SUCCESS MODAL ─────────────────────────────────────────────────────────────

function SuccessModal({ bookingRef, serviceName, onClose }) {
  return (
    <div style={styles.overlay}>
      <div style={{ ...styles.adminLoginBox, textAlign: "center", maxWidth: 420 }}>
        <div style={{ fontSize: 56, marginBottom: 12 }}>🎉</div>
        <h2 style={{ ...styles.adminTitle, color: "#5a875a" }}>Booking Confirmed!</h2>
        <p style={{ color: "#555", marginBottom: 16, lineHeight: 1.6 }}>
          Your <strong>{serviceName}</strong> has been booked. We'll reach out within 2 hours to confirm your appointment.
        </p>
        <div style={styles.refBox}>
          <div style={{ fontSize: 12, color: "#888", marginBottom: 4 }}>BOOKING REFERENCE</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#5a875a", fontFamily: "monospace" }}>{bookingRef}</div>
        </div>
        <p style={{ fontSize: 12, color: "#aaa", margin: "12px 0 20px" }}>
          Save this reference number to track your booking status.
        </p>
        <button onClick={onClose} style={styles.btnPrimary}>Done</button>
      </div>
    </div>
  );
}

// ─── SECTION COMPONENTS ───────────────────────────────────────────────────────

function StarRating({ rating }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= rating ? "#f59e0b" : "#e5e7eb", fontSize: 14 }}>★</span>
      ))}
    </div>
  );
}

function ServiceCard({ service, onBook }) {
  const [hovered, setHovered] = useState(false);
  const categoryColors = {
    Residential: { bg: "#e8f5e9", color: "#2e7d32" },
    Commercial: { bg: "#e3f2fd", color: "#1565c0" },
    Specialized: { bg: "#fff8e1", color: "#e65100" },
    Express: { bg: "#fce4ec", color: "#c62828" },
  };
  const cc = categoryColors[service.category] || { bg: "#f5f5f5", color: "#333" };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...styles.serviceCard,
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? "0 20px 40px rgba(0,0,0,0.12)" : "0 2px 12px rgba(0,0,0,0.06)",
      }}
    >
      {service.badge && (
        <div style={{ ...styles.badgePill, background: service.badgeColor }}>
          {service.badge}
        </div>
      )}
      <div style={styles.cardImgWrap}>
        <img src={service.image} alt={service.name} style={{
          ...styles.cardImg,
          transform: hovered ? "scale(1.06)" : "scale(1)",
        }} />
      </div>
      <div style={styles.cardBody}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
          <span style={{ ...styles.categoryTag, background: cc.bg, color: cc.color }}>{service.category}</span>
          <span style={styles.duration}>⏱ {service.duration}</span>
        </div>
        <h3 style={styles.cardTitle}>{service.name}</h3>
        <p style={styles.cardDesc}>{service.description}</p>
        <ul style={styles.featureList}>
          {service.features.slice(0, 3).map(f => (
            <li key={f} style={styles.featureItem}>
              <span style={{ color: "#5a875a", marginRight: 6 }}>✓</span>{f}
            </li>
          ))}
        </ul>
        <div style={styles.cardFooter}>
          <div>
            <div style={styles.priceUnit}>{service.priceUnit}</div>
            <div style={styles.price}>LKR {service.price.toLocaleString()}</div>
          </div>
          <button onClick={() => onBook(service)} style={styles.btnBook}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function CleaningService() {
  const [activeSection, setActiveSection] = useState("home");
  const [showBooking, setShowBooking] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showSuccess, setShowSuccess] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [filterCat, setFilterCat] = useState("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
    setActiveSection(id);
  };

  const handleBook = (service = null) => {
    setSelectedService(service);
    setShowBooking(true);
  };

  const handleSuccess = (ref, svcName) => {
    setShowBooking(false);
    setShowSuccess({ ref, svcName });
  };

  const categories = ["All", ...new Set(SERVICES.map(s => s.category))];
  const filteredServices = filterCat === "All" ? SERVICES : SERVICES.filter(s => s.category === filterCat);
  const whatsappUrl = `https://wa.me/94712345678?text=Hi%20CleanPro!%20I%27d%20like%20to%20enquire%20about%20your%20services.`;

  return (
    <div style={styles.app}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Jost:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Jost', sans-serif; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-12px); } }
        @keyframes spin { to { transform:rotate(360deg); } }
        .fade-up { animation: fadeUp 0.7s ease forwards; }
        .fade-up-2 { animation: fadeUp 0.7s 0.15s ease forwards; opacity:0; }
        .fade-up-3 { animation: fadeUp 0.7s 0.3s ease forwards; opacity:0; }
        .fade-up-4 { animation: fadeUp 0.7s 0.45s ease forwards; opacity:0; }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-track { background:#f4f7f4; }
        ::-webkit-scrollbar-thumb { background:#a8c3a8; border-radius:3px; }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav style={{ ...styles.navbar, ...(scrolled ? styles.navbarScrolled : {}) }}>
        <div style={styles.navInner}>
          <button onClick={() => scrollTo("home")} style={styles.logo}>
            <span style={styles.logoIcon}>✦</span>
            Clean<span style={{ color: "#5a875a" }}>Pro</span>
          </button>

          {/* Desktop links */}
          <div style={styles.navLinks}>
            {["home","services","gallery","contact"].map(id => (
              <button key={id} onClick={() => scrollTo(id)} style={{
                ...styles.navLink,
                ...(activeSection === id ? styles.navLinkActive : {})
              }}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            ))}
          </div>

          <div style={styles.navRight}>
            <button onClick={() => setShowAdmin(true)} style={styles.adminBtn}>Admin</button>
            <button onClick={() => handleBook()} style={styles.navCta}>Book Now</button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={styles.hamburger}>
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div style={styles.mobileMenu}>
            {["home","services","gallery","contact"].map(id => (
              <button key={id} onClick={() => scrollTo(id)} style={styles.mobileNavLink}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            ))}
            <button onClick={() => { handleBook(); setMobileMenuOpen(false); }} style={{ ...styles.navCta, width: "100%", marginTop: 8 }}>
              Book Now
            </button>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="home" style={styles.hero}>
        <div style={styles.heroBg} />
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent}>
          <div className="fade-up" style={styles.heroTag}>Sri Lanka's #1 Cleaning Service</div>
          <h1 className="fade-up-2" style={styles.heroTitle}>
            Spotless Homes,<br />
            <em style={{ fontStyle: "italic", color: "#a8c3a8" }}>Stress-Free Life</em>
          </h1>
          <p className="fade-up-3" style={styles.heroSub}>
            Professional cleaning for homes, offices & beyond. Book in 60 seconds — we handle the rest.
          </p>
          <div className="fade-up-4" style={styles.heroCtas}>
            <button onClick={() => handleBook()} style={styles.heroBtn}>Book a Clean Today →</button>
            <button onClick={() => scrollTo("services")} style={styles.heroBtnGhost}>View Services</button>
          </div>
          <div className="fade-up-4" style={styles.heroStats}>
            {[["2,400+","Homes Cleaned"],["4.9★","Average Rating"],["100%","Satisfaction Rate"]].map(([v,l]) => (
              <div key={l} style={styles.heroStat}>
                <div style={styles.heroStatVal}>{v}</div>
                <div style={styles.heroStatLabel}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating card */}
        <div style={styles.heroCard}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🏠</div>
          <div style={styles.heroCardTitle}>Next Available</div>
          <div style={styles.heroCardVal}>Tomorrow, 9 AM</div>
          <button onClick={() => handleBook()} style={{ ...styles.btnPrimary, fontSize: 13, padding: "10px 18px", marginTop: 12 }}>
            Grab This Slot
          </button>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section style={styles.aboutSection}>
        <div style={styles.container}>
          <div style={styles.aboutGrid}>
            <div style={styles.aboutImgCol}>
              <div style={styles.aboutImgMain}>
                <img src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=700&q=80"
                  alt="Professional cleaning" style={styles.aboutImg} />
              </div>
              <div style={styles.aboutImgAccent}>
                <div style={styles.aboutBadge}>
                  <div style={styles.aboutBadgeNum}>8+</div>
                  <div style={styles.aboutBadgeText}>Years of<br/>Excellence</div>
                </div>
              </div>
            </div>
            <div style={styles.aboutText}>
              <div style={styles.sectionTag}>About CleanPro</div>
              <h2 style={styles.sectionTitle}>We Clean Like It's Our Own Home</h2>
              <p style={styles.aboutDesc}>
                Founded in Colombo in 2016, CleanPro was built on a single belief: everyone deserves
                to come home to a perfectly clean space without the stress of doing it themselves.
              </p>
              <p style={styles.aboutDesc}>
                Our 50-strong team of trained professionals uses eco-friendly products and
                industry-leading techniques to deliver consistently exceptional results across
                Sri Lanka's Western Province.
              </p>
              <div style={styles.aboutFeatures}>
                {[
                  ["🌿","Eco-Friendly Products","Safe for kids, pets & the planet"],
                  ["🛡","Verified & Insured Team","Every cleaner is background-checked"],
                  ["⏰","Always On Time","We respect your schedule, always"],
                  ["💯","Satisfaction Guaranteed","Not happy? We'll re-clean for free"],
                ].map(([icon, title, desc]) => (
                  <div key={title} style={styles.aboutFeatureItem}>
                    <div style={styles.aboutFeatureIcon}>{icon}</div>
                    <div>
                      <div style={styles.aboutFeatureTitle}>{title}</div>
                      <div style={styles.aboutFeatureDesc}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={styles.servicesSection}>
        <div style={styles.container}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={styles.sectionTag}>What We Offer</div>
            <h2 style={styles.sectionTitle}>Professional Cleaning Services</h2>
            <p style={styles.sectionSub}>
              From express tidies to full deep cleans — we have a service for every need and budget.
            </p>
          </div>

          {/* Category filter */}
          <div style={styles.categoryFilter}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setFilterCat(cat)}
                style={{ ...styles.filterChip, ...(filterCat === cat ? styles.filterChipActive : {}) }}>
                {cat}
              </button>
            ))}
          </div>

          <div style={styles.servicesGrid}>
            {filteredServices.map(svc => (
              <ServiceCard key={svc.id} service={svc} onBook={handleBook} />
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={styles.howSection}>
        <div style={styles.container}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={styles.sectionTagLight}>Simple Process</div>
            <h2 style={{ ...styles.sectionTitle, color: "#fff" }}>Book in 3 Easy Steps</h2>
          </div>
          <div style={styles.stepsRow}>
            {[
              { num: "01", icon: "📋", title: "Choose Your Service", desc: "Pick from 8 professional cleaning services tailored to your home or office." },
              { num: "02", icon: "📅", title: "Pick Date & Time", desc: "Select a convenient slot. We work 7 days a week, from 7 AM to 7 PM." },
              { num: "03", icon: "✨", title: "We Do the Rest", desc: "Our vetted professionals arrive on time and leave your space spotless." },
            ].map((step, i) => (
              <div key={step.num} style={styles.stepCard}>
                <div style={styles.stepNum}>{step.num}</div>
                <div style={styles.stepIcon}>{step.icon}</div>
                <h3 style={styles.stepTitle}>{step.title}</h3>
                <p style={styles.stepDesc}>{step.desc}</p>
                {i < 2 && <div style={styles.stepArrow}>→</div>}
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <button onClick={() => handleBook()} style={{ ...styles.heroBtn, fontSize: 15 }}>
              Book Your First Clean →
            </button>
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" style={styles.gallerySection}>
        <div style={styles.container}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={styles.sectionTag}>Before & After</div>
            <h2 style={styles.sectionTitle}>Spaces We've Transformed</h2>
            <p style={styles.sectionSub}>Real results from real clients across Colombo and beyond.</p>
          </div>
          <div style={styles.galleryGrid}>
            {GALLERY_IMAGES.map((img, i) => (
              <div key={img.id} style={{
                ...styles.galleryItem,
                gridColumn: i === 0 || i === 5 ? "span 2" : "span 1",
              }}>
                <img src={img.src} alt={img.label} style={styles.galleryImg} loading="lazy" />
                <div style={styles.galleryLabel}>{img.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section style={styles.reviewsSection}>
        <div style={styles.container}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={styles.sectionTag}>Testimonials</div>
            <h2 style={styles.sectionTitle}>What Our Clients Say</h2>
          </div>
          <div style={styles.reviewsGrid}>
            {REVIEWS.map(review => (
              <div key={review.id} style={styles.reviewCard}>
                <StarRating rating={review.rating} />
                <p style={styles.reviewComment}>"{review.comment}"</p>
                <div style={styles.reviewFooter}>
                  <div style={styles.reviewAvatar}>{review.initials}</div>
                  <div>
                    <div style={styles.reviewName}>{review.name}</div>
                    <div style={styles.reviewService}>{review.service}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={styles.contactSection}>
        <div style={styles.container}>
          <div style={styles.contactGrid}>
            <div>
              <div style={styles.sectionTag}>Get In Touch</div>
              <h2 style={styles.sectionTitle}>We'd Love to Hear From You</h2>
              <p style={styles.sectionSub}>Questions, custom quotes, or just a quick chat — reach us any way you like.</p>

              <div style={styles.contactItems}>
                {[
                  { icon: "📍", label: "Address", val: "42 Galle Road, Colombo 03, Western Province, Sri Lanka" },
                  { icon: "📞", label: "Phone", val: "+94 71 234 5678" },
                  { icon: "✉️", label: "Email", val: "hello@cleanpro.lk" },
                  { icon: "🕐", label: "Hours", val: "Mon–Sat: 7AM–7PM · Sun: 8AM–4PM" },
                ].map(item => (
                  <div key={item.label} style={styles.contactItem}>
                    <div style={styles.contactIcon}>{item.icon}</div>
                    <div>
                      <div style={styles.contactLabel}>{item.label}</div>
                      <div style={styles.contactVal}>{item.val}</div>
                    </div>
                  </div>
                ))}
              </div>

              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" style={styles.whatsappBtn}>
                <span>💬</span> Chat on WhatsApp
              </a>
            </div>

            {/* Embedded Map */}
            <div style={styles.mapWrap}>
              <iframe
                title="CleanPro Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31689.827!2d79.8612!3d6.9271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2slk!4v1"
                width="100%" height="100%"
                style={{ border: 0, borderRadius: 16 }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={styles.footer}>
        <div style={styles.footerTop}>
          <div style={styles.container}>
            <div style={styles.footerGrid}>
              <div>
                <div style={styles.footerLogo}>✦ CleanPro</div>
                <p style={styles.footerTagline}>Spotless Homes, Stress-Free Life.<br/>Sri Lanka's trusted cleaning partner.</p>
                <div style={styles.socialRow}>
                  {["📘","📷","💬"].map((icon, i) => (
                    <a key={i} href="#" style={styles.socialBtn}>{icon}</a>
                  ))}
                </div>
              </div>
              <div>
                <div style={styles.footerHeading}>Navigate</div>
                {["Home","Services","Gallery","Contact"].map(label => (
                  <button key={label} onClick={() => scrollTo(label.toLowerCase())} style={styles.footerLink}>
                    {label}
                  </button>
                ))}
              </div>
              <div>
                <div style={styles.footerHeading}>Services</div>
                {["Deep Clean","Standard Home","Office Cleaning","Express Tidy","Move-In/Out","Carpet Steam"].map(s => (
                  <div key={s} style={styles.footerLink}>{s}</div>
                ))}
              </div>
              <div>
                <div style={styles.footerHeading}>Quick Book</div>
                <p style={{ color: "#9ca3af", fontSize: 13, lineHeight: 1.6, marginBottom: 12 }}>
                  Ready for a spotless space? Book online in under 60 seconds.
                </p>
                <button onClick={() => handleBook()} style={{ ...styles.btnPrimary, fontSize: 14, padding: "12px 20px" }}>
                  Book Now →
                </button>
              </div>
            </div>
          </div>
        </div>
        <div style={styles.footerBottom}>
          <div style={styles.container}>
            <div style={styles.footerBottomInner}>
              <span>© {new Date().getFullYear()} CleanPro Sri Lanka. All rights reserved.</span>
              <button onClick={() => setShowAdmin(true)} style={styles.footerAdminLink}>Admin ↗</button>
            </div>
          </div>
        </div>
      </footer>

      {/* ── FLOATING WHATSAPP ── */}
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" style={styles.whatsappFloat}
        title="Chat on WhatsApp">
        💬
      </a>

      {/* ── MODALS ── */}
      {showBooking && (
        <BookingModal
          selectedService={selectedService}
          onClose={() => setShowBooking(false)}
          onSuccess={handleSuccess}
        />
      )}
      {showSuccess && (
        <SuccessModal
          bookingRef={showSuccess.ref}
          serviceName={showSuccess.svcName}
          onClose={() => setShowSuccess(null)}
        />
      )}
      {showAdmin && <AdminPanel onClose={() => setShowAdmin(false)} />}
    </div>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────

const styles = {
  app: { fontFamily: "'Jost', sans-serif", color: "#1a1f1a", background: "#fefdf8", overflowX: "hidden" },

  // Navbar
  navbar: { position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 16px", transition: "all 0.3s ease" },
  navbarScrolled: { background: "rgba(255,255,255,0.97)", backdropFilter: "blur(12px)", boxShadow: "0 2px 20px rgba(0,0,0,0.08)" },
  navInner: { maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 },
  logo: { background: "none", border: "none", cursor: "pointer", fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 700, color: "#1a1f1a", display: "flex", alignItems: "center", gap: 8 },
  logoIcon: { color: "#5a875a", fontSize: 16 },
  navLinks: { display: "flex", gap: 4, "@media(max-width:768px)": { display: "none" } },
  navLink: { background: "none", border: "none", cursor: "pointer", padding: "8px 16px", borderRadius: 24, fontSize: 14, fontWeight: 500, color: "#374151", transition: "all 0.2s" },
  navLinkActive: { background: "#e8f5e9", color: "#2e7d32" },
  navRight: { display: "flex", alignItems: "center", gap: 8 },
  adminBtn: { background: "none", border: "1px solid #d1d5db", cursor: "pointer", padding: "7px 14px", borderRadius: 20, fontSize: 12, color: "#6b7280", fontWeight: 500 },
  navCta: { background: "#5a875a", color: "white", border: "none", cursor: "pointer", padding: "9px 20px", borderRadius: 24, fontSize: 14, fontWeight: 600, transition: "background 0.2s" },
  hamburger: { display: "none", background: "none", border: "none", cursor: "pointer", fontSize: 20, color: "#374151", "@media(max-width:768px)": { display: "block" } },
  mobileMenu: { background: "white", padding: "12px 16px 20px", borderTop: "1px solid #f3f4f6", display: "flex", flexDirection: "column", gap: 4 },
  mobileNavLink: { background: "none", border: "none", cursor: "pointer", padding: "12px 16px", borderRadius: 12, fontSize: 15, color: "#374151", textAlign: "left" },

  // Hero
  hero: { position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" },
  heroBg: { position: "absolute", inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=85')", backgroundSize: "cover", backgroundPosition: "center" },
  heroOverlay: { position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(20,30,20,0.82) 0%, rgba(20,30,20,0.55) 60%, rgba(20,30,20,0.3) 100%)" },
  heroContent: { position: "relative", zIndex: 2, maxWidth: 680, padding: "120px 40px 80px", marginLeft: "5%" },
  heroTag: { display: "inline-block", background: "rgba(90,135,90,0.3)", border: "1px solid rgba(168,195,168,0.4)", color: "#a8c3a8", padding: "6px 16px", borderRadius: 24, fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 24 },
  heroTitle: { fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(42px, 7vw, 76px)", fontWeight: 700, color: "white", lineHeight: 1.1, marginBottom: 20 },
  heroSub: { fontSize: 17, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: 32, maxWidth: 520 },
  heroCtas: { display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 48 },
  heroBtn: { background: "#5a875a", color: "white", border: "none", cursor: "pointer", padding: "14px 28px", borderRadius: 32, fontSize: 15, fontWeight: 600, transition: "all 0.2s" },
  heroBtnGhost: { background: "transparent", color: "white", border: "2px solid rgba(255,255,255,0.4)", cursor: "pointer", padding: "14px 28px", borderRadius: 32, fontSize: 15, fontWeight: 500, transition: "all 0.2s" },
  heroStats: { display: "flex", gap: 32, flexWrap: "wrap" },
  heroStat: { borderLeft: "2px solid rgba(168,195,168,0.4)", paddingLeft: 16 },
  heroStatVal: { fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 700, color: "white" },
  heroStatLabel: { fontSize: 12, color: "rgba(255,255,255,0.55)", marginTop: 2 },
  heroCard: { position: "absolute", right: "8%", top: "50%", transform: "translateY(-50%)", background: "white", padding: 28, borderRadius: 20, boxShadow: "0 24px 60px rgba(0,0,0,0.25)", textAlign: "center", width: 200, animation: "float 4s ease-in-out infinite", zIndex: 3 },
  heroCardTitle: { fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", color: "#9ca3af", textTransform: "uppercase", marginBottom: 4 },
  heroCardVal: { fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 700, color: "#1a1f1a" },

  // About
  aboutSection: { padding: "96px 0", background: "#fefdf8" },
  container: { maxWidth: 1200, margin: "0 auto", padding: "0 24px" },
  aboutGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" },
  aboutImgCol: { position: "relative" },
  aboutImgMain: { borderRadius: 20, overflow: "hidden", aspectRatio: "4/5" },
  aboutImg: { width: "100%", height: "100%", objectFit: "cover" },
  aboutImgAccent: { position: "absolute", bottom: -24, right: -24, background: "#5a875a", borderRadius: 16, padding: 24, boxShadow: "0 12px 32px rgba(90,135,90,0.3)" },
  aboutBadge: { textAlign: "center", color: "white" },
  aboutBadgeNum: { fontFamily: "'Cormorant Garamond', serif", fontSize: 40, fontWeight: 700, lineHeight: 1 },
  aboutBadgeText: { fontSize: 12, opacity: 0.85, marginTop: 4 },
  aboutText: { paddingLeft: 24 },
  sectionTag: { display: "inline-block", color: "#5a875a", fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12, fontFamily: "monospace" },
  sectionTagLight: { display: "inline-block", color: "#a8c3a8", fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12, fontFamily: "monospace" },
  sectionTitle: { fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, lineHeight: 1.2, marginBottom: 16, color: "#1a1f1a" },
  sectionSub: { color: "#6b7280", fontSize: 15, lineHeight: 1.7, marginBottom: 24 },
  aboutDesc: { color: "#4b5563", fontSize: 15, lineHeight: 1.8, marginBottom: 16 },
  aboutFeatures: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 32 },
  aboutFeatureItem: { display: "flex", gap: 12, alignItems: "flex-start" },
  aboutFeatureIcon: { fontSize: 20, width: 40, height: 40, background: "#e8f5e9", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  aboutFeatureTitle: { fontSize: 13, fontWeight: 600, color: "#1a1f1a", marginBottom: 2 },
  aboutFeatureDesc: { fontSize: 12, color: "#9ca3af" },

  // Services
  servicesSection: { padding: "96px 0", background: "#f7f9f7" },
  categoryFilter: { display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginBottom: 40 },
  filterChip: { background: "white", border: "1.5px solid #e5e7eb", color: "#6b7280", padding: "8px 18px", borderRadius: 24, fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "all 0.2s" },
  filterChipActive: { background: "#5a875a", border: "1.5px solid #5a875a", color: "white" },
  servicesGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 },
  serviceCard: { background: "white", borderRadius: 20, overflow: "hidden", transition: "all 0.3s ease", position: "relative", display: "flex", flexDirection: "column" },
  badgePill: { position: "absolute", top: 16, right: 16, zIndex: 2, color: "white", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 20, letterSpacing: "0.05em" },
  cardImgWrap: { height: 200, overflow: "hidden" },
  cardImg: { width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" },
  cardBody: { padding: "20px 20px 24px", display: "flex", flexDirection: "column", flex: 1 },
  categoryTag: { fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 12, letterSpacing: "0.05em" },
  duration: { fontSize: 12, color: "#9ca3af" },
  cardTitle: { fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 700, color: "#1a1f1a", margin: "8px 0" },
  cardDesc: { fontSize: 13, color: "#6b7280", lineHeight: 1.6, marginBottom: 12, flex: 1 },
  featureList: { listStyle: "none", marginBottom: 16 },
  featureItem: { fontSize: 12, color: "#4b5563", padding: "3px 0", display: "flex", alignItems: "center" },
  cardFooter: { display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #f3f4f6", paddingTop: 16, marginTop: "auto" },
  priceUnit: { fontSize: 10, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em" },
  price: { fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 700, color: "#5a875a" },
  btnBook: { background: "#5a875a", color: "white", border: "none", cursor: "pointer", padding: "9px 18px", borderRadius: 20, fontSize: 13, fontWeight: 600, transition: "background 0.2s" },

  // How It Works
  howSection: { padding: "96px 0", background: "#2e452e" },
  stepsRow: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32, position: "relative" },
  stepCard: { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: 32, textAlign: "center", position: "relative" },
  stepNum: { position: "absolute", top: -16, left: 24, fontFamily: "'Cormorant Garamond', serif", fontSize: 64, fontWeight: 700, color: "rgba(168,195,168,0.15)", lineHeight: 1 },
  stepIcon: { fontSize: 40, marginBottom: 16 },
  stepTitle: { fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 700, color: "white", marginBottom: 8 },
  stepDesc: { fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7 },
  stepArrow: { position: "absolute", top: "50%", right: -24, transform: "translateY(-50%)", fontSize: 24, color: "rgba(168,195,168,0.4)", zIndex: 1 },

  // Gallery
  gallerySection: { padding: "96px 0", background: "#fefdf8" },
  galleryGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridAutoRows: 220, gap: 12 },
  galleryItem: { borderRadius: 14, overflow: "hidden", position: "relative" },
  galleryImg: { width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" },
  galleryLabel: { position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.55))", color: "white", padding: "24px 16px 12px", fontSize: 13, fontWeight: 500 },

  // Reviews
  reviewsSection: { padding: "96px 0", background: "#f7f9f7" },
  reviewsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 },
  reviewCard: { background: "white", borderRadius: 16, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.05)" },
  reviewComment: { fontSize: 14, color: "#4b5563", lineHeight: 1.7, margin: "12px 0 16px", fontStyle: "italic" },
  reviewFooter: { display: "flex", alignItems: "center", gap: 12, borderTop: "1px solid #f3f4f6", paddingTop: 16 },
  reviewAvatar: { width: 40, height: 40, borderRadius: "50%", background: "#5a875a", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, flexShrink: 0 },
  reviewName: { fontSize: 14, fontWeight: 600, color: "#1a1f1a" },
  reviewService: { fontSize: 11, color: "#9ca3af", marginTop: 2 },

  // Contact
  contactSection: { padding: "96px 0", background: "#fefdf8" },
  contactGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" },
  contactItems: { display: "flex", flexDirection: "column", gap: 20, margin: "32px 0" },
  contactItem: { display: "flex", gap: 16, alignItems: "flex-start" },
  contactIcon: { width: 44, height: 44, background: "#e8f5e9", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 },
  contactLabel: { fontSize: 11, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 },
  contactVal: { fontSize: 14, color: "#374151", lineHeight: 1.5 },
  whatsappBtn: { display: "inline-flex", alignItems: "center", gap: 8, background: "#25d366", color: "white", padding: "12px 24px", borderRadius: 28, fontSize: 14, fontWeight: 600, textDecoration: "none", transition: "all 0.2s" },
  mapWrap: { borderRadius: 16, overflow: "hidden", height: 440, boxShadow: "0 8px 32px rgba(0,0,0,0.1)" },

  // Footer
  footer: { background: "#111411" },
  footerTop: { padding: "64px 0" },
  footerGrid: { display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.5fr", gap: 48 },
  footerLogo: { fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 700, color: "white", marginBottom: 12 },
  footerTagline: { fontSize: 13, color: "#6b7280", lineHeight: 1.7, marginBottom: 20 },
  socialRow: { display: "flex", gap: 8 },
  socialBtn: { width: 36, height: 36, background: "rgba(255,255,255,0.07)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, textDecoration: "none", cursor: "pointer", transition: "background 0.2s" },
  footerHeading: { fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 16 },
  footerLink: { display: "block", background: "none", border: "none", cursor: "pointer", color: "#9ca3af", fontSize: 13, padding: "5px 0", textAlign: "left", textDecoration: "none", transition: "color 0.2s" },
  footerBottom: { borderTop: "1px solid rgba(255,255,255,0.06)", padding: "20px 0" },
  footerBottomInner: { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, color: "#4b5563" },
  footerAdminLink: { background: "none", border: "none", cursor: "pointer", color: "#6b7280", fontSize: 12 },

  // WhatsApp float
  whatsappFloat: { position: "fixed", bottom: 28, right: 28, zIndex: 99, width: 56, height: 56, background: "#25d366", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, boxShadow: "0 8px 24px rgba(37,211,102,0.45)", textDecoration: "none", transition: "transform 0.2s" },

  // Modals / Overlay
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, animation: "fadeIn 0.2s ease" },
  adminLoginBox: { background: "white", borderRadius: 20, padding: "40px 36px", width: "100%", maxWidth: 400, position: "relative" },
  adminPanel: { background: "white", borderRadius: 20, width: "100%", maxWidth: 900, maxHeight: "90vh", overflow: "hidden", display: "flex", flexDirection: "column", position: "relative" },
  adminHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "28px 28px 20px", borderBottom: "1px solid #f3f4f6" },
  adminTitle: { fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 700, color: "#1a1f1a" },
  adminSub: { fontSize: 13, color: "#9ca3af", marginTop: 4 },
  statsRow: { display: "flex", gap: 1, background: "#f9fafb", padding: "16px 28px", borderBottom: "1px solid #f3f4f6" },
  statCard: { flex: 1, textAlign: "center", padding: "8px 0" },
  statNum: { fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 700 },
  statLabel: { fontSize: 11, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em" },
  filterRow: { display: "flex", gap: 6, padding: "12px 28px", borderBottom: "1px solid #f3f4f6", flexWrap: "wrap" },
  filterBtn: { background: "none", border: "1px solid #e5e7eb", cursor: "pointer", padding: "6px 14px", borderRadius: 20, fontSize: 12, color: "#6b7280" },
  filterBtnActive: { background: "#5a875a", borderColor: "#5a875a", color: "white" },
  bookingsList: { overflowY: "auto", flex: 1, padding: "16px 28px", display: "flex", flexDirection: "column", gap: 12 },
  bookingCard: { border: "1px solid #f3f4f6", borderRadius: 12, padding: "16px 20px" },
  bookingTop: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 },
  bookingRef: { fontSize: 11, fontFamily: "monospace", color: "#5a875a", fontWeight: 700, marginBottom: 2 },
  bookingName: { fontSize: 15, fontWeight: 600, color: "#1a1f1a" },
  bookingMeta: { fontSize: 12, color: "#9ca3af" },
  statusBadge: { fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 12, textTransform: "capitalize" },
  bookingInfo: { display: "flex", gap: 16, flexWrap: "wrap", fontSize: 12, color: "#6b7280", margin: "8px 0" },
  bookingNotes: { fontSize: 12, color: "#9ca3af", fontStyle: "italic", marginBottom: 8 },
  bookingActions: { display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" },
  statusSelect: { border: "1px solid #e5e7eb", borderRadius: 8, padding: "6px 10px", fontSize: 12, color: "#374151", cursor: "pointer" },
  btnComplete: { background: "#e8f5e9", color: "#2e7d32", border: "none", cursor: "pointer", padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600 },
  btnDelete: { background: "#fef2f2", color: "#dc2626", border: "none", cursor: "pointer", padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600 },
  emptyState: { textAlign: "center", color: "#9ca3af", fontSize: 15, padding: "48px 0" },

  // Booking modal
  bookingModal: { background: "white", borderRadius: 20, width: "100%", maxWidth: 680, maxHeight: "92vh", overflow: "hidden", display: "flex", flexDirection: "column" },
  bookingModalHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "28px 28px 0", flexShrink: 0 },
  modalTitle: { fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 700, color: "#1a1f1a" },
  modalSub: { fontSize: 13, color: "#9ca3af", marginTop: 4 },
  bookingForm: { overflowY: "auto", flex: 1, padding: "20px 28px 28px", display: "flex", flexDirection: "column", gap: 20 },
  formSection: { background: "#f9fafb", borderRadius: 14, padding: "20px 20px 16px", display: "flex", flexDirection: "column", gap: 14 },
  formSectionTitle: { fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.1em" },
  formGrid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },
  label: { display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 6 },
  input: { width: "100%", border: "1.5px solid #e5e7eb", borderRadius: 10, padding: "10px 14px", fontSize: 14, color: "#1a1f1a", outline: "none", background: "white", transition: "border-color 0.2s" },
  inputError: { borderColor: "#ef4444" },
  select: { width: "100%", border: "1.5px solid #e5e7eb", borderRadius: 10, padding: "10px 14px", fontSize: 14, color: "#1a1f1a", outline: "none", background: "white", cursor: "pointer" },
  errorText: { display: "block", fontSize: 11, color: "#ef4444", marginTop: 4 },

  // Shared
  closeBtn: { background: "#f3f4f6", border: "none", cursor: "pointer", width: 32, height: 32, borderRadius: "50%", fontSize: 14, color: "#6b7280", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  btnPrimary: { background: "#5a875a", color: "white", border: "none", cursor: "pointer", padding: "12px 24px", borderRadius: 24, fontSize: 14, fontWeight: 600, width: "100%", transition: "background 0.2s" },
  refBox: { background: "#f7faf7", border: "1.5px solid #c8e6c9", borderRadius: 12, padding: "16px 24px", margin: "8px 0" },
};