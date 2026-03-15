const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// =============================
// CONFIGURAÇÕES
// =============================
const PIX_KEY = 'SUA_CHAVE_PIX_AQUI';
const LINK_APP = 'https://seu-app-aqui.com';

// =============================
// DADOS
// =============================
const idiomasUsuario = {};
const etapaUsuario = {};
const reservaUsuario = {};

const pontosTuristicos = {
  1: {
    nome: {
      pt: 'Marco Zero Brasil–França',
      fr: 'Point Zéro Brésil–France',
      en: 'Brazil–France Border Landmark',
      es: 'Marco Brasil–Francia'
    },
    descricao: {
      pt: 'Um dos locais mais simbólicos da fronteira, ideal para fotos e visitação.',
      fr: 'L’un des lieux les plus symboliques de la frontière, idéal pour les photos et les visites.',
      en: 'One of the most symbolic places on the border, great for photos and visits.',
      es: 'Uno de los lugares más simbólicos de la frontera, ideal para fotos y visitas.'
    },
    localizacao: 'https://maps.google.com/?q=Oiapoque+Amapa'
  },
  2: {
    nome: {
      pt: 'Rio Oiapoque',
      fr: 'Rivière Oyapock',
      en: 'Oiapoque River',
      es: 'Río Oiapoque'
    },
    descricao: {
      pt: 'Rio histórico da região, muito procurado para passeios de barco e contemplação.',
      fr: 'Rivière historique de la région, très recherchée pour les promenades en bateau.',
      en: 'A historic river in the region, popular for boat tours and sightseeing.',
      es: 'Río histórico de la región, muy buscado para paseos en bote.'
    },
    localizacao: 'https://maps.google.com/?q=Rio+Oiapoque'
  },
  3: {
    nome: {
      pt: 'Parque Nacional Montanhas do Tumucumaque',
      fr: 'Parc National des Montagnes du Tumucumaque',
      en: 'Tumucumaque Mountains National Park',
      es: 'Parque Nacional Montañas del Tumucumaque'
    },
    descricao: {
      pt: 'Área de natureza exuberante, ideal para ecoturismo e experiências na floresta.',
      fr: 'Zone naturelle exceptionnelle, idéale pour l’écotourisme et les expériences en forêt.',
      en: 'A stunning natural area, ideal for ecotourism and forest experiences.',
      es: 'Área natural exuberante, ideal para ecoturismo y experiencias en la selva.'
    },
    localizacao: 'https://maps.google.com/?q=Parque+Tumucumaque'
  },
  4: {
    nome: {
      pt: 'Experiência cultural indígena',
      fr: 'Expérience culturelle autochtone',
      en: 'Indigenous cultural experience',
      es: 'Experiencia cultural indígena'
    },
    descricao: {
      pt: 'Contato com cultura, tradições e vivências locais da região.',
      fr: 'Contact avec la culture, les traditions et les expériences locales.',
      en: 'Connection with local culture, traditions and experiences.',
      es: 'Contacto con la cultura, tradiciones y vivencias locales.'
    },
    localizacao: 'https://maps.google.com/?q=Oiapoque+Amapa'
  }
};

