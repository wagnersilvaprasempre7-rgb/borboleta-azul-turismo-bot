const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

let reiniciando = false;

const client = new Client({
  authStrategy: new LocalAuth({
    dataPath: './session'
  }),
  puppeteer: {
    headless: true,
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

function menu() {
  return `🌎 *Borboleta Azul Turismo* 🦋

Digite uma opção:

1 - Pontos turísticos
2 - Passeios
3 - Restaurantes
4 - Hotéis
5 - Falar com atendente

Ou digite:
menu`;
}

client.on('qr', (qr) => {
  console.log('\nESCANEIE O QR CODE ABAIXO:\n');
  qrcode.generate(qr, { small: false });
});

client.on('loading_screen', (percent, message) => {
  console.log(`Carregando: ${percent}% - ${message}`);
});

client.on('authenticated', () => {
  console.log('WhatsApp autenticado com sucesso.');
});

client.on('ready', async () => {
  console.log('BOT ONLINE 🚀');

  try {
    const state = await client.getState();
    console.log('Estado atual:', state);
  } catch (erro) {
    console.log('Não foi possível obter o estado do cliente.');
  }
});

client.on('auth_failure', (msg) => {
  console.error('Falha na autenticação:', msg);
});

client.on('disconnected', async (reason) => {
  console.log('Bot desconectado:', reason);

  if (reiniciando) return;
  reiniciando = true;

  try {
    console.log('Tentando reinicializar em 5 segundos...');
    await new Promise(resolve => setTimeout(resolve, 5000));
    await client.initialize();
  } catch (erro) {
    console.error('Erro ao reinicializar:', erro);
  } finally {
    reiniciando = false;
  }
});

async function responderMensagem(msg) {
  if (!msg.body) return;
  if (msg.fromMe) return;

  const texto = msg.body.toLowerCase().trim();
  const user = msg.from;

  console.log(`Mensagem recebida de ${user}: ${texto}`);

  if (texto === 'oi' || texto === 'olá' || texto === 'ola' || texto === 'menu') {
    await client.sendMessage(user, menu());
    return;
  }

  if (texto === '1') {
    await client.sendMessage(
      user,
      `📍 *Pontos turísticos*
1. Marco Zero do Brasil
2. Ponte Binacional
3. Orla de Oiapoque
4. Mercado Central

Digite *menu* para voltar.`
    );
    return;
  }

  if (texto === '2') {
    await client.sendMessage(
      user,
      `🚤 *Passeios disponíveis*
1. Passeio de barco
2. City tour
3. Tour cultural

Digite *menu* para voltar.`
    );
    return;
  }

  if (texto === '3') {
    await client.sendMessage(
      user,
      `🍽️ *Restaurantes*
1. Restaurante Sabor Regional
2. Churrascaria Fronteira

Digite *menu* para voltar.`
    );
    return;
  }

  if (texto === '4') {
    await client.sendMessage(
      user,
      `🏨 *Hotéis*
1. Hotel Fronteira
2. Pousada Norte

Digite *menu* para voltar.`
    );
    return;
  }

  if (texto === '5') {
    await client.sendMessage(
      user,
      `👨‍💼 Nosso atendimento humano falará com você em breve.`
    );
    return;
  }

  await client.sendMessage(
    user,
    `Não entendi sua mensagem.\n\nDigite *menu* para ver as opções.`
  );
}

client.on('message', async (msg) => {
  try {
    await responderMensagem(msg);
  } catch (erro) {
    console.error('Erro no evento message:', erro);
  }
});

client.on('message_create', async (msg) => {
  try {
    if (msg.fromMe) return;
    await responderMensagem(msg);
  } catch (erro) {
    console.error('Erro no evento message_create:', erro);
  }
});

process.on('unhandledRejection', (reason) => {
  console.error('Erro não tratado (Promise):', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Exceção não capturada:', error);
});

client.initialize().catch((erro) => {
  console.error('Erro ao iniciar o client:', erro);
});
