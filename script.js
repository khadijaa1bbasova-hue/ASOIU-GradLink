// Mobile Navbar Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');

if(mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// FAQ Accordion Toggle
function toggleFaq(element) {
  const faqItem = element.parentElement;
  faqItem.classList.toggle('active');
}

// Hero Search Box redirect to talent section
function searchFromHero() {
  const query = document.getElementById('heroSearchInput').value;
  if(query) {
    document.getElementById('searchInput').value = query;
    filterTalents();
    document.getElementById('talents').scrollIntoView({ behavior: 'smooth' });
  }
}

// Dinamik Filtrləmə funksiyası
function filterTalents() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const cards = document.querySelectorAll('.student-card');

  cards.forEach(card => {
    const titleData = card.getAttribute('data-title').toLowerCase();
    if (titleData.includes(input)) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
}

// Modal pəncərə idarəsi (Giriş, Qeydiyyat və CV Yükləmə)
function openModal(type) {
  const modal = document.getElementById('modal');
  const title = document.getElementById('modal-title');
  const form = document.getElementById('modal-form');
  
  modal.style.display = 'flex';

  if (type === 'login') {
    title.innerText = 'ASOIU GradLink - Daxil Ol';
    form.innerHTML = `
      <div class="form-group">
        <label>Email və ya İstifadəçi Adı</label>
        <input type="email" id="loginEmail" placeholder="məs: student@asoiu.edu.az" required>
      </div>
      <div class="form-group">
        <label>Şifrə</label>
        <input type="password" id="loginPassword" placeholder="********" required>
      </div>
      <div style="text-align: right; margin-top: -5px;">
        <a href="#" onclick="alert('Şifrəni bərpa etmə linki emailinizə göndəriləcək.')" style="font-size: 0.8rem; color: var(--teal); text-decoration: none;">Şifrəni unutmusunuz?</a>
      </div>
      <button type="submit" class="btn btn-accent" style="margin-top: 1rem;">Daxil Ol</button>
    `;
  } else if (type === 'register') {
    title.innerText = 'ASOIU GradLink - Qeydiyyat';
    form.innerHTML = `
      <div class="form-group">
        <label>Ad və Soyad</label>
        <input type="text" id="regName" placeholder="Məs: Xədicə Abbaszadə" required>
      </div>
      <div class="form-group">
        <label>ADNSU Korporativ Email</label>
        <input type="email" id="regEmail" placeholder="student@asoiu.edu.az" required>
      </div>
      <div class="form-group">
        <label>Platformadakı Rolunuz</label>
        <select id="regRole" required>
          <option value="">Rol seçin</option>
          <option value="student">Tələbə / Məzun</option>
          <option value="mentor">Mentor</option>
          <option value="company">Tərəfdaş Şirkət</option>
        </select>
      </div>
      <div class="form-group">
        <label>Şifrə yaradın</label>
        <input type="password" id="regPassword" placeholder="********" required>
      </div>
      <button type="submit" class="btn btn-accent" style="margin-top: 1rem;">Qeydiyyatdan Keç</button>
    `;
  } else if (type === 'cv-upload') {
    title.innerText = 'CV və Profil Yükləmə Paneli';
    form.innerHTML = `
      <div class="form-group">
        <label>Ad və Soyadınız</label>
        <input type="text" id="newStudentName" placeholder="Məs: Leyla Əliyeva" required>
      </div>
      <div class="form-group">
        <label>İxtisas və Kurs</label>
        <input type="text" id="newStudentMajor" placeholder="Məs: Telekommunikasiya Mühəndisliyi, 4-cü kurs" required>
      </div>
      <div class="form-group">
        <label>Haqqınızda qısa məlumat</label>
        <textarea id="newStudentBio" placeholder="Maraq dairəniz və məqsədləriniz..." rows="3" required></textarea>
      </div>
      <div class="form-group">
        <label>Bacarıqlar (vergüllə ayırın)</label>
        <input type="text" id="newStudentSkills" placeholder="Python, Cisco CCNA, Network" required>
      </div>
      <div class="form-group">
        <label>CV Faylı (PDF)</label>
        <input type="file" accept=".pdf" required>
      </div>
      <button type="submit" class="btn btn-accent" style="margin-top: 1rem;">Profili Əlavə Et</button>
    `;
  }
}

// Form submit edildikdə işləyən idarəetmə mərkəzi
function handleFormSubmit(event) {
  event.preventDefault();
  const title = document.getElementById('modal-title').innerText;

  if (title.includes('CV')) {
    const name = document.getElementById('newStudentName').value;
    const major = document.getElementById('newStudentMajor').value;
    const bio = document.getElementById('newStudentBio').value;
    const skills = document.getElementById('newStudentSkills').value.split(',');

    const grid = document.getElementById('studentsGrid');
    const newCard = document.createElement('div');
    newCard.className = 'student-card';
    newCard.setAttribute('data-title', `${major} ${skills.join(' ')}`);

    let tagsHTML = skills.map(s => `<span class="tag">${s.trim()}</span>`).join('');

    newCard.innerHTML = `
      <div class="student-header">
        <h4>${name}</h4>
        <p class="student-major">${major}</p>
      </div>
      <p>${bio}</p>
      <div class="skills-tags">
        ${tagsHTML}
      </div>
      <button class="btn btn-outline" style="width: 100%; margin-top: 1rem;">CV-yə Bax</button>
    `;

    grid.prepend(newCard);
    alert('Təbriklər! Profiliniz və CV-niz uğurla əlavə edildi.');
  } 
  else if (title.includes('Daxil Ol')) {
    const email = document.getElementById('loginEmail').value;
    alert(`Uğurla daxil olundu! Xoş gəldiniz, ${email}`);
    updateNavbarAfterLogin(email);
  } 
  else if (title.includes('Qeydiyyat')) {
    const name = document.getElementById('regName').value;
    const role = document.getElementById('regRole').value;
    alert(`Təbriklər, ${name}! Qeydiyyatınız uğurla tamamlandı. Rol: ${role}`);
    updateNavbarAfterLogin(name);
  }

  closeModal();
}

// İstifadəçi daxil olduqdan sonra Navbar-dakı düymələri şəxsi kabinetlə əvəz edən funksiya
function updateNavbarAfterLogin(username) {
  const navButtons = document.querySelector('.nav-buttons');
  if(navButtons) {
    navButtons.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.8rem;">
        <span style="font-size: 0.9rem; font-weight: 600; color: var(--primary);"><i class="fa-solid fa-user-circle"></i> ${username}</span>
        <button class="btn btn-outline" onclick="location.reload()" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;">Çıxış</button>
      </div>
    `;
  }
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

window.onclick = function(event) {
  const modal = document.getElementById('modal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
}