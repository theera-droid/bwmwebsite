// รอให้หน้าเว็บโหลดโครงสร้าง HTML เสร็จก่อน ค่อยเริ่มทำงานสคริปต์
document.addEventListener('DOMContentLoaded', function () {

    // --------------------------------------------------
    // 1. ระบบเมนูมือถือ (Hamburger Menu)
    // --------------------------------------------------
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // ตรวจสอบว่ามีปุ่มแฮมเบอร์เกอร์อยู่ไหม
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            // สลับคลาส active เพื่อเปิด/ปิดเมนู
            navLinks.classList.toggle('active');
        });

        // เมื่อคลิกที่ลิงก์ในเมนู ให้ปิดเมนูอัตโนมัติ (ยกเว้นปุ่ม Dropdown สินค้า)
        const links = document.querySelectorAll('.nav-links li a:not(.dropdown > a)');
        links.forEach(link => {
            link.addEventListener('click', function () {
                navLinks.classList.remove('active');
            });
        });
    }

    // --------------------------------------------------
    // 2. ระบบ เปิด/ปิด Dropdown เมนูสำหรับหน้าจอมือถือ
    // --------------------------------------------------
    const dropdownToggle = document.querySelector('.dropdown > a');
    const dropdown = document.querySelector('.dropdown');

    if (dropdownToggle && dropdown) {
        dropdownToggle.addEventListener('click', function (e) {
            // เช็คว่าความกว้างหน้าจอเป็นมือถือหรือไม่ (เล็กกว่า 768px)
            if (window.innerWidth <= 768) {
                e.preventDefault(); // ป้องกันไม่ให้เด้งไปหน้า #products ทันทีเมื่อกด
                dropdown.classList.toggle('active'); // สลับการ กาง/หุบ
            }
        });
    }

    // --------------------------------------------------
    // 3. ระบบแจ้งเตือนฟอร์มติดต่อเรา
    // --------------------------------------------------
    // --------------------------------------------------
    // ระบบส่งอีเมล Formspree แบบไม่เปลี่ยนหน้า (AJAX)
    // --------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault(); // คำสั่งนี้แหละที่ป้องกันไม่ให้เด้งไปหน้าอื่น

            // เปลี่ยนข้อความปุ่มและสถานะระหว่างรอส่ง
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'กำลังส่ง...';
            submitBtn.disabled = true;
            formStatus.innerHTML = '';

            const data = new FormData(contactForm);

            try {
                const response = await fetch(contactForm.action, {
                    method: contactForm.method,
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formStatus.innerHTML = "✅ ส่งข้อความสำเร็จ! เราจะติดต่อกลับโดยเร็วที่สุด";
                    formStatus.style.color = "green";
                    contactForm.reset(); // ล้างข้อมูลในช่องกรอก
                } else {
                    formStatus.innerHTML = "❌ เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง";
                    formStatus.style.color = "red";
                }
            } catch (error) {
                formStatus.innerHTML = "❌ ไม่สามารถส่งข้อมูลได้ กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต";
                formStatus.style.color = "red";
            }

            // คืนค่าปุ่มกลับมาเหมือนเดิม
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        });
    }
    // --------------------------------------------------
    // 4. ระบบเปิด PDF หรือ Modal สำหรับดูสเปคสินค้า
    // --------------------------------------------------
    const modal = document.getElementById('productModal');

    if (modal) {
        const closeBtn = document.querySelector('.close-modal');
        const modalNormalContent = document.getElementById('modalNormalContent');
        const modalContentBox = document.querySelector('.modal-content');

        const detailButtons = document.querySelectorAll('.view-details-btn');

        detailButtons.forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();

                const pdfFile = this.getAttribute('data-pdf');

                if (pdfFile) {
                    // 🌟 ถ้ามีไฟล์ PDF: เปิดแท็บใหม่ไปที่ไฟล์ PDF เลย
                    window.open(pdfFile, '_blank');
                } else {
                    // 🌟 ถ้าไม่มี PDF: โชว์รูปและสเปคแบบปกติ

                    // คืนค่ารูปแบบกล่อง Modal ให้เป็นปกติ
                    if (modalNormalContent) modalNormalContent.style.display = 'block';
                    if (modalContentBox) {
                        modalContentBox.style.maxWidth = '500px';
                        modalContentBox.style.width = '100%';
                        modalContentBox.style.background = 'white';
                        modalContentBox.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
                        modalContentBox.style.padding = '30px';
                    }
                    if (closeBtn) {
                        closeBtn.style.color = '#333';
                        closeBtn.style.fontSize = '28px';
                    }

                    const title = this.getAttribute('data-title');
                    const specs = this.getAttribute('data-specs');
                    const imgSrc = this.getAttribute('data-img');
                    const emoji = this.getAttribute('data-emoji');

                    const modalTitle = document.getElementById('modalTitle');
                    const modalSpecs = document.getElementById('modalSpecs');
                    const modalImageContent = document.getElementById('modalImageContent');
                    const modalEmoji = document.getElementById('modalEmoji');
                    const modalImageContainer = document.getElementById('modalImageContainer');

                    if (modalTitle) modalTitle.innerText = title;

                    if (modalSpecs && specs) {
                        const specsArray = specs.split('|');
                        let specsHTML = '';
                        specsArray.forEach(spec => {
                            if (spec.trim() !== "") specsHTML += `<li>✅ ${spec.trim()}</li>`;
                        });
                        modalSpecs.innerHTML = specsHTML;
                    }

                    if (modalImageContainer && modalImageContent && modalEmoji) {
                        if (imgSrc) {
                            modalImageContent.src = imgSrc;
                            modalImageContent.style.display = 'block';
                            modalEmoji.style.display = 'none';
                            modalImageContainer.style.background = 'transparent';
                        } else {
                            modalImageContent.src = '';
                            modalImageContent.style.display = 'none';
                            modalEmoji.textContent = emoji ? emoji : '📷';
                            modalEmoji.style.display = 'inline-block';
                            modalImageContainer.style.background = 'var(--light-blue)';
                        }
                    }

                    modal.style.display = 'flex';
                }
            });
        });

        // ฟังก์ชันปิด Modal 
        const closeModalFn = function () {
            modal.style.display = 'none';
        };

        if (closeBtn) closeBtn.addEventListener('click', closeModalFn);
        window.addEventListener('click', function (event) {
            if (event.target === modal) closeModalFn();
        });
    }

    // --------------------------------------------------
    // ระบบ เปิด-ปิด แชท (อยู่ใน DOMContentLoaded)
    // --------------------------------------------------
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

        closeChatBtn.addEventListener('click', () => {
            chatWindow.style.display = 'none';
            chatBtn.style.display = 'flex';
        });
    }

    if (chatSendBtn && chatInput) {
        chatSendBtn.addEventListener('click', sendUserMessage);
        chatInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') sendUserMessage();
        });
    }

}); // <--- ปิดวงเล็บของ DOMContentLoaded (ห้ามลบเด็ดขาด)

