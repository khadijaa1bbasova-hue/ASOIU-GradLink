// Modal Pəncərəsinin Açılması
function openModal(type) {
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalForm = document.getElementById('modal-form');

  modal.style.display = 'flex';

  if (type === 'login') {
    modalTitle.innerText = 'Platformaya Daxil Ol';
    modalForm.innerHTML = `
      <div class="form-group">
        <label>E-poçt</label>
        <input type="email" placeholder="ornek@adnsu.edu.az" required>
      </div>
      <div class="form-group">
        <label>Şifrə</label>
        <input type="password" placeholder="********" required>
      </div>
      <button type="submit" class="btn btn-accent" style="width: 100%; margin-top: 1rem;">Daxil Ol</button>
    `;
  } else if (type === 'register') {
    modalTitle.innerText = 'Yeni Hesab Yarat';
    modalForm.innerHTML = `
      <div class="form-group">
        <label>Ad və Soyad</label>
        <input type="text" placeholder="Ad Soyad" required>
      </div>
      <div class="form-group">
        <label>Rol</label>
        <select id="role-select" onchange="toggleRoleFields()">
          <option value="student">Tələbə / Məzun</option>
          <option value="company">Şirkət / İşəgötürən</option>
          <option value="mentor">Mentor</option>
        </select>
      </div>
      <div class="form-group">
        <label>E-poçt</label>
        <input type="email" placeholder="ornek@adnsu.edu.az" required>
      </div>
      <div class="form-group">
        <label>Şifrə</label>
        <input type="password" placeholder="********" required>
      </div>
      <button type="submit" class="btn btn-accent" style="width: 100%; margin-top: 1rem;">Qeydiyyatdan Keç</button>
    `;
  }
}

// Modal Pəncərəsinin Bağlanması
function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}

// Modal xaricinə kliklədikdə bağlanması
window.onclick = function(event) {
  const modal = document.getElementById('modal');
  if (event.target === modal) {
    closeModal();
  }
}

// Form göndərilməsi zamanı simulyasiya
function handleFormSubmit(event) {
  event.preventDefault();
  alert('Əməliyyat uğurla yerinə yetirildi!');
  closeModal();
}
