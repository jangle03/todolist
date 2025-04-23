document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const startDateInput = document.getElementById('start-date');
    const saveDateBtn = document.getElementById('save-date');
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const loveMessageElement = document.getElementById('love-message');
    const uploadPhoto1 = document.getElementById('upload-photo1');
    const uploadPhoto2 = document.getElementById('upload-photo2');
    const photo1Element = document.getElementById('photo1');
    const photo2Element = document.getElementById('photo2');
    
    // Local storage keys
    const START_DATE_KEY = 'love-counter-start-date';
    const PHOTO1_KEY = 'love-counter-photo1';
    const PHOTO2_KEY = 'love-counter-photo2';
    
    // Load saved date from local storage
    const savedDate = localStorage.getItem(START_DATE_KEY);
    if (savedDate) {
        startDateInput.value = savedDate;
        updateCounter();
    }
    
    // Load saved photos from local storage
    const savedPhoto1 = localStorage.getItem(PHOTO1_KEY);
    const savedPhoto2 = localStorage.getItem(PHOTO2_KEY);
    
    if (savedPhoto1) {
        photo1Element.style.backgroundImage = `url(${savedPhoto1})`;
        photo1Element.querySelector('label').style.display = 'none';
    }
    
    if (savedPhoto2) {
        photo2Element.style.backgroundImage = `url(${savedPhoto2})`;
        photo2Element.querySelector('label').style.display = 'none';
    }
    
    // Event listeners
    saveDateBtn.addEventListener('click', function() {
        const startDate = startDateInput.value;
        
        if (!startDate) {
            alert('Vui lòng chọn ngày bắt đầu!');
            return;
        }
        
        localStorage.setItem(START_DATE_KEY, startDate);
        updateCounter();
        generateLoveMessage();
    });
    
    uploadPhoto1.addEventListener('change', function(e) {
        handlePhotoUpload(e, photo1Element, PHOTO1_KEY);
    });
    
    uploadPhoto2.addEventListener('change', function(e) {
        handlePhotoUpload(e, photo2Element, PHOTO2_KEY);
    });
    
    // Handle photo uploads
    function handlePhotoUpload(e, photoElement, storageKey) {
        const file = e.target.files[0];
        if (!file) return;
        
        if (!file.type.match('image.*')) {
            alert('Vui lòng chọn file ảnh!');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(event) {
            const imgUrl = event.target.result;
            photoElement.style.backgroundImage = `url(${imgUrl})`;
            photoElement.querySelector('label').style.display = 'none';
            localStorage.setItem(storageKey, imgUrl);
        };
        
        reader.readAsDataURL(file);
    }
    
    // Reset a photo
    photo1Element.addEventListener('dblclick', function() {
        resetPhoto(photo1Element, PHOTO1_KEY);
    });
    
    photo2Element.addEventListener('dblclick', function() {
        resetPhoto(photo2Element, PHOTO2_KEY);
    });
    
    function resetPhoto(photoElement, storageKey) {
        if (photoElement.style.backgroundImage) {
            if (confirm('Bạn có muốn xóa ảnh này không?')) {
                photoElement.style.backgroundImage = '';
                photoElement.querySelector('label').style.display = 'flex';
                localStorage.removeItem(storageKey);
            }
        }
    }
    
    // Update counter function
    function updateCounter() {
        const startDate = new Date(startDateInput.value);
        
        if (isNaN(startDate.getTime())) {
            return;
        }
        
        // Update immediately once
        updateCounterDisplay(startDate);
        
        // Then update every second
        setInterval(function() {
            updateCounterDisplay(startDate);
        }, 1000);
    }
    
    // Update counter display
    function updateCounterDisplay(startDate) {
        const now = new Date();
        const difference = now - startDate;
        
        // Calculate days, hours, minutes, seconds
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        // Update display
        daysElement.textContent = days;
        hoursElement.textContent = hours;
        minutesElement.textContent = minutes;
        secondsElement.textContent = seconds;
    }
    
    // Generate a love message based on days count
    function generateLoveMessage() {
        const startDate = new Date(startDateInput.value);
        if (isNaN(startDate.getTime())) return;
        
        const now = new Date();
        const difference = now - startDate;
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        
        let message = '';
        
        if (days < 0) {
            message = 'Thời gian bắt đầu không thể trong tương lai!';
        } else if (days === 0) {
            message = 'Tình yêu của chúng mình vừa mới bắt đầu!';
        } else if (days < 7) {
            message = 'Chúng mình đang ở những ngày đầu tiên, thật hạnh phúc!';
        } else if (days < 30) {
            message = 'Tình yêu đang nở rộ như những bông hoa mùa xuân!';
        } else if (days < 90) {
            message = 'Đã qua giai đoạn mật ngọt ban đầu, tình yêu giờ thêm bền vững!';
        } else if (days < 365) {
            message = 'Từng ngày trôi qua, tình yêu của chúng mình ngày càng sâu đậm!';
        } else {
            const years = Math.floor(days / 365);
            message = `${years} năm bên nhau, tình yêu của chúng mình thật đáng trân trọng!`;
        }
        
        loveMessageElement.textContent = message;
    }
    
    // If there's a saved date, generate a message on load
    if (savedDate) {
        generateLoveMessage();
    }
});