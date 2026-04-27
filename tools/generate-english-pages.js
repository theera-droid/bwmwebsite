const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

const pages = {
    index: { th: 'index.html', en: 'index_en.html' },
    fetal: { th: 'fetal.html', en: 'fetal_en.html' },
    monitor: { th: 'monitor.html', en: 'monitor_en.html' },
    vitalsign: { th: 'vitalsign.html', en: 'vitalsign_en.html' },
    ekg: { th: 'ekg.html', en: 'ekg_en.html' },
    defib: { th: 'defib.html', en: 'defib_en.html' },
    pump: { th: 'pump.html', en: 'pump_en.html' },
    vent: { th: 'vent.html', en: 'vent_en.html' },
    bp: { th: 'bp.html', en: 'bp_en.html' }
};

const pageEntries = Object.entries(pages);

function read(file) {
    return fs.readFileSync(path.join(root, file), 'utf8');
}

function write(file, content) {
    fs.writeFileSync(path.join(root, file), content, 'utf8');
}

function replaceAll(content, replacements) {
    let out = content;
    for (const [from, to] of replacements) {
        out = out.split(from).join(to);
    }
    return out;
}

function setLangSwitcher(content, thFile, enFile, active) {
    const block = `            <div class="lang-switcher">
                <a href="${thFile}" class="${active === 'th' ? 'active' : ''}">TH</a>
                <span>|</span>
                <a href="${enFile}" class="${active === 'en' ? 'active' : ''}">EN</a>
            </div>`;

    return content.replace(/<div class="lang-switcher">[\s\S]*?<\/div>/, block);
}

function fixThai(content, key) {
    const generic = [
        ["onclick=\"window.open('assets/pdf/ND serie.pdf', '_blank')\"", "onclick=\"window.open('assets/pdf/nd.pdf', '_blank')\""],
        ["onclick=\"window.open('assets/pdf/NMPro serie.pdf', '_blank')\"", "onclick=\"window.open('assets/pdf/nm.pdf', '_blank')\""],
        ["onclick=\"window.open('assets/pdf/K serie.pdf', '_blank')\"", "onclick=\"window.open('assets/pdf/k.pdf', '_blank')\""],
        ['data-pdf="asset/pdf/AED.pdf"', 'data-pdf="assets/pdf/aed.pdf"'],
        ['data-pdf="assets/pdf/SP50 Pro.pdf"', 'data-pdf="assets/pdf/sp50.pdf"'],
        ['<img src="assets/" alt="Admin">', '<img src="assets/img/icon-icons.svg" alt="Admin">'],
        ['</section>>', '</section>']
    ];

    const specific = {
        fetal: [
            ['<title>Patient Monitor - BeWorld Medical</title>', '<title>Fetal Monitor - BeWorld Medical</title>']
        ],
        bp: [
            ['<h1>Fetal Monitor</h1>', '<h1>Blood Pressure Monitor</h1>'],
            ['เครื่องติดตามสัญญาณชีพทารก เทคโนโลยีขั้นสูง แม่นยำ', 'เครื่องวัดความดันโลหิตดิจิทัลความแม่นยำสูงสำหรับสถานพยาบาลและคลินิก']
        ]
    };

    return replaceAll(content, [...generic, ...(specific[key] || [])]);
}

