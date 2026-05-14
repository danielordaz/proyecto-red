import * as THREE from 'three';

const objectInfo = {
  "highlight_ONT": {
    title: "ONT (Terminal de Red Óptica)",
    description: "Dispositivo proporcionado por el operador de telecomunicaciones. Convierte la señal de fibra óptica que llega desde el exterior en señal eléctrica Ethernet. Se conecta directamente al router mediante un latiguillo Cat6.",
    image: "/assets/images/ont.png",
    purchaseLink: null
  },
  "highlight_latiguillo_05": {
    title: "Latiguillo RJ45 Cat6 (0,5 m)",
    description: "Cable de red prefabricado de 0,5 metros. Se utiliza para las conexiones entre dispositivos de red. Se usa cable ya terminado en fábrica en lugar de la bobina porque estos tramos son visibles y requieren conectores RJ45 profesionales. (La ordenacion de los cables esta expuesta para poder mostrar visiblemente la distribución de estos en el proyecto, sin embargo, en un proyecto de red real se esperaria organizar los cables de una manera mas estetica)",
    image: "/assets/images/latiguillo_05.png",
    purchaseLink: "https://www.amazon.es/JARNHNG-Ethernet-Lnternet-Velocidad-Computadoras/dp/B0D7ZGM7SM/ref=sr_1_10?sr=8-10"
  },
  "highlight_latiguillo_2": {
    title: "Latiguillo RJ45 Cat6 (2 m)",
    description: "Cable de red prefabricado de 2 metros. Se utiliza para las conexiones entre dispositivos de red. Se usa cable ya terminado en fábrica en lugar de la bobina porque estos tramos son visibles y requieren conectores RJ45 profesionales. (La ordenacion de los cables esta expuesta para poder mostrar visiblemente la distribución de estos en el proyecto, sin embargo, en un proyecto de red real se esperaria organizar los cables de una manera mas estetica)",
    image: "/assets/images/latiguillo_2.png",
    purchaseLink: "https://www.amazon.es/JARNHNG-Ethernet-Lnternet-Velocidad-Computadoras/dp/B0D7ZMQZ5L/ref=sr_1_10?sr=8-10"
  },
  "highlight_router": {
    title: "Router WiFi 6 — Mercusys MR80X AX3000",
    description: "Router WiFi 6 (802.11ax) de doble banda (2,4 GHz y 5 GHz) con velocidad combinada de hasta 3 000 Mbps. Dispone de 1 puerto WAN Gigabit y 4 puertos LAN Gigabit. Actúa como puerta de enlace principal: recibe la línea del ISP (a través del ONT) y distribuye la red hacia el switch y los dispositivos de la planta 1. Gracias a OFDMA y MU-MIMO, gestiona múltiples dispositivos simultáneos sin pérdida de velocidad.",
    image: "/assets/images/router.png",
    purchaseLink: "https://www.pccomponentes.com/mercusys-mr80x-router-wi-fi-6-doble-banda-ax3000"
  },
  "highlight_AP": {
    title: "Punto de Acceso — Mercusys ME60X Wifi 6 AX1500",
    description: "Punto de Acceso WiFi 6 (802.11ax), se instala aqui en la segunda planta para dar cobertura WiFi 6 a los tres dormitorios y la buhardilla, zonas donde no queremos complicar la instalacion con cable por no ser necesario.",
    image: "/assets/images/ap.png",
    purchaseLink: "https://www.pccomponentes.com/mercusys-me60x-punto-de-acceso-wifi-6-ax1500"
  },
  "highlight_switch": {
    title: "Switch 8 puertos Gigabit — Mercusys MS108G",
    description: "Switch de 8 puertos Gigabit Ethernet RJ45 (10/100/1000 Mbps). Distribuye la conexión desde el cuadro de comunicaciones hacia todos los dispositivos cableados: rosetas del salón, despacho, puntos de acceso WiFi y adaptador PLC. Al ser Gigabit en todos los puertos, no crea ningún cuello de botella en la red local.",
    image: "/assets/images/switch.png",
    purchaseLink: "https://www.pccomponentes.com/mercusys-ms108g-switch-8-puertos-gigabit-10-100-1000mbps"
  },
  "highlight_patchpanel": {
    title: "Patch Panel 12 puertos — KwMobile",
    description: "Panel de parcheo de 12 puertos Cat6 RJ45. Centraliza en el cuadro de comunicaciones todos los cables que llegan desde las distintas estancias de la vivienda, permitiendo una gestión ordenada y profesional de la instalación. Facilita identificar, reasignar o ampliar conexiones en el futuro sin necesidad de tocar el cableado fijo.",
    image: "/assets/images/patchpanel.png",
    purchaseLink: "https://www.amazon.es/kwmobile-Panel-parcheo-Puertos-Patchpanel/dp/B07QK93BTX"
  },
  "highlight_plc_emisor": {
    title: "Adaptador PLC (Emisor) — TP-Link TL-PA7017P",
    description: "Extremo emisor del kit PLC AV1000. Se enchufa en una toma de corriente cerca del cuadro de comunicaciones y se conecta al switch con un latiguillo Cat6. Envía la señal de red a través del cableado eléctrico de la vivienda hasta el receptor en la bodega. Velocidad de hasta 1 000 Mbps teóricos.",
    image: "/assets/images/plc_emisor.png",
    purchaseLink: "https://www.amazon.es/TP-Link-TL-PA7017P-Gigabit-Powerline-Starter/dp/B0859MDSFX"
  },
  "highlight_plc_receptor": {
    title: "Adaptador PLC (Receptor) — TP-Link TL-PA7017P",
    description: "Extremo receptor del kit PLC AV1000. Se enchufa en cualquier enchufe de la bodega y recibe la señal de red a través del cableado eléctrico. Convierte la señal en conexión Ethernet para la Smart TV. Es la única solución viable para la bodega, ya que no llega señal WiFi y no es posible tender cable de red.",
    image: "/assets/images/plc_receptor.png",
    purchaseLink: "https://www.amazon.es/TP-Link-TL-PA7017P-Gigabit-Powerline-Starter/dp/B0859MDSFX"
  },
  "highlight_roseta_salon": {
    title: "Roseta RJ45 (Salón)",
    description: "Punto de acceso visible en la pared del salón donde el cable de la instalación fija queda accesible. Conecta 1 PC de sobremesa y 1 Smart TV mediante latiguillos Cat6. Instalada aprovechando los macarrones de obra existentes.",
    image: "/assets/images/roseta.png",
    purchaseLink: "https://www.amazon.es/Zenitech-Toma-RJ45-Blanco-Artezo/dp/B01NBID8X7?source=ps-sl-shoppingads-lpcontext&ref_=fplfs&smid=A1AT7YVPFBWXBL&language=es_ES"
  },
  "highlight_roseta_despacho": {
    title: "Rosetas RJ45 (Despacho)",
    description: "3 rosetas RJ45 Cat6 en el despacho: 2 para los ordenadores de sobremesa y 1 para la impresora de red. Instaladas aprovechando los macarrones de obra existentes desde el cuadro de comunicaciones.",
    image: "/assets/images/roseta.png",
    purchaseLink: "https://www.amazon.es/Zenitech-Toma-RJ45-Blanco-Artezo/dp/B01NBID8X7?source=ps-sl-shoppingads-lpcontext&ref_=fplfs&smid=A1AT7YVPFBWXBL&language=es_ES"
  },
  "highlight_roseta_ap_p2": {
    title: "Roseta RJ45 (Punto de Acceso P2)",
    description: "Roseta para el Punto de Acceso WiFi 6 (Mercusys ME60X) instalado en la segunda planta. Conectada al switch mediante cable Cat6 por los macarrones de obra existentes. Da cobertura WiFi 6 a los tres dormitorios y la buhardilla.",
    image: "/assets/images/roseta.png",
    purchaseLink: "https://www.amazon.es/Zenitech-Toma-RJ45-Blanco-Artezo/dp/B01NBID8X7?source=ps-sl-shoppingads-lpcontext&ref_=fplfs&smid=A1AT7YVPFBWXBL&language=es_ES"
  },
  "highlight_tv_p2": {
    title: "Smart TV (Planta 2)",
    description: "SmartTV conectada mediante WiFi 6 (802.11ax) gracias al AP instalado en el pasillo. La diferencia entre cable y WiFi de tan alta velocidad es mínima para las tareas que ejecuta una Smart TV.",
    image: "/assets/images/tv.png",
    purchaseLink: null
  },
  "highlight_pc_p2": {
    title: "PC Doméstico (Planta 2)",
    description: "PC colocado en un dormitorio para uso doméstico, conectado por WiFi 6 (802.11ax) gracias al AP del pasillo, asumiendo que la placa base incluye conexión a internet al tratarse de un PC de uso doméstico. En caso de no soportarlo es posible comprar un adaptador WiFi 6 de alta velocidad por unos 10 euros. Las tareas de un PC doméstico no requieren la fiabilidad del cable puesto que el WiFi 6 ya permite realizar el 99% de las tareas a velocidad similar.",
    image: "/assets/images/pc.png",
    purchaseLink: null
  },
  "highlight_console": {
    title: "Consola Gaming",
    description: "Consola dedicada para juegos online conectada mediante WiFi 6 (802.11ax) gracias al AP del pasillo del piso inmediatamente inferior. La diferencia de pisos es mínima, por lo que se espera una velocidad alta suficiente para jugar con buena experiencia a cualquier juego online, permitiendo competir incluso en títulos que requieran baja latencia. Si se necesitara latencia aún más baja, se podría añadir una canaleta externa.",
    image: "/assets/images/console.png",
    purchaseLink: null
  },
  "highlight_tv_plc": {
    title: "Smart TV (Bodega)",
    description: "Smart TV conectada a la red mediante el adaptador PLC receptor en la bodega. Al no ser posible tender cable ni llegar señal WiFi, el PLC transmite la señal de red a través del cableado eléctrico, proporcionando conexión suficiente para streaming 4K sin necesidad de obra.",
    image: "/assets/images/tv.png",
    purchaseLink: null
  },
  "highlight_pc_despacho": {
    title: "PC Despacho",
    description: "PC de sobremesa en el despacho conectado por cable Cat6 directamente a la roseta de pared. Se ha optado por conexión cableada para garantizar la máxima fiabilidad y la mínima latencia, esencial para tareas profesionales que requieren estabilidad de red constante.",
    image: "/assets/images/pc.png",
    purchaseLink: null
  },
  "highlight_impresora": {
    title: "Impresora de Red (Despacho)",
    description: "Impresora de red instalada en el despacho, conectada por cable Cat6 a su roseta dedicada. Al estar conectada por cable, cualquier dispositivo de la red puede acceder a ella de forma fiable y sin interrupciones, ideal para un entorno de trabajo compartido.",
    image: "/assets/images/impresora.png",
    purchaseLink: null
  },
  "highlight_pc_p1": {
    title: "PC (Planta 1)",
    description: "PC de sobremesa en la planta 1 conectado por cable Cat6 a la roseta del salón. Aunque no era estrictamente necesaria la máxima velocidad, se conectó por cable por comodidad y cercanía con los dispositivos de red del cuadro de comunicaciones.",
    image: "/assets/images/pc.png",
    purchaseLink: null
  },
  "highlight_tv_p1": {
    title: "Smart TV (Planta 1)",
    description: "Smart TV del salón conectada por cable Cat6 a la roseta de pared. Se conectó por cable por comodidad y proximidad al cuadro de comunicaciones, garantizando una conexión estable para streaming sin depender de la red WiFi.",
    image: "/assets/images/tv.png",
    purchaseLink: null
  }
};

