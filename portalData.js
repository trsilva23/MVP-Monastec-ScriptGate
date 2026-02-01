/**
 * portalData.js
 * Base de conhecimento para Script Gate (variável global: portalData)
 *
 * OBS: mantenha este arquivo na mesma pasta de index.html
 */

const portalData = [
  {
    id: "linux",
    title: "Comandos de Terminal Linux",
    subtitle: "Administração de Servidores Industriais (ERP, BD, Integrações)",
    description: "Comandos básicos e operações seguras para N1/N2 em servidores Linux. Alterações destrutivas (rm -rf, update em massa) são marcadas com CUIDADO e exigem autorização N3.",
    items: [
      { title: "Listar arquivos (legível)", code: "ls -lh", explanation: "Lista arquivos com tamanhos legíveis (KB/MB/GB)." },
      { title: "Copiar mantendo permissões", code: "cp -rp /origem /destino", explanation: "Copia arquivos mantendo permissões e recursividade." },
      { title: "Mover/renomear", code: "mv /caminho/arquivo /novo/caminho", explanation: "Move ou renomeia arquivos e pastas." },
      { title: "Remover recursivamente (CUIDADO)", code: "rm -rf /diretorio", explanation: "Remove diretório e todo o conteúdo. USAR SOMENTE COM AUTORIZAÇÃO." },
      { title: "Ver processos Java (ERP)", code: "ps -ef | grep java", explanation: "Localiza processos Java (comum em ERPs). Use para identificar PID e status." },
      { title: "Reiniciar serviço systemd", code: "systemctl restart erp.service", explanation: "Reinicia o serviço do ERP (service name pode variar)." },
      { title: "Acompanhar logs em tempo real", code: "tail -f /var/log/messages", explanation: "Acompanha logs do sistema ou do serviço em tempo real." },
      { title: "Espaço em disco", code: "df -Th", explanation: "Verifica espaço disponível e tipos de sistema de arquivos." },
      { title: "SSH seguro", code: "ssh usuario@ip_servidor", explanation: "Acesso remoto seguro ao servidor via SSH." }
    ],
    glossary: [
      { term: "PID", text: "Process ID (identificador numérico de um processo em execução)." },
      { term: "Recursividade", text: "Operação aplicada na pasta e em todas as subpastas dentro dela." },
      { term: "systemd (service)", text: "Sistema de gerenciamento de serviços em Linux moderno; 'unit' é o serviço registrado." }
    ]
  },

  {
    id: "windows",
    title: "Comandos de Terminal Windows",
    subtitle: "Estações de Trabalho, PDVs e Servidores Windows",
    description: "Comandos e procedimentos para diagnóstico em estações Windows e servidores. Use PowerShell para operações mais ricas e seguras.",
    items: [
      { title: "Configuração de rede", code: "ipconfig /all", explanation: "Mostra IP, gateway, DNS, MAC e configurações de rede." },
      { title: "Limpar cache DNS", code: "ipconfig /flushdns", explanation: "Limpa cache local de resolução de nomes." },
      { title: "Mapear unidade de rede", code: "net use Z: \\\\servidor\\pasta", explanation: "Mapeia uma pasta de rede para a letra Z:." },
      { title: "Listar processos", code: "tasklist /v", explanation: "Lista processos em execução com detalhes (usuário, uso de memória)." },
      { title: "Finalizar processo travado", code: "taskkill /F /IM pdv.exe", explanation: "Força o encerramento de um executável travado." },
      { title: "Reiniciar computador", code: "shutdown /r /t 0", explanation: "Reinicia imediatamente." },
      { title: "Testar conectividade e porta (PowerShell)", code: "Test-NetConnection -ComputerName 10.0.0.5 -Port 8080", explanation: "Verifica se uma porta TCP está acessível." }
    ],
    glossary: [
      { term: "GPO", text: "Group Policy Object — política central aplicada por servidores AD a estações." },
      { term: "PowerShell", text: "Shell avançado e linguagem de automação da Microsoft." }
    ]
  },

  {
    id: "networking",
    title: "Comandos de Rede (NOC)",
    subtitle: "Diagnóstico de conectividade, rotas e captura de pacotes",
    description: "Comandos essenciais para identificar perda de conectividade, problemas de DNS, rotas e análise de pacotes. Técnicas de escalonamento indicadas para N2.",
    items: [
      { title: "Ping (teste básico)", code: "ping 10.0.0.1 -n 8", explanation: "Envia 8 pacotes para testar latência e perda." },
      { title: "Traceroute", code: "tracert 8.8.8.8", explanation: "Mostra os saltos entre sua rede e o destino." },
      { title: "Consulta DNS", code: "nslookup -type=mx dominio.com", explanation: "Verifica servidores MX (email) ou resolução A/AAAA." },
      { title: "Tabela ARP", code: "arp -a", explanation: "Lista mapeamentos IP ↔ MAC." },
      { title: "Captura de pacotes (Linux)", code: "tcpdump -i eth0 -w /tmp/cap.pcap", explanation: "Captura pacotes para análise em Wireshark." },
      { title: "Varredura rápida", code: "nmap -sn 192.168.1.0/24", explanation: "Descobre hosts ativos na subrede." }
    ],
    glossary: [
      { term: "ARP", text: "Address Resolution Protocol — traduz IP para endereço MAC na rede local." },
      { term: "MTU", text: "Maximum Transmission Unit — tamanho máximo de pacote que pode ser enviado sem fragmentar." },
      { term: "tcpdump", text: "Ferramenta de captura de pacotes em sistemas Unix-like." }
    ]
  },

  {
    id: "sql",
    title: "Consultas SQL Padronizadas",
    subtitle: "Extrações e correções seguras (ERP, Fiscal, Integrações)",
    description: "Coleção de consultas padronizadas para verificação de vendas, notas fiscais, logs de integração e manutenção. Substitua apenas valores entre aspas conforme indicado.",
    items: [
      {
        title: "Localizar pedido",
        code: "SELECT *\nFROM IND_VENDAS\nWHERE NUM_PEDIDO = 'PEDIDO_EXEMPLO';",
        explanation: "Substituir 'PEDIDO_EXEMPLO' pelo número real do pedido."
      },
      {
        title: "Verificar integração fiscal (últimos erros)",
        code: "SELECT TOP 50 DATA_ERRO, MSG_ERRO\nFROM IND_FISCAL_LOGS\nORDER BY DATA_ERRO DESC;",
        explanation: "Lista as últimas 50 mensagens de erro da integração fiscal (Sefaz)."
      },
      {
        title: "Contagem de vendas por PDV",
        code: "SELECT ID_PDV, COUNT(*) AS QTDE_VENDAS\nFROM IND_VENDAS\nWHERE DATA BETWEEN '2024-01-01' AND '2024-01-31'\nGROUP BY ID_PDV;",
        explanation: "Ajustar período conforme necessidade."
      },
      {
        title: "Atualizar status de nota (CUIDADO)",
        code: "UPDATE IND_FISCAL_NOTAS\nSET STATUS = '1'\nWHERE ID_NOTA = 'ID_EXEMPLO';",
        explanation: "Operação destrutiva: requer aprovação N3 e backup. Não rodar em produção sem autorização."
      }
    ],
    glossary: [
      { term: "SELECT", text: "Comando SQL usado para ler/consultar dados." },
      { term: "UPDATE", text: "Comando SQL que altera dados existentes; potencialmente destrutivo." },
      { term: "TOP (SQL Server)", text: "Limita o número de linhas retornadas (SQL Server)." }
    ]
  },

  {
    id: "troubleshooting",
    title: "Scripts de Troubleshooting N1/N2",
    subtitle: "Playbooks operacionais para incidentes comuns",
    description: "Playbooks passo-a-passo e scripts rápidos para falhas em PDV, impressoras térmicas, integrações fiscais, certificados e backups.",
    items: [
      {
        title: "Impressora térmica não imprime",
        code: "net stop spooler && net start spooler\nRemover filas de impressão e verificar porta COM/USB no Gerenciador de Dispositivos.",
        explanation: "Reinicia o spooler e limpa filas. Se persistir, trocar cabo e verificar driver."
      },
      {
        title: "Coletor Wi-Fi sem IP",
        code: "netsh wlan show interfaces\nVerificar RSSI e se a VLAN correta está aplicada ao SSID.",
        explanation: "Coletor pode estar numa VLAN errada; confirmar configuração via console de AP/Controller."
      },
      {
        title: "Backup noturno falhou",
        code: "df -h /mnt/backup_share\nVerificar espaço e status do agente de backup (service).",
        explanation: "Se disco lotado, acionar limpeza ou estender volume."
      },
      {
        title: "Cliente não consegue logar (reset seguro)",
        code: "UPDATE IND_SISTEMA_USERS\nSET TENTATIVAS = 0, BLOQUEADO = 'N'\nWHERE EMAIL = 'usuario@empresa.com';",
        explanation: "Reset seguro de tentativas. Operação com confirmação N2."
      }
    ],
    glossary: [
      { term: "Spooler", text: "Fila de impressão do Windows. Se travar, documentos ficam presos." },
      { term: "VLAN", text: "Virtual LAN — isolamentos lógicos de rede dentro da mesma infraestrutura física." }
    ]
  }
];