function commonEnglish(content) {
    const replacements = [
        ['<html lang="th">', '<html lang="en">'],
        ['หน้าหลัก', 'Home'],
        ['เกี่ยวกับเรา', 'About Us'],
        ['สินค้าของเรา ▾', 'Our Products ▾'],
        ['ศูนย์ช่วยเหลือ (Help Center)', 'Help Center'],
        ['ศูนย์ช่วยเหลือ (Services)', 'Services'],
        ['ศูนย์ช่วยเหลือ', 'Help Center'],
        ['ติดต่อเรา(Contact Us)', 'Contact Us'],
        ['ติดต่อเรา', 'Contact Us'],
        ['สินค้าของเรา (Products)', 'Products'],
        ['เกี่ยวกับเรา (About Us)', 'About Us'],
        ['คู่มือการใช้งาน (Manuals)', 'User Manuals'],
        ['การรับประกันและการส่งซ่อม', 'Warranty and Repair Service'],
        ['วิสัยทัศน์และพันธกิจ', 'Vision and Mission'],
        ['ข้อมูลการติดต่อ', 'Contact Information'],
        ['รายละเอียดเพิ่มเติม', 'More Details'],
        ['กลับไปหน้าหลักสินค้า', 'Back to Product Categories'],
        ['สอบถามข้อมูล', 'Ask Us'],
        ['ปิดหน้าต่าง', 'Close Window'],
        ['โทรศัพท์ :', 'Phone:'],
        ['อีเมล :', 'Email:'],
        ['เวลาทำการ :', 'Business Hours:'],
        ['เปิดแผนที่บน Google Maps', 'Open in Google Maps'],
        ['ที่อยู่:', 'Address:'],
        ['ส่งข้อความถึงเรา', 'Send Us a Message'],
        ['<button type="submit" class="btn-main">ส่งข้อความ</button>', '<button type="submit" class="btn-main">Send Message</button>'],
        ['placeholder="ชื่อ-นามสกุล"', 'placeholder="Full Name"'],
        ['placeholder="อีเมล"', 'placeholder="Email"'],
        ['placeholder="ข้อความของคุณ"', 'placeholder="Your Message"'],
        ['Disclaimer: ข้อมูลผลิตภัณฑ์บนเว็บไซต์นี้ใช้สำหรับการอ้างอิงเท่านั้น\n                    รายละเอียดของสินค้าอาจมีการเปลี่ยนแปลง กรุณาตรวจสอบกับทางบริษัทฯ อีกครั้งก่อนสั่งซื้อ', 'Disclaimer: Product information on this website is provided for reference only. Specifications may change. Please confirm details with the company before ordering.'],
        ['<button class="chat-opt-btn"\n                            onclick="selectChatOption(\'หมวดหมู่สินค้า\')">หมวดหมู่สินค้า</button>', '<button class="chat-opt-btn"\n                            onclick="selectChatOption(\'Product Categories\')">Product Categories</button>'],
        ['<button class="chat-opt-btn" onclick="selectChatOption(\'ติดต่อเรา\')">ติดต่อเรา</button>', '<button class="chat-opt-btn" onclick="selectChatOption(\'Contact Us\')">Contact Us</button>'],
        ['สวัสดีครับ 🙏 สนใจสอบถามข้อมูลสินค้าหมวดไหน หรือต้องการให้เราช่วยเหลือด้านใดครับ?', 'Hello 👋 Which product category would you like to explore, or how can we help you today?']
    ];

    let out = replaceAll(content, replacements);

    for (const [key, { th, en }] of pageEntries) {
        out = out.split(`href="${th}"`).join(`href="${en}"`);
        out = out.split(`href="${th}#home"`).join(`href="${en}#home"`);
        out = out.split(`href="${th}#about"`).join(`href="${en}#about"`);
        out = out.split(`href="${th}#products"`).join(`href="${en}#products"`);
        out = out.split(`href="${th}#help"`).join(`href="${en}#help"`);
        out = out.split(`href="${th}#contact"`).join(`href="${en}#contact"`);
        out = out.split(`window.location.href='${th}'`).join(`window.location.href='${en}'`);
    }

    return out;
}