const passeios = {
  1: {
    nome: {
      pt: 'Passeio de barco pelo Rio Oiapoque',
      fr: 'Excursion en bateau sur le fleuve Oyapock',
      en: 'Boat tour on the Oiapoque River',
      es: 'Paseo en bote por el Río Oiapoque'
    },
    valor: 'R$ 80 por pessoa',
    duracao: {
      pt: '2 horas',
      fr: '2 heures',
      en: '2 hours',
      es: '2 horas'
    },
    inclui: {
      pt: ['guia local', 'parada para fotos', 'explicação histórica da fronteira'],
      fr: ['guide local', 'arrêt photo', 'explication historique de la frontière'],
      en: ['local guide', 'photo stop', 'historical explanation of the border'],
      es: ['guía local', 'parada para fotos', 'explicación histórica de la frontera']
    },
    localizacao: 'https://maps.google.com/?q=Rio+Oiapoque'
  },
  2: {
    nome: {
      pt: 'Tour cultural nas aldeias indígenas',
      fr: 'Visite culturelle dans les villages autochtones',
      en: 'Cultural tour in indigenous villages',
      es: 'Tour cultural en aldeas indígenas'
    },
    valor: 'R$ 120 por pessoa',
    duracao: {
      pt: '3 horas',
      fr: '3 heures',
      en: '3 hours',
      es: '3 horas'
    },
    inclui: {
      pt: ['guia local', 'vivência cultural', 'explicação sobre tradições'],
      fr: ['guide local', 'expérience culturelle', 'explication des traditions'],
      en: ['local guide', 'cultural experience', 'explanation of traditions'],
      es: ['guía local', 'experiencia cultural', 'explicación de tradiciones']
    },
    localizacao: 'https://maps.google.com/?q=Oiapoque+Amapa'
  },
  3: {
    nome: {
      pt: 'Trilha ecológica no Tumucumaque',
      fr: 'Randonnée écologique au Tumucumaque',
      en: 'Ecological trail in Tumucumaque',
      es: 'Sendero ecológico en Tumucumaque'
    },
    valor: 'R$ 150 por pessoa',
    duracao: {
      pt: '4 horas',
      fr: '4 heures',
      en: '4 hours',
      es: '4 horas'
    },
    inclui: {
      pt: ['guia especializado', 'paradas de observação', 'orientação ambiental'],
      fr: ['guide spécialisé', 'arrêts d’observation', 'orientation environnementale'],
      en: ['specialized guide', 'observation stops', 'environmental guidance'],
      es: ['guía especializado', 'paradas de observación', 'orientación ambiental']
    },
    localizacao: 'https://maps.google.com/?q=Parque+Tumucumaque'
  },
  4: {
    nome: {
      pt: 'Visita ao Marco Zero Brasil–França',
      fr: 'Visite du Point Zéro Brésil–France',
      en: 'Visit to the Brazil–France border landmark',
      es: 'Visita al Marco Brasil–Francia'
    },
    valor: 'R$ 50 por pessoa',
    duracao: {
      pt: '1h30',
      fr: '1h30',
      en: '1h30',
      es: '1h30'
    },
    inclui: {
      pt: ['guia local', 'parada para fotos', 'informações históricas'],
      fr: ['guide local', 'arrêt photo', 'informations historiques'],
      en: ['local guide', 'photo stop', 'historical information'],
      es: ['guía local', 'parada para fotos', 'información histórica']
    },
    localizacao: 'https://maps.google.com/?q=Oiapoque+Amapa'
  }
};

const hoteis = {
  1: {
    nome: {
      pt: 'Hotel Fronteira',
      fr: 'Hôtel Frontière',
      en: 'Frontier Hotel',
      es: 'Hotel Frontera'
    },
    descricao: {
      pt: 'Hospedagem confortável no centro da cidade.',
      fr: 'Hébergement confortable au centre-ville.',
      en: 'Comfortable accommodation in the city center.',
      es: 'Hospedaje cómodo en el centro de la ciudad.'
    },
    valor: 'A partir de R$ 180 a diária',
    localizacao: 'https://maps.google.com/?q=hotel+oiapoque'
  },
  2: {
    nome: {
      pt: 'Pousada Norte',
      fr: 'Auberge Nord',
      en: 'North Inn',
      es: 'Posada Norte'
    },
    descricao: {
      pt: 'Opção prática e econômica para turistas.',
      fr: 'Option pratique et économique pour les touristes.',
      en: 'Practical and budget-friendly option for tourists.',
      es: 'Opción práctica y económica para turistas.'
    },
    valor: 'A partir de R$ 120 a diária',
    localizacao: 'https://maps.google.com/?q=pousada+oiapoque'
  },
  3: {
    nome: {
      pt: 'Hotel Amazônia',
      fr: 'Hôtel Amazonie',
      en: 'Amazonia Hotel',
      es: 'Hotel Amazonía'
    },
    descricao: {
      pt: 'Hospedagem com ambiente familiar e boa localização.',
      fr: 'Hébergement avec ambiance familiale et bon emplacement.',
      en: 'Family-friendly hotel with good location.',
      es: 'Hospedaje con ambiente familiar y buena ubicación.'
    },
    valor: 'A partir de R$ 220 a diária',
    localizacao: 'https://maps.google.com/?q=hotel+amazonia+oiapoque'
  }
};

