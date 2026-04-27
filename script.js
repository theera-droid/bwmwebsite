const currentLang = document.documentElement.lang === 'en' ? 'en' : 'th';

// ==========================================
// ย้ายฟังก์ชันสร้างข้อความและข้อมูล (Data) ออกมาไว้ด้านนอก
// เพื่อให้ฟังก์ชันแชท (ที่อยู่ด้านล่าง) สามารถเรียกใช้งานได้
// ==========================================
const localizedPage = (slug) => currentLang === 'en' ? `${slug}_en.html` : `${slug}.html`;

const uiText = {
    th: {
        sending: 'กำลังส่ง...',
        formSuccess: '✅ ส่งข้อความสำเร็จ! เราจะติดต่อกลับโดยเร็วที่สุด',
        formError: '❌ เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง',
        formNetworkError: '❌ ไม่สามารถส่งข้อมูลได้ กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต'
    },
    en: {
        sending: 'Sending...',
        formSuccess: '✅ Your message was sent successfully. We will get back to you as soon as possible.',
        formError: '❌ Something went wrong. Please try again.',
        formNetworkError: '❌ We could not send your message. Please check your internet connection.'
    }
};

function renderChatMainMenu() {
    if (currentLang === 'en') {
        return `How can we help you today? 👇<br><br>
            <div style="display: flex; flex-direction: column; gap: 8px;">
                <button class="chat-opt-btn" onclick="selectChatOption('Product Categories')">Product Categories</button>
                <button class="chat-opt-btn" onclick="selectChatOption('Contact Us')">Contact Us</button>
            </div>`;
    }

    return `เลือกหมวดหมู่ที่ต้องการให้เราช่วยเหลือได้เลยครับ 👇<br><br>
        <div style="display: flex; flex-direction: column; gap: 8px;">
            <button class="chat-opt-btn" onclick="selectChatOption('หมวดหมู่สินค้า')">หมวดหมู่สินค้า</button>
            <button class="chat-opt-btn" onclick="selectChatOption('ติดต่อเรา')">ติดต่อเรา</button>
        </div>`;
}

function renderChatProductMenu() {
    const backValue = currentLang === 'en' ? 'Back' : 'ย้อนกลับ';
    const backLabel = currentLang === 'en' ? 'Back to Main Menu' : 'กลับเมนูหลัก';

    return `${currentLang === 'en' ? 'Please choose a product category below 👇' : 'เลือกหมวดหมู่สินค้าที่คุณลูกค้าสนใจด้านล่างได้เลยครับ 👇'}<br><br>
        <div style="display: flex; flex-direction: column; gap: 8px;">
            <button class="chat-opt-btn" onclick="selectChatOption('Fetal Monitor')">1. Fetal Monitor</button>
            <button class="chat-opt-btn" onclick="selectChatOption('Patient Monitor')">2. Patient Monitor</button>
            <button class="chat-opt-btn" onclick="selectChatOption('Vital Sign')">3. Vital Sign</button>
            <button class="chat-opt-btn" onclick="selectChatOption('EKG Machine')">4. EKG Machine</button>
            <button class="chat-opt-btn" onclick="selectChatOption('Defibrillator')">5. Defibrillator</button>
            <button class="chat-opt-btn" onclick="selectChatOption('Infusion Pump')">6. Infusion Pump</button>
            <button class="chat-opt-btn" onclick="selectChatOption('Ventilator')">7. Ventilator</button>
            <button class="chat-opt-btn" onclick="selectChatOption('Blood Pressure')">8. Blood Pressure Monitor</button>
            <button class="chat-opt-btn" onclick="selectChatOption('${backValue}')" style="background: #f0f0f0; color: #333;">⬅ ${backLabel}</button>
        </div>`;
}

