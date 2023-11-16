/*
AutoLogin Extensão para Chrome

Descrição: Uma extensão para o Chrome que faz login automático em diversos modelos de roteadores e antenas. 
Inclui suporte para dois tipos de usuários: cliente e provedor. A extensão identifica automaticamente qual equipamento 
pertence ao provedor e qual pertence ao cliente. Modelos testados incluem Intelbras, Ubiquiti, TP-Link 
(WON 5A MiMo, NanoStationM5, RocketM5, LiteBean Gen2, APC, Archer C20, AirFiber, TL-WR940N).

Autor: Abraão Barbosa
E-mail: abraao@introtech.com.br
Data de Criação: 10/11/2023

Tecnologias: JavaScript, Chrome Extension API

Licença: MIT
*/

chrome.storage.sync.get(["clientUsername", "clientPassword", "providerUsername", "providerPassword"], function (data) {
  const clientUsername = data.clientUsername;
  const clientPassword = data.clientPassword;
  const providerUsername = data.providerUsername;
  const providerPassword = data.providerPassword;
  const model_router = document.querySelector('title');



  function auto_login_client(paran_user, paran_pass, paran_button){
    const usernameField = document.querySelector(paran_user);
    const passwordField = document.querySelector(paran_pass);

    if (typeof clientUsername === 'undefined' || typeof clientPassword === 'undefined') {
      alert("Você ainda não cadastrou o Usuario e Senha clique na extesão para cadastrar!");
      close();
    }

    if (usernameField && passwordField) {
      usernameField.value = clientUsername;
      passwordField.value = clientPassword;
      const loginButton = document.querySelector(paran_button);
      if (loginButton) {
        loginButton.click();  
      }
    } else {
      if (passwordField){
        passwordField.value = clientPassword;
        const loginButton = document.querySelector(paran_button);
        if (loginButton) {
          loginButton.click();  
        }
      }
    }
  }

  function auto_login_provider(paran_user, paran_pass, paran_button){
    const usernameField = document.querySelector(paran_user);
    const passwordField = document.querySelector(paran_pass);

    if (typeof providerUsername === 'undefined' ||typeof providerPassword === 'undefined') {
      alert("Você ainda não cadastrou o Usuario e Senha clique na extesao para cadastrar!");
      close();
    }

    if (usernameField && passwordField) {
      usernameField.value = providerUsername;
      passwordField.value = providerPassword;
      const loginButton = document.querySelector(paran_button);
      if (loginButton) {
        loginButton.click();  
      }
    } else {
      if (passwordField){
        passwordField.value = providerPassword;
        const loginButton = document.querySelector(paran_button);
        if (loginButton) {
          loginButton.click();  
        }
      }
    }
  }

  function auto_login_start(){
      // # Verificação de equipamentos do cliente
    if (window.location.href.startsWith("http://10.10.") || window.location.href.startsWith("https://10.10.") && clientUsername && clientPassword) {
        
      // Roteador Intelbras 301k
      if (model_router.text == 'RF 301K| LOGIN'){
        auto_login_client(paran_user=false, paran_pass='input[id="login-password"]', paran_button='button[id="save"]');

      // Roteador Tp-link Archer C20/Archer C5
      } else if (model_router.text == 'Archer C20' || model_router.text == 'Archer C5'){
        auto_login_client(paran_user=false, paran_pass='input[id="pc-login-password"]', paran_button='button[id="pc-login-btn"]');
      
      // Antena Ubiquiti Modelo Nano/Rocket
      } else if (model_router.text == 'Login' || model_router.text == 'Iniciar sessão'){
        auto_login_client(paran_user='input[name="username"]', paran_pass='input[name="password"]', paran_button='input[type="submit"]');
      
      // Antena Intelbras WON 5A MIMo
      } else if (model_router.text == 'Intelbras - Configuração de rede'){
        auto_login_client(paran_user='input[tabindex="1"]', paran_pass='input[tabindex="2"]', paran_button='input[tabindex="3"]');
      
      // Antena Intelbras APC
      } else if (document.querySelector('script[src="apc.js"]')){
        auto_login_client(paran_user='input[name="username"]', paran_pass='input[name="password"]', paran_button='button[type="submit"]');

      // Antena Ubiquiti Modelo LiteBeam 5AC Gen2
      } else if (model_router.text == 'Ubiquiti Networks' || model_router.text == 'Ubiquiti'){
        auto_login_client(paran_user='input[name="username"]', paran_pass='input[name="password"]', paran_button='input[type="submit"]');

      // Roteador Tp-link TL-WR940N
      } else if (model_router.text == 'TL-WR940N'){
        auto_login_client(paran_user='input[id="userName"]', paran_pass='input[id="pcPassword"]', paran_button='label[id="loginBtn"]');
 
      }

    // # Verificação de equipamentos do provedor
    } else if (window.location.href.startsWith("http://172.") || window.location.href.startsWith("https://172.") && providerUsername && providerPassword) {

        // Antena Ubiquiti Modelo Nano/Rocket
        if (model_router.text == 'Login' || model_router.text == 'Iniciar sessão'){
          auto_login_provider(paran_user='input[name="username"]', paran_pass='input[name="password"]', paran_button='input[type="submit"]');

        // Antena Intelbras WON 5A MIMo
        } else if (model_router.text == 'Intelbras - Configuração de rede'){
          auto_login_provider(paran_user='input[tabindex="1"]', paran_pass='input[tabindex="2"]', paran_button='input[tabindex="3"]');

        // Antena Ubiquiti Modelo LiteBeam 5AC Gen2/ AirFiber
        } else if (model_router.text == 'Ubiquiti Networks' || model_router.text == 'Ubiquiti' || model_router.text == 'airFiber 5XHD'){
          auto_login_provider(paran_user='input[name="username"]', paran_pass='input[name="password"]', paran_button='input[type="submit"]');
        
        // Antena Intelbras APC
        } else if (document.querySelector('script[src="apc.js"]')){
          auto_login_provider(paran_user='input[name="username"]', paran_pass='input[name="password"]', paran_button='button[type="submit"]');
        }
      }
  }

  setInterval(auto_login_start, 2000);
  
});
