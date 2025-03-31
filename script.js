document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const greetingForm = document.getElementById('greetingForm');
    const recipientTypeRadios = document.getElementsByName('recipientType');
    const recipientNameGroup = document.getElementById('recipientNameGroup');
    const resultContainer = document.getElementById('resultContainer');
    const greetingLinkInput = document.getElementById('greetingLink');
    const copyLinkBtn = document.getElementById('copyLink');
    const createNewBtn = document.getElementById('createNew');
    const shareWhatsappBtn = document.getElementById('shareWhatsapp');
    const shareFacebookBtn = document.getElementById('shareFacebook');
    const shareTwitterBtn = document.getElementById('shareTwitter');
    
    // Show/hide recipient name field based on recipient type selection
    recipientTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'specific') {
                recipientNameGroup.classList.remove('hidden');
            } else {
                recipientNameGroup.classList.add('hidden');
            }
        });
    });
    
    // Handle form submission
    greetingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const senderName = document.getElementById('senderName').value.trim();
        const recipientType = document.querySelector('input[name="recipientType"]:checked').value;
        const recipientName = document.getElementById('recipientName').value.trim();
        const verseSelection = document.getElementById('verseSelection').value;
        
        // Validate form
        if (senderName === '') {
            alert('Please enter your name');
            return;
        }
        
        if (recipientType === 'specific' && recipientName === '') {
            alert('Please enter recipient\'s name');
            return;
        }
        
        // Generate greeting URL
        const baseUrl = window.location.href.split('?')[0].replace('index.html', '');
        const greetingUrl = generateGreetingUrl(baseUrl, senderName, recipientType, recipientName, verseSelection);
        
        // Display result
        greetingLinkInput.value = greetingUrl;
        greetingForm.classList.add('hidden');
        resultContainer.classList.remove('hidden');
        
        // Update share buttons
        updateShareButtons(greetingUrl);
    });
    
    // Generate greeting URL with parameters
    function generateGreetingUrl(baseUrl, senderName, recipientType, recipientName, verseSelection) {
        let url = `${baseUrl}greeting.html?sender=${encodeURIComponent(senderName)}`;
        
        if (recipientType === 'specific') {
            url += `&recipient=${encodeURIComponent(recipientName)}`;
        }
        
        if (verseSelection !== 'none') {
            url += `&verse=${encodeURIComponent(verseSelection)}`;
        }
        
        return url;
    }
    
    // Update social share buttons with the greeting URL
    function updateShareButtons(url) {
        // WhatsApp sharing
        shareWhatsappBtn.href = `https://api.whatsapp.com/send?text=${encodeURIComponent('Check out this Eid greeting I made for you! ' + url)}`;
        
        // Facebook sharing
        shareFacebookBtn.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        
        // Twitter sharing
        shareTwitterBtn.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent('Check out this Eid greeting I made for you!')}&url=${encodeURIComponent(url)}`;
    }
    
    // Copy link to clipboard
    copyLinkBtn.addEventListener('click', function() {
        greetingLinkInput.select();
        document.execCommand('copy');
        
        // Show feedback
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-check"></i>';
        
        setTimeout(() => {
            this.innerHTML = originalText;
        }, 2000);
    });
    
    // Create new greeting button
    createNewBtn.addEventListener('click', function() {
        greetingForm.reset();
        resultContainer.classList.add('hidden');
        greetingForm.classList.remove('hidden');
        recipientNameGroup.classList.remove('hidden'); // Reset visibility of recipient name field
    });
    
    // Open share links in new window
    document.querySelectorAll('.social-buttons a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            window.open(this.href, '_blank', 'width=600,height=400');
        });
    });
});