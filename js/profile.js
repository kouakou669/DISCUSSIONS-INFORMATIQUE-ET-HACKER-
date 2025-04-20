// profile.js - Script pour gérer les fonctionnalités du profil utilisateur

document.addEventListener('DOMContentLoaded', function() {
    // Vérifier si l'utilisateur est connecté (simulation)
    if (!localStorage.getItem('isLoggedIn')) {
        // Rediriger vers la page de connexion
        window.location.href = 'login.html';
        return;
    }
    
    // Charger l'avatar de l'utilisateur s'il existe
    const userAvatar = localStorage.getItem('userAvatar');
    if (userAvatar) {
        const avatarImages = document.querySelectorAll('#profile-avatar, #header-avatar');
        avatarImages.forEach(img => {
            img.src = userAvatar;
        });
    }
    
    // Gestion des onglets du profil
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tab = this.getAttribute('data-tab');
            
            // Désactiver tous les onglets
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.add('hidden'));
            
            // Activer l'onglet sélectionné
            this.classList.add('active');
            document.getElementById('tab-' + tab).classList.remove('hidden');
        });
    });
    
    // Prévisualisation de l'avatar lors du changement
    const avatarUpload = document.getElementById('avatar-upload');
    if (avatarUpload) {
        avatarUpload.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const file = this.files[0];
                
                // Vérifier le type de fichier
                if (!file.type.startsWith('image/')) {
                    alert('Veuillez sélectionner une image valide');
                    return;
                }
                
                // Vérifier la taille du fichier (max 2MB)
                if (file.size > 2 * 1024 * 1024) {
                    alert('L\'image ne doit pas dépasser 2MB');
                    return;
                }
                
                // Afficher l'aperçu
                const reader = new FileReader();
                reader.onload = function(e) {
                    // Mettre à jour toutes les instances de l'avatar
                    const avatarImages = document.querySelectorAll('#profile-avatar, #header-avatar');
                    avatarImages.forEach(img => {
                        img.src = e.target.result;
                    });
                    
                    // Stocker l'image dans localStorage pour la simulation
                    localStorage.setItem('userAvatar', e.target.result);
                }
                reader.readAsDataURL(file);
            }
        });
    }
    
    // Gestion de la modification du profil
    const editProfileForm = document.getElementById('edit-profile-form');
    if (editProfileForm) {
        editProfileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simuler la sauvegarde des données
            const username = document.getElementById('edit-username').value;
            const bio = document.getElementById('edit-bio').value;
            
            // Valider les entrées
            if (username.trim() === '') {
                alert('Le nom d\'utilisateur ne peut pas être vide');
                return;
            }
            
            // Simuler une requête au serveur
            editProfileForm.classList.add('loading');
            
            setTimeout(function() {
                // Mettre à jour l'interface
                document.querySelector('.profile-info h1').textContent = username;
                document.querySelector('.about-section p').textContent = bio;
                
                // Afficher le message de succès
                document.getElementById('profile-update-success').style.display = 'block';
                
                // Cacher le message après quelques secondes
                setTimeout(function() {
                    document.getElementById('profile-update-success').style.display = 'none';
                }, 3000);
                
                editProfileForm.classList.remove('loading');
            }, 1000);
        });
    }
    
    // Gestion du compteur de caractères pour la bio
    const bioTextarea = document.getElementById('edit-bio');
    const bioCharCount = document.getElementById('bio-char-count');
    
    if (bioTextarea && bioCharCount) {
        bioTextarea.addEventListener('input', function() {
            const currentLength = this.value.length;
            bioCharCount.textContent = currentLength;
            
            // Avertissement visuel si proche de la limite
            if (currentLength > 450) {
                bioCharCount.classList.add('warning');
            } else {
                bioCharCount.classList.remove('warning');
            }
        });
    }
    
    // Gestion de l'ajout/suppression de tags d'expertise
    const addExpertiseInput = document.getElementById('add-expertise');
    if (addExpertiseInput) {
        addExpertiseInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const expertise = this.value.trim();
                
                if (expertise) {
                    // Vérifier le nombre de tags (max 10)
                    const currentTags = document.querySelectorAll('.expertise-tags.editable .tag').length;
                    if (currentTags >= 10) {
                        alert('Vous ne pouvez pas ajouter plus de 10 tags d\'expertise');
                        return;
                    }
                    
                    // Créer le nouveau tag
                    const tag = document.createElement('span');
                    tag.className = 'tag';
                    tag.innerHTML = `${expertise}<button type="button" class="remove-tag"><i class="fas fa-times"></i></button>`;
                    
                    // Ajouter le tag avant l'input
                    this.parentNode.insertBefore(tag, this);
                    
                    // Vider l'input
                    this.value = '';
                    
                    // Ajouter l'événement de suppression au nouveau tag
                    const removeBtn = tag.querySelector('.remove-tag');
                    removeBtn.addEventListener('click', function() {
                        this.parentNode.remove();
                    });
                }
            }
        });
        
        // Attacher les événements de suppression aux tags existants
        const removeBtns = document.querySelectorAll('.remove-tag');
        removeBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                this.parentNode.remove();
            });
        });
    }
    
    // Gestion du modal de suppression de compte
    const deleteAccountBtn = document.getElementById('delete-account-btn');
    const deleteModal = document.getElementById('delete-account-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const cancelDeleteBtn = document.getElementById('cancel-delete-btn');
    const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
    
    if (deleteAccountBtn && deleteModal) {
        // Ouvrir le modal
        deleteAccountBtn.addEventListener('click', function() {
            deleteModal.style.display = 'flex';
        });
        
        // Fermer le modal
        function closeModal() {
            deleteModal.style.display = 'none';
        }
        
        if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
        if (cancelDeleteBtn) cancelDeleteBtn.addEventListener('click', closeModal);
        
        // Fermer le modal en cliquant à l'extérieur
        window.addEventListener('click', function(e) {
            if (e.target === deleteModal) {
                closeModal();
            }
        });
        
        // Confirmer la suppression du compte
        if (confirmDeleteBtn) {
            confirmDeleteBtn.addEventListener('click', function() {
                const confirmCheck = document.getElementById('confirm-delete');
                const deletePassword = document.getElementById('delete-password');
                
                if (!confirmCheck.checked) {
                    alert('Veuillez confirmer que vous comprenez les conséquences de cette action');
                    return;
                }
                
                if (!deletePassword.value) {
                    alert('Veuillez entrer votre mot de passe pour confirmer');
                    return;
                }
                
                // Simulation de la suppression du compte
                confirmDeleteBtn.textContent = 'Suppression en cours...';
                confirmDeleteBtn.disabled = true;
                
                setTimeout(function() {
                    // Dans une vraie application, ceci serait un appel API pour supprimer le compte
                    localStorage.removeItem('isLoggedIn');
                    localStorage.removeItem('username');
                    localStorage.removeItem('userAvatar');
                    
                    // Rediriger vers la page d'accueil
                    window.location.href = 'index.html';
                }, 2000);
            });
        }
    }
    
    // Gestion du bouton de déconnexion
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Supprimer les données de session
            localStorage.removeItem('isLoggedIn');
            
            // Rediriger vers la page d'accueil
            window.location.href = 'index.html';
        });
    }
    
    // Gestion des statistiques (simulées)
    updateStatCounters();
    
    // Gestion du bouton Suivre
    const followBtn = document.getElementById('follow-btn');
    if (followBtn) {
        followBtn.addEventListener('click', function() {
            if (this.classList.contains('following')) {
                this.innerHTML = '<i class="fas fa-user-plus"></i> Suivre';
                this.classList.remove('following');
            } else {
                this.innerHTML = '<i class="fas fa-user-check"></i> Suivi';
                this.classList.add('following');
            }
        });
    }
});