function normalizeName(name) {
  return name.replace(/\.?\d+$/, '');
}

function getInfoForObjectName(name) {
  const normalizedName = normalizeName(name);

  if (normalizedName.startsWith('highlight_latiguillo_05')) {
    return objectInfo['highlight_latiguillo_05'];
  }
  if (normalizedName.startsWith('highlight_latiguillo_2')) {
    return objectInfo['highlight_latiguillo_2'];
  }
  if (normalizedName.startsWith('highlight_tv_p2')) {
    return objectInfo['highlight_tv_p2'];
  }
  if (normalizedName.startsWith('highlight_pc_p2')) {
    return objectInfo['highlight_pc_p2'];
  }
  if (normalizedName.startsWith('highlight_console')) {
    return objectInfo['highlight_console'];
  }
  if (normalizedName.startsWith('highlight_tv_plc')) {
    return objectInfo['highlight_tv_plc'];
  }
  if (normalizedName.startsWith('highlight_pc_despacho')) {
    return objectInfo['highlight_pc_despacho'];
  }
  if (normalizedName.startsWith('highlight_impresora')) {
    return objectInfo['highlight_impresora'];
  }
  if (normalizedName.startsWith('highlight_pc_p1')) {
    return objectInfo['highlight_pc_p1'];
  }
  if (normalizedName.startsWith('highlight_tv_p1')) {
    return objectInfo['highlight_tv_p1'];
  }
  return objectInfo[normalizedName];
}

