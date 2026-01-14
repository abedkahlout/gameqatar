// بيانات المناطق (يمكن التعديل عليها)
const regionsData = [
    { id: 1, name: "المنطقة الوسطى", questions: [] },
    { id: 2, name: "المنطقة الغربية", questions: [] },
    { id: 3, name: "المنطقة الشرقية", questions: [] },
    { id: 4, name: "المنطقة الشمالية", questions: [] },
    { id: 5, name: "المنطقة الجنوبية", questions: [] }
];

// قراءة التقدم المحفوظ أو البدء من 1
let unlockedLevel = localStorage.getItem('saudiPath_level') ? parseInt(localStorage.getItem('saudiPath_level')) : 1;

// دالة الانتقال بين الشاشات
function showScreen(screenId) {
    // إخفاء كل الشاشات
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
        screen.classList.add('hidden'); // تأكيد الإخفاء
    });
    // إظهار الشاشة المطلوبة
    document.getElementById(screenId).classList.add('active');
}

// زر البدء
function startGame() {
    renderMap();
    showScreen('map-screen');
}

// رسم الخريطة والأزرار
function renderMap() {
    const mapContainer = document.getElementById('map-buttons');
    mapContainer.innerHTML = ''; // تنظيف

    regionsData.forEach(region => {
        const btn = document.createElement('button');
        btn.className = 'region-btn';
        
        // التحقق هل المنطقة مفتوحة أم لا
        if (region.id <= unlockedLevel) {
            btn.innerText = region.name + " 🔓";
            btn.onclick = () => openRegion(region);
        } else {
            btn.innerText = region.name + " 🔒 (مغلق)";
            btn.disabled = true;
        }
        
        mapContainer.appendChild(btn);
    });
}

// دالة فتح منطقة (هنا سنضع منطق الأسئلة لاحقاً)
function openRegion(region) {
    alert("أنتِ الآن في: " + region.name);
    // هنا تذهب لشاشة الأسئلة
    // showScreen('quiz-screen');
    
    // محاكاة الفوز (للتجربة فقط):
    // إذا أجابت صح نزيد المستوى
    // completeRegion(region.id); 
}

// دالة عند إتمام المنطقة بنجاح
function completeRegion(currentId) {
    if (currentId === unlockedLevel && unlockedLevel < 5) {
        unlockedLevel++;
        localStorage.setItem('saudiPath_level', unlockedLevel); // حفظ التقدم
        alert("أحسنتِ! تم فتح المنطقة التالية.");
        renderMap(); // تحديث الأزرار
    }
}// المتغيرات العامة
let playerName = "";
let unlockedLevel = 1;

// عند تحميل الصفحة: نفحص هل هناك بيانات محفوظة؟
window.onload = function() {
    // 1. جلب الاسم والمستوى من التخزين المحلي
    const savedName = localStorage.getItem('saudiPath_name');
    const savedLevel = localStorage.getItem('saudiPath_level');

    if (savedName) {
        // إذا وجدنا بيانات، نسترجعها وندخل مباشرة للخريطة
        playerName = savedName;
        unlockedLevel = savedLevel ? parseInt(savedLevel) : 1;
        
        showMapScreen(); // دالة خاصة للعرض
    } else {
        // إذا لم نجد بيانات، نبقي المستخدم في شاشة الدخول
        console.log("مستخدم جديد");
    }
};

// دالة تسجيل اللاعب (عند الضغط على زر البداية)
function registerPlayer() {
    const input = document.getElementById('player-name-input');
    const name = input.value.trim();

    if (name === "") {
        alert("الرجاء كتابة الاسم أولاً!");
        return;
    }

    // حفظ البيانات
    playerName = name;
    localStorage.setItem('saudiPath_name', playerName);
    localStorage.setItem('saudiPath_level', 1); // نبدأ بالمستوى 1

    showMapScreen();
}

// دالة تجهيز وعرض الخريطة
function showMapScreen() {
    // تحديث رسالة الترحيب بالاسم
    document.getElementById('welcome-message').innerText = `أهلاً بالعالمة: ${playerName}`;
    
    // رسم الخريطة بناءً على المستوى الحالي
    renderMap(); 
    
    // الانتقال للشاشة
    showScreen('map-screen');
}

// دالة تحديث المستوى (تستدعى عند الفوز في الأسئلة)
function saveProgress(newLevel) {
    unlockedLevel = newLevel;
    localStorage.setItem('saudiPath_level', unlockedLevel);
    renderMap(); // إعادة رسم الأزرار لتحديث الأقفال
}

// دالة الحذف (لتجربة اللعبة من جديد)
function resetGame() {
    if(confirm("هل أنت متأكدة من حذف جميع البيانات والبدء من الصفر؟")) {
        localStorage.clear(); // مسح كل شيء
        location.reload(); // تحديث الصفحة
    }
}

// --- بقية الدوال السابقة (showScreen, renderMap) تبقى كما هي ---
// تذكر في دالة renderMap أن تستخدم المتغير unlockedLevel الذي حدثناه