function renderChatContactMenu() {
    if (currentLang === 'en') {
        return `What would you like to contact us about? 👇<br><br>
            <div style="display: flex; flex-direction: column; gap: 8px;">
                <button class="chat-opt-btn" onclick="selectChatOption('Contact Admin')">General Inquiry / Admin</button>
                <button class="chat-opt-btn" onclick="selectChatOption('Contact Service')">Repair / Service Team</button>
                <button class="chat-opt-btn" onclick="selectChatOption('Back')" style="background: #f0f0f0; color: #333;">⬅ Back to Main Menu</button>
            </div>`;
    }

    return `ต้องการติดต่อสอบถามเรื่องไหนเป็นพิเศษ เลือกได้เลยครับ 👇<br><br>
        <div style="display: flex; flex-direction: column; gap: 8px;">
            <button class="chat-opt-btn" onclick="selectChatOption('ติดต่อแอดมิน')">👩‍💼 ติดต่อแอดมิน (สอบถามทั่วไป)</button>
            <button class="chat-opt-btn" onclick="selectChatOption('ติดต่อช่าง')">🛠️ ติดต่อช่าง (แจ้งซ่อม/เคลม)</button>
            <button class="chat-opt-btn" onclick="selectChatOption('ย้อนกลับ')" style="background: #f0f0f0; color: #333;">⬅ กลับเมนูหลัก</button>
        </div>`;
}

function renderChatProductLink(label, slug) {
    const href = localizedPage(slug);
    const backValue = currentLang === 'en' ? 'Back' : 'ย้อนกลับ';
    const backLabel = currentLang === 'en' ? 'Back to Main Menu' : 'กลับเมนูหลัก';
    const bodyText = currentLang === 'en'
        ? `You can view the details, specifications, and available models for <b>${label}</b> here`
        : `ดูรายละเอียด สเปค และรุ่นต่างๆ ของ <b>${label}</b> ได้ที่นี่ครับ`;
    const linkText = currentLang === 'en' ? 'View product details' : 'คลิกดูสินค้ารุ่นต่างๆ';

    return `${bodyText} 👉 <a href="${href}">${linkText}</a><br><br><button class="chat-opt-btn" onclick="selectChatOption('${backValue}')" style="background: #f0f0f0; color: #333; padding: 5px; font-size: 13px;">⬅ ${backLabel}</button>`;
}

function renderChatAdminContact() {
    const mapLink = 'https://maps.app.goo.gl/gCP5m2x4kXBECn138';

    if (currentLang === 'en') {
        return `For general inquiries, product information, or stock availability, please contact our admin team below 👇<br><br>
            📞 Phone: <a href="tel:0841424140">084-142-4140</a><br>
            <img src="assets/img/line.png" alt="LINE" style="width: 20px; height: 20px;"> <a href="https://line.me/ti/p/~bwm2531" target="_blank">Add us on LINE</a><br>
            <img src="assets/img/mail.png" alt="mail" style="width: 20px; height: 20px;"> <a href="mailto:beworldmedical@gmail.com">Email us</a><br>
            📍 Map: <a href="${mapLink}" target="_blank">Open Google Maps</a>
            <br><br><button class="chat-opt-btn" onclick="selectChatOption('Back')" style="background: #f0f0f0; color: #333; padding: 5px; font-size: 13px;">⬅ Back to Main Menu</button>`;
    }

    return `สำหรับสอบถามข้อมูลทั่วไป แจ้งปัญหา หรือสอบถามสถานะสินค้า ติดต่อแอดมินได้เลยครับ 👇<br><br>
        📞 โทร : <a href="tel:0841424140">084-142-4140</a><br>
        <img src="assets/img/line.png" alt="LINE" style="width: 20px; height: 20px;"> <a href="https://line.me/ti/p/~bwm2531" target="_blank">เพิ่มเพื่อนใน LINE</a><br>
        <img src="assets/img/mail.png" alt="mail" style="width: 20px; height: 20px;"> <a href="mailto:beworldmedical@gmail.com">คลิกเพื่อติดต่อทางอีเมล</a><br>
        📍 แผนที่: <a href="${mapLink}" target="_blank">คลิกเพื่อเปิด Google Maps</a>
        <br><br><button class="chat-opt-btn" onclick="selectChatOption('ย้อนกลับ')" style="background: #f0f0f0; color: #333; padding: 5px; font-size: 13px;">⬅ กลับเมนูหลัก</button>`;
}

