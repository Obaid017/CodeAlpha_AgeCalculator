document.addEventListener('DOMContentLoaded', function() {
    const ageForm = document.getElementById('ageForm');
    const errorContainer = document.getElementById('error');
    const resultContainer = document.getElementById('result');
    const funFacts = [
        "Did you know? The average person lives about 30,000 days!",
        "Fun fact: You've blinked approximately 400 million times in your life!",
        "Interesting: Your heart has beaten over 2.5 billion times!",
        "Amazing: You've taken about 200 million steps in your lifetime!",
        "Did you know? You spend about 25 years asleep in your lifetime!"
    ];

    // Display random fun fact
    document.getElementById('fun-fact-text').textContent = 
        funFacts[Math.floor(Math.random() * funFacts.length)];

    ageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors and hide result
        errorContainer.style.display = 'none';
        resultContainer.style.display = 'none';
        
        // Get input values
        const day = parseInt(document.getElementById('day').value);
        const month = parseInt(document.getElementById('month').value);
        const year = parseInt(document.getElementById('year').value);
        
        // Validate inputs
        if (!isValidDate(day, month, year)) {
            errorContainer.style.display = 'block';
            errorContainer.textContent = 'Please enter a valid date of birth!';
            return;
        }
        
        // Calculate age
        const age = calculateAge(day, month, year);
        
        // Display result
        document.getElementById('years').textContent = age.years;
        document.getElementById('months').textContent = age.months;
        document.getElementById('days').textContent = age.days;
        
        // Check for birthday
        const birthdayMessage = document.getElementById('birthday-message');
        if (age.months === 0 && age.days === 0) {
            birthdayMessage.textContent = "🎉 Happy Birthday! 🎉";
        } else {
            birthdayMessage.textContent = getNextBirthdayMessage(day, month, year);
        }
        
        resultContainer.style.display = 'block';
        
        // Add celebration effect if birthday
        if (age.months === 0 && age.days === 0) {
            celebrate();
        }
    });

    function isValidDate(day, month, year) {
        // Check if any field is empty
        if (isNaN(day) || isNaN(month) || isNaN(year)) {
            return false;
        }
        
        // Basic validation
        if (month < 1 || month > 12) return false;
        if (day < 1 || day > 31) return false;
        
        // Check for months with 30 days
        if ([4, 6, 9, 11].includes(month) && day > 30) return false;
        
        // Check for February
        if (month === 2) {
            const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
            if (day > (isLeapYear ? 29 : 28)) return false;
        }
        
        // Check if date is in the future
        const inputDate = new Date(year, month - 1, day);
        const today = new Date();
        if (inputDate > today) return false;
        
        return true;
    }

    function calculateAge(day, month, year) {
        const birthDate = new Date(year, month - 1, day);
        const today = new Date();
        
        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();
        let days = today.getDate() - birthDate.getDate();
        
        if (days < 0) {
            months--;
            const lastDayOfMonth = new Date(
                today.getFullYear(),
                today.getMonth(),
                0
            ).getDate();
            days += lastDayOfMonth;
        }
        
        if (months < 0) {
            years--;
            months += 12;
        }
        
        return { years, months, days };
    }

    function getNextBirthdayMessage(day, month, year) {
        const today = new Date();
        const currentYear = today.getFullYear();
        
        // Create next birthday date
        let nextBirthday = new Date(currentYear, month - 1, day);
        
        // If birthday already passed this year, use next year
        if (nextBirthday < today) {
            nextBirthday = new Date(currentYear + 1, month - 1, day);
        }
        
        // Calculate days until next birthday
        const diffTime = nextBirthday - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        return `Your next birthday is in ${diffDays} day${diffDays !== 1 ? 's' : ''}!`;
    }

    function celebrate() {
        const container = document.querySelector('.calculator-container');
        container.style.animation = 'celebrate 0.5s ease';
        
        // Create confetti elements
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = getRandomColor();
            confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
            document.body.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
        
        // Reset animation
        setTimeout(() => {
            container.style.animation = '';
        }, 500);
    }

    function getRandomColor() {
        const colors = ['#6c5ce7', '#fd79a8', '#00b894', '#fdcb6e', '#0984e3'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
});

// Add confetti styles dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes celebrate {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .confetti {
        position: fixed;
        width: 10px;
        height: 10px;
        background-color: #f00;
        top: -10px;
        z-index: 999;
        animation: fall linear forwards;
    }
    
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);