export function initInteraction(sceneData, state, highlightData) {
  const { scene, camera, renderer } = sceneData;
  const { setHoveredObject, isLatiguillo } = highlightData;
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  const tooltip = document.getElementById('tooltip');
  const tooltipImage = document.getElementById('tooltip-image');
  const tooltipTitle = document.getElementById('tooltip-title');
  const tooltipDescription = document.getElementById('tooltip-description');

  let currentHovered = null;
  let tooltipPosition = null;

  function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(state.highlightedObjects || [], false);

    if (intersects.length > 0) {
      const object = intersects[0].object;
      const info = getInfoForObjectName(object.name);

      if (info) {
        if (currentHovered !== object) {
          currentHovered = object;
          state.hoveredObject = object;
          setHoveredObject(object);
          tooltipPosition = { x: event.clientX + 15, y: event.clientY + 15 };

          if (info.image) {
            tooltipImage.src = info.image;
            tooltipImage.style.display = 'block';
            tooltipImage.onerror = () => {
              tooltipImage.style.display = 'none';
            };
          } else {
            tooltipImage.style.display = 'none';
          }

          if (info.purchaseLink) {
            tooltipTitle.innerHTML = `<a href="${info.purchaseLink}" target="_blank" rel="noopener noreferrer">${info.title} ↗</a>`;
          } else {
            tooltipTitle.textContent = info.title;
          }

          tooltipDescription.textContent = info.description;
          tooltip.style.display = 'flex';

          let x = tooltipPosition.x;
          let y = tooltipPosition.y;

          if (x + 340 > window.innerWidth) {
            x = event.clientX - 355;
          }
          if (y + tooltip.offsetHeight > window.innerHeight) {
            y = event.clientY - tooltip.offsetHeight - 15;
          }

          tooltip.style.left = x + 'px';
          tooltip.style.top = y + 'px';
        }
      }
    } else {
      if (currentHovered) {
        currentHovered = null;
        state.hoveredObject = null;
        setHoveredObject(null);
        tooltip.style.display = 'none';
        tooltipPosition = null;
      }
    }
  }

  renderer.domElement.addEventListener('mousemove', onMouseMove);

  renderer.domElement.addEventListener('click', (event) => {
    if (currentHovered) {
      const info = getInfoForObjectName(currentHovered.name);
      if (info && info.purchaseLink) {
        window.open(info.purchaseLink, '_blank', 'noopener,noreferrer');
      }
    }
  });

  const keys = { w: false, a: false, s: false, d: false };
  let moveSpeed = 0.08;
  const minSpeed = 0.02;
  const maxSpeed = 0.3;

  const speedBarFill = document.getElementById('speed-bar-fill');

  function updateSpeedBar() {
    const percent = ((moveSpeed - minSpeed) / (maxSpeed - minSpeed)) * 100;
    speedBarFill.style.width = `${percent}%`;
  }
  updateSpeedBar();

  let isRightMouseDown = false;
  let prevMouse = { x: 0, y: 0 };

  const euler = new THREE.Euler(0, 0, 0, 'YXZ');
  euler.setFromQuaternion(camera.quaternion);

  renderer.domElement.addEventListener('contextmenu', (e) => e.preventDefault());

  renderer.domElement.addEventListener('mousedown', (event) => {
    if (event.button === 2) {
      isRightMouseDown = true;
      prevMouse.x = event.clientX;
      prevMouse.y = event.clientY;
    }
  });

  window.addEventListener('mouseup', (event) => {
    if (event.button === 2) {
      isRightMouseDown = false;
    }
  });

  window.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    if (keys.hasOwnProperty(key)) {
      keys[key] = true;
    }
  });

  window.addEventListener('keyup', (event) => {
    const key = event.key.toLowerCase();
    if (keys.hasOwnProperty(key)) {
      keys[key] = false;
    }
  });

  function handleMovement() {
    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward);

    const right = new THREE.Vector3();
    right.crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize();

    const movement = new THREE.Vector3();

    if (keys.w) movement.add(forward.clone().multiplyScalar(moveSpeed));
    if (keys.s) movement.add(forward.clone().multiplyScalar(-moveSpeed));
    if (keys.a) movement.add(right.clone().multiplyScalar(-moveSpeed));
    if (keys.d) movement.add(right.clone().multiplyScalar(moveSpeed));

    if (movement.length() > 0) {
      camera.position.add(movement);
    }
  }

  function updateMovementLoop() {
    requestAnimationFrame(updateMovementLoop);
    handleMovement();
  }
  updateMovementLoop();

  window.addEventListener('mousemove', (event) => {
    if (isRightMouseDown) {
      const deltaX = event.clientX - prevMouse.x;
      const deltaY = event.clientY - prevMouse.y;

      const sensitivity = 0.003;
      euler.y -= deltaX * sensitivity;
      euler.x -= deltaY * sensitivity;
      euler.x = Math.max(-Math.PI / 2 + 0.01, Math.min(Math.PI / 2 - 0.01, euler.x));

      camera.quaternion.setFromEuler(euler);
    }

    prevMouse.x = event.clientX;
    prevMouse.y = event.clientY;
  });

  renderer.domElement.addEventListener('wheel', (event) => {
    event.preventDefault();

    moveSpeed -= event.deltaY * 0.0001;
    moveSpeed = Math.max(minSpeed, Math.min(maxSpeed, moveSpeed));
    updateSpeedBar();
  }, { passive: false });

  return { raycaster, mouse };
}
