let hudCount = 1; 

function openInNewTab(url, showHUD = true) {

  function clearBody() {
    document.body.innerHTML = "";
    document.body.style.overflow = 'visible'; 
    window.removeEventListener('keydown', handleKeyDown);
  }

  function manageHUD() {
    const existingHUDs = document.querySelectorAll('#buttonHUD');

    if (existingHUDs.length > 1) {
      existingHUDs.forEach(hud => hud.remove());
      hudCount = 1; 
    } else if (existingHUDs.length === 1) {
      hudCount = 1; 
    } else {
      hudCount = 0; 
    }
  }
  
  manageHUD();

  const icon = document.createElement('link');
  icon.rel = "shortcut icon";
  icon.href = "https://ilmrx.neocities.org/images/misc/favicon.png";
  icon.type = "image/png";
  document.head.appendChild(icon);

  document.title = "Home";

  const iframe = document.createElement('iframe');
  iframe.allow = "camera; microphone; display-capture; notifications; clipboard-write; clipboard-read; presentation;";
  iframe.allowFullscreen = true;
  iframe.referrerPolicy = 'no-referrer';
  iframe.style.border = 'none';
  iframe.style.position = 'fixed';
  iframe.style.top = '0';
  iframe.style.left = '0';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.id = 'content';
  document.body.innerHTML = ""; 
  document.body.appendChild(iframe);
  iframe.src = url;

  // Skibidi-style CSS animations
  const style = document.createElement('style');
  style.textContent = `
    #buttonHUD img {
      transition: transform 0.3s ease;
    }

    #buttonHUD img:hover {
      transform: scale(1.2);
    }
  `;
  document.head.appendChild(style);

  if (showHUD) {
    const newButtonHUD = document.createElement('div');
    newButtonHUD.id = 'buttonHUD';
    newButtonHUD.style.position = 'fixed';
    newButtonHUD.style.top = '0';
    newButtonHUD.style.left = '0';
    newButtonHUD.style.width = '100%';
    newButtonHUD.style.height = '40px';
    newButtonHUD.style.backgroundColor = 'rgba(51, 51, 51, 0.5)'; 
    newButtonHUD.style.backdropFilter = 'blur(10px)'; 
    newButtonHUD.style.display = 'flex';
    newButtonHUD.style.alignItems = 'center';
    newButtonHUD.style.justifyContent = 'space-between';
    newButtonHUD.style.padding = '0 10px'; 
    newButtonHUD.style.zIndex = '9999'; 
    newButtonHUD.style.transition = 'all 0.3s ease'; 
    document.body.appendChild(newButtonHUD);

    const iconBaseUrl = 'https://ilmrx.neocities.org/images/icons/';

    const homeIcon = document.createElement('img');
    homeIcon.src = `${iconBaseUrl}/Home.png`; 
    homeIcon.alt = 'Home';
    homeIcon.style.width = '24px';
    homeIcon.style.cursor = 'pointer';
    homeIcon.style.marginRight = '10px';
    homeIcon.addEventListener('click', function() {
      manageHUD(); 
      hudCount--; 
      clearBody();
      openInNewTab(url ='https://ilmrx.neocities.org/MAINPLACE', false);
    });
    newButtonHUD.appendChild(homeIcon);

    const reloadIcon = document.createElement('img');
    reloadIcon.src = `${iconBaseUrl}/Reload.png`; 
    reloadIcon.alt = 'Reload';
    reloadIcon.style.width = '24px';
    reloadIcon.style.cursor = 'pointer';
    reloadIcon.style.marginRight = '10px';
    reloadIcon.addEventListener('click', function() {
      manageHUD(); 
      iframe.src = iframe.src; 
    });
    newButtonHUD.appendChild(reloadIcon);

    const visibilityIcon = document.createElement('img');
    visibilityIcon.src = `${iconBaseUrl}/Hide.png`; 
    visibilityIcon.alt = 'Toggle Visibility';
    visibilityIcon.style.width = '24px';
    visibilityIcon.style.cursor = 'pointer';
    visibilityIcon.style.marginRight = '10px';
    visibilityIcon.addEventListener('click', function() {
      hudCount--; 
      manageHUD(); 
      newButtonHUD.style.display = 'none';
    });
    newButtonHUD.appendChild(visibilityIcon);

    const urlBar = document.createElement('input');
    urlBar.type = 'text';
    urlBar.value = url; 
    urlBar.style.width = '400px'; 
    urlBar.style.flex = '1';
    urlBar.style.marginLeft = '10px';
    urlBar.style.padding = '5px';
    urlBar.readOnly = true; 
    newButtonHUD.appendChild(urlBar);

    const batteryDisplay = document.createElement('div');
    batteryDisplay.id = 'batteryDisplay';
    batteryDisplay.style.marginLeft = '10px';

    function updateBatteryDisplay(battery) {
      batteryDisplay.innerHTML = '';
      const batteryLevel = battery.level * 100;
      let imageSrc;

      if (batteryLevel <= 10) {
        imageSrc = 'https://ilmrx.neocities.org/images/battery/1.png';
      } else if (batteryLevel <= 20) {
        imageSrc = 'https://ilmrx.neocities.org/images/battery/2.png';
      } else if (batteryLevel <= 30) {
        imageSrc = 'https://ilmrx.neocities.org/images/battery/3.png';
      } else if (batteryLevel <= 40) {
        imageSrc = 'https://ilmrx.neocities.org/images/battery/4.png';
      } else if (batteryLevel <= 50) {
        imageSrc = 'https://ilmrx.neocities.org/images/battery/5.png';
      } else if (batteryLevel <= 60) {
        imageSrc = 'https://ilmrx.neocities.org/images/battery/6.png';
      } else if (batteryLevel <= 70) {
        imageSrc = 'https://ilmrx.neocities.org/images/battery/7.png';
      } else if (batteryLevel <= 80) {
        imageSrc = 'https://ilmrx.neocities.org/images/battery/8.png';
      } else if (batteryLevel <= 90) {
        imageSrc = 'https://ilmrx.neocities.org/images/battery/9.png';
      } else {
        imageSrc = 'https://ilmrx.neocities.org/images/battery/10.png';
      }

      const batteryImage = document.createElement('img');
      batteryImage.src = imageSrc;
      batteryImage.alt = `Battery level: ${batteryLevel.toFixed(0)}%`;
      batteryImage.style.width = '24px';
      batteryDisplay.appendChild(batteryImage);

      const batteryPercentage = document.createElement('span');
      batteryPercentage.textContent = `${batteryLevel.toFixed(0)}%`;
      batteryPercentage.style.marginLeft = '5px';
      batteryDisplay.appendChild(batteryPercentage);
    }

    navigator.getBattery().then(function(battery) {
      updateBatteryDisplay(battery);
      battery.addEventListener('levelchange', () => updateBatteryDisplay(battery));
    });
    newButtonHUD.appendChild(batteryDisplay);

    const timeDisplay = document.createElement('div');
    timeDisplay.id = 'timeDisplay';
    timeDisplay.style.marginLeft = '10px';

    function updateTimeDisplay() {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; 
      timeDisplay.textContent = `${hours}:${minutes} ${ampm}`;
    }

    setInterval(updateTimeDisplay, 1000); 
    newButtonHUD.appendChild(timeDisplay);

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        manageHUD(); 
        clearBody(); 
      }
    }

    window.addEventListener('keydown', handleKeyDown); 
  }
}