// Fonction pour mettre à jour les compteurs de statistiques
function updateStatCounters() {
    // Dans une vraie application, ces données viendraient d'une API
    const stats = {
        discussions: Math.floor(Math.random() * 5) + 25, // Entre 25 et 30
        responses: Math.floor(Math.random() * 10) + 128, // Entre 128 et 138
        points: Math.floor(Math.random() * 20) + 512,    // Entre 512 et 532
        helpful: Math.floor(Math.random() * 5) + 42      // Entre 42 et 47
    };
    
    // Mettre à jour l'affichage
    const discussionCount = document.getElementById('discussion-count');
    const responseCount = document.getElementById('response-count');
    const pointsCount = document.getElementById('points-count');
    const helpfulCount = document.getElementById('helpful-count');
    
    if (discussionCount) discussionCount.textContent = stats.discussions;
    if (responseCount) responseCount.textContent = stats.responses;
    if (pointsCount) pointsCount.textContent = stats.points;
    if (helpfulCount) helpfulCount.textContent = stats.helpful;
    
    // Mettre à jour le compteur d'onglets
    const topicCount = document.getElementById('topic-count');
    if (topicCount) topicCount.textContent = stats.discussions;
    
    // Mettre à jour le compteur de réponses dans l'onglet réponses
    const responseTabCount = document.getElementById('response-count');
    if (responseTabCount) responseTabCount.textContent = 2; // Nombre fixe pour correspondre à l'affichage
}
