/* App.js */
import React, { useState, useEffect } from 'react';
import './App.css';

// --- FIREBASE IMPORTS ---
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

// --- FIREBASE CONFIGURATION ---
const firebaseConfig = {
  apiKey: "AIzaSyCgusP0gSd3K_W1Xu70lSO1qc54UhxB8Bw",
  authDomain: "buildfolio-d4e25.firebaseapp.com",
  projectId: "buildfolio-d4e25",
  storageBucket: "buildfolio-d4e25.firebasestorage.app",
  messagingSenderId: "324152886510",
  appId: "1:324152886510:web:2418f2abb27888f95c9fff",
  measurementId: "G-38TM3QKGJ1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- ICONS ---
const ICONS = {
  linkedin: <svg viewBox="0 0 24 24" className="icon-svg"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>,
  github: <svg viewBox="0 0 24 24" className="icon-svg"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
};

// --- DEFAULT BLANK TEMPLATE ---
const BLANK_TEMPLATE = { id: 0, name: 'Blank Canvas', style: 'Minimal', bgClass: 'bg-white', color: '#4f46e5', textColor: '#1f2937' };

// --- ALL TEMPLATES ---
const TEMPLATES = [
  BLANK_TEMPLATE,
  { id: 1, name: 'Modern Blue', style: 'Modern', bgClass: 'bg-modern', color: '#2563eb', textColor: '#1f2937' },
  { id: 2, name: 'Dark Creative', style: 'Creative', bgClass: 'bg-dark', color: '#8b5cf6', textColor: '#f3f4f6' },
  { id: 3, name: 'Clean Minimal', style: 'Minimal', bgClass: 'bg-minimal', color: '#10b981', textColor: '#1f2937' },
  { id: 4, name: 'Peach Sunset', style: 'Modern', bgClass: 'bg-gradient-peach', color: '#be185d', textColor: '#4a0404' },
  { id: 5, name: 'Sky Professional', style: 'Minimal', bgClass: 'bg-sky', color: '#0369a1', textColor: '#0c4a6e' },
  { id: 6, name: 'Forest Green', style: 'Modern', bgClass: 'bg-forest', color: '#059669', textColor: '#064e3b' },
  { id: 7, name: 'Ocean Breeze', style: 'Creative', bgClass: 'bg-sunset', color: '#0284c7', textColor: '#1f2937' },
  { id: 8, name: 'Royal Purple', style: 'Modern', bgClass: 'bg-purple', color: '#7c3aed', textColor: '#4c1d95' },
  { id: 9, name: 'Luxury Gold', style: 'Creative', bgClass: 'bg-luxury', color: '#d4af37', textColor: '#f3f4f6' },
  { id: 10, name: 'Corporate', style: 'Modern', bgClass: 'bg-corporate', color: '#334155', textColor: '#0f172a' },
  { id: 11, name: 'Warm Earth', style: 'Minimal', bgClass: 'bg-warm', color: '#9a3412', textColor: '#7c2d12' },
  { id: 12, name: 'Hacker Terminal', style: 'Creative', bgClass: 'bg-terminal', color: '#22c55e', textColor: '#00ff00' },
  { id: 13, name: 'Rose Petal', style: 'Modern', bgClass: 'bg-rose', color: '#be123c', textColor: '#881337' },
  { id: 14, name: 'Indigo Dream', style: 'Minimal', bgClass: 'bg-indigo', color: '#4338ca', textColor: '#1e1b4b' },
  { id: 15, name: 'Concrete Gray', style: 'Modern', bgClass: 'bg-gray', color: '#262626', textColor: '#171717' },
  { id: 16, name: 'Neon Nights', style: 'Creative', bgClass: 'bg-dark', color: '#00ffff', textColor: '#e0f2fe' },
  { id: 17, name: 'Cherry Red', style: 'Modern', bgClass: 'bg-rose', color: '#9f1239', textColor: '#881337' },
  { id: 18, name: 'Lemon Fresh', style: 'Minimal', bgClass: 'bg-minimal', color: '#ca8a04', textColor: '#422006' },
  { id: 19, name: 'Midnight Blue', style: 'Creative', bgClass: 'bg-corporate', color: '#60a5fa', textColor: '#f1f5f9' },
  { id: 20, name: 'Slate Simple', style: 'Minimal', bgClass: 'bg-modern', color: '#475569', textColor: '#1e293b' },
  { id: 21, name: 'Candy Pink', style: 'Modern', bgClass: 'bg-gradient-peach', color: '#db2777', textColor: '#831843' },
  { id: 22, name: 'Emerald City', style: 'Creative', bgClass: 'bg-forest', color: '#34d399', textColor: '#064e3b' },
  { id: 23, name: 'Electric Violet', style: 'Modern', bgClass: 'bg-purple', color: '#8b5cf6', textColor: '#4c1d95' },
  { id: 24, name: 'Steel Industrial', style: 'Minimal', bgClass: 'bg-gray', color: '#525252', textColor: '#171717' },
];

export default function App() {
  const [view, setView] = useState('signup');
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATES[0]);
  const [isLoading, setIsLoading] = useState(true);
  
  // --- USER DATA ---
  const [data, setData] = useState({
    fullName: '', role: '', about: '', 
    email: '', phone: '', linkedin: '', github: '',
    image: null, resume: null,
    skills: '', projects: [], achievements: []
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const portfolioId = params.get('p');

    if (portfolioId) {
      setView('loading');
      const fetchPortfolio = async () => {
        try {
          const docRef = doc(db, "portfolios", portfolioId);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            const savedData = docSnap.data();
            setData(savedData.data);
            const tmpl = TEMPLATES.find(t => t.id === savedData.templateId);
            if (tmpl) setSelectedTemplate(tmpl);
            setView('published');
          } else {
            alert("Portfolio not found!");
            setView('login');
          }
        } catch (error) {
          console.error("Error fetching portfolio:", error);
          alert("Error loading portfolio.");
          setView('login');
        }
        setIsLoading(false);
      };
      fetchPortfolio();
    } else {
      const saved = localStorage.getItem('portfolioData');
      if (saved) {
        const parsed = JSON.parse(saved);
        setData(parsed);
      }
      setIsLoading(false);
    }
  }, []);

  const handleSignup = (email, password) => {
    if (users.find(u => u.email === email)) return alert("User exists!");
    setUsers([...users, { email, password }]);
    alert("Signup Success! Login now.");
    setView('login');
  };

  const handleLogin = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) { setCurrentUser(user); setView('templates'); }
    else alert("Invalid credentials.");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView('login');
  };

  if (isLoading) return <div className="center-screen">Loading...</div>;

  if (view === 'published') {
    return (
      <div style={{minHeight: '100vh', background: selectedTemplate.bgClass.includes('dark') ? '#111827' : '#f3f4f6'}}>
        <FinalPortfolio data={data} template={selectedTemplate} />
        <a href="/" style={{position:'fixed', bottom:'20px', right:'20px', background:'black', color:'white', padding:'10px 20px', borderRadius:'30px', textDecoration:'none', fontWeight:'bold', opacity:0.8}}>Create Your Own</a>
      </div>
    );
  }

  return (
    <div className={`app-container ${view === 'editor' ? 'editor-mode' : ''}`}>
      {view === 'signup' && <AuthScreen type="signup" onSubmit={handleSignup} onSwitch={() => setView('login')} />}
      {view === 'login' && <AuthScreen type="login" onSubmit={handleLogin} onSwitch={() => setView('signup')} />}
      
      {view === 'templates' && (
        <TemplateScreen 
          templates={TEMPLATES} 
          onSelect={(t) => { setSelectedTemplate(t); setView('editor'); }} 
          user={currentUser} 
          onLogout={handleLogout} 
          setData={setData}
          setSelectedTemplate={setSelectedTemplate}
          setView={setView}
        />
      )}

      {view === 'editor' && (
        <div className="split-screen">
          <div className="editor-pane">
            <EditorForm 
              data={data} 
              setData={setData} 
              onBack={() => setView('templates')} 
              currentTemplate={selectedTemplate}
              templates={TEMPLATES}
              setSelectedTemplate={setSelectedTemplate}
            />
          </div>
          <div className="preview-wrapper">
            <PreviewWrapper data={data} template={selectedTemplate} />
          </div>
        </div>
      )}
    </div>
  );
}