// =====================================================
// ฟังก์ชันของบอท (ย้ายออกมาด้านนอก เพื่อให้ปุ่มหาเจอ)
// =====================================================

// 1. ฟังก์ชันเช็คคำและเลือกคำตอบ
function getBotResponse(userText) {
    const text = userText.toLowerCase();

    // ==========================================
    // ปุ่มย้อนกลับสู่เมนูหลัก (สำคัญมาก ใส่ไว้บนสุด)
    // ==========================================
    if (text.includes("ย้อนกลับ") || text.includes("เมนูหลัก")) {
        return `เลือกหมวดหมู่ที่ต้องการให้เราช่วยเหลือได้เลยครับ 👇<br><br>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                    <button class="chat-opt-btn" onclick="selectChatOption('หมวดหมู่สินค้า')">หมวดหมู่สินค้า</button>
                    <button class="chat-opt-btn" onclick="selectChatOption('ติดต่อเรา')">ติดต่อเรา</button>
                </div>`;
    }

    // ==========================================
    // 1. หมวดหมู่สินค้า
    // ==========================================
    else if (text.includes("หมวดหมู่สินค้า") || text.includes("สินค้า")) {
        return `เลือกหมวดหมู่สินค้าที่คุณลูกค้าสนใจด้านล่างได้เลยครับ 👇<br><br>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                    <button class="chat-opt-btn" onclick="selectChatOption('Patient Monitor')">1. Patient Monitor</button>
                    <button class="chat-opt-btn" onclick="selectChatOption('Vital Sign')">2. Vital Sign</button>
                    <button class="chat-opt-btn" onclick="selectChatOption('EKG Machine')">3. EKG Machine</button>
                    <button class="chat-opt-btn" onclick="selectChatOption('Defibrillator')">4. Defibrillator</button>
                    <button class="chat-opt-btn" onclick="selectChatOption('Infusion Pump')">5. Infusion Pump</button>
                    <button class="chat-opt-btn" onclick="selectChatOption('Ventilator')">6. Ventilator</button>
                    <button class="chat-opt-btn" onclick="selectChatOption('ย้อนกลับ')" style="background: #f0f0f0; color: #333;">⬅️ กลับเมนูหลัก</button>
                </div>`;
    }
    // ตอบกลับสินค้าต่างๆ (พร้อมปุ่มย้อนกลับ)
    else if (text.includes("monitor") || text.includes("มอนิเตอร์")) {
        return `ดูรายละเอียด สเปค และรุ่นต่างๆ ของ <b>Patient Monitor</b> ได้ที่นี่ครับ 👉 <a href="monitor.html">คลิกดูสินค้ารุ่นต่างๆ</a><br><br><button class="chat-opt-btn" onclick="selectChatOption('ย้อนกลับ')" style="background: #f0f0f0; color: #333; padding: 5px; font-size: 13px;">⬅️ กลับเมนูหลัก</button>`;
    }
    else if (text.includes("vital")) {
        return `ดูรายละเอียดและรุ่นต่างๆ ของ <b>Vital Sign</b> ได้ที่นี่ครับ 👉 <a href="vitalsign.html">คลิกดูสินค้ารุ่นต่างๆ</a><br><br><button class="chat-opt-btn" onclick="selectChatOption('ย้อนกลับ')" style="background: #f0f0f0; color: #333; padding: 5px; font-size: 13px;">⬅️ กลับเมนูหลัก</button>`;
    }
    else if (text.includes("ekg")) {
        return `ดูรายละเอียดและรุ่นต่างๆ ของ <b>EKG Machine</b> ได้ที่นี่ครับ 👉 <a href="ekg.html">คลิกดูสินค้ารุ่นต่างๆ</a><br><br><button class="chat-opt-btn" onclick="selectChatOption('ย้อนกลับ')" style="background: #f0f0f0; color: #333; padding: 5px; font-size: 13px;">⬅️ กลับเมนูหลัก</button>`;
    }
    else if (text.includes("defib")) {
        return `ดูรายละเอียดและรุ่นต่างๆ ของ <b>Defibrillator</b> ได้ที่นี่ครับ 👉 <a href="defib.html">คลิกดูสินค้ารุ่นต่างๆ</a><br><br><button class="chat-opt-btn" onclick="selectChatOption('ย้อนกลับ')" style="background: #f0f0f0; color: #333; padding: 5px; font-size: 13px;">⬅️ กลับเมนูหลัก</button>`;
    }
    else if (text.includes("infusion") || text.includes("pump") || text.includes("ปั๊ม")) {
        return `ดูรายละเอียดและรุ่นต่างๆ ของ <b>Infusion Pump</b> ได้ที่นี่ครับ 👉 <a href="pump.html">คลิกดูสินค้ารุ่นต่างๆ</a><br><br><button class="chat-opt-btn" onclick="selectChatOption('ย้อนกลับ')" style="background: #f0f0f0; color: #333; padding: 5px; font-size: 13px;">⬅️ กลับเมนูหลัก</button>`;
    }
    else if (text.includes("vent") || text.includes("หายใจ")) {
        return `ดูรายละเอียดและรุ่นต่างๆ ของ <b>Ventilator</b> ได้ที่นี่ครับ 👉 <a href="vent.html">คลิกดูสินค้ารุ่นต่างๆ</a><br><br><button class="chat-opt-btn" onclick="selectChatOption('ย้อนกลับ')" style="background: #f0f0f0; color: #333; padding: 5px; font-size: 13px;">⬅️ กลับเมนูหลัก</button>`;
    }

    // ==========================================
    // 2. ติดต่อเรา (แยก แอดมิน กับ ช่าง)
    // ==========================================

    // 2.1 ลูกค้ากดเลือก แอดมิน (ต้องเช็คคำว่า 'แอดมิน' ก่อน 'ติดต่อ')
    else if (text.includes("แอดมิน")) {
        return `สำหรับสอบถามข้อมูลทั่วไป แจ้งปัญหา หรือสอบถามสถานะสินค้า ติดต่อแอดมินได้เลยครับ 👇<br><br>
                📞 โทร : <a href="tel:0841424140">084-142-4140</a><br>
                <img src="pic/line.png" alt="LINE" style="width: 20px; height: 20px;"> <a href="https://line.me/ti/p/~YOUR_LINE_ID" target="_blank">เพิ่มเพื่อนใน LINE</a><br>
                <img src="pic/mail.png" alt="mail" style="width: 20px; height: 20px;"> <a href="mailto:beworldmedical@gmail.com">คลิกเพื่อติดต่อทางอีเมล</a><br>
                📍 แผนที่: <a href="https://www.google.com/maps/search/?api=1&query=25/31+หมู่ที่+12+ต.บึงคำพร้อม+อ.ลำลูกกา+จ.ปทุมธานี+12150" target="_blank">คลิกเพื่อเปิด Google Maps</a>
                <br><br><button class="chat-opt-btn" onclick="selectChatOption('ย้อนกลับ')" style="background: #f0f0f0; color: #333; padding: 5px; font-size: 13px;">⬅️ กลับเมนูหลัก</button>`;
    }

    // 2.2 ลูกค้ากดเลือก ช่าง (ต้องเช็คคำว่า 'ช่าง' ก่อน 'ติดต่อ')
    else if (text.includes("ช่าง") || text.includes("ซ่อม") || text.includes("เสีย") || text.includes("เคลม")) {
        return `สำหรับการแจ้งซ่อม เคลมสินค้า หรือปรึกษาปัญหาการใช้งาน แจ้งทีมช่างโดยตรงที่ช่องทางนี้เลยครับ 👇<br><br>
                📞 โทร : <a href="tel:0841424140">084-142-4140</a><br>
                <img src="pic/line.png" alt="LINE" style="width: 20px; height: 20px;"> <a href="https://line.me/ti/p/~YOUR_LINE_ID" target="_blank">เพิ่มเพื่อนใน LINE</a><br>
                <img src="pic/mail.png" alt="mail" style="width: 20px; height: 20px;"> <a href="mailto:beworldmedical@gmail.com">คลิกเพื่อติดต่อทางอีเมล</a><br>
                📍 แผนที่: <a href="https://www.google.com/maps/search/?api=1&query=25/31+หมู่ที่+12+ต.บึงคำพร้อม+อ.ลำลูกกา+จ.ปทุมธานี+12150" target="_blank">คลิกเพื่อเปิด Google Maps</a>
                <br><br><button class="chat-opt-btn" onclick="selectChatOption('ย้อนกลับ')" style="background: #f0f0f0; color: #333; padding: 5px; font-size: 13px;">⬅️ กลับเมนูหลัก</button>`;
    }

    // 2.3 เมนูติดต่อเราหลัก (เอาไว้เช็คเป็นลำดับสุดท้ายของหมวดนี้)
    else if (text.includes("ติดต่อเรา") || text.includes("ติดต่อ")) {
        return `ต้องการติดต่อสอบถามเรื่องไหนเป็นพิเศษ เลือกได้เลยครับ 👇<br><br>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                    <button class="chat-opt-btn" onclick="selectChatOption('ติดต่อแอดมิน')">👩‍💼 ติดต่อแอดมิน (สอบถามทั่วไป)</button>
                    <button class="chat-opt-btn" onclick="selectChatOption('ติดต่อช่าง')">🛠️ ติดต่อช่าง (แจ้งซ่อม/เคลม)</button>
                    <button class="chat-opt-btn" onclick="selectChatOption('ย้อนกลับ')" style="background: #f0f0f0; color: #333;">⬅️ กลับเมนูหลัก</button>
                </div>`;
    }

    // ==========================================
    // คำตอบมาตรฐาน (เมื่อพิมพ์อย่างอื่น)
    // ==========================================
    else {
        return `แอดมินบันทึกเรื่องไว้แล้ว จะรีบให้เจ้าหน้าที่ติดต่อกลับนะครับ 🙏<br><br>หรือโทรสอบถามด่วนที่เบอร์: <a href='tel:0841424140'>084-142-4140</a>
               <br><br><button class="chat-opt-btn" onclick="selectChatOption('ย้อนกลับ')" style="background: #f0f0f0; color: #333; padding: 5px; font-size: 13px;">⬅️ กลับเมนูหลัก</button>`;
    }
}

