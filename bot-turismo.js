const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// LINK DO APP
const LINK_APP = 'https://seu-app-aqui.com';

// PONTOS TURÍSTICOS
const pontosTuristicos = {
  1: {
    nome: 'Marco Zero do Brasil',
    descricao: 'Um dos pontos mais conhecidos da região, ideal para visitação e fotos.',
    localizacao: 'https://maps.google.com/?q=Marco+Zero+Oiapoque'
  },
  2: {
    nome: 'Ponte Binacional',
    descricao: 'Importante ligação entre Brasil e Guiana Francesa.',
    localizacao: 'https://maps.google.com/?q=Ponte+Binacional+Oiapoque'
  },
  3: {
    nome: 'Orla de Oiapoque',
    descricao: 'Espaço agradável para passeio e contemplação.',
    localizacao: 'https://maps.google.com/?q=Orla+de+Oiapoque'
  },
  4: {
    nome: 'Mercado Central',
    descricao: 'Local para conhecer produtos regionais e o comércio local.',
    localizacao: 'https://maps.google.com/?q=Mercado+Central+Oiapoque'
  }
};

// PASSEIOS
const passeios = {
  1: {
    nome: 'Passeio de Barco',
    valor: 'R$80',
    duracao: '2 horas'
  },
  2: {
    nome: 'City Tour Oiapoque',
    valor: 'R$60',
    duracao: '1h30'
  },
  3: {
    nome: 'Tour Cultural',
    valor: 'R$100',
    duracao: '3 horas'
  },
  4: {
    nome: 'Passeio Especial Fronteira',
    valor: 'R$120',
    duracao: '4 horas'
  }
};

// RESTAURANTES
const restaurantes = {
  1: {
    nome: 'Restaurante Sabor Regional',
    descricao: 'Comidas típicas e ambiente familiar.',
    localizacao: 'https://maps.google.com/?q=Restaurante+Oiapoque'
  },
  2: {
    nome: 'Churrascaria Fronteira',
    descricao: 'Carnes, pratos regionais e bom atendimento.',
    localizacao: 'https://maps.google.com/?q=Churrascaria+Oiapoque'
  }
};

// HOTÉIS
const hoteis = {
  1: {
    nome: 'Hotel Fronteira',
    descricao: 'Hospedagem confortável no centro da cidade.',
    localizacao: 'https://maps.google.com/?q=Hotel+Oiapoque'
  },
  2: {
    nome: 'Pousada Norte',
    descricao: 'Opção prática e econômica para turistas.',
    localizacao: 'https://maps.google.com/?q=Pousada+Oiapoque'
  }
};

// CONTROLE DE ETAPA
let etapaUsuario = {};
let reservaUsuario = {};

const client = new Client({
  authStrategy: new LocalAuth({
    dataPath: './session'
  }),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
});

client.on('qr', (qr) => {
  console.log('ESCANEIE O QR CODE ABAIXO:\n');
  qrcode.generate(qr, { small: false });
});

client.on('ready', () => {
  console.log('BOT TURÍSTICO BORBOLETA AZUL ONLINE 🦋');
});

client.on('disconnected', (reason) => {
  console.log('Bot desconectado:', reason);
});

client.on('auth_failure', (msg) => {
  console.log('Falha na autenticação:', msg);
});

function saudacao() {
  const hora = new Date().getHours();
  if (hora < 12) return 'Bom dia';
  if (hora < 18) return 'Boa tarde';
  return 'Boa noite';
}

function menuPrincipal() {
  return `${saudacao()} 👋

🌎 *Bem-vindo ao Guia Turístico Borboleta Azul* 🦋

Escolha uma opção:

1️⃣ Pontos turísticos
2️⃣ Passeios disponíveis
3️⃣ Restaurantes
4️⃣ Hotéis
5️⃣ Falar com guia turístico
6️⃣ Abrir aplicativo Borboleta Azul

Digite:
*menu* - voltar ao menu principal`;
}

function menuPontosTuristicos() {
  return `📍 *PONTOS TURÍSTICOS*

1️⃣ Marco Zero do Brasil
2️⃣ Ponte Binacional
3️⃣ Orla de Oiapoque
4️⃣ Mercado Central

Digite o número do local para ver detalhes e localização.

Digite:
*menu* - voltar ao menu principal`;
}

function menuPasseios() {
  return `🚤 *PASSEIOS DISPONÍVEIS*

1️⃣ Passeio de Barco
2️⃣ City Tour Oiapoque
3️⃣ Tour Cultural
4️⃣ Passeio Especial Fronteira

Digite o número do passeio para ver detalhes.

Digite:
*menu* - voltar ao menu principal`;
}

function menuRestaurantes() {
  return `🍽️ *RESTAURANTES*

1️⃣ Restaurante Sabor Regional
2️⃣ Churrascaria Fronteira

Digite o número para ver detalhes e localização.

Digite:
*menu* - voltar ao menu principal`;
}

function menuHoteis() {
  return `🏨 *HOTÉIS*

1️⃣ Hotel Fronteira
2️⃣ Pousada Norte

Digite o número para ver detalhes e localização.

Digite:
*menu* - voltar ao menu principal`;
}