// --- UPDATED AUTH SCREEN (SIGNUP / LOGIN) ---
function AuthScreen({ type, onSubmit, onSwitch }) {
  const submit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    onSubmit(email, password);
  };

  return (
    <div className="center-screen">
      <div style={{background:'white', padding:'2rem', borderRadius:'10px', boxShadow:'0 5px 15px rgba(0,0,0,0.1)', width:'350px'}}>
        <h2 style={{textAlign:'center', marginBottom:'1rem'}}>{type === 'signup' ? 'Create Account' : 'Welcome'}</h2>
        <form onSubmit={submit}>
          {type === 'signup' ? (
            <>
              <input className="input" name="name" placeholder="Enter your name" required />
              <input className="input" name="email" type="email" placeholder="Enter your Email" required />
              <input className="input" name="college" placeholder='Enter college name' required/>
              <input className="input" name="number"  placeholder='Enter mobile number' required/>
              <input className="input" name="stream" placeholder='Enter stream' required/>
              <input className="input" name="password" type="password" placeholder='Enter password' required/>
              <input className="input" name="confirmPassword" type="password" placeholder='Enter confirm password' required/>
            </>
          ) : (
            <>
              <input className="input" name="email" type="email" placeholder="Enter your Email" required />
              <input className="input" name="password" type="password" placeholder="Enter password" required />
            </>
          )}
          
          <button className="btn" style={{marginTop:'15px'}}>{type === 'signup' ? 'Sign Up' : 'Login'}</button>
        </form>
        <button onClick={onSwitch} style={{background:'none', border:'none', color:'#4f46e5', width:'100%', marginTop:'10px', cursor:'pointer'}}>Switch to {type === 'signup' ? 'Login' : 'Signup'}</button>
      </div>
    </div>
  );
}