const restaurantes = {
  1: {
    nome: {
      pt: 'Restaurante Sabor Regional',
      fr: 'Restaurant Saveur Régionale',
      en: 'Regional Flavor Restaurant',
      es: 'Restaurante Sabor Regional'
    },
    descricao: {
      pt: 'Comida regional, peixes e pratos típicos.',
      fr: 'Cuisine régionale, poissons et plats typiques.',
      en: 'Regional food, fish and traditional dishes.',
      es: 'Comida regional, pescados y platos típicos.'
    },
    faixa: 'R$ 25 a R$ 60',
    localizacao: 'https://maps.google.com/?q=restaurante+oiapoque'
  },
  2: {
    nome: {
      pt: 'Churrascaria Fronteira',
      fr: 'Grill Frontière',
      en: 'Frontier Steakhouse',
      es: 'Churrasquería Frontera'
    },
    descricao: {
      pt: 'Carnes, pratos variados e ambiente familiar.',
      fr: 'Viandes, plats variés et ambiance familiale.',
      en: 'Meat, varied dishes and family-friendly atmosphere.',
      es: 'Carnes, platos variados y ambiente familiar.'
    },
    faixa: 'R$ 35 a R$ 80',
    localizacao: 'https://maps.google.com/?q=churrascaria+oiapoque'
  },
  3: {
    nome: {
      pt: 'Café Oiapoque',
      fr: 'Café Oyapock',
      en: 'Oiapoque Café',
      es: 'Café Oiapoque'
    },
    descricao: {
      pt: 'Lanches, café e refeições rápidas.',
      fr: 'Snacks, café et repas rapides.',
      en: 'Snacks, coffee and quick meals.',
      es: 'Meriendas, café y comidas rápidas.'
    },
    faixa: 'R$ 15 a R$ 40',
    localizacao: 'https://maps.google.com/?q=cafe+oiapoque'
  }
};