function renderChatServiceContact() {
    const mapLink = 'https://www.google.com/maps/search/?api=1&query=25/31+หมู่ที่+12+ต.บึงคำพร้อม+อ.ลำลูกกา+จ.ปทุมธานี+12150';

    if (currentLang === 'en') {
        return `For repairs, warranty claims, or technical support, please contact our service team directly 👇<br><br>
            📞 Phone: <a href="tel:0811736470">081-173-6470</a><br>
            <img src="assets/img/line.png" alt="LINE" style="width: 20px; height: 20px;"> <a href="https://line.me/ti/p/~servicebwm" target="_blank">Add service LINE</a><br>
            <img src="assets/img/mail.png" alt="mail" style="width: 20px; height: 20px;"> <a href="mailto:beworldmedical@gmail.com">Email us</a><br>
            📍 Map: <a href="${mapLink}" target="_blank">Open Google Maps</a>
            <br><br><button class="chat-opt-btn" onclick="selectChatOption('Back')" style="background: #f0f0f0; color: #333; padding: 5px; font-size: 13px;">⬅ Back to Main Menu</button>`;
    }

    return `สำหรับการแจ้งซ่อม เคลมสินค้า หรือปรึกษาปัญหาการใช้งาน แจ้งทีมช่างโดยตรงที่ช่องทางนี้ได้เลยครับ 👇<br><br>
        📞 โทร : <a href="tel:0811736470">081-173-6470</a><br>
        <img src="assets/img/line.png" alt="LINE" style="width: 20px; height: 20px;"> <a href="https://line.me/ti/p/~servicebwm" target="_blank">เพิ่มเพื่อนใน LINE</a><br>
        <img src="assets/img/mail.png" alt="mail" style="width: 20px; height: 20px;"> <a href="mailto:beworldmedical@gmail.com">คลิกเพื่อติดต่อทางอีเมล</a><br>
        📍 แผนที่: <a href="${mapLink}" target="_blank">คลิกเพื่อเปิด Google Maps</a>
        <br><br><button class="chat-opt-btn" onclick="selectChatOption('ย้อนกลับ')" style="background: #f0f0f0; color: #333; padding: 5px; font-size: 13px;">⬅ กลับเมนูหลัก</button>`;
}

