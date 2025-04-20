document.addEventListener('DOMContentLoaded', function() {
    // Vérifier si l'utilisateur est connecté
    function checkLoginStatus() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const currentUser = localStorage.getItem('currentUser');
        
        // Mettre à jour l'interface en fonction de l'état de connexion
        const authButtons = document.querySelector('.auth-buttons');
        const userMenu = document.createElement('div');
        userMenu.className = 'user-menu';
        
        if (isLoggedIn && currentUser) {
            // Remplacer les boutons d'authentification par le menu utilisateur
            if (authButtons) {
                userMenu.innerHTML = `
                    <div class="user-avatar">
                        <img src="img/default-avatar.png" alt="Avatar">
                        <span class="username">${currentUser}</span>
                    </div>
                    <div class="dropdown-menu">
                        <a href="profile.html">Mon profil</a>
                        <a href="my-topics.html">Mes discussions</a>
                        <a href="new-topic.html">Créer une discussion</a>
                        <a href="messages.html">Messages</a>
                        <a href="settings.html">Paramètres</a>
                        <a href="#" id="logout-btn">Déconnexion</a>
                    </div>
                `;
                
                authButtons.parentNode.replaceChild(userMenu, authButtons);
                
                // Ajouter l'événement de déconnexion
                const logoutBtn = document.getElementById('logout-btn');
                if (logoutBtn) {
                    logoutBtn.addEventListener('click', function(e) {
                        e.preventDefault();
                        logout();
                    });
                }
            }
            
            // Ajouter le bouton de création de discussion
            const mainContainer = document.querySelector('main.container');
            if (mainContainer && !document.querySelector('.floating-action-btn')) {
                const floatingBtn = document.createElement('a');
                floatingBtn.className = 'floating-action-btn';
                floatingBtn.href = 'new-topic.html';
                floatingBtn.innerHTML = '<i class="fas fa-plus"></i>';
                floatingBtn.title = 'Créer une nouvelle discussion';
                
                mainContainer.appendChild(floatingBtn);
            }
        }
    }
    
    // Fonction de déconnexion
    function logout() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('rememberMe');
        
        // Redirection vers la page d'accueil
        window.location.href = 'index.html';
    }
    
    // Vérifier l'état de connexion au chargement de la page
    checkLoginStatus();
    
    // Ajouter des classes CSS pour les styles de l'alerte
    function addAlertStyles() {
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            .alert {
                padding: 1rem;
                margin-bottom: 1rem;
                border-radius: var(--border-radius);
                transition: opacity 0.5s ease;
            }
            
            .alert-success {
                background-color: #d4edda;
                color: #155724;
                border: 1px solid #c3e6cb;
            }
            
            .alert-error {
                background-color: #f8d7da;
                color: #721c24;
                border: 1px solid #f5c6cb;
            }
            
            .alert-warning {
                background-color: #fff3cd;
                color: #856404;
                border: 1px solid #ffeeba;
            }
            
            .alert-info {
                background-color: #d1ecf1;
                color: #0c5460;
                border: 1px solid #bee5eb;
            }
            
            .floating-action-btn {
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 60px;
                height: 60px;
                background-color: var(--primary-color);
                color: white;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                transition: all 0.3s ease;
                z-index: 900;
            }
            
            .floating-action-btn:hover {
                background-color: var(--primary-dark);
                transform: scale(1.1);
            }
        `;
        
        document.head.appendChild(styleElement);
    }
    
    // Ajouter les styles pour les alertes
    addAlertStyles();
});