const pageSpecificEnglish = {
    index: [
        ['<title>BeWorld Medical - นวัตกรรมเครื่องมือแพทย์</title>', '<title>BeWorld Medical - Advanced Medical Technology</title>'],
        ['✨ นวัตกรรมทางการแพทย์ระดับสากล', '✨ Global Medical Innovation'],
        ['ยกระดับการดูแลผู้ป่วยด้วย<span class="text-gradient">เทคโนโลยี</span>ที่ทันสมัย', 'Elevate patient care with <span class="text-gradient">modern technology</span>'],
        ['มุ่งมั่นจัดหาเครื่องมือและอุปกรณ์ทางการแพทย์ที่มีคุณภาพสูง\n                    เพื่อประสิทธิภาพสูงสุดในการวินิจฉัย การรักษา และความปลอดภัยของผู้ป่วย', 'is committed to supplying high-quality medical equipment for accurate diagnosis, effective treatment, and patient safety.'],
        ['ดูสินค้าทั้งหมด', 'Browse All Products'],
        ['บริษัท บีเวิลด์ เมดิคอล จำกัด', 'BeWorld Medical Co., Ltd.'],
        ['เกิดขึ้นจากความตั้งใจที่อยากเห็นคนไทยเข้าถึงอุปกรณ์การแพทย์ที่ได้มาตรฐานสากล\n                เราคัดสรรเฉพาะเครื่องมือที่ปลอดภัยและเทคโนโลยีที่ทันสมัย ใช้งานได้จริง และผ่านการรับรอง เพื่อให้คุณหมอ พยาบาล ตลอดและผู้ป่วยมั่นใจในทุกครั้งที่ใช้งาน', 'was founded to expand access to internationally standardized medical equipment. We carefully select safe, certified, and practical technology so doctors, nurses, and patients can use it with confidence.'],
        ['เราเชื่อว่าเครื่องมือแพทย์ที่ดี ต้องมาพร้อมกับการดูแลที่ดีเยี่ยม ทีมงานของเราจึงให้ความสำคัญกับ\n                <strong>"บริการหลังการขายที่รวดเร็วและไว้ใจได้"</strong> เป็นอันดับหนึ่ง ดูแลฉับไว ไม่ทิ้งลูกค้า\n                เพื่อให้ทุกการรักษาเป็นไปอย่างราบรื่นและอุ่นใจที่สุด', 'We believe excellent medical equipment should come with excellent care. That is why our team prioritizes <strong>"fast and dependable after-sales service"</strong> so every treatment journey can move forward smoothly and confidently.'],
        ['วิสัยทัศน์ (Vision)', 'Vision'],
        ['อยากเห็นคนไทยมีคุณภาพชีวิตที่ดีขึ้น\n                        ด้วยการเข้าถึงเทคโนโลยีการแพทย์ที่ทันสมัย ปลอดภัย และเชื่อถือได้', 'To improve quality of life through access to modern, safe, and reliable medical technology.'],
        ['พันธกิจ (Mission)', 'Mission'],
        ['คัดสรรสินค้าคุณภาพสูง และพร้อมเป็นพาร์ทเนอร์ที่ดูแลลูกค้าด้วยความจริงใจ\n                        พร้อมบริการหลังการขายที่ไม่ทอดทิ้งกัน', 'To carefully select high-quality products and support customers as a trusted partner with dependable after-sales service.'],
        ['หมวดหมู่สินค้าของเรา', 'Our Product Categories'],
        ['เครื่องติดตามสัญญาณชีพทารกในครรภ์', 'Fetal monitoring systems'],
        ['เครื่องติดตามการทำงานของหัวใจ', 'Patient monitoring systems'],
        ['เครื่องวัดสัญญาณชีพพื้นฐาน', 'Basic vital sign monitors'],
        ['เครื่องตรวจคลื่นไฟฟ้าหัวใจ', 'Electrocardiograph systems'],
        ['เครื่องกระตุกหัวใจด้วยไฟฟ้า', 'Defibrillation systems'],
        ['เครื่องควบคุมการให้สารละลาย', 'Infusion and syringe pumps'],
        ['เครื่องช่วยหายใจ', 'Ventilator systems'],
        ['เครื่องวัดความดันโลหิต', 'Blood pressure monitors'],
        ['ดาวน์โหลดคู่มือการใช้งาน', 'Download User Manuals'],
        ['คุณสามารถดาวน์โหลดคู่มือการใช้งานเครื่องมือแพทย์ทุกรุ่นได้ที่นี่ หรือสแกน QR Code ที่ติดอยู่บนตัวเครื่อง', 'You can download manuals for all supported products here or scan the QR code attached to the device.'],
        ['สินค้าของเรามีการรับประกัน 1-3 ปี (ขึ้นอยู่กับรุ่น) หากเครื่องมีปัญหา\n                สามารถแจ้งทีมช่างผู้เชี่ยวชาญเข้าตรวจสอบได้ตลอด 24 ชั่วโมง', 'Our products come with a 1-3 year warranty depending on the model. If a device has a problem, our service team can inspect and support you promptly.'],
        ['จันทร์ - ศุกร์ 08:30 - 17:00\n                    น.', 'Monday - Friday, 08:30 - 17:00']
    ],
    fetal: [
        ['เครื่องติดตามสัญญาณชีพทารกในครรภ์ เทคโนโลยีล้ำสมัย ให้ผลลัพธ์ที่แม่นยำและปลอดภัย', 'Advanced fetal monitoring technology that delivers accurate and reliable results for obstetric care.'],
        ['เครื่องติดตามสัญญาณชีพทารกในครรภ์ประสิทธิภาพสูง\n                    ตรวจวัดอัตราการเต้นของหัวใจทารกและการหดรัดตัวของมดลูกได้อย่างแม่นยำ<br>\n                    ออกแบบมาเพื่อการใช้งานในแผนกสูตินรีเวชและห้องคลอดโดยเฉพาะ', 'High-performance fetal monitor for precise fetal heart rate and uterine contraction monitoring.<br>\n                    Designed specifically for obstetrics, gynecology, and labor rooms.']
    ],
    monitor: [
        ['เครื่องติดตามสัญญาณชีพผู้ป่วย เทคโนโลยีขั้นสูง แม่นยำ', 'Advanced patient monitoring technology with accurate real-time measurement.'],
        ['Flagship Modular Monitor\n                    ระดับ High-end ประสิทธิภาพสูง พร้อมระบบวิเคราะห์ข้อมูลเชิงลึก ออกแบบมาเฉพาะสำหรับห้องผู้ป่วยวิกฤตและห้องผ่าตัด', 'Flagship high-end modular monitor with advanced analytics, designed for intensive care units and operating rooms.'],
        ['เครื่องติดตามสัญญาณชีพประสิทธิภาพสูง หน้าจอคมชัดระดับ HD\n                    เพื่อการเฝ้าระวังและจัดการข้อมูลอย่างเป็นระบบ<br><br>', 'High-performance patient monitor with a sharp HD display for organized bedside monitoring and data management.<br><br>'],
        ['Modular Monitor\n                    ที่โดดเด่นด้านความแม่นยำและยืดหยุ่น รองรับการปรับเปลี่ยนโมดูลพารามิเตอร์ที่ซับซ้อน\n                    เหมาะสำหรับการดูแลผู้ป่วยหนักที่ต้องการความละเอียดอ่อน', 'Modular monitor known for accuracy and flexibility, with support for advanced parameter modules in critical care environments.'],
        ['เครื่องติดตามสัญญาณชีพอเนกประสงค์ ทนทาน คุ้มค่า ทำงานเสถียร\n                    รองรับการใช้งานที่หลากหลายตั้งแต่จุดคัดกรอง, ห้องฉุกเฉิน (ER) จนถึงหอผู้ป่วยกึ่งวิกฤต', 'Versatile patient monitor that is durable, stable, and cost-effective for use from triage and emergency rooms to step-down units.'],
        ['Transport Monitor\n                    ขนาดกะทัดรัด น้ำหนักเบา ทนทานต่อการตกกระแทก แบตเตอรี่ใช้งานได้ยาวนาน\n                    ออกแบบพิเศษสำหรับการเคลื่อนย้ายผู้ป่วยและรถพยาบาลฉุกเฉิน', 'Compact transport monitor with strong impact resistance and long battery life, designed for patient transport and emergency ambulances.']
    ],
    vitalsign: [
        ['เครื่องวัดสัญญาณชีพพื้นฐาน', 'Basic vital sign monitoring solutions'],
        ['เครื่องวัดและติดตามสัญญาณชีพพื้นฐาน (Vital Sign Monitor) ดีไซน์กะทัดรัด น้ำหนักเบา ทำงานรวดเร็ว\n                    ออกแบบมาเพื่อการวัดค่าแบบ Spot-check ที่แม่นยำ เหมาะสำหรับจุดคัดกรองผู้ป่วย (Triage)\n                    และแผนกผู้ป่วยนอก (OPD)', 'Compact and lightweight vital sign monitor for quick spot-check measurements, ideal for triage stations and outpatient departments.']
    ],
    ekg: [
        ['เครื่องตรวจคลื่นไฟฟ้าหัวใจ ประมวลผลแม่นยำ พร้อมระบบวิเคราะห์ผลอัตโนมัติ<br>\n            ช่วยให้การวินิจฉัยโรคหัวใจเป็นไปอย่างรวดเร็วและมีประสิทธิภาพ', 'Accurate ECG analysis with automatic interpretation to support fast and efficient cardiac diagnosis.<br>\n            Ideal for hospitals, clinics, and screening units.'],
        ['เครื่องตรวจคลื่นไฟฟ้าหัวใจ 12 Channel แบบ High-end\n                    พร้อมระบบพิมพ์ผล', 'High-end 12-channel ECG machine with integrated printout support.']
    ],
    defib: [
        ['เครื่องกระตุกหัวใจไฟฟ้า เทคโนโลยีที่ช่วยกู้ชีวิตในภาวะฉุกเฉิน<br>\n            พร้อมระบบการใช้งานที่รวดเร็วและปลอดภัยสำหรับทุกสถานการณ์', 'Life-saving defibrillation technology for emergency response, with fast operation and dependable safety features.<br>\n            Suitable for hospitals, ambulances, and public access use.'],
        ['เครื่องกระตุกหัวใจด้วยไฟฟ้าแบบรวมฟังก์ชันการติดตามสัญญาณชีพ (Defibrillator/Monitor) ประสิทธิภาพสูง ออกแบบมาเพื่อการกู้ชีพขั้นสูง (ACLS) ในภาวะฉุกเฉิน ตอบโจทย์การใช้งานในห้องฉุกเฉิน (ER) และรถพยาบาล', 'High-performance defibrillator/monitor for advanced cardiac life support in emergency rooms and ambulances.'],
        ['เครื่องกระตุกหัวใจด้วยไฟฟ้าชนิดอัตโนมัติ (AED) ใช้งานง่าย ปลอดภัย พร้อมระบบเสียงแนะนำขั้นตอนการกู้ชีพอย่างชัดเจน เหมาะสำหรับติดตั้งในพื้นที่สาธารณะ องค์กร และหน่วยปฐมพยาบาลเบื้องต้น', 'Automatic external defibrillator with clear voice guidance, designed for safe and easy use in public spaces, organizations, and first-aid points.']
    ],
    pump: [
        ['เครื่องควบคุมการให้สารละลายทางหลอดเลือด แม่นยำและปลอดภัย<br>\n            ตอบสนองทุกความต้องการในการให้ยาและสารน้ำแก่ผู้ป่วยอย่างมีประสิทธิภาพ', 'Accurate and safe infusion management for fluid and drug delivery across a wide range of clinical settings.<br>\n            Designed to support efficient bedside care.'],
        ['เครื่องควบคุมการให้สารละลายและยาทางหลอดเลือดดำประสิทธิภาพสูง จ่ายสารน้ำด้วยความแม่นยำ พร้อมระบบแจ้งเตือนความปลอดภัยอัจฉริยะ ใช้งานง่าย เหมาะสำหรับการดูแลผู้ป่วยในหอผู้ป่วยทุกระดับ', 'High-performance infusion pump with precise delivery, smart safety alarms, and simple operation for wards of every level.'],
        ['เครื่องควบคุมการให้ยาทางหลอดเลือดดำชนิดกระบอกฉีด ออกแบบมาเพื่อการเดินยาที่ต้องการความละเอียดและแม่นยำสูงสุด เหมาะสำหรับยาที่ต้องควบคุมปริมาณอย่างเข้มงวด เช่น ในห้องผู้ป่วยวิกฤต (ICU) หรือห้องผ่าตัด', 'Syringe pump designed for highly controlled and precise medication delivery, ideal for ICUs and operating rooms.']
    ],
    vent: [
        ['เครื่องช่วยหายใจ เทคโนโลยีเพื่อการดูแลผู้ป่วยวิกฤต<br>\n            รองรับโหมดการทำงานที่หลากหลาย ปรับตั้งง่าย และมีความเชื่อถือได้สูง', 'Ventilator technology for critical care, supporting multiple ventilation modes with intuitive setup and reliable performance.<br>\n            Built for demanding clinical environments.'],
        ['เครื่องช่วยหายใจประสิทธิภาพสูงสำหรับผู้ป่วยวิกฤต (ICU) รองรับการช่วยหายใจทั้งแบบสอดท่อ (Invasive) และไม่สอดท่อ (Non-Invasive) มาพร้อมโหมดการทำงานที่ครอบคลุม เทคโนโลยีติดตามการหายใจที่แม่นยำ และอินเทอร์เฟซที่ใช้งานง่ายเพื่อความปลอดภัยสูงสุดของผู้ป่วย', 'High-performance ventilator for ICU patients, supporting both invasive and non-invasive ventilation with comprehensive modes, precise respiratory monitoring, and an easy-to-use interface.']
    ],
    bp: [
        ['เครื่องวัดความดันโลหิตดิจิทัลความแม่นยำสูงสำหรับสถานพยาบาลและคลินิก', 'High-accuracy digital blood pressure monitoring for hospitals and clinics.'],
        ['เครื่องวัดความดันโลหิตแบบดิจิทัลประสิทธิภาพสูง\n                    สามารถตรวจวัดความดันโลหิตและอัตราการเต้นของหัวใจได้อย่างแม่นยำและรวดเร็ว<br>\n                    ออกแบบมาเพื่อการใช้งานในสถานพยาบาลและคลินิกโดยเฉพาะ', 'High-performance digital blood pressure monitor that measures blood pressure and pulse quickly and accurately.<br>\n                    Designed for hospitals, clinics, and healthcare stations.']
    ]
};

for (const [key, files] of pageEntries) {
    let thai = fixThai(read(files.th), key);
    thai = setLangSwitcher(thai, files.th, files.en, 'th');
    write(files.th, thai);

    let english = thai;
    english = commonEnglish(english);
    english = replaceAll(english, pageSpecificEnglish[key] || []);
    english = setLangSwitcher(english, files.th, files.en, 'en');
    write(files.en, english);
}

console.log('English pages generated successfully.');