// --------------------------------------------------
// รอให้หน้าเว็บโหลดโครงสร้าง HTML เสร็จก่อน ค่อยเริ่มทำงานสคริปต์
// --------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {

    // 1. ระบบเมนูมือถือ (Hamburger Menu)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            navLinks.classList.toggle('active');
        });

        const links = document.querySelectorAll('.nav-links li a:not(.dropdown > a)');
        links.forEach(link => {
            link.addEventListener('click', function () {
                navLinks.classList.remove('active');
            });
        });
    }

    // 2. ระบบ เปิด/ปิด Dropdown เมนูสำหรับหน้าจอมือถือ
    const dropdownToggle = document.querySelector('.dropdown > a');
    const dropdown = document.querySelector('.dropdown');

    if (dropdownToggle && dropdown) {
        dropdownToggle.addEventListener('click', function (e) {
            if (window.innerWidth <= 768) {
                e.preventDefault(); 
                dropdown.classList.toggle('active'); 
            }
        });
    }

    const allSections = document.querySelectorAll('section[id], div[id], header[id]');
    const allMenuLinks = document.querySelectorAll('.nav-links > li > a');

    function updateActiveMenu() {
        let scrollY = window.scrollY;

        allSections.forEach(section => {
            const sectionTop = section.offsetTop - 150; 
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                allMenuLinks.forEach(link => {
                    link.classList.remove('active-menu');
                    const href = link.getAttribute('href');

                    if (href && (href.includes('#' + sectionId) || href === `#${sectionId}`)) {
                        link.classList.add('active-menu');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveMenu);
    updateActiveMenu();

    // 3. ระบบ Contact Form
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;

            submitBtn.innerHTML = uiText[currentLang].sending;
            submitBtn.disabled = true;

            const data = new FormData(contactForm);

            try {
                const response = await fetch(contactForm.action, {
                    method: contactForm.method,
                    body: data,
                    headers: {
                        Accept: 'application/json'
                    }
                });

                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'สำเร็จ',
                        text: uiText[currentLang].formSuccess,
                        confirmButtonColor: '#005A9C',
                        timer: 1000,
                        showConfirmButton: false
                    });

                    contactForm.reset();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: currentLang === 'en' ? 'Error' : 'ผิดพลาด',
                        text: uiText[currentLang].formError
                    });
                }

            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Network Error',
                    text: uiText[currentLang].formNetworkError
                });
            }

            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        });
    }

    // 4. ระบบ Modal สำหรับดูรายละเอียดสินค้า
    const modal = document.getElementById('productModal');

    if (modal) {
        const closeBtn = document.querySelector('.close-modal');
        const detailButtons = document.querySelectorAll('.view-details-btn');

        detailButtons.forEach(btn => {
            btn.addEventListener('click', function (e) {
                const pdfFile = this.getAttribute('data-pdf');
                if (!pdfFile) {
                    return;
                }

                e.preventDefault();
                window.open(pdfFile, '_blank');
            });
        });

        const closeModalFn = function () {
            modal.style.display = 'none';
        };

        if (closeBtn) {
            closeBtn.addEventListener('click', closeModalFn);
        }

        window.addEventListener('click', function (event) {
            if (event.target === modal) {
                closeModalFn();
            }
        });
    }

    // 5. ระบบ Chat Widget
    const chatBtn = document.getElementById('chatWidgetBtn');
    const chatWindow = document.getElementById('chatWidgetWindow');
    const closeChatBtn = document.getElementById('closeChatBtn');
    const chatInput = document.getElementById('chatInput');
    const chatSendBtn = document.getElementById('chatSendBtn');

    if (chatBtn && chatWindow) {
        chatBtn.addEventListener('click', () => {
            chatWindow.style.display = 'flex';
            chatBtn.style.display = 'none';
        });

        if (closeChatBtn) {
            closeChatBtn.addEventListener('click', () => {
                chatWindow.style.display = 'none';
                chatBtn.style.display = 'flex';
            });
        }
    }

    if (chatSendBtn && chatInput) {
        chatSendBtn.addEventListener('click', sendUserMessage);
        chatInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                sendUserMessage();
            }
        });
    }
}); // สิ้นสุด DOMContentLoaded

