const plantNames = {
  P1: 'Planta 1',
  P2: 'Planta 2',
  buhardilla: 'Buhardilla',
  bodega: 'Bodega'
};

const plantDescriptions = {
  P1: {
    title: "Primera Planta (P1)",
    description: "Planta principal de la vivienda. Aquí se encuentra el cuadro de comunicaciones con el router, switch y patch panel. Incluye entrada desde la calle, salón, cocina, baño y despacho. El cableado Cat6 se distribuye por los macarrones de obra existentes hasta el salón (2 rosetas) y el despacho (3 rosetas)."
  },
  P2: {
    title: "Segunda Planta (P2)",
    description: "Planta de distribución WiFi. Se instala el primer Punto de Acceso WiFi 6 (Mercusys ME60X) en el pasillo, conectado al switch mediante cable Cat6 por los macarrones de obra. Este AP proporciona cobertura a los dormitorios y contribuye a alcanzar la buhardilla. Los dispositivos de esta planta (Smart TV, PC) se conectan por WiFi 6."
  },
  buhardilla: {
    title: "Buhardilla (P4)",
    description: "Espacio dedicado al gaming online. La videoconsola se conecta por WiFi 6 al AP de la tercera planta, situado justo debajo. La atenuación es mínima al ser solo una planta de diferencia, ofreciendo latencias de 1-5 ms suficientes para juegos online competitivos."
  },
  bodega: {
    title: "Bodega / Sótano (PB)",
    description: "Planta sótano con garaje y bodega. Al ser imposible tender cable y no llegar señal WiFi, se utiliza un kit PLC TP-Link TL-PA7017P que transmite la red por el cableado eléctrico. Un adaptador se conecta al switch en P1 y el otro en la bodega, proporcionando conexión Gigabit a la Smart TV."
  }
};

export function initUI(state) {
  const buttons = document.querySelectorAll('.btn-planta');
  const planoPlaceholder = document.getElementById('plano-placeholder');
  const planoImagen = document.getElementById('plano-imagen');
  const planoContainer = document.getElementById('plano-container');
  const infoTitle = document.getElementById('info-planta-title');
  const infoDescription = document.getElementById('info-planta-description');
  const planoExpanded = document.getElementById('plano-expanded');
  const planoExpandedImg = document.getElementById('plano-expanded-img');
  const planoExpandedBg = document.getElementById('plano-expanded-bg');
  const planoCloseBtn = document.getElementById('plano-close-btn');

  let currentPlanoSrc = '';

  planoContainer.addEventListener('click', () => {
    if (currentPlanoSrc) {
      planoExpandedImg.src = currentPlanoSrc;
      planoExpanded.style.display = 'flex';
    }
  });

  function closeExpanded() {
    planoExpanded.style.display = 'none';
    planoExpandedImg.src = '';
  }

  planoCloseBtn.addEventListener('click', closeExpanded);
  planoExpandedBg.addEventListener('click', closeExpanded);

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && planoExpanded.style.display === 'flex') {
      closeExpanded();
    }
  });

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const planta = btn.dataset.planta;
      if (planta === state.currentPlant) return;

      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      state.currentPlant = planta;
      updatePlano(planta);
      updateInfoPlanta(planta);
      if (state.switchModel) {
        state.switchModel(planta);
      }
    });
  });

  function updatePlano(planta) {
    const planoPath = `${import.meta.env.BASE_URL}assets/planos/${planta}.png`;
    const img = new Image();
    img.onload = () => {
      planoImagen.src = planoPath;
      planoImagen.style.display = 'block';
      planoPlaceholder.style.display = 'none';
      currentPlanoSrc = planoPath;
    };
    img.onerror = () => {
      planoImagen.style.display = 'none';
      planoPlaceholder.style.display = 'flex';
      planoPlaceholder.textContent = `Plano ${plantNames[planta]}`;
      currentPlanoSrc = '';
    };
    img.src = planoPath;
  }

  function updateInfoPlanta(planta) {
    const info = plantDescriptions[planta];
    if (info) {
      infoTitle.textContent = info.title;
      infoDescription.textContent = info.description;
    }
  }

  updatePlano(state.currentPlant);
  updateInfoPlanta(state.currentPlant);

  return { updatePlano, updateInfoPlanta };
}
