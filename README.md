# Script Gate — Portal de Scripts e Playbooks Operacionais 

## Sobre
O **Script Gate** é um portal local de conhecimento técnico criado para treinamento, padronização e suporte operacional de analistas **N1 e N2**.

O objetivo deste MVP é demonstrar a centralização de **scripts, comandos, consultas SQL e playbooks de troubleshooting** utilizados no dia a dia de um **Network Operations Center (NOC)**, facilitando o acesso rápido às informações, reduzindo erros operacionais e acelerando o diagnóstico de incidentes em **Redes, Servidores Linux/Windows, ERPs, CRMs, PDVs e Integrações Fiscais**.

O portal foi projetado para funcionar **100% offline**, sendo aberto diretamente no navegador a partir de arquivos locais, sem dependência de servidores web, bancos de dados ou conexão com a internet.

### Especificações Técnicas para rodar localmente
- **Linguagem:** HTML5, CSS3 e JavaScript (Vanilla)
- **Execução:** Navegador Web (Chrome, Edge ou equivalente)
- **Backend:** Não aplicável (portal totalmente estático)
- **Banco de Dados:** Não aplicável (base de conhecimento em JavaScript)
- **Frontend:** Interface customizada com animações modernas
- **Compatibilidade:** Execução via `file://` (arquivos locais do Windows)

## Estrutura
- `index.html`: Página principal do portal (menu inicial e navegação).
- `styles.css`: Estilos visuais, temas Night/Day e animações.
- `script.js`: Lógica de navegação, renderização dinâmica, destaque de sintaxe e botão de cópia.
- `portalData.js`: Base de dados do portal contendo scripts, comandos, exemplos e glossários.

## Conteúdo do Portal
O **Script Gate** organiza o conhecimento técnico nos seguintes tópicos:

- **Comandos de Terminal Linux**  
  Administração de servidores, serviços, processos, logs e armazenamento.

- **Comandos de Terminal Windows**  
  Diagnóstico de estações de trabalho, PDVs, rede, serviços e PowerShell.

- **Comandos de Rede (NOC)**  
  Testes de conectividade, DNS, rotas, captura de pacotes e análise de tráfego.

- **Consultas SQL Padronizadas**  
  Extrações e verificações em bancos de dados de ERP, Fiscal, PDV e Integrações.

- **Scripts de Troubleshooting**  
  Playbooks operacionais para incidentes comuns (impressoras, Wi-Fi, notas fiscais, backups, acessos).

Cada tópico contém:
- Explicações técnicas objetivas
- Exemplos prontos para uso
- Caixas de código com destaque de sintaxe (estilo VS Code)
- Botão de **copiar para a área de transferência**
- Glossários contextuais para termos técnicos

## Instruções
1. Baixar ou clonar o repositório do projeto.
2. Copiar todos os arquivos (`index.html`, `styles.css`, `script.js`, `portalData.js`) para **uma única pasta** no computador.
3. Abrir o arquivo `index.html` diretamente no navegador.
4. Utilizar o botão de alternância **Night / Day** conforme preferência visual.
5. Navegar pelos tópicos e copiar os scripts conforme a necessidade operacional.

> **Atenção:**  
> Scripts e consultas marcados como **CUIDADO** representam operações destrutivas (ex.: `UPDATE`, `DELETE`, `rm -rf`) e devem ser utilizados apenas com autorização de nível **N3** e conforme os procedimentos internos da organização.

## Licença e Créditos

Licença MIT.  
Disponível para modificação e distribuição livre, desde que sejam mantidos os créditos ao autor original.

## Autor
- **GitHub:** [trsilva23]
- **E-mail:** [trsilva23.contato@gmail.com]