function TemplateScreen({ templates, onSelect, user, onLogout, setData, setSelectedTemplate, setView }) {
  const initial = user?.email ? user.email[0].toUpperCase() : 'U';

  const handleContinue = () => {
    const saved = localStorage.getItem('portfolioData');
    if (saved) {
      const parsedData = JSON.parse(saved);
      if(parsedData.data) setData(parsedData.data);
      else setData(parsedData); 

      if (parsedData.savedTemplateId) {
        const found = templates.find(t => t.id === parsedData.savedTemplateId);
        if (found) setSelectedTemplate(found);
      }
      setView('editor');
    } else {
      alert("No saved portfolio found. Please create a new one.");
    }
  };

  // --- NEW LOGIC: JUMP STRAIGHT TO EDITOR WITH BLANK TEMPLATE ---
  const handleCreateNew = () => {
    if (window.confirm("Start a fresh portfolio? Any unsaved changes will be lost.")) {
      // 1. Reset Data
      setData({
        fullName: '', role: '', about: '', 
        email: '', phone: '', linkedin: '', github: '',
        image: null, resume: null,
        skills: '', projects: [], achievements: []
      });
      // 2. Set Default Blank Template
      setSelectedTemplate(BLANK_TEMPLATE);
      // 3. Go to Editor
      setView('editor');
    }
  };
  
  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <div className="nav-brand">PortfolioBuilder</div>
        <div className="nav-user">
          <div className="avatar-circle">{initial}</div>
          <button onClick={onLogout} className="btn-logout">Logout</button>
        </div>
      </nav>

      <div className="dashboard-hero">
        <h1 style={{fontSize:'2.5rem', marginBottom:'1rem', color:'#111'}}>Build a Portfolio That Speaks for You!</h1>
        <p className="ai-message">"Create, customize, and publish a professional portfolio in minutes—no design skills required."</p>
        <div className="hero-actions">
          <div className="action-card primary" onClick={handleContinue}>
            <h3>Edit Portfolio</h3>
            <p>Continue working on your last saved design.</p>
          </div>
          <div className="action-card" onClick={handleCreateNew}>
            <h3>Create Portfolio</h3>
            <p>Start fresh with a blank canvas. Add a theme later!</p>
          </div>
        </div>
      </div>

      <div style={{textAlign: 'center', marginTop: '2rem', marginBottom: '1rem'}} id="template-grid-section">
        <h2 style={{color: '#111'}}>Choose your Favourite Template!</h2>
        <p style={{color: '#666'}}>Or simply click "Create Portfolio" above to start from scratch.</p>
      </div>

      <div className="template-grid-wrapper">
        <div className="template-grid">
          {templates.map(t => (
            <div key={t.id} className={`template-card ${t.bgClass}`} onClick={() => onSelect(t)}>
              <h3 style={{color: t.textColor}}>{t.name}</h3>
              <span style={{color: t.textColor}}>{t.style} Layout</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- EDITOR FORM (With Theme Selector) ---
function EditorForm({ data, setData, onBack, currentTemplate, templates, setSelectedTemplate }) {
  const [customLink, setCustomLink] = useState('');

  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });
  const handleFile = (e) => e.target.files[0] && setData({ ...data, [e.target.name]: URL.createObjectURL(e.target.files[0]) });

  const handleSave = () => {
    const dataToSave = { ...data, savedTemplateId: currentTemplate.id };
    localStorage.setItem('portfolioData', JSON.stringify(dataToSave));
    alert("Draft Saved!");
  };

  const handleDelete = () => {
    if (window.confirm("Delete all data? This cannot be undone.")) {
      const emptyData = { fullName: '', role: '', about: '', email: '', phone: '', linkedin: '', github: '', image: null, resume: null, skills: '', projects: [], achievements: [] };
      setData(emptyData);
      localStorage.removeItem('portfolioData');
      onBack();
    }
  };

  const handleDeploy = async () => {
    if (!customLink.trim()) {
      alert("Please enter a Link Name (e.g. 'john-doe') before deploying.");
      return;
    }

    const safeLink = customLink.replace(/[^a-zA-Z0-9-_]/g, '').toLowerCase();
    
    if (safeLink.length < 3) {
      alert("Link name must be at least 3 characters.");
      return;
    }

    try {
      const docRef = doc(db, "portfolios", safeLink);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        alert(`Sorry, the link "${safeLink}" is already taken. Please choose another.`);
        return;
      }

      const payload = {
        data: data,
        templateId: currentTemplate.id,
        createdAt: new Date().toISOString()
      };

      await setDoc(docRef, payload);

      const fullUrl = `${window.location.origin}${window.location.pathname}?p=${safeLink}`;
      await navigator.clipboard.writeText(fullUrl);
      
      alert(`🎉 Portfolio Deployed!\n\nLink Copied to Clipboard! 📋\n\n${fullUrl}`);
      
    } catch (error) {
      console.error("Deploy Error:", error);
      alert("Deployment failed. Check console.");
    }
  };

  const fillTextAI = (field, index = null) => {
    const roleLower = data.role ? data.role.toLowerCase() : "";
    if (field === 'about') {
      let content = "";
      if (roleLower.includes('design') || roleLower.includes('ui')) {
        content = `I am a creative ${data.role || 'Designer'} with a passion for building intuitive user experiences. I specialize in translating complex needs into clean, interactive designs using modern tools.`;
      } else if (roleLower.includes('data')) {
        content = `I am an analytical ${data.role || 'Data Professional'} skilled in interpreting complex datasets to drive business solutions. I love uncovering patterns and visualizing data stories.`;
      } else {
        content = `I am a motivated ${data.role || 'Professional'} with a strong foundation in solving real-world problems. I am eager to apply my skills in a challenging environment.`;
      }
      setData({ ...data, about: content });
    }
    else if (field === 'skills') {
      let content = "React, Node.js, Python, JavaScript, SQL, Git";
      if (roleLower.includes('design')) content = "Figma, Adobe XD, Photoshop, Illustrator, Prototyping";
      else if (roleLower.includes('data')) content = "Python, SQL, Tableau, PowerBI, Excel, Machine Learning";
      setData({ ...data, skills: content });
    }
    else if (field === 'projDesc' && index !== null) {
      const updatedProjects = data.projects.map((p, i) => i === index ? { ...p, desc: "Designed and developed a responsive application focusing on user experience and performance." } : p);
      setData({ ...data, projects: updatedProjects });
    }
    else if (field === 'achDesc' && index !== null) {
      const updatedAch = data.achievements.map((a, i) => i === index ? { ...a, desc: "Recognized for outstanding dedication and excellence in this field." } : a);
      setData({ ...data, achievements: updatedAch });
    }
  };

  const addProject = () => setData({ ...data, projects: [...data.projects, { id: Date.now(), title: '', desc: '', link: '' }] });
  const removeProject = (id) => setData({ ...data, projects: data.projects.filter(p => p.id !== id) });
  const updateProject = (id, key, val) => setData({ ...data, projects: data.projects.map(p => p.id === id ? { ...p, [key]: val } : p) });
  
  const addAchievement = () => setData({ ...data, achievements: [...data.achievements, { id: Date.now(), title: '', desc: '', image: null }] });
  const removeAchievement = (id) => setData({ ...data, achievements: data.achievements.filter(a => a.id !== id) });
  const updateAchievement = (id, key, val) => setData({ ...data, achievements: data.achievements.map(a => a.id === id ? { ...a, [key]: val } : a) });
  const handleAchFile = (id, e) => {
    if(e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setData({ ...data, achievements: data.achievements.map(a => a.id === id ? { ...a, image: url } : a) });
    }
  };

  return (
    <div>
      <div className="editor-header">
        <button onClick={onBack} style={{background:'none', border:'none', cursor:'pointer', color:'#666', fontWeight:'bold'}}>
          ← Dashboard
        </button>
        <div className="editor-actions">
          <button onClick={handleSave} className="btn-save">Save</button>
          <button onClick={handleDelete} className="btn-clear">Delete</button>
        </div>
      </div>
      
      <div className="form-section">
        <label className="label">Personal Details</label>
        <input name="fullName" value={data.fullName} onChange={handleChange} className="input" placeholder="Name" />
        <input name="role" value={data.role} onChange={handleChange} className="input" placeholder="Role (e.g. Designer)" />
        <div style={{display:'flex', justifyContent:'space-between'}}>
            <label className="label">About Me</label>
            <span onClick={() => fillTextAI('about')} className="ai-badge">✨ Auto-Fill</span>
        </div>
        <textarea name="about" value={data.about} onChange={handleChange} className="input" rows="3" />
        <label className="label">Profile Photo</label>
        <input type="file" name="image" onChange={handleFile} className="input" accept="image/*" />
        <label className="label">Resume / CV</label>
        <input type="file" name="resume" onChange={handleFile} className="input" accept=".pdf,.doc,.docx" />
      </div>

      {/* NEW THEME SELECTOR INSIDE EDITOR */}
      <div className="form-section">
        <label className="label">Choose Theme & Background</label>
        <div className="theme-selector">
          {templates.map(t => (
            <div 
              key={t.id} 
              className={`theme-option ${t.bgClass} ${currentTemplate.id === t.id ? 'selected' : ''}`}
              title={t.name}
              onClick={() => setSelectedTemplate(t)}
            ></div>
          ))}
        </div>
      </div>

      <div className="form-section">
        <div style={{display:'flex', justifyContent:'space-between'}}>
           <label className="label">Skills</label>
           <span onClick={() => fillTextAI('skills')} className="ai-badge">✨ Suggest</span>
        </div>
        <input name="skills" value={data.skills} onChange={handleChange} className="input" placeholder="Comma separated" />
      </div>

      <div className="form-section">
        <label className="label">Achievements</label>
        {data.achievements.map((ach, i) => (
          <div key={ach.id} style={{background:'#f9fafb', padding:'10px', borderRadius:'8px', marginBottom:'10px', border:'1px solid #eee'}}>
            <input value={ach.title} onChange={(e) => updateAchievement(ach.id, 'title', e.target.value)} className="input" placeholder="Achievement Title" />
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <label className="label" style={{fontSize:'0.7rem'}}>Description</label>
              <span onClick={() => fillTextAI('achDesc', i)} className="ai-badge">✨ Fill Desc</span>
            </div>
            <textarea value={ach.desc} onChange={(e) => updateAchievement(ach.id, 'desc', e.target.value)} className="input" rows="2" placeholder="Details..." />
            <label className="label" style={{fontSize:'0.75rem'}}>Upload Certificate</label>
            <input type="file" onChange={(e) => handleAchFile(ach.id, e)} className="input" accept="image/*,.pdf" />
            <button onClick={() => removeAchievement(ach.id)} className="btn-delete">X Remove</button>
          </div>
        ))}
        <button onClick={addAchievement} className="btn-outline" style={{marginTop:'5px'}}>+ Add Achievement</button>
      </div>

      <div className="form-section">
        <label className="label">Projects</label>
        {data.projects.map((p, i) => (
          <div key={p.id} style={{background:'#f9fafb', padding:'10px', borderRadius:'8px', marginBottom:'10px', border:'1px solid #eee'}}>
            <input className="input" placeholder="Title" value={p.title} onChange={(e) => updateProject(p.id, 'title', e.target.value)} />
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
               <span style={{fontSize:'0.7rem', color:'#666'}}>Description</span>
               <span onClick={() => fillTextAI('projDesc', i)} className="ai-badge">✨ Fill Desc</span>
            </div>
            <textarea className="input" rows="2" value={p.desc} onChange={(e) => updateProject(p.id, 'desc', e.target.value)} />
            <input className="input" placeholder="Link" value={p.link} onChange={(e) => updateProject(p.id, 'link', e.target.value)} />
            <button onClick={() => removeProject(p.id)} className="btn-delete">Delete Project</button>
          </div>
        ))}
        <button onClick={addProject} className="btn-outline">+ Add Empty Project</button>
      </div>
      
      <div className="form-section">
         <label className="label">Contact</label>
         <input name="email" value={data.email} onChange={handleChange} className="input" placeholder="Email (Text)" />
         <input name="phone" value={data.phone} onChange={handleChange} className="input" placeholder="Contact No (Text)" />
         <input name="linkedin" value={data.linkedin} onChange={handleChange} className="input" placeholder="LinkedIn URL" />
         <input name="github" value={data.github} onChange={handleChange} className="input" placeholder="GitHub URL" />
      </div>

      {/* DEPLOY SECTION */}
      <div className="form-section" style={{borderBottom: 'none', paddingTop: '1rem'}}>
         <label className="label" style={{fontSize: '1.1rem', color: '#4f46e5'}}>🚀 Ready to Publish?</label>
         <p style={{fontSize: '0.9rem', color: '#666', marginBottom: '15px', lineHeight: '1.5'}}>
           Enter a custom link name (e.g. <b>john-doe</b>) below.
         </p>
         <div style={{display:'flex', gap:'10px'}}>
            <input 
              placeholder="Link Name..." 
              value={customLink} 
              onChange={(e) => setCustomLink(e.target.value)}
              style={{flex:1, padding:'-3px', borderRadius:'6px', border:'1px solid #ccc'}} 
            />
            <button onClick={handleDeploy} className="btn-deploy" style={{flex:1, padding:'12px', fontSize:'1rem'}}>
              Deploy 🚀
            </button>
         </div>
      </div>
    </div>
  );
}

// ... [PreviewWrapper and Layout components (ModernLayout, MinimalLayout, CreativeLayout) are the same as before] ...
function PreviewWrapper({ data, template }) {
  const [tab, setTab] = useState('preview');
  const [copyText, setCopyText] = useState('Copy Code');

  const generateCode = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${data.fullName} - Portfolio</title>
  <style>
    * { box-sizing: border-box; font-family: sans-serif; }
    body { margin: 0; padding: 0; background: ${template.bgClass.includes('dark') || template.bgClass.includes('gray') ? '#1f2937' : '#f3f4f6'}; color: ${template.textColor}; }
    .container { max-width: 900px; margin: 0 auto; background: ${template.bgClass.includes('dark') ? '#111827' : 'white'}; min-height: 100vh; padding: 40px; }
    :root { --primary: ${template.color}; --text: ${template.textColor}; }
    h1 { color: var(--text); font-size: 2.5rem; }
    .role { color: var(--primary); font-size: 1.2rem; font-weight: bold; }
    h3 { border-bottom: 2px solid var(--primary); display: inline-block; margin-top: 30px; color: var(--text); }
    .skills span { background: rgba(79, 70, 229, 0.1); color: var(--primary); padding: 5px 10px; border-radius: 4px; margin-right: 5px; display: inline-block; border: 1px solid var(--primary); }
    .project { border: 1px solid rgba(0,0,0,0.1); padding: 15px; border-radius: 8px; margin-bottom: 15px; background: rgba(255,255,255,0.05); }
    .project a { color: var(--primary); text-decoration: none; font-weight: bold; }
    p { line-height: 1.6; }
  </style>
</head>
<body>
  <div class="container">
    <h1>${data.fullName}</h1>
    <p class="role">${data.role}</p>
    <p>${data.about}</p>
    <hr/>
    <h3>Skills</h3>
    <div class="skills">
      ${data.skills.split(',').map(s => `<span>${s.trim()}</span>`).join('')}
    </div>
    <h3>Projects</h3>
    ${data.projects.map(p => `
    <div class="project">
      <h4>${p.title}</h4>
      <p>${p.desc}</p>
      <a href="${p.link}">View Project</a>
    </div>`).join('')}
    <h3>Contact</h3>
    <p>${data.email} | ${data.phone}</p>
  </div>
</body>
</html>`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateCode());
    setCopyText('Copied!');
    setTimeout(() => setCopyText('Copy Code'), 2000);
  };

  return (
    <div className="preview-wrapper">
      <div className="preview-toolbar">
        <button onClick={() => setTab('preview')} className={`tab-btn ${tab === 'preview' ? 'active' : ''}`}>Live Preview</button>
        <button onClick={() => setTab('code')} className={`tab-btn ${tab === 'code' ? 'active' : ''}`}>Source Code</button>
        
        {tab === 'code' && (
          <button onClick={handleCopy} className="btn-copy">
            {copyText}
          </button>
        )}
      </div>
      <div className="preview-pane">
        {tab === 'preview' ? <FinalPortfolio data={data} template={template} /> : <textarea className="code-viewer" value={generateCode()} readOnly />}
      </div>
    </div>
  );
}

function FinalPortfolio({ data, template }) {
  const { style, color } = template;
  if (style === 'Modern') return <ModernLayout data={data} template={template} />;
  if (style === 'Minimal') return <MinimalLayout data={data} template={template} />;
  if (style === 'Creative') return <CreativeLayout data={data} template={template} />;
  return null;
}

// --- LAYOUTS ---
function ModernLayout({ data, template }) {
  return (
    <div className={`layout-Modern ${template.bgClass}`} style={{padding:'3rem', '--primary': template.color, minHeight: '100vh', width: '100%'}}>
      <header className="hero-split anim-slide">
        <div>
          <h1 style={{fontSize:'3rem', color: template.textColor}}>{data.fullName || "Your Name"}</h1>
          <p style={{fontSize:'1.5rem', color: template.color, fontWeight:'bold'}}>{data.role || "Your Role"}</p>
          <p style={{maxWidth:'500px', marginTop:'10px', color: template.textColor, opacity: 0.8}}>{data.about}</p>
          <div style={{marginTop:'15px'}}>
             <div style={{marginBottom:'10px'}}>
               {data.email && <span className="contact-text" style={{color: template.textColor}}>Email: {data.email}</span>}
               {data.phone && <span className="contact-text" style={{color: template.textColor}}>Ph: {data.phone}</span>}
             </div>
             <div style={{display:'flex', gap:'15px'}}>
               {data.linkedin && <a href={data.linkedin} target="_blank" rel="noreferrer" className="icon-box" style={{color: template.color}}>{ICONS.linkedin} LinkedIn</a>}
               {data.github && <a href={data.github} target="_blank" rel="noreferrer" className="icon-box" style={{color: template.color}}>{ICONS.github} GitHub</a>}
             </div>
             {data.resume && <a href={data.resume} download className="btn-resume">Download Resume</a>}
          </div>
        </div>
        {data.image && <img src={data.image} alt="Profile" style={{width:'150px', height:'150px', borderRadius:'50%', objectFit:'cover', border:`4px solid ${template.color}`}} />}
      </header>

      <section className="anim-pop" style={{marginBottom:'3rem'}}>
        <h3 style={{borderBottom:`2px solid ${template.color}`, display:'inline-block', marginBottom:'1rem', color: template.textColor}}>Skills</h3>
        <div style={{display:'flex', gap:'10px', flexWrap:'wrap', marginBottom:'2rem'}}>
          {data.skills ? data.skills.split(',').map((s,i) => (
            <span key={i} style={{background:'rgba(255,255,255,0.1)', border: `1px solid ${template.color}`, color:template.color, padding:'5px 10px', borderRadius:'4px', fontWeight:'bold'}}>{s.trim()}</span>
          )) : <span style={{opacity:0.5, color: template.textColor}}>Add skills...</span>}
        </div>

        <h3 style={{borderBottom:`2px solid ${template.color}`, display:'inline-block', marginBottom:'1rem', color: template.textColor}}>Achievements</h3>
        <div style={{display:'grid', gap:'1rem'}}>
          {data.achievements.map((ach) => (
             <div key={ach.id} style={{background:'rgba(255,255,255,0.1)', border: '1px solid rgba(0,0,0,0.05)', padding:'1rem', borderRadius:'6px'}}>
               <h4 style={{margin:0, color:template.color}}>{ach.title}</h4>
               <p style={{margin:'5px 0 0', fontSize:'0.9rem', color: template.textColor, opacity: 0.8}}>{ach.desc}</p>
               {ach.image && <a href={ach.image} target="_blank" rel="noreferrer" style={{fontSize:'0.8rem', color: template.color, display:'block', marginTop:'5px'}}>View Certificate</a>}
             </div>
          ))}
        </div>
      </section>

      <section className="anim-slide">
        <h3 style={{borderBottom:`2px solid ${template.color}`, display:'inline-block', marginBottom:'2rem', color: template.textColor}}>Projects</h3>
        <div className="grid-2">
          {data.projects.map(p => (
            <div key={p.id} className="card" style={{background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(0,0,0,0.05)'}}>
              <h4 style={{color: template.color, fontSize:'1.2rem'}}>{p.title}</h4>
              <p style={{fontSize:'0.9rem', color: template.textColor, opacity: 0.8, margin:'10px 0'}}>{p.desc}</p>
              {p.link && <a href={p.link} target="_blank" rel="noreferrer" style={{color:template.color, fontWeight:'bold', fontSize:'0.9rem'}}>View Project →</a>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function MinimalLayout({ data, template }) {
  return (
    <div className={`layout-Minimal ${template.bgClass}`} style={{padding:'4rem', '--primary': template.color, minHeight: '100vh', width: '100%'}}>
      <header className="hero-centered anim-slide">
        {data.image && <img src={data.image} alt="Profile" style={{width:'100px', height:'100px', borderRadius:'50%', objectFit:'cover', marginBottom:'1rem'}} />}
        <h1 style={{fontSize:'2.5rem', letterSpacing:'1px', color: template.textColor}}>{data.fullName || "Your Name"}</h1>
        <p style={{textTransform:'uppercase', fontSize:'0.9rem', letterSpacing:'2px', color: template.color}}>{data.role || "Your Role"}</p>
        <div className="divider" style={{background: template.textColor}}></div>
        <p style={{lineHeight:'1.8', color: template.textColor, opacity: 0.8}}>{data.about}</p>
        {data.resume && <a href={data.resume} download className="btn-resume" style={{marginTop:'20px', background:template.color}}>Download CV</a>}
      </header>

      <div style={{marginTop:'2rem', textAlign:'center'}}>
         {data.skills && data.skills.split(',').map((s,i) => <span key={i} style={{borderBottom:`1px solid ${template.color}`, color: template.textColor, padding:'0 5px', margin:'0 5px'}}>{s}</span>)}
      </div>

      <div style={{marginTop:'4rem'}} className="anim-slide">
        {data.projects.map(p => (
          <div key={p.id} className="project-item">
            <h3 style={{marginBottom:'0.5rem', color: template.textColor}}>{p.title}</h3>
            <p style={{color: template.textColor, opacity: 0.8, fontSize:'0.95rem'}}>{p.desc}</p>
            {p.link && <a href={p.link} target="_blank" rel="noreferrer" style={{fontSize:'0.8rem', color: template.color, textDecoration:'none'}}>LINK ↗</a>}
          </div>
        ))}
      </div>
      
      <div style={{marginTop:'3rem', borderTop:'1px solid #eee', paddingTop:'2rem', textAlign:'left'}}>
        <h4 style={{textAlign:'center', marginBottom:'1.5rem', color: template.textColor}}>Achievements</h4>
        {data.achievements.map((ach) => (
           <div key={ach.id} style={{marginBottom:'1rem', textAlign:'center'}}>
             <strong>{ach.title}</strong>
             <p style={{fontSize:'0.9rem', color: template.textColor, opacity: 0.8}}>{ach.desc}</p>
             {ach.image && <a href={ach.image} target="_blank" rel="noreferrer" className="btn-cert">View Certificate</a>}
           </div>
        ))}
      </div>

      <footer className="contact-section" style={{borderColor: 'rgba(0,0,0,0.1)'}}>
          <h4 style={{color: template.textColor}}>Get In Touch</h4>
          <p style={{color: template.textColor, opacity: 0.8}}>{data.email} {data.phone && ` • ${data.phone}`}</p>
          <div style={{display:'flex', justifyContent:'center', gap:'1.5rem', marginTop:'15px'}}>
             {data.linkedin && <a href={data.linkedin} target="_blank" rel="noreferrer" className="icon-box" style={{color:template.color}}>{ICONS.linkedin}</a>}
             {data.github && <a href={data.github} target="_blank" rel="noreferrer" className="icon-box" style={{color:template.color}}>{ICONS.github}</a>}
          </div>
      </footer>
    </div>
  );
}

function CreativeLayout({ data, template }) {
  return (
    <div className={`layout-Creative ${template.bgClass}`} style={{padding:'3rem', '--primary': template.color, minHeight: '100vh', width: '100%'}}>
      <header className="anim-slide" style={{marginBottom:'4rem'}}>
        <div style={{display:'flex', alignItems:'center', gap:'20px', marginBottom:'2rem'}}>
           {data.image && <img src={data.image} alt="Profile" style={{width:'100px', height:'100px', borderRadius:'12px', objectFit:'cover', border:'2px solid white'}} />}
           <div>
              <h1 className="big-title" style={{color: template.color, fontSize:'3.5rem', marginBottom:'0'}}>{data.fullName || "CREATIVE"}</h1>
              <h2 style={{color: template.textColor, opacity:0.8, marginTop:'5px'}}>{data.role}</h2>
           </div>
        </div>

        <div className="creative-contact">
           {data.email && <span style={{color: template.textColor}}>{data.email}</span>}
           {data.phone && <span style={{color: template.textColor}}>{data.phone}</span>}
           {data.linkedin && <a href={data.linkedin} target="_blank" rel="noreferrer" className="icon-box" style={{color: template.textColor}}>{ICONS.linkedin} LinkedIn</a>}
           {data.github && <a href={data.github} target="_blank" rel="noreferrer" className="icon-box" style={{color: template.textColor}}>{ICONS.github} GitHub</a>}
        </div>
        
        <p style={{color: template.textColor, opacity:0.7, maxWidth:'600px', marginTop:'1.5rem', fontSize:'1.2rem', lineHeight:'1.6'}}>{data.about}</p>
        {data.resume && <a href={data.resume} download className="btn-resume" style={{background: template.textColor, color: template.bgClass.includes('dark') ? 'black' : 'white', border:'none'}}>Download Document</a>}
      </header>

      <section className="anim-pop" style={{marginBottom:'3rem'}}>
        <h3 style={{color: template.textColor, marginBottom:'1rem'}}>SKILLSET</h3>
        <div style={{display:'flex', flexWrap:'wrap', gap:'15px'}}>
           {data.skills && data.skills.split(',').map((s,i) => (
             <span key={i} style={{background: template.textColor, color: template.bgClass.includes('dark') ? 'black' : 'white', padding:'8px 16px', fontWeight:'bold', borderRadius:'20px'}}>{s}</span>
           ))}
        </div>
      </section>

      <section className="anim-slide">
        <h3 style={{color: template.textColor, marginBottom:'2rem'}}>PROJECTS</h3>
        {data.projects.map(p => (
          <div key={p.id} className="card-bold" style={{borderColor: 'rgba(255,255,255,0.2)'}}>
            <h2 style={{color: template.color, marginBottom:'0.5rem'}}>{p.title}</h2>
            <p style={{color: template.textColor, opacity:0.7, marginBottom:'1rem'}}>{p.desc}</p>
            {p.link && <a href={p.link} target="_blank" rel="noreferrer" style={{color: template.textColor, textDecoration:'underline'}}>Explore Project</a>}
          </div>
        ))}
      </section>

      {data.achievements.length > 0 && (
        <section className="anim-slide" style={{marginTop:'3rem'}}>
           <h3 style={{color: template.textColor, marginBottom:'1rem'}}>HONORS & AWARDS</h3>
           <div className="achievements-list">
              {data.achievements.map((ach) => (
                 <div key={ach.id} className="achievement-box" style={{borderColor: template.color}}>
                    <strong style={{display:'block', fontSize:'1.1rem', color: template.textColor}}>{ach.title}</strong>
                    <span style={{fontSize:'0.9rem', color: template.textColor, opacity:0.7}}>{ach.desc}</span>
                    {ach.image && <a href={ach.image} target="_blank" rel="noreferrer" style={{color: template.textColor, textDecoration:'underline', fontSize:'0.8rem', display:'block', marginTop:'5px'}}>View Certificate</a>}
                 </div>
              ))}
           </div>
        </section>
      )}
    </div>
  );
}