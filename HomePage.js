import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const BLOOD_TYPES = ['A+', 'A−', 'B+', 'B−', 'AB+', 'AB−', 'O+', 'O−'];
const ORGANS_LIST = ['Heart', 'Kidneys', 'Liver', 'Lungs', 'Pancreas', 'Corneas', 'Skin', 'Bone Marrow'];
const URGENCY_LEVELS = ['Low', 'Medium', 'High', 'Critical'];

const initDonors = [
  { id: 'D-A4F2B1', name: 'Ravi Kumar', age: 34, blood: 'O+', organs: ['Heart', 'Kidneys'], status: 'Active', hospital: 'Apollo Hospitals', location: 'Hyderabad', phone: '9876543210', email: 'ravi@example.com' },
  { id: 'D-C7E3D2', name: 'Priya Menon', age: 28, blood: 'A+', organs: ['Liver', 'Corneas'], status: 'Pending', hospital: 'AIIMS Delhi', location: 'Delhi', phone: '9123456789', email: 'priya@example.com' },
  { id: 'D-B9F1A3', name: 'Suresh Nair', age: 45, blood: 'B+', organs: ['Lungs', 'Pancreas'], status: 'Active', hospital: 'Fortis Mumbai', location: 'Mumbai', phone: '9988776655', email: 'suresh@example.com' },
  { id: 'D-E2A5C4', name: 'Aisha Patel', age: 31, blood: 'AB+', organs: ['Kidneys', 'Skin'], status: 'Matched', hospital: 'Manipal Hospital', location: 'Bangalore', phone: '9011223344', email: 'aisha@example.com' },
  { id: 'D-F6D8B5', name: 'Vikram Singh', age: 39, blood: 'O−', organs: ['Heart', 'Liver'], status: 'Active', hospital: 'Max Healthcare', location: 'Delhi', phone: '9765432100', email: 'vikram@example.com' },
];

const initRecipients = [
  { id: 'R-X1A2B3', name: 'Ananya Joshi', age: 29, blood: 'O+', organNeeded: 'Kidney', urgency: 'High', hospital: 'Apollo Hyderabad', location: 'Hyderabad', phone: '9812345678', email: 'ananya@example.com', waitingSince: '2024-01-10', status: 'Waiting' },
  { id: 'R-Y4C5D6', name: 'Mohan Reddy', age: 52, blood: 'A+', organNeeded: 'Cornea', urgency: 'Medium', hospital: 'AIIMS Delhi', location: 'Delhi', phone: '9923456789', email: 'mohan@example.com', waitingSince: '2023-11-22', status: 'Matched' },
  { id: 'R-Z7E8F9', name: 'Fatima Khan', age: 44, blood: 'O−', organNeeded: 'Liver', urgency: 'Critical', hospital: 'Max Delhi', location: 'Delhi', phone: '9034567890', email: 'fatima@example.com', waitingSince: '2024-02-05', status: 'Waiting' },
  { id: 'R-W2G3H4', name: 'Rajesh Iyer', age: 37, blood: 'AB+', organNeeded: 'Skin', urgency: 'Low', hospital: 'Manipal Bangalore', location: 'Bangalore', phone: '9145678901', email: 'rajesh@example.com', waitingSince: '2024-03-01', status: 'Waiting' },
];

const initMatches = [
  { id: 'M-001', donor: 'Ravi Kumar', recipient: 'Ananya Joshi', organ: 'Kidney', compatibility: 96, status: 'Approved', urgency: 'High' },
  { id: 'M-002', donor: 'Priya Menon', recipient: 'Mohan Reddy', organ: 'Cornea', compatibility: 88, status: 'Pending Review', urgency: 'Medium' },
  { id: 'M-003', donor: 'Vikram Singh', recipient: 'Fatima Khan', organ: 'Liver', compatibility: 92, status: 'Scheduled', urgency: 'Critical' },
  { id: 'M-004', donor: 'Aisha Patel', recipient: 'Rajesh Iyer', organ: 'Skin', compatibility: 79, status: 'Under Review', urgency: 'Low' },
];

const initTransplants = [
  { id: 'T-2401', organ: 'Kidney', donor: 'Ravi Kumar', recipient: 'Ananya Joshi', hospital: 'Apollo Hyderabad', date: '2024-03-12', surgeon: 'Dr. Meera Bose', status: 'Completed' },
  { id: 'T-2402', organ: 'Heart', donor: 'Vikram Singh', recipient: 'Fatima Khan', hospital: 'Max Delhi', date: '2024-03-18', surgeon: 'Dr. Arjun Rao', status: 'Scheduled' },
  { id: 'T-2403', organ: 'Liver', donor: 'Suresh Nair', recipient: 'Deepak Jain', hospital: 'Fortis Mumbai', date: '2024-03-08', surgeon: 'Dr. Sunita Verma', status: 'Completed' },
];

const TAB_ICONS = { dashboard: '⬡', donors: '♥', recipients: '✦', matching: '⇌', transplants: '⊕', documents: '⊡' };

function genId(prefix) {
  return prefix + '-' + Math.random().toString(36).substr(2, 6).toUpperCase();
}

