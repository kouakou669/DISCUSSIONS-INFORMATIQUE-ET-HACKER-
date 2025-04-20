document.addEventListener('DOMContentLoaded', function() {
    // Récupération des éléments de l'éditeur
    const editorToolbar = document.querySelector('.editor-toolbar');
    const editorTextarea = document.getElementById('topic-content');
    
    if (editorToolbar && editorTextarea) {
        // Ajouter les événements pour les boutons de l'éditeur
        const toolbarButtons = document.querySelectorAll('.toolbar-btn');
        
        toolbarButtons.forEach(button => {
            button.addEventListener('click', function() {
                const format = this.getAttribute('data-format');
                const textarea = editorTextarea;
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                const selectedText = textarea.value.substring(start, end);
                let replacement = '';
                
                // Déterminer le texte de remplacement en fonction du format
                switch (format) {
                    case 'bold':
                        replacement = `**${selectedText}**`;
                        break;
                    case 'italic':
                        replacement = `*${selectedText}*`;
                        break;
                    case 'code':
                        if (selectedText.includes('\n')) {
                            replacement = `\`\`\`\n${selectedText}\n\`\`\``;
                        } else {
                            replacement = `\`${selectedText}\``;
                        }
                        break;
                    case 'link':
                        const url = prompt('Entrez l\'URL:', 'https://');
                        if (url) {
                            replacement = `[${selectedText || 'lien'}](${url})`;
                        } else {
                            return;
                        }
                        break;
                    case 'list':
                        if (selectedText) {
                            const lines = selectedText.split('\n');
                            replacement = lines.map(line => `- ${line}`).join('\n');
                        } else {
                            replacement = '- ';
                        }
                        break;
                }
                
                // Insérer le texte de remplacement
                textarea.value = textarea.value.substring(0, start) + replacement + textarea.value.substring(end);
                
                // Repositionner le curseur
                const newCursorPos = start + replacement.length;
                textarea.focus();
                textarea.setSelectionRange(newCursorPos, newCursorPos);
            });
        });
    }
    
    // Gestion du bouton de prévisualisation
    const previewBtn = document.getElementById('preview-btn');
    if (previewBtn) {
        previewBtn.addEventListener('click', function() {
            const content = editorTextarea.value;
            if (!content) {
                alert('Veuillez d\'abord rédiger votre message');
                return;
            }
            
            // Créer la modal de prévisualisation
            const previewModal = document.createElement('div');
            previewModal.className = 'preview-modal';
            
            previewModal.innerHTML = `
                <div class="preview-content">
                    <div class="preview-header">
                        <h3>Prévisualisation</h3>
                        <button class="close-preview">&times;</button>
                    </div>
                    <div class="preview-body">
                        ${renderMarkdown(content)}
                    </div>
                    <div class="preview-footer">
                        <button class="btn btn-light close-preview">Fermer</button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(previewModal);
            document.body.style.overflow = 'hidden';
            
            // Ajouter l'événement pour fermer la prévisualisation
            const closeButtons = document.querySelectorAll('.close-preview');
            closeButtons.forEach(button => {
                button.addEventListener('click', function() {
                    previewModal.remove();
                    document.body.style.overflow = '';
                });
            });
            
            // Ajouter les styles de la modal
            addPreviewStyles();
        });
    }
    
    // Fonction pour rendre le Markdown en HTML (version simplifiée)
    function renderMarkdown(text) {
        // Remplacer les balises HTML pour éviter les injections
        text = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        
        // Convertir les titres
        text = text.replace(/^# (.*$)/gm, '<h1>$1</h1>');
        text = text.replace(/^## (.*$)/gm, '<h2>$1</h2>');
        text = text.replace(/^### (.*$)/gm, '<h3>$1</h3>');
        
        // Convertir le gras et l'italique
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
        
        // Convertir les blocs de code
        text = text.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
        text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
        
        // Convertir les liens
        text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
        
        // Convertir les listes
        text = text.replace(/^- (.*$)/gm, '<li>$1</li>');
        text = text.replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>');
        
        // Convertir les paragraphes (lignes vides)
        text = text.replace(/\n\n/g, '</p><p>');
        
        // Envelopper dans un paragraphe
        text = '<p>' + text + '</p>';
        
        // Nettoyer les balises ul imbriquées
        text = text.replace(/<\/ul><ul>/g, '');
        
        return text;
    }
    
    // Ajouter les styles pour la prévisualisation
    function addPreviewStyles() {
        if (!document.getElementById('preview-styles')) {
            const styleElement = document.createElement('style');
            styleElement.id = 'preview-styles';
            styleElement.textContent = `
                .preview-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }
                
                .preview-content {
                    background-color: white;
                    border-radius: var(--border-radius);
                    width: 90%;
                    max-width: 800px;
                    max-height: 90%;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                }
                
                .preview-header {
                    padding: 1rem;
                    border-bottom: 1px solid var(--gray);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .preview-header h3 {
                    margin: 0;
                    color: var(--dark-color);
                }
                
                .close-preview {
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: var(--text-muted);
                }
                
                .preview-body {
                    padding: 1.5rem;
                    overflow-y: auto;
                    flex: 1;
                }
                
                .preview-footer {
                    padding: 1rem;
                    border-top: 1px solid var(--gray);
                    text-align: right;
                }
                
                .preview-body h1, .preview-body h2, .preview-body h3 {
                    margin-top: 1.5rem;
                    margin-bottom: 1rem;
                    color: var(--dark-color);
                }
                
                .preview-body code {
                    background-color: var(--gray-light);
                    padding: 0.2rem 0.4rem;
                    border-radius: 3px;
                    font-family: monospace;
                }
                
                .preview-body pre {
                    background-color: var(--gray-light);
                    padding: 1rem;
                    border-radius: var(--border-radius);
                    overflow-x: auto;
                    margin: 1rem 0;
                }
                
                .preview-body pre code {
                    background-color: transparent;
                    padding: 0;
                }
                
                .preview-body ul {
                    margin: 1rem 0;
                    padding-left: 2rem;
                }
                
                .preview-body a {
                    color: var(--primary-color);
                }
                
                .preview-body img {
                    max-width: 100%;
                    height: auto;
                }
            `;
            
            document.head.appendChild(styleElement);
        }
    }
    
    // Gestion du bouton pour enregistrer comme brouillon
    const saveDraftBtn = document.getElementById('save-draft-btn');
    if (saveDraftBtn) {
        saveDraftBtn.addEventListener('click', function() {
            const title = document.getElementById('topic-title').value;
            const category = document.getElementById('topic-category').value;
            const tags = document.getElementById('topic-tags').value;
            const content = editorTextarea.value;
            
            // Vérifier qu'il y a au moins un titre ou du contenu
            if (!title && !content) {
                alert('Veuillez au moins saisir un titre ou du contenu pour enregistrer un brouillon');
                return;
            }
            
            // Enregistrer le brouillon dans localStorage
            const draft = {
                title: title,
                category: category,
                tags: tags,
                content: content,
                timestamp: new Date().toISOString()
            };
            
            const drafts = JSON.parse(localStorage.getItem('topicDrafts') || '[]');
            drafts.push(draft);
            localStorage.setItem('topicDrafts', JSON.stringify(drafts));
            
            alert('Brouillon enregistré avec succès !');
        });
    }
    
    // Charger un brouillon existant si disponible
    function loadDraft() {
        const drafts = JSON.parse(localStorage.getItem('topicDrafts') || '[]');
        if (drafts.length > 0) {
            // Demander à l'utilisateur s'il souhaite charger le dernier brouillon
            const lastDraft = drafts[drafts.length - 1];
            const draftDate = new Date(lastDraft.timestamp).toLocaleString();
            
            if (confirm(`Vous avez un brouillon sauvegardé le ${draftDate}. Voulez-vous le charger ?`)) {
                document.getElementById('topic-title').value = lastDraft.title || '';
                if (lastDraft.category) {
                    document.getElementById('topic-category').value = lastDraft.category;
                }
                document.getElementById('topic-tags').value = lastDraft.tags || '';
                editorTextarea.value = lastDraft.content || '';
            }
        }
    }
    
    // Vérifier s'il y a un brouillon à charger lors de l'accès à la page de création
    if (window.location.pathname.includes('new-topic.html')) {
        loadDraft();
    }
});
