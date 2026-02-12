// Esperamos a que todo el DOM esté cargado para evitar errores
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Configuración de Música con Seguridad ---
    const musica = document.getElementById('miMusica');
    if (musica) {
        musica.volume = 0.3; // Volumen moderado bajo
    }

    // --- Variables de Elementos ---
    const envelope = document.querySelector('.envelope-wrapper');
    const letter = document.querySelector('.letter');

    // --- Lógica de Interacción (Clic en el sobre) ---
    document.addEventListener('click', (e) => {
        // Verificamos si el clic fue en el corazón o partes del sobre
        const esSobre = e.target.matches(".envelope") || 
                       e.target.matches(".tap-right") || 
                       e.target.matches(".tap-left") || 
                       e.target.matches(".heart");

        if (esSobre) {
            // Intentar reproducir música solo si existe el elemento
            if (musica) {
                musica.play().catch(error => {
                    console.log("El audio espera interacción o el archivo no existe:", error);
                });
            }

            // Animación de apertura
            envelope.classList.toggle('flap');
            
            if (!letter.classList.contains('opened')) {
                setTimeout(() => {
                    letter.classList.add('letter-opening');

                    setTimeout(() => {
                        letter.classList.remove('letter-opening');
                        letter.classList.add('opened');
                    }, 500);
                }, 1000);
            }
        } else if (e.target.matches(".envelope *") ) {
            // Lógica para cerrar
            envelope.classList.remove('flap');
            if (letter.classList.contains("opened")) {
                letter.classList.add("closing-letter");
                setTimeout(() => {
                    letter.classList.remove("closing-letter");
                    letter.classList.remove("opened");
                }, 500);
            }
        }
    });

    // --- Lógica de Clarita (Aparición inicial) ---
    const clarita = document.getElementById('clarita-presentacion');
    if (clarita) {
        const bubble = clarita.querySelector('.bubble');

        // 1. Clarita emerge
        setTimeout(() => {
            clarita.classList.add('active');

            // 2. Aparece el globo
            setTimeout(() => {
                if (bubble) bubble.classList.add('visible');

                // 3. Se queda saludando 3 segundos
                setTimeout(() => {
                    if (bubble) bubble.classList.remove('visible');

                    // 4. Se retira
                    setTimeout(() => {
                        clarita.classList.remove('active');
                    }, 600);
                }, 3000);
            }, 1000);
        }, 500);
    }
});