export default function HomePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [donors, setDonors] = useState(initDonors);
  const [recipients, setRecipients] = useState(initRecipients);
  const [matches, setMatches] = useState(initMatches);
  const [transplants] = useState(initTransplants);
  const [uploadModal, setUploadModal] = useState(false);
  const [notification, setNotification] = useState(null);

  const notify = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const addDonor = (donor) => {
    const newDonor = { ...donor, id: genId('D'), status: 'Pending' };
    setDonors(prev => [newDonor, ...prev]);
    notify('✓ New donor "' + donor.name + '" added successfully!');
  };

  const addRecipient = (recipient) => {
    const newRecipient = { ...recipient, id: genId('R'), status: 'Waiting' };
    setRecipients(prev => [newRecipient, ...prev]);
    notify('✓ New recipient "' + recipient.name + '" added successfully!');
  };

  const deleteDonor = (id) => {
    setDonors(prev => prev.filter(d => d.id !== id));
    notify('Donor removed from registry.');
  };

  const deleteRecipient = (id) => {
    setRecipients(prev => prev.filter(r => r.id !== id));
    notify('Recipient removed from registry.');
  };

  return (
    <div style={styles.app}>
      <Navbar />
      {notification && <div style={styles.notification}>{notification}</div>}

      <div style={styles.layout}>
        <aside style={styles.sidebar}>
          <div style={styles.sidebarSection}>
            <div style={styles.sidebarLabel}>Navigation</div>
            {[
              { key: 'dashboard', label: 'Dashboard' },
              { key: 'donors', label: 'Donor Registry' },
              { key: 'recipients', label: 'Recipients' },
              { key: 'matching', label: 'Donor Matching' },
              { key: 'transplants', label: 'Transplants' },
              { key: 'documents', label: 'Documents' },
            ].map(({ key, label }) => (
              <button key={key} onClick={() => setActiveTab(key)}
                style={{ ...styles.sidebarBtn, ...(activeTab === key ? styles.sidebarBtnActive : {}) }}>
                <span style={styles.sidebarIcon}>{TAB_ICONS[key]}</span>
                {label}
                {activeTab === key && <div style={styles.sidebarIndicator} />}
              </button>
            ))}
          </div>

          <div style={styles.sidebarSection}>
            <div style={styles.sidebarLabel}>My Profile</div>
            <div style={styles.profileCard}>
              <div style={styles.profileAvatar}>{user?.name?.[0]?.toUpperCase()}</div>
              <div style={styles.profileName}>{user?.name}</div>
              <div style={styles.profileId}>{user?.id}</div>
              <div style={styles.profileBadge}>Active Donor</div>
            </div>
          </div>

          <div style={styles.statsSidebar}>
            <div style={styles.sidebarStatRow}><span style={styles.sidebarStatLabel}>Total Donors</span><span style={styles.sidebarStatVal}>{donors.length}</span></div>
            <div style={styles.sidebarStatRow}><span style={styles.sidebarStatLabel}>Recipients</span><span style={styles.sidebarStatVal}>{recipients.length}</span></div>
            <div style={styles.sidebarStatRow}><span style={styles.sidebarStatLabel}>Active Matches</span><span style={styles.sidebarStatVal}>{matches.length}</span></div>
          </div>
        </aside>

        <main style={styles.main}>
          {activeTab === 'dashboard' && <DashboardTab donors={donors} recipients={recipients} matches={matches} notify={notify} setUploadModal={setUploadModal} setActiveTab={setActiveTab} />}
          {activeTab === 'donors' && <DonorsTab donors={donors} onAdd={addDonor} onDelete={deleteDonor} notify={notify} />}
          {activeTab === 'recipients' && <RecipientsTab recipients={recipients} onAdd={addRecipient} onDelete={deleteRecipient} notify={notify} />}
          {activeTab === 'matching' && <MatchingTab matches={matches} donors={donors} recipients={recipients} notify={notify} />}
          {activeTab === 'transplants' && <TransplantsTab transplants={transplants} />}
          {activeTab === 'documents' && <DocumentsTab notify={notify} />}
        </main>
      </div>

      {uploadModal && (
        <UploadModal onClose={() => setUploadModal(false)}
          onUpload={() => { setUploadModal(false); notify('✓ Consent form uploaded successfully'); }} />
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   DASHBOARD TAB
══════════════════════════════════════════════════════ */
function DashboardTab({ donors, recipients, matches, notify, setUploadModal, setActiveTab }) {
  const waiting = recipients.filter(r => r.status === 'Waiting').length;
  const critical = recipients.filter(r => r.urgency === 'Critical').length;

  return (
    <div style={styles.tabContent}>
      <div style={styles.pageHeader}>
        <div>
          <h1 style={styles.pageTitle}>Dashboard Overview</h1>
          <p style={styles.pageSubtitle}>Real-time insights across the LifeLink network</p>
        </div>
        <button onClick={() => setUploadModal(true)} style={styles.primaryBtn}>+ Upload Consent Form</button>
      </div>

      <div style={styles.statsGrid}>
        {[
          { label: 'Registered Donors', value: donors.length.toLocaleString(), delta: 'Click Donor Registry to manage', color: '#0A3D3A', bg: 'rgba(10,61,58,0.05)', tab: 'donors' },
          { label: 'Recipients Waiting', value: waiting, delta: `${critical} critical urgency`, color: '#C8963E', bg: 'rgba(200,150,62,0.05)', tab: 'recipients' },
          { label: 'Active Matches', value: matches.length, delta: 'Click to manage', color: '#1A6B65', bg: 'rgba(26,107,101,0.05)', tab: 'matching' },
          { label: 'Transplants Done', value: '3,291', delta: '98.2% success rate', color: '#2AA89A', bg: 'rgba(42,168,154,0.05)', tab: 'transplants' },
        ].map(({ label, value, delta, color, bg, tab }) => (
          <div key={label} onClick={() => setActiveTab(tab)}
            style={{ ...styles.statCard, background: bg, borderColor: `${color}22`, cursor: 'pointer' }}>
            <div style={styles.statLabel}>{label}</div>
            <div style={{ ...styles.statValue, color }}>{value}</div>
            <div style={styles.statDelta}>{delta}</div>
          </div>
        ))}
      </div>

      <div style={styles.dashGrid}>
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>Recent Donors</h3>
            <button onClick={() => setActiveTab('donors')} style={styles.cardLinkBtn}>View All →</button>
          </div>
          {donors.slice(0, 4).map((d, i) => (
            <div key={d.id} style={styles.activityRow}>
              <div style={{ ...styles.activityIcon, background: 'rgba(10,61,58,0.07)', color: '#0A3D3A' }}>♥</div>
              <div style={styles.activityInfo}>
                <div style={styles.activityEvent}>{d.name}</div>
                <div style={styles.activityDetail}>{d.blood} · {d.organs.join(', ')} · {d.hospital}</div>
              </div>
              <StatusBadge status={d.status} />
            </div>
          ))}
        </div>

        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>Critical Recipients</h3>
            <button onClick={() => setActiveTab('recipients')} style={styles.cardLinkBtn}>View All →</button>
          </div>
          {recipients.filter(r => r.urgency === 'Critical' || r.urgency === 'High').slice(0, 4).map((r, i) => (
            <div key={r.id} style={styles.activityRow}>
              <div style={{ ...styles.activityIcon, background: 'rgba(200,150,62,0.1)', color: '#A67530' }}>✦</div>
              <div style={styles.activityInfo}>
                <div style={styles.activityEvent}>{r.name}</div>
                <div style={styles.activityDetail}>{r.organNeeded} needed · {r.blood} · {r.hospital}</div>
              </div>
              <span style={{ ...styles.urgencyBadge, ...urgencyStyle(r.urgency) }}>{r.urgency}</span>
            </div>
          ))}
          {recipients.filter(r => r.urgency === 'Critical' || r.urgency === 'High').length === 0 && (
            <div style={{ padding: '20px', textAlign: 'center', color: '#9CA3AF', fontSize: '14px' }}>No critical recipients</div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   DONORS TAB — Full form with keyboard input
══════════════════════════════════════════════════════ */
function DonorsTab({ donors, onAdd, onDelete, notify }) {
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [viewDonor, setViewDonor] = useState(null);
  const [form, setForm] = useState({
    name: '', age: '', blood: '', organs: [], hospital: '', location: '', phone: '', email: '',
  });
  const [errors, setErrors] = useState({});

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const toggleOrgan = (o) => setForm(f => ({ ...f, organs: f.organs.includes(o) ? f.organs.filter(x => x !== o) : [...f.organs, o] }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!form.age || isNaN(form.age) || form.age < 1 || form.age > 120) e.age = 'Valid age required (1–120)';
    if (!form.blood) e.blood = 'Blood type is required';
    if (form.organs.length === 0) e.organs = 'Select at least one organ';
    if (!form.hospital.trim()) e.hospital = 'Hospital name is required';
    if (!form.location.trim()) e.location = 'Location is required';
    if (form.phone && !/^\d{10}$/.test(form.phone.replace(/\s/g, ''))) e.phone = 'Enter valid 10-digit phone';
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter valid email';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onAdd({ ...form, age: parseInt(form.age) });
    setForm({ name: '', age: '', blood: '', organs: [], hospital: '', location: '', phone: '', email: '' });
    setErrors({});
    setShowForm(false);
  };

  const filtered = donors.filter(d =>
    (filter === 'All' || d.status === filter) &&
    (d.name.toLowerCase().includes(search.toLowerCase()) || d.blood.includes(search) || d.hospital.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={styles.tabContent}>
      <div style={styles.pageHeader}>
        <div>
          <h1 style={styles.pageTitle}>Donor Registry</h1>
          <p style={styles.pageSubtitle}>{donors.length} registered donors</p>
        </div>
        <button onClick={() => setShowForm(v => !v)} style={showForm ? styles.secondaryBtn : styles.primaryBtn}>
          {showForm ? '✕ Cancel' : '+ Add New Donor'}
        </button>
      </div>

      {/* ADD DONOR FORM */}
      {showForm && (
        <div style={styles.formPanel}>
          <h3 style={styles.formPanelTitle}>Register New Donor</h3>
          <p style={styles.formPanelSub}>Fill in the donor's details below. All fields marked * are required.</p>

          <div style={styles.formGrid2}>
            <FormField label="Full Name *" error={errors.name}>
              <input style={fInp(errors.name)} value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Arjun Sharma" />
            </FormField>
            <FormField label="Age *" error={errors.age}>
              <input style={fInp(errors.age)} type="number" min="1" max="120" value={form.age} onChange={e => set('age', e.target.value)} placeholder="e.g. 32" />
            </FormField>
          </div>

          <div style={styles.formGrid2}>
            <FormField label="Blood Type *" error={errors.blood}>
              <select style={fInp(errors.blood)} value={form.blood} onChange={e => set('blood', e.target.value)}>
                <option value="">Select blood type</option>
                {BLOOD_TYPES.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </FormField>
            <FormField label="Phone Number" error={errors.phone}>
              <input style={fInp(errors.phone)} type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="e.g. 9876543210" />
            </FormField>
          </div>

          <div style={styles.formGrid2}>
            <FormField label="Hospital / Institution *" error={errors.hospital}>
              <input style={fInp(errors.hospital)} value={form.hospital} onChange={e => set('hospital', e.target.value)} placeholder="e.g. Apollo Hospitals" />
            </FormField>
            <FormField label="City / Location *" error={errors.location}>
              <input style={fInp(errors.location)} value={form.location} onChange={e => set('location', e.target.value)} placeholder="e.g. Hyderabad" />
            </FormField>
          </div>

          <FormField label="Email Address" error={errors.email}>
            <input style={fInp(errors.email)} type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="e.g. donor@email.com" />
          </FormField>

          <FormField label="Organs Willing to Donate *" error={errors.organs}>
            <div style={styles.organGrid}>
              {ORGANS_LIST.map(o => (
                <button key={o} type="button" onClick={() => toggleOrgan(o)}
                  style={{ ...styles.organChip, ...(form.organs.includes(o) ? styles.organChipActive : {}) }}>
                  {form.organs.includes(o) ? '✓ ' : ''}{o}
                </button>
              ))}
            </div>
          </FormField>

          <div style={styles.formActions}>
            <button onClick={() => { setShowForm(false); setErrors({}); }} style={styles.cancelBtn}>Cancel</button>
            <button onClick={handleSubmit} style={styles.submitBtn}>Register Donor</button>
          </div>
        </div>
      )}

      {/* SEARCH & FILTER */}
      <div style={styles.filterRow}>
        <input placeholder="🔍  Search by name, blood type, or hospital..." value={search}
          onChange={e => setSearch(e.target.value)} style={styles.searchInput} />
        <div style={styles.filterBtns}>
          {['All', 'Active', 'Pending', 'Matched'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{ ...styles.filterBtn, ...(filter === f ? styles.filterBtnActive : {}) }}>{f}</button>
          ))}
        </div>
      </div>

      {/* TABLE */}
      <div style={styles.tableCard}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHead}>
              {['Donor ID', 'Name', 'Age', 'Blood', 'Organs', 'Hospital', 'Location', 'Status', 'Actions'].map(h => (
                <th key={h} style={styles.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={9} style={{ ...styles.td, textAlign: 'center', padding: '32px', color: '#9CA3AF' }}>No donors found</td></tr>
            )}
            {filtered.map((d, i) => (
              <tr key={d.id} style={{ ...styles.tr, background: i % 2 === 0 ? '#fff' : 'rgba(10,61,58,0.012)' }}>
                <td style={styles.td}><span style={styles.mono}>{d.id}</span></td>
                <td style={styles.td}><span style={styles.tdName}>{d.name}</span></td>
                <td style={styles.td}>{d.age}</td>
                <td style={styles.td}><span style={styles.bloodBadge}>{d.blood}</span></td>
                <td style={styles.td}>
                  <div style={styles.organTags}>{d.organs.map(o => <span key={o} style={styles.organTag}>{o}</span>)}</div>
                </td>
                <td style={styles.td}><span style={styles.tdGray}>{d.hospital}</span></td>
                <td style={styles.td}><span style={styles.tdGray}>{d.location}</span></td>
                <td style={styles.td}><StatusBadge status={d.status} /></td>
                <td style={styles.td}>
                  <button onClick={() => setViewDonor(d)} style={styles.actionBtn}>View</button>
                  <button onClick={() => { if (window.confirm('Remove this donor?')) onDelete(d.id); }} style={styles.deleteBtn}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* VIEW MODAL */}
      {viewDonor && (
        <DetailModal title="Donor Details" onClose={() => setViewDonor(null)}>
          <DetailRow label="Donor ID" value={viewDonor.id} mono />
          <DetailRow label="Full Name" value={viewDonor.name} />
          <DetailRow label="Age" value={viewDonor.age} />
          <DetailRow label="Blood Type" value={viewDonor.blood} />
          <DetailRow label="Organs" value={viewDonor.organs.join(', ')} />
          <DetailRow label="Hospital" value={viewDonor.hospital} />
          <DetailRow label="Location" value={viewDonor.location} />
          {viewDonor.phone && <DetailRow label="Phone" value={viewDonor.phone} />}
          {viewDonor.email && <DetailRow label="Email" value={viewDonor.email} />}
          <DetailRow label="Status" value={<StatusBadge status={viewDonor.status} />} />
        </DetailModal>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   RECIPIENTS TAB — Full form with keyboard input
══════════════════════════════════════════════════════ */
function RecipientsTab({ recipients, onAdd, onDelete, notify }) {
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [viewRecipient, setViewRecipient] = useState(null);
  const [form, setForm] = useState({
    name: '', age: '', blood: '', organNeeded: '', urgency: '',
    hospital: '', location: '', phone: '', email: '', waitingSince: '',
  });
  const [errors, setErrors] = useState({});

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!form.age || isNaN(form.age) || form.age < 1 || form.age > 120) e.age = 'Valid age required';
    if (!form.blood) e.blood = 'Blood type is required';
    if (!form.organNeeded) e.organNeeded = 'Required organ is required';
    if (!form.urgency) e.urgency = 'Urgency level is required';
    if (!form.hospital.trim()) e.hospital = 'Hospital name is required';
    if (!form.location.trim()) e.location = 'Location is required';
    if (form.phone && !/^\d{10}$/.test(form.phone.replace(/\s/g, ''))) e.phone = 'Enter valid 10-digit phone';
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter valid email';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onAdd({ ...form, age: parseInt(form.age), waitingSince: form.waitingSince || new Date().toISOString().split('T')[0] });
    setForm({ name: '', age: '', blood: '', organNeeded: '', urgency: '', hospital: '', location: '', phone: '', email: '', waitingSince: '' });
    setErrors({});
    setShowForm(false);
  };

  const filtered = recipients.filter(r =>
    (filter === 'All' || r.status === filter || r.urgency === filter) &&
    (r.name.toLowerCase().includes(search.toLowerCase()) || r.blood.includes(search) || r.organNeeded.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={styles.tabContent}>
      <div style={styles.pageHeader}>
        <div>
          <h1 style={styles.pageTitle}>Recipient Registry</h1>
          <p style={styles.pageSubtitle}>{recipients.length} recipients — {recipients.filter(r => r.status === 'Waiting').length} awaiting match</p>
        </div>
        <button onClick={() => setShowForm(v => !v)} style={showForm ? styles.secondaryBtn : styles.primaryBtn}>
          {showForm ? '✕ Cancel' : '+ Add New Recipient'}
        </button>
      </div>

      {/* ADD RECIPIENT FORM */}
      {showForm && (
        <div style={{ ...styles.formPanel, borderColor: 'rgba(200,150,62,0.3)' }}>
          <h3 style={styles.formPanelTitle}>Register New Recipient</h3>
          <p style={styles.formPanelSub}>Enter the recipient's medical and contact information below.</p>

          <div style={styles.formGrid2}>
            <FormField label="Full Name *" error={errors.name}>
              <input style={fInp(errors.name)} value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Deepa Krishnan" />
            </FormField>
            <FormField label="Age *" error={errors.age}>
              <input style={fInp(errors.age)} type="number" min="1" max="120" value={form.age} onChange={e => set('age', e.target.value)} placeholder="e.g. 45" />
            </FormField>
          </div>

          <div style={styles.formGrid2}>
            <FormField label="Blood Type *" error={errors.blood}>
              <select style={fInp(errors.blood)} value={form.blood} onChange={e => set('blood', e.target.value)}>
                <option value="">Select blood type</option>
                {BLOOD_TYPES.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </FormField>
            <FormField label="Organ Needed *" error={errors.organNeeded}>
              <select style={fInp(errors.organNeeded)} value={form.organNeeded} onChange={e => set('organNeeded', e.target.value)}>
                <option value="">Select organ</option>
                {ORGANS_LIST.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </FormField>
          </div>

          <div style={styles.formGrid2}>
            <FormField label="Urgency Level *" error={errors.urgency}>
              <select style={fInp(errors.urgency)} value={form.urgency} onChange={e => set('urgency', e.target.value)}>
                <option value="">Select urgency</option>
                {URGENCY_LEVELS.map(u => <option key={u} value={u}>{u}</option>)}
              </select>
            </FormField>
            <FormField label="Waiting Since" error={errors.waitingSince}>
              <input style={fInp(errors.waitingSince)} type="date" value={form.waitingSince} onChange={e => set('waitingSince', e.target.value)} />
            </FormField>
          </div>

          <div style={styles.formGrid2}>
            <FormField label="Hospital / Institution *" error={errors.hospital}>
              <input style={fInp(errors.hospital)} value={form.hospital} onChange={e => set('hospital', e.target.value)} placeholder="e.g. AIIMS Hyderabad" />
            </FormField>
            <FormField label="City / Location *" error={errors.location}>
              <input style={fInp(errors.location)} value={form.location} onChange={e => set('location', e.target.value)} placeholder="e.g. Hyderabad" />
            </FormField>
          </div>

          <div style={styles.formGrid2}>
            <FormField label="Phone Number" error={errors.phone}>
              <input style={fInp(errors.phone)} type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="e.g. 9876543210" />
            </FormField>
            <FormField label="Email Address" error={errors.email}>
              <input style={fInp(errors.email)} type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="e.g. patient@email.com" />
            </FormField>
          </div>

          <div style={styles.formActions}>
            <button onClick={() => { setShowForm(false); setErrors({}); }} style={styles.cancelBtn}>Cancel</button>
            <button onClick={handleSubmit} style={{ ...styles.submitBtn, background: 'linear-gradient(135deg, #A67530, #C8963E)' }}>Register Recipient</button>
          </div>
        </div>
      )}

      {/* SEARCH & FILTER */}
      <div style={styles.filterRow}>
        <input placeholder="🔍  Search by name, blood type, or organ needed..." value={search}
          onChange={e => setSearch(e.target.value)} style={styles.searchInput} />
        <div style={styles.filterBtns}>
          {['All', 'Waiting', 'Matched', 'Critical', 'High'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{ ...styles.filterBtn, ...(filter === f ? styles.filterBtnActive : {}) }}>{f}</button>
          ))}
        </div>
      </div>

      {/* TABLE */}
      <div style={styles.tableCard}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHead}>
              {['Recipient ID', 'Name', 'Age', 'Blood', 'Organ Needed', 'Urgency', 'Hospital', 'Waiting Since', 'Status', 'Actions'].map(h => (
                <th key={h} style={styles.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={10} style={{ ...styles.td, textAlign: 'center', padding: '32px', color: '#9CA3AF' }}>No recipients found</td></tr>
            )}
            {filtered.map((r, i) => (
              <tr key={r.id} style={{ ...styles.tr, background: i % 2 === 0 ? '#fff' : 'rgba(10,61,58,0.012)' }}>
                <td style={styles.td}><span style={styles.mono}>{r.id}</span></td>
                <td style={styles.td}><span style={styles.tdName}>{r.name}</span></td>
                <td style={styles.td}>{r.age}</td>
                <td style={styles.td}><span style={styles.bloodBadge}>{r.blood}</span></td>
                <td style={styles.td}><span style={styles.organTag}>{r.organNeeded}</span></td>
                <td style={styles.td}><span style={{ ...styles.urgencyBadge, ...urgencyStyle(r.urgency), padding: '4px 10px', borderRadius: '100px', fontSize: '11px', fontWeight: 500 }}>{r.urgency}</span></td>
                <td style={styles.td}><span style={styles.tdGray}>{r.hospital}</span></td>
                <td style={styles.td}><span style={styles.tdGray}>{r.waitingSince}</span></td>
                <td style={styles.td}><StatusBadge status={r.status} /></td>
                <td style={styles.td}>
                  <button onClick={() => setViewRecipient(r)} style={styles.actionBtn}>View</button>
                  <button onClick={() => { if (window.confirm('Remove this recipient?')) onDelete(r.id); }} style={styles.deleteBtn}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* VIEW MODAL */}
      {viewRecipient && (
        <DetailModal title="Recipient Details" onClose={() => setViewRecipient(null)}>
          <DetailRow label="Recipient ID" value={viewRecipient.id} mono />
          <DetailRow label="Full Name" value={viewRecipient.name} />
          <DetailRow label="Age" value={viewRecipient.age} />
          <DetailRow label="Blood Type" value={viewRecipient.blood} />
          <DetailRow label="Organ Needed" value={viewRecipient.organNeeded} />
          <DetailRow label="Urgency" value={<span style={{ ...styles.urgencyBadge, ...urgencyStyle(viewRecipient.urgency), padding: '4px 10px', borderRadius: '100px', fontSize: '12px' }}>{viewRecipient.urgency}</span>} />
          <DetailRow label="Hospital" value={viewRecipient.hospital} />
          <DetailRow label="Location" value={viewRecipient.location} />
          {viewRecipient.phone && <DetailRow label="Phone" value={viewRecipient.phone} />}
          {viewRecipient.email && <DetailRow label="Email" value={viewRecipient.email} />}
          <DetailRow label="Waiting Since" value={viewRecipient.waitingSince} />
          <DetailRow label="Status" value={<StatusBadge status={viewRecipient.status} />} />
        </DetailModal>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   MATCHING TAB
══════════════════════════════════════════════════════ */
function MatchingTab({ matches, donors, recipients, notify }) {
  const [localMatches, setLocalMatches] = useState(matches);

  const updateStatus = (id, status) => {
    setLocalMatches(prev => prev.map(m => m.id === id ? { ...m, status } : m));
    notify(`✓ Match ${id} status updated to "${status}"`);
  };

  return (
    <div style={styles.tabContent}>
      <div style={styles.pageHeader}>
        <div>
          <h1 style={styles.pageTitle}>Donor–Recipient Matching</h1>
          <p style={styles.pageSubtitle}>AI-assisted compatibility matching engine · {localMatches.length} active matches</p>
        </div>
        <button onClick={() => notify('Running compatibility analysis...')} style={styles.primaryBtn}>Run Match Analysis</button>
      </div>

      <div style={styles.matchesGrid}>
        {localMatches.map(m => (
          <div key={m.id} style={styles.matchCard}>
            <div style={styles.matchHeader}>
              <span style={styles.matchId}>{m.id}</span>
              <StatusBadge status={m.status} />
            </div>
            <div style={styles.matchOrgan}>{m.organ}</div>
            <div style={styles.matchParties}>
              <div style={styles.matchParty}>
                <div style={styles.partyLabel}>Donor</div>
                <div style={styles.partyName}>{m.donor}</div>
              </div>
              <div style={styles.matchArrow}>⇌</div>
              <div style={styles.matchParty}>
                <div style={styles.partyLabel}>Recipient</div>
                <div style={styles.partyName}>{m.recipient}</div>
              </div>
            </div>
            <div style={styles.compatRow}>
              <div style={styles.compatLabel}>Compatibility Score</div>
              <div style={styles.compatScore}>{m.compatibility}%</div>
            </div>
            <div style={styles.compatBar}>
              <div style={{ ...styles.compatFill, width: `${m.compatibility}%`, background: m.compatibility >= 90 ? '#1A6B65' : m.compatibility >= 80 ? '#C8963E' : '#718096' }} />
            </div>
            <div style={styles.urgencyRow}>
              <span style={{ ...styles.urgencyBadge, ...urgencyStyle(m.urgency) }}>⚡ {m.urgency} Urgency</span>
            </div>
            <div style={styles.matchActions}>
              <button onClick={() => updateStatus(m.id, 'Approved')} style={styles.approveBtn}>Approve</button>
              <button onClick={() => updateStatus(m.id, 'Scheduled')} style={styles.reviewBtn}>Schedule</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   TRANSPLANTS TAB
══════════════════════════════════════════════════════ */
function TransplantsTab({ transplants }) {
  return (
    <div style={styles.tabContent}>
      <div style={styles.pageHeader}>
        <div>
          <h1 style={styles.pageTitle}>Transplant Workflows</h1>
          <p style={styles.pageSubtitle}>Track and coordinate all transplant procedures</p>
        </div>
      </div>

      <div style={styles.transplantList}>
        {transplants.map(t => (
          <div key={t.id} style={styles.transplantCard}>
            <div style={styles.transplantLeft}>
              <div style={styles.transplantOrganBadge}>{t.organ}</div>
              <div style={styles.transplantId}>{t.id}</div>
            </div>
            <div style={styles.transplantCenter}>
              <div style={styles.transplantRoute}>{t.donor} → {t.recipient}</div>
              <div style={styles.transplantMeta}>{t.hospital} · {t.surgeon}</div>
            </div>
            <div style={styles.transplantRight}>
              <StatusBadge status={t.status} />
              <div style={styles.transplantDate}>{t.date}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.card}>
        <div style={styles.cardHeader}><h3 style={styles.cardTitle}>Workflow Stages</h3></div>
        <div style={styles.timeline}>
          {[
            { stage: 'Donor Registration', desc: 'Organ donor enrolls and provides consent', complete: true },
            { stage: 'Medical Evaluation', desc: 'Health screening and organ viability assessment', complete: true },
            { stage: 'Recipient Matching', desc: 'AI compatibility analysis and match proposal', complete: true },
            { stage: 'Approval Process', desc: 'Medical board review and ethics clearance', complete: false },
            { stage: 'Surgery Coordination', desc: 'Operating theatre booking and team assembly', complete: false },
            { stage: 'Post-Operative Care', desc: 'Recovery monitoring and follow-up protocols', complete: false },
          ].map((item, i) => (
            <div key={i} style={styles.timelineRow}>
              <div style={{ ...styles.timelineDot, background: item.complete ? '#1A6B65' : 'rgba(10,61,58,0.1)', border: item.complete ? 'none' : '2px solid rgba(10,61,58,0.2)' }}>
                {item.complete ? '✓' : ''}
              </div>
              <div style={styles.timelineContent}>
                <div style={{ ...styles.timelineStage, color: item.complete ? '#0A3D3A' : '#718096' }}>{item.stage}</div>
                <div style={styles.timelineDesc}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   DOCUMENTS TAB
══════════════════════════════════════════════════════ */
function DocumentsTab({ notify }) {
  const docs = [
    { name: 'Consent Form — Ravi Kumar', type: 'PDF', size: '142 KB', date: '2024-03-01', status: 'Verified' },
    { name: 'Medical History — Priya Menon', type: 'PDF', size: '384 KB', date: '2024-02-28', status: 'Verified' },
    { name: 'Transplant Authorization — T-2401', type: 'PDF', size: '218 KB', date: '2024-03-10', status: 'Pending' },
    { name: 'Blood Test Report — Suresh Nair', type: 'PDF', size: '96 KB', date: '2024-03-05', status: 'Verified' },
    { name: 'Ethics Board Clearance — T-2402', type: 'PDF', size: '176 KB', date: '2024-03-12', status: 'Under Review' },
  ];

  return (
    <div style={styles.tabContent}>
      <div style={styles.pageHeader}>
        <div>
          <h1 style={styles.pageTitle}>Document Management</h1>
          <p style={styles.pageSubtitle}>Consent forms, medical records, and authorizations</p>
        </div>
        <button onClick={() => notify('✓ Upload dialog opened')} style={styles.primaryBtn}>+ Upload Document</button>
      </div>

      <div style={styles.uploadZone} onClick={() => notify('✓ File picker opened')}>
        <div style={styles.uploadIcon}>↑</div>
        <div style={styles.uploadText}>Drop files here or click to upload</div>
        <div style={styles.uploadSub}>Supports PDF, DOCX, PNG · Max 10MB per file</div>
      </div>

      <div style={styles.tableCard}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHead}>
              {['Document Name', 'Type', 'Size', 'Upload Date', 'Status', 'Actions'].map(h => (
                <th key={h} style={styles.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {docs.map((d, i) => (
              <tr key={i} style={{ ...styles.tr, background: i % 2 === 0 ? '#fff' : 'rgba(10,61,58,0.015)' }}>
                <td style={styles.td}><span style={styles.tdName}>⊡ {d.name}</span></td>
                <td style={styles.td}><span style={styles.mono}>{d.type}</span></td>
                <td style={styles.td}>{d.size}</td>
                <td style={styles.td}>{d.date}</td>
                <td style={styles.td}><StatusBadge status={d.status} /></td>
                <td style={styles.td}>
                  <button onClick={() => notify(`Downloading ${d.name}...`)} style={styles.actionBtn}>Download</button>
                  <button onClick={() => notify(`Viewing ${d.name}...`)} style={styles.actionBtnSecondary}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   REUSABLE COMPONENTS
══════════════════════════════════════════════════════ */
function FormField({ label, error, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      <label style={{ fontSize: '12px', fontWeight: 600, color: '#4A5568', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{label}</label>
      {children}
      {error && <span style={{ fontSize: '11px', color: '#DC2626', marginTop: '2px' }}>⚠ {error}</span>}
    </div>
  );
}

function DetailModal({ title, onClose, children }) {
  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modal} onClick={e => e.stopPropagation()}>
        <div style={styles.modalHeader}>
          <h3 style={styles.modalTitle}>{title}</h3>
          <button onClick={onClose} style={styles.modalClose}>✕</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>{children}</div>
      </div>
    </div>
  );
}

function DetailRow({ label, value, mono }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid rgba(10,61,58,0.06)' }}>
      <span style={{ fontSize: '12px', color: '#718096', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
      <span style={{ fontSize: '14px', color: '#1C1C1E', fontWeight: 500, fontFamily: mono ? "'DM Mono', monospace" : 'inherit' }}>{value}</span>
    </div>
  );
}

function UploadModal({ onClose, onUpload }) {
  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modal} onClick={e => e.stopPropagation()}>
        <div style={styles.modalHeader}>
          <h3 style={styles.modalTitle}>Upload Consent Form</h3>
          <button onClick={onClose} style={styles.modalClose}>✕</button>
        </div>
        <div style={styles.modalUploadZone}>
          <div style={styles.modalUploadIcon}>⊡</div>
          <div style={styles.modalUploadText}>Select or drag consent form</div>
          <div style={styles.modalUploadSub}>PDF format preferred · Max 10MB</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
          <input style={{ border: '1.5px solid rgba(10,61,58,0.15)', borderRadius: '10px', padding: '10px 14px', fontSize: '14px', outline: 'none', fontFamily: "'DM Sans', sans-serif" }} placeholder="Donor name" />
          <input style={{ border: '1.5px solid rgba(10,61,58,0.15)', borderRadius: '10px', padding: '10px 14px', fontSize: '14px', outline: 'none', fontFamily: "'DM Sans', sans-serif" }} placeholder="Donor ID (e.g. D-A4F2B1)" />
        </div>
        <button onClick={onUpload} style={{ ...styles.primaryBtn, width: '100%', marginTop: '16px', textAlign: 'center', display: 'block' }}>Upload Document</button>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const colors = {
    Active: { bg: 'rgba(26,107,101,0.1)', color: '#1A6B65' },
    Pending: { bg: 'rgba(200,150,62,0.12)', color: '#A67530' },
    Matched: { bg: 'rgba(10,61,58,0.08)', color: '#0A3D3A' },
    Completed: { bg: 'rgba(26,107,101,0.1)', color: '#1A6B65' },
    Scheduled: { bg: 'rgba(42,168,154,0.1)', color: '#1A8A7E' },
    Approved: { bg: 'rgba(26,107,101,0.1)', color: '#1A6B65' },
    'Pending Review': { bg: 'rgba(200,150,62,0.12)', color: '#A67530' },
    'Under Review': { bg: 'rgba(113,128,150,0.1)', color: '#4A5568' },
    Verified: { bg: 'rgba(26,107,101,0.1)', color: '#1A6B65' },
    Waiting: { bg: 'rgba(200,150,62,0.1)', color: '#A67530' },
  };
  const c = colors[status] || { bg: 'rgba(10,61,58,0.06)', color: '#718096' };
  return (
    <span style={{ padding: '4px 10px', borderRadius: '100px', fontSize: '11px', fontWeight: 500, background: c.bg, color: c.color, whiteSpace: 'nowrap' }}>
      {status}
    </span>
  );
}

function urgencyStyle(u) {
  const map = {
    Critical: { background: 'rgba(220,38,38,0.08)', color: '#DC2626' },
    High: { background: 'rgba(200,150,62,0.1)', color: '#A67530' },
    Medium: { background: 'rgba(42,168,154,0.1)', color: '#1A8A7E' },
    Low: { background: 'rgba(113,128,150,0.1)', color: '#718096' },
  };
  return map[u] || {};
}

function fInp(err) {
  return {
    padding: '10px 14px', borderRadius: '9px', fontSize: '14px',
    border: `1.5px solid ${err ? 'rgba(220,38,38,0.5)' : 'rgba(10,61,58,0.15)'}`,
    background: err ? 'rgba(220,38,38,0.02)' : '#fff', color: '#1C1C1E',
    outline: 'none', fontFamily: "'DM Sans', sans-serif", width: '100%', transition: 'border-color 0.2s',
  };
}

/* ══════════════════════════════════════════════════════
   STYLES
══════════════════════════════════════════════════════ */
const styles = {
  app: { minHeight: '100vh', background: '#F5F0E8', fontFamily: "'DM Sans', sans-serif" },
  notification: {
    position: 'fixed', top: '84px', right: '24px', zIndex: 999,
    padding: '12px 20px', borderRadius: '10px', background: '#0A3D3A', color: '#fff',
    fontSize: '14px', boxShadow: '0 8px 24px rgba(10,61,58,0.25)',
  },
  layout: { display: 'flex', minHeight: 'calc(100vh - 72px)' },
  sidebar: {
    width: '240px', background: '#fff', borderRight: '1px solid rgba(10,61,58,0.08)',
    padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '8px', flexShrink: 0,
  },
  sidebarSection: { marginBottom: '8px' },
  sidebarLabel: { fontSize: '10px', color: '#9CA3AF', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0 8px', marginBottom: '6px', fontFamily: "'DM Mono', monospace" },
  sidebarBtn: {
    display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
    padding: '10px 12px', borderRadius: '10px', border: 'none', background: 'transparent',
    color: '#4A5568', fontSize: '14px', cursor: 'pointer', position: 'relative',
    fontFamily: "'DM Sans', sans-serif", textAlign: 'left', transition: 'all 0.15s',
  },
  sidebarBtnActive: { background: 'rgba(10,61,58,0.07)', color: '#0A3D3A', fontWeight: 500 },
  sidebarIcon: { fontSize: '14px', width: '16px', textAlign: 'center' },
  sidebarIndicator: { position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', width: '3px', height: '20px', borderRadius: '2px', background: '#0A3D3A' },
  profileCard: { padding: '16px', borderRadius: '12px', background: 'rgba(10,61,58,0.04)', border: '1px solid rgba(10,61,58,0.08)', textAlign: 'center', marginTop: '8px' },
  profileAvatar: { width: '44px', height: '44px', borderRadius: '50%', margin: '0 auto 8px', background: 'linear-gradient(135deg, #0A3D3A, #2AA89A)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 600 },
  profileName: { fontSize: '14px', fontWeight: 500, color: '#1C1C1E', marginBottom: '2px' },
  profileId: { fontSize: '11px', color: '#718096', fontFamily: "'DM Mono', monospace", marginBottom: '8px' },
  profileBadge: { display: 'inline-block', padding: '3px 10px', borderRadius: '100px', background: 'rgba(26,107,101,0.1)', color: '#1A6B65', fontSize: '11px', fontWeight: 500 },
  statsSidebar: { marginTop: '8px', padding: '12px', borderRadius: '10px', background: 'rgba(10,61,58,0.03)', border: '1px solid rgba(10,61,58,0.07)' },
  sidebarStatRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0', borderBottom: '1px solid rgba(10,61,58,0.05)' },
  sidebarStatLabel: { fontSize: '12px', color: '#718096' },
  sidebarStatVal: { fontSize: '13px', fontWeight: 600, color: '#0A3D3A', fontFamily: "'DM Mono', monospace" },
  main: { flex: 1, overflow: 'auto', padding: '32px' },
  tabContent: { maxWidth: '1000px' },
  pageHeader: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '28px' },
  pageTitle: { fontFamily: "'Cormorant Garamond', serif", fontSize: '36px', fontWeight: 400, color: '#0A3D3A', marginBottom: '4px' },
  pageSubtitle: { fontSize: '14px', color: '#718096' },
  primaryBtn: { padding: '12px 22px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #0A3D3A 0%, #1A6B65 100%)', color: '#fff', fontSize: '14px', fontWeight: 500, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", whiteSpace: 'nowrap' },
  secondaryBtn: { padding: '12px 22px', borderRadius: '10px', border: '1.5px solid rgba(10,61,58,0.25)', background: 'transparent', color: '#0A3D3A', fontSize: '14px', fontWeight: 500, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" },
  cancelBtn: { padding: '11px 24px', borderRadius: '9px', border: '1.5px solid rgba(10,61,58,0.2)', background: 'transparent', color: '#4A5568', fontSize: '14px', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" },
  submitBtn: { flex: 1, padding: '11px 24px', borderRadius: '9px', border: 'none', background: 'linear-gradient(135deg, #0A3D3A, #1A6B65)', color: '#fff', fontSize: '14px', fontWeight: 500, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" },
  formPanel: {
    background: '#fff', borderRadius: '16px', padding: '28px', marginBottom: '24px',
    border: '1.5px solid rgba(10,61,58,0.15)', boxShadow: '0 4px 20px rgba(10,61,58,0.07)',
  },
  formPanelTitle: { fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', color: '#0A3D3A', marginBottom: '4px' },
  formPanelSub: { fontSize: '13px', color: '#718096', marginBottom: '20px' },
  formGrid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' },
  formActions: { display: 'flex', gap: '12px', marginTop: '8px', justifyContent: 'flex-end' },
  organGrid: { display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' },
  organChip: { padding: '7px 14px', borderRadius: '100px', fontSize: '13px', border: '1.5px solid rgba(10,61,58,0.15)', background: '#fff', color: '#4A5568', cursor: 'pointer', transition: 'all 0.18s', fontFamily: "'DM Sans', sans-serif" },
  organChipActive: { background: 'rgba(10,61,58,0.07)', borderColor: '#0A3D3A', color: '#0A3D3A', fontWeight: 500 },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' },
  statCard: { padding: '20px', borderRadius: '14px', border: '1px solid', transition: 'transform 0.2s, box-shadow 0.2s' },
  statLabel: { fontSize: '12px', color: '#718096', marginBottom: '8px', fontWeight: 500 },
  statValue: { fontFamily: "'Cormorant Garamond', serif", fontSize: '32px', fontWeight: 600, marginBottom: '4px' },
  statDelta: { fontSize: '12px', color: '#9CA3AF' },
  dashGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
  card: { background: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid rgba(10,61,58,0.08)', boxShadow: '0 2px 12px rgba(10,61,58,0.04)' },
  cardHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' },
  cardTitle: { fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', fontWeight: 600, color: '#0A3D3A' },
  cardBadge: { padding: '3px 10px', borderRadius: '100px', background: 'rgba(26,107,101,0.1)', color: '#1A6B65', fontSize: '11px', fontWeight: 500 },
  cardLinkBtn: { background: 'none', border: 'none', color: '#2AA89A', fontSize: '13px', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" },
  activityRow: { display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: '1px solid rgba(10,61,58,0.05)' },
  activityIcon: { width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', flexShrink: 0 },
  activityInfo: { flex: 1 },
  activityEvent: { fontSize: '13px', fontWeight: 500, color: '#1C1C1E' },
  activityDetail: { fontSize: '12px', color: '#718096' },
  activityTime: { fontSize: '11px', color: '#9CA3AF', whiteSpace: 'nowrap' },
  filterRow: { display: 'flex', gap: '12px', marginBottom: '20px', alignItems: 'center', flexWrap: 'wrap' },
  searchInput: { flex: 1, minWidth: '200px', padding: '10px 16px', borderRadius: '10px', fontSize: '14px', border: '1.5px solid rgba(10,61,58,0.12)', background: '#fff', outline: 'none', fontFamily: "'DM Sans', sans-serif" },
  filterBtns: { display: 'flex', gap: '6px', flexWrap: 'wrap' },
  filterBtn: { padding: '8px 14px', borderRadius: '8px', border: '1.5px solid rgba(10,61,58,0.12)', background: '#fff', color: '#4A5568', fontSize: '13px', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" },
  filterBtnActive: { background: '#0A3D3A', color: '#fff', borderColor: '#0A3D3A' },
  tableCard: { background: '#fff', borderRadius: '16px', overflow: 'auto', border: '1px solid rgba(10,61,58,0.08)', boxShadow: '0 2px 12px rgba(10,61,58,0.04)' },
  table: { width: '100%', borderCollapse: 'collapse', minWidth: '700px' },
  tableHead: { background: 'rgba(10,61,58,0.03)' },
  th: { padding: '12px 14px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#718096', letterSpacing: '0.06em', textTransform: 'uppercase', borderBottom: '1px solid rgba(10,61,58,0.08)', whiteSpace: 'nowrap' },
  tr: { transition: 'background 0.15s' },
  td: { padding: '13px 14px', fontSize: '13px', color: '#4A5568', borderBottom: '1px solid rgba(10,61,58,0.05)', whiteSpace: 'nowrap' },
  tdName: { fontWeight: 500, color: '#1C1C1E' },
  tdGray: { color: '#718096', fontSize: '12px' },
  mono: { fontFamily: "'DM Mono', monospace", fontSize: '12px', color: '#4A5568' },
  bloodBadge: { padding: '3px 8px', borderRadius: '6px', background: 'rgba(200,150,62,0.1)', color: '#A67530', fontSize: '12px', fontWeight: 600, fontFamily: "'DM Mono', monospace" },
  organTags: { display: 'flex', flexWrap: 'wrap', gap: '4px' },
  organTag: { padding: '2px 8px', borderRadius: '4px', background: 'rgba(10,61,58,0.06)', color: '#0A3D3A', fontSize: '11px' },
  actionBtn: { padding: '5px 12px', borderRadius: '6px', border: 'none', background: 'rgba(10,61,58,0.07)', color: '#0A3D3A', fontSize: '12px', cursor: 'pointer', marginRight: '4px', fontFamily: "'DM Sans', sans-serif" },
  actionBtnSecondary: { padding: '5px 12px', borderRadius: '6px', border: '1px solid rgba(10,61,58,0.15)', background: 'transparent', color: '#4A5568', fontSize: '12px', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" },
  deleteBtn: { padding: '5px 12px', borderRadius: '6px', border: 'none', background: 'rgba(220,38,38,0.07)', color: '#DC2626', fontSize: '12px', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" },
  matchesGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px' },
  matchCard: { background: '#fff', borderRadius: '16px', padding: '22px', border: '1px solid rgba(10,61,58,0.08)', boxShadow: '0 2px 12px rgba(10,61,58,0.04)' },
  matchHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' },
  matchId: { fontFamily: "'DM Mono', monospace", fontSize: '12px', color: '#718096' },
  matchOrgan: { fontFamily: "'Cormorant Garamond', serif", fontSize: '26px', fontWeight: 600, color: '#0A3D3A', marginBottom: '14px' },
  matchParties: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' },
  matchParty: { flex: 1 },
  partyLabel: { fontSize: '10px', color: '#9CA3AF', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '2px' },
  partyName: { fontSize: '14px', fontWeight: 500, color: '#1C1C1E' },
  matchArrow: { fontSize: '20px', color: '#2AA89A' },
  compatRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '6px' },
  compatLabel: { fontSize: '12px', color: '#718096' },
  compatScore: { fontSize: '14px', fontWeight: 600, color: '#1A6B65' },
  compatBar: { height: '6px', background: 'rgba(10,61,58,0.06)', borderRadius: '3px', overflow: 'hidden', marginBottom: '12px' },
  compatFill: { height: '100%', borderRadius: '3px', transition: 'width 0.6s ease' },
  urgencyRow: { marginBottom: '14px' },
  urgencyBadge: { padding: '4px 10px', borderRadius: '100px', fontSize: '11px', fontWeight: 500 },
  matchActions: { display: 'flex', gap: '8px' },
  approveBtn: { flex: 1, padding: '9px', borderRadius: '8px', border: 'none', background: 'linear-gradient(135deg, #0A3D3A, #1A6B65)', color: '#fff', fontSize: '13px', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" },
  reviewBtn: { flex: 1, padding: '9px', borderRadius: '8px', border: '1.5px solid rgba(10,61,58,0.15)', background: 'transparent', color: '#0A3D3A', fontSize: '13px', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" },
  transplantList: { display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' },
  transplantCard: { display: 'flex', alignItems: 'center', gap: '20px', padding: '20px 24px', background: '#fff', borderRadius: '14px', border: '1px solid rgba(10,61,58,0.08)', boxShadow: '0 2px 8px rgba(10,61,58,0.04)' },
  transplantLeft: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', minWidth: '80px' },
  transplantOrganBadge: { padding: '6px 12px', borderRadius: '8px', background: 'rgba(10,61,58,0.06)', color: '#0A3D3A', fontSize: '13px', fontWeight: 600 },
  transplantId: { fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#9CA3AF' },
  transplantCenter: { flex: 1 },
  transplantRoute: { fontSize: '15px', fontWeight: 500, color: '#1C1C1E', marginBottom: '4px' },
  transplantMeta: { fontSize: '13px', color: '#718096' },
  transplantRight: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' },
  transplantDate: { fontSize: '12px', color: '#9CA3AF', fontFamily: "'DM Mono', monospace" },
  timeline: { display: 'flex', flexDirection: 'column' },
  timelineRow: { display: 'flex', gap: '16px', paddingBottom: '20px' },
  timelineDot: { width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#fff', marginTop: '2px' },
  timelineContent: { flex: 1, paddingBottom: '12px', borderBottom: '1px solid rgba(10,61,58,0.06)' },
  timelineStage: { fontSize: '14px', fontWeight: 500, marginBottom: '3px' },
  timelineDesc: { fontSize: '13px', color: '#9CA3AF' },
  uploadZone: { border: '2px dashed rgba(10,61,58,0.18)', borderRadius: '14px', padding: '40px', textAlign: 'center', marginBottom: '24px', background: '#fff', cursor: 'pointer' },
  uploadIcon: { fontSize: '28px', color: '#2AA89A', marginBottom: '8px' },
  uploadText: { fontSize: '15px', fontWeight: 500, color: '#0A3D3A', marginBottom: '4px' },
  uploadSub: { fontSize: '13px', color: '#718096' },
  modalOverlay: { position: 'fixed', inset: 0, background: 'rgba(10,61,58,0.25)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200 },
  modal: { background: '#FDFBF7', borderRadius: '20px', padding: '32px', width: '460px', maxHeight: '90vh', overflow: 'auto', boxShadow: '0 24px 64px rgba(10,61,58,0.18)' },
  modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' },
  modalTitle: { fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', color: '#0A3D3A' },
  modalClose: { background: 'none', border: 'none', fontSize: '16px', color: '#718096', cursor: 'pointer' },
  modalUploadZone: { border: '2px dashed rgba(10,61,58,0.2)', borderRadius: '12px', padding: '32px', textAlign: 'center', background: 'rgba(10,61,58,0.02)', cursor: 'pointer', marginBottom: '4px' },
  modalUploadIcon: { fontSize: '28px', color: '#2AA89A', marginBottom: '8px' },
  modalUploadText: { fontSize: '14px', fontWeight: 500, color: '#0A3D3A' },
  modalUploadSub: { fontSize: '12px', color: '#718096', marginTop: '4px' },
};