// ==========================================
// ฟังก์ชันของระบบแชท และ FAQ (อยู่ข้างนอก DOMContentLoaded)
// ==========================================
function getBotResponse(userText) {
    const text = userText.toLowerCase();

    if (text.includes('ย้อนกลับ') || text.includes('เมนูหลัก') || text === 'back' || text.includes('main menu')) {
        return renderChatMainMenu();
    }

    if (text.includes('หมวดหมู่สินค้า') || text.includes('สินค้า') || text.includes('product categories') || text.includes('products')) {
        return renderChatProductMenu();
    }

    if (text.includes('fetal') || text.includes('ทารก')) {
        return renderChatProductLink('Fetal Monitor', 'fetal');
    }
    if (text.includes('patient monitor') || text.includes('monitor')) {
        return renderChatProductLink('Patient Monitor', 'monitor');
    }
    if (text.includes('vital') || text.includes('สัญญาณชีพ')) {
        return renderChatProductLink('Vital Sign', 'vitalsign');
    }
    if (text.includes('ekg') || text.includes('ecg') || text.includes('คลื่นไฟฟ้าหัวใจ')) {
        return renderChatProductLink('EKG Machine', 'ekg');
    }
    if (text.includes('defib') || text.includes('aed') || text.includes('กระตุกหัวใจ')) {
        return renderChatProductLink('Defibrillator', 'defib');
    }
    if (text.includes('infusion') || text.includes('pump') || text.includes('ปั๊ม')) {
        return renderChatProductLink('Infusion Pump', 'pump');
    }
    if (text.includes('ventilator') || text.includes('vent') || text.includes('หายใจ')) {
        return renderChatProductLink('Ventilator', 'vent');
    }
    if (text.includes('blood pressure') || text.includes('blood') || text.includes('ความดัน')) {
        return renderChatProductLink('Blood Pressure Monitor', 'bp');
    }

    if (text.includes('contact admin') || text.includes('admin') || text.includes('แอดมิน')) {
        return renderChatAdminContact();
    }
    if (text.includes('contact service') || text.includes('service') || text.includes('repair') || text.includes('technician') || text.includes('ช่าง') || text.includes('ซ่อม') || text.includes('เคลม')) {
        return renderChatServiceContact();
    }
    if (text.includes('contact us') || text.includes('contact') || text.includes('ติดต่อเรา') || text.includes('ติดต่อ')) {
        return renderChatContactMenu();
    }

    if (currentLang === 'en') {
        return `Our team has recorded your message and will get back to you soon. 🙏<br><br>For urgent inquiries, please call <a href="tel:0841424140">084-142-4140</a>
                <br><br><button class="chat-opt-btn" onclick="selectChatOption('Back')" style="background: #f0f0f0; color: #333; padding: 5px; font-size: 13px;">⬅ Back to Main Menu</button>`;
    }

    return `แอดมินบันทึกเรื่องไว้แล้ว จะรีบให้เจ้าหน้าที่ติดต่อกลับนะครับ 🙏<br><br>หรือโทรสอบถามด่วนที่เบอร์: <a href="tel:0841424140">084-142-4140</a>
            <br><br><button class="chat-opt-btn" onclick="selectChatOption('ย้อนกลับ')" style="background: #f0f0f0; color: #333; padding: 5px; font-size: 13px;">⬅ กลับเมนูหลัก</button>`;
}

function sendUserMessage() {
    const chatInput = document.getElementById('chatInput');
    if (!chatInput) {
        return;
    }

    const text = chatInput.value.trim();
    if (text === '') {
        return;
    }

    const chatBody = document.getElementById('chatBody');
    if (!chatBody) {
        return;
    }

    chatBody.innerHTML += `<div class="chat-msg user-msg">${text}</div>`;
    chatBody.scrollTop = chatBody.scrollHeight;
    chatInput.value = '';

    setTimeout(() => {
        const botReply = getBotResponse(text);
        chatBody.innerHTML += `
            <div class="bot-msg-wrapper">
                <div class="bot-avatar">
                    <img src="assets/img/icon-icons.svg" alt="Admin">
                </div>
                <div class="chat-msg bot-msg">${botReply}</div>
            </div>`;
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 800);
}

function selectChatOption(optionText) {
    const chatBody = document.getElementById('chatBody');
    if (!chatBody) {
        return;
    }

    chatBody.innerHTML += `<div class="chat-msg user-msg">${optionText}</div>`;
    chatBody.scrollTop = chatBody.scrollHeight;

    setTimeout(() => {
        const botReply = getBotResponse(optionText);
        chatBody.innerHTML += `
            <div class="bot-msg-wrapper">
                <div class="bot-avatar">
                    <img src="assets/img/icon-icons.svg" alt="Admin">
                </div>
                <div class="chat-msg bot-msg">${botReply}</div>
            </div>`;
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 800);
}

function toggleFaq(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');

    if (!isActive) {
        faqItem.classList.add('active');
    } else {
        faqItem.classList.remove('active');
    }
}