// =============================
// TEXTOS
// =============================
const textos = {
  pt: {
    escolherIdioma: `🌎 *Borboleta Azul Turismo*\n\nEscolha seu idioma:\n\n1️⃣ Português\n2️⃣ Français\n3️⃣ English\n4️⃣ Español`,
    menu: `🌎 *Borboleta Azul Turismo* 🦋

Como posso ajudar?

1️⃣ Passeios disponíveis
2️⃣ Pontos turísticos
3️⃣ Enviar localização
4️⃣ Reservar passeio
5️⃣ Pagamento PIX
6️⃣ Abrir aplicativo
7️⃣ Falar com atendente
8️⃣ Hotéis
9️⃣ Restaurantes
🔟 Reservar hotel

Digite *menu* para voltar ao início.`,
    passeiosTitulo: '🚤 *Passeios disponíveis em Oiapoque*',
    pontosTitulo: '📍 *Pontos turísticos em Oiapoque*',
    hoteisTitulo: '🏨 *Hotéis em Oiapoque*',
    restaurantesTitulo: '🍽️ *Restaurantes em Oiapoque*',
    localizacao: `📍 *Localização base de atendimento*\n\nOiapoque - Amapá\n\nMapa:\nhttps://maps.google.com/?q=Oiapoque+Amapa`,
    falarAtendente: '👨‍💼 Nossa equipe irá falar com você em breve.',
    app: `📲 *Aplicativo Borboleta Azul*\n\nAcesse:\n${LINK_APP}`,
    pix: (valor) => `💳 *Pagamento PIX*\n\nValor: ${valor}\n\nChave PIX:\n${PIX_KEY}\n\nApós pagar, envie o comprovante.`,
    reservaPergunta: '📅 Para reservar passeio, envie nesta ordem:\n\nNome completo:\nData desejada:\nQuantidade de pessoas:\nPasseio desejado:',
    reservaHotelPergunta: '🏨 Para reservar hotel, envie nesta ordem:\n\nNome completo:\nHotel desejado:\nData de entrada:\nData de saída:\nQuantidade de hóspedes:',
    reservaRecebida: '✅ Sua pré-reserva foi registrada. Nossa equipe vai confirmar os detalhes em breve.',
    reservaHotelRecebida: '✅ Sua solicitação de reserva de hotel foi registrada. Em breve nossa equipe confirmará os detalhes.',
    opcaoInvalida: 'Opção inválida. Digite *menu* para voltar.',
    natural: {
      fazer: 'Você pode fazer passeio de barco no Rio Oiapoque, visitar o Marco Zero Brasil–França, conhecer experiências culturais indígenas, explorar trilhas ecológicas, encontrar hotéis e também restaurantes locais. Quer que eu te mostre as opções?',
      preco: 'Temos passeios a partir de R$ 50 por pessoa e hotéis a partir de R$ 120 a diária. Posso te mostrar mais detalhes.',
      familia: 'Para família, o passeio de barco, a visita ao Marco Zero e hotéis com localização central costumam ser ótimas opções. Quer ver os detalhes?',
      comida: 'Temos opções de restaurantes com comida regional, churrascaria e café. Posso te mostrar os restaurantes disponíveis.',
      hotel: 'Posso te mostrar hotéis em Oiapoque com descrição, faixa de valor e opção de pré-reserva.',
      default: 'Posso te ajudar com passeios, pontos turísticos, hotéis, restaurantes, localização, reservas e pagamento PIX. Digite *menu* para ver as opções.'
    }
  },
  fr: {
    escolherIdioma: `🌎 *Borboleta Azul Turismo*\n\nChoisissez votre langue :\n\n1️⃣ Português\n2️⃣ Français\n3️⃣ English\n4️⃣ Español`,
    menu: `🌎 *Borboleta Azul Turismo* 🦋

Comment puis-je vous aider ?

1️⃣ Excursions disponibles
2️⃣ Sites touristiques
3️⃣ Envoyer la localisation
4️⃣ Réserver une excursion
5️⃣ Paiement PIX
6️⃣ Ouvrir l'application
7️⃣ Parler à un agent
8️⃣ Hôtels
9️⃣ Restaurants
🔟 Réserver un hôtel

Tapez *menu* pour revenir au début.`,
    passeiosTitulo: '🚤 *Excursions disponibles à Oiapoque*',
    pontosTitulo: '📍 *Sites touristiques à Oiapoque*',
    hoteisTitulo: '🏨 *Hôtels à Oiapoque*',
    restaurantesTitulo: '🍽️ *Restaurants à Oiapoque*',
    localizacao: `📍 *Localisation principale*\n\nOiapoque - Amapá\n\nCarte:\nhttps://maps.google.com/?q=Oiapoque+Amapa`,
    falarAtendente: '👨‍💼 Notre équipe vous répondra bientôt.',
    app: `📲 *Application Borboleta Azul*\n\nAccédez ici:\n${LINK_APP}`,
    pix: (valor) => `💳 *Paiement PIX*\n\nMontant: ${valor}\n\nClé PIX:\n${PIX_KEY}\n\nAprès le paiement, envoyez le reçu.`,
    reservaPergunta: '📅 Pour réserver une excursion, envoyez dans cet ordre:\n\nNom complet:\nDate souhaitée:\nNombre de personnes:\nExcursion souhaitée:',
    reservaHotelPergunta: '🏨 Pour réserver un hôtel, envoyez dans cet ordre:\n\nNom complet:\nHôtel souhaité:\nDate d’arrivée:\nDate de départ:\nNombre d’hôtes:',
    reservaRecebida: '✅ Votre pré-réservation a été enregistrée. Notre équipe confirmera les détails bientôt.',
    reservaHotelRecebida: '✅ Votre demande de réservation d’hôtel a été enregistrée. Notre équipe confirmera bientôt les détails.',
    opcaoInvalida: 'Option invalide. Tapez *menu* pour revenir.',
    natural: {
      fazer: 'Vous pouvez faire une excursion en bateau sur le fleuve Oyapock, visiter le point Brésil–France, découvrir des expériences culturelles autochtones, explorer des sentiers écologiques, trouver des hôtels et aussi des restaurants locaux. Voulez-vous voir les options ?',
      preco: 'Nous avons des excursions à partir de R$ 50 par personne et des hôtels à partir de R$ 120 la nuit. Je peux vous montrer plus de détails.',
      familia: 'Pour une famille, l’excursion en bateau, la visite du point Brésil–France et les hôtels bien situés sont de très bonnes options. Voulez-vous voir les détails ?',
      comida: 'Nous avons des restaurants avec cuisine régionale, grillades et café. Je peux vous montrer les restaurants disponibles.',
      hotel: 'Je peux vous montrer les hôtels à Oiapoque avec description, tarif et option de pré-réservation.',
      default: 'Je peux vous aider avec les excursions, sites touristiques, hôtels, restaurants, localisation, réservations et paiement PIX. Tapez *menu* pour voir les options.'
    }
  },
  en: {
    escolherIdioma: `🌎 *Borboleta Azul Turismo*\n\nChoose your language:\n\n1️⃣ Português\n2️⃣ Français\n3️⃣ English\n4️⃣ Español`,
    menu: `🌎 *Borboleta Azul Turismo* 🦋

How can I help you?

1️⃣ Available tours
2️⃣ Tourist attractions
3️⃣ Send location
4️⃣ Book a tour
5️⃣ PIX payment
6️⃣ Open app
7️⃣ Talk to an agent
8️⃣ Hotels
9️⃣ Restaurants
🔟 Book a hotel

Type *menu* to go back.`,
    passeiosTitulo: '🚤 *Available tours in Oiapoque*',
    pontosTitulo: '📍 *Tourist attractions in Oiapoque*',
    hoteisTitulo: '🏨 *Hotels in Oiapoque*',
    restaurantesTitulo: '🍽️ *Restaurants in Oiapoque*',
    localizacao: `📍 *Main service location*\n\nOiapoque - Amapá\n\nMap:\nhttps://maps.google.com/?q=Oiapoque+Amapa`,
    falarAtendente: '👨‍💼 Our team will contact you soon.',
    app: `📲 *Borboleta Azul App*\n\nAccess here:\n${LINK_APP}`,
    pix: (valor) => `💳 *PIX Payment*\n\nAmount: ${valor}\n\nPIX key:\n${PIX_KEY}\n\nAfter payment, send the receipt.`,
    reservaPergunta: '📅 To book a tour, send in this order:\n\nFull name:\nDesired date:\nNumber of people:\nDesired tour:',
    reservaHotelPergunta: '🏨 To book a hotel, send in this order:\n\nFull name:\nDesired hotel:\nCheck-in date:\nCheck-out date:\nNumber of guests:',
    reservaRecebida: '✅ Your pre-booking has been registered. Our team will confirm the details soon.',
    reservaHotelRecebida: '✅ Your hotel booking request has been registered. Our team will confirm the details soon.',
    opcaoInvalida: 'Invalid option. Type *menu* to go back.',
    natural: {
      fazer: 'You can take a boat tour on the Oiapoque River, visit the Brazil–France landmark, enjoy indigenous cultural experiences, explore ecological trails, find hotels and also local restaurants. Would you like to see the options?',
      preco: 'We have tours starting from R$ 50 per person and hotels starting from R$ 120 per night. I can show you more details.',
      familia: 'For families, the boat tour, the Brazil–France landmark visit and centrally located hotels are usually great choices. Would you like to see the details?',
      comida: 'We have restaurants with regional food, steakhouse options and café. I can show you the available restaurants.',
      hotel: 'I can show you hotels in Oiapoque with description, price range and pre-booking option.',
      default: 'I can help you with tours, tourist attractions, hotels, restaurants, location, bookings and PIX payment. Type *menu* to see the options.'
    }
  },
  es: {
    escolherIdioma: `🌎 *Borboleta Azul Turismo*\n\nElige tu idioma:\n\n1️⃣ Português\n2️⃣ Français\n3️⃣ English\n4️⃣ Español`,
    menu: `🌎 *Borboleta Azul Turismo* 🦋

¿Cómo puedo ayudarte?

1️⃣ Paseos disponibles
2️⃣ Puntos turísticos
3️⃣ Enviar ubicación
4️⃣ Reservar paseo
5️⃣ Pago PIX
6️⃣ Abrir aplicación
7️⃣ Hablar con un agente
8️⃣ Hoteles
9️⃣ Restaurantes
🔟 Reservar hotel

Escribe *menu* para volver al inicio.`,
    passeiosTitulo: '🚤 *Paseos disponibles en Oiapoque*',
    pontosTitulo: '📍 *Puntos turísticos en Oiapoque*',
    hoteisTitulo: '🏨 *Hoteles en Oiapoque*',
    restaurantesTitulo: '🍽️ *Restaurantes en Oiapoque*',
    localizacao: `📍 *Ubicación principal*\n\nOiapoque - Amapá\n\nMapa:\nhttps://maps.google.com/?q=Oiapoque+Amapa`,
    falarAtendente: '👨‍💼 Nuestro equipo hablará contigo en breve.',
    app: `📲 *Aplicación Borboleta Azul*\n\nAccede aquí:\n${LINK_APP}`,
    pix: (valor) => `💳 *Pago PIX*\n\nValor: ${valor}\n\nClave PIX:\n${PIX_KEY}\n\nDespués del pago, envía el comprobante.`,
    reservaPergunta: '📅 Para reservar paseo, envía en este orden:\n\nNombre completo:\nFecha deseada:\nCantidad de personas:\nPaseo deseado:',
    reservaHotelPergunta: '🏨 Para reservar hotel, envía en este orden:\n\nNombre completo:\nHotel deseado:\nFecha de entrada:\nFecha de salida:\nCantidad de huéspedes:',
    reservaRecebida: '✅ Tu pre-reserva fue registrada. Nuestro equipo confirmará los detalles pronto.',
    reservaHotelRecebida: '✅ Tu solicitud de reserva de hotel fue registrada. Nuestro equipo confirmará los detalles pronto.',
    opcaoInvalida: 'Opción inválida. Escribe *menu* para volver.',
    natural: {
      fazer: 'Puedes hacer un paseo en bote por el Río Oiapoque, visitar el Marco Brasil–Francia, conocer experiencias culturales indígenas, explorar senderos ecológicos, encontrar hoteles y también restaurantes locales. ¿Quieres ver las opciones?',
      preco: 'Tenemos paseos desde R$ 50 por persona y hoteles desde R$ 120 por noche. Puedo mostrarte más detalles.',
      familia: 'Para familias, el paseo en bote, la visita al Marco Brasil–Francia y los hoteles bien ubicados suelen ser muy buenas opciones. ¿Quieres ver los detalles?',
      comida: 'Tenemos restaurantes con comida regional, churrasquería y café. Puedo mostrarte los restaurantes disponibles.',
      hotel: 'Puedo mostrarte hoteles en Oiapoque con descripción, precio y opción de pre-reserva.',
      default: 'Puedo ayudarte con paseos, puntos turísticos, hoteles, restaurantes, ubicación, reservas y pago PIX. Escribe *menu* para ver las opciones.'
    }
  }
};

