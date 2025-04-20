// counter.js - Gestion des compteurs de statistiques du site

document.addEventListener('DOMContentLoaded', function() {
    // Simuler les statistiques réelles avec une légère augmentation aléatoire
    const statsData = {
        members: 256,
        topics: 128,
        responses: 512
    };
    
    // Fonction pour générer un nombre légèrement plus élevé
    function getIncreasedValue(baseValue) {
        // Augmentation aléatoire de 0-3%
        const increase = Math.random() * 0.03;
        return Math.floor(baseValue * (1 + increase));
    }
    
    // Mettre à jour les compteurs
    function updateCounters() {
        // Générer des valeurs légèrement plus élevées pour simuler l'activité
        const newStats = {
            members: getIncreasedValue(statsData.members),
            topics: getIncreasedValue(statsData.topics),
            responses: getIncreasedValue(statsData.responses)
        };
        
        // Mettre à jour tous les compteurs sur la page
        updateCounter('total-members', newStats.members);
        updateCounter('sidebar-members', newStats.members);
        updateCounter('footer-members', newStats.members);
        
        updateCounter('total-topics', newStats.topics);
        updateCounter('sidebar-topics', newStats.topics);
        updateCounter('footer-topics', newStats.topics);
        
        updateCounter('total-responses', newStats.responses);
        updateCounter('sidebar-responses', newStats.responses);
        updateCounter('footer-responses', newStats.responses);
        
        // Mettre à jour les données pour la prochaine itération
        statsData.members = newStats.members;
        statsData.topics = newStats.topics;
        statsData.responses = newStats.responses;
    }
    
    // Mettre à jour un compteur spécifique avec animation
    function updateCounter(id, newValue) {
        const counter = document.getElementById(id);
        if (!counter) return;
        
        const currentValue = parseInt(counter.textContent);
        if (newValue > currentValue) {
            // Animer le compteur
            animateValue(counter, currentValue, newValue, 1000);
        } else {
            counter.textContent = newValue;
        }
    }
    
    // Animation de compteur
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Initialiser les compteurs
    updateCounters();
    
    // Mettre à jour périodiquement (toutes les 30 secondes)
    setInterval(updateCounters, 30000);
});
