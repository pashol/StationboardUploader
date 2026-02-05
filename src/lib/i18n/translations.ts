export type Language = 'en' | 'de' | 'fr' | 'it';

export const translations = {
  en: {
    header: {
      title: 'StationBoard',
      github: 'GitHub'
    },
    uploader: {
      title: 'Flash Your StationBoard',
      subtitle: 'Connect your ESP32-2432S028R via USB and click the button below to flash the firmware.',
      selectVersion: 'Select Firmware Version',
      step1: 'Connect USB',
      step2: 'Click Flash',
      step3: 'Done!',
      button: {
        idle: 'Flash v{version}',
        connecting: 'Connecting...',
        downloading: 'Downloading...',
        flashing: 'Flashing...',
        verifying: 'Verifying...',
        complete: 'Flash Complete - Flash Another',
        error: 'Try Again'
      },
      released: 'Released: {date}',
      deviceInfo: 'ESP32-2432S028R (CYD) | Requires Chrome, Edge, or Opera',
      browserNotSupported: {
        title: 'Browser Not Supported',
        message: 'The Web Serial API is required to flash firmware. Please use Chrome, Edge, or Opera browser.'
      }
    },
    marketing: {
      hero: {
        title: 'Swiss Public Transport Display for Home',
        subtitle: 'Bring the train station departure board to your home or office. Get accurate real-time departure times right where you need them.'
      },
      howItWorks: {
        title: 'How It Works',
        step1: {
          title: 'Flash Firmware',
          description: 'Connect your ESP32 via USB and click the flash button above'
        },
        step2: {
          title: 'Configure WiFi',
          description: 'Connect to the "Stationboard-AP" network and set up your stations'
        },
        step3: {
          title: 'Enjoy!',
          description: 'Your StationBoard will display live departures automatically'
        }
      },
      features: {
        title: 'Features',
        realtimeDepartures: {
          title: 'Real-Time Departures',
          description: 'Live Swiss public transport data for trains, buses, trams, and boats. Never miss your connection again.'
        },
        dualStations: {
          title: 'Dual Station Support',
          description: 'Configure two stations and switch between them with a double-click. Perfect for commuters.'
        },
        brightness: {
          title: '5 Brightness Levels',
          description: 'From power-saving sleep mode to full brightness. Automatic night mode from 22:00 to 06:00.'
        },
        btcTicker: {
          title: 'BTC Price Ticker',
          description: 'Optional cryptocurrency price display in the footer for the crypto enthusiasts.'
        },
        wifi: {
          title: 'WiFi Configuration',
          description: 'Easy setup via smartphone captive portal. No computer required for configuration.'
        },
        ota: {
          title: 'OTA Updates',
          description: 'Wireless firmware updates via web browser. Keep your device up to date effortlessly.'
        }
      },
      trust: {
        power: '<1W',
        powerLabel: 'Power Consumption',
        swiss: 'Swiss',
        swissLabel: 'Made Quality',
        openSource: 'Open',
        openSourceLabel: 'Source'
      },
      hardware: {
        title: 'Hardware Requirements',
        device: 'ESP32-2432S028R (CYD - "Cheap Yellow Display")',
        specs: [
          'ESP32 with integrated 2.8" ILI9341 TFT display (320x240)',
          'Built-in boot button for controls',
          'USB power supply (5V)',
          '2.4 GHz WiFi network'
        ]
      }
    },
    versions: {
      title: 'Version History',
      subtitle: 'Latest firmware updates and improvements for your StationBoard',
      changes: 'Changes:',
      note: 'Note: Use the uploader above for automatic flashing, or download the .bin file for manual flashing with esptool.py or ESP Flash Download Tools.',
      download: '.bin'
    },
    footer: {
      title: 'StationBoard',
      subtitle: 'Swiss Public Transport Display for Home',
      openSource: 'Open Source',
      madeIn: 'Made with ❤️ in Switzerland'
    },
    languageSelector: {
      title: 'Language'
    }
  },
  de: {
    header: {
      title: 'StationBoard',
      github: 'GitHub'
    },
    uploader: {
      title: 'StationBoard flashen',
      subtitle: 'Verbinden Sie Ihren ESP32-2432S028R per USB und klicken Sie auf die Schaltfläche, um die Firmware zu flashen.',
      selectVersion: 'Firmware-Version auswählen',
      step1: 'USB verbinden',
      step2: 'Flash klicken',
      step3: 'Fertig!',
      button: {
        idle: 'v{version} flashen',
        connecting: 'Verbinde...',
        downloading: 'Lade herunter...',
        flashing: 'Flashe...',
        verifying: 'Überprüfe...',
        complete: 'Flash abgeschlossen - Nächstes Gerät',
        error: 'Erneut versuchen'
      },
      released: 'Veröffentlicht: {date}',
      deviceInfo: 'ESP32-2432S028R (CYD) | Benötigt Chrome, Edge oder Opera',
      browserNotSupported: {
        title: 'Browser nicht unterstützt',
        message: 'Die Web Serial API ist zum Flashen der Firmware erforderlich. Bitte verwenden Sie Chrome, Edge oder Opera.'
      }
    },
    marketing: {
      hero: {
        title: 'Schweizer öV-Anzeige für Zuhause',
        subtitle: 'Bringen Sie die Bahnhofsabfahrtsanzeige in Ihr Zuhause oder Büro. Erhalten Sie genaue Echtzeit-Abfahrtszeiten genau dort, wo Sie sie brauchen.'
      },
      howItWorks: {
        title: 'So funktioniert\'s',
        step1: {
          title: 'Firmware flashen',
          description: 'Verbinden Sie Ihren ESP32 per USB und klicken Sie auf die Flash-Schaltfläche oben'
        },
        step2: {
          title: 'WiFi konfigurieren',
          description: 'Verbinden Sie sich mit dem Netzwerk "Stationboard-AP" und richten Sie Ihre Stationen ein'
        },
        step3: {
          title: 'Geniessen!',
          description: 'Ihr StationBoard zeigt automatisch Live-Abfahrten an'
        }
      },
      features: {
        title: 'Funktionen',
        realtimeDepartures: {
          title: 'Echtzeit-Abfahrten',
          description: 'Live-Schweizer ÖV-Daten für Züge, Busse, Trams und Schiffe. Verpassen Sie nie wieder Ihre Verbindung.'
        },
        dualStations: {
          title: 'Dual-Station Support',
          description: 'Konfigurieren Sie zwei Stationen und wechseln Sie mit einem Doppelklick zwischen ihnen. Perfekt für Pendler.'
        },
        brightness: {
          title: '5 Helligkeitsstufen',
          description: 'Vom energiesparenden Schlafmodus bis zur vollen Helligkeit. Automatischer Nachtmodus von 22:00 bis 06:00.'
        },
        btcTicker: {
          title: 'BTC-Preisanzeige',
          description: 'Optionale Kryptowährungspreisanzeige in der Fusszeile für Krypto-Enthusiasten.'
        },
        wifi: {
          title: 'WiFi-Konfiguration',
          description: 'Einfache Einrichtung über das Smartphone-Captive-Portal. Kein Computer für die Konfiguration erforderlich.'
        },
        ota: {
          title: 'OTA-Updates',
          description: 'Kabellose Firmware-Updates über den Webbrowser. Halten Sie Ihr Gerät mühelos auf dem neuesten Stand.'
        }
      },
      trust: {
        power: '<1W',
        powerLabel: 'Stromverbrauch',
        swiss: 'Schweizer',
        swissLabel: 'Qualität',
        openSource: 'Open',
        openSourceLabel: 'Source'
      },
      hardware: {
        title: 'Hardware-Anforderungen',
        device: 'ESP32-2432S028R (CYD - "Cheap Yellow Display")',
        specs: [
          'ESP32 mit integriertem 2,8" ILI9341 TFT-Display (320x240)',
          'Eingebauter Boot-Button für Steuerung',
          'USB-Stromversorgung (5V)',
          '2,4 GHz WiFi-Netzwerk'
        ]
      }
    },
    versions: {
      title: 'Versionsverlauf',
      subtitle: 'Neueste Firmware-Updates und Verbesserungen für Ihr StationBoard',
      changes: 'Änderungen:',
      note: 'Hinweis: Verwenden Sie den Uploader oben für automatisches Flashen, oder laden Sie die .bin-Datei für manuelles Flashen mit esptool.py oder ESP Flash Download Tools herunter.',
      download: '.bin'
    },
    footer: {
      title: 'StationBoard',
      subtitle: 'Schweizer öV-Anzeige für Zuhause',
      openSource: 'Open Source',
      madeIn: 'Mit ❤️ in der Schweiz gemacht'
    },
    languageSelector: {
      title: 'Sprache'
    }
  },
  fr: {
    header: {
      title: 'StationBoard',
      github: 'GitHub'
    },
    uploader: {
      title: 'Flasher votre StationBoard',
      subtitle: 'Connectez votre ESP32-2432S028R via USB et cliquez sur le bouton ci-dessous pour flasher le firmware.',
      selectVersion: 'Sélectionner la version du firmware',
      step1: 'Connecter USB',
      step2: 'Cliquer Flash',
      step3: 'Terminé !',
      button: {
        idle: 'Flasher v{version}',
        connecting: 'Connexion...',
        downloading: 'Téléchargement...',
        flashing: 'Flashage...',
        verifying: 'Vérification...',
        complete: 'Flash terminé - Flasher un autre',
        error: 'Réessayer'
      },
      released: 'Publié : {date}',
      deviceInfo: 'ESP32-2432S028R (CYD) | Nécessite Chrome, Edge ou Opera',
      browserNotSupported: {
        title: 'Navigateur non supporté',
        message: 'L\'API Web Serial est requise pour flasher le firmware. Veuillez utiliser Chrome, Edge ou Opera.'
      }
    },
    marketing: {
      hero: {
        title: 'Affichage des transports publics suisses pour la maison',
        subtitle: 'Apportez le tableau des départs de la gare chez vous ou au bureau. Obtenez des horaires de départ en temps réel exacts là où vous en avez besoin.'
      },
      howItWorks: {
        title: 'Comment ça marche',
        step1: {
          title: 'Flasher le firmware',
          description: 'Connectez votre ESP32 via USB et cliquez sur le bouton flash ci-dessus'
        },
        step2: {
          title: 'Configurer le WiFi',
          description: 'Connectez-vous au réseau "Stationboard-AP" et configurez vos stations'
        },
        step3: {
          title: 'Profitez !',
          description: 'Votre StationBoard affichera automatiquement les départs en direct'
        }
      },
      features: {
        title: 'Fonctionnalités',
        realtimeDepartures: {
          title: 'Départs en temps réel',
          description: 'Données en direct des transports publics suisses pour trains, bus, trams et bateaux. Ne manquez plus jamais votre correspondance.'
        },
        dualStations: {
          title: 'Support de deux stations',
          description: 'Configurez deux stations et basculez entre elles avec un double-clic. Parfait pour les navetteurs.'
        },
        brightness: {
          title: '5 niveaux de luminosité',
          description: 'Du mode veille économique à la luminosité maximale. Mode nuit automatique de 22h00 à 06h00.'
        },
        btcTicker: {
          title: 'Ticker de prix BTC',
          description: 'Affichage optionnel du prix des cryptomonnaies dans le pied de page pour les enthousiastes de crypto.'
        },
        wifi: {
          title: 'Configuration WiFi',
          description: 'Configuration facile via le portail captif du smartphone. Aucun ordinateur requis pour la configuration.'
        },
        ota: {
          title: 'Mises à jour OTA',
          description: 'Mises à jour du firmware sans fil via le navigateur web. Gardez votre appareil à jour sans effort.'
        }
      },
      trust: {
        power: '<1W',
        powerLabel: 'Consommation',
        swiss: 'Suisse',
        swissLabel: 'Qualité',
        openSource: 'Open',
        openSourceLabel: 'Source'
      },
      hardware: {
        title: 'Exigences matérielles',
        device: 'ESP32-2432S028R (CYD - "Cheap Yellow Display")',
        specs: [
          'ESP32 avec écran TFT ILI9341 intégré de 2,8" (320x240)',
          'Bouton de démarrage intégré pour les contrôles',
          'Alimentation USB (5V)',
          'Réseau WiFi 2,4 GHz'
        ]
      }
    },
    versions: {
      title: 'Historique des versions',
      subtitle: 'Dernières mises à jour et améliorations du firmware pour votre StationBoard',
      changes: 'Modifications :',
      note: 'Note : Utilisez l\'uploader ci-dessus pour le flashage automatique, ou téléchargez le fichier .bin pour le flashage manuel avec esptool.py ou ESP Flash Download Tools.',
      download: '.bin'
    },
    footer: {
      title: 'StationBoard',
      subtitle: 'Affichage des transports publics suisses pour la maison',
      openSource: 'Open Source',
      madeIn: 'Fait avec ❤️ en Suisse'
    },
    languageSelector: {
      title: 'Langue'
    }
  },
  it: {
    header: {
      title: 'StationBoard',
      github: 'GitHub'
    },
    uploader: {
      title: 'Flasha il tuo StationBoard',
      subtitle: 'Collega il tuo ESP32-2432S028R via USB e clicca il pulsante sotto per flashare il firmware.',
      selectVersion: 'Seleziona versione firmware',
      step1: 'Collega USB',
      step2: 'Clicca Flash',
      step3: 'Fatto!',
      button: {
        idle: 'Flash v{version}',
        connecting: 'Connessione...',
        downloading: 'Download...',
        flashing: 'Flash in corso...',
        verifying: 'Verifica...',
        complete: 'Flash completato - Flasha un altro',
        error: 'Riprova'
      },
      released: 'Rilasciato: {date}',
      deviceInfo: 'ESP32-2432S028R (CYD) | Richiede Chrome, Edge o Opera',
      browserNotSupported: {
        title: 'Browser non supportato',
        message: 'L\'API Web Serial è necessaria per flashare il firmware. Usa Chrome, Edge o Opera.'
      }
    },
    marketing: {
      hero: {
        title: 'Display trasporti pubblici svizzeri per casa',
        subtitle: 'Porta il tabellone partenze della stazione a casa o in ufficio. Ottieni orari di partenza in tempo reale esattamente dove ti servono.'
      },
      howItWorks: {
        title: 'Come funziona',
        step1: {
          title: 'Flasha firmware',
          description: 'Collega il tuo ESP32 via USB e clicca il pulsante flash sopra'
        },
        step2: {
          title: 'Configura WiFi',
          description: 'Connettiti alla rete "Stationboard-AP" e configura le tue stazioni'
        },
        step3: {
          title: 'Goditelo!',
          description: 'Il tuo StationBoard mostrerà automaticamente le partenze in tempo reale'
        }
      },
      features: {
        title: 'Funzionalità',
        realtimeDepartures: {
          title: 'Partenze in tempo reale',
          description: 'Dati in tempo reale dei trasporti pubblici svizzeri per treni, bus, tram e battelli. Non perdere mai più la tua coincidenza.'
        },
        dualStations: {
          title: 'Supporto due stazioni',
          description: 'Configura due stazioni e passa dall\'una all\'altra con un doppio click. Perfetto per i pendolari.'
        },
        brightness: {
          title: '5 livelli luminosità',
          description: 'Dalla modalità risparmio energetico alla luminosità massima. Modalità notturna automatica dalle 22:00 alle 06:00.'
        },
        btcTicker: {
          title: 'Ticker prezzo BTC',
          description: 'Visualizzazione opzionale del prezzo criptovalute nel footer per gli appassionati di crypto.'
        },
        wifi: {
          title: 'Configurazione WiFi',
          description: 'Configurazione facile via portale captive dello smartphone. Nessun computer richiesto per la configurazione.'
        },
        ota: {
          title: 'Aggiornamenti OTA',
          description: 'Aggiornamenti firmware wireless via browser web. Tieni il tuo dispositivo aggiornato senza sforzo.'
        }
      },
      trust: {
        power: '<1W',
        powerLabel: 'Consumo energetico',
        swiss: 'Svizzero',
        swissLabel: 'Qualità',
        openSource: 'Open',
        openSourceLabel: 'Source'
      },
      hardware: {
        title: 'Requisiti hardware',
        device: 'ESP32-2432S028R (CYD - "Cheap Yellow Display")',
        specs: [
          'ESP32 con display TFT ILI9341 integrato 2,8" (320x240)',
          'Pulsante boot integrato per i controlli',
          'Alimentazione USB (5V)',
          'Rete WiFi 2,4 GHz'
        ]
      }
    },
    versions: {
      title: 'Cronologia versioni',
      subtitle: 'Ultimi aggiornamenti firmware e miglioramenti per il tuo StationBoard',
      changes: 'Modifiche:',
      note: 'Nota: Usa l\'uploader sopra per il flash automatico, o scarica il file .bin per il flash manuale con esptool.py o ESP Flash Download Tools.',
      download: '.bin'
    },
    footer: {
      title: 'StationBoard',
      subtitle: 'Display trasporti pubblici svizzeri per casa',
      openSource: 'Open Source',
      madeIn: 'Fatto con ❤️ in Svizzera'
    },
    languageSelector: {
      title: 'Lingua'
    }
  }
};

export type Translations = typeof translations.en;