client.on('message', async (msg) => {
  try {
    if (!msg.body) return;

    const texto = msg.body.toLowerCase().trim();
    const user = msg.from;

    if (!etapaUsuario[user]) {
      etapaUsuario[user] = 'menu';
    }

    if (texto === 'oi' || texto === 'olá' || texto === 'ola' || texto === 'menu') {
      etapaUsuario[user] = 'menu';
      await client.sendMessage(user, menuPrincipal());
      return;
    }

    if (etapaUsuario[user] === 'menu') {
      if (texto === '1') {
        etapaUsuario[user] = 'pontos';
        await client.sendMessage(user, menuPontosTuristicos());
        return;
      }

      if (texto === '2') {
        etapaUsuario[user] = 'passeios';
        await client.sendMessage(user, menuPasseios());
        return;
      }

      if (texto === '3') {
        etapaUsuario[user] = 'restaurantes';
        await client.sendMessage(user, menuRestaurantes());
        return;
      }

      if (texto === '4') {
        etapaUsuario[user] = 'hoteis';
        await client.sendMessage(user, menuHoteis());
        return;
      }

      if (texto === '5') {
        await client.sendMessage(
          user,
          '👨‍💼 Nossa equipe de atendimento irá responder em breve.'
        );
        return;
      }

      if (texto === '6') {
        await client.sendMessage(
          user,
          `📲 *Aplicativo Borboleta Azul*\n\nAcesse pelo link:\n${LINK_APP}`
        );
        return;
      }

      await client.sendMessage(user, 'Opção inválida.\n\n' + menuPrincipal());
      return;
    }

    if (etapaUsuario[user] === 'pontos') {
      const numero = Number(texto);

      if (pontosTuristicos[numero]) {
        const ponto = pontosTuristicos[numero];

        await client.sendMessage(
          user,
          `📍 *${ponto.nome}*\n\n${ponto.descricao}\n\nLocalização:\n${ponto.localizacao}`
        );
        return;
      }

      await client.sendMessage(user, 'Opção inválida.\n\n' + menuPontosTuristicos());
      return;
    }

    if (etapaUsuario[user] === 'passeios') {
      const numero = Number(texto);

      if (passeios[numero]) {
        const passeio = passeios[numero];
        reservaUsuario[user] = passeio.nome;
        etapaUsuario[user] = 'reserva';

        await client.sendMessage(
          user,
          `🚤 *${passeio.nome}*\n\n💰 Valor: ${passeio.valor}\n⏱ Duração: ${passeio.duracao}\n\nDigite *reservar* para continuar.\nOu digite *menu* para voltar ao início.`
        );
        return;
      }

      await client.sendMessage(user, 'Opção inválida.\n\n' + menuPasseios());
      return;
    }

    if (etapaUsuario[user] === 'reserva') {
      if (texto === 'reservar') {
        etapaUsuario[user] = 'data_reserva';

        await client.sendMessage(
          user,
          `📅 *RESERVA DE PASSEIO*\n\nPasseio escolhido: ${reservaUsuario[user]}\n\nEscolha a data:\n1️⃣ Amanhã\n2️⃣ Sábado\n3️⃣ Domingo`
        );
        return;
      }

      await client.sendMessage(user, 'Digite *reservar* para continuar a reserva.');
      return;
    }

    if (etapaUsuario[user] === 'data_reserva') {
      let dataEscolhida = '';

      if (texto === '1') dataEscolhida = 'Amanhã';
      if (texto === '2') dataEscolhida = 'Sábado';
      if (texto === '3') dataEscolhida = 'Domingo';

      if (dataEscolhida !== '') {
        await client.sendMessage(
          user,
          `✅ *Reserva registrada com sucesso!*\n\nPasseio: ${reservaUsuario[user]}\nData: ${dataEscolhida}\n\nNossa equipe entrará em contato para confirmar os detalhes.\n\nObrigado por escolher a *Borboleta Azul Turismo* 🦋`
        );

        etapaUsuario[user] = 'menu';
        reservaUsuario[user] = null;
        return;
      }

      await client.sendMessage(
        user,
        'Opção inválida.\n\nEscolha:\n1️⃣ Amanhã\n2️⃣ Sábado\n3️⃣ Domingo'
      );
      return;
    }

    if (etapaUsuario[user] === 'restaurantes') {
      const numero = Number(texto);

      if (restaurantes[numero]) {
        const restaurante = restaurantes[numero];

        await client.sendMessage(
          user,
          `🍽️ *${restaurante.nome}*\n\n${restaurante.descricao}\n\nLocalização:\n${restaurante.localizacao}`
        );
        return;
      }

      await client.sendMessage(user, 'Opção inválida.\n\n' + menuRestaurantes());
      return;
    }

    if (etapaUsuario[user] === 'hoteis') {
      const numero = Number(texto);

      if (hoteis[numero]) {
        const hotel = hoteis[numero];

        await client.sendMessage(
          user,
          `🏨 *${hotel.nome}*\n\n${hotel.descricao}\n\nLocalização:\n${hotel.localizacao}`
        );
        return;
      }

      await client.sendMessage(user, 'Opção inválida.\n\n' + menuHoteis());
      return;
    }
  } catch (erro) {
    console.error('Erro ao processar mensagem:', erro);
  }
});

client.initialize();