// 2. ฟังก์ชันพิมพ์แชทเอง
function sendUserMessage() {
    const chatInput = document.getElementById('chatInput');
    const text = chatInput.value.trim();
    if (text === "") return;

    const chatBody = document.getElementById('chatBody');

    // แสดงข้อความลูกค้า
    chatBody.innerHTML += `<div class="chat-msg user-msg">${text}</div>`;
    chatBody.scrollTop = chatBody.scrollHeight;
    chatInput.value = '';

    // หน่วงเวลาให้บอทตอบ
    setTimeout(() => {
        const botReply = getBotResponse(text);
        chatBody.innerHTML += `
            <div class="bot-msg-wrapper">
                <div class="bot-avatar">
                    <img src="pic/icon-icons.svg" alt="Admin">
                </div>
                <div class="chat-msg bot-msg">${botReply}</div>
            </div>`;
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 800);
}

// 3. ฟังก์ชันเมื่อลูกค้ากดปุ่มเลือกสินค้าในแชท
function selectChatOption(optionText) {
    const chatBody = document.getElementById('chatBody');

    // แสดงข้อความลูกค้าแบบปุ่มที่กด
    chatBody.innerHTML += `<div class="chat-msg user-msg">${optionText}</div>`;
    chatBody.scrollTop = chatBody.scrollHeight;

    // หน่วงเวลาให้บอทตอบ
    setTimeout(() => {
        const botReply = getBotResponse(optionText);
        chatBody.innerHTML += `
            <div class="bot-msg-wrapper">
                <div class="bot-avatar">
                    <img src="pic/icon-icons.svg" alt="Admin">
                </div>
                <div class="chat-msg bot-msg">${botReply}</div>
            </div>`;
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 800);
}
// ฟังก์ชันสำหรับเปิด-ปิดกรอบ FAQ
function toggleFaq(element) {
    // หา div ที่ครอบปุ่มนี้อยู่ (คือ .faq-item)
    const faqItem = element.parentElement;
    
    // ตรวจสอบว่ากรอบนี้กำลังเปิดอยู่หรือไม่
    const isActive = faqItem.classList.contains('active');
    
    // ถ้าอยากให้เวลาเปิดอันนึง แล้วอันอื่นปิดอัตโนมัติ ให้เปิดใช้โค้ด 3 บรรทัดด้านล่างนี้
    // const allItems = document.querySelectorAll('.faq-item');
    // allItems.forEach(item => item.classList.remove('active'));

    // ถ้าเดิมไม่ได้เปิดอยู่ ให้ใส่คลาส active (เพื่อเปิด)
    if (!isActive) {
        faqItem.classList.add('active');
    } else {
        faqItem.classList.remove('active'); // ถ้าเปิดอยู่ ให้เอาออก (เพื่อปิด)
    }
}
// --------------------------------------------------
    // ระบบไฮไลท์เมนูอัตโนมัติเมื่อเลื่อนหน้าจอ (Optimized Version)
    // --------------------------------------------------
    // 1. ค้นหาเมนูและเนื้อหาเตรียมไว้เลยตั้งแต่เว็บโหลดเสร็จ (ลดอาการหน่วง)
    const sections = document.querySelectorAll('section[id], div[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-links li a');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            
            // 2. ปรับระยะเผื่อตรงนี้! เปลี่ยนจาก 120 เป็น 250 
            // (แปลว่าไม่ต้องรอให้ถึงขอบบนสุด แค่โผล่มานิดนึงก็เปลี่ยนเมนูให้เลย)
            if (scrollY >= (sectionTop - 250)) {
                current = section.getAttribute('id');
            }
        });

        if (current) {
            navLinks.forEach(link => {
                // เอาเส้นใต้อันเก่าออก
                link.classList.remove('active-menu');
                
                // ใส่เส้นใต้อันใหม่ทันทีที่เจอ
                const href = link.getAttribute('href');
                if (href && href.includes('#' + current)) {
                    link.classList.add('active-menu');
                }
            });
        }
    });

    // ให้ทำงานทันที 1 ครั้งตอนโหลดหน้า
    window.dispatchEvent(new Event('scroll'));

