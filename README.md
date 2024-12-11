# Sistema de Gerenciamento de Usuários com Quasar e Vue.js

## **Visão Geral**
Este projeto é um sistema de gerenciamento de usuários construído utilizando **Vue.js** e **Quasar Framework**, projetado para fornecer um painel interativo com funcionalidades de gerenciamento de usuários. Ele demonstra o uso de APIs externas, gerenciamento de estado local e princípios essenciais de desenvolvimento frontend.

## **Funcionalidades**
- **Autenticação de Usuários**:
  - Funcionalidade de login com uma senha padrão: `123456`.
  - Gerenciamento de sessão (manter e destruir sessões).
- **Dashboard**:
  - Exibe gráficos interativos e informações usando **Highcharts**.
- **Gerenciamento de Usuários**:
  - Visualizar a lista de usuários.
  - Cadastrar um novo usuário.
  - Editar dados do usuário, incluindo um campo de senha.
  - Excluir um usuário.
- **Integração com API**:
  - Utiliza a API Reqres para gerenciamento de dados de usuários.

## **Endpoints da API**
### **Listar Usuários**
- **URI**: `https://reqres.in/api/users?page=1`
- **Tipo**: `GET`
- **Descrição**: Recupera uma lista paginada de usuários.

### **Editar Usuário**
- **URI**: `https://reqres.in/api/users/2`
- **Tipo**: `PUT`
- **Descrição**: Atualiza os detalhes de um usuário existente.

> **Nota**: A API é usada apenas para experimentação, e alterações nos dados (adições, edições, exclusões) não serão persistidas no backend. No entanto, os dados dos usuários são tratados localmente na memória.

## **Tecnologias Utilizadas**
- **Vue.js**: Framework JavaScript para construção de interfaces de usuário.
- **Quasar Framework**: Para construção de componentes de UI responsivos e visualmente atraentes.
- **Vuex**: Gerenciamento de estado para manipular dados de usuários e informações de sessão.
- **Vue Router**: Para gerenciamento de rotas e navegação.
- **Highcharts**: Para criação de gráficos interativos no dashboard.
- **Vercel**: Para hospedagem e implantação na nuvem.

## **Instruções de Instalação**
1. Clone o repositório:
   ```bash
   git clone https://github.com/luizsett7/dashboard-quasar.git
   cd dashboard-quasar
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   quasar dev
   ```

4. Compile para produção:
   ```bash
   quasar build
   ```

5. Implante a pasta `dist/spa` em uma plataforma de nuvem como o Vercel.

## **Uso**
1. **Login**:
   - Acesse https://reqres.in/api/users?page=1 e selecione um endereço de e-mail.
   - Utilize a senha padrão: `123456`.
2. **Navegação**:
   - Após o login, você será redirecionado para o dashboard.
   - Utilize o menu de navegação para acessar a lista de usuários, adicionar novos usuários, editar ou excluir usuários.

## **Documentação do Código**
O código inclui comentários em áreas críticas para garantir clareza e facilidade de entendimento. Por exemplo:
- Chamadas de API e ações do Vuex estão bem documentadas.
- Os guardas de rotas do Vue Router estão explicados para o gerenciamento de sessão.

## **Instruções de Implantação**
1. Envie o projeto para o GitHub:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. Implante no Vercel:
   - Compile o aplicativo com `quasar build`.
   - Certifique-se de que o diretório de saída seja `dist/spa`.
   - Vincule seu repositório do GitHub ou envie os arquivos manualmente para o Vercel.

## **Capturas de Tela**
- **Tela de Login**
  (https://github.com/luizsett7/dashboard-quasar/blob/main/screenshot/screenshot-login.png?raw=true)
- **Dashboard**
  (https://github.com/luizsett7/dashboard-quasar/blob/main/screenshot/screenshot-dashboard.png?raw=true)
- **Lista de Usuários**
  (https://github.com/luizsett7/dashboard-quasar/blob/main/screenshot/screenshot-users.png?raw=true)

## **Melhorias Futuras**
- Adicionar gerenciamento de sessão no lado do servidor.
- Integrar um banco de dados para gerenciamento persistente de usuários.
- Ampliar as análises do dashboard.

## **Autor**
Desenvolvido por **Luiz Guilherme Setti de Oliveira**. 