// =============================
// CLIENT
// =============================
const client = new Client({
  authStrategy: new LocalAuth({
    dataPath: './session'
  }),
  puppeteer: {
    headless: true,
    protocolTimeout: 120000,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--single-process',
      '--disable-gpu'
    ]
  }
});

client.on('qr', (qr) => {
  console.log('\nESCANEIE O QR CODE ABAIXO:\n');
  qrcode.generate(qr, { small: false });
});

client.on('ready', () => {
  console.log('BOT BORBOLETA AZUL TURISMO ONLINE 🦋');
});

client.on('authenticated', () => {
  console.log('WhatsApp autenticado com sucesso.');
});

client.on('auth_failure', (msg) => {
  console.log('Falha na autenticação:', msg);
});

client.on('disconnected', (reason) => {
  console.log('Bot desconectado:', reason);
});

// =============================
// FUNÇÕES
// =============================
function getIdioma(user) {
  return idiomasUsuario[user] || 'pt';
}

function t(user) {
  return textos[getIdioma(user)];
}

async function responderComDigitacao(msg, resposta, tempo = 1800) {
  const chat = await msg.getChat();
  await chat.sendSeen();
  await chat.sendStateTyping();
  await new Promise(resolve => setTimeout(resolve, tempo));
  await client.sendMessage(msg.from, resposta);
  await chat.clearState();
}

function detectarIntencaoNatural(texto) {
  const txt = texto.toLowerCase();

  if (
    txt.includes('o que tem para fazer') ||
    txt.includes('o que fazer') ||
    txt.includes('que fazer') ||
    txt.includes('what to do') ||
    txt.includes('que faire') ||
    txt.includes('que hacer')
  ) return 'fazer';

  if (
    txt.includes('preço') ||
    txt.includes('valor') ||
    txt.includes('quanto custa') ||
    txt.includes('price') ||
    txt.includes('prix') ||
    txt.includes('precio')
  ) return 'preco';

  if (
    txt.includes('família') ||
    txt.includes('familia') ||
    txt.includes('family') ||
    txt.includes('famille')
  ) return 'familia';

  if (
    txt.includes('restaurante') ||
    txt.includes('comida') ||
    txt.includes('onde comer') ||
    txt.includes('food') ||
    txt.includes('restaurant') ||
    txt.includes('restaurante')
  ) return 'comida';

  if (
    txt.includes('hotel') ||
    txt.includes('hospedagem') ||
    txt.includes('onde ficar') ||
    txt.includes('accommodation') ||
    txt.includes('hébergement') ||
    txt.includes('alojamiento')
  ) return 'hotel';

  return 'default';
}

function listaPasseios(user) {
  const lang = getIdioma(user);
  return `${t(user).passeiosTitulo}

1️⃣ ${passeios[1].nome[lang]}
2️⃣ ${passeios[2].nome[lang]}
3️⃣ ${passeios[3].nome[lang]}
4️⃣ ${passeios[4].nome[lang]}

Digite o número do passeio para ver detalhes.
Digite *menu* para voltar.`;
}

function listaPontos(user) {
  const lang = getIdioma(user);
  return `${t(user).pontosTitulo}

1️⃣ ${pontosTuristicos[1].nome[lang]}
2️⃣ ${pontosTuristicos[2].nome[lang]}
3️⃣ ${pontosTuristicos[3].nome[lang]}
4️⃣ ${pontosTuristicos[4].nome[lang]}

Digite o número do ponto turístico para ver detalhes.
Digite *menu* para voltar.`;
}

function listaHoteis(user) {
  const lang = getIdioma(user);
  return `${t(user).hoteisTitulo}

1️⃣ ${hoteis[1].nome[lang]}
2️⃣ ${hoteis[2].nome[lang]}
3️⃣ ${hoteis[3].nome[lang]}

Digite o número do hotel para ver detalhes.
Digite *menu* para voltar.`;
}

function listaRestaurantes(user) {
  const lang = getIdioma(user);
  return `${t(user).restaurantesTitulo}

1️⃣ ${restaurantes[1].nome[lang]}
2️⃣ ${restaurantes[2].nome[lang]}
3️⃣ ${restaurantes[3].nome[lang]}

Digite o número do restaurante para ver detalhes.
Digite *menu* para voltar.`;
}

function detalhesPasseio(user, numero) {
  const lang = getIdioma(user);
  const passeio = passeios[numero];
  const inclui = passeio.inclui[lang].map(item => `✔ ${item}`).join('\n');

  return `🚤 *${passeio.nome[lang]}*

${lang === 'pt' ? 'Duração' : lang === 'fr' ? 'Durée' : lang === 'en' ? 'Duration' : 'Duración'}: ${passeio.duracao[lang]}
${lang === 'pt' ? 'Valor' : lang === 'fr' ? 'Prix' : lang === 'en' ? 'Price' : 'Valor'}: ${passeio.valor}

${lang === 'pt' ? 'Inclui' : lang === 'fr' ? 'Comprend' : lang === 'en' ? 'Includes' : 'Incluye'}:
${inclui}

${lang === 'pt' ? 'Localização' : lang === 'fr' ? 'Localisation' : lang === 'en' ? 'Location' : 'Ubicación'}:
${passeio.localizacao}

${lang === 'pt'
  ? 'Para reservar, digite *reservar*.'
  : lang === 'fr'
  ? 'Pour réserver, tapez *reservar*.'
  : lang === 'en'
  ? 'To book, type *reservar*.'
  : 'Para reservar, escribe *reservar*.'}`;
}

function detalhesPonto(user, numero) {
  const lang = getIdioma(user);
  const ponto = pontosTuristicos[numero];

  return `📍 *${ponto.nome[lang]}*

${ponto.descricao[lang]}

${lang === 'pt' ? 'Localização' : lang === 'fr' ? 'Localisation' : lang === 'en' ? 'Location' : 'Ubicación'}:
${ponto.localizacao}`;
}

function detalhesHotel(user, numero) {
  const lang = getIdioma(user);
  const hotel = hoteis[numero];

  return `🏨 *${hotel.nome[lang]}*

${hotel.descricao[lang]}

${lang === 'pt' ? 'Valor' : lang === 'fr' ? 'Prix' : lang === 'en' ? 'Price' : 'Valor'}:
${hotel.valor}

${lang === 'pt' ? 'Localização' : lang === 'fr' ? 'Localisation' : lang === 'en' ? 'Location' : 'Ubicación'}:
${hotel.localizacao}

${lang === 'pt'
  ? 'Para reservar hotel, digite *reservar hotel*.'
  : lang === 'fr'
  ? 'Pour réserver un hôtel, tapez *reservar hotel*.'
  : lang === 'en'
  ? 'To book a hotel, type *reservar hotel*.'
  : 'Para reservar hotel, escribe *reservar hotel*.'}`;
}

function detalhesRestaurante(user, numero) {
  const lang = getIdioma(user);
  const restaurante = restaurantes[numero];

  return `🍽️ *${restaurante.nome[lang]}*

${restaurante.descricao[lang]}

${lang === 'pt' ? 'Faixa de valor' : lang === 'fr' ? 'Fourchette de prix' : lang === 'en' ? 'Price range' : 'Rango de precio'}:
${restaurante.faixa}

${lang === 'pt' ? 'Localização' : lang === 'fr' ? 'Localisation' : lang === 'en' ? 'Location' : 'Ubicación'}:
${restaurante.localizacao}`;
}

