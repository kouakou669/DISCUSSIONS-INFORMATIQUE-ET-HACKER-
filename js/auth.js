// auth.js - Script pour gérer les fonctionnalités d'authentification

document.addEventListener('DOMContentLoaded', function() {
    // Fonctions pour login.html
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupération des valeurs des champs
            const username = document.getElementById('login-username').value.trim();
            const password = document.getElementById('login-password').value;
            let isValid = true;
            
            // Validation du nom d'utilisateur
            if (username === '') {
                showError('username-error', 'Veuillez entrer votre nom d\'utilisateur ou email');
                isValid = false;
            } else {
                hideError('username-error');
            }
            
            // Validation du mot de passe
            if (password === '') {
                showError('password-error', 'Veuillez entrer votre mot de passe');
                isValid = false;
            } else {
                hideError('password-error');
            }
            
            // Si le formulaire est valide, simuler une connexion réussie
            if (isValid) {
                // Simule l'envoi du formulaire et la redirection
                document.getElementById('login-form').classList.add('loading');
                
                // Simulation d'une requête au serveur (à remplacer par un vrai appel API)
                setTimeout(function() {
                    // Enregistrer l'état de connexion dans localStorage (pour simuler une vraie session)
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('username', username);
                    
                    // Rediriger vers la page d'accueil
                    window.location.href = 'index.html';
                }, 1000);
            }
        });
    }
    
    // Fonctions pour register.html
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        // Prévisualisation de l'avatar
        const avatarUpload = document.getElementById('avatar-upload');
        if (avatarUpload) {
            avatarUpload.addEventListener('change', function() {
                previewAvatar(this);
            });
        }
        
        // Validation du mot de passe en temps réel
        const passwordInput = document.getElementById('password');
        if (passwordInput) {
            passwordInput.addEventListener('input', function() {
                checkPasswordStrength(this.value);
            });
        }
        
        // Soumission du formulaire d'inscription
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupération des valeurs des champs
            const username = document.getElementById('username').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const terms = document.getElementById('terms').checked;
            
            let isValid = true;
            
            // Validation du nom d'utilisateur
            if (username === '') {
                showError('username-error', 'Veuillez entrer un nom d\'utilisateur');
                isValid = false;
            } else if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
                showError('username-error', 'Le nom d\'utilisateur doit contenir entre 3 et 20 caractères (lettres, chiffres et underscore uniquement)');
                isValid = false;
            } else {
                hideError('username-error');
            }
            
            // Validation de l'email
            if (email === '') {
                showError('email-error', 'Veuillez entrer votre email');
                isValid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showError('email-error', 'Veuillez entrer un email valide');
                isValid = false;
            } else {
                hideError('email-error');
            }
            
            // Validation du mot de passe
            if (password === '') {
                showError('password-error', 'Veuillez entrer un mot de passe');
                isValid = false;
            } else if (password.length < 8) {
                showError('password-error', 'Le mot de passe doit contenir au moins 8 caractères');
                isValid = false;
            } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
                showError('password-error', 'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule et un chiffre');
                isValid = false;
            } else {
                hideError('password-error');
            }
            
            // Validation de la confirmation du mot de passe
            if (password !== confirmPassword) {
                showError('confirm-password-error', 'Les mots de passe ne correspondent pas');
                isValid = false;
            } else {
                hideError('confirm-password-error');
            }
            
            // Validation des conditions d'utilisation
            if (!terms) {
                showError('terms-error', 'Vous devez accepter les conditions d\'utilisation');
                isValid = false;
            } else {
                hideError('terms-error');
            }
            
            // Vérification de l'avatar si un fichier est sélectionné
            const avatarUpload = document.getElementById('avatar-upload');
            if (avatarUpload && avatarUpload.files.length > 0) {
                const file = avatarUpload.files[0];
                if (file.size > 2 * 1024 * 1024) { // 2MB max
                    showError('avatar-error', 'L\'image ne doit pas dépasser 2MB');
                    isValid = false;
                } else {
                    hideError('avatar-error');
                }
            }
            
            // Si le formulaire est valide, simuler une inscription réussie
            if (isValid) {
                // Simuler l'envoi du formulaire
                document.getElementById('register-form').classList.add('loading');
                
                // Simulation d'une requête au serveur (à remplacer par un vrai appel API)
                setTimeout(function() {
                    // Afficher le message de succès
                    document.getElementById('register-success').style.display = 'block';
                    document.getElementById('register-form').reset();
                    document.getElementById('register-form').classList.remove('loading');
                    
                    // Rediriger vers la page de connexion après quelques secondes
                    setTimeout(function() {
                        window.location.href = 'login.html';
                    }, 3000);
                }, 1500);
            }
        });
    }
    
    // Gestion de l'affichage/masquage du mot de passe
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    if (togglePasswordBtns) {
        togglePasswordBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const input = this.previousElementSibling;
                if (input.type === 'password') {
                    input.type = 'text';
                    this.innerHTML = '<i class="fa fa-eye-slash"></i>';
                } else {
                    input.type = 'password';
                    this.innerHTML = '<i class="fa fa-eye"></i>';
                }
            });
        });
    }
    
    // Fonctions utilitaires
    function showError(id, message) {
        const errorElement = document.getElementById(id);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }
    
    function hideError(id) {
        const errorElement = document.getElementById(id);
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    }
    
    function checkPasswordStrength(password) {
        const strengthMeter = document.getElementById('strength-meter-fill');
        const strengthText = document.getElementById('password-strength-text');
        
        if (!strengthMeter || !strengthText) return;
        
        let strength = 0;
        
        // Critères de force du mot de passe
        if (password.length >= 8) strength += 1;
        if (password.length >= 12) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[a-z]/.test(password)) strength += 1;
        if (/\d/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;
        
        // Mise à jour de l'indicateur visuel
        switch(strength) {
            case 0:
            case 1:
                strengthMeter.style.width = '20%';
                strengthMeter.style.backgroundColor = '#ff4d4d';
                strengthText.textContent = 'Force: Très faible';
                break;
            case 2:
            case 3:
                strengthMeter.style.width = '40%';
                strengthMeter.style.backgroundColor = '#ffa64d';
                strengthText.textContent = 'Force: Faible';
                break;
            case 4:
                strengthMeter.style.width = '60%';
                strengthMeter.style.backgroundColor = '#ffff4d';
                strengthText.textContent = 'Force: Moyenne';
                break;
            case 5:
                strengthMeter.style.width = '80%';
                strengthMeter.style.backgroundColor = '#4dff4d';
                strengthText.textContent = 'Force: Bonne';
                break;
            case 6:
                strengthMeter.style.width = '100%';
                strengthMeter.style.backgroundColor = '#4dffb8';
                strengthText.textContent = 'Force: Excellente';
                break;
        }
    }
    
    function previewAvatar(input) {
        if (input.files && input.files[0]) {
            const file = input.files[0];
            
            // Vérifier le type de fichier
            if (!file.type.startsWith('image/')) {
                showError('avatar-error', 'Veuillez sélectionner une image valide');
                return;
            }
            
            // Vérifier la taille du fichier (max 2MB)
            if (file.size > 2 * 1024 * 1024) {
                showError('avatar-error', 'L\'image ne doit pas dépasser 2MB');
                return;
            }
            
            // Effacer les erreurs précédentes
            hideError('avatar-error');
            
            // Afficher l'aperçu
            const reader = new FileReader();
            reader.onload = function(e) {
                const previewImg = document.getElementById('avatar-preview-img');
                if (previewImg) {
                    previewImg.src = e.target.result;
                    
                    // Stocker l'image dans localStorage pour la simulation
                    localStorage.setItem('userAvatar', e.target.result);
                }
            }
            reader.readAsDataURL(file);
        }
    }
});
