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

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("saveButton").addEventListener("click", function () {
    const clientUsername = document.getElementById("clientUsername").value;
    const clientPassword = document.getElementById("clientPassword").value;
    const providerUsername = document.getElementById("providerUsername").value;
    const providerPassword = document.getElementById("providerPassword").value;

    chrome.storage.sync.set({ clientUsername, clientPassword, providerUsername, providerPassword }, function () {
      alert("Salvo com sucesso.");
    });
  });
});