// =============================
// PROCESSAMENTO
// =============================
async function processarMensagem(msg) {
  if (!msg.body) return;
  if (msg.fromMe) return;

  const texto = msg.body.toLowerCase().trim();
  const user = msg.from;

  if (!idiomasUsuario[user]) {
    if (texto === '1') {
      idiomasUsuario[user] = 'pt';
      etapaUsuario[user] = 'menu';
      await responderComDigitacao(msg, textos.pt.menu, 1800);
      return;
    }
    if (texto === '2') {
      idiomasUsuario[user] = 'fr';
      etapaUsuario[user] = 'menu';
      await responderComDigitacao(msg, textos.fr.menu, 1800);
      return;
    }
    if (texto === '3') {
      idiomasUsuario[user] = 'en';
      etapaUsuario[user] = 'menu';
      await responderComDigitacao(msg, textos.en.menu, 1800);
      return;
    }
    if (texto === '4') {
      idiomasUsuario[user] = 'es';
      etapaUsuario[user] = 'menu';
      await responderComDigitacao(msg, textos.es.menu, 1800);
      return;
    }

    await responderComDigitacao(msg, textos.pt.escolherIdioma, 1500);
    return;
  }

  if (!etapaUsuario[user]) {
    etapaUsuario[user] = 'menu';
  }

  if (
    texto === 'oi' ||
    texto === 'olá' ||
    texto === 'ola' ||
    texto === 'hello' ||
    texto === 'bonjour' ||
    texto === 'hola' ||
    texto === 'menu'
  ) {
    etapaUsuario[user] = 'menu';
    await responderComDigitacao(msg, t(user).menu, 1800);
    return;
  }

  if (texto === 'reservar hotel') {
    etapaUsuario[user] = 'reserva_hotel_livre';
    await responderComDigitacao(msg, t(user).reservaHotelPergunta, 1800);
    return;
  }

  if (!['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'reservar', 'reservar hotel'].includes(texto) && etapaUsuario[user] === 'menu') {
    const intencao = detectarIntencaoNatural(texto);
    await responderComDigitacao(msg, t(user).natural[intencao], 2200);
    return;
  }

  if (etapaUsuario[user] === 'menu') {
    if (texto === '1') {
      etapaUsuario[user] = 'passeios';
      await responderComDigitacao(msg, listaPasseios(user), 1800);
      return;
    }

    if (texto === '2') {
      etapaUsuario[user] = 'pontos';
      await responderComDigitacao(msg, listaPontos(user), 1800);
      return;
    }

    if (texto === '3') {
      await responderComDigitacao(msg, t(user).localizacao, 1500);
      return;
    }

    if (texto === '4') {
      etapaUsuario[user] = 'reserva_livre';
      await responderComDigitacao(msg, t(user).reservaPergunta, 1800);
      return;
    }

    if (texto === '5') {
      await responderComDigitacao(msg, t(user).pix('a combinar conforme passeio ou serviço'), 1600);
      return;
    }

    if (texto === '6') {
      await responderComDigitacao(msg, t(user).app, 1400);
      return;
    }

    if (texto === '7') {
      await responderComDigitacao(msg, t(user).falarAtendente, 1400);
      return;
    }

    if (texto === '8') {
      etapaUsuario[user] = 'hoteis';
      await responderComDigitacao(msg, listaHoteis(user), 1800);
      return;
    }

    if (texto === '9') {
      etapaUsuario[user] = 'restaurantes';
      await responderComDigitacao(msg, listaRestaurantes(user), 1800);
      return;
    }

    if (texto === '10') {
      etapaUsuario[user] = 'reserva_hotel_livre';
      await responderComDigitacao(msg, t(user).reservaHotelPergunta, 1800);
      return;
    }

    await responderComDigitacao(msg, t(user).opcaoInvalida, 1200);
    return;
  }

  if (etapaUsuario[user] === 'passeios') {
    const numero = Number(texto);

    if (passeios[numero]) {
      reservaUsuario[user] = numero;
      etapaUsuario[user] = 'detalhe_passeio';
      await responderComDigitacao(msg, detalhesPasseio(user, numero), 2200);
      return;
    }

    await responderComDigitacao(msg, t(user).opcaoInvalida, 1200);
    return;
  }

  if (etapaUsuario[user] === 'detalhe_passeio') {
    if (texto === 'reservar') {
      etapaUsuario[user] = 'reserva_livre';
      await responderComDigitacao(msg, t(user).reservaPergunta, 1800);
      return;
    }

    await responderComDigitacao(msg, t(user).opcaoInvalida, 1200);
    return;
  }

  if (etapaUsuario[user] === 'pontos') {
    const numero = Number(texto);

    if (pontosTuristicos[numero]) {
      await responderComDigitacao(msg, detalhesPonto(user, numero), 1800);
      return;
    }

    await responderComDigitacao(msg, t(user).opcaoInvalida, 1200);
    return;
  }

  if (etapaUsuario[user] === 'hoteis') {
    const numero = Number(texto);

    if (hoteis[numero]) {
      await responderComDigitacao(msg, detalhesHotel(user, numero), 1800);
      return;
    }

    await responderComDigitacao(msg, t(user).opcaoInvalida, 1200);
    return;
  }

  if (etapaUsuario[user] === 'restaurantes') {
    const numero = Number(texto);

    if (restaurantes[numero]) {
      await responderComDigitacao(msg, detalhesRestaurante(user, numero), 1800);
      return;
    }

    await responderComDigitacao(msg, t(user).opcaoInvalida, 1200);
    return;
  }

  if (etapaUsuario[user] === 'reserva_livre') {
    await responderComDigitacao(msg, t(user).reservaRecebida, 1800);
    etapaUsuario[user] = 'menu';
    return;
  }

  if (etapaUsuario[user] === 'reserva_hotel_livre') {
    await responderComDigitacao(msg, t(user).reservaHotelRecebida, 1800);
    etapaUsuario[user] = 'menu';
    return;
  }
}

client.on('message', async (msg) => {
  try {
    await processarMensagem(msg);
  } catch (erro) {
    console.error('Erro no evento message:', erro);
  }
});

client.on('message_create', async (msg) => {
  try {
    await processarMensagem(msg);
  } catch (erro) {
    console.error('Erro no evento message_create:', erro);
  }
});

client.initialize().catch((erro) => {
  console.error('Erro ao iniciar o bot:', erro);
});
