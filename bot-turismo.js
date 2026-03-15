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

// =============================
// TEXTOS POR IDIOMA
// =============================
const textos = {
  pt: {
    escolherIdioma: `🌎 *Borboleta Azul Turismo*\n\nEscolha seu idioma:\n\n1️⃣ Português\n2️⃣ Français\n3️⃣ English\n4️⃣ Español`,
    menu: `🌎 *Borboleta Azul Turismo* 🦋\n\nComo posso ajudar?\n\n1️⃣ Passeios disponíveis\n2️⃣ Pontos turísticos\n3️⃣ Enviar localização\n4️⃣ Reservar passeio\n5️⃣ Pagamento PIX\n6️⃣ Abrir aplicativo\n7️⃣ Falar com atendente\n\nDigite *menu* para voltar ao início.`,
    passeiosTitulo: '🚤 *Passeios disponíveis em Oiapoque*',
    pontosTitulo: '📍 *Pontos turísticos em Oiapoque*',
    localizacao: `📍 *Localização base de atendimento*\n\nOiapoque - Amapá\n\nMapa:\nhttps://maps.google.com/?q=Oiapoque+Amapa`,
    falarAtendente: '👨‍💼 Nossa equipe irá falar com você em breve.',
    app: `📲 *Aplicativo Borboleta Azul*\n\nAcesse:\n${LINK_APP}`,
    pix: (valor) => `💳 *Pagamento PIX*\n\nValor: ${valor}\n\nChave PIX:\n${PIX_KEY}\n\nApós pagar, envie o comprovante.`,
    reservaPergunta: '📅 Para reservar, envie nesta ordem:\n\nNome completo:\nData desejada:\nQuantidade de pessoas:\nPasseio desejado:',
    reservaRecebida: '✅ Sua pré-reserva foi registrada. Nossa equipe vai confirmar os detalhes em breve.',
    opcaoInvalida: 'Opção inválida. Digite *menu* para voltar.',
    natural: {
      fazer: 'Você pode fazer passeio de barco no Rio Oiapoque, visitar o Marco Zero Brasil–França, conhecer experiências culturais indígenas e explorar trilhas ecológicas. Quer que eu te mostre os passeios disponíveis?',
      preco: 'Temos passeios a partir de R$ 50 por pessoa. Posso te mostrar as opções com valores e duração.',
      familia: 'Para família, normalmente o passeio de barco e a visita ao Marco Zero são ótimas opções. Quer ver os detalhes?',
      default: 'Posso te ajudar com passeios, pontos turísticos, localização, reservas e pagamento PIX. Digite *menu* para ver as opções.'
    }
  },
  fr: {
    escolherIdioma: `🌎 *Borboleta Azul Turismo*\n\nChoisissez votre langue :\n\n1️⃣ Português\n2️⃣ Français\n3️⃣ English\n4️⃣ Español`,
    menu: `🌎 *Borboleta Azul Turismo* 🦋\n\nComment puis-je vous aider ?\n\n1️⃣ Excursions disponibles\n2️⃣ Sites touristiques\n3️⃣ Envoyer la localisation\n4️⃣ Réserver une excursion\n5️⃣ Paiement PIX\n6️⃣ Ouvrir l'application\n7️⃣ Parler à un agent\n\nTapez *menu* pour revenir au début.`,
    passeiosTitulo: '🚤 *Excursions disponibles à Oiapoque*',
    pontosTitulo: '📍 *Sites touristiques à Oiapoque*',
    localizacao: `📍 *Localisation principale*\n\nOiapoque - Amapá\n\nCarte:\nhttps://maps.google.com/?q=Oiapoque+Amapa`,
    falarAtendente: '👨‍💼 Notre équipe vous répondra bientôt.',
    app: `📲 *Application Borboleta Azul*\n\nAccédez ici:\n${LINK_APP}`,
    pix: (valor) => `💳 *Paiement PIX*\n\nMontant: ${valor}\n\nClé PIX:\n${PIX_KEY}\n\nAprès le paiement, envoyez le reçu.`,
    reservaPergunta: '📅 Pour réserver, envoyez dans cet ordre:\n\nNom complet:\nDate souhaitée:\nNombre de personnes:\nExcursion souhaitée:',
    reservaRecebida: '✅ Votre pré-réservation a été enregistrée. Notre équipe confirmera les détails bientôt.',
    opcaoInvalida: 'Option invalide. Tapez *menu* pour revenir.',
    natural: {
      fazer: 'Vous pouvez faire une excursion en bateau sur le fleuve Oyapock, visiter le point Brésil–France, découvrir des expériences culturelles autochtones et explorer des sentiers écologiques. Voulez-vous voir les excursions disponibles ?',
      preco: 'Nous avons des excursions à partir de R$ 50 par personne. Je peux vous montrer les options avec les prix et la durée.',
      familia: 'Pour une famille, l’excursion en bateau et la visite du point Brésil–France sont de très bonnes options. Voulez-vous voir les détails ?',
      default: 'Je peux vous aider avec les excursions, les sites touristiques, la localisation, les réservations et le paiement PIX. Tapez *menu* pour voir les options.'
    }
  },
  en: {
    escolherIdioma: `🌎 *Borboleta Azul Turismo*\n\nChoose your language:\n\n1️⃣ Português\n2️⃣ Français\n3️⃣ English\n4️⃣ Español`,
    menu: `🌎 *Borboleta Azul Turismo* 🦋\n\nHow can I help you?\n\n1️⃣ Available tours\n2️⃣ Tourist attractions\n3️⃣ Send location\n4️⃣ Book a tour\n5️⃣ PIX payment\n6️⃣ Open app\n7️⃣ Talk to an agent\n\nType *menu* to go back.`,
    passeiosTitulo: '🚤 *Available tours in Oiapoque*',
    pontosTitulo: '📍 *Tourist attractions in Oiapoque*',
    localizacao: `📍 *Main service location*\n\nOiapoque - Amapá\n\nMap:\nhttps://maps.google.com/?q=Oiapoque+Amapa`,
    falarAtendente: '👨‍💼 Our team will contact you soon.',
    app: `📲 *Borboleta Azul App*\n\nAccess here:\n${LINK_APP}`,
    pix: (valor) => `💳 *PIX Payment*\n\nAmount: ${valor}\n\nPIX key:\n${PIX_KEY}\n\nAfter payment, send the receipt.`,
    reservaPergunta: '📅 To book, send in this order:\n\nFull name:\nDesired date:\nNumber of people:\nDesired tour:',
    reservaRecebida: '✅ Your pre-booking has been registered. Our team will confirm the details soon.',
    opcaoInvalida: 'Invalid option. Type *menu* to go back.',
    natural: {
      fazer: 'You can take a boat tour on the Oiapoque River, visit the Brazil–France landmark, enjoy indigenous cultural experiences and explore ecological trails. Would you like to see the available tours?',
      preco: 'We have tours starting from R$ 50 per person. I can show you the options with prices and duration.',
      familia: 'For families, the boat tour and the Brazil–France landmark visit are usually great choices. Would you like to see the details?',
      default: 'I can help you with tours, tourist attractions, location, bookings and PIX payment. Type *menu* to see the options.'
    }
  },
  es: {
    escolherIdioma: `🌎 *Borboleta Azul Turismo*\n\nElige tu idioma:\n\n1️⃣ Português\n2️⃣ Français\n3️⃣ English\n4️⃣ Español`,
    menu: `🌎 *Borboleta Azul Turismo* 🦋\n\n¿Cómo puedo ayudarte?\n\n1️⃣ Paseos disponibles\n2️⃣ Puntos turísticos\n3️⃣ Enviar ubicación\n4️⃣ Reservar paseo\n5️⃣ Pago PIX\n6️⃣ Abrir aplicación\n7️⃣ Hablar con un agente\n\nEscribe *menu* para volver al inicio.`,
    passeiosTitulo: '🚤 *Paseos disponibles en Oiapoque*',
    pontosTitulo: '📍 *Puntos turísticos en Oiapoque*',
    localizacao: `📍 *Ubicación principal*\n\nOiapoque - Amapá\n\nMapa:\nhttps://maps.google.com/?q=Oiapoque+Amapa`,
    falarAtendente: '👨‍💼 Nuestro equipo hablará contigo en breve.',
    app: `📲 *Aplicación Borboleta Azul*\n\nAccede aquí:\n${LINK_APP}`,
    pix: (valor) => `💳 *Pago PIX*\n\nValor: ${valor}\n\nClave PIX:\n${PIX_KEY}\n\nDespués del pago, envía el comprobante.`,
    reservaPergunta: '📅 Para reservar, envía en este orden:\n\nNombre completo:\nFecha deseada:\nCantidad de personas:\nPaseo deseado:',
    reservaRecebida: '✅ Tu pre-reserva fue registrada. Nuestro equipo confirmará los detalles pronto.',
    opcaoInvalida: 'Opción inválida. Escribe *menu* para volver.',
    natural: {
      fazer: 'Puedes hacer un paseo en bote por el Río Oiapoque, visitar el Marco Brasil–Francia, conocer experiencias culturales indígenas y explorar senderos ecológicos. ¿Quieres ver los paseos disponibles?',
      preco: 'Tenemos paseos desde R$ 50 por persona. Puedo mostrarte las opciones con precios y duración.',
      familia: 'Para familias, el paseo en bote y la visita al Marco Brasil–Francia suelen ser muy buenas opciones. ¿Quieres ver los detalles?',
      default: 'Puedo ayudarte con paseos, puntos turísticos, ubicación, reservas y pago PIX. Escribe *menu* para ver las opciones.'
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
  const t = texto.toLowerCase();

  if (
    t.includes('o que tem para fazer') ||
    t.includes('o que fazer') ||
    t.includes('que fazer') ||
    t.includes('what to do') ||
    t.includes('que faire') ||
    t.includes('que hacer')
  ) return 'fazer';

  if (
    t.includes('preço') ||
    t.includes('valor') ||
    t.includes('quanto custa') ||
    t.includes('price') ||
    t.includes('prix') ||
    t.includes('precio')
  ) return 'preco';

  if (
    t.includes('família') ||
    t.includes('familia') ||
    t.includes('family') ||
    t.includes('famille')
  ) return 'familia';

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

// =============================
// MENSAGENS
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

  if (texto === 'oi' || texto === 'olá' || texto === 'ola' || texto === 'hello' || texto === 'bonjour' || texto === 'hola' || texto === 'menu') {
    etapaUsuario[user] = 'menu';
    await responderComDigitacao(msg, t(user).menu, 1800);
    return;
  }

  // perguntas naturais
  if (!['1', '2', '3', '4', '5', '6', '7', 'reservar'].includes(texto) && etapaUsuario[user] === 'menu') {
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
      await responderComDigitacao(msg, t(user).pix('a combinar conforme passeio'), 1600);
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

    if (texto === 'menu') {
      etapaUsuario[user] = 'menu';
      await responderComDigitacao(msg, t(user).menu, 1500);
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

  if (etapaUsuario[user] === 'reserva_livre') {
    await responderComDigitacao(msg, t(user).reservaRecebida, 